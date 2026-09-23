/* Жобалардың толық мәліметі (View more терезесі үшін). RU / KZ / EN.
   Скриншоттар: assets/projects/<slug>/1.png, 2.png ... (png / jpg / jpeg / webp, кеңейтуі автоматты табылады). */
window.PROJECTS = {

/* ------------------------------------------------------------------ */
"peakrent-ai": {
  num: "01", years: "2025–2026", done: true,
  gradient: "linear-gradient(135deg,#3b3b3b,#7a5a2a)",
  title: "MountainRent AI — PeakRent.kz",
  gh: "https://github.com/ermekov/Mountain_equipment_rental",
  url: "https://cvyermekov.vercel.app/ru/projects/peakrent-ai",
  files: ["1", "2", "3", "4"],
  ru: {
    kicker: "Дипломный проект · AI · Full-Stack",
    lead: "AI-платформа аренды горного снаряжения — дипломный проект, реализованный от начала до конца.",
    meta: [["Роль", "Один разработчик — backend, frontend, архитектура"], ["Формат", "Дипломный проект"], ["Сервисы", "API · Web · Worker"]],
    problem: "Аренда горного снаряжения обычно сводится к переписке напрямую с прокатом — без структурированного способа сравнить оборудование, проверить наличие или получить подсказку под конкретный маршрут. Единой платформы с каталогом, бронированием и хоть каким-то интеллектуальным подбором не существовало.",
    solution: "Backend на Django REST Framework и frontend на Next.js — каталог, бронирование и рекомендательная логика вынесены в отдельные сервисы. Рекомендации сначала фильтруются по правилам (тип маршрута, даты, история бронирований), а затем уточняются запросом к OpenAI, который работает уже с отфильтрованной выборкой — поэтому AI принимает решения на небольшом релевантном срезе каталога, а не гадает по всей базе. Авторизация — OTP и JWT, админ- и менеджер-панель дают аналитику и экспорт в CSV.",
    arch: [
      ["API-слой", "Django REST Framework отдаёт версионированные эндпоинты для каталога, бронирований, отзывов и рекомендаций, которые потребляет отдельный Next.js frontend через типизированный Axios-клиент."],
      ["Пайплайн рекомендаций", "Rule-based предфильтрация сужает список кандидатов по типу маршрута, датам и истории, а затем запрос к OpenAI ранжирует и объясняет получившийся шортлист — это удерживает стоимость и задержку под контролем."],
      ["Фоновые задачи", "Celery-воркеры с Redis в качестве брокера обрабатывают асинхронные задачи — пересчёт доступности и рассылку уведомлений — вне цикла запрос/ответ."],
      ["Деплой", "Gunicorn за Nginx, всё контейнеризировано в Docker, Postgres — основной источник данных для каталога, бронирований и пользователей."]
    ],
    features: [
      "Каталог снаряжения с фильтрами и детальными карточками товаров",
      "Бронирование с проверкой доступности по датам",
      "Гибридные AI-рекомендации (rule-based фильтры + логика OpenAI)",
      "Аутентификация через OTP и JWT",
      "Отзывы и рейтинги для каждого объявления",
      "Админ- и менеджер-панели с аналитикой и экспортом в CSV",
      "Демо-оплата через Kaspi QR",
      "Интеграция с погодным сервисом для планирования поездки"
    ],
    stack: [
      ["Backend", "Python / Django / Django REST Framework / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API / Rule-based filtering / Hybrid recommendation logic"],
      ["Инфраструктура", "Docker / Redis / Celery / Nginx / Gunicorn"]
    ],
    challenge: "Сложнее всего было сделать AI-рекомендации полезными, не превратив их в чёрный ящик — пришлось ограничить, что именно модель видит и решает, чтобы результат оставался объяснимым и достаточно быстрым для флоу бронирования, а не для чат-сценария.",
    learned: "Как проектировать AI-функцию как ограниченный этап пайплайна, а не как универсального чат-бота, приклеенного к интерфейсу — и насколько «умная» фича на самом деле держится на дисциплинированной подготовке данных ещё до того, как в дело вступает модель."
  },
  kk: {
    kicker: "Дипломдық жоба · AI · Full-Stack",
    lead: "Тау жабдықтарын жалға беретін AI-платформа: басынан аяғына дейін жасалған дипломдық жоба.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend, frontend, архитектура"], ["Форматы", "Дипломдық жоба"], ["Сервистер", "API · Web · Worker"]],
    problem: "Тау жабдықтарын жалға алу әдетте жалға беру пунктімен тікелей жазысуға саяды: жабдықты салыстырудың, бар-жоғын тексерудің немесе нақты маршрутқа лайық жабдықты таңдаудың құрылымдалған жолы жоқ. Каталогы, брондауы және кем дегенде қандай да бір ақылды таңдауы бар бірыңғай платформа болмаған.",
    solution: "Django REST Framework-тегі backend және Next.js-тегі frontend: каталог, брондау және ұсыным логикасы бөлек сервистерге бөлінген. Ұсынымдар алдымен ережелер бойынша сүзгіден өтеді (маршрут түрі, күндер, брондау тарихы), содан кейін OpenAI сұранысы арқылы нақтыланады. Ол тек сүзілген таңдаумен жұмыс істейді, сондықтан AI бүкіл дерекқорды болжамай, каталогтың шағын әрі өзекті бөлігінде шешім қабылдайды. Авторизация OTP және JWT арқылы жүреді, админ және менеджер панельдері аналитика мен CSV экспортын береді.",
    arch: [
      ["API қабаты", "Django REST Framework каталог, брондау, пікірлер және ұсынымдар үшін нұсқаланған эндпоинттерді ұсынады. Оларды бөлек Next.js frontend типтелген Axios-клиент арқылы пайдаланады."],
      ["Ұсыным пайплайны", "Ережеге негізделген алдын ала сүзгі үміткерлерді маршрут түрі, күндер және тарих бойынша қысқартады, содан кейін OpenAI сұранысы шыққан шағын тізімді саралап, түсіндіреді. Бұл шығын мен кідірісті бақылауда ұстайды."],
      ["Фондық тапсырмалар", "Redis брокері бар Celery-воркерлер қолжетімділікті қайта есептеу және хабарландыру жіберу сияқты асинхронды тапсырмаларды сұраныс/жауап циклінен тыс орындайды."],
      ["Деплой", "Gunicorn Nginx артында, бәрі Docker-ге салынған. Postgres каталог, брондау және пайдаланушылар үшін негізгі дерек көзі."]
    ],
    features: [
      "Сүзгілері мен толық карточкалары бар жабдық каталогы",
      "Күндер бойынша қолжетімділікті тексеретін брондау",
      "Гибридті AI-ұсынымдар (ережеге негізделген сүзгілер + OpenAI логикасы)",
      "OTP және JWT арқылы аутентификация",
      "Әр хабарландыруға пікірлер мен рейтингтер",
      "Аналитикасы мен CSV экспорты бар админ және менеджер панельдері",
      "Kaspi QR арқылы демо-төлем",
      "Сапарды жоспарлауға арналған ауа райы сервисімен интеграция"
    ],
    stack: [
      ["Backend", "Python / Django / Django REST Framework / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API / Rule-based filtering / Hybrid recommendation logic"],
      ["Инфрақұрылым", "Docker / Redis / Celery / Nginx / Gunicorn"]
    ],
    challenge: "Ең қиыны AI-ұсынымдарды «қара жәшікке» айналдырмай, пайдалы ету болды. Нәтиже түсіндірілетін және чат емес, брондау процесіне жететіндей жылдам болуы үшін модель нені көретінін және нені шешетінін шектеуге тура келді.",
    learned: "AI-функцияны интерфейске жабыстырылған әмбебап чат-бот емес, пайплайндағы шектеулі қадам ретінде жобалауды үйрендім. Сондай-ақ «ақылды» функцияның шын мәнінде модель жұмысқа кіріспес бұрын деректерді тәртіппен дайындауға қаншалықты тәуелді екенін түсіндім."
  },
  en: {
    kicker: "Graduation project · AI · Full-Stack",
    lead: "An AI platform for renting mountain equipment: a graduation project built end to end.",
    meta: [["Role", "Solo developer: backend, frontend, architecture"], ["Format", "Graduation project"], ["Services", "API · Web · Worker"]],
    problem: "Renting mountain gear usually comes down to messaging a rental shop directly, with no structured way to compare equipment, check availability or get a suggestion for a specific route. There was no single platform with a catalog, booking and at least some intelligent selection.",
    solution: "A Django REST Framework backend and a Next.js frontend, with the catalog, booking and recommendation logic split into separate services. Recommendations are first filtered by rules (route type, dates, booking history) and then refined by an OpenAI request that works only with the filtered shortlist, so the AI decides on a small relevant slice of the catalog instead of guessing across the whole database. Authentication uses OTP and JWT, and the admin and manager panels provide analytics and CSV export.",
    arch: [
      ["API layer", "Django REST Framework serves versioned endpoints for the catalog, bookings, reviews and recommendations, consumed by a separate Next.js frontend through a typed Axios client."],
      ["Recommendation pipeline", "Rule-based prefiltering narrows the candidates by route type, dates and history, then an OpenAI request ranks and explains the resulting shortlist, which keeps cost and latency under control."],
      ["Background jobs", "Celery workers with Redis as the broker handle asynchronous tasks, such as recalculating availability and sending notifications, outside the request/response cycle."],
      ["Deployment", "Gunicorn behind Nginx, everything containerized in Docker, with Postgres as the primary source of truth for the catalog, bookings and users."]
    ],
    features: [
      "Equipment catalog with filters and detailed product cards",
      "Booking with date-based availability checks",
      "Hybrid AI recommendations (rule-based filters + OpenAI logic)",
      "OTP and JWT authentication",
      "Reviews and ratings for every listing",
      "Admin and manager panels with analytics and CSV export",
      "Demo payment via Kaspi QR",
      "Weather service integration for trip planning"
    ],
    stack: [
      ["Backend", "Python / Django / Django REST Framework / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API / Rule-based filtering / Hybrid recommendation logic"],
      ["Infrastructure", "Docker / Redis / Celery / Nginx / Gunicorn"]
    ],
    challenge: "The hardest part was making AI recommendations useful without turning them into a black box. I had to limit what exactly the model sees and decides, so the result stays explainable and fast enough for a booking flow rather than a chat scenario.",
    learned: "How to design an AI feature as a bounded step in a pipeline rather than a general-purpose chatbot bolted onto the UI, and how much a “smart” feature really depends on disciplined data preparation before the model even gets involved."
  }
},

