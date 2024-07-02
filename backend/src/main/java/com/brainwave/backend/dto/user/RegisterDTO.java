package com.brainwave.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RegisterDTO {
    @Email(message = "Invalid email format.")
    private String email;
    @NotBlank(message = "Password can't be blank.")
    private String password;
    @NotBlank(message="Name can't be blank.")
    private String name;
    @NotBlank(message="Avatar can't be blank.")
    private String avatar;

}
