package com.thangpham.tool;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Profile(value = "mock")
public class ReleaseSupportingToolApplicationTests {

    @Test
    public void contextLoads() {
    }

}
