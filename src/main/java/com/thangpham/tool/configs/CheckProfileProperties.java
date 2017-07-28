package com.thangpham.tool.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

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
    private String profiles;
}
