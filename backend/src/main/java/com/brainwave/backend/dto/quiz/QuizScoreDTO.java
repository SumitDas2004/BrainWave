package com.brainwave.backend.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizScoreDTO {
    int totalQuestion;
    int totalCorrect;
}
