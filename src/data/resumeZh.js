// src/data/resumeZh.js
export const resumeDataZh = {
  name: "潘佳芸",
  nickname: "Jaslyn",
  tagline: "全栈 AI 工程师 | 香港大学 计算机科学硕士",
  contact: {
    phone: "(86) 15202131697",
    emails: ["panjiayun025@163.com", "u3665530@connect.hku.hk"],
    linkedin: "https://www.linkedin.com/in/jaslyn-pan",
    github: "https://github.com/youzuos"
  },
  education: [
    {
      school: "香港大学 (HKU)",
      location: "香港",
      degree: "计算机科学 硕士",
      period: "09/2025 - 08/2026",
      gpa: null
    },
    {
      school: "上海理工大学 (USST)",
      location: "上海",
      degree: "智能科学与技术专业 工学学士",
      period: "09/2021 - 07/2025",
      gpa: "4.0/4.5 (90.94/100), 排名: 2/44 (前5%)"
    }
  ],
  experience: [
    {
      company: "Docpro Limited",
      location: "香港",
      position: "AI 全栈工程师 实习生",
      period: "12/2025 - 至今",
      icon: "🤖",
      achievements: [
        "全新搭建了公司的广告网页，适用于新用户，增加公司 6% 的谷歌引流",
        "在公司的 AI Chatbot 中应用了 RAG，平均减少了约 60% 的 tokens 消耗",
        "编写了使用此平台的 skill，在主机安装 Openclaw 并成功使用，使平台更 agent 友好，减少约 80% 的 tokens 消耗",
        "使用 Prisma 创建新的数据库项目，使管理员可以设置新广告发布时间，到期自动发布或下架",
        "利用 Azure 切换模型，并部署新的网页 URL"
      ]
    },
    {
      company: "延锋国际技术中心",
      location: "上海",
      position: "成本分析 实习生",
      period: "09/2024 - 08/2025",
      icon: "💰",
      achievements: [
        "基于机器学习，研究注塑件成本与成本相关驱动因子之间的关系",
        "基于 Python 和 VBA 开发了成本分析相关数据转换及导入工具"
      ]
    },
    {
      company: "延锋国际技术中心",
      location: "上海",
      position: "知识管理 实习生",
      period: "07/2024 - 08/2024",
      icon: "📚",
      achievements: [
        "用 Python 编写文件处理程序，实现根据不同筛选标准比对多个文件中的重复行并提取",
        "测试使用公司的 GPT，撰写使用说明",
        "用 VBA 编写文件处理程序，根据不同需求实现 Excel 的数据处理"
      ]
    },
    {
      company: "维尔宁（中国）电子有限公司",
      location: "上海",
      position: "系统工程师 实习生",
      period: "07/2023 - 08/2023",
      icon: "⚙️",
      achievements: [
        "操作并维护公司的业务系统",
        "利用公司提供的 API 接口，编写 Python 程序提取符合要求的项目编号",
        "根据过滤逻辑，编写 Python 程序，根据所选条件批量生成适合公司系统的专家模式代码"
      ]
    }
  ],
  projects: [
    {
      title: "触心 (TouchSoul) – 银发族专属 AI 陪伴管家",
      period: "03/2026",
      icon: "👴",
      gradient: "from-aurora-purple to-aurora-pink",
      description: "可通过三种简单手势实现聊天、提醒、报警的不同功能",
      highlights: [
        "用语音代替打字，老年人友好设计",
        "配备手机心跳检测功能，一键拨打预设报警联系人",
        "可定制热闹/安静模式；可根据简单个人信息定制 AI 语气及聊天内容"
      ]
    },
    {
      title: "巴西气候灾害数据分析项目",
      period: "05/2024 - 07/2024",
      icon: "🌍",
      gradient: "from-aurora-cyan to-aurora-blue",
      description: "从巴西气象网站收集气候和灾害数据",
      highlights: [
        "使用灾害和气候数据训练了灾害二元分类预测模型",
        "利用灾害预报和亚马孙森林面积数据预测大豆种植面积"
      ]
    },
    {
      title: "美国大学生数学建模竞赛 (MCM) - H 奖",
      period: "02/2024",
      icon: "🏆",
      gradient: "from-aurora-orange to-aurora-yellow",
      description: "设计了考虑气象、地质、地理、人类活动等多元因素的综合灾害预测模型",
      highlights: [
        "建立风险评估模型，以评估灾害概率和潜在损失",
        "开发灾害保险决策模型，帮助保险公司制定精准策略",
        "通过荷兰的案例研究展示了该模型的应用潜力",
        "通过分析法国和土耳其的高频数据，验证了模型的有效性和适用性"
      ]
    },
    {
      title: "利用专利数据建立合作网络",
      period: "02/2024 - 04/2024",
      icon: "🔗",
      gradient: "from-aurora-pink to-aurora-cyan",
      description: "网络科学研究",
      highlights: [
        "使用 Python 提取和处理专利数据，获取与大湾区合作网络相关的数据",
        "基于处理数据（6563 个节点和 192673 条边）构建专利申请人合作网络",
        "用 Gephi 可视化合作网络"
      ]
    },
    {
      title: "上海市计算机应用能力大赛",
      period: "12/2021 - 04/2022",
      icon: "📊",
      gradient: "from-aurora-blue to-aurora-purple",
      description: "可视化赛道 学生组长",
      highlights: [
        "从事数据处理和数据清洗，基于 Python 制作交互式可视化图表",
        "参与界面设计，从互联网上收集数据",
        "管理一个 3 人团队并起草部分报告"
      ]
    }
  ],
  leadership: [
    {
      role: "研究生会成员",
      organization: "香港大学",
      period: "09/2025 - 08/2026",
      icon: "🎓"
    },
    {
      role: "第三届 21 级院士班成员",
      organization: "上海理工大学",
      period: "09/2022 - 06/2025",
      icon: "📖",
      highlights: [
        "经选拔加入",
        "完成算法课程和单片机课程"
      ]
    },
    {
      role: "学生会 学术部成员",
      organization: "光电信息与计算机工程学院，上海理工大学",
      period: "09/2022 - 07/2023",
      icon: "📚",
      highlights: [
        "组织、策划并购买日常活动物资",
        "整理竞赛材料并提交给学校"
      ]
    },
    {
      role: "学生会 科创部成员",
      organization: "基础学院，上海理工大学",
      period: "09/2021 - 07/2022",
      icon: "🔬"
    },
    {
      role: "学术科技部成员",
      organization: "青年科学技术协会",
      period: "09/2021 - 07/2022",
      icon: "🔭"
    },
    {
      role: "EE-CUSP 电子社团成员",
      organization: "上海理工大学",
      period: "09/2021 - 07/2022",
      icon: "⚡"
    },
    {
      role: "光子工作室成员",
      organization: "上海理工大学",
      period: "09/2021 - 07/2022",
      icon: "💡"
    }
  ],
  awards: [
    "2024 年上海市奖学金",
    "2025 年优秀毕业生",
    "2025 年优秀毕业论文",
    "2024 年上海市计算机应用能力大赛 微课设计赛道 三等奖",
    "2021-2024 年学习优秀奖学金 二等奖（连续五个学期）",
    "校级优秀学生（2021-2022，2022-2023）",
    "2023 年第六届大学生数字技能应用大赛 C语言科目初赛 优秀奖",
    "10/2023 第十五届「光电杯」创新设计大赛勤志杯赛道 二等奖",
    "05/2023 第十八届「挑战杯」大学生课外学术科技作品竞赛校内选拔赛 二等奖",
    "05/2023 上海市计算机应用能力大赛 优胜奖",
    "02/2023 上海理工大学第五届机器人大赛 一等奖",
    "11/2022 第十四届「光电杯」创新设计大赛新能力杯赛道 三等奖",
    "10/2022 全国大学生英语竞赛 二等奖",
    "05/2022 上海市计算机应用能力大赛 三等奖"
  ],
  skills: {
    languages: [
      { name: "中文", level: "母语" },
      { name: "英语", level: "雅思 7.0" }
    ],
    programming: ["C", "Python", "Matlab", "VBA", "SQL", "Javascript", "Git"],
    frameworks: ["NumPy", "Scipy", "Pandas", "Matplotlib", "PyTorch", "Node.js", "React", "Tailwind CSS", "Prisma"],
    tools: ["VS Code", "Visual Studio", "Dev-C++", "Jupyter Notebook", "MATLAB R2021a", "Cursor", "SQL Server", "Gephi", "LabVIEW", "Tableau", "Postman", "Azure", "Cloudflare"]
  }
}
