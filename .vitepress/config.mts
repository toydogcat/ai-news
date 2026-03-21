import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI News",
  description: "AI 趨勢即時報導",
  base: '/ai-news/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '最新消息', link: '/news' }
    ],

    sidebar: [
      {
        text: '🚀 技術前沿 (Tech Specs)',
        items: [
          { text: 'LLM 架構', link: '#' },
          { text: 'RAG 優化', link: '#' },
          { text: 'Agentic Workflow', link: '#' },
          { text: '新的論文 (arXiv) 簡讀', link: '#' },
          { text: 'Three ways AI is learning to understand the physical world', link: '/news/2026-03-21-three-ways-ai-learning-physical-world' }
        ]
      },
      {
        text: '💻 軟體與工具 (Soft Stack)',
        items: [
          { text: 'Open Source 專案 (LangChain, AutoGPT)', link: '#' },
          { text: '開發框架更新', link: '#' },
          { text: '新版 IDE', link: '#' }
        ]
      },
      {
        text: '🔌 矽與算力 (Hard Tech)',
        items: [
          { text: 'NVIDIA/AMD 晶片更新', link: '#' },
          { text: '邊緣運算 (Edge AI)', link: '#' },
          { text: 'AI PC/手機硬體趨勢', link: '#' },
          { text: 'Nvidia introduces Vera Rubin, a seven-chip AI platform', link: '/news/2026-03-17-nvidia-vera-rubin' }
        ]
      },
      {
        text: '🌐 產業脈動 (Market Trend)',
        items: [
          { text: '大廠動向 (OpenAI, Google, Meta)', link: '#' },
          { text: 'AI 法規', link: '#' },
          { text: '地緣政治對技術的影響', link: '#' },
          { text: 'Why enterprises are replacing generic AI with tools that know their users', link: '/news/2026-03-20-enterprises-replacing-generic-ai' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toydogcat/ai-news' }
    ]
  }
})
