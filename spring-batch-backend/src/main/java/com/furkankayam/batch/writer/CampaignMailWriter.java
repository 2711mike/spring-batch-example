package com.furkankayam.batch.writer;

import com.furkankayam.dto.request.MailRequest;
import com.furkankayam.model.Campaign;
import com.furkankayam.model.User;
import com.furkankayam.repository.CampaignRepository;
import com.furkankayam.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import org.springframework.batch.core.annotation.BeforeStep;

@Slf4j
@StepScope
@Component
@RequiredArgsConstructor
public class CampaignMailWriter implements ItemWriter<User> {

    private final MailService mailService;
    private final CampaignRepository campaignRepository;

    @Value("#{jobParameters['campaignId']}")
    private Long campaignId;

    private Campaign campaign;

    @BeforeStep
    public void beforeStep() {
        this.campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign not found: " + campaignId));
    }

    @Override
    public void write(Chunk<? extends User> chunk) {

        for (User user : chunk) {
            MailRequest mailRequest = new MailRequest(
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    campaign.getSubject(),
                    campaign.getContent()
            );
            mailService.sendCampaignEmail(mailRequest);
        }
    }
}

