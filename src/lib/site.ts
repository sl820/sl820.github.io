// ============================================================
// 站点元信息 · 唯一来源
// ============================================================

export const SITE = {
  name: "萧博实",
  nameEn: "Hbu Sl · Xiaoboshi",
  handle: "sl820",
  domain: "sl820.pages.dev",
  email: "hbusl@example.com", // TODO: 替换
  location: "苏州 / 杭州",
  year: new Date().getFullYear(),

  // 一句话主张（首屏主标题副文）
  tagline: "在算法、器物与排版之间，建造可被阅读的系统。",
  taglineEn: "Building systems that read well — at the intersection of algorithms, artifacts, and typography.",

  // 简介（about 页面用）
  bio: "设计师 / 学术研究者。在苏州与杭州之间往返，做字符、做器物、做长程研究。关心的是：什么样的结构，能让复杂的东西被普通读者读进去。",

  // 社交
  social: [
    { label: "GitHub", href: "https://github.com/sl820", uid: "github" },
    { label: "Email", href: "mailto:hbusl@example.com", uid: "email" },
  ] as const,

  // 导航
  nav: [
    { label: "Works", href: "/works", uid: "works" },
    { label: "Research", href: "/research", uid: "research" },
    { label: "Notes", href: "/notes", uid: "notes" },
    { label: "About", href: "/about", uid: "about" },
    { label: "Contact", href: "/contact", uid: "contact" },
  ] as const,
} as const;

// 调色板 JS 端映射（用于内联 SVG、动态样式等不能用 CSS 变量的场景）
export const COLORS = {
  paper: "#F2EEE3",
  ink: "#0F0F0E",
  rule: "#1A1A1A",
  mute: "#6B6B6B",
  cinnabar: "#C8412C",
  cobalt: "#1E3A8A",
  ochre: "#C68E3C",
  sage: "#6B7556",
  lilac: "#8B5E83",
  umber: "#3E2C1E",
} as const;

export type Track = "design" | "research" | "tooling";
export type ColorKey = keyof typeof COLORS;

export const TRACK_META: Record<Track, { label: string; labelEn: string; color: ColorKey; colorHex: string }> = {
  design: { label: "设计", labelEn: "Design", color: "cinnabar", colorHex: COLORS.cinnabar },
  research: { label: "研究", labelEn: "Research", color: "cobalt", colorHex: COLORS.cobalt },
  tooling: { label: "工具", labelEn: "Tooling", color: "ochre", colorHex: COLORS.ochre },
};
