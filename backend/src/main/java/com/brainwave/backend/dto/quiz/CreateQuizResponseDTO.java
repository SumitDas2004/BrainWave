package com.brainwave.backend.dto.quiz;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuizResponseDTO {
    String name;
    long id;
}
