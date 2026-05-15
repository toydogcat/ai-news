---
title: 退休金理財試算表 | Retirement Calculator - Smart Financial Planning
description: 透過我們精心設計、全動態響應的退休理財試算表，即時評估您的儲蓄計劃、投資報酬率與通膨因素，快速規劃您的完美退休資金目標藍圖！
---

<script setup>
import { ref, computed } from 'vue'

const displayMode = ref('bilingual')

// Inputs
const currentAge = ref(30)
const retirementAge = ref(65)
const lifespan = ref(90)

const currentIncome = ref(800000)
const currentSavings = ref(500000)
const annualContributionPercent = ref(12)
const replacementRatePercent = ref(75)

const preRetirementReturn = ref(7.0)
const postRetirementReturn = ref(4.0)
const inflationRate = ref(2.5)

// Calculations
const yearsToRetirement = computed(() => Math.max(1, retirementAge.value - currentAge.value))
const yearsInRetirement = computed(() => Math.max(1, lifespan.value - retirementAge.value))

const dataSeries = computed(() => {
  let list = []
  let balance = parseFloat(currentSavings.value)
  let salary = parseFloat(currentIncome.value)
  
  const inf = 1 + (parseFloat(inflationRate.value) / 100)
  const preR = 1 + (parseFloat(preRetirementReturn.value) / 100)
  const postR = 1 + (parseFloat(postRetirementReturn.value) / 100)
  const saveR = parseFloat(annualContributionPercent.value) / 100
  
  // Phase 1: Accumulation
  for (let age = parseInt(currentAge.value); age < parseInt(retirementAge.value); age++) {
    const contribution = salary * saveR
    const interest = balance * (preR - 1)
    const startBalance = balance
    balance = (balance * preR) + contribution
    
    list.push({
      age,
      type: 'accumulation',
      balance,
      startBalance,
      contribution,
      interest
    })
    
    salary = salary * inf
  }
  
  // Decumulation Phase Setup
  const finalSalary = salary
  let neededAnnualIncome = finalSalary * (parseFloat(replacementRatePercent.value) / 100)
  
  // Phase 2: Decumulation
  for (let age = parseInt(retirementAge.value); age <= parseInt(lifespan.value); age++) {
    const startBalance = balance
    const withdraw = Math.min(balance, neededAnnualIncome)
    
    balance = Math.max(0, (balance - withdraw) * postR)
    const interest = (startBalance - withdraw) * (postR - 1)
    
    list.push({
      age,
      type: 'decumulation',
      balance,
      startBalance,
      withdrawal: withdraw,
      interest: Math.max(0, interest)
    })
    
    neededAnnualIncome = neededAnnualIncome * inf
  }
  
  return list
})

const totalTargetEgg = computed(() => {
  const inf = 1 + (parseFloat(inflationRate.value) / 100)
  const postR = 1 + (parseFloat(postRetirementReturn.value) / 100)
  
  // Calculate final salary at retirement moment
  let salary = parseFloat(currentIncome.value)
  for (let i = 0; i < yearsToRetirement.value; i++) {
    salary *= inf
  }
  
  let initialRetireNeed = salary * (parseFloat(replacementRatePercent.value) / 100)
  let annualNeeds = []
  let currNeed = initialRetireNeed
  
  for (let i = 0; i <= yearsInRetirement.value; i++) {
    annualNeeds.push(currNeed)
    currNeed *= inf
  }
  
  // Backward NPV Calculation
  let target = 0
  for (let i = annualNeeds.length - 1; i >= 0; i--) {
    target = (target / postR) + annualNeeds[i]
  }
  
  return target
})

const projectedAtRetirement = computed(() => {
  const match = dataSeries.value.find(d => d.age === parseInt(retirementAge.value) - 1)
  return match ? match.balance : parseFloat(currentSavings.value)
})

const shortageAmount = computed(() => {
  return Math.max(0, totalTargetEgg.value - projectedAtRetirement.value)
})

const hasSurplus = computed(() => {
  return projectedAtRetirement.value >= totalTargetEgg.value
})

const onTrackPercentage = computed(() => {
  if (totalTargetEgg.value === 0) return 0
  return Math.min(100, Math.round((projectedAtRetirement.value / totalTargetEgg.value) * 100))
})

// Format Helpers
const formatNumber = (val) => {
  return new Intl.NumberFormat('zh-TW', {
    maximumFractionDigits: 0
  }).format(val)
}

