package com.brainwave.backend.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class OptionId implements Serializable {
    private Question question;
    private int optionNo;
}
