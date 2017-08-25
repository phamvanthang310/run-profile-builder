package com.thangpham.tool.models;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by tpham.
 */
@Getter
@Setter
@Builder
public class Jira implements Serializable {
    private static final long serialVersionUID = -3664377498916156339L;
    private int total;
    private List<Issue> issues;

    @Getter
    @Setter
    public static class Issue {
        private String key;
        private Fields fields;
        private String href; // Custom fields
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
