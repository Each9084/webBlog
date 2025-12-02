import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ id, title, summary, date, cover, tags }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/article/${id}`)}
            className="cursor-pointer bg-white/5 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
        >
            {/* 封面图 */}
            {cover && (
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            )}

            <div className="p-4">
                {/* 标题 */}
                <h2 className="text-lg font-semibold mb-1">{title}</h2>

                {/* 日期 */}
                <p className="text-xs text-white/40 mb-2">{date}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags?.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-indigo-600/80 text-white text-xs px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* 摘要 */}
                <p className="text-white/70 text-sm">{summary}</p>
            </div>
        </div>
    );
}
