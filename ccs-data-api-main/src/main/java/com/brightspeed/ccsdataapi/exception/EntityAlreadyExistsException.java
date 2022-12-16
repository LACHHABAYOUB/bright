package com.brightspeed.ccsdataapi.exception;

public class EntityAlreadyExistsException extends RuntimeException {
    private String message;

    public EntityAlreadyExistsException() {
    }

    public EntityAlreadyExistsException(String msg) {
        super(msg);
        this.message = msg;
    }
}
