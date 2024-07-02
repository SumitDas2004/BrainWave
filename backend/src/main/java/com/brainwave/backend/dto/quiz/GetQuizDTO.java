package com.brainwave.backend.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetQuizDTO {
    private long id;
    private String name;
    private String userName;
    private String userEmail;
    private long userId;
    private List<GetQuestionDTO> questions;
}