const formatCurrency = (val) => {
  return '$ ' + formatNumber(val)
}

// Chart Computations
const maxChartValue = computed(() => {
  const highest = Math.max(
    ...dataSeries.value.map(d => d.balance),
    totalTargetEgg.value,
    1000000
  )
  return highest * 1.1
})

const svgWidth = 600
const svgHeight = 240

const chartPoints = computed(() => {
  const len = dataSeries.value.length
  if (len < 2) return ""
  
  return dataSeries.value.map((d, i) => {
    const x = (i / (len - 1)) * svgWidth
    const y = svgHeight - (d.balance / maxChartValue.value) * svgHeight
    return `${x},${y}`
  }).join(" ")
})

const areaPoints = computed(() => {
  const points = chartPoints.value
  if (!points) return ""
  return `${points} ${svgWidth},${svgHeight} 0,${svgHeight}`
})

const retirementLineX = computed(() => {
  const len = dataSeries.value.length
  if (len < 2) return 0
  const index = dataSeries.value.findIndex(d => d.age === parseInt(retirementAge.value))
  return index >= 0 ? (index / (len - 1)) * svgWidth : 0
})
</script>

# 🧮 專屬退休規劃試算表 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Interactive Dual-Language Retirement Calculator</span>

歡迎使用我們專為現代人打造的互動式退休規劃試算表。在此工具中，您可以針對您個人的當前財務狀況進行精密模擬，我們系統的背景數值引擎將會針對 **通膨侵蝕、複利滾動以及退休後的資金提領** 進行全面的壓力測試。

---

<div class="language-toggle-wrapper" style="margin-bottom: 24px;">
  <div class="language-toggle-bar">
    <button :class="['language-toggle-btn', { active: displayMode === 'bilingual' }]" @click="displayMode = 'bilingual'">中英對照</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'zh' }]" @click="displayMode = 'zh'">純中文</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'en' }]" @click="displayMode = 'en'">純英文</button>
  </div>
</div>

