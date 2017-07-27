package com.thangpham.tool.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.thangpham.tool.configs.JiraProperties;
import com.thangpham.tool.models.Jira;

/**
 * Created by tpham.
 */

@Service
public class JiraService {
    private RestTemplate restTemplate;
    private JiraProperties jiraProperties;

    @Autowired
    public JiraService(RestTemplate restTemplate, JiraProperties jiraProperties) {
        this.restTemplate = restTemplate;
        this.jiraProperties = jiraProperties;
    }

    public Jira fetchJiraStory(String sprint) {
        String url = jiraProperties.getDomain() + jiraProperties.getFetchStoryUrl();
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("jql", String.format(jiraProperties.getJqlQuery(), sprint));

        HttpHeaders headers = new HttpHeaders();
        headers.put("Authorization", Collections.singletonList("Basic " + jiraProperties.getToken()));

        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), Jira.class, requestParams).getBody();
    }
}
