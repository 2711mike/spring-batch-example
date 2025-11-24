-- V1.2__create_campaigns_table.sql

CREATE TABLE campaigns (
                           id BIGSERIAL PRIMARY KEY,
                           subject VARCHAR(255) NOT NULL,
                           content TEXT,
                           created_at TIMESTAMP NOT NULL
);