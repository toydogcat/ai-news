import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bilingual News Hub | 雙語新聞中心",
  description: "精選全球優質英文報導，中英雙語對照閱讀",
  base: '/ai-news/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首頁', link: '/' },
      { text: '經典法國菜', link: '/news/20-classic-french-dishes-to-try' }
    ],

    sidebar: [
      {
        text: '🍕 寰宇美食 (Culinary World)',
        items: [
          { text: '20 道法國經典料理 (20 Classic French Dishes)', link: '/news/20-classic-french-dishes-to-try' }
        ]
      },
      {
        text: '💻 科技趨勢 (Tech & AI Trends)',
        items: [
          { text: '馬斯克 vs OpenAI 法庭對決 (Musk vs OpenAI Showdown)', link: '/news/takeaways-elon-musk-openai-sam-altman-lawsuit' }
        ]
      },
      {
        text: '🌎 國際局勢 (Global Politics)',
        items: [
          { text: '伊朗強推海峽申報新規 (Iran Imposes Hormuz Rules)', link: '/news/iran-imposes-new-rules-strait-of-hormuz' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toydogcat/ai-news' }
    ]
  }
})
