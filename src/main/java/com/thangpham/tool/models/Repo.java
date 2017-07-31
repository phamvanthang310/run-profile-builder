package com.thangpham.tool.models;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created by tpham.
 */
@Getter
@Setter
@NoArgsConstructor
public class Repo implements Serializable {
    private static final long serialVersionUID = -579967055922916012L;
    private String name;
    private String jenkinBuildName;
}
