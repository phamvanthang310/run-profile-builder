package com.thangpham.tool.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thangpham.tool.models.Pull;
import com.thangpham.tool.service.GitService;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping("/api/git")
public class GitRestController {
    private GitService gitService;

    @Autowired
    public GitRestController(GitService gitService) {
        this.gitService = gitService;
    }

    @RequestMapping(value = "/{repoName}", method = RequestMethod.GET)
    public List<Pull> getPull(@PathVariable("repoName") String repoName) {
        return gitService.getPullRequest(repoName);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Pull> getAllPull() {
        return gitService.getAllPullRequest();
    }

    @RequestMapping(value = "/repos", method = RequestMethod.GET)
    public List<String> getAllRepo() {
        return gitService.getAllRepo();
    }
}
