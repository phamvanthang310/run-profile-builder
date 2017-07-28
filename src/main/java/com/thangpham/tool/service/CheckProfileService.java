package com.thangpham.tool.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.thangpham.tool.configs.CheckProfileProperties;

/**
 * Created by tpham.
 */
@Service
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
