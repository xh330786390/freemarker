package com.demo.freemarker.controller;

import com.demo.freemarker.domain.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexController {
    @RequestMapping("/index")
    public ModelAndView test(@RequestParam(defaultValue = "0") long id) {

        ModelAndView modelAndView = new ModelAndView();

//        User user = new User();
//        user.setId(1L);
//        user.setName("tengxh");
//        modelAndView.addObject("user", user);
        modelAndView.setViewName("index");
        return modelAndView;
    }
}
