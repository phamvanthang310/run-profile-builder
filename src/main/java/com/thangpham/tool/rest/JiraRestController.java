package com.thangpham.tool.rest;

import com.thangpham.tool.models.Jira;
import com.thangpham.tool.service.IJiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping(value = "/api/jira")
public class JiraRestController {
    private IJiraService jiraService;

    @Autowired
    public JiraRestController(IJiraService jiraService) {
        this.jiraService = jiraService;
    }

    @RequestMapping(value = "/{sprint}", method = RequestMethod.GET)
    public Jira getJiras(@PathVariable String sprint) {
        return jiraService.fetchJiraStory(sprint);
    }
}
