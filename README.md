## 🖥️ 后端项目采用了经典的 **Spring Boot 三层架构（Model-Service-Controller）**，但将数据源暂时替换成了**本地文件**。

### 1. Model 层：`ArticleMeta.java` (数据模型)

**💡 思路与意义：**

- **技术细节：** 它是一个 **POJO (Plain Old Java Object)**，使用 `private` 字段来封装数据。
- **`@Data` (Lombok):** 使用了 Lombok 库。它通过注解自动生成了 `Getter`、`Setter`、`toString()` 等方法，省去了大量的样板代码，让代码**更简洁、更聚焦于业务逻辑**。
- **设计想法：** 这个类 (`ArticleMeta`) 完美对应了前端需要展示的文章**概览信息** (`title`, `summary`, `date`, `tags`)。它**故意不包含**文章的**完整内容**，这意味着当请求文章列表时，传输的数据量会很小，**提高了列表加载速度**。

### 2. Service 层：`ArticleService.java` (业务逻辑)

**💡 思路与意义：**

- **技术细节：** `@Service` 注解告诉 Spring 这是一个服务层组件，用于处理业务逻辑。这是“**大厨**”，负责所有数据的获取和处理。
- **设计想法：**
  1. **不使用数据库（初衷）：** 由于在 `application.properties` 中排除了 `DataSourceAutoConfiguration`，这意味着你一开始就决定**不接入 MySQL 或 PostgreSQL 等数据库**。
  2. **数据文件化：** 选择了使用两个文件作为数据源：
     - `article-meta.json`：用于文章**列表**数据。
     - `resources/posts/*.md`：用于文章**内容**数据。
  3. **`getAllArticles()`：** 负责读取 `article-meta.json`。它使用了 **`ObjectMapper`**（来自 Jackson 库），这是 Java 处理 JSON 数据的标准方式。它将 JSON 字符串**反序列化**为 `List<ArticleMeta>` 对象。
  4. **`getArticleContent(String id)`：** 负责根据 ID 读取对应的 `.md` 文件。它使用 **`ClassPathResource`** 来安全地从项目编译后的资源路径 (`resources` 文件夹) 中读取文件，然后将其内容作为纯文本 (`String`) 返回。

> **🌟 初学者提示：为什么这种设计很棒？**
>
> 这种文件存储方式被称为 **Flat-File Storage**。它让你在项目初期可以**完全跳过数据库的配置、连接、SQL 语句编写**等复杂步骤，直接把精力放在**前后端 API 联调**和**前端页面展示**上，极大地加快了原型开发速度。

### 3. Controller 层：`ArticleController.java` (接口)

**💡 思路与意义：**

- **技术细节：** `@RestController` 和 `@RequestMapping` 定义了 API 路径和返回 JSON 格式。
- **`@CrossOrigin(origins = "http://localhost:5173")`**：**非常关键！** 前端（Vite 默认端口 5173）和后端（Spring Boot 默认端口 8080）运行在不同的端口，浏览器会触发**跨域**安全限制。这个注解完美解决了这个问题，允许前端安全地访问后端接口。
- **`@GetMapping` 映射：**
  - `GET /api/articles`：返回文章列表数据（`List<ArticleMeta>`）。
  - `GET /api/articles/{id}`：返回文章的纯 Markdown 内容（`String`）。

> **🤝 前后端完美契合点：**
>
> 后端 `GET /api/articles/{id}` 返回 `String` 纯文本，正好对应前端 `ArticlePage.jsx` 使用 `fetch(...).then(res => res.text())` 获取纯文本。这是前后端分离的最佳实践之一。







## 🖥️ 前端代码分析 (React + Vite)

前端设计体现了清晰的**组件化、模块化**思想，并且对现代 Web 性能和用户体验考虑得非常周到。

### 1. 核心架构与路由 (Structure & Routing)

| **文件**         | **技术点/思想**        | **意义 (Why use this?)**                                     |
| ---------------- | ---------------------- | ------------------------------------------------------------ |
| **`main.jsx`**   | **`BrowserRouter`**    | **路由容器：** 它是 React Router 的核心，包裹整个应用，让应用具备 URL 导航能力。 |
| **`App.jsx`**    | **`Routes` & `Route`** | **路由定义：** 将不同的 URL 路径 (`/`, `/articles`, `/article/:id`) 映射到对应的页面组件，实现了**单页应用 (SPA)** 的页面切换。 |
|                  | **嵌套 `Layout`**      | **全局布局：** 将 `HomePage`, `ArticleListPage` 等页面包裹在 `Layout` 中。这意味着 `Navbar` 和 `Footer` (定义在 `Layout.jsx`) 永远不会随着页面切换而重新渲染，**保持了 UI 的一致性和高效性**。 |
| **`Layout.jsx`** | **Tailwind CSS 类**    | **全局样式：** `min-h-screen`, `bg-gradient-to-br from-black via-indigo-900 to-black` 定义了全站的背景、字体颜色和整体布局，确保每个页面都拥有统一的视觉风格。 |

### 2. 数据展示与性能 (Data & Performance)

