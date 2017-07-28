package com.thangpham.tool.service;

import com.thangpham.tool.models.Pull;

import java.util.List;

public interface IGitService {
    List<Pull> getPullRequest(String repoName);

    List<Pull> getAllPullRequest();

    List<String> getAllRepo();
}
