package com.brainwave.backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetUserDetailsDTO {
    private long id;
    private String avatar;
    private String name;
    private String email;
    private Date createdAt;
    private Date updatedAt;
}
