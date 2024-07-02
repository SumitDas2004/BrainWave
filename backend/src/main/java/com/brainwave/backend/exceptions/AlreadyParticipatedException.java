package com.brainwave.backend.exceptions;

public class AlreadyParticipatedException extends RuntimeException {
    public AlreadyParticipatedException(){
        super("You can attend a quiz only once.");
    }
}
