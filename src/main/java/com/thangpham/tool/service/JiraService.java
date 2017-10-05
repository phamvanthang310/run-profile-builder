package com.thangpham.tool.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cache.annotation.Cacheable;
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
@ConditionalOnProperty(name = "jira.mock", havingValue = "false", matchIfMissing = true)
public class JiraService extends AbstractGateway implements IJiraService {
    private JiraProperties jiraProperties;

    @Autowired
    public JiraService(RestTemplate restTemplate, JiraProperties jiraProperties) {
        super(restTemplate);
        this.jiraProperties = jiraProperties;
    }

    @Override
    @Cacheable("issues")
    public List<Jira.Issue> fetchJiraStory(String sprint) {
        String url = jiraProperties.getDomain() + jiraProperties.getFetchStoryUrl();
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("sprint", sprint);

        Jira jira = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(buildRequestHeader()), Jira.class, requestParams).getBody();
        return transformData(jira);
    }

    @Override
    @Cacheable(cacheNames = "issue", key = "#id")
    public List<Jira.Issue> getIssueById(String id) {
        String url = jiraProperties.getDomain() + jiraProperties.getGetByIdUrl();
        Map<String, String> requestParams = new HashMap<>();
        requestParams.put("issueId", id);

        Jira jira = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(buildRequestHeader()), Jira.class, requestParams).getBody();
        return transformData(jira);
    }

    private HttpHeaders buildRequestHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.put("Authorization", Collections.singletonList("Basic " + jiraProperties.getToken()));
        return headers;
    }

    private List<Jira.Issue> transformData(Jira jira) {
        return jira.getIssues().stream().map(issue -> {
            Jira.Issue newIssue = new Jira.Issue();
            BeanUtils.copyProperties(issue, newIssue);
            newIssue.setHref(String.format("%s/browse/%s", jiraProperties.getDomain(), issue.getKey()));
            return newIssue;
        }).collect(Collectors.toList());
    }
}
