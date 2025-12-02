// src/pages/ArticleListPage.jsx
import { useEffect, useMemo, useState } from 'react';
import articlesData from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import Layout from '../layout/Layout';

export default function ArticleListPage() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const ARTICLES_PER_PAGE = 6;

    // 所有文章加载一次（模拟 fetch）
    useEffect(() => {
        setArticles(articlesData);
    }, []);

    // 所有标签（去重）
    const allTags = useMemo(() => {
        const tagSet = new Set();
        //	遍历每篇文章 	遍历每个标签  	添加到 Set（去重）
        articlesData.forEach(a => a.tags.forEach(t => tagSet.add(t)));
        return Array.from(tagSet);
    }, []);

    // 筛选 + 搜索 + 排序后的文章
    const filteredArticles = useMemo(() => {
        return articles
            .filter(article =>
                (!selectedTag || article.tags.includes(selectedTag)) &&
                (article.title.toLowerCase().includes(search.toLowerCase()) ||
                    article.summary.toLowerCase().includes(search.toLowerCase()))
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // 新到旧
    }, [articles, search, selectedTag]);

    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * ARTICLES_PER_PAGE,
        currentPage * ARTICLES_PER_PAGE
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-white">所有文章</h1>

            {/* 搜索框 */}
            <input
                type="text"
                placeholder="搜索文章标题或摘要..."
                className="w-full px-4 py-2 mb-6 rounded bg-white/10 text-white placeholder:text-white/40"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />

            {/* 标签筛选 */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    className={`px-3 py-1 rounded-full text-sm ${selectedTag === '' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                    onClick={() => {
                        setSelectedTag('');
                        setCurrentPage(1);
                    }}
                >
                    全部
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                        onClick={() => {
                            setSelectedTag(tag);
                            setCurrentPage(1);
                        }}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            {/* 文章卡片展示 */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map(article => (
                    <ArticleCard key={article.id} {...article} />
                ))}
            </div>

            {/* 分页控制 */}
            <div className="flex justify-center mt-10 gap-2 text-sm">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

