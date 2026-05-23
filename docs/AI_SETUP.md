# AI Assistant Setup Guide

## 功能说明

AI Assistant 组件可以根据输入的职位名称和职位要求，自动生成个性化的"为什么我是一个好的候选人"回答。

## 配置步骤

### 1. 获取 Deepseek API 密钥

1. 访问 [Deepseek Platform](https://platform.deepseek.com/api_keys)
2. 注册/登录账户
3. 创建新的 API 密钥

### 2. 配置后端服务

编辑 `server/.env` 文件：

```env
DEEPSEEK_API_KEY=your_actual_api_key_here
DEEPSEEK_API_URL=https://api.deepseek.com/v1
PORT=3001
```

### 3. 启动服务

**方式一：同时启动前端和后端（推荐）**
```bash
npm run dev:all
```

**方式二：分别启动**
```bash
# 终端1 - 启动后端
npm run server

# 终端2 - 启动前端
npm run dev
```

## 使用说明

1. 打开网站，找到 "Why Am I A Good Candidate?" 部分
2. 点击右上角的 "自定义职位" 按钮
3. 输入：
   - 职位名称（例如：前端工程师）
   - 职位要求（例如：熟悉React、TypeScript，有3年以上经验...）
4. 点击 "生成回答"
5. AI将根据你的简历和职位信息生成针对性回答

## 注意事项

- 此功能仅用于回答职位相关问题
- 如果输入无关问题，AI会提示仅支持职位相关咨询
- AI会自动检测语言（中英文）并使用相应语言回答
- 确保后端服务器正在运行才能使用自定义生成功能

## 故障排除

**Q: 提示 "Failed to generate answer"**
A: 检查后端服务器是否正在运行（`npm run server`）

**Q: 提示 "Deepseek API not configured"**
A: 确认已在 `server/.env` 中配置正确的 API 密钥

**Q: 端口3001被占用**
A: 修改 `server/.env` 中的 PORT 值
