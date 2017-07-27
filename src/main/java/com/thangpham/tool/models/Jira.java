package com.thangpham.tool.models;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by tpham.
 */
@Getter
@Setter
@NoArgsConstructor
public class Jira {
    private int total;
    private List<Issue> issues;

    private class Issue {
        private String key;
        private Fields fields;

    }

    private class Fields {
        private IssueType issueType;
        private String summary;
    }

    private class IssueType {
        private String name;
        private boolean subtask;
    }
}


