from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8', errors='ignore')
text = re.sub(r'<meta[^>]*http-equiv="origin-trial"[^>]*>', '', text, flags=re.IGNORECASE)
text = re.sub(r'<script[^>]*src="https://fundingchoicesmessages\.google\.com[^>]*></script>', '', text, flags=re.IGNORECASE)
text = re.sub(r'<ins[^>]*class="adsbygoogle[^"]*"[^>]*>.*?</ins>', '', text, flags=re.DOTALL | re.IGNORECASE)
text = re.sub(r'<iframe[^>]*name="googlefc[^"]*"[^>]*></iframe>', '', text, flags=re.IGNORECASE)
text = text.replace('<head>\n\n', '<head>\n')
path.write_text(text, encoding='utf-8')
print('Cleaned index.html')
