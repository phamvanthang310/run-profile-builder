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

    @Getter
    @Setter
    public static class User {
        private String login;
    }

    @Getter
    @Setter
    public static class Link {
        private Html html;
    }

    @Getter
    @Setter
    public static class Html {
        private String href;
    }

    @Getter
    @Setter
    public static class Head {
        private Repo repo;
    }

    @Getter
    @Setter
    public static class Repo {
        private String name;
    }
}
