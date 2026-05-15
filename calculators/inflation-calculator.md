---
title: 通貨膨脹與購買力侵蝕試算表 | Inflation & Buying Power Erosion Calculator
description: 面對通膨巨獸，您的現金正在以多快的速度蒸發？快來試算未來維持同等生活品質所需的預算，並即時觀測您的存款實質購買力變化趨勢圖！
---

<script setup>
import { ref, computed } from 'vue'

const displayMode = ref('bilingual')
const activeTab = ref('expense') // 'expense' or 'cash'

// Basic inputs
const initialAmount = ref(50000) // Monthly expense or Cash lump sum
const projectedYears = ref(20)
const avgInflationRate = ref(3.5)

// Detailed breakdowns toggler
const isDetailed = ref(false)
const expenseCategories = ref([
  { name: '🏠 房屋貸款/租金', en: 'Mortgage / Rent', value: 20000, inf: 3.0 },
  { name: '🍜 飲食餐館', en: 'Food & Dining', value: 12000, inf: 4.5 },
  { name: '🚗 交通養車', en: 'Transportation', value: 5000, inf: 2.5 },
  { name: '🏥 醫療保健', en: 'Healthcare', value: 3000, inf: 5.0 },
  { name: '🎮 育樂休閒', en: 'Entertainment', value: 5000, inf: 3.5 },
  { name: '📝 其他雜支', en: 'Miscellaneous', value: 5000, inf: 3.0 }
])

// Compute current aggregate cost from detailed list
const aggregateExpense = computed(() => {
  if (!isDetailed.value) {
    return parseFloat(initialAmount.value)
  }
  return expenseCategories.value.reduce((sum, cat) => sum + parseFloat(cat.value), 0)
})

// Calculations
const futureCostSimple = computed(() => {
  const r = 1 + (parseFloat(avgInflationRate.value) / 100)
  return aggregateExpense.value * Math.pow(r, parseInt(projectedYears.value))
})

const futureCostDetailed = computed(() => {
  const yrs = parseInt(projectedYears.value)
  return expenseCategories.value.reduce((sum, cat) => {
    const r = 1 + (parseFloat(cat.inf) / 100)
    return sum + (parseFloat(cat.value) * Math.pow(r, yrs))
  }, 0)
})

const finalFutureCost = computed(() => {
  return isDetailed.value ? futureCostDetailed.value : futureCostSimple.value
})

const costIncreasePercent = computed(() => {
  if (aggregateExpense.value === 0) return 0
  return ((finalFutureCost.value / aggregateExpense.value) - 1) * 100
})

// Mode 2: Cash Erosion
const cashLumpSum = ref(1000000)
const erodedValue = computed(() => {
  const r = 1 + (parseFloat(avgInflationRate.value) / 100)
  return parseFloat(cashLumpSum.value) / Math.pow(r, parseInt(projectedYears.value))
})

const valueLostPercent = computed(() => {
  if (parseFloat(cashLumpSum.value) === 0) return 0
  return ((parseFloat(cashLumpSum.value) - erodedValue.value) / parseFloat(cashLumpSum.value)) * 100
})

// Shared helper functions
const formatNum = (val) => new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 }).format(val)
const formatCurrency = (val) => '$ ' + formatNum(val)

// SVG Chart Constants
const svgWidth = 600
const svgHeight = 240

const chartPathData = computed(() => {
  const yrs = parseInt(projectedYears.value)
  let pts = []
  const r = 1 + (parseFloat(avgInflationRate.value) / 100)
  
  if (activeTab.value === 'expense') {
    const startVal = aggregateExpense.value
    const maxVal = Math.max(finalFutureCost.value, startVal * 1.2)
    for (let i = 0; i <= yrs; i++) {
      let currentVal = startVal
      if (isDetailed.value) {
        currentVal = expenseCategories.value.reduce((sum, cat) => {
          const r_cat = 1 + (parseFloat(cat.inf) / 100)
          return sum + (parseFloat(cat.value) * Math.pow(r_cat, i))
        }, 0)
      } else {
        currentVal = startVal * Math.pow(r, i)
      }
      const x = (i / yrs) * svgWidth
      const y = svgHeight - (currentVal / maxVal) * (svgHeight - 30) - 15
      pts.push(`${x},${y}`)
    }
  } else {
    const startVal = parseFloat(cashLumpSum.value)
    for (let i = 0; i <= yrs; i++) {
      const currentVal = startVal / Math.pow(r, i)
      const x = (i / yrs) * svgWidth
      const y = svgHeight - (currentVal / startVal) * (svgHeight - 30) - 15
      pts.push(`${x},${y}`)
    }
  }
  return pts.join(" ")
})

