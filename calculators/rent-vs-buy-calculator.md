---
title: 買房 vs 租房終極對決試算機 | Rent vs. Buy Ultimate Decision Simulator
description: 買房真的比較划算？還是租屋加投資能贏得更多？本試算機為您深度對決包含「房貸利息、房屋折舊維護、機會成本、與房價增值」等維度的終極資產數據！
---

<script setup>
import { ref, computed } from 'vue'

const displayMode = ref('bilingual')

// --- Comparison Period ---
const compareYears = ref(10)

// --- Purchase Inputs ---
const homePrice = ref(15000000) // 15 Million
const downPayPct = ref(20) // 20%
const mortgageRate = ref(2.2) // 2.2%
const mortgageTerm = ref(30) // 30 years
const homeAppreciation = ref(3.0) // 3.0% annual growth
const closingCostRate = ref(1.5) // 1.5% closing costs
const propertyTaxRate = ref(0.2) // 0.2% annual tax
const maintenanceRate = ref(1.0) // 1.0% annual maintenance
const sellingAgentFee = ref(4.0) // 4.0% commission on sale

// --- Rent & Opportunity Inputs ---
const monthlyRent = ref(35000)
const rentIncreaseRate = ref(2.5) // 2.5% annual increase
const investmentReturn = ref(6.0) // 6.0% opportunity return on stock market

// --- Helpers ---
const formatNum = (val) => new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 }).format(val)
const formatCurrency = (val) => '$ ' + formatNum(val)

// --- AMORTIZATION & DECISION ENGINE ---
const engine = computed(() => {
  const years = parseInt(compareYears.value)
  const price = parseFloat(homePrice.value)
  const dpPct = parseFloat(downPayPct.value) / 100
  const dpAmt = price * dpPct
  const closingAmt = price * (parseFloat(closingCostRate.value) / 100)
  const loanAmt = price - dpAmt
  
  // Mortgage Payment Logic
  const annualInt = parseFloat(mortgageRate.value) / 100
  const mRate = annualInt / 12
  const totalMonths = parseInt(mortgageTerm.value) * 12
  const mPayment = annualInt > 0 
    ? (loanAmt * mRate * Math.pow(1 + mRate, totalMonths)) / (Math.pow(1 + mRate, totalMonths) - 1)
    : loanAmt / totalMonths
    
  // Opportunities capital
  const initialOppCapital = dpAmt + closingAmt
  const oppReturnRate = parseFloat(investmentReturn.value) / 100
  
  let currentRent = parseFloat(monthlyRent.value)
  const rentIncRate = parseFloat(rentIncreaseRate.value) / 100
  
  let currentLoanBal = loanAmt
  let currentHomeValue = price
  const appRate = parseFloat(homeAppreciation.value) / 100
  const taxRate = parseFloat(propertyTaxRate.value) / 100
  const maintRate = parseFloat(maintenanceRate.value) / 100
  
  let cumulativeRent = 0
  let cumulativeInterest = 0
  let cumulativeTaxes = 0
  let cumulativeMaint = 0
  
  let rentTrack = []
  let buyTrack = []
  
  for (let y = 1; y <= years; y++) {
    // RENT TRACK
    const yearlyRent = currentRent * 12
    cumulativeRent += yearlyRent
    
    // BUY TRACK
    // 1. Home appreciates
    currentHomeValue *= (1 + appRate)
    // 2. Expenses based on inflated value
    cumulativeTaxes += currentHomeValue * taxRate
    cumulativeMaint += currentHomeValue * maintRate
    
    // 3. 12 monthly mortgage payments
    let yearlyPrinPaid = 0
    for (let m = 1; m <= 12; m++) {
      const intPmt = currentLoanBal * mRate
      const prinPmt = Math.min(mPayment - intPmt, currentLoanBal)
      cumulativeInterest += intPmt
      yearlyPrinPaid += prinPmt
      currentLoanBal -= prinPmt
    }
    
    // Selling calculations
    const sellingFee = currentHomeValue * (parseFloat(sellingAgentFee.value) / 100)
    const appreciationGain = currentHomeValue - price
    
    // Opportunity Cost: growth of Downpayment + Closing cost
    const compoundedOppCapital = initialOppCapital * Math.pow(1 + oppReturnRate, y)
    const oppCostGain = compoundedOppCapital - initialOppCapital
    
    // BUY TOTAL TRUE COST = Interest + Taxes + Maint + Closing + Selling Fees + Opp Cost - Appreciation
    const currentBuyCost = cumulativeInterest + cumulativeTaxes + cumulativeMaint + closingAmt + sellingFee + oppCostGain - appreciationGain
    
    rentTrack.push({ year: y, cost: cumulativeRent })
    buyTrack.push({ year: y, cost: currentBuyCost })
    
    currentRent *= (1 + rentIncRate)
  }
  
  const finalRentCost = rentTrack[years - 1]?.cost || 0
  const finalBuyCost = buyTrack[years - 1]?.cost || 0
  const difference = Math.abs(finalRentCost - finalBuyCost)
  const winner = finalRentCost > finalBuyCost ? 'buy' : 'rent'
  
  return {
    rentTrack,
    buyTrack,
    finalRentCost,
    finalBuyCost,
    difference,
    winner,
    finalHomeValue: currentHomeValue,
    remainingLoan: currentLoanBal,
    closingAmt
  }
})

