# CLAUDE.md — Portfolio

## 关于本项目

`sl820` 的个人作品集（hbusl 是本机 git user.name，GitHub 用户名是 `sl820`）。**双轨身份**：

- **设计 / 视觉**：晶澜智汇 IP 设计等
- **学术 / 研究**：PRISMA 系统综述（公共图书馆 / 智慧博物馆 3D）、LLM 知识图谱、DTU 评测、Zotero 工具流

部署到 Cloudflare Pages，绑定自定义域。

## 设计原则（红线 · 不可妥协）

1. **多色编辑性（Editorial Multi-Color）**：1 底 + 1 墨 + 6 语义色，色不在多，克制使用。
2. **字体是主角**：中英双轴，4 款字体。字号反差大（12–120px），衬线主导。
3. **留白即设计**：页面四周负空间 ≥25%，段落节奏松紧交替。
4. **网格即秩序**：12 列基线网格，所有内容对齐基线。
5. **动效克制**：0.6–1.2s 缓动，只在转场 / Hero / 光标使用。
6. **零 emoji 装饰**：UI 中绝不出现 emoji（仅 MDX 内容作者原话可用）。
7. **零渐变色**：不要 `linear-gradient`，必要时用纯色叠加。
8. **零 drop-shadow**：阴影只用 1px 印刷线 `box-shadow: 0 1px 0 var(--ink)`。
9. **零 icon font**：所有 icon 用 inline SVG。
10. **零默认 Tailwind 调色板**：禁止 `bg-blue-500` 等预设色，全部用 design token。

## 调色板（已锁定 · 苏州博物馆调）

```css
--paper:    #F2EEE3;   /* 背景 */
--ink:      #0F0F0E;   /* 文本 */
--rule:     #1A1A1A;   /* 分割线 */
--mute:     #6B6B6B;   /* 次要文本 */
--cinnabar: #C8412C;   /* 朱砂 — design track */
--cobalt:   #1E3A8A;   /* 青金 — research track */
--ochre:    #C68E3C;   /* 赭石 — tooling track */
--sage:     #6B7556;   /* 青苔 — writing / notes */
--lilac:    #8B5E83;   /* 藕荷 — accent */
--umber:    #3E2C1E;   /* 墨褐 — deep accent */
```

**用法**：
- 背景统一 `--paper`，禁止白底 / 纯黑底
- 文本统一 `--ink`，副文用 `--mute`
- 强调色按 track 路由使用：design → 朱砂，research → 青金，tooling → 赭石
- 每个作品案例用 1 个主色作 accent

## 字体系统（全免费）

| 用途 | 中文 | 英文 |
|---|---|---|
| 显示 / 标题 | 思源宋体 SC（Noto Serif SC） | Fraunces Variable |
| 正文 / UI | 思源黑体 SC（Noto Sans SC） | Inter Variable |
| 长文阅读 | 思源宋体 SC | Source Serif 4 |
| 代码 / 数据 | 鸿蒙 Mono | JetBrains Mono Variable |
| 装饰 / 引文 | 霞鹜文楷 TC | — |

**MVP 阶段**：Google Fonts CDN（Noto Serif SC / Noto Sans SC / Inter / Fraunces / Source Serif 4 / JetBrains Mono / LXGW WenKai TC）。
**优化阶段**：Fontsource 自托管 + 中文字体子集化（glyphhanger / fonttools），总大小 ≤2MB。

## 目录约定

```
src/
├── content/           MDX 内容
│   ├── config.ts      zod schema（works 必有 title/track/year/color/role）
│   ├── works/         作品 MDX（每篇一案）
│   └── notes/         随笔 MDX
├── components/
│   ├── layout/        BaseLayout, Nav, Footer, PageHeader
│   ├── ui/            Button, Tag, Card, Pill
│   ├── typography/    Heading, Prose, Kicker, Caption
│   ├── works/         WorkCard, WorkMeta, WorkHero, ColorTag
│   └── motion/        Reveal, ScrollProgress
├── layouts/           页面级 layout（WorksLayout, NoteLayout）
├── pages/             路由
│   ├── index.astro
│   ├── works/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── notes/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── research.astro
│   ├── about.astro
│   ├── contact.astro
│   └── 404.astro
├── lib/
│   ├── site.ts        站点元信息（name / tagline / nav / social）
│   ├── works.ts       数据查询 / 过滤
│   └── tokens.ts      调色板 / 字体 JS 端映射
├── styles/
│   ├── tokens.css     设计 token（@theme + CSS variables）
│   ├── typography.css 排版规范
│   └── global.css     全局重置 + 基础样式
└── assets/
    ├── fonts/         自托管字体（预留）
    ├── images/        内联图片（预留）
    └── icons/         SVG icon（预留）
```

## 命名规范

- 文件名 kebab-case：`work-hero.astro`
- 组件 PascalCase 导出：`WorkHero.astro`
- 变量 / 函数 camelCase
- 常量 UPPER_SNAKE
- MDX 文件：`YYYY-MM-slug.mdx`（按时间倒序）

## MDX frontmatter 标准（works）

```yaml
---
title: 晶澜智汇 IP 设计
subtitle: 苏州工业园区 IP 形象设计竞赛
track: design                  # design | research | tooling
year: 2026
date: 2026-06-07
color: cinnabar                # cinnabar | cobalt | ochre | sage | lilac | umber
role: 主创设计师
client: 苏州工业园区
tags: [ip, character, branding]
summary: 一句话总结
cover: ./cover.png
gallery:
  - ./01.png
---
```

## 常用命令

```bash
pnpm install        # 装依赖
pnpm dev            # 启动 dev server (localhost:4321)
pnpm build          # 构建生产（type check + 静态构建）
pnpm preview        # 预览生产构建
pnpm deploy         # 部署到 Cloudflare Pages
```

## 工作流

1. **新作品**：在 `src/content/works/` 新建 MDX，按 frontmatter schema 写 → 自动出现在 `/works` 列表
2. **新笔记**：在 `src/content/notes/` 新建 MDX
3. **修改设计 token**：编辑 `src/styles/tokens.css`，所有页面自动生效
4. **修改导航**：编辑 `src/lib/site.ts`
5. **修改调色板**：在 `tokens.css` 改色值，并在 `lib/tokens.ts` 同步（JS 端需要的地方）

## 验证（每次改动必跑）

1. `pnpm build` 通过（type check + 静态构建）
2. 关键改动（设计 token / 导航 / 排版）在 dev server 截图确认
3. 部署前在 preview 环境再过一遍

## 反面教材（不要学）

- ❌ Dopefolio / simplefolio 那种 emoji + 彩虹渐变
- ❌ Tailwind 默认配色（`bg-blue-500` 等）
- ❌ 圆角卡片 + drop-shadow 组合
- ❌ 多余 hover 效果（颜色翻转 / 缩放 / rotate）
- ❌ 加载动画 / 进度条 / 骨架屏
- ❌ 模态弹窗（用 inline 详情或新页面）
- ❌ 模板套娃（fork 后不改直接用）

## 性能预算

- Lighthouse Performance ≥ 95
- Lighthouse Accessibility ≥ 95
- LCP < 1.5s
- CLS < 0.05
- Total JS < 30KB（默认零 JS，必要时用 View Transitions + Motion One）
- 中文字体子集化后总大小 < 2MB
