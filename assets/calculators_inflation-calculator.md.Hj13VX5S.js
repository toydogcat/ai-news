import{_ as P,C as S,o,c as r,j as n,a as f,n as g,E as T,w as A,e as d,t as s,p as i,h as p}from"./chunks/framework.DfCsusKa.js";const R={class:"language-toggle-wrapper",style:{"margin-bottom":"24px"}},$={class:"language-toggle-bar"},B={class:"mode-switcher-tabs"},E={key:0},G={key:1,class:"sub-en"},N={key:0},V={key:1,class:"sub-en"},H={class:"calculator-layout"},L={class:"calc-controls-card"},W={class:"section-title"},j={key:0},O={key:1,class:"en-sub"},Y={class:"calc-results-card"},U=JSON.parse('{"title":"通貨膨脹與購買力侵蝕試算表 | Inflation & Buying Power Erosion Calculator","description":"面對通膨巨獸，您的現金正在以多快的速度蒸發？快來試算未來維持同等生活品質所需的預算，並即時觀測您的存款實質購買力變化趨勢圖！","frontmatter":{"title":"通貨膨脹與購買力侵蝕試算表 | Inflation & Buying Power Erosion Calculator","description":"面對通膨巨獸，您的現金正在以多快的速度蒸發？快來試算未來維持同等生活品質所需的預算，並即時觀測您的存款實質購買力變化趨勢圖！"},"headers":[],"relativePath":"calculators/inflation-calculator.md","filePath":"calculators/inflation-calculator.md"}'),q={name:"calculators/inflation-calculator.md"},J=Object.assign(q,{setup(Q){const t=i("bilingual"),y=i("expense"),F=i(5e4),l=i(20),u=i(3.5),x=i(!1),w=i([{name:"🏠 房屋貸款/租金",en:"Mortgage / Rent",value:2e4,inf:3},{name:"🍜 飲食餐館",en:"Food & Dining",value:12e3,inf:4.5},{name:"🚗 交通養車",en:"Transportation",value:5e3,inf:2.5},{name:"🏥 醫療保健",en:"Healthcare",value:3e3,inf:5},{name:"🎮 育樂休閒",en:"Entertainment",value:5e3,inf:3.5},{name:"📝 其他雜支",en:"Miscellaneous",value:5e3,inf:3}]),h=p(()=>x.value?w.value.reduce((e,a)=>e+parseFloat(a.value),0):parseFloat(F.value)),I=p(()=>{const e=1+parseFloat(u.value)/100;return h.value*Math.pow(e,parseInt(l.value))}),D=p(()=>{const e=parseInt(l.value);return w.value.reduce((a,b)=>{const c=1+parseFloat(b.inf)/100;return a+parseFloat(b.value)*Math.pow(c,e)},0)}),C=p(()=>x.value?D.value:I.value),k=p(()=>h.value===0?0:(C.value/h.value-1)*100),v=i(1e6),_=p(()=>{const e=1+parseFloat(u.value)/100;return parseFloat(v.value)/Math.pow(e,parseInt(l.value))}),z=p(()=>parseFloat(v.value)===0?0:(parseFloat(v.value)-_.value)/parseFloat(v.value)*100),M=e=>new Intl.NumberFormat("zh-TW",{maximumFractionDigits:0}).format(e),m=e=>"$ "+M(e);return(e,a)=>{const b=S("ClientOnly");return o(),r("div",null,[a[5]||(a[5]=n("h1",{id:"🧮-雙效通貨膨脹與購買力試算機-interactive-dual-mode-inflation-simulator",tabindex:"-1"},[f("🧮 雙效通貨膨脹與購買力試算機 "),n("br"),n("span",{style:{"font-size":"1.5rem",color:"var(--vp-c-text-2)"}},"Interactive Dual-Mode Inflation Simulator"),f(),n("a",{class:"header-anchor",href:"#🧮-雙效通貨膨脹與購買力試算機-interactive-dual-mode-inflation-simulator","aria-label":'Permalink to "🧮 雙效通貨膨脹與購買力試算機 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Interactive Dual-Mode Inflation Simulator</span>"'},"​")],-1)),a[6]||(a[6]=n("p",null,[f("面臨著全球利率動盪與物價螺旋式攀升的「通膨時代」，您的錢包正在以多快的速度貶值？本系統提供兩種核心情境模擬：為您精算 "),n("strong",null,"「未來維持相同生活開銷所需總額」"),f(" 以及 "),n("strong",null,"「手頭現金實質購買力的蒸發速度」"),f("。")],-1)),a[7]||(a[7]=n("hr",null,null,-1)),n("div",R,[n("div",$,[n("button",{class:g(["language-toggle-btn",{active:t.value==="bilingual"}]),onClick:a[0]||(a[0]=c=>t.value="bilingual")},"中英對照",2),n("button",{class:g(["language-toggle-btn",{active:t.value==="zh"}]),onClick:a[1]||(a[1]=c=>t.value="zh")},"純中文",2),n("button",{class:g(["language-toggle-btn",{active:t.value==="en"}]),onClick:a[2]||(a[2]=c=>t.value="en")},"純英文",2)])]),T(b,null,{default:A(()=>[n("div",B,[n("button",{class:g(["tab-btn",{active:y.value==="expense"}]),onClick:a[3]||(a[3]=c=>y.value="expense")},[t.value!=="en"?(o(),r("span",E,"📊 生活品質開銷預測")):d("",!0),t.value!=="zh"?(o(),r("span",G,"Future Cost of Living")):d("",!0)],2),n("button",{class:g(["tab-btn",{active:y.value==="cash"}]),onClick:a[4]||(a[4]=c=>y.value="cash")},[t.value!=="en"?(o(),r("span",N,"📉 現金購買力侵蝕")):d("",!0),t.value!=="zh"?(o(),r("span",V,"Cash Value Erosion")):d("",!0)],2)]),n("div",H,[n("div",L,[n("h3",W,[t.value!=="en"?(o(),r("span",j,"⚙️ 核心參數設定")):d("",!0),t.value!=="zh"?(o(),r("span",O,"Primary Assumptions")):d("",!0)]),n("pre",null,[n("code",null,`<div class="input-group">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">分析年限跨度：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Analysis Period</span>
    </label>
    <span class="value-badge">`+s(l.value)+` 年</span>
  </div>
  <input type="range" v-model="projectedYears" min="1" max="40" step="1" class="calc-slider" />
</div>

<div class="input-group" v-if="!isDetailed || activeTab === 'cash'">
  <div class="input-header">
    <label>
      <span v-if="displayMode !== 'en'">預期年均通貨膨脹率：</span>
      <span v-if="displayMode !== 'zh'" class="en-sub">Annual Inflation Rate</span>
    </label>
    <span class="value-badge highlight">`+s(u.value)+` %</span>
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
      `+s(x.value?"✏️ 簡化總額":"📋 細項拆解")+`
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
          <span v-if="displayMode !== 'en'">`+s(e.cat.name)+`</span>
          <span v-if="displayMode !== 'zh'" class="sub-en">`+s(e.cat.en)+`</span>
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
`,1)])]),n("div",Y,[n("pre",null,[n("code",null,`<!-- Display Mode A Results -->
<div v-if="activeTab === 'expense'" class="result-wrapper">
  <div class="score-hero-container is-warning">
    <div class="score-icon-wrapper">🔥</div>
    <div class="score-text-panel">
      <h4 class="score-heading">
        <span v-if="displayMode !== 'en'">生活成本上漲幅度 `+s(Math.round(k.value))+`%</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Living Cost Swell by `+s(Math.round(k.value))+`%</span>
      </h4>
      <p class="score-desc">
        <span v-if="displayMode !== 'en'">在 `+s(l.value)+` 年後，您需要準備更多的預算，才能享受跟今天 **一模一樣** 的生活水準。</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">In `+s(l.value)+` years, your required monthly budget must balloon to maintain your current lifestyle quality.</span>
      </p>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-box">
      <span class="label">
        <span v-if="displayMode !== 'en'">📅 今日每月總預算</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Monthly Cost Today</span>
      </span>
      <span class="value">`+s(m(h.value))+`</span>
    </div>
    <div class="summary-box important">
      <span class="label">
        <span v-if="displayMode !== 'en'">🔮 未來每月所需總額</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Future Monthly Need</span>
      </span>
      <span class="value danger">`+s(m(C.value))+`</span>
    </div>
  </div>
</div>

<!-- Display Mode B Results -->
<div v-else class="result-wrapper">
  <div class="score-hero-container is-warning" style="background: rgba(255, 74, 74, 0.05); border-color: rgba(255,74,74,0.3)">
    <div class="score-icon-wrapper">📉</div>
    <div class="score-text-panel">
      <h4 class="score-heading" style="color: #ff4a4a">
        <span v-if="displayMode !== 'en'">現金價值遭「蒸發」 `+s(Math.round(z.value))+`%</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Cash Stripped by `+s(Math.round(z.value))+`%</span>
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
      <span class="value">`+s(m(v.value))+`</span>
    </div>
    <div class="summary-box important">
      <span class="label">
        <span v-if="displayMode !== 'en'">❄️ 未來「實質購買力」</span>
        <span v-if="displayMode !== 'zh'" class="en-sub">Real Purchasing Power</span>
      </span>
      <span class="value danger">`+s(m(_.value))+`</span>
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
    <svg :viewBox="\`0 0 \${svgWidth} \${svgHeight}\`" width="100%" height="100%" preserveAspectRatio="none">
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
      <span>`+s(l.value)+` 年後</span>
    </div>
  </div>
</div>

<!-- Real-World Analogy Banner (Wow Factor) -->
<div class="fun-fact-box">
  <h5 class="fact-title">💡 購買力實境對比 (Real-world Analogy)</h5>
  <p class="fact-desc" v-if="activeTab === 'expense'">
    如果今天一杯精品美式拿鐵是 **$100 元**，在相同通膨背景下，`+s(l.value)+` 年後這杯一樣的咖啡預計將會飆漲到 
    <strong style="color:#ff4a4a">$`+s(M(100*Math.pow(1+u.value/100,l.value)))+` 元</strong>！
  </p>
  <p class="fact-desc" v-else>
    也就是說，現在手上的 $100 元大鈔，在 `+s(l.value)+` 年後走進超商，實際上只能買到相當於今天價值 
    <strong style="color:#28a745">$`+s(M(100/Math.pow(1+u.value/100,l.value)))+` 元</strong> 的商品！
  </p>
</div>
`,1)])])])]),_:1})])}}}),X=P(J,[["__scopeId","data-v-4e10492b"]]);export{U as __pageData,X as default};
