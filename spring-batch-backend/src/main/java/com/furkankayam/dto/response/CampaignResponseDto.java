package com.furkankayam.dto.response;

import java.time.LocalDateTime;

public record CampaignResponseDto (
        String subject,
        String content,
        LocalDateTime createdAt
) {
}

