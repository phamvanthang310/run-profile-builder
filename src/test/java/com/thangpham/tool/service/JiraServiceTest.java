package com.thangpham.tool.service;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * Created by tpham.
 */
@RunWith(MockitoJUnitRunner.class)
public class JiraServiceTest {
    @Test
    public void givenAcceptingAllCertificatesUsing4_4_whenUsingRestTemplate_thenCorrect()
            throws ClientProtocolException, IOException {
        CloseableHttpClient httpClient = HttpClients.custom()
                .setSSLHostnameVerifier(new NoopHostnameVerifier())
                .build();
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setHttpClient(httpClient);

        ResponseEntity<String> response = new RestTemplate(requestFactory).exchange(
                "https://jira.rsi.lexisnexis.com/rest/api/2/search?jql=project = MAS AND issuetype in (Bug, Story, \"Bug Sub-Task\") AND Sprint = \"Dolphin 2017.S7.2\"", HttpMethod.GET, null, String.class);
        assertThat(response.getStatusCode().value(), equalTo(200));
    }

}