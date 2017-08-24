package com.thangpham.tool.service;

import com.thangpham.tool.models.Jira;

public interface IJiraService {
    Jira fetchJiraStory(String sprint);
    Jira.Issue getIssueById(String id);
}