<div class="calculator-layout">

  <!-- Left: Control Form -->
  <div class="calc-controls-card">
    <h3 class="section-title">
      <span v-if="displayMode !== 'en'">📊 基本設定參數</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Personal Parameters</span>
    </h3>
    
    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">當前年齡：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Current Age</span>
        </label>
        <span class="value-badge">{{ currentAge }} 歲</span>
      </div>
      <input type="range" v-model="currentAge" min="18" :max="retirementAge - 1" step="1" class="calc-slider" />
    </div>

    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">理想退休年齡：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Retirement Age</span>
        </label>
        <span class="value-badge">{{ retirementAge }} 歲</span>
      </div>
      <input type="range" v-model="retirementAge" :min="parseInt(currentAge) + 1" :max="Math.min(95, parseInt(lifespan) - 1)" step="1" class="calc-slider" />
    </div>

    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">預期壽命：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Life Expectancy</span>
        </label>
        <span class="value-badge">{{ lifespan }} 歲</span>
      </div>
      <input type="range" v-model="lifespan" :min="parseInt(retirementAge) + 1" max="110" step="1" class="calc-slider" />
    </div>

    <hr class="calc-divider" />

    <h3 class="section-title">
      <span v-if="displayMode !== 'en'">💰 財務現狀與規劃</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Financial Realities</span>
    </h3>

    <div class="input-group">
      <label class="input-header">
        <span v-if="displayMode !== 'en'">目前年收入 (元)：</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Annual Income ($)</span>
      </label>
      <input type="number" v-model="currentIncome" step="10000" class="calc-text-input" />
    </div>

    <div class="input-group">
      <label class="input-header">
        <span v-if="displayMode !== 'en'">目前已儲蓄/投資總額：</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Current Nest Egg</span>
      </label>
      <input type="number" v-model="currentSavings" step="10000" class="calc-text-input" />
    </div>

    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">年收入儲蓄率：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Annual Savings %</span>
        </label>
        <span class="value-badge highlight">{{ annualContributionPercent }}%</span>
      </div>
      <input type="range" v-model="annualContributionPercent" min="0" max="60" step="1" class="calc-slider" />
    </div>

    <div class="input-group">
      <div class="input-header">
        <label>
          <span v-if="displayMode !== 'en'">所得替代率：</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Income Replacement %</span>
        </label>
        <span class="value-badge highlight">{{ replacementRatePercent }}%</span>
      </div>
      <input type="range" v-model="replacementRatePercent" min="40" max="120" step="5" class="calc-slider" />
    </div>

    <hr class="calc-divider" />

    <h3 class="section-title">
      <span v-if="displayMode !== 'en'">📈 投資市場假設</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Market Assumptions</span>
    </h3>

    <div class="flex-row">
      <div class="input-group flex-1">
        <label class="mini-label">
          <span v-if="displayMode !== 'en'">退休前投報率 (%)</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Pre-Retire Return</span>
        </label>
        <input type="number" v-model="preRetirementReturn" step="0.1" class="calc-text-input mini" />
      </div>
      <div class="input-group flex-1">
        <label class="mini-label">
          <span v-if="displayMode !== 'en'">退休後投報率 (%)</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Post-Retire Return</span>
        </label>
        <input type="number" v-model="postRetirementReturn" step="0.1" class="calc-text-input mini" />
      </div>
    </div>

    <div class="input-group" style="margin-top: 8px;">
      <label class="mini-label">
        <span v-if="displayMode !== 'en'">長期預估通貨膨脹率 (%)</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Long-Term Inflation %</span>
      </label>
      <input type="number" v-model="inflationRate" step="0.1" class="calc-text-input" />
    </div>
  </div>

  <!-- Right: Results Visuals -->
  <div class="calc-results-card">
    
    <div class="score-hero-container" :class="{ 'is-success': hasSurplus, 'is-warning': !hasSurplus }">
      <div class="score-circle">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="circle" :stroke-dasharray="onTrackPercentage + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <text x="18" y="20.35" class="percentage">{{ onTrackPercentage }}%</text>
        </svg>
      </div>
      <div class="score-text-panel">
        <h4 class="score-heading">
          <span v-if="hasSurplus">
            <span v-if="displayMode !== 'en'">🎉 進度達標！財務自由</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">On Track to Freedom</span>
          </span>
          <span v-else>
            <span v-if="displayMode !== 'en'">⚠️ 仍有資金缺口</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Funding Gap Detected</span>
          </span>
        </h4>
        <p class="score-desc">
          <span v-if="hasSurplus">
            <span v-if="displayMode !== 'en'">太棒了！您的儲蓄計劃完美涵蓋了退休支出。</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Awesome! Your active savings successfully covers your future liabilities.</span>
          </span>
          <span v-else>
            <span v-if="displayMode !== 'en'">您目前的儲蓄率與投資策略尚無法完全填補未來的通膨開銷。</span>
            <span v-if="displayMode !== 'zh'" class="en-sub">Your current rate isn't fully capturing the required scale needed.</span>
          </span>
        </p>
      </div>
    </div>

    <div class="summary-grid">
      <div class="summary-box important">
        <span class="label">
          <span v-if="displayMode !== 'en'">🎯 理想退休金目標額</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Target Needed Egg</span>
        </span>
        <span class="value gold">{{ formatCurrency(totalTargetEgg) }}</span>
      </div>
      
      <div class="summary-box">
        <span class="label">
          <span v-if="displayMode !== 'en'">🔮 屆齡退休預估總額</span>
          <span v-if="displayMode !== 'zh'" class="en-sub">Projected Nest Egg</span>
        </span>
        <span class="value">{{ formatCurrency(projectedAtRetirement) }}</span>
      </div>
    </div>

    <div v-if="!hasSurplus" class="shortage-banner">
      <span v-if="displayMode !== 'en'">🚨 您面臨的潛在資金缺口為：<strong>{{ formatCurrency(shortageAmount) }}</strong></span>
      <span v-if="displayMode !== 'zh'" class="en-sub">🚨 Projected Deficit: <strong>{{ formatCurrency(shortageAmount) }}</strong></span>
    </div>

    <!-- Dynamic Interactive Chart -->
    <div class="chart-container">
      <h4 class="chart-title">
        <span v-if="displayMode !== 'en'">📈 終身資產水位滾動模型 (包含提領期)</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Lifetime Wealth Trajectory Chart</span>
      </h4>
      
      <div class="svg-wrapper">
        <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d4af37" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
            </linearGradient>
          </defs>
          
          <!-- Gridlines -->
          <line x1="0" :y1="svgHeight * 0.25" :x2="svgWidth" :y2="svgHeight * 0.25" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
          <line x1="0" :y1="svgHeight * 0.5" :x2="svgWidth" :y2="svgHeight * 0.5" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
          <line x1="0" :y1="svgHeight * 0.75" :x2="svgWidth" :y2="svgHeight * 0.75" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

          <!-- Filled Area Under Curve -->
          <polygon :points="areaPoints" fill="url(#areaGrad)" />

          <!-- Curve Path -->
          <polyline :points="chartPoints" fill="none" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          
          <!-- Retirement Line Marker -->
          <line :x1="retirementLineX" y1="0" :x2="retirementLineX" :y2="svgHeight" stroke="#ff4a4a" stroke-width="2" stroke-dasharray="4,4" />
        </svg>
        
        <!-- Legend overlays -->
        <div class="chart-overlay-text start">
          <span>{{ currentAge }} 歲</span>
        </div>
        <div class="chart-overlay-text middle" :style="{ left: `calc(${(retirementLineX / svgWidth) * 100}% - 35px)` }">
          <span class="retire-badge">{{ retirementAge }} 歲退休</span>
        </div>
        <div class="chart-overlay-text end">
          <span>{{ lifespan }} 歲</span>
        </div>
      </div>
    </div>

  </div>
