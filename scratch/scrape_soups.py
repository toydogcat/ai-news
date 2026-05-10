from bs4 import BeautifulSoup
import json
import re

with open('cnn_raw.html', 'r', encoding='utf-8') as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# Find the section or script containing items. Usually in articles it's either listed in H2s followed by text or in a script tag json.
# Let's try searching for the json data first, it's more reliable if present.
data = {}
scripts = soup.find_all('script')
for s in scripts:
    if s.string and '"image":' in s.string and '"headline":' in s.string:
        print("Found potential JSON LD!")
    if s.string and ('window.CNN_INITIAL_STATE' in s.string or 'window.__INITIAL_STATE__' in s.string):
        # Actually let's just scrape the HTML structure.
        pass

results = []

# Method: Look for list items or subheadings.
# The user wants to grab ALL soup descriptions and images.
# Based on previous read_url_content output, they are denoted by `## Soup | Country` in markdown, which corresponds to <h2> or <h3> in HTML.
headers = soup.find_all(['h2', 'h3'])
for header in headers:
    text = header.get_text().strip()
    if '|' in text:
        parts = text.split('|')
        name = parts[0].strip()
        country = parts[1].strip()
        
        # Look for subsequent element for description and image.
        desc = ""
        img_url = ""
        
        # We search forward through next siblings.
        curr = header.next_sibling
        while curr:
            if getattr(curr, 'name', None) in ['h2', 'h3']:
                break # next item
            
            # Check for images inside divs or directly
            if not img_url:
                if hasattr(curr, 'find_all'):
                    all_imgs = curr.find_all('img')
                    for i in all_imgs:
                        src = i.get('src') or i.get('data-src') or i.get('srcset')
                        if src and 'http' in src:
                            img_url = src.split('?')[0]
                            break
            
            if hasattr(curr, 'get_text'):
                p_text = curr.get_text().strip()
                if p_text and not any(w in p_text.lower() for w in ["related article", "read more", "email"]):
                    if len(p_text) > 20: # avoid short garbage
                        desc += p_text + "\n"
            
            curr = curr.next_sibling
        
        results.append({
            "name": name,
            "country": country,
            "description": desc.strip(),
            "img": img_url
        })

# Let's also inspect the images again if current scraping failed.
# Sometimes image might be *above* the header in CNN's React rendering.
# Let's output what we have so far to a json file to verify.
with open('parsed_soups.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Scraped {len(results)} items.")
