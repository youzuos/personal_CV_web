# 个人简历网页设计文档 v2

**日期**: 2026-05-21
**风格**: Aurora 动态渐变风格
**状态**: 已批准

## 设计理念

**Aurora 风格**：流动的极光渐变背景、浮动 3D 卡片、粒子点缀、高饱和度色彩组合，创造梦幻般的视觉体验。

---

## 配色方案

| 用途 | 颜色 | CSS |
|------|------|-----|
| **主渐变 1** | 霓虹紫 → 粉红 | `#a855f7 → #ec4899` |
| **主渐变 2** | 青色 → 蓝色 | `#06b6d4 → #3b82f6` |
| **主渐变 3** | 橙色 → 黄色 | `#f97316 → #eab308` |
| **深色背景** | 深紫黑 | `#030014` |
| **卡片背景** | 半透明玻璃 | `rgba(255,255,255,0.03)` + blur |
| **文字** | 纯白/灰白 | `#ffffff / #cbd5e1` |

---

## 页面特效

### 1. Aurora 流动背景

```
┌─────────────────────────────────────┐
│     ╭─────────────────────────╮     │
│    ╱                           ╲    │
│   │    流动的渐变光斑           │     │
│   │    多层叠加 + 模糊          │     │
│    ╲                           ╱    │
│     ╰─────────────────────────╯     │
└─────────────────────────────────────┘
```

- 使用 CSS `@keyframes` 实现渐变位置动画
- 3-4 层渐变球体叠加，不同大小和速度
- `filter: blur(80px)` 创造柔和光晕效果

### 2. 3D 浮动卡片

```
    ╱╲
   ╱  ╲  ← 悬停时轻微 3D 倾斜
  │    │
   ╲  ╱
    ╲╱
```

- Framer Motion `useMotionValue` 实现鼠标跟随倾斜
- `perspective: 1000px` + `rotateX/rotateY`
- 悬停时放大 + 发光边框

### 3. 粒子背景

- 轻量级 Canvas 粒子系统
- 随机漂浮的光点
- 鼠标互动（粒子避让或吸引）

### 4. 滚动动画

- 元素渐入 + 上移 + 缩放组合
- 视差滚动效果
- 页面切换平滑过渡

---

## 组件设计详解

### Hero 区域

```
        ◉ 头像（发光光环）
          ▼
    ┌─────────────────┐
    │   PAN Jiayun    │  ← 大字体 + 渐变文字
    │    Jaslyn       │
    │  Full-Stack...  │
    └─────────────────┘
    [LinkedIn] [GitHub]  ← 渐变按钮 + 悬停发光
          ↓
      ╱‾‾‾‾‾‾╲
      │ 滚动  │  ← 动态箭头
      ╲______╱
```

### 时间线卡片（工作经历）

```
    ┌─────●─────┐
    │           │
╔════╧══════════╧════════╗
║  📍 Company Name        ║  ← 3D 卡片 + 悬停倾斜
║  Full-Stack Engineer    ║
║  ───────────────────    ║
║  • Achievement 1        ║
║  • Achievement 2        ║
╚═════════════════════════╝
```

### 项目卡片网格

```
╔═══════════╦═══════════╗
║ Project 1 ║ Project 2 ║  ← Masonry 布局
╠═══════════╬═══════════╣  ← 不同高度
║ Project 3 ║ Project 4 ║
╚═══════════╩═══════════╝
```

---

## 技术实现要点

### Aurora 背景 CSS

```css
.aurora-bg {
  position: fixed;
  inset: 0;
  background: #030014;
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -50px) scale(1.1); }
  50% { transform: translate(-50px, 50px) scale(0.9); }
  75% { transform: translate(-30px, -30px) scale(1.05); }
}
```

### 3D 卡片组件

```jsx
// 使用 Framer Motion
const TiltCard = ({ children }) => {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMouseMove = (e) => {
    // 计算鼠标位置对应的旋转角度
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      className="glass-card-3d"
    >
      {children}
    </motion.div>
  )
}
```

### 粒子系统

```jsx
// 轻量级 Canvas 粒子
const ParticleBackground = () => {
  // 50-100 个随机光点
  // 缓慢漂浮动画
  // 鼠标互动效果
}
```

---

## 字体与排版

| 元素 | 字体/样式 |
|------|----------|
| 主标题 | Inter 700, 4.5rem, 渐变色 |
| 副标题 | Inter 400, 1.5rem, 灰色 |
| 正文 | Inter 400, 1rem, 间距 1.7 |
| 代码/技术栈 | JetBrains Mono, 高亮色 |

---

## 响应式设计

| 断点 | 布局调整 |
|------|----------|
| Mobile (<768px) | 单列，卡片全宽，减小字体 |
| Tablet (768-1024px) | 双列网格，中等字体 |
| Desktop (>1024px) | 三列网格，最大宽度 1280px |

---

## 更新的依赖

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

不需要额外依赖，使用原生 CSS + Framer Motion 实现所有效果。

---

## 与原设计的区别

| 方面 | 原设计 | Aurora 设计 |
|------|--------|-------------|
| 背景 | 静态渐变 | 流动光晕 + 粒子 |
| 卡片 | 平面 | 3D 倾斜 + 发光 |
| 动画 | 简单渐入 | 复杂组合动画 |
| 色彩 | 中等饱和度 | 高饱和霓虹色 |
| 交互 | 基础悬停 | 鼠标跟随 + 视差 |
