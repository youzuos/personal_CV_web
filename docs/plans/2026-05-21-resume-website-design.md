# 个人简历网页设计文档

**日期**: 2026-05-21
**设计者**: Claude
**状态**: 已批准

## 项目概述

构建一个现代风格的个人简历网页，用于求职申请和作品集展示。网页将采用 React SPA 架构，使用 Vite + TailwindCSS + Framer Motion 技术栈。

## 用户背景

- **姓名**: PAN Jiayun (Jaslyn)
- **教育**: 香港大学计算机科学硕士 (在读)，上海理工大学智能科学与技术学士
- **专业方向**: 全栈开发、AI工程、数据分析
- **目标**: 求职申请 + 个人作品集展示

## 技术选型

| 技术 | 用途 | 理由 |
|------|------|------|
| **React 18** | 前端框架 | 组件化开发，生态丰富 |
| **Vite** | 构建工具 | 极速开发体验，HMR 流畅 |
| **TailwindCSS** | CSS 框架 | 快速实现现代渐变风格 |
| **Framer Motion** | 动画库 | 流畅的滚动动画和交互效果 |
| **GitHub Pages** | 部署平台 | 免费静态托管 |

## 页面结构

单页滚动设计，包含以下区块：

```
┌─────────────────────────────────────┐
│         导航栏 (固定顶部)             │
├─────────────────────────────────────┤
│         Hero 区域                    │
│    (头像 + 姓名 + 一句话介绍)         │
│         渐变背景                     │
├─────────────────────────────────────┤
│         关于我                      │
│    (联系方式 + 社交链接)              │
├─────────────────────────────────────┤
│         工作经历                     │
│    (时间线布局)                      │
├─────────────────────────────────────┤
│         教育背景                     │
├─────────────────────────────────────┤
│         学术项目                     │
│    (卡片网格布局)                     │
├─────────────────────────────────────┤
│         领导力经验                    │
├─────────────────────────────────────┤
│         页脚                         │
└─────────────────────────────────────┘
```

## 设计风格

### 配色方案

| 用途 | 颜色 |
|------|------|
| 主背景 | `#0f172a` → `#1e1b4b` (深蓝到深紫渐变) |
| 卡片背景 | `rgba(255, 255, 255, 0.05)` + 模糊效果 |
| 主文字 | `#f8fafc` (白色) |
| 次要文字 | `#94a3b8` (灰色) |
| 强调色 | `#8b5cf6` (紫色) → `#06b6d4` (青色渐变) |

### 排版

- 字体: Inter / system-ui
- 标题: 600-700 字重
- 正文: 400 字重
- 行高: 1.6

### 交互效果

- 滚动时元素渐入 (fade-in + slide-up)
- 卡片悬停: 轻微放大 + 发光效果
- 导航链接: 平滑滚动到对应区块
- 按钮: 渐变背景 + 悬停动画

## 组件架构

```
src/
├── components/
│   ├── Hero.jsx          # 个人简介区域
│   ├── About.jsx         # 联系方式
│   ├── Experience.jsx    # 工作经历时间线
│   ├── Education.jsx     # 教育背景
│   ├── Projects.jsx      # 项目卡片网格
│   ├── Leadership.jsx    # 领导力经验
│   └── Navbar.jsx        # 固定导航栏
├── data/
│   └── resume.js         # 简历数据 (JSON 格式)
├── App.jsx               # 主应用组件
└── main.jsx              # 入口文件
```

## 内容映射

根据 `Panjiayun_SW.docx` 提取的数据结构：

```javascript
{
  name: "PAN Jiayun",
  nickname: "Jaslyn",
  contact: {
    phone: "(852) 8495-8638",
    email: ["j18388168@gmail.com", "u3665530@connect.hku.hk"],
    linkedin: "www.linkedin.com/in/jaslyn-pan",
    github: "https://github.com/youzuosED"
  },
  education: [...],
  experience: [...],
  projects: [...],
  leadership: [...]
}
```

## 响应式设计

| 断点 | 布局 |
|------|------|
| < 768px | 单列，卡片堆叠 |
| 768px - 1024px | 双列网格 |
| > 1024px | 三列网格，内容居中 1200px |

## 性能目标

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 部署方案

1. 构建静态文件: `npm run build`
2. 推送到 GitHub 仓库
3. 配置 GitHub Pages 从 `dist/` 目录部署
4. 配置自定义域名 (可选)

## 参考资料

- [UIdeck - Personal Website Templates](https://uideck.com/blog/free-personal-website-templates)
- [DevSnap - HTML Resume Templates](https://devsnap.me/html-resume-templates)
- [Colorlib - HTML5 Resume Templates](https://colorlib.com/wp/html5-resume-templates/)
