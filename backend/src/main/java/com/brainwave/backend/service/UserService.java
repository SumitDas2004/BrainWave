package com.brainwave.backend.service;

import com.brainwave.backend.configuration.JWTService;
import com.brainwave.backend.dao.UserRepository;
import com.brainwave.backend.dto.user.GetUserDetailsDTO;
import com.brainwave.backend.dto.user.LoginDTO;
import com.brainwave.backend.dto.user.RegisterDTO;
import com.brainwave.backend.entity.User;
import com.brainwave.backend.exceptions.InvalidPasswordException;
import com.brainwave.backend.exceptions.InvalidPasswordFormatException;
import com.brainwave.backend.exceptions.UserAlreadyExistsException;
import com.brainwave.backend.exceptions.UserDoesNotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    UserRepository userDao;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JWTService jwtService;

    String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";

    public String[] register(RegisterDTO request){
        String email = request.getEmail().toLowerCase();
        String name = request.getName();
        String password = request.getPassword();

        if(!password.matches(passwordRegex))throw new InvalidPasswordFormatException();

        password = encoder.encode(password);

        if(userDao.findByEmail(email)!=null)throw new UserAlreadyExistsException();
        User user = User.builder()
                .name(name)
                .email(email)
                .password(password)
                .avatar(request.getAvatar())
                .build();
        userDao.save(user);
        return new String[]{jwtService.generateToken(email), email};
    }

    public String[] login(LoginDTO request){
        String email = request.getEmail().toLowerCase();
        String password = request.getPassword();
        User user = userDao.findByEmail(email);
        if(user==null)throw new UserDoesNotExistException();
        if(!encoder.matches(password, user.getPassword()))
            throw new InvalidPasswordException();
        return new String[]{jwtService.generateToken(user.getEmail()), email};
    }

    public GetUserDetailsDTO getUserDetails(String email) {
        User user = userDao.findByEmail(email);
        GetUserDetailsDTO res= GetUserDetailsDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .id(user.getId())
                .updatedAt(user.getUpdatedAt())
                .avatar(user.getAvatar())
                .build();
        return res;
    }
}
