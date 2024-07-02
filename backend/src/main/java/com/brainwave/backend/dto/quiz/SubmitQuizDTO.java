package com.brainwave.backend.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitQuizDTO {
    long quizId;
    long userId;
    List<Map<String, Integer>> questionAndAnswers;//Json object should have two properties, "questionNo", and "answerNo"(id of the chosen option.)


}
