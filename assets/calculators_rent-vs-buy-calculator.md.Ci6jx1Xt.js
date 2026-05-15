import{_ as un,C as dn,o as vn,c as mn,j as e,a as m,n as w,E as gn,w as bn,t as a,p as s,h as L}from"./chunks/framework.DfCsusKa.js";const yn={class:"language-toggle-wrapper",style:{"margin-bottom":"24px"}},hn={class:"language-toggle-bar"},fn={class:"calculator-layout extended"},xn={class:"inputs-panel"},Cn={class:"results-panel"},Fn=JSON.parse('{"title":"買房 vs 租房終極對決試算機 | Rent vs. Buy Ultimate Decision Simulator","description":"買房真的比較划算？還是租屋加投資能贏得更多？本試算機為您深度對決包含「房貸利息、房屋折舊維護、機會成本、與房價增值」等維度的終極資產數據！","frontmatter":{"title":"買房 vs 租房終極對決試算機 | Rent vs. Buy Ultimate Decision Simulator","description":"買房真的比較划算？還是租屋加投資能贏得更多？本試算機為您深度對決包含「房貸利息、房屋折舊維護、機會成本、與房價增值」等維度的終極資產數據！"},"headers":[],"relativePath":"calculators/rent-vs-buy-calculator.md","filePath":"calculators/rent-vs-buy-calculator.md"}'),kn={name:"calculators/rent-vs-buy-calculator.md"},Rn=Object.assign(kn,{setup(wn){const c=s("bilingual"),i=s(10),M=s(15e6),B=s(20),E=s(2.2),V=s(30),D=s(3),Y=s(1.5),W=s(.2),$=s(1),U=s(4),G=s(35e3),j=s(2.5),y=s(6),J=l=>new Intl.NumberFormat("zh-TW",{maximumFractionDigits:0}).format(l),o=l=>"$ "+J(l),t=L(()=>{var N,O;const l=parseInt(i.value),n=parseFloat(M.value),u=parseFloat(B.value)/100,r=n*u,d=n*(parseFloat(Y.value)/100),h=n-r,F=parseFloat(E.value)/100,g=F/12,f=parseInt(V.value)*12,Z=F>0?h*g*Math.pow(1+g,f)/(Math.pow(1+g,f)-1):h/f,T=r+d,q=parseFloat(y.value)/100;let S=parseFloat(G.value);const K=parseFloat(j.value)/100;let b=h,p=n;const X=parseFloat(D.value)/100,nn=parseFloat(W.value)/100,en=parseFloat($.value)/100;let A=0,P=0,_=0,I=0,x=[],C=[];for(let v=1;v<=l;v++){const sn=S*12;A+=sn,p*=1+X,_+=p*nn,I+=p*en;for(let H=1;H<=12;H++){const z=b*g,pn=Math.min(Z-z,b);P+=z,b-=pn}const ln=p*(parseFloat(U.value)/100),on=p-n,rn=T*Math.pow(1+q,v)-T,cn=P+_+I+d+ln+rn-on;x.push({year:v,cost:A}),C.push({year:v,cost:cn}),S*=1+K}const k=((N=x[l-1])==null?void 0:N.cost)||0,R=((O=C[l-1])==null?void 0:O.cost)||0,an=Math.abs(k-R),tn=k>R?"buy":"rent";return{rentTrack:x,buyTrack:C,finalRentCost:k,finalBuyCost:R,difference:an,winner:tn,finalHomeValue:p,remainingLoan:b,closingAmt:d}}),Q=L(()=>{for(let n=0;n<t.value.rentTrack.length;n++)t.value.rentTrack[n].cost,t.value.buyTrack[n].cost;const l=t.value.rentTrack.findIndex((n,u)=>{const r=n.cost,d=t.value.buyTrack[u].cost;return r>d});return l===-1?"N/A":l+1});return(l,n)=>{const u=dn("ClientOnly");return vn(),mn("div",null,[n[3]||(n[3]=e("h1",{id:"🧮-買房-vs-租房-終極資產對決試算機-ultimate-rent-vs-buy-financial-simulator",tabindex:"-1"},[m("🧮 買房 vs 租房 終極資產對決試算機 "),e("br"),e("span",{style:{"font-size":"1.5rem",color:"var(--vp-c-text-2)"}},"Ultimate Rent vs. Buy Financial Simulator"),m(),e("a",{class:"header-anchor",href:"#🧮-買房-vs-租房-終極資產對決試算機-ultimate-rent-vs-buy-financial-simulator","aria-label":'Permalink to "🧮 買房 vs 租房 終極資產對決試算機 <br><span style="font-size: 1.5rem; color: var(--vp-c-text-2);">Ultimate Rent vs. Buy Financial Simulator</span>"'},"​")],-1)),n[4]||(n[4]=e("p",null,[m("華人社會總流傳著「買房是存錢，租房是幫房東繳房貸」的觀念，然而在利率走高、房價高企的時代，真的是如此嗎？本系統內建哈佛與 CNN 等級的 "),e("strong",null,"現值貼現與機會成本模型"),m("，深度拆解房貸利息、持有稅費、維護折舊與"),e("strong",null,"股市投資機會成本"),m("，為您揭秘最符合財務邏輯的真實贏家！")],-1)),n[5]||(n[5]=e("hr",null,null,-1)),e("div",yn,[e("div",hn,[e("button",{class:w(["language-toggle-btn",{active:c.value==="bilingual"}]),onClick:n[0]||(n[0]=r=>c.value="bilingual")},"中英對照",2),e("button",{class:w(["language-toggle-btn",{active:c.value==="zh"}]),onClick:n[1]||(n[1]=r=>c.value="zh")},"純中文",2),e("button",{class:w(["language-toggle-btn",{active:c.value==="en"}]),onClick:n[2]||(n[2]=r=>c.value="en")},"純英文",2)])]),gn(u,null,{default:bn(()=>[e("div",fn,[e("div",xn,[e("pre",null,[e("code",null,`<!-- SECTION A: Comparison Settings -->
<div class="input-card">
  <h3 class="section-title border-gold">
    <span v-if="displayMode !== 'en'">⏰ 時間跨度</span>
    <span v-if="displayMode !== 'zh'" class="en-sub">Comparison Timeline</span>
  </h3>
  <div class="input-group">
    <div class="input-header">
      <label>預計居住年數 (Years to Stay):</label>
      <span class="value-badge highlight">`+a(i.value)+` 年</span>
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
        <span class="value-badge highlight">`+a(y.value)+` %</span>
      </div>
      <input type="range" v-model="investmentReturn" min="-2" max="15" step="0.5" class="calc-slider" />
    </div>
  </div>
</div>
`,1)])]),e("div",Cn,[e("pre",null,[e("code",null,`<!-- Verdict Section -->
<div class="verdict-hero" :class="{ 'buy-wins': engine.winner === 'buy', 'rent-wins': engine.winner === 'rent' }">
  <div class="verdict-icon">
    `+a(t.value.winner==="buy"?"🏠":"💸")+`
  </div>
  <div class="verdict-text">
    <h3 class="verdict-title">
      <span v-if="displayMode !== 'en'">
        `+a(t.value.winner==="buy"?"決策：買房更具財務優勢！":"決策：租屋更具財務優勢！")+`
      </span>
      <span v-if="displayMode !== 'zh'" class="en-sub-title">
        `+a(t.value.winner==="buy"?"Decision: Buying is more advantageous!":"Decision: Renting is more advantageous!")+`
      </span>
    </h3>
    <p class="verdict-desc">
      <span v-if="displayMode !== 'en'">在 `+a(i.value)+" 年的跨度下，"+a(t.value.winner==="buy"?"買房":"租屋")+` 預計能為您 **省下/多賺約** </span>
      <span v-if="displayMode !== 'zh'" class="en-sub-desc">Over a `+a(i.value)+" year horizon, "+a(t.value.winner==="buy"?"buying":"renting")+` will save/generate approx </span>
      <strong class="win-amount">`+a(o(t.value.difference))+`</strong>！
    </p>
  </div>
</div>

<!-- Quick Stat Grid -->
<div class="stat-summary-grid">
  <div class="stat-box">
    <span class="label">🏠 買房總真實成本 (Net Buy Cost)</span>
    <span class="value">`+a(o(t.value.finalBuyCost))+`</span>
    <span class="mini-tip">利息+稅費+機會成本 - 房價增幅</span>
  </div>
  <div class="stat-box">
    <span class="label">💸 租房總真實成本 (Net Rent Cost)</span>
    <span class="value">`+a(o(t.value.finalRentCost))+`</span>
    <span class="mini-tip">單純累積租金總流出</span>
  </div>
</div>

<!-- Break Even Fact -->
<div class="breakeven-banner" v-if="breakEvenYear !== 'N/A' && breakEvenYear <= compareYears">
  💡 <strong>黃金平衡點 (Break-even Point):</strong> 約在第 <strong class="b-badge">`+a(Q.value)+`</strong> 年。在這一年之後，買房累積的資產增值開始大於租屋投資組合！
</div>
<div class="breakeven-banner negative" v-else>
  💡 <strong>黃金平衡點:</strong> 在 `+a(i.value)+` 年內無黃金交叉。這意味著在此參數組合下，租屋始終是成本更低的選項。
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
    <svg :viewBox="\`0 0 \${svgW} \${svgH}\`" width="100%" height="100%" preserveAspectRatio="none">
      
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
    <div class="chart-year-label end">第 `+a(i.value)+` 年</div>
  </div>
</div>

<!-- Analysis Details breakdown -->
<details class="breakdown-details">
  <summary>📄 查看 `+a(i.value)+` 年後精算細節清單 (Analytical Details)</summary>
  <div class="details-content">
    <table class="details-table">
      <tbody>
        <tr class="cat-row-header"><td colspan="2">🏠 買房終局資產狀態 (Home Asset End State)</td></tr>
        <tr>
          <td>未來房價估值 (Appreciated Value)</td>
          <td class="val-cell">`+a(o(t.value.finalHomeValue))+`</td>
        </tr>
        <tr>
          <td>剩餘貸款本金 (Loan Principal Left)</td>
          <td class="val-cell danger">`+a(o(t.value.remainingLoan))+`</td>
        </tr>
        <tr>
          <td>期初購屋交易稅費 (Upfront Closing Fees)</td>
          <td class="val-cell danger">`+a(o(t.value.closingAmt))+`</td>
        </tr>
        
        <tr class="cat-row-header"><td colspan="2">💡 機會成本考量 (Hidden Sunk Costs)</td></tr>
        <tr>
          <td>頭期款+稅費的股市機會成本 (Opp. Cost)</td>
          <td class="val-cell">`+a(o((M.value*(B.value/100)+t.value.closingAmt)*(Math.pow(1+y.value/100,i.value)-1)))+`</td>
        </tr>
      </tbody>
    </table>
  </div>
</details>
`,1)])])])]),_:1})])}}}),Tn=un(Rn,[["__scopeId","data-v-cbbba350"]]);export{Fn as __pageData,Tn as default};
