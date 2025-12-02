// src/pages/AboutPage.jsx
import Layout from '../layout/Layout';

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center text-center px-6 py-16 max-w-2xl mx-auto">
            {/* 头像 */}
            <img
                src="https://avatars.githubusercontent.com/u/150721685"
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
            />

            {/* 名字 + 简介 */}
            <h1 className="text-3xl font-bold text-white mb-2">Each</h1>
            <p className="text-white/70 mb-6">
                这里是Each，一名国家级菜鸟开发者，目前专注于 Flutter 和 数据科学方向的学习与开发,这个网站是使用React开发的,正如你所见到的那样,一坨狗屎.
            </p>

            {/* 学历 */}
            <div className="bg-white/10 text-white rounded-lg px-6 py-4 mb-8 w-full text-left">
                <p className="text-sm font-semibold">背景</p>
                <ul className="mt-2 text-sm text-white/80 list-disc list-inside">
                    <li>本科：阿尔斯特大学 · 计算机科学</li>
                    <li>硕士：布里斯托大学 · 数据科学</li>
                </ul>
            </div>

            {/* 技术标签 */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
                {['SQL', 'Spring Boot', 'Python', 'Flutter', 'Dart', 'Java'].map((skill) => (
                    <span key={skill} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                        {skill}
                    </span>
                ))}
            </div>

            {/* 联系方式 */}
            <div className="flex flex-wrap justify-center gap-6 text-white/70">
                <a href="mailto:each9084@gamil.com" className="hover:text-white transition">📧 Email Each9084@gmail.com</a>
                <a href="https://github.com/Each9084" target="_blank" rel="noreferrer" className="hover:text-white transition">🐙 GitHub主页</a>
            </div>
        </div>
    );
}
