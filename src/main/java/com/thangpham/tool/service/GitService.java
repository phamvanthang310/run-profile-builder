package com.thangpham.tool.service;

import com.thangpham.tool.configs.GitProperties;
import com.thangpham.tool.models.Pull;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.ListUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by tpham.
 */
@Service
@ConditionalOnProperty(name = "git.mock", havingValue = "false", matchIfMissing = true)
public class GitService extends AbstractGateway implements IGitService {
    private static final Logger LOGGER = LoggerFactory.getLogger(GitService.class);
    protected GitProperties gitProperties;

    @Autowired
    public GitService(GitProperties gitProperties, RestTemplate restTemplate) {
        super(restTemplate);
        this.gitProperties = gitProperties;
    }

    @Override
    public List<Pull> getPullRequest(String repoName) {
        String url = gitProperties.getDomain() + String.format(gitProperties.getFetchPullRequestUrl(), repoName);
        LOGGER.debug("Fetch Pull Request: [{}] : [{}]", repoName, url);

        HttpHeaders headers = new HttpHeaders();
        headers.put("Authorization", Collections.singletonList("token " + gitProperties.getToken()));

        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), new ParameterizedTypeReference<List<Pull>>() {
        }).getBody();
    }

    @Override
    public List<Pull> getAllPullRequest() {
        if (CollectionUtils.isEmpty(gitProperties.getRepos())) {
            return ListUtils.EMPTY_LIST;
        }
        return getAllRepo().stream().flatMap(repo -> getPullRequest(repo).stream()).collect(Collectors.toList());
    }

    @Override
    public List<String> getAllRepo() {
        return gitProperties.getRepos();
    }
}
