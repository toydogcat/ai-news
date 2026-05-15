import{_ as E,o as F,c as I,j as e,a as x,n as P,e as T,t as s,p as t,h as c}from"./chunks/framework.DfCsusKa.js";const G={class:"language-toggle-wrapper",style:{"margin-bottom":"24px"}},O={class:"language-toggle-bar"},V={class:"calculator-layout"},X={class:"calc-controls-card"},Y={class:"section-title"},q={key:0},J={key:1,class:"en-sub"},U={class:"calc-results-card"},en=JSON.parse('{"title":"退休金理財試算表 | Retirement Calculator - Smart Financial Planning","description":"透過我們精心設計、全動態響應的退休理財試算表，即時評估您的儲蓄計劃、投資報酬率與通膨因素，快速規劃您的完美退休資金目標藍圖！","frontmatter":{"title":"退休金理財試算表 | Retirement Calculator - Smart Financial Planning","description":"透過我們精心設計、全動態響應的退休理財試算表，即時評估您的儲蓄計劃、投資報酬率與通膨因素，快速規劃您的完美退休資金目標藍圖！"},"headers":[],"relativePath":"calculators/retirement-calculator.md","filePath":"calculators/retirement-calculator.md"}'),K={name:"calculators/retirement-calculator.md"},Q=Object.assign(K,{setup(Z){const r=t("bilingual"),h=t(30),p=t(65),y=t(90),C=t(8e5),w=t(5e5),A=t(12),R=t(75),D=t(7),S=t(4),N=t(2.5),H=c(()=>Math.max(1,p.value-h.value)),$=c(()=>Math.max(1,y.value-p.value)),j=c(()=>{let a=[],n=parseFloat(w.value),l=parseFloat(C.value);const M=1+parseFloat(N.value)/100,d=1+parseFloat(D.value)/100,u=1+parseFloat(S.value)/100,v=parseFloat(A.value)/100;for(let o=parseInt(h.value);o<parseInt(p.value);o++){const g=l*v,m=n*(d-1),_=n;n=n*d+g,a.push({age:o,type:"accumulation",balance:n,startBalance:_,contribution:g,interest:m}),l=l*M}let z=l*(parseFloat(R.value)/100);for(let o=parseInt(p.value);o<=parseInt(y.value);o++){const g=n,m=Math.min(n,z);n=Math.max(0,(n-m)*u);const _=(g-m)*(u-1);a.push({age:o,type:"decumulation",balance:n,startBalance:g,withdrawal:m,interest:Math.max(0,_)}),z=z*M}return a}),f=c(()=>{const a=1+parseFloat(N.value)/100,n=1+parseFloat(S.value)/100;let l=parseFloat(C.value);for(let i=0;i<H.value;i++)l*=a;let M=l*(parseFloat(R.value)/100),d=[],u=M;for(let i=0;i<=$.value;i++)d.push(u),u*=a;let v=0;for(let i=d.length-1;i>=0;i--)v=v/n+d[i];return v}),k=c(()=>{const a=j.value.find(n=>n.age===parseInt(p.value)-1);return a?a.balance:parseFloat(w.value)}),L=c(()=>Math.max(0,f.value-k.value)),B=c(()=>f.value===0?0:Math.min(100,Math.round(k.value/f.value*100))),W=a=>new Intl.NumberFormat("zh-TW",{maximumFractionDigits:0}).format(a),b=a=>"$ "+W(a);return(a,n)=>(F(),I("div",null,[n[3]||(n[3]=e("h1",{id:"🧮-專屬退休規劃試算表-interactive-dual-language-retirement-calculator",tabindex:"-1"},[x("🧮 專屬退休規劃試算表 "),e("br"),e("span",{style:{"font-size":"1.5rem",color:"var(--vp-c-text-2)"}},"Interactive Dual-Language Retirement Calculator"),x(),e("a",{class:"header-anchor",href:"#🧮-專屬退休規劃試算表-interactive-dual-language-retirement-calculator","aria-label":'Permalink to "🧮 專屬退休規劃試算表 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Interactive Dual-Language Retirement Calculator</span>"'},"​")],-1)),n[4]||(n[4]=e("p",null,[x("歡迎使用我們專為現代人打造的互動式退休規劃試算表。在此工具中，您可以針對您個人的當前財務狀況進行精密模擬，我們系統的背景數值引擎將會針對 "),e("strong",null,"通膨侵蝕、複利滾動以及退休後的資金提領"),x(" 進行全面的壓力測試。")],-1)),n[5]||(n[5]=e("hr",null,null,-1)),e("div",G,[e("div",O,[e("button",{class:P(["language-toggle-btn",{active:r.value==="bilingual"}]),onClick:n[0]||(n[0]=l=>r.value="bilingual")},"中英對照",2),e("button",{class:P(["language-toggle-btn",{active:r.value==="zh"}]),onClick:n[1]||(n[1]=l=>r.value="zh")},"純中文",2),e("button",{class:P(["language-toggle-btn",{active:r.value==="en"}]),onClick:n[2]||(n[2]=l=>r.value="en")},"純英文",2)])]),e("div",V,[e("div",X,[e("h3",Y,[r.value!=="en"?(F(),I("span",q,"📊 基本設定參數")):T("",!0),r.value!=="zh"?(F(),I("span",J,"Personal Parameters")):T("",!0)]),e("pre",null,[e("code",null,`<div class="input-group">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">當前年齡：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Current Age</span>
    </label>
    <span class="value-badge">`+s(h.value)+` 歲</span>
  </div>
  <input type="range" v-model="currentAge" min="18" :max="retirementAge - 1" step="1" class="calc-slider" />
</div>

<div class="input-group">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">理想退休年齡：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Retirement Age</span>
    </label>
    <span class="value-badge">`+s(p.value)+` 歲</span>
  </div>
  <input type="range" v-model="retirementAge" :min="parseInt(currentAge) + 1" :max="Math.min(95, parseInt(lifespan) - 1)" step="1" class="calc-slider" />
</div>

<div class="input-group">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">預期壽命：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Life Expectancy</span>
    </label>
    <span class="value-badge">`+s(y.value)+` 歲</span>
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
    <span class="value-badge highlight">`+s(A.value)+`%</span>
  </div>
  <input type="range" v-model="annualContributionPercent" min="0" max="60" step="1" class="calc-slider" />
</div>

<div class="input-group">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">所得替代率：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Income Replacement %</span>
    </label>
    <span class="value-badge highlight">`+s(R.value)+`%</span>
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
`,1)])]),e("div",U,[e("pre",null,[e("code",null,`<div class="score-hero-container" :class="{ 'is-success': hasSurplus, 'is-warning': !hasSurplus }">
  <div class="score-circle">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="circle" :stroke-dasharray="onTrackPercentage + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <text x="18" y="20.35" class="percentage">`+s(B.value)+`%</text>
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
    <span class="value gold">`+s(b(f.value))+`</span>
  </div>
  
  <div class="summary-box">
    <span class="label">
      <span v-if="displayMode !== 'en'">🔮 屆齡退休預估總額</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Projected Nest Egg</span>
    </span>
    <span class="value">`+s(b(k.value))+`</span>
  </div>
</div>

<div v-if="!hasSurplus" class="shortage-banner">
  <span v-if="displayMode !== 'en'">🚨 您面臨的潛在資金缺口為：<strong>`+s(b(L.value))+`</strong></span>
  <span v-if="displayMode !== 'zh'" class="en-sub">🚨 Projected Deficit: <strong>`+s(b(L.value))+`</strong></span>
</div>

<!-- Dynamic Interactive Chart -->
<div class="chart-container">
  <h4 class="chart-title">
    <span v-if="displayMode !== 'en'">📈 終身資產水位滾動模型 (包含提領期)</span>
    <span v-if="displayMode !== 'zh'" class="en-sub">Lifetime Wealth Trajectory Chart</span>
  </h4>
  
  <div class="svg-wrapper">
    <svg :viewBox="\`0 0 \${svgWidth} \${svgHeight}\`" width="100%" height="100%" preserveAspectRatio="none">
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
      <span>`+s(h.value)+' 歲</span>\n    </div>\n    <div class="chart-overlay-text middle" :style="{ left: `calc(${(retirementLineX / svgWidth) * 100}% - 35px)` }">\n      <span class="retire-badge">'+s(p.value)+` 歲退休</span>
    </div>
    <div class="chart-overlay-text end">
      <span>`+s(y.value)+` 歲</span>
    </div>
  </div>
</div>
`,1)])])])]))}}),an=E(Q,[["__scopeId","data-v-7409d8f3"]]);export{en as __pageData,an as default};
