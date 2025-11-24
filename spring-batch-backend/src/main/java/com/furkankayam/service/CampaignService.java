package com.furkankayam.service;

import com.furkankayam.batch.service.CampaignMailBatchService;
import com.furkankayam.dto.request.CampaignRequestDto;
import com.furkankayam.dto.response.CampaignResponseDto;
import com.furkankayam.mapper.CampaignMapper;
import com.furkankayam.model.Campaign;
import com.furkankayam.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CampaignMapper campaignMapper;
    private final CampaignMailBatchService campaignMailBatchService;

    public CampaignResponseDto createCampaign(CampaignRequestDto campaignRequestDto) {
        Campaign campaign = campaignMapper.toCampaign(campaignRequestDto);
        Campaign savedCampaign = campaignRepository.save(campaign);
        campaignMailBatchService.runCampaignMailJobAsync(savedCampaign.getId());
        return campaignMapper.toCampaignResponseDto(savedCampaign);
    }
}