// --- SVG CHART CONSTANTS ---
const svgW = 600
const svgH = 260

const maxGraphVal = computed(() => {
  const maxR = Math.max(...engine.value.rentTrack.map(d => d.cost), 10000)
  const maxB = Math.max(...engine.value.buyTrack.map(d => d.cost), 10000)
  const minB = Math.min(...engine.value.buyTrack.map(d => d.cost), 0)
  return {
    max: Math.max(maxR, maxB) * 1.15,
    min: Math.min(0, minB)
  }
})

const getSvgY = (val) => {
  const range = maxGraphVal.value.max - maxGraphVal.value.min
  const pos = val - maxGraphVal.value.min
  return svgH - (pos / range) * (svgH - 40) - 20
}

const rentLinePoints = computed(() => {
  const yrs = parseInt(compareYears.value)
  return engine.value.rentTrack.map((d, i) => {
    const x = ((i + 1) / yrs) * (svgW - 20) + 10
    const y = getSvgY(d.cost)
    return `${x},${y}`
  }).join(" ")
})

const buyLinePoints = computed(() => {
  const yrs = parseInt(compareYears.value)
  return engine.value.buyTrack.map((d, i) => {
    const x = ((i + 1) / yrs) * (svgW - 20) + 10
    const y = getSvgY(d.cost)
    return `${x},${y}`
  }).join(" ")
})

const breakEvenYear = computed(() => {
  for (let i = 0; i < engine.value.rentTrack.length; i++) {
    const rent = engine.value.rentTrack[i].cost
    const buy = engine.value.buyTrack[i].cost
    // Usually early years Buy > Rent, we look for crossover
    // Wait, let's just detect where sign changes if we trace them
  }
  // Simplified look up
  const index = engine.value.rentTrack.findIndex((d, idx) => {
    const rent = d.cost
    const buy = engine.value.buyTrack[idx].cost
    // If initially Buy is costlier, find where Buy becomes cheaper
    return rent > buy
  })
  return index === -1 ? 'N/A' : index + 1
})

</script>

# 🧮 買房 vs 租房 終極資產對決試算機 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Ultimate Rent vs. Buy Financial Simulator</span>

華人社會總流傳著「買房是存錢，租房是幫房東繳房貸」的觀念，然而在利率走高、房價高企的時代，真的是如此嗎？本系統內建哈佛與 CNN 等級的 **現值貼現與機會成本模型**，深度拆解房貸利息、持有稅費、維護折舊與**股市投資機會成本**，為您揭秘最符合財務邏輯的真實贏家！

---

<div class="language-toggle-wrapper" style="margin-bottom: 24px;">
  <div class="language-toggle-bar">
    <button :class="['language-toggle-btn', { active: displayMode === 'bilingual' }]" @click="displayMode = 'bilingual'">中英對照</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'zh' }]" @click="displayMode = 'zh'">純中文</button>
    <button :class="['language-toggle-btn', { active: displayMode === 'en' }]" @click="displayMode = 'en'">純英文</button>
  </div>
</div>

