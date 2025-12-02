// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import Layout from './layout/Layout';
import ArticleListPage from './pages/ArticleListPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/articles"
        element={
          <Layout>
            <ArticleListPage />
          </Layout>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Layout>
            <ArticlePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />


    </Routes>

  );
}