</div>

<style scoped>
.calculator-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 32px 0;
  align-items: start;
}

@media (min-width: 860px) {
  .calculator-layout {
    grid-template-columns: 400px 1fr;
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
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0 !important;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
  border-bottom: none !important;
  display: flex;
  flex-direction: column;
}

.en-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-style: italic;
  font-weight: 400;
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
  box-shadow: 0 0 10px rgba(212,175,55,0.5);
  transition: transform 0.1s;
}

.calc-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.calc-text-input {
  width: 100%;
  padding: 8px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  outline: none;
  font-weight: 600;
  transition: all 0.2s;
}

.calc-text-input:focus {
  border-color: #d4af37;
  background: rgba(255,255,255,0.08);
}

.calc-divider {
  border: 0;
  border-top: 1px dashed rgba(255,255,255,0.08);
  margin: 20px 0;
}

.flex-row {
  display: flex;
  gap: 12px;
}

.flex-1 {
  flex: 1;
}

.mini-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  display: block;
  margin-bottom: 4px;
}

.calc-text-input.mini {
  padding: 6px 10px;
  font-size: 0.9rem;
}

/* Results Panel Styling */
.score-hero-container {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
}

.score-hero-container.is-success {
  background: rgba(40, 167, 69, 0.03);
  border-color: rgba(40, 167, 69, 0.2);
}

.score-hero-container.is-warning {
  background: rgba(255, 74, 74, 0.03);
  border-color: rgba(255, 74, 74, 0.2);
}

.score-circle {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}

.circle-bg {
  fill: none;
  stroke: rgba(255,255,255,0.08);
  stroke-width: 2.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.is-success .circle {
  stroke: #28a745;
}

.is-warning .circle {
  stroke: #ff4a4a;
}

.percentage {
  fill: var(--vp-c-text-1);
  font-family: sans-serif;
  font-size: 0.5rem;
  font-weight: 800;
  text-anchor: middle;
}

.score-text-panel {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.score-heading {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0 !important;
}

.is-success .score-heading { color: #28a745; }
.is-warning .score-heading { color: #ff4a4a; }

.score-desc {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0 !important;
  line-height: 1.5;
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
  background: rgba(212, 175, 55, 0.04);
  border-color: rgba(212, 175, 55, 0.15);
}

.summary-box .label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.summary-box .value {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.summary-box .value.gold {
  color: #d4af37;
}

.shortage-banner {
  background: rgba(255,74,74,0.08);
  border: 1px solid rgba(255,74,74,0.2);
  color: #ff4a4a;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

/* Chart Area Styles */
.chart-container {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 20px;
  margin-top: 8px;
}

.chart-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 20px !important;
}

.svg-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  background: rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 10px 0;
  overflow: visible;
}

.chart-overlay-text {
  position: absolute;
  bottom: -24px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.chart-overlay-text.start { left: 4px; }
.chart-overlay-text.end { right: 4px; }
.chart-overlay-text.middle {
  bottom: -10px;
  white-space: nowrap;
  transform: translateY(-12px);
}

.retire-badge {
  background: #ff4a4a;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  box-shadow: 0 4px 8px rgba(255,74,74,0.2);
}
</style>
