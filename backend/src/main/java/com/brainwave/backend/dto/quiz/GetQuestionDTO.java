package com.brainwave.backend.dto.quiz;

import com.brainwave.backend.entity.Option;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetQuestionDTO {
    String question;
    int questionNo;
    Set<Option> options;
}
