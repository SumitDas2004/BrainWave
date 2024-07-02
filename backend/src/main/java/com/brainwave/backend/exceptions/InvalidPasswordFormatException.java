package com.brainwave.backend.exceptions;

public class InvalidPasswordFormatException extends RuntimeException{
    public InvalidPasswordFormatException(){
        super("Password must contain at least one letter, one number and one special character and length should be at least 8 character long.");
    }
}
