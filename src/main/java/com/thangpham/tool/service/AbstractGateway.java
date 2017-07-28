package com.thangpham.tool.service;

import java.net.URI;
import java.util.Map;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

/**
 * Created by tpham.
 */
public abstract class AbstractGateway {
    protected RestTemplate restTemplate;

    protected AbstractGateway(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    protected URI buildUrl(String baseUrl, Map<String, ?> params) {
        try {
            return new UriTemplate(baseUrl).expand(params);
        } catch (Exception ex) {
            throw new RuntimeException("Could not build URI", ex);
        }
    }
}
