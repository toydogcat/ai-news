# 🚀 AI News 營運與更新指南

這份指南將幫助你快速管理此 VitePress 新聞站點。

---

## 🛠️ 常用指令 (Terminal)

| 指令 | 說明 |
| :--- | :--- |
| `npm run docs:dev` | **啟動本地預覽**。在瀏覽器打開 `localhost:5173` 即時看結果。 |
| `npm run docs:build` | **本地編譯測試**。確保上傳前沒有語法錯誤。 |
| `rm -rf ai-talk` | **強制刪除舊專案**。`-rf` 參數會跳過所有確認詢問。 |

---

## 📝 如何發布新文章？

### 1. 建立檔案
在專案目錄下建立 `news/` 資料夾，並新增 `.md` 檔案。例如：`news/ai-agent-2026.md`。

### 2. 撰寫內容 (Markdown)
在檔案頂部加入 YAML 區塊，這會讓文章看起來更專業：

```markdown
---
title: 2026 AI Agent 大爆發
editLink: true
outline: deep
---
```

### 3. 自動更新提示
新聞文件會自動添加到側邊欄的對應分類中。請確保文件名格式為 `YYYY-MM-DD-title.md`，並在 `.vitepress/config.mts` 中更新 sidebar 的 link 路徑為 `/news/filename`（不含 .md）。


# 自動更新
執行這三行指令，網頁就會自動更新：
git add .
git commit -m "feat: 新增 2026 AI 趨勢報導"
git push origin main


# 每日任務

這裡有每日任務 skill。

