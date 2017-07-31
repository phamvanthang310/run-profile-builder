package com.thangpham.tool.service;

import java.util.List;

import com.thangpham.tool.models.Pull;
import com.thangpham.tool.models.Repo;

public interface IGitService {
    String JENKIN_BUILD_PREFIX = "jenkins";

    List<Pull> getPullRequest(String repoName);

    List<Pull> getAllPullRequest();

    List<Repo> getAllRepo();
}
