package com.thangpham.tool.configs;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

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
}
