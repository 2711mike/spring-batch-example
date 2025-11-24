package com.furkankayam.batch.processor;

import com.furkankayam.model.User;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class CampaignMailProcessor implements ItemProcessor<User, User> {

    @Override
    public User process(User user) {
        return user;
    }
}