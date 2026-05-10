import requests
from PIL import Image
from io import BytesIO
import os

IMG_MAP = {
    "hero.webp": "https://media.cnn.com/api/v1/images/stellar/prod/cnn-travel-uk-chinese-take-away-food-group-opener.jpg?c=original&q=w_1200,c_fill",
    "curry_chips.webp": "https://media.cnn.com/api/v1/images/stellar/prod/cnn-travel-uk-chinese-take-away-food-shot-2-040.jpg?c=original&q=w_800,c_fill",
    "takeout_box.webp": "https://media.cnn.com/api/v1/images/stellar/prod/cnn-travel-uk-chinese-take-away-food-shot-3-045.jpg?c=original&q=w_800,c_fill",
    "lily_kwok_history.webp": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-511040240.jpg?c=original&q=w_800,c_fill"
}

OUT_DIR = "/home/toymsi/documents/projects/Github/ai-news/.vitepress/public/british-chinese-takeout-uk-american-differences"

for filename, url in IMG_MAP.items():
    try:
        print(f"Downloading {url} ...")
        response = requests.get(url, timeout=30)
        img = Image.open(BytesIO(response.content))
        
        # Convert RGBA to RGB if necessary before saving as WebP
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        dest_path = os.path.join(OUT_DIR, filename)
        img.save(dest_path, "WEBP", quality=80)
        print(f"Successfully saved to {dest_path}")
    except Exception as e:
        print(f"Error downloading/saving {filename}: {e}")

print("Done processing images.")
