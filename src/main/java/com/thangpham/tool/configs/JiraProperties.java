package com.thangpham.tool.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

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
    private String jqlQuery;
    private String token;
}
