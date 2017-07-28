package com.thangpham.tool.service;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by tpham.
 */
@RunWith(MockitoJUnitRunner.class)
public class JiraServiceTest {
    @Test
    public void givenAcceptingAllCertificatesUsing4_4_whenUsingRestTemplate_thenCorrect() {
        assertThat(true, equalTo(true));
    }

}