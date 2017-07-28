package com.thangpham.tool.mock;

import com.fasterxml.jackson.core.type.TypeReference;
import com.thangpham.tool.configs.GitProperties;
import com.thangpham.tool.models.Pull;
import com.thangpham.tool.service.IGitService;
import com.thangpham.tool.util.JsonObjectMapper;
import org.apache.commons.collections.ListUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@ConditionalOnProperty(name = "git.mock", havingValue = "true")
public class GitMockService implements IGitService {
    private static final Logger LOGGER = LoggerFactory.getLogger(GitMockService.class);
    private GitProperties gitProperties;

    @Autowired
    public GitMockService(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Override
    public List<Pull> getPullRequest(String repoName) {
        return getAllPullRequest().stream()
                .filter(pull -> repoName.equalsIgnoreCase(pull.getHead().getRepo().getName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Pull> getAllPullRequest() {
        JsonObjectMapper objectMapper = JsonObjectMapper.get();
        try {
            return objectMapper.readValue(gitProperties.getPullRequests(), new TypeReference<List<Pull>>() {
            });
        } catch (Exception e) {
            LOGGER.error("Cannot parse pull request data from mockService", e);
        }
        return ListUtils.EMPTY_LIST;
    }

    @Override
    public List<String> getAllRepo() {
        return gitProperties.getRepos();
    }
}
