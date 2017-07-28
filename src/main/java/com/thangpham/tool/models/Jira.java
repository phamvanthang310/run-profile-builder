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
}

class Issue {
    public String key;
    public Fields fields;

}

class Fields {
    public Issuetype issuetype;
    public String summary;
}

class Issuetype {
    public String name;
    public boolean subtask;
}
