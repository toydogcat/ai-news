import os
import re

directory = "/home/toymsi/documents/projects/Github/ai-news/calculators/"

pattern = re.compile(r'(<ClientOnly>\s*\n)(.*?)(</ClientOnly>)', re.DOTALL)

def clean_html(match):
    header = match.group(1)
    body = match.group(2)
    footer = match.group(3)
    
    lines = body.split('\n')
    new_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        new_lines.append(stripped)
        
    return header + '\n'.join(new_lines) + '\n' + footer

for filename in os.listdir(directory):
    if filename.endswith('.md'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if '<ClientOnly>' in content:
            fixed_content = pattern.sub(clean_html, content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print(f"Cleaned: {filename}")
        else:
            print(f"Skipped: {filename} (No <ClientOnly>)")
