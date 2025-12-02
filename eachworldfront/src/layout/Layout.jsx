// src/layout/Layout.jsx
import Navbar from '../components/Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-indigo-900 to-black text-white">
            <Navbar />
            <main className="flex-grow">{children}</main>

            {/* ✅ 全站统一页脚 */}
            <footer className="text-sm text-white/40 text-center py-6 border-t border-white/10">
                © 2025 EachWorld. All rights reserved.
            </footer>
        </div>
    );
}
