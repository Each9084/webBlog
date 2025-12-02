import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import BlurText from '../TextAnimations/BlurText/BlurText';
import ArticleCard from '../components/ArticleCard';
import articlesData from '../data/articles';

export default function HomePage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // 模拟接口获取：这里用本地 data，未来可换成 fetch('/api/articles')
        setArticles(articlesData);
    }, []);

    return (
        <main className="flex flex-col justify-center items-center px-4 py-16 text-center">
            <BlurText text="欢迎来到我的博客" />
            <p className="mt-6 max-w-xl text-white/70 text-lg">
                记录代码、思考与成长。探索每一个点滴灵感。
            </p>

            <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        summary={article.summary}
                        date={article.date}
                        cover={article.cover}     // ✅ 新增封面图
                        tags={article.tags}       // ✅ 新增标签
                    />
                ))}

            </section>
        </main>
    );
}
