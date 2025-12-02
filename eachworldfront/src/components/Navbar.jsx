import { useNavigate } from 'react-router-dom';
import GooeyNav from './GooeyNav/GooeyNav';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="sticky top-0 z-50 flex justify-end pr-6 pt-4">
            <GooeyNav
                items={[
                    { label: '首页', onClick: () => navigate('/') },
                    { label: '文章', onClick: () => navigate('/articles') },
                    { label: '关于我', onClick: () => navigate('/about') },
                ]}
                // 可选高级设置：
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 4]}
            />
        </div>
    );
}
