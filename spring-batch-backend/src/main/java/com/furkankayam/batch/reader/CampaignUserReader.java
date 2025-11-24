package com.furkankayam.batch.reader;

import com.furkankayam.model.User;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class CampaignUserReader extends JdbcCursorItemReader<User> {

    public CampaignUserReader(DataSource dataSource) {
        setDataSource(dataSource);
        setSql("SELECT id, email, first_name, last_name FROM users WHERE receive_campaing_emails = true");

        setRowMapper((rs, rowNum) -> {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setEmail(rs.getString("email"));
            user.setFirstName(rs.getString("first_name"));
            user.setLastName(rs.getString("last_name"));
            return user;
        });
    }
}