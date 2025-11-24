package com.furkankayam.batch.service;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class CampaignMailBatchService {

    private final JobLauncher jobLauncher;
    private final Job campaignMailJob;

    public CampaignMailBatchService(JobLauncher jobLauncher, Job campaignMailJob) {
        this.jobLauncher = jobLauncher;
        this.campaignMailJob = campaignMailJob;
    }

    @Async
    public void runCampaignMailJobAsync(Long campaignId) {
        try {
            JobParameters params = new JobParametersBuilder()
                    .addLong("campaignId", campaignId)
                    .addLong("time", System.currentTimeMillis())
                    .toJobParameters();

            jobLauncher.run(campaignMailJob, params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}