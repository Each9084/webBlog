// src/pages/ArticlePage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // 或换成 atom-one-dark.css 等你喜欢的风格
import ReactDOM from 'react-dom';
import Layout from '../layout/Layout';

function CopyToast({ show }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-lg shadow-md animate-slide-fade-in-out text-sm">
            ✅ 已复制
        </div>
        ,
        document.body
    );
}

function FadeCopyButton({ codeText }) {
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeText);
        setCopied(true);
        setShowToast(true);

        setTimeout(() => setCopied(false), 1500); // 按钮还原
        setTimeout(() => setShowToast(false), 2000); // 提示消失
    };

    return (
        <>
            <button
                onClick={handleCopy}
                className="text-white/70 hover:text-white text-xs px-2 py-1 rounded transition"
            >
                {copied ? '✅ 已复制' : '📋'}
            </button>
            <CopyToast show={showToast} />
        </>
    );
}

export default function ArticlePage() {
    const { id } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/article/${id}`)
            .then(res => res.text())
            .then(setContent)
            .catch(() => setContent('文章加载失败 😢'));
    }, [id]);

    return (
        <div className="min-h-screen bg-white text-black px-6 py-12 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">文章内容</h1>

            // ArticlePage.jsx 中的 ReactMarkdown 组件部分
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                    pre: ({ children }) => {
                        const codeText = children[0]?.props?.children?.join?.('') || '';

                        return (
                            <div className="my-6 rounded-2xl bg-[#282C34] text-white shadow-md overflow-hidden relative">
                                {/* 顶部栏 + 按钮 */}
                                <div className="flex items-center justify-between px-4 py-2 bg-[#2c2c2c] text-sm font-mono border-b border-gray-700">
                                    <div className="flex space-x-2">
                                        <span className="w-3 h-3 bg-red-500 rounded-full" />
                                        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                                        <span className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <span className="text-white/70">Code Snippet</span>
                                    <FadeCopyButton codeText={codeText} />
                                </div>

                                <pre className="overflow-x-auto text-sm p-4 font-mono leading-relaxed">
                                    {children}
                                </pre>
                            </div>
                        );
                    },
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline ? (
                            <code className={`${className} text-white`} {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className="bg-gray-700 px-1 rounded text-white text-sm" {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            />

        </div>
    );
}
