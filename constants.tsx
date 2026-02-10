
import { Project, Experience, Recommendation } from './types';

export const PROJECTS: Project[] = [
  {
    title: "CALLSENTRY",
    description: "CallSentry is an AI-powered call app designed to answer incoming calls on behalf of a user and intelligently assess whether a conversation is legitimate or potentially fraudulent.",
    tech: ["Flask + Python", "Vite + React","DistilBERT + Gemini"],
    link: "https://github.com/Ha-an1/CallSentryDeploy"
  },
  {
    title: "AUTONOMOUS INVENTORY MANAGEMENT AND FORECASTING SYSTEM",
    description: "A proactive, data-driven system designed to solve inventory inefficiencies for retailers. It accurately predicts demand and automates restocking to create a smarter, more efficient operation by minimizing stockouts and overstocking.",
    tech: ["Flask + Python", "Vite + React", "LSTM + LightGBM"],
    link: "https://github.com/Ha-an1/InventoryManagement"
  },
  {
    title: "AURA",
    description: "Autonomous Unified Response Agent (AURA) is an always-on device health companion that continuously monitors Samsung devices such as smartphones, TVs, appliances, and wearables.",
    tech: ["Express.js", "Vite + React", "LSTM"],
    link: "https://github.com/Ha-an1/AURA"
  },
  {
    title: "PERMISSION BASED VECTOR DB",
    description: "Permission-based-Vector-db is a Python project focused on implementing a vector database system with integrated permission-based access control. This idea has been submitted to be patented.",
    tech: ["Python", "Faiss", "RAG"],
    link: "https://github.com/Ha-an1/Permission-based-Vector-db"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Remote Software Development Intern",
    company: "Ander Baher (Interext Technologies Pvt Ltd)",
    duration: "May 2024 – July 2024",
    tasks: [
      "Evaluated lightweight SLMs (RoBERTa, DistilBERT; ∼ 66M–140M params) for low-latency chatbot inference.",
      "Developed a RAG chatbot for the SABA POC using ChatGPT-3.5-turbo with cost-efficient token usage(∼ $0.002/query)."
    ]
  },
  {
    role: "Software Developer Intern,",
    company: "Cogniquest Technologies Pvt Ltd",
    duration: "Sept 2022 - May 2023",
    tasks: [
      "Worked on developing intelligent document processing pipelines using NLP and in-house OCR systems.",
      "Fine-tuned YOLOv8 and Detectron2 on ∼ 3, 000 samples for signature detection, with Detectron2 yielding ∼ 10–15% higher true positive detections."
    ]
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    author: "Vinit Sankhe",
    role: "Co-Founder & CTO at Ander Baher",
    text: "I had the pleasure of managing Haani during his time at Ander Baher, and I was consistently impressed by his technical depth, initiative, and professionalism."
  },
  {
    author: "Harsha AC",
    role: "Co-founder & CTO at Cogniquest",
    text: "From the very beginning, Hanni demonstrated a strong grasp of core programming concepts, a hunger to learn, and an impressive work ethic."
  }
];
