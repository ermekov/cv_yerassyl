# Ерасыл Ермеков: CV / портфолио сайты

Статикалық сайт (HTML + CSS + JavaScript). Framework, npm, build қажет емес.
Тілдер: RU / KZ / EN. Жобалар мен сертификаттар карточка (терезе) болып ашылады.
Байланыс формасы Google Sheets-ке жазады.

## 1. Жергілікті ашу

`index.html` файлын екі рет басып ашыңыз.
Немесе терминалда: `python3 -m http.server 8000` → http://localhost:8000

## 2. Файл құрылымы

```
index.html                     беттің құрылымы
assets/
  css/style.css                дизайн (түстер жоғарғы :root ішінде)
  js/config.js                 баптаулар: Google Sheets сілтемесі, CV файлдары
  js/i18n.js                   RU / KZ / EN мәтіндері
  js/projects.js               жобалардың толық сипаттамасы (терезе)
  js/certs.js                  сертификаттар тізімі
  js/main.js                   барлық логика
  img/hero.webp                басты беттегі фото (фоны жоқ)
  img/about.jpg                "Обо мне" бөліміндегі фото
  img/og.png                   сілтеме превьюі (Telegram, LinkedIn)
  img/favicon.svg              сайт белгішесі
  img/certs/*.webp             сертификат суреттері
  projects/<жоба>/             жоба скриншоттары мен мұқабасы
  cv/Yermekov_Yerassyl_CV.pdf  резюме
google-apps-script/Code.gs     форма → Google Sheets скрипті
```

## 3. Фото мен суреттерді қайда салу керек

| Не | Қайда | Ескертпе |
|---|---|---|
| Басты бет фотосы | `assets/img/hero.webp` | Фоны жоқ (мөлдір) PNG/WebP. Атын өзгертпеңіз. PNG болса, `index.html`-де `hero.webp` дегенді `hero.png` деп ауыстырыңыз |
| "Обо мне" фотосы | `assets/img/about.jpg` | Тік (2:3) фото жақсы |
| Жоба мұқабасы (басты беттегі карточка) | `assets/projects/<жоба>/cover.png` | Міндетті емес. Болмаса 1-скриншот алынады, ол да болмаса иллюстрация көрінеді |
| Жоба скриншоттары | `assets/projects/<жоба>/1.png`, `2.png` ... | "Подробнее" терезесінде көрінеді. Файл болмаса бөлім өзі жасырылады |
| Резюме | `assets/cv/Yermekov_Yerassyl_CV.pdf` | Ағылшынша болса `..._EN.pdf` деп салып, `config.js`-те `en` жолын ауыстырыңыз |
| Сертификат суреттері | `assets/img/certs/<аты>.webp` | Атаулары `assets/js/certs.js` ішінде |

`<жоба>` папкалары: `peakrent-ai` (1–4), `ai-business-assistant` (1–2), `ken-tereze-ai` (1–2).
Суреттің кеңейтуі `png`, `jpg`, `jpeg` немесе `webp` бола алады, сайт өзі табады.
Ұсыныс: ені 1400–1600 px, көлемі 500 KB-тан аз, қатынасы шамамен 16:10.

## 4. Мәтінді өзгерту

- Сайттағы барлық қысқа мәтін: `assets/js/i18n.js` (үш тілде).
- Жоба сипаттамасы: `assets/js/projects.js`.
- Сертификаттар: `assets/js/certs.js` (жаңасын қосу үшін блок қосып, суретін `assets/img/certs/` ішіне салыңыз).
- Түстер: `assets/css/style.css` ішіндегі `--orange`, `--ink`.

## 5. Байланыс формасы → Google Sheets

1. Кестені ашыңыз → **Extensions → Apps Script** → `google-apps-script/Code.gs` мазмұнын қойыңыз → **Save**.
2. **Deploy → New deployment → Web app**: *Execute as: Me*, *Who has access: Anyone*.
3. `/exec` сілтемесін `assets/js/config.js` ішіндегі `SHEETS_URL`-ға қойыңыз (қазір қойылған).
4. Скриптті кейін өзгертсеңіз: **Deploy → Manage deployments → ✏️ → New version** (сілтеме өзгермейді).

Кестенің 1-жолындағы баған атаулары бойынша жазылады: `name`, `email`, `subject`, `message`, `date`, `lang`, `page`.

## 6. Жариялау (тегін)

**Vercel:** папканы GitHub-қа жүктеңіз → vercel.com → *Add New Project* → репозиторийді таңдаңыз → Framework: **Other** → Deploy.
Кейін фото не мәтін өзгерткенде: `git add . && git commit -m "update" && git push`, Vercel өзі жаңартады.

**Домен қосқаннан кейін:** `index.html` ішіндегі `og:image` жолын толық адреске ауыстырыңыз:
`<meta property="og:image" content="https://сіздің-домен/assets/img/og.png">`
Сонда Telegram/LinkedIn-де сілтеме әдемі превьюмен шығады.