/* ------------------------------------------------------------------ */
"ai-business-assistant": {
  num: "02", years: "2026", done: false,
  gradient: "linear-gradient(135deg,#333,#3a5a6a)",
  title: "AI Business Assistant",
  gh: "",
  url: "https://cvyermekov.vercel.app/ru/projects/ai-business-assistant",
  files: ["1", "2"],
  ru: {
    title: "AI-ассистент для бизнеса",
    kicker: "AI Engineering · Автоматизация · Интеграции",
    lead: "AI-ассистент, который ведёт бизнес-процессы в Telegram, WhatsApp и Instagram.",
    meta: [["Роль", "Один разработчик — backend и интеграции"], ["Каналы", "Telegram · WhatsApp · Instagram"], ["Слой данных", "PostgreSQL · Google Sheets"]],
    problem: "Малый бизнес, который ведёт процессы вручную через мессенджеры, теряет время на повторяющиеся структурированные задачи — приём заказов, фиксацию заявок, синхронизацию данных — которые не обязательно каждый раз делать руками.",
    solution: "Backend-логику я реализовал на Python и интегрировал с API Telegram, WhatsApp и Instagram, чтобы все каналы вели в один и тот же workflow-движок. Ассистент собирает и структурирует входящие запросы, при необходимости обращается к внешним сервисам и записывает результат в PostgreSQL и Google Sheets — так у бизнеса всегда есть актуальные, доступные для анализа данные. Сама логика бота построена вокруг реальных бизнес-процессов, а не общих вопросов-ответов.",
    arch: [
      ["Приём из нескольких каналов", "Telegram, WhatsApp и Instagram ведут в один и тот же Python backend, поэтому логика workflow пишется один раз и переиспользуется для всех каналов, а не дублируется под каждую платформу."],
      ["Логика workflow", "Входящие сообщения разбираются в структурированные запросы и направляются по бизнес-специфичной логике — именно это делает систему ассистентом, а не сценарным FAQ-ботом."],
      ["Внешние интеграции", "Backend обращается к внешним API и сервисам по мере необходимости в рамках каждого workflow, а не держит всю логику изолированно внутри себя."],
      ["Слой данных", "Структурированные результаты записываются в PostgreSQL как основной источник данных, а живая синхронизация с Google Sheets позволяет нетехническим сотрудникам смотреть данные без доступа к базе."]
    ],
    features: [
      "Приём сообщений сразу из Telegram, WhatsApp и Instagram",
      "Python backend, который ведёт диалог и логику workflow",
      "Интеграция с внешними API и сервисами",
      "Структурированное хранение данных в PostgreSQL",
      "Живая синхронизация с Google Sheets для нетехнических сотрудников",
      "Автоматизированные, повторяемые бизнес-процессы вместо ручной обработки"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Каналы", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Автоматизация", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "Сложнее всего было удержать единый workflow-движок под тремя разными платформами — у каждой свои особенности API и форматы сообщений — так, чтобы бизнес-логика не расползлась на три отдельные версии.",
    learned: "Понял, что в «AI-чат-боте» для бизнеса ценность почти никогда не в самом диалоге — а в workflow и передаче данных за ним. Канал — это просто точка входа."
  },
  kk: {
    title: "Бизнеске арналған AI-ассистент",
    kicker: "AI Engineering · Автоматтандыру · Интеграциялар",
    lead: "Telegram, WhatsApp және Instagram-да бизнес-процестерді жүргізетін AI-ассистент.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend және интеграциялар"], ["Арналар", "Telegram · WhatsApp · Instagram"], ["Дерек қабаты", "PostgreSQL · Google Sheets"]],
    problem: "Процестерді мессенджерлер арқылы қолмен жүргізетін шағын бизнес қайталанатын құрылымдалған тапсырмаларға (тапсырыс қабылдау, өтінімдерді тіркеу, деректерді синхрондау) уақытын жоғалтады. Ал оларды әр жолы қолмен істеудің қажеті жоқ.",
    solution: "Backend-логиканы Python-да жасап, Telegram, WhatsApp және Instagram API-ларымен біріктірдім, сонда барлық арна бір workflow-қозғалтқышқа келеді. Ассистент кіріс сұраныстарды жинап, құрылымдайды, қажет болса сыртқы сервистерге жүгінеді және нәтижені PostgreSQL мен Google Sheets-ке жазады. Осылайша бизнесте әрқашан өзекті, талдауға қолайлы деректер болады. Бот логикасы жалпы сұрақ-жауапқа емес, нақты бизнес-процестерге құрылған.",
    arch: [
      ["Көп арналы қабылдау", "Telegram, WhatsApp және Instagram бір Python backend-ке апарады, сондықтан workflow-логика бір рет жазылып, әр платформаға қайталанбай, барлық арна үшін қолданылады."],
      ["Workflow-логика", "Кіріс хабарламалар құрылымдалған сұраныстарға талданып, бизнеске тән логика бойынша бағытталады. Дәл осы оны сценарийлі FAQ-боттан гөрі ассистент етеді."],
      ["Сыртқы интеграциялар", "Backend әр workflow талап еткенде сыртқы API мен сервистерге жүгінеді, барлық логиканы өз ішінде жабық ұстамайды."],
      ["Дерек қабаты", "Құрылымдалған нәтижелер негізгі дерек көзі ретінде PostgreSQL-ге жазылады, ал Google Sheets-пен тірі синхрондау техникалық емес қызметкерлерге дерекқорға кірмей-ақ деректерді көруге мүмкіндік береді."]
    ],
    features: [
      "Telegram, WhatsApp және Instagram-нан бір мезгілде хабарлама қабылдау",
      "Диалог пен workflow-логиканы жүргізетін Python backend",
      "Сыртқы API мен сервистермен интеграция",
      "PostgreSQL-де құрылымдалған деректерді сақтау",
      "Техникалық емес қызметкерлерге арналған Google Sheets-пен тірі синхрондау",
      "Қолмен өңдеудің орнына автоматтандырылған, қайталанатын бизнес-процестер"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Арналар", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Автоматтандыру", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "Ең қиыны әрқайсысының өз API ерекшеліктері мен хабарлама форматтары бар үш түрлі платформада бір workflow-қозғалтқышты ұстап тұру болды, сонда бизнес-логика үш бөлек нұсқаға таралып кетпеді.",
    learned: "Бизнеске арналған «AI-чат-боттың» құндылығы диалогтың өзінде емес, оның артындағы workflow мен деректер беруде екенін түсіндім. Арна тек кіру нүктесі."
  },
  en: {
    title: "AI Assistant for Business",
    kicker: "AI Engineering · Automation · Integrations",
    lead: "An AI assistant that runs business processes in Telegram, WhatsApp and Instagram.",
    meta: [["Role", "Solo developer: backend and integrations"], ["Channels", "Telegram · WhatsApp · Instagram"], ["Data layer", "PostgreSQL · Google Sheets"]],
    problem: "Small businesses that run processes by hand through messengers lose time on repetitive, structured tasks such as taking orders, logging requests and syncing data, which do not have to be done manually every time.",
    solution: "I implemented the backend logic in Python and integrated it with the Telegram, WhatsApp and Instagram APIs, so all channels lead into the same workflow engine. The assistant collects and structures incoming requests, calls external services when needed and writes the result to PostgreSQL and Google Sheets, so the business always has up-to-date data that is easy to analyze. The bot logic is built around real business processes rather than generic questions and answers.",
    arch: [
      ["Multi-channel intake", "Telegram, WhatsApp and Instagram all lead into the same Python backend, so workflow logic is written once and reused for every channel instead of being duplicated per platform."],
      ["Workflow logic", "Incoming messages are parsed into structured requests and routed through business-specific logic. That is what makes it an assistant rather than a scripted FAQ bot."],
      ["External integrations", "The backend calls external APIs and services as each workflow requires, instead of keeping all logic sealed inside itself."],
      ["Data layer", "Structured results are written to PostgreSQL as the primary source of truth, while live sync with Google Sheets lets non-technical staff view the data without database access."]
    ],
    features: [
      "Receives messages from Telegram, WhatsApp and Instagram at once",
      "Python backend that drives the dialog and workflow logic",
      "Integration with external APIs and services",
      "Structured data storage in PostgreSQL",
      "Live Google Sheets sync for non-technical staff",
      "Automated, repeatable business processes instead of manual handling"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Channels", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Automation", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "The hardest part was keeping a single workflow engine running on three different platforms, each with its own API quirks and message formats, so that the business logic would not split into three separate versions.",
    learned: "In a business “AI chatbot” the value is almost never in the dialog itself but in the workflow and data handoff behind it. The channel is just an entry point."
  }
},

/* ------------------------------------------------------------------ */
"ken-tereze-ai": {
  num: "03", years: "2026", done: false,
  gradient: "linear-gradient(135deg,#3a3a3a,#5a4a7a)",
  title: "Ken Tereze AI",
  gh: "",
  url: "https://cvyermekov.vercel.app/ru/projects/ken-tereze-ai",
  files: ["1", "2"],
  ru: {
    kicker: "Python · AI · Автоматизация",
    lead: "Система автоматизации на Telegram, которая обрабатывает PDF-заказы дилеров и рассчитывает цену по внутреннему прайс-листу.",
    meta: [["Роль", "Один разработчик — backend и автоматизация"], ["Отрасль", "Производство окон и дверей"], ["Интерфейс", "Telegram"]],
    problem: "Дилеры присылают PDF-заказы, сформированные сторонним ПО для проектирования, и указанные в них цены часто расходятся с актуальным внутренним прайс-листом — каждый заказ приходится пересчитывать вручную перед подтверждением.",
    solution: "Я реализовал асинхронный сервис на FastAPI, который принимает PDF через Telegram-бота, разбирает документ и извлекает параметры заказа — размеры, количество, профиль, цвет, стекло, фурнитуру и дополнительные опции, — а затем рассчитывает цену по внутреннему прайс-листу, не полагаясь на цену из самого PDF. Результаты и история заказов хранятся в PostgreSQL.",
    arch: [
      ["Приём", "Telegram-бот принимает PDF-заказ и передаёт его в асинхронный конвейер обработки — бот остаётся отзывчивым, пока парсинг выполняется в фоне."],
      ["Парсинг", "Отдельный парсер извлекает из PDF структурированные поля — размеры, количество, профиль, цвет, тип стекла, фурнитуру и дополнительные опции."],
      ["Модуль расчёта цены", "Разобранные параметры сопоставляются с внутренним прайс-листом для расчёта итоговой цены — полностью независимо от цены, указанной в PDF."],
      ["Хранение данных", "Async SQLAlchemy 2.0 поверх PostgreSQL хранит заказы, разобранные параметры и рассчитанные цены, схему миграций ведёт Alembic."]
    ],
    features: [
      "Приём заказов через Telegram-бота",
      "Структурированный парсинг PDF — размеры, профиль, цвет, стекло, фурнитура",
      "Расчёт цены по внутреннему прайс-листу независимо от цены в исходном PDF",
      "Асинхронная обработка на FastAPI",
      "История заказов и расчётов в PostgreSQL",
      "Миграции схемы через Alembic"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Автоматизация", "Telegram Bot API / PDF parsing / Internal pricing engine"],
      ["Инфраструктура", "Docker Compose"]
    ],
    challenge: "Разметка PDF из программы проектирования не всегда одинакова, поэтому парсер должен выдерживать структурные отличия, не искажая параметры — неверный код профиля или фурнитуры меняет итоговую цену.",
    learned: "Что убрать повторяющийся ручной шаг — пересчёт цены каждого заказа вручную — часто ценнее любой чат-бот-функции, и что асинхронный Python хорошо справляется с такими I/O-зависимыми задачами."
  },
  kk: {
    kicker: "Python · AI · Автоматтандыру",
    lead: "Дилерлердің PDF-тапсырыстарын өңдеп, бағаны ішкі прайс-парақ бойынша есептейтін Telegram-жүйе.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend және автоматтандыру"], ["Сала", "Терезе мен есік өндірісі"], ["Интерфейс", "Telegram"]],
    problem: "Дилерлер үшінші тарап жобалау бағдарламасында жасалған PDF-тапсырыстар жібереді, ондағы бағалар ішкі өзекті прайс-парақтан жиі өзгеше болады. Сондықтан әр тапсырысты растау алдында қолмен қайта есептеуге тура келеді.",
    solution: "FastAPI-дағы асинхронды сервис жасадым: ол PDF-ті Telegram-бот арқылы қабылдап, құжатты талдап, тапсырыс параметрлерін (өлшемдер, саны, профиль, түс, әйнек, фурнитура және қосымша опциялар) шығарып алады. Содан кейін PDF-тегі бағаға сүйенбей, ішкі прайс-парақ бойынша бағаны есептейді. Нәтижелер мен тапсырыс тарихы PostgreSQL-де сақталады.",
    arch: [
      ["Қабылдау", "Telegram-бот PDF-тапсырысты қабылдап, асинхронды өңдеу конвейеріне береді, сондықтан талдау фонда жүріп жатқанда бот жылдам жауап беріп тұрады."],
      ["Талдау", "Бөлек парсер PDF-тен құрылымдалған өрістерді шығарады: өлшемдер, саны, профиль, түс, әйнек түрі, фурнитура және қосымша опциялар."],
      ["Баға есептеу модулі", "Талданған параметрлер ішкі прайс-парақпен салыстырылып, түпкілікті баға есептеледі. Бұл PDF-те көрсетілген бағадан толық тәуелсіз."],
      ["Деректерді сақтау", "PostgreSQL үстіндегі Async SQLAlchemy 2.0 тапсырыстарды, талданған параметрлерді және есептелген бағаларды сақтайды, миграция схемасын Alembic жүргізеді."]
    ],
    features: [
      "Telegram-бот арқылы тапсырыс қабылдау",
      "PDF-ті құрылымды талдау: өлшемдер, профиль, түс, әйнек, фурнитура",
      "Бастапқы PDF-тегі бағадан тәуелсіз, ішкі прайс-парақ бойынша баға есептеу",
      "FastAPI-да асинхронды өңдеу",
      "Тапсырыстар мен есептеулер тарихы PostgreSQL-де",
      "Alembic арқылы схема миграциялары"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Автоматтандыру", "Telegram Bot API / PDF parsing / Internal pricing engine"],
      ["Инфрақұрылым", "Docker Compose"]
    ],
    challenge: "Жобалау бағдарламасының PDF-тері әрдайым бірдей болмайды, сондықтан парсер параметрлерді бұрмаламай, құрылымдағы айырмашылықтарға төтеп бере білуі керек. Профиль немесе фурнитура кодының қате болуы түпкілікті бағаны өзгертеді.",
    learned: "Қайталанатын қолмен істелетін қадамды, яғни әр тапсырыстың бағасын қолмен қайта есептеуді жою көбіне кез келген чат-бот функциясынан құнды екенін және асинхронды Python мұндай I/O-ға тәуелді тапсырмаларды жақсы атқаратынын түсіндім."
  },
  en: {
    kicker: "Python · AI · Automation",
    lead: "A Telegram-based automation system that processes dealers' PDF orders and calculates the price from the internal price list.",
    meta: [["Role", "Solo developer: backend and automation"], ["Industry", "Window and door manufacturing"], ["Interface", "Telegram"]],
    problem: "Dealers send PDF orders generated by third-party design software, and the prices stated in them often differ from the current internal price list, so every order has to be recalculated manually before it is confirmed.",
    solution: "I built an asynchronous FastAPI service that receives the PDF through a Telegram bot, parses the document and extracts the order parameters (dimensions, quantity, profile, color, glass, hardware and extra options), then calculates the price from the internal price list without relying on the price in the PDF itself. Results and order history are stored in PostgreSQL.",
    arch: [
      ["Intake", "The Telegram bot receives the PDF order and hands it to an asynchronous processing pipeline, so the bot stays responsive while parsing runs in the background."],
      ["Parsing", "A dedicated parser extracts structured fields from the PDF: dimensions, quantity, profile, color, glass type, hardware and extra options."],
      ["Pricing module", "Parsed parameters are matched against the internal price list to compute the final price, completely independent of the price stated in the PDF."],
      ["Data storage", "Async SQLAlchemy 2.0 on top of PostgreSQL stores orders, parsed parameters and calculated prices, with the migration schema managed by Alembic."]
    ],
    features: [
      "Order intake through a Telegram bot",
      "Structured PDF parsing: dimensions, profile, color, glass, hardware",
      "Price calculation from the internal price list, independent of the price in the source PDF",
      "Asynchronous processing on FastAPI",
      "Order and calculation history in PostgreSQL",
      "Schema migrations through Alembic"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Automation", "Telegram Bot API / PDF parsing / Internal pricing engine"],
      ["Infrastructure", "Docker Compose"]
    ],
    challenge: "PDF layouts from the design software are not always identical, so the parser has to tolerate structural differences without distorting the parameters. A wrong profile or hardware code changes the final price.",
    learned: "That removing a repetitive manual step, recalculating the price of every order by hand, is often worth more than any chatbot feature, and that async Python handles such I/O-bound tasks well."
  }
}

};
