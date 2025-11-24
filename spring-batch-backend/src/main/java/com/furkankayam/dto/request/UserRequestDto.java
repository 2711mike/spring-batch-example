package com.furkankayam.dto.request;

public record UserRequestDto (
        String email,
        String firstName,
        String lastName,
        boolean receiveCampaignEmails
) {
}
