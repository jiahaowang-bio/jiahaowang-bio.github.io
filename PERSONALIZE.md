# 保研个人展示网站

## 本地运行

在本目录打开终端，运行 `npm ci`，再运行 `npm run dev`。访问终端输出的本地网址。

运行 `npm run build` 会在 `out/` 导出静态网站。当前版本只提供本地预览，尚未发布到公网。

## 修改个人内容

- `content/config.toml`：英文站点名称、身份与导航，以及共用头像、邮箱和语言设置。
- `content_zh/config.toml`：中文站点名称、身份与导航。
- `content/bio.md` 与 `content_zh/bio.md`：英文和中文首页简介。
- `content/about.toml` 与 `content_zh/about.toml`：首页栏目、研究兴趣。
- `content/cv.toml` 与 `content_zh/cv.toml`：简历图片、原始 PDF 下载路径与中英文按钮名称。
- `content/cv-intro.md` 与 `content_zh/cv-intro.md`：简历页的中英文说明。
- `public/jiahao-wang-cv.pdf`：下载使用的原始简历；`public/jiahao-wang-cv-preview.png`：网页直接展示的简历图片。
- `content/academics.toml` 与 `content_zh/academics.toml`：英文和中文成绩概况、核心课程、语言成绩。
- `content/experience.toml` 与 `content_zh/experience.toml`：英文和中文科研、竞赛、实习等经历，可删除没有的条目。
- `content/exploration.toml` 与 `content_zh/exploration.toml`：英文和中文科研阅读、自主研究、技术项目和实践尝试。
- `content/overview.md` 与 `content_zh/overview.md`：首页展示内容卡片。
- `public/`：头像、截图与附件。例如 `public/avatar.jpg` 在配置中写为 `/avatar.jpg`。

网站默认显示中文，导航右侧可以切换到 English，并记住访客的选择。`content/` 存放英文内容，`content_zh/` 存放中文内容。中文界面称为“简历”，英文界面称为“CV”，两种语言的简历栏目均在导航最后。

## 填写原则

姓名、照片、学校、基地、年级、研究兴趣和联系方式已根据用户提供的信息填写。成绩、八门核心课程、英语能力、两段科研项目与统计建模竞赛已从简历整理到中英文栏目；探索栏目按项目中的研究问题、方法与实践组织。简历页直接显示用户 PDF 渲染的图片，并提供原始 PDF 下载。

内容来源和确认记录见 `RESUME-CONTENT.md`。网页年级沿用用户确认的“大三”，竞赛模型名称按用户确认改为 EfficientNet-B2。后续补充成果、指标和作品链接时，请同步修改两个语言目录。

原模板的论文、教学等示例文件保留在源码中，但不在当前导航和导出页面中使用。

## 配色

当前配色已按用户要求恢复为 PRISM 最初的白色背景、深蓝文字和金色强调色。`src/app/globals.css` 中的 `--background`、`--primary`、`--accent` 定义主要颜色；浅色模式分别为 `#FEFFFE`、`#1E293B`、`#D4A562`。深色模式也恢复原模板的深蓝背景与金色强调色。
