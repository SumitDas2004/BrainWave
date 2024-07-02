package com.brainwave.backend.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public class QuestionId implements Serializable {
    int questionNo;
    Quiz quiz;
}
