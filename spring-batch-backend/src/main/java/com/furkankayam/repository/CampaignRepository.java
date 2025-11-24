package com.furkankayam.repository;

import com.furkankayam.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
