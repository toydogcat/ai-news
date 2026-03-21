# 🤖 AI News 自動化更新指南

這份指南描述了如何讓 AI 自動化地管理 AI News 站點的內容更新流程。基於 `GUIDE_update.md` 的專案架構和 `follow_list.md` 的新聞來源列表，我們實現一個完整的自動化新聞聚合、分類、重複檢查、舊新聞清理和發布流程。

---

## 🎯 整體目標

- **新聞獲取**：從 `follow_list.md` 的來源中獲取最近一週（7天內）的新聞。
- **分析與分類**：根據新聞內容自動分類到側邊欄的四大類別。
- **重複檢查**：避免重複新聞。
- **更新消息**：將新聞添加到 `news/` 資料夾的 Markdown 文件中，每篇文章記錄日期。
- **清理舊新聞**：刪除超過1年的新聞文件。
- **自動發布**：提交更改並推送，commit 消息與日期相關。

---

## 📋 詳細流程

### 1. 新聞獲取 (News Fetching)

**來源**：使用 `follow_list.md` 中的 RSS 和鏈接。
- **RSS 來源**：Hugging Face Blog, arXiv.org, Google Research Blog, TechCrunch AI。
- **鏈接來源**：VentureBeat AI, The Batch, GitHub Trending, SemiAnalysis。

**工具**：
- 使用 Python 的 `feedparser` 庫解析 RSS。
- 使用 `requests` 和 `BeautifulSoup` 抓取鏈接頁面，提取最近新聞。
- 過濾最近7天的新聞（基於發布日期）。

**實現**：
```python
import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

# 範例：解析 RSS
feed = feedparser.parse('https://huggingface.co/blog/feed.xml')
recent_news = [entry for entry in feed.entries if (datetime.now() - entry.published_parsed) < timedelta(days=7)]
```

### 2. 分析與分類 (Analysis & Categorization)

**分類映射**：
- **技術前沿**：Hugging Face, arXiv, Google Research → 技術論文、模型更新。
- **軟體工具**：VentureBeat, The Batch, GitHub Trending → 開發工具、新聞摘要。
- **硬體產業**：SemiAnalysis, TechCrunch AI → 晶片、供應鏈、投資。
- **市場趨勢**：跨來源的產業新聞 → 大廠動向、法規、地緣政治。

**工具**：
- 使用 AI（如 OpenAI GPT）分析新聞標題和摘要，決定分類。
- 關鍵詞匹配：LLM、RAG → 技術前沿；晶片、NVIDIA → 硬體產業。

**實現**：
```python
def categorize_news(title, summary):
    # 使用 AI 或規則分類
    if 'LLM' in title or 'model' in summary:
        return '技術前沿'
    # ... 其他規則
```

### 3. 重複檢查 (Duplicate Check)

**方法**：
- 掃描 `news/` 資料夾中的所有 `.md` 文件。
- 比較新聞標題或關鍵摘要，檢查相似度（使用 difflib 或 embeddings）。
- 如果重複，跳過或合併。

**實現**：
```python
import os
from difflib import SequenceMatcher

existing_titles = [f for f in os.listdir('news/') if f.endswith('.md')]
for news in recent_news:
    if any(SequenceMatcher(None, news.title, title).ratio() > 0.8 for title in existing_titles):
        continue  # 重複，跳過
```

### 4. 更新消息 (Update News)

**格式**：
- 在 `news/` 資料夾中創建或更新 `.md` 文件。
- 每篇文章使用 YAML frontmatter 記錄日期：
  ```markdown
  ---
  title: 新聞標題
  date: 2026-03-21
  category: 技術前沿
  ---
  # 新聞內容
  ```
- 根據分類，添加到對應文件或新文件。

**實現**：
```python
def create_news_file(title, content, category, date):
    filename = f"news/{date.strftime('%Y-%m-%d')}-{title.replace(' ', '-').lower()}.md"
    with open(filename, 'w') as f:
        f.write(f"""---
title: {title}
date: {date.strftime('%Y-%m-%d')}
category: {category}
---
{content}
""")
```

### 5. 刪除舊新聞 (Clean Old News)

**規則**：刪除超過1年的新聞文件（基於文件名或 frontmatter 的 date）。
- 掃描 `news/` 資料夾。
- 檢查日期，如果 >365 天，刪除。

**實現**：
```python
from datetime import datetime

for file in os.listdir('news/'):
    if file.endswith('.md'):
        # 從文件名或內容提取日期
        date_str = file.split('-')[0]  # 假設格式 YYYY-MM-DD-title.md
        news_date = datetime.strptime(date_str, '%Y-%m-%d')
        if (datetime.now() - news_date).days > 365:
            os.remove(f'news/{file}')
```

### 6. 自動發布 (Auto Publish)

**步驟**：
- 運行 `npm run docs:build` 確保無錯誤。
- Git 操作：`git add .`, `git commit -m "feat: update AI news for YYYY-MM-DD"`, `git push origin main`。

**Commit 消息格式**：
- `feat: update AI news for 2026-03-21`（包含當前日期）。
- 或 `chore: clean old news and add weekly updates for 2026-03-21`。

**實現**：
```bash
git add .
git commit -m "feat: update AI news for $(date +%Y-%m-%d)"
git push origin main
```

---

## 🛠️ 實現建議

- **腳本化**：將以上邏輯寫成 Python 腳本 `update_news.py`，定期運行（e.g., 每週 cron job）。
- **依賴**：安裝 `feedparser`, `requests`, `beautifulsoup4`, `openai`（如果使用 AI 分類）。
- **測試**：在本地運行 `npm run docs:dev` 預覽更新。
- **安全**：確保 API 金鑰安全，避免過度請求來源網站。

這個流程可以完全自動化，讓 AI News 站點保持最新和整潔。
