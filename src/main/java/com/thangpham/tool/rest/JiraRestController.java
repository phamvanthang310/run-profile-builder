package com.thangpham.tool.rest;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thangpham.tool.models.Jira;
import com.thangpham.tool.service.JiraService;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping(value = "/jira")
public class JiraRestController {
    private JiraService jiraService;

    @Autowired
    public JiraRestController(JiraService jiraService) {
        this.jiraService = jiraService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Jira getJiras(@NotBlank String sprint) {
        return jiraService.fetchJiraStory(sprint);
    }
}
