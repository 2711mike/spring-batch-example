package com.furkankayam.service;

import com.furkankayam.dto.request.MailRequest;
import freemarker.template.Configuration;
import freemarker.template.Template;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final Configuration freemarkerConfig;
    private final String fromEmail;

    public MailService(JavaMailSender mailSender,
                       Configuration freemarkerConfig,
                       @Value("${spring.mail.username}") String fromEmail) {
        this.mailSender = mailSender;
        this.freemarkerConfig = freemarkerConfig;
        this.fromEmail = fromEmail;
    }

    public void sendCampaignEmail(MailRequest mailRequest) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(mailRequest.email());
            helper.setSubject(mailRequest.campaignSubject());

            Map<String, Object> model = new HashMap<>();

            Map<String, String> userMap = new HashMap<>();
            userMap.put("email", mailRequest.email());
            userMap.put("firstName", mailRequest.firstName());
            userMap.put("lastName", mailRequest.lastName());
            model.put("user", userMap);

            Map<String, String> campaignMap = new HashMap<>();
            campaignMap.put("subject", mailRequest.campaignSubject());
            campaignMap.put("content", mailRequest.campaignContent());
            model.put("campaign", campaignMap);

            Template template = freemarkerConfig.getTemplate("mail/campaign_email.ftl");
            String htmlContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);

            helper.setText(htmlContent, true);
            mailSender.send(message);

            log.info("✅ Email sent successfully to: {}", mailRequest.email());

        } catch (Exception e) {
            log.error("❌ Failed to send email to: {}", mailRequest.email(), e);
            throw new RuntimeException("Email sending failed", e);
        }
    }
}