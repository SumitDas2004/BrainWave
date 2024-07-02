package com.brainwave.backend.exceptions;

public class UserDoesNotExistException extends RuntimeException{
    public UserDoesNotExistException(){
        super("User does not exist.");
    }
}
