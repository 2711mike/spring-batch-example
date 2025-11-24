package com.furkankayam.mapper;

import com.furkankayam.dto.request.CampaignRequestDto;
import com.furkankayam.dto.response.CampaignResponseDto;
import com.furkankayam.model.Campaign;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class CampaignMapper {

    public abstract Campaign toCampaign(CampaignRequestDto campaignRequestDto);
    public abstract CampaignResponseDto toCampaignResponseDto(Campaign campaign);
}