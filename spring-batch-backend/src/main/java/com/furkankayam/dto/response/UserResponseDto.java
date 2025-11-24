package com.furkankayam.dto.response;

public record UserResponseDto (
        String email,
        String firstName,
        String lastName,
        boolean receiveCampaignEmails
) {
}
