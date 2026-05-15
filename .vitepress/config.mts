import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bilingual News Hub | 雙語新聞中心",
  description: "精選全球優質英文報導，中英雙語對照閱讀",
  base: '/ai-news/',
  head: [
    ['script', { async: '', src: 'https://www.vercount.one/js', crossorigin: 'anonymous' }]
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
          { text: '精緻餐飲陰暗面與名廚退場 (Fine Dining Dark Side)', link: '/news/fine-dining-culture-rene-redzepi' },
          { text: '明星龍舌蘭酒大評測 (Best Celebrity Tequilas)', link: '/news/best-celebrity-tequilas' },
          { text: '20 道法國經典料理 (20 Classic French Dishes)', link: '/news/20-classic-french-dishes-to-try' },
          { text: '全球美味鬆餅大盤點 (World\'s Best Pancakes)', link: '/news/worlds-most-delicious-pancakes' },
          { text: '尋味全球經典麵包 (World\'s Best Breads)', link: '/news/best-breads-around-the-world' },
          { text: '尋味全球經典三明治 (World\'s Best Sandwiches)', link: '/news/best-sandwiches-around-the-world' },
          { text: '20 道全球經典湯品 (World\'s Best Soups)', link: '/news/best-soups-world-wellness' },
          { text: '英式中餐與美式的文化碰撞 (British Chinese Food)', link: '/news/british-chinese-takeout-uk-american-differences' }
        ]
      },
      {
        text: '🔬 前沿科學 & 科技 (Science & Tech)',
        items: [
          { text: '樹莓派創辦人：勿過度神化 AI 扼殺就業 (Raspberry Pi Boss AI Job Warning)', link: '/news/ai-hypes-jobs-raspberry-pi' },
          { text: '智慧眼鏡偷拍掀起社會隱私戰 (Meta Smart Glasses Privacy Crisis)', link: '/news/smart-glasses-privacy-meta' },
          { text: '超級聖嬰今秋冬恐強勢來襲 (Super El Niño Historically Strong)', link: '/news/super-el-nino-coming-historically-strong' },
          { text: '奧特曼出庭正面迎戰馬斯克 (Sam Altman vs Elon Musk Testimony)', link: '/news/sam-altman-openai-vs-elon-musk-testimony' },
          { text: '猶他州千億級 AI 數據中心抗爭 (Utah AI Data Center Opposition)', link: '/news/ai-data-center-utah-kevin-oleary-opposition' },
          { text: '星際彗星 3I/ATLAS 竟是「半重水」時間膠囊 (Interstellar Comet 3I/ATLAS)', link: '/news/interstellar-comet-3i-atlas-deuterated-water' },
          { text: '黑洞碰撞證實愛因斯坦與霍金預言 (Black Hole Collision Predictions)', link: '/news/black-hole-collision-einstein-hawking' },
          { text: '蘋果發表會：超薄 iPhone Air 與 17 系列 (Apple Event: iPhone Air & 17)', link: '/news/apple-unveils-iphone-air-and-iphone-17' },
          { text: '馬斯克 vs OpenAI 法庭對決 (Musk vs OpenAI Showdown)', link: '/news/takeaways-elon-musk-openai-sam-altman-lawsuit' }
        ]
      },
      {
        text: '🩺 醫學健康 (Health & Wellness)',
        items: [
          { text: '多吃植物降低失智風險 (Plants & Lower Dementia Risk)', link: '/news/eating-more-plants-linked-to-lower-risk-of-dementia' }
        ]
      },
      {
        text: '🌎 國際局勢 (Global Politics)',
        items: [
          { text: '川普率馬斯克與黃仁勳赴北京峰會 (Trump Brings Tech Giants to Beijing)', link: '/news/trump-beijing-summit-ceos' },
          { text: '荷蘭鐵腕封禁色情網站 Motherless (Dutch Authorities Ban Motherless)', link: '/news/porn-site-motherless-taken-down-dutch-authorities' },
          { text: '伊朗新最高領袖始終未露面 (Iran Supreme Leader Missing)', link: '/news/iran-supreme-leader-intl' },
          { text: '美中峰會前夕台灣反對黨領袖專訪 (Taiwan Opposition Leader Interview)', link: '/news/taiwan-us-china-kmt-opposition-leader' },
          { text: '伊朗強推海峽申報新規 (Iran Imposes Hormuz Rules)', link: '/news/iran-imposes-new-rules-strait-of-hormuz' }
        ]
      },
      {
        text: '✈️ 藍天翱翔 (Aviation & Travel)',
        items: [
          { text: '美國 25 個最被低估的秘境 (25 Underrated USA Destinations)', link: '/news/underrated-destinations-united-states' },
          { text: '理查·奎斯特評選最棒客機 (Best Passenger Airplanes)', link: '/news/best-passenger-airplanes-ranked-richard-quest' }
        ]
      },
      {
        text: '🧮 實用計算機 (Calculators)',
        items: [
          { text: '退休金理財試算表 (Retirement Planner)', link: '/calculators/retirement-calculator' },
          { text: '通膨與購買力試算 (Inflation & Buying Power)', link: '/calculators/inflation-calculator' },
          { text: '買房 vs 租房終極對決 (Rent vs. Buy)', link: '/calculators/rent-vs-buy-calculator' }
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
