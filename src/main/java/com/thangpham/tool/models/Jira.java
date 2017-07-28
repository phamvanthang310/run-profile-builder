package com.thangpham.tool.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Created by tpham.
 */
@Getter
@Setter
@NoArgsConstructor
public class Jira {
    private int total;
    private List<Issue> issues;

    @Getter
    @Setter
    public static class Issue {
        private String key;
        private Fields fields;
    }

    @Getter
    @Setter
    public static class Fields {
        private Issuetype issuetype;
        private String summary;
    }

    @Getter
    @Setter
    public static class Issuetype {
        private String name;
        private boolean subtask;
    }
}