文章列表页 (`ArticleListPage.jsx`) 展示了熟练使用 React 钩子 (Hooks) 来管理复杂数据的能力。

#### **文件: `ArticleListPage.jsx`**

| **技术点**        | **细节**                                                     | **意义 (Why use this?)**                                     |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`useState`**    | 管理 `articles`, `search`, `selectedTag`, `currentPage` 等状态。 | **响应式 UI：** 任何状态（如搜索词）变化时，React 都会自动重新渲染组件，更新界面。 |
| **`useMemo`**     | **1. `allTags`:** 从所有文章中提取唯一标签列表。 **2. `filteredArticles`:** 综合**搜索、标签筛选、日期排序**后的文章列表。 | **性能优化：** `useMemo` 确保**只有**当依赖项（如 `articles` 或 `articlesData`）变化时，才会重新计算结果。这避免了每次组件渲染都重新执行复杂的筛选和排序逻辑，**提高了用户操作的流畅性**。 |
| **分页逻辑**      | 通过计算 `totalPages` 和 `paginatedArticles`，只显示当前页的文章。 | **用户体验：** 避免一次性加载和显示数百篇文章，减轻了浏览器渲染压力，**加快了初次加载速度**。 |
| **`ArticleCard`** | 接收文章数据，点击后使用 `useNavigate` 跳转。                | **组件复用：** `HomePage` 和 `ArticleListPage` 都可以使用同一卡片组件，提高了开发效率。 |

#### **⚠️ 前后端联调要点：**

在 `ArticleListPage.jsx` 中，目前是：

JavaScript

```
// ArticleListPage.jsx
useEffect(() => {
    setArticles(articlesData); // 🚨 本地模拟数据
}, []);
```

**下一步需要替换为：**

JavaScript

```
// ArticleListPage.jsx (连接 Spring Boot 后)
useEffect(() => {
    fetch('http://localhost:8080/api/articles') // ✅ 请求后端列表接口
        .then(res => res.json())
        .then(data => setArticles(data))
        .catch(error => console.error("加载文章列表失败", error));
}, []);
```

### 3. 核心功能：Markdown 渲染与定制

**文件: `ArticlePage.jsx`**

这是处理 Markdown 的重中之重，设计非常专业：

| **技术点**                  | **细节**                                           | **意义 (Why use this?)**                                     |
| --------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| **`useParams`**             | 获取 URL 中的 `:id` (`article001`, `article002`)。 | **动态加载：** 确定当前要加载哪篇文章。                      |
| **`fetch` + `res.text()`**  | 请求后端 API 并以纯文本形式获取文章内容。          | **前后端约定：** 完美匹配后端提供的**纯 Markdown 文本**，而非 JSON 或 HTML。 |
| **`ReactMarkdown`**         | 核心渲染组件。                                     | **基础渲染：** 将 Markdown 语法（`# 标题`, `*斜体*`）转换为浏览器能识别的 HTML 元素。 |
| **`remarkGfm`**             | 插件：GitHub Flavored Markdown。                   | **功能扩展：** 支持 GitHub 风格的表格、任务列表 (task lists) 等，让Markdown 更强大。 |
| **`rehypeRaw`**             | 插件：允许解析 HTML 标签。                         | **安全性与灵活性：** 允许在 Markdown 中插入原始 HTML (例如 `span style="color: red;">`)，**在可控范围内**增加样式或复杂结构。 |
| **`rehypeHighlight`**       | 插件：代码高亮。                                   | **美观实用：** 自动识别代码块的语言，并使用 `highlight.js` 库进行语法着色（你引入了 `atom-one-dark.css` 样式），让代码可读性极高。 |
| **自定义 `components.pre`** | 封装了代码块组件。                                 | **UI 定制：** 在这里添加了**红黄绿圆点**的 Mac 风格窗口栏，以及自定义的 **`FadeCopyButton`** 组件，实现了**一键复制代码**的功能，极大地提升了用户的阅读体验。 |

### 4. 样式与高级组件

- **样式框架：** 从所有的 `className` 中可以看出，你使用了 **Tailwind CSS**（例如 `flex`, `gap-8`, `rounded-full`, `shadow-md`）。Tailwind CSS 是一个**原子化**的 CSS 框架，允许你直接在 HTML/JSX 中编写样式，大大加快了 UI 开发速度。
- **交互组件：** 你使用了 `GooeyNav` 实现了**粘液/流体效果**的导航栏。这属于**高级组件设计**，使用了复杂的 CSS 滤镜 (`filter: url(#goo)`) 和 JavaScript 逻辑（如 `getXY`, `createParticle`）来实现动态、非传统的 UI 效果，让你的博客更具个性。

------

## 总结与下一步计划

- **前端:** 架构清晰，功能组件化完善，并且已经为后端 API 预留了接口。
- **后端 (待升级):** 目前使用文件系统，需要升级到数据库（JPA）以支持未来文章的发布和编辑功能。

**接下来的首要任务是：**

1. **完成后端 JPA 升级
2. **联调测试：** 确保 Spring Boot 运行后，前端可以成功调用 `GET /api/articles` 获取列表，调用 `GET /api/article/{id}` 获取纯 Markdown 内容并成功渲染。