const chartAreaPoints = computed(() => {
  const pts = chartPathData.value
  if (!pts) return ""
  return `${pts} ${svgWidth},${svgHeight} 0,${svgHeight}`
})

</script>

# 🧮 雙效通貨膨脹與購買力試算機 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Interactive Dual-Mode Inflation Simulator</span>

面臨著全球利率動盪與物價螺旋式攀升的「通膨時代」，您的錢包正在以多快的速度貶值？本系統提供兩種核心情境模擬：為您精算 **「未來維持相同生活開銷所需總額」** 以及 **「手頭現金實質購買力的蒸發速度」**。

---

<div class="language-toggle-wrapper" style="margin-bottom: 24px;">
  <div class="language-toggle-bar">
    <button :class="['language-toggle-btn', { active: displayMode === 'bilingual' }]" @click="displayMode = 'bilingual'">中英對照</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'zh' }]" @click="displayMode = 'zh'">純中文</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'en' }]" @click="displayMode = 'en'">純英文</button>
  </div>
</div>

<ClientOnly>
<div class="mode-switcher-tabs">
  <button :class="['tab-btn', { active: activeTab === 'expense' }]" @click="activeTab = 'expense'">
    <span v-if="displayMode !== 'en'">📊 生活品質開銷預測</span>
    <span v-if="displayMode !== 'zh'" class="sub-en">Future Cost of Living</span>
  </button>
  <button :class="['tab-btn', { active: activeTab === 'cash' }]" @click="activeTab = 'cash'">
    <span v-if="displayMode !== 'en'">📉 現金購買力侵蝕</span>
    <span v-if="displayMode !== 'zh'" class="sub-en">Cash Value Erosion</span>
  </button>
</div>