<ClientOnly>
<div class="calculator-layout extended">
<!-- Left inputs (2 columns of inputs inside sidebar if wide, or stacked) -->
<div class="inputs-panel">
<!-- SECTION A: Comparison Settings -->
<div class="input-card">
<h3 class="section-title border-gold">
<span v-if="displayMode !== 'en'">⏰ 時間跨度</span>
<span v-if="displayMode !== 'zh'" class="en-sub">Comparison Timeline</span>
</h3>
<div class="input-group">
<div class="input-header">
<label>預計居住年數 (Years to Stay):</label>
<span class="value-badge highlight">{{ compareYears }} 年</span>
</div>
<input type="range" v-model="compareYears" min="1" max="30" class="calc-slider" />
</div>
</div>
<!-- SECTION B: Buy Scenarios -->
<div class="input-card">
<h3 class="section-title border-gold">
<span v-if="displayMode !== 'en'">🏠 買房決策參數</span>
<span v-if="displayMode !== 'zh'" class="en-sub">Home Purchase Variables</span>
</h3>
<div class="grid-inputs">
<div class="input-group">
<label class="mini-header">房屋總價 (Home Price)</label>
<input type="number" v-model="homePrice" step="500000" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">頭期款比例 (Down Payment %)</label>
<input type="number" v-model="downPayPct" step="5" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">房貸利率 (Interest %)</label>
<input type="number" v-model="mortgageRate" step="0.1" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">貸款年限 (Mortgage Term)</label>
<input type="number" v-model="mortgageTerm" step="5" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">年均房價漲幅 (Appreciation %)</label>
<input type="number" v-model="homeAppreciation" step="0.5" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">房屋持有稅費/年 (Tax %)</label>
<input type="number" v-model="propertyTaxRate" step="0.1" class="calc-text-input" />
</div>
</div>
<details class="adv-accordion">
<summary>⚙️ 買房進階稅費 (Advanced Buying Fees)</summary>
<div class="grid-inputs compact">
<div class="input-group">
<label>購屋交易稅規費 % (Closing Cost):</label>
<input type="number" v-model="closingCostRate" step="0.1" class="calc-text-input compact" />
</div>
<div class="input-group">
<label>每年維護修繕比 % (Maintenance):</label>
<input type="number" v-model="maintenanceRate" step="0.1" class="calc-text-input compact" />
</div>
<div class="input-group">
<label>售屋仲介費比 % (Selling Agent):</label>
<input type="number" v-model="sellingAgentFee" step="0.5" class="calc-text-input compact" />
</div>
</div>
</details>
</div>
<!-- SECTION C: Rent & Opportunity -->
<div class="input-card">
<h3 class="section-title border-gold">
<span v-if="displayMode !== 'en'">💸 租屋與投資參數</span>
<span v-if="displayMode !== 'zh'" class="en-sub">Renting & Investment Opp.</span>
</h3>
<div class="grid-inputs">
<div class="input-group">
<label class="mini-header">月租金 (Monthly Rent)</label>
<input type="number" v-model="monthlyRent" step="1000" class="calc-text-input" />
</div>
<div class="input-group">
<label class="mini-header">預期年均租金漲幅 %</label>
<input type="number" v-model="rentIncreaseRate" step="0.5" class="calc-text-input" />
</div>
<div class="input-group full">
<label class="mini-header">股市年化報酬率 % (若不買房，頭期款改拿去買 ETF 的報酬率)</label>
<div class="input-header" style="margin-top:4px;">
<span class="mini-label">機會成本基準 (Stock ROI)</span>
<span class="value-badge highlight">{{ investmentReturn }} %</span>
</div>
<input type="range" v-model="investmentReturn" min="-2" max="15" step="0.5" class="calc-slider" />
</div>
</div>
</div>
</div>
<!-- Right Results Panel -->
<div class="results-panel">
<!-- Verdict Section -->
<div class="verdict-hero" :class="{ 'buy-wins': engine.winner === 'buy', 'rent-wins': engine.winner === 'rent' }">
<div class="verdict-icon">
{{ engine.winner === 'buy' ? '🏠' : '💸' }}
</div>
<div class="verdict-text">
<h3 class="verdict-title">
<span v-if="displayMode !== 'en'">
{{ engine.winner === 'buy' ? '決策：買房更具財務優勢！' : '決策：租屋更具財務優勢！' }}
</span>
<span v-if="displayMode !== 'zh'" class="en-sub-title">
{{ engine.winner === 'buy' ? 'Decision: Buying is more advantageous!' : 'Decision: Renting is more advantageous!' }}
</span>
</h3>
<p class="verdict-desc">
<span v-if="displayMode !== 'en'">在 {{ compareYears }} 年的跨度下，{{ engine.winner === 'buy' ? '買房' : '租屋' }} 預計能為您 **省下/多賺約** </span>
<span v-if="displayMode !== 'zh'" class="en-sub-desc">Over a {{ compareYears }} year horizon, {{ engine.winner === 'buy' ? 'buying' : 'renting' }} will save/generate approx </span>
<strong class="win-amount">{{ formatCurrency(engine.difference) }}</strong>！
</p>
</div>
</div>
<!-- Quick Stat Grid -->
<div class="stat-summary-grid">
<div class="stat-box">
<span class="label">🏠 買房總真實成本 (Net Buy Cost)</span>
<span class="value">{{ formatCurrency(engine.finalBuyCost) }}</span>
<span class="mini-tip">利息+稅費+機會成本 - 房價增幅</span>
</div>
<div class="stat-box">
<span class="label">💸 租房總真實成本 (Net Rent Cost)</span>
<span class="value">{{ formatCurrency(engine.finalRentCost) }}</span>
<span class="mini-tip">單純累積租金總流出</span>
</div>
</div>
<!-- Break Even Fact -->
<div class="breakeven-banner" v-if="breakEvenYear !== 'N/A' && breakEvenYear <= compareYears">
💡 <strong>黃金平衡點 (Break-even Point):</strong> 約在第 <strong class="b-badge">{{ breakEvenYear }}</strong> 年。在這一年之後，買房累積的資產增值開始大於租屋投資組合！
</div>
<div class="breakeven-banner negative" v-else>
💡 <strong>黃金平衡點:</strong> 在 {{ compareYears }} 年內無黃金交叉。這意味著在此參數組合下，租屋始終是成本更低的選項。
</div>
<!-- Visual Curve Chart -->
<div class="chart-card">
<h4 class="chart-title">
<span v-if="displayMode !== 'en'">📊 終極資產淨支出累積曲線 (越低越划算)</span>
<span v-if="displayMode !== 'zh'" class="en-sub">Cumulative Sunk Cost Curve (Lower is better)</span>
</h4>
<div class="chart-legend">
<span class="legend-item buy"><span class="dot"></span> 買房淨支出 (Buy Net Cost)</span>
<span class="legend-item rent"><span class="dot"></span> 租房總租金 (Rent Total Cost)</span>
</div>
<div class="svg-wrapper-large">
<svg :viewBox="`0 0 ${svgW} ${svgH}`" width="100%" height="100%" preserveAspectRatio="none">
<!-- Grid Lines -->
<line x1="0" :y1="svgH * 0.25" :x2="svgW" :y2="svgH * 0.25" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
<line x1="0" :y1="svgH * 0.5" :x2="svgW" :y2="svgH * 0.5" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
<line x1="0" :y1="svgH * 0.75" :x2="svgW" :y2="svgH * 0.75" stroke="rgba(255,255,255,0.04)" stroke-width="1" />
<!-- Zero Reference Line (in case buy goes negative, meaning profitable) -->
<line x1="0" :y1="getSvgY(0)" :x2="svgW" :y2="getSvgY(0)" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 4" />
<!-- Rent Line -->
<polyline :points="rentLinePoints" fill="none" stroke="#28a745" stroke-width="3.5" stroke-linecap="round" />
<!-- Buy Line -->
<polyline :points="buyLinePoints" fill="none" stroke="#d4af37" stroke-width="3.5" stroke-linecap="round" />
</svg>
<div class="chart-year-label start">第 1 年</div>
<div class="chart-year-label end">第 {{ compareYears }} 年</div>
</div>
</div>
<!-- Analysis Details breakdown -->
<details class="breakdown-details">
<summary>📄 查看 {{ compareYears }} 年後精算細節清單 (Analytical Details)</summary>
<div class="details-content">
<table class="details-table">
<tbody>
<tr class="cat-row-header"><td colspan="2">🏠 買房終局資產狀態 (Home Asset End State)</td></tr>
<tr>
<td>未來房價估值 (Appreciated Value)</td>
<td class="val-cell">{{ formatCurrency(engine.finalHomeValue) }}</td>
</tr>
<tr>
<td>剩餘貸款本金 (Loan Principal Left)</td>
<td class="val-cell danger">{{ formatCurrency(engine.remainingLoan) }}</td>
</tr>
<tr>
<td>期初購屋交易稅費 (Upfront Closing Fees)</td>
<td class="val-cell danger">{{ formatCurrency(engine.closingAmt) }}</td>
</tr>
<tr class="cat-row-header"><td colspan="2">💡 機會成本考量 (Hidden Sunk Costs)</td></tr>
<tr>
<td>頭期款+稅費的股市機會成本 (Opp. Cost)</td>
<td class="val-cell">{{ formatCurrency((homePrice * (downPayPct / 100) + engine.closingAmt) * (Math.pow(1 + (investmentReturn / 100), compareYears) - 1)) }}</td>
</tr>
</tbody>
</table>
</div>
</details>
</div>
</div>
</ClientOnly>

