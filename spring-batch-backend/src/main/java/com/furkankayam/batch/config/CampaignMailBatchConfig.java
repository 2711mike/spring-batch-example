package com.furkankayam.batch.config;

import com.furkankayam.model.User;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class CampaignMailBatchConfig {

    @Bean
    public Job campaignMailJob(JobRepository jobRepository, Step campaignMailStep) {
        return new JobBuilder("campaignMailJob", jobRepository)
                .start(campaignMailStep)
                .build();
    }

    @Bean
    public Step campaignMailStep(JobRepository jobRepository,
                                 PlatformTransactionManager transactionManager,
                                 ItemReader<User> campaignUserReader,
                                 ItemProcessor<User, User> campaignMailProcessor,
                                 ItemWriter<User> campaignMailWriter) {
        return new StepBuilder("campaignMailStep", jobRepository)
                .<User, User>chunk(100, transactionManager)
                .reader(campaignUserReader)
                .processor(campaignMailProcessor)
                .writer(campaignMailWriter)
                .build();
    }
}