<div class="calculator-layout">

  <!-- Left Controls -->
  <div class="calc-controls-card">
    <h3 class="section-title">
      <span v-if="displayMode !== 'en'">⚙️ 核心參數設定</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Primary Assumptions</span>
    </h3>

    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">分析年限跨度：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Analysis Period</span>
        </label>
        <span class="value-badge">{{ projectedYears }} 年</span>
      </div>
      <input type="range" v-model="projectedYears" min="1" max="40" step="1" class="calc-slider" />
    </div>

    <div class="input-group" v-if="!isDetailed || activeTab === 'cash'">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">預期年均通貨膨脹率：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Annual Inflation Rate</span>
        </label>
        <span class="value-badge highlight">{{ avgInflationRate }} %</span>
      </div>
      <input type="range" v-model="avgInflationRate" min="0" max="15" step="0.1" class="calc-slider" />
    </div>

    <hr class="calc-divider" />

    <!-- TAB 1: Expense Form -->
    <div v-if="activeTab === 'expense'">
      <div class="toggle-row">
        <h3 class="section-title" style="margin-bottom:0;">
          <span v-if="displayMode !== 'en'">🥗 當前月開銷總額</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Current Monthly Expenses</span>
        </h3>
        <button class="btn-link-outline" @click="isDetailed = !isDetailed">
          {{ isDetailed ? '✏️ 簡化總額' : '📋 細項拆解' }}
        </button>
      </div>

      <!-- Simple Input -->
      <div v-if="!isDetailed" class="input-group" style="margin-top: 16px;">
        <input type="number" v-model="initialAmount" step="5000" class="calc-text-input" />
        <span class="mini-label" style="margin-top:6px;">輸入您目前每個月的總開銷 (包含房租、餐飲、水電等)</span>
      </div>

      <!-- Detailed Inputs -->
      <div v-else class="detailed-list-container" style="margin-top: 16px;">
        <div v-for="(cat, idx) in expenseCategories" :key="idx" class="cat-item-card">
          <div class="cat-row">
            <span class="cat-label">
              <span v-if="displayMode !== 'en'">{{ cat.name }}</span>
              <span v-if="displayMode !== 'zh'" class="sub-en">{{ cat.en }}</span>
            </span>
            <input type="number" v-model="cat.value" class="calc-text-input compact" />
          </div>
          <div class="cat-row sub">
            <span class="mini-label">該類別專屬通膨率</span>
            <div class="inf-wrap">
              <input type="number" v-model="cat.inf" step="0.1" class="calc-text-input compact inf-in" /> %
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: Cash Lump Sum Form -->
    <div v-else>
      <h3 class="section-title">
        <span v-if="displayMode !== 'en'">💵 目前持有的現金/存款</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Lump Sum Savings</span>
      </h3>
      <div class="input-group">
        <input type="number" v-model="cashLumpSum" step="50000" class="calc-text-input big" />
        <span class="mini-label" style="margin-top:8px;">這筆錢放在銀行定存或家裡保險箱，沒有進行高過通膨率的投資。</span>
      </div>
    </div>

  </div>

  <!-- Right Results Panel -->
  <div class="calc-results-card">

    <!-- Display Mode A Results -->
    <div v-if="activeTab === 'expense'" class="result-wrapper">
      <div class="score-hero-container is-warning">
        <div class="score-icon-wrapper">🔥</div>
        <div class="score-text-panel">
          <h4 class="score-heading">
            <span v-if="displayMode !== 'en'">生活成本上漲幅度 {{ Math.round(costIncreasePercent) }}%</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Living Cost Swell by {{ Math.round(costIncreasePercent) }}%</span>
          </h4>
          <p class="score-desc">
            <span v-if="displayMode !== 'en'">在 {{ projectedYears }} 年後，您需要準備更多的預算，才能享受跟今天 **一模一樣** 的生活水準。</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">In {{ projectedYears }} years, your required monthly budget must balloon to maintain your current lifestyle quality.</span>
          </p>
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-box">
          <span class="label">
            <span v-if="displayMode !== 'en'">📅 今日每月總預算</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Monthly Cost Today</span>
          </span>
          <span class="value">{{ formatCurrency(aggregateExpense) }}</span>
        </div>
        <div class="summary-box important">
          <span class="label">
            <span v-if="displayMode !== 'en'">🔮 未來每月所需總額</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Future Monthly Need</span>
          </span>
          <span class="value danger">{{ formatCurrency(finalFutureCost) }}</span>
        </div>
      </div>
    </div>

    <!-- Display Mode B Results -->
    <div v-else class="result-wrapper">
      <div class="score-hero-container is-warning" style="background: rgba(255, 74, 74, 0.05); border-color: rgba(255,74,74,0.3)">
        <div class="score-icon-wrapper">📉</div>
        <div class="score-text-panel">
          <h4 class="score-heading" style="color: #ff4a4a">
            <span v-if="displayMode !== 'en'">現金價值遭「蒸發」 {{ Math.round(valueLostPercent) }}%</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Cash Stripped by {{ Math.round(valueLostPercent) }}%</span>
          </h4>
          <p class="score-desc">
            <span v-if="displayMode !== 'en'">受到通膨巨獸無聲無息地啃食，這筆錢未來的「實際購買力」將會大幅縮水！</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Quietly eaten by inflation, the "Real Value" of your fixed nest egg will decay into thin air.</span>
          </p>
        </div>
      </div>

      <div class="summary-grid">
        <div class="summary-box">
          <span class="label">
            <span v-if="displayMode !== 'en'">💰 現有存款面額</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Nominal Cash Value</span>
          </span>
          <span class="value">{{ formatCurrency(cashLumpSum) }}</span>
        </div>
        <div class="summary-box important">
          <span class="label">
            <span v-if="displayMode !== 'en'">❄️ 未來「實質購買力」</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Real Purchasing Power</span>
          </span>
          <span class="value danger">{{ formatCurrency(erodedValue) }}</span>
        </div>
      </div>
    </div>

    <!-- Visual Component Chart -->
    <div class="chart-container">
      <h4 class="chart-title">
        <span v-if="activeTab === 'expense'">
          <span v-if="displayMode !== 'en'">📈 未來生活開銷爬升拋物線</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Cost-of-Living Escalation Curve</span>
        </span>
        <span v-else>
          <span v-if="displayMode !== 'en'">📉 實質購買力侵蝕下降曲線</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Real Cash Purchasing Power Erosion Curve</span>
        </span>
      </h4>

      <div class="svg-wrapper">
        <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="growGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff4a4a" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#ff4a4a" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="shrinkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#28a745" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#28a745" stop-opacity="0"/>
            </linearGradient>
          </defs>
          
          <!-- Base Grid -->
          <line x1="0" :y1="svgHeight * 0.25" :x2="svgWidth" :y2="svgHeight * 0.25" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
          <line x1="0" :y1="svgHeight * 0.5" :x2="svgWidth" :y2="svgHeight * 0.5" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
          <line x1="0" :y1="svgHeight * 0.75" :x2="svgWidth" :y2="svgHeight * 0.75" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

          <!-- Area Fill -->
          <polygon :points="chartAreaPoints" :fill="activeTab === 'expense' ? 'url(#growGrad)' : 'url(#shrinkGrad)'" />

          <!-- Stroke curve -->
          <polyline :points="chartPathData" fill="none" :stroke="activeTab === 'expense' ? '#ff4a4a' : '#28a745'" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <div class="chart-overlay-text start">
          <span>今日 (Year 0)</span>
        </div>
        <div class="chart-overlay-text end">
          <span>{{ projectedYears }} 年後</span>
        </div>
      </div>
    </div>

    <!-- Real-World Analogy Banner (Wow Factor) -->
    <div class="fun-fact-box">
      <h5 class="fact-title">💡 購買力實境對比 (Real-world Analogy)</h5>
      <p class="fact-desc" v-if="activeTab === 'expense'">
        如果今天一杯精品美式拿鐵是 **$100 元**，在相同通膨背景下，{{ projectedYears }} 年後這杯一樣的咖啡預計將會飆漲到 
        <strong style="color:#ff4a4a">${{ formatNum(100 * Math.pow(1 + (avgInflationRate/100), projectedYears)) }} 元</strong>！
      </p>
      <p class="fact-desc" v-else>
        也就是說，現在手上的 $100 元大鈔，在 {{ projectedYears }} 年後走進超商，實際上只能買到相當於今天價值 
        <strong style="color:#28a745">${{ formatNum(100 / Math.pow(1 + (avgInflationRate/100), projectedYears)) }} 元</strong> 的商品！
      </p>
    </div>

  </div>
