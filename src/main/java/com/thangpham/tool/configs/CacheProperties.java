package com.thangpham.tool.configs;

import lombok.Getter;
import lombok.Setter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "cache")
@Getter
@Setter
public class CacheProperties {
    private boolean enable;
    private long expireTimeAfterWrite;
    private long maximumSize = 100;
}
