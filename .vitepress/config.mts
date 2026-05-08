import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bilingual News Hub | 雙語新聞中心",
  description: "精選全球優質英文報導，中英雙語對照閱讀",
  base: '/ai-news/',
  head: [
    ['script', { async: '', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }]
  ],
  vite: {
    publicDir: '.vitepress/public'
  },
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
          { text: '20 道法國經典料理 (20 Classic French Dishes)', link: '/news/20-classic-french-dishes-to-try' },
          { text: '全球美味鬆餅大盤點 (World\'s Best Pancakes)', link: '/news/worlds-most-delicious-pancakes' },
          { text: '尋味全球經典麵包 (World\'s Best Breads)', link: '/news/best-breads-around-the-world' },
          { text: '尋味全球經典三明治 (World\'s Best Sandwiches)', link: '/news/best-sandwiches-around-the-world' }
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
      },
      {
        text: '✈️ 藍天翱翔 (Aviation & Travel)',
        items: [
          { text: '理查·奎斯特評選最棒客機 (Best Passenger Airplanes)', link: '/news/best-passenger-airplanes-ranked-richard-quest' }
        ]
      }
    ],

    footer: {
      message: 'Released under the MIT License. | <span id="busuanzi_container_site_pv" style="display:none">👁️ 總瀏覽量 <span id="busuanzi_value_site_pv"></span> 次</span> | <span id="busuanzi_container_site_uv" style="display:none">👤 訪客數 <span id="busuanzi_value_site_uv"></span> 人</span>',
      copyright: 'Copyright © 2026-present Bilingual News Hub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toydogcat/ai-news' }
    ]
  }
})
