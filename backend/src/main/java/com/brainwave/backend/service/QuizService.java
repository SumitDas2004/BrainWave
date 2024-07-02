package com.brainwave.backend.service;

import com.brainwave.backend.dao.QuestionDao;
import com.brainwave.backend.dao.QuizDAO;
import com.brainwave.backend.dao.UserRepository;
import com.brainwave.backend.dto.quiz.*;
import com.brainwave.backend.entity.*;
import com.brainwave.backend.exceptions.AlreadyParticipatedException;
import com.brainwave.backend.exceptions.UserDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    @Autowired
    QuizDAO quizDAO;
    @Autowired
    UserRepository userDao;
    @Autowired
    QuestionDao questionDao;
    @Autowired
    com.brainwave.backend.dao.OptionDao optionDao;


    public Quiz createQuiz(CreateQuizDTO request){
        long userId = request.getUserId();
        String quizName = request.getName();

        Optional<User> optionalUser = userDao.findById(userId);

        if(optionalUser.isEmpty())throw new UserDoesNotExistException();

        User user = optionalUser.get();


        Quiz quiz = Quiz.builder()
                .user(user)
                .name(quizName)
                .build();

        Set<Question> questions = new HashSet<>();
        for(CreateQuestionDTO ques:request.getQuestions()) questions.add(getQuestion(ques, quiz));

        quiz.setQuestions(questions);
        return quizDAO.save(quiz);
    }

    private Question getQuestion(CreateQuestionDTO request, Quiz quiz){
        int questionNo = request.getId();
        String question = request.getBody();

        Question res = Question.builder()
                .body(question)
                .questionNo(questionNo)
                .quiz(quiz)
                .build();

        Set<Option> options = new HashSet<>();
        for(CreateOptionDTO opt:request.getOptions()){
            options.add(getOption(opt, res));
        }
        res.setOptions(options);

        return res;
    }

    private Option getOption(CreateOptionDTO request, Question question){
        int optionNo = request.getId();
        String option = request.getBody();
        boolean isCorrectOption  = request.isCorrectOption();
        return Option.builder()
                .optionNo(optionNo)
                .body(option)
                .question(question)
                .correctOption(isCorrectOption)
                .build();
    }

    public GetQuizDTO getQuiz(long quizId) {
        Optional<Quiz> optionalQuiz = quizDAO.findById(quizId);
        if(optionalQuiz.isEmpty())throw new RuntimeException("Quiz does not exist.");
        Quiz quiz = optionalQuiz.get();
        return GetQuizDTO.builder()
                .id(quiz.getId())
                .name(quiz.getName())
                .userId(quiz.getUser().getId())
                .userEmail(quiz.getUser().getEmail())
                .userName(quiz.getUser().getName())
                .questions(
                        quiz.getQuestions().stream().map(question->
                                GetQuestionDTO.builder()
                                        .questionNo(question.getQuestionNo())
                                        .question(question.getBody())
                                        .options(question.getOptions())
                                        .build()
                        ).collect(Collectors.toList())
                )
                .build();
    }

    public QuizScoreDTO submitQuiz(SubmitQuizDTO request) {
        Optional<Quiz> optionalQuiz = quizDAO.findById(request.getQuizId());
        if(optionalQuiz.isEmpty())throw new RuntimeException("Quiz does not exist.");
        Quiz quiz = optionalQuiz.get();
        if(quiz.getAttenderIds().contains(request.getUserId()))throw new AlreadyParticipatedException();
        quiz.getAttenderIds().add(request.getUserId());

        int totalQuestions = quiz.getQuestions().size();
        int totalCorrect = 0;

        for(Map<String, Integer> questionAndAnswer:request.getQuestionAndAnswers()){
            int questionNo = questionAndAnswer.get("questionNo");
            int answerNo = questionAndAnswer.get("answerNo");
            if(answerNo==0)continue;
            Optional<Question> oq = questionDao.findById(new QuestionId(questionNo, quiz));
            if(oq.isEmpty())throw new RuntimeException("Question does not exist.");
            Question q = oq.get();
            Optional<Option> oo = optionDao.findById(new OptionId(q, answerNo));
            if(oo.isEmpty())throw new RuntimeException("Option does not exist.");
            Option o = oo.get();
            if(o.isCorrectOption())totalCorrect++;
        }
        return new QuizScoreDTO(totalQuestions, totalCorrect);
    }
}
