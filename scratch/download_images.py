import json
import os
import requests
from PIL import Image
from io import BytesIO

IMAGE_DIR = ".vitepress/public/best-soups-world-wellness"
os.makedirs(IMAGE_DIR, exist_ok=True)

with open('parsed_soups.json', 'r', encoding='utf-8') as f:
    soups = json.load(f)

slugify = lambda s: "".join(c if c.isalnum() else "_" for c in s.lower()).replace("__", "_").strip("_")

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

for idx, soup in enumerate(soups):
    name = soup['name']
    url = soup['img']
    slug = slugify(name)
    
    if not url:
        print(f"Skipping {name}, no URL found.")
        continue
    
    output_path = os.path.join(IMAGE_DIR, f"{slug}.webp")
    
    print(f"Downloading [{idx+1}/20] {name}...")
    try:
        r = requests.get(url, headers=headers, timeout=15)
        r.raise_for_status()
        
        img = Image.open(BytesIO(r.content))
        img = img.convert('RGB') # in case of rgba
        img.save(output_path, "WEBP", quality=80)
        print(f"Saved to {output_path}")
        
        # Update the json reference to the local path for later templating
        soup['local_img'] = f"/ai-news/best-soups-world-wellness/{slug}.webp"
        
    except Exception as e:
        print(f"Failed to download/save {name}: {e}")

# Also find the main hero image if available. Looking back at my scraped raw html output grep, I don't have a designated hero explicitly.
# Let's just grab the first one or try to grep for the actual hero in the raw html.

with open('parsed_soups_updated.json', 'w', encoding='utf-8') as f:
    json.dump(soups, f, ensure_ascii=False, indent=2)

print("Done saving images.")
