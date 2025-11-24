package com.furkankayam.controller;

import com.furkankayam.dto.request.CampaignRequestDto;
import com.furkankayam.dto.response.CampaignResponseDto;
import com.furkankayam.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    // --- POST Create Campaign ---
    @PostMapping
    public ResponseEntity<CampaignResponseDto> createCampaign(@RequestBody CampaignRequestDto campaignRequestDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(campaignService.createCampaign(campaignRequestDto));
    }
}
