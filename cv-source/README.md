# CV (резюме) бастапқы файлы

`cv.html` — резюменің мәтіні мен дизайны, `photo-crop.png` — фото.
Мәтінді `cv.html` ішінде өзгертіп, PDF-ті қайта жасаңыз:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --print-to-pdf="../assets/cv/Yermekov_Yerassyl_CV.pdf" "file:///$(pwd -W)/cv.html"
```

Қаріп: Windows-тағы Segoe UI (PDF-ке TrueType болып енеді, HR жүйелері мәтінді дұрыс оқиды).
Резюме бір беттен аспауы керек: өзгерткен соң PDF-ті ашып тексеріңіз.

Ағылшынша нұсқа: `cv-en.html` → `../assets/cv/Yermekov_Yerassyl_CV_EN.pdf` (сайттың EN тілінде жүктеледі). Сол команда, тек файл аттарын ауыстырыңыз. Chrome кейде салыстырмалы жолды таппайды, онда толық жол беріңіз.
