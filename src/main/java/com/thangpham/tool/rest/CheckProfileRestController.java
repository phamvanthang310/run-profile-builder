package com.thangpham.tool.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.thangpham.tool.service.CheckProfileService;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping("/api/profile")
public class CheckProfileRestController {
    private CheckProfileService service;

    @Autowired
    public CheckProfileRestController(CheckProfileService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String checkoutProfile() {
        return service.checkoutProfile();
    }
}
