# Admission Portfolio Implementation Plan

> **For agentic workers:** Execute tasks inline in the current session. Steps use checkbox tracking.

**Goal:** 将 PRISM 调整为包含首页、CV、学业成绩、经历、探索的中文保研展示初版。

**Architecture:** 复用 PRISM 配置加载、动态路由和现有文本/卡片组件。修改内容配置、必要的身份元数据及本地素材。

**Tech Stack:** Next.js 15、React 19、TypeScript、Tailwind CSS、TOML、Markdown。

---

## 内容和导航

- [x] 修改 `content/config.toml` 与 `content_zh/config.toml`，将导航改为已确认的五项。
- [x] 更新首页 TOML、简介和 CV，移除被展示的原示例身份、经历和论文。
- [x] 新建 `content/academics.toml`、`content/experience.toml`、`content/exploration.toml`，复用卡片页面。
- [x] 添加 `public/profile-placeholder.svg` 和 `PERSONALIZE.md`。

## 站点检查

- [x] 将页面元数据中的博士关键词与示例站点名称改为保研展示信息。
- [x] 运行 `npm run build`，确认导出首页及四个子页。
- [x] 在本地打开预览，检查五个栏目、手机菜单和主题切换。
- [x] 记录验证结果及仍待用户补充的个人资料。
