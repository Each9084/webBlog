package com.each.eachworld.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ArticleMeta {
    private String id;
    private String title;
    private String summary;
    private String date;
    private String cover;
    private List<String> tags;
}
