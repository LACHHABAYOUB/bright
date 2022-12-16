package com.brightspeed.ccsdataapi.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = EntityAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public  ErrorResponse handleException(EntityAlreadyExistsException ex) {
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(), "SQL Error: ", ex.getMessage());
    }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ResponseBody
    public ErrorResponse handleMethodNotSupported(HttpServletRequest request) {
        return new ErrorResponse(request, "HTTP request method not supported for this operation.");
    }
}
