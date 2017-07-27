package com.thangpham.tool.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thangpham.tool.service.GitService;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping("/git")
public class GitRestController {
    private GitService gitService;

    @Autowired
    public GitRestController(GitService gitService) {
        this.gitService = gitService;
    }

    @RequestMapping(value = "/{repoName}", method = RequestMethod.GET)
    public Object getPullRequest(@RequestParam("repoName") String repoName) {
        return gitService.fetchPullRequest(repoName);
    }
}
