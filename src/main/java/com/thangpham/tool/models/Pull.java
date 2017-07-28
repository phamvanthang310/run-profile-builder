package com.thangpham.tool.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by tpham.
 */
@NoArgsConstructor
@Getter
@Setter
public class Pull {
    private int id;
    private String title;
    private User user;
    private Link _links;
    private Head head;
}

class User {
    public String login;
}

class Link {
    public Html html;
}

class Html {
    public String href;
}

class Head {
    public Repo repo;
}

class Repo {
    public String name;
}