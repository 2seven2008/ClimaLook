# ClimaLook — PWA de Clima + Look do Dia

## O que é

Um Progressive Web App (PWA) que:

- Detecta sua localização automaticamente
- Busca o clima em tempo real via Open-Meteo API (gratuita, sem chave)
- Sugere roupas baseadas na temperatura e chance de chuva
- Direciona para as principais lojas: Shopee, Mercado Livre, Zara, C&A, Renner, Dafiti
- Pode ser instalado na tela inicial do celular (PWA)

## Arquivos

- `index.html` — App completo (HTML + CSS + JS)
- `manifest.json` — Configuração do PWA
- `sw.js` — Service Worker para funcionamento offline

## Como hospedar

Qualquer servidor estático funciona:

### Opção 1 — Vercel (recomendado, grátis)

```bash
npx vercel --prod
```

### Opção 2 — Netlify (grátis)

Arraste a pasta para https://app.netlify.com/drop

### Opção 3 — GitHub Pages (grátis)

1. Crie um repositório público
2. Suba os arquivos
3. Ative Pages em Settings > Pages

### Opção 4 — Servidor local (desenvolvimento)

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Ícones PWA

Os arquivos `icon-192.png` e `icon-512.png` precisam ser criados.
Use https://favicon.io ou qualquer editor para gerar ícones quadrados.

## APIs usadas

- **Open-Meteo** (clima): https://open-meteo.com — 100% gratuita, sem chave
- **Nominatim/OpenStreetMap** (geocodificação reversa): gratuita

## Lógica de vestuário

| Temperatura | Sugestão               |
| ----------- | ---------------------- |
| < 15°C      | Casaco, cachecol, bota |
| 15–22°C     | Camisa + jaqueta leve  |
| 22–28°C     | Casual confortável     |
| > 28°C      | Roupas leves de verão  |

Chuva (> 40% probabilidade) sempre adiciona guarda-chuva à lista.
