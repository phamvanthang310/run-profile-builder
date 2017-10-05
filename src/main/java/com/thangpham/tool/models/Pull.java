package com.thangpham.tool.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * Created by tpham.
 */
@NoArgsConstructor
@Getter
@Setter
public class Pull implements Serializable {
    private static final long serialVersionUID = -3406156803827667700L;
    private int id;
    private String title;
    private User user;
    private Link _links;
    private Head head;

    @Getter
    @Setter
    public static class User implements Serializable {
        private String login;
    }

    @Getter
    @Setter
    public static class Link implements Serializable {
        private Html html;
    }

    @Getter
    @Setter
    public static class Html implements Serializable {
        private String href;
    }

    @Getter
    @Setter
    public static class Head implements Serializable {
        private Repo repo;
    }

    @Getter
    @Setter
    public static class Repo implements Serializable {
        private String name;
    }
}
