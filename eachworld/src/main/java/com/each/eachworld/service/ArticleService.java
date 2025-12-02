package com.each.eachworld.service;

import com.each.eachworld.model.ArticleMeta;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;

//service 处理“业务逻辑”：数据从哪来、怎么处理 像是厨师准备食材 + 做饭
@Service
public class ArticleService {

    public List<ArticleMeta> getAllArticles() {
        try {
            // 从 classpath 中读取 JSON 文件
            ClassPathResource resource = new ClassPathResource("article-meta.json");
            InputStream inputStream = resource.getInputStream();

            ObjectMapper objectMapper = new ObjectMapper();
            List<ArticleMeta> articles = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<ArticleMeta>>() {}
            );
            return articles;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public String getArticleContent(String id) {
        try {
            ClassPathResource resource = new ClassPathResource("posts/" + id + ".md");
            return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            return "文章加载失败 😢";
        }
    }

    public String getArticleContentById(String id) {
        try {
            ClassPathResource resource = new ClassPathResource("articles/" + id + ".md");
            byte[] data = FileCopyUtils.copyToByteArray(resource.getInputStream());
            return new String(data, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("文章内容加载失败: " + id, e);
        }
    }

}
