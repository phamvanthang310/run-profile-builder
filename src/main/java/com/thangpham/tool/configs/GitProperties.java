package com.thangpham.tool.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by tpham.
 */
@Component
@ConfigurationProperties(prefix = "git")
@Setter
@Getter
public class GitProperties {
    private String domain;
    private String fetchPullRequestUrl;
    private String token;
    private List<String> repos;
    private String pullRequests;
}
