import glob
import re
from pathlib import Path

files = glob.glob('*.html') + glob.glob('*.css') + glob.glob('*.js')
urls = set()
for path in files:
    text = Path(path).read_text(encoding='utf-8', errors='ignore')
    for m in re.findall(r"['\"]((?:\.\./)?(?:ui|sprites|favicon)[^'\"]+)['\"]", text):
        if '${' in m or '(' in m and ')' in m:
            continue
        urls.add(m)
for u in sorted(urls):
    print(u)
