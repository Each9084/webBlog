package com.each.eachworld.controller;


import com.each.eachworld.model.ArticleMeta;
import com.each.eachworld.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//controller: 处理“HTTP 请求”并返回数据 像是餐厅服务员：把菜端给前端用户

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleMeta> listArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public String getArticle(@PathVariable String id) {
        return articleService.getArticleContent(id);
    }
}
