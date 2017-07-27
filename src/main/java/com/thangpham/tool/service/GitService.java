package com.thangpham.tool.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.thangpham.tool.configs.GitProperties;

/**
 * Created by tpham.
 */
@Service
public class GitService {
    private GitProperties gitProperties;
    private RestTemplate restTemplate;

    @Autowired
    public GitService(GitProperties gitProperties, RestTemplate restTemplate) {
        this.gitProperties = gitProperties;
        this.restTemplate = restTemplate;
    }

    public Object fetchPullRequest(String repoName) {
        String url = gitProperties.getDomain() + String.format(gitProperties.getFetchPullRequestUrl(), repoName);

        HttpHeaders headers = new HttpHeaders();
        headers.put("Authorization", Collections.singletonList("token " + gitProperties.getToken()));

        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), Object.class).getBody();
    }

}
