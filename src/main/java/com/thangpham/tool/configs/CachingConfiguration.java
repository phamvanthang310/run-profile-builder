package com.thangpham.tool.configs;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.guava.GuavaCacheManager;
import org.springframework.cache.support.NoOpCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.cache.CacheBuilder;

@Configuration
@EnableCaching
@EnableConfigurationProperties(CacheProperties.class)
public class CachingConfiguration extends CachingConfigurerSupport {
    private CacheProperties cacheProperties;

    @Autowired
    public CachingConfiguration(CacheProperties cacheProperties) {
        this.cacheProperties = cacheProperties;
    }

    @Bean
    @Override
    public CacheManager cacheManager() {
        if (cacheProperties.isEnable()) {
            GuavaCacheManager cacheManager = new GuavaCacheManager();
            CacheBuilder cacheBuilder = CacheBuilder.newBuilder()
                    .maximumSize(cacheProperties.getMaximumSize())
                    .expireAfterWrite(cacheProperties.getExpireTimeAfterWrite(), TimeUnit.MINUTES);

            cacheManager.setCacheBuilder(cacheBuilder);
            return cacheManager;
        }
        return new NoOpCacheManager();
    }
}
