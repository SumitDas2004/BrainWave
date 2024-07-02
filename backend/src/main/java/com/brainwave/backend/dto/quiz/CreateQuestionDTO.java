package com.brainwave.backend.dto.quiz;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionDTO {
    @NotBlank(message="Question Id can't be null")
    private Integer id;
    @NotBlank(message="Question body can't be null")
    private String body;
    @NotBlank(message="Options can't be empty")
    private Set<CreateOptionDTO> options;
}
