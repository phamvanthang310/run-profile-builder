package com.thangpham.tool.rest;

import com.thangpham.tool.service.ICheckProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by tpham.
 */
@RestController
@RequestMapping("/api/profile")
public class CheckProfileRestController {
    private ICheckProfileService service;

    @Autowired
    public CheckProfileRestController(ICheckProfileService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String checkoutProfile() {
        return service.checkoutProfile();
    }
}
