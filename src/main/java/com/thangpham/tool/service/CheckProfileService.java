package com.thangpham.tool.service;

import com.thangpham.tool.configs.CheckProfileProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Created by tpham.
 */
@Service
@ConditionalOnProperty(name = "checkprofile.mock", havingValue = "false", matchIfMissing = true)
public class CheckProfileService extends AbstractGateway {
    private CheckProfileProperties checkProfileProperties;

    protected CheckProfileService(RestTemplate restTemplate, CheckProfileProperties checkProfileProperties) {
        super(restTemplate);
        this.checkProfileProperties = checkProfileProperties;
    }

    public String checkoutProfile() {
        return restTemplate.getForObject(checkProfileProperties.getDomain() + checkProfileProperties.getFetchUrl(), String.class);
    }
}