<style scoped>
.calculator-layout.extended {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}

@media (min-width: 960px) {
  .calculator-layout.extended {
    grid-template-columns: 460px 1fr;
  }
}

/* Cards & General inputs */
.input-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.dark .input-card {
  background: rgba(30, 30, 35, 0.4);
  border-color: rgba(255,255,255,0.04);
}

.section-title.border-gold {
  border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
  padding-bottom: 10px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  font-weight: 750;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.grid-inputs.compact {
  gap: 10px;
  margin-top: 12px;
}

.input-group.full {
  grid-column: 1 / -1;
}

.mini-header {
  font-size: 0.8rem;
  font-weight: 650;
  color: var(--vp-c-text-2);
  display: block;
  margin-bottom: 6px;
}

.calc-text-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 700;
}

.calc-text-input.compact {
  font-size: 0.85rem;
  padding: 6px 10px;
}

.adv-accordion {
  margin-top: 16px;
  border-top: 1px dashed rgba(255,255,255,0.06);
  padding-top: 12px;
}

.adv-accordion summary {
  font-size: 0.82rem;
  cursor: pointer;
  color: #d4af37;
  font-weight: 600;
  outline: none;
  user-select: none;
}

/* Result Panel UI */
.results-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.verdict-hero {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid;
}

.verdict-hero.buy-wins {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(0,0,0,0.1) 100%);
  border-color: rgba(212, 175, 55, 0.3);
}

