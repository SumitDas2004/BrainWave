package com.brainwave.backend.controller;

import com.brainwave.backend.dto.quiz.*;
import com.brainwave.backend.entity.Quiz;
import com.brainwave.backend.entity.User;
import com.brainwave.backend.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("http://localhost:5173")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@Valid @RequestBody CreateQuizDTO request){
        request.setUserId(((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        Quiz quiz = quizService.createQuiz(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Quiz creation successful.");
        map.put("data", CreateQuizResponseDTO.builder().id(quiz.getId()).name(quiz.getName()).build());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuiz(@PathVariable("id") long quizId){
        GetQuizDTO quiz = quizService.getQuiz(quizId);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success.");
        map.put("data", quiz);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    @PostMapping("/submit")
    public ResponseEntity<?> createQuiz(@RequestBody SubmitQuizDTO request){
        request.setUserId(((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        QuizScoreDTO res = quizService.submitQuiz(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Quiz attempt successful.");
        map.put("data", res);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
