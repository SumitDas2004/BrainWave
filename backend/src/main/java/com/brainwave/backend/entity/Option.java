package com.brainwave.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(OptionId.class)
public class Option {
    @Id
    @JsonIgnore
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name="questionNo"),
            @JoinColumn(name="quizId")
    })
    private Question question;

    private String body;

    @JsonIgnore
    private boolean correctOption;

    @Id
    private int optionNo;

    @Override
    public int hashCode(){
        return this.optionNo;
    }
    @Override
    public boolean equals(Object obj){
        Option opt = (Option)obj;
        return this.optionNo ==opt.getOptionNo();
    }
}
