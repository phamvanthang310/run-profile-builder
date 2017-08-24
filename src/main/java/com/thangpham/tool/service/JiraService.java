package com.thangpham.tool.service;

import com.thangpham.tool.configs.JiraProperties;
import com.thangpham.tool.models.Jira;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by tpham.
 */

@Service
@ConditionalOnProperty(name = "jira.mock", havingValue = "false", matchIfMissing = true)
public class JiraService extends AbstractGateway implements IJiraService {
    private JiraProperties jiraProperties;

    @Autowired
    public JiraService(RestTemplate restTemplate, JiraProperties jiraProperties) {
        super(restTemplate);
        this.jiraProperties = jiraProperties;
    }

    @Override
    public Jira fetchJiraStory(String sprint) {
        String url = jiraProperties.getDomain() + jiraProperties.getFetchStoryUrl();
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("sprint", sprint);

        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(buildRequestHeader()), Jira.class, requestParams).getBody();
    }

    @Override
    public Jira.Issue getIssueById(String id) {
        String url = jiraProperties.getDomain() + jiraProperties.getGetByIdUrl();
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("issueId", id);

        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(buildRequestHeader()), Jira.Issue.class, requestParams).getBody();
    }

    private HttpHeaders buildRequestHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.put("Authorization", Collections.singletonList("Basic " + jiraProperties.getToken()));
        return headers;
    }
}
