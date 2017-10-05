package com.thangpham.tool.service.mock;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import com.thangpham.tool.configs.JiraProperties;
import com.thangpham.tool.models.Jira;
import com.thangpham.tool.service.IJiraService;
import com.thangpham.tool.util.JsonObjectMapper;

@Service
@ConditionalOnProperty(name = "jira.mock", havingValue = "true")
public class JiraMockService implements IJiraService {
    private static final Logger LOGGER = LoggerFactory.getLogger(JiraMockService.class);
    private JiraProperties jiraProperties;

    @Autowired
    public JiraMockService(JiraProperties jiraProperties) {
        this.jiraProperties = jiraProperties;
    }

    @Override
    public List<Jira.Issue> fetchJiraStory(String sprint) {
        try {
            JsonObjectMapper objectMapper = JsonObjectMapper.get();
            Jira jira = objectMapper.readValue(jiraProperties.getStories(), Jira.class);
            return transformData(jira);
        } catch (Exception e) {
            LOGGER.error("Cannot parse pull request data from mockService", e);
        }
        return null;
    }

    @Override
    public List<Jira.Issue> getIssueById(String id) {
        return fetchJiraStory(StringUtils.EMPTY).stream()
                .filter(i -> id.equals(i.getKey()))
                .collect(Collectors.toList());
    }

    private List<Jira.Issue> transformData(Jira jira) {
        return jira.getIssues().stream().map(issue -> {
            issue.setHref(String.format("%s/%s", jiraProperties.getDomain(), issue.getKey()));
            return issue;
        }).collect(Collectors.toList());
    }
}
