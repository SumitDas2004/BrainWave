package com.brainwave.backend.dto.quiz;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuizDTO {
    private Long userId;
    @NotBlank(message="Name can't be empty.")
    private String name;
    @NotEmpty(message="There must be at least one question.")
    private List<CreateQuestionDTO> questions;
}
