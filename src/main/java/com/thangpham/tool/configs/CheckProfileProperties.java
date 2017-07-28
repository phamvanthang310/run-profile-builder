package com.thangpham.tool.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by tpham.
 */
@Component
@ConfigurationProperties(prefix = "checkprofile")
@Getter
@Setter
public class CheckProfileProperties {
    private String domain;
    private String fetchUrl;
}
