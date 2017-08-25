package com.thangpham.tool.service;

import java.util.List;

import com.thangpham.tool.models.Jira;

public interface IJiraService {
    List<Jira.Issue> fetchJiraStory(String sprint);
    List<Jira.Issue> getIssueById(String id);
}
