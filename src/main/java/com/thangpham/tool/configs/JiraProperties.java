package com.thangpham.tool.configs;

import lombok.Getter;
import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by tpham.
 */

@Configuration
@ConfigurationProperties(prefix = "jira")
@Getter
@Setter
public class JiraProperties {
    private String domain;
    private String fetchStoryUrl;
    private String getByIdUrl;
    private String token;
    private String stories;
}
