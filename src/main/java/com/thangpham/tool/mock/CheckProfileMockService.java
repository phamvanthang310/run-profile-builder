package com.thangpham.tool.mock;

import com.thangpham.tool.configs.CheckProfileProperties;
import com.thangpham.tool.service.ICheckProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "checkprofile.mock", havingValue = "true")
public class CheckProfileMockService implements ICheckProfileService {
    private CheckProfileProperties checkProfileProperties;

    @Autowired
    public CheckProfileMockService(CheckProfileProperties checkProfileProperties) {
        this.checkProfileProperties = checkProfileProperties;
    }

    @Override
    public String checkoutProfile() {
        return checkProfileProperties.getProfiles();
    }
}