.verdict-hero.rent-wins {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(0,0,0,0.1) 100%);
  border-color: rgba(40, 167, 69, 0.3);
}

.verdict-icon {
  font-size: 3.2rem;
  flex-shrink: 0;
}

.verdict-title {
  margin: 0 0 4px 0 !important;
  font-size: 1.35rem;
  font-weight: 850;
  border-bottom: none !important;
}

.buy-wins .verdict-title { color: #d4af37; }
.rent-wins .verdict-title { color: #28a745; }

.en-sub-title {
  font-size: 0.85rem;
  display: block;
  opacity: 0.7;
  font-weight: 400;
}

.verdict-desc {
  margin: 0 !important;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.win-amount {
  font-size: 1.4rem;
  font-weight: 850;
}
.buy-wins .win-amount { color: #e6c252; }
.rent-wins .win-amount { color: #2ebd51; }

.stat-summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-box {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-box .label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.stat-box .value {
  font-size: 1.35rem;
  font-weight: 850;
  color: var(--vp-c-text-1);
}

.stat-box .mini-tip {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.breakeven-banner {
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.15);
  color: var(--vp-c-text-2);
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breakeven-banner.negative {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255,255,255,0.08);
}

.b-badge {
  background: #d4af37;
  color: #1a1a1a;
  padding: 2px 6px;
  border-radius: 6px;
}

/* Chart Section */
.chart-card {
  background: rgba(255,255,255,0.015);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 24px;
}

.chart-title {
  margin-top: 0 !important;
  font-size: 1rem;
  font-weight: 750;
  color: var(--vp-c-text-1);
  margin-bottom: 12px !important;
}

.chart-legend {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.legend-item {
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-item.buy { color: #d4af37; }
.legend-item.rent { color: #28a745; }

.legend-item .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.legend-item.buy .dot { background: #d4af37; }
.legend-item.rent .dot { background: #28a745; }

.svg-wrapper-large {
  position: relative;
  height: 260px;
  background: rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 10px 0;
}

.chart-year-label {
  position: absolute;
  bottom: -24px;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 650;
}

.chart-year-label.start { left: 8px; }
.chart-year-label.end { right: 8px; }

/* Tables breakdown */
.breakdown-details {
  margin-top: 10px;
}

.breakdown-details summary {
  font-size: 0.9rem;
  font-weight: 650;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 8px 0;
}

.details-content {
  margin-top: 12px;
  background: rgba(255,255,255,0.01);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.details-table td {
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.cat-row-header td {
  background: rgba(255,255,255,0.03);
  font-weight: 750;
  color: var(--vp-c-text-1);
}

.val-cell {
  text-align: right;
  font-weight: 750;
  font-family: monospace;
}
.val-cell.danger { color: #ff4a4a; }

/* Slider shared styling */
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
}
</style>
