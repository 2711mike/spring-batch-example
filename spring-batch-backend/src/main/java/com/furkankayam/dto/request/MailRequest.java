package com.furkankayam.dto.request;

public record MailRequest (
        String email,
        String firstName,
        String lastName,
        String campaignSubject,
        String campaignContent
) {
}
