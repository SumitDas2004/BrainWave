package com.brainwave.backend.dto.quiz;

import com.brainwave.backend.entity.Option;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOptionDTO {
    private int id;
    @NotBlank(message = "Option body can't be empty")
    private String body;
    private boolean correctOption;

    @Override
    public int hashCode(){
        return this.id;
    }
    @Override
    public boolean equals(Object obj){
        Option opt = (Option)obj;
        return this.id ==opt.getOptionNo();
    }
}