</div>
</ClientOnly>

<style scoped>
.mode-switcher-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--vp-c-text-2);
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--vp-c-text-1);
}

.tab-btn.active {
  background: rgba(212, 175, 55, 0.08);
  border-color: #d4af37;
  color: #d4af37;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.1);
}

.sub-en {
  font-size: 0.7rem;
  opacity: 0.7;
  font-weight: 400;
}

.calculator-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}

@media (min-width: 860px) {
  .calculator-layout {
    grid-template-columns: 420px 1fr;
  }
}

.calc-controls-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.calc-results-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dark .calc-controls-card,
.dark .calc-results-card {
  background: rgba(30, 30, 35, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.section-title {
  font-size: 1.05rem;
  font-weight: 750;
  margin-top: 0 !important;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
  display: flex;
  flex-direction: column;
  border-bottom: none !important;
}

.en-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.btn-link-outline {
  background: transparent;
  border: 1px solid rgba(212,175,55,0.3);
  color: #d4af37;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-link-outline:hover {
  background: rgba(212,175,55,0.1);
  border-color: #d4af37;
}

.input-group {
  margin-bottom: 16px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.value-badge {
  background: rgba(255,255,255,0.05);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.value-badge.highlight {
  background: rgba(212, 175, 55, 0.12);
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.calc-slider {
  width: 100%;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 5px;
  background: rgba(255,255,255,0.1);
  outline: none;
  margin: 8px 0;
}

.calc-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #d4af37;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(212,175,55,0.3);
}

.calc-text-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-size: 1.05rem;
}

.calc-text-input.big {
  font-size: 1.3rem;
  color: #d4af37;
}

.calc-text-input.compact {
  padding: 6px 10px;
  font-size: 0.9rem;
  max-width: 110px;
}

.calc-divider {
  border: 0;
  border-top: 1px dashed rgba(255,255,255,0.06);
  margin: 16px 0;
}

.mini-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  display: block;
}

/* Detailed Categories List */
.detailed-list-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 4px;
}

.cat-item-card {
  background: rgba(255,255,255,0.01);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cat-row.sub {
  border-top: 1px dotted rgba(255,255,255,0.05);
  padding-top: 6px;
}

.cat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
}

.inf-wrap {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  gap: 4px;
}

.inf-in {
  max-width: 60px !important;
  text-align: center;
  padding: 2px 4px !important;
  height: 24px;
}

/* Results Styling */
.score-hero-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 193, 7, 0.2);
  background: rgba(255, 193, 7, 0.03);
}

.score-icon-wrapper {
  font-size: 2.2rem;
  flex-shrink: 0;
}

.score-text-panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.score-heading {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffc107;
  margin: 0 !important;
}

.score-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin: 0 !important;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.summary-box {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-box.important {
  background: rgba(255, 74, 74, 0.03);
  border-color: rgba(255, 74, 74, 0.12);
}

.summary-box .label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.summary-box .value {
  font-size: 1.3rem;
  font-weight: 850;
  color: var(--vp-c-text-1);
}

.summary-box .value.danger {
  color: #ff4a4a;
}

/* Chart section */
.chart-container {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 20px;
}

.chart-title {
  font-size: 0.95rem;
  font-weight: 750;
  margin-bottom: 16px !important;
  color: var(--vp-c-text-1);
}

.svg-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  background: rgba(0,0,0,0.04);
  border-radius: 12px;
}

.chart-overlay-text {
  position: absolute;
  bottom: -22px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.chart-overlay-text.start { left: 4px; }
.chart-overlay-text.end { right: 4px; }

/* Real-world Fun Fact Box */
.fun-fact-box {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
}

.fact-title {
  font-size: 0.85rem;
  font-weight: 750;
  color: #d4af37;
  margin: 0 0 6px 0 !important;
}

.fact-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0 !important;
}
</style>
