package com.brainwave.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(QuestionId.class)
public class Question {
    @Id
    int questionNo;
    @Id
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="quizId")
    private Quiz quiz;
    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private Set<Option> options;
    private String body;

    @Override
    public int hashCode(){
        return this.questionNo;
    }
    @Override
    public boolean equals(Object obj){
        Question opt = (Question) obj;
        return this.questionNo ==opt.getQuestionNo();
    }
}
