# CV (резюме) бастапқы файлы

`cv.html` — резюменің мәтіні мен дизайны, `photo-crop.png` — фото.
Мәтінді `cv.html` ішінде өзгертіп, PDF-ті қайта жасаңыз:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --print-to-pdf="../assets/cv/Yermekov_Yerassyl_CV.pdf" "file:///$(pwd -W)/cv.html"
```

Қаріп: Windows-тағы Segoe UI (PDF-ке TrueType болып енеді, HR жүйелері мәтінді дұрыс оқиды).
Резюме бір беттен аспауы керек: өзгерткен соң PDF-ті ашып тексеріңіз.
