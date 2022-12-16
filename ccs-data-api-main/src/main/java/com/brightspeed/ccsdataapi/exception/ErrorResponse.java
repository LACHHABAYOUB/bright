package com.brightspeed.ccsdataapi.exception;

import javax.servlet.http.HttpServletRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private int statusCode;
    private String message;
    private String detailedMessage;
    private HttpServletRequest request;
    
    public ErrorResponse(int statusCode, String message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
    public ErrorResponse( int statusCode,String message, String detailedMessage) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.detailedMessage = detailedMessage;
    }

    public ErrorResponse( HttpServletRequest request, String message) {
        super();
        this.request = request;
        this.message = message;
    }
}
