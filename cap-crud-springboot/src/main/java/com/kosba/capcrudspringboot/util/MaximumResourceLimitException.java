package com.kosba.capcrudspringboot.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class MaximumResourceLimitException extends Exception {

    private static final Long serialVersionUID = 1L;

    public MaximumResourceLimitException(String message) {
        super(message);
    }

}
