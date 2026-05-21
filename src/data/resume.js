// src/data/resume.js
export const resumeData = {
  name: "PAN Jiayun",
  nickname: "Jaslyn",
  tagline: "Full-Stack AI Engineer | CS Master's Student @ HKU",
  contact: {
    phone: "(852) 8495-8638",
    emails: ["j18388168@gmail.com", "u3665530@connect.hku.hk"],
    linkedin: "https://www.linkedin.com/in/jaslyn-pan",
    github: "https://github.com/youzuosED"
  },
  education: [
    {
      school: "University of Hong Kong (HKU)",
      location: "Hong Kong",
      degree: "Master of Computer Science",
      period: "09/2025 - 08/2026",
      gpa: null
    },
    {
      school: "University of Shanghai for Science and Technology (USST)",
      location: "Shanghai",
      degree: "Bachelor of Engineering in Intelligent Science and Technology",
      period: "09/2021 - 07/2025",
      gpa: "4.0/4.5 (90.94/100), Rank: 2/44 (Top 5%)"
    }
  ],
  experience: [
    {
      company: "Docpro Limited",
      location: "Hong Kong",
      position: "Full-Stack AI Engineer Intern",
      period: "12/2025 - Present",
      achievements: [
        "Built the company's brand-new advertising webpage tailored for new users, boosting Google traffic to the company by 6%",
        "Integrated RAG into the company's AI Chatbot, cutting the average token consumption by approximately 60%",
        "Compiled skills for using this platform, installed Openclaw on the host and ensured its successful operation, making the platform more agent-friendly and reducing token consumption by around 80%",
        "Created a new database project with Prisma, enabling administrators to set the release time of new advertisements for automatic publication or removal upon expiration",
        "Switched models via Azure and deployed new webpage URLs"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Knowledge Management Intern",
      period: "07/2024 - 08/2024",
      achievements: [
        "Developed a file-processing program using Python"
      ]
    },
    {
      company: "Yanfeng",
      location: "Shanghai",
      position: "Costing Intern",
      period: "09/2024 - 08/2025",
      achievements: [
        "Built machine learning models to predict costs based on factors such as manufacturing process, labor force, factory location, and materials",
        "Completed the writing of programmes such as extracting file lists"
      ]
    },
    {
      company: "VEONEER",
      location: "Shanghai",
      position: "System Engineer Intern",
      period: "07/2023 - 08/2023",
      achievements: [
        "Operated and maintained the company's business system",
        "Utilised the API interface provided by the company to compose a Python programme for extracting the project numbers that met the requirements",
        "Wrote a Python programme based on the filtering logic to batch-generate the expert mode codes suitable for the company's system"
      ]
    }
  ],
  projects: [
    {
      title: "TouchSoul – Exclusive AI Companion Butler for the Elderly",
      period: "03/2026",
      description: "Supports chatting, reminders and emergency alerts via three simple gesture controls",
      highlights: [
        "Voice input instead of typing, senior-friendly design",
        "Equipped with heart rate detection on mobile phones and one-touch dialing for preset emergency contacts",
        "Customizable lively/quiet modes; AI tone and chat content can be personalized with basic user information"
      ]
    },
    {
      title: "Climate and Disaster Data Analysis Project",
      period: "05/2024 - 07/2024",
      description: "Collected climate and disaster data from meteorological websites for Brazil",
      highlights: [
        "Trained a disaster binary classification prediction model using disaster and climate data",
        "Predicted soybean planting areas using disaster forecasts and Amazon forest area data"
      ]
    },
    {
      title: "Mathematical Contest in Modeling (MCM) - H Award",
      period: "02/2024",
      description: "Designed a comprehensive disaster prediction model",
      highlights: [
        "Established a risk assessment model with the Softmax function to evaluate disaster probabilities and potential losses",
        "Developed a disaster insurance decision model to help insurance companies formulate precise strategies",
        "Demonstrated the model's application potential through a case study of the Netherlands"
      ]
    },
    {
      title: "Build a Network of Collaborations with Patent Data",
      period: "02/2024 - 04/2024",
      description: "Network Science Research",
      highlights: [
        "Used Python to extract and process patent data to obtain data related to the Greater Bay Area Cooperation Network",
        "Built a patent applicant cooperation network based on processed data (6563 nodes and 192673 edges)",
        "Visualised the cooperation network with Gephi"
      ]
    }
  ],
  leadership: [
    {
      role: "Member of the Postgraduate Student Association",
      organization: "HKU",
      period: "09/2025 - 08/2026"
    },
    {
      role: "Member of the 3rd batch of 21st-grade Academician Class",
      organization: "USST",
      period: "09/2022 - 06/2025"
    },
    {
      role: "Student Leader, Visualization Track",
      organization: "Shanghai Computer Application Ability Competition",
      period: "12/2021 - 04/2022",
      highlights: [
        "Engaged in data processing and data cleaning, and fabricated interactive visualisation charts based on Python",
        "Took part in the design of the interface and collected data from the internet",
        "Managed a 3-person team and drafted partial reports"
      ]
    }
  ]
}
