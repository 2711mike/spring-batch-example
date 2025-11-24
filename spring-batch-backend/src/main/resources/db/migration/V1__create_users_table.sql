-- V1__create_users_table.sql

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       receive_campaing_emails BOOLEAN NOT NULL DEFAULT FALSE
);

-- Indexes

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_receive_campaign_emails ON users(receive_campaing_emails);
