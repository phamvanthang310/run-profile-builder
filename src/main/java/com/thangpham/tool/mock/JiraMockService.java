package com.thangpham.tool.mock;

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
    public Jira fetchJiraStory(String sprint) {
        try {
            JsonObjectMapper objectMapper = JsonObjectMapper.get();
            return objectMapper.readValue(jiraProperties.getStories(), Jira.class);
        } catch (Exception e) {
            LOGGER.error("Cannot parse pull request data from mockService", e);
        }
        return null;
    }

    @Override
    public Jira.Issue getIssueById(String id) {
        return fetchJiraStory(StringUtils.EMPTY).getIssues().stream()
                .filter(issue -> id.equals(issue.getKey()))
                .findFirst()
                .orElse(null);
    }
}
