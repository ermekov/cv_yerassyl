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
  card: "card.jpg", files: ["1.png", "2.png", "3.png"],
  ru: {
    kicker: "Дипломный проект · AI · Full-Stack",
    lead: "AI-платформа аренды горного снаряжения — дипломный проект, реализованный от начала до конца.",
    meta: [["Роль", "Один разработчик — backend, frontend, архитектура"], ["Формат", "Дипломный проект"], ["Сервисы", "API · Web"]],
    problem: "Аренда горного снаряжения обычно сводится к переписке напрямую с прокатом — без структурированного способа сравнить оборудование, проверить наличие или получить подсказку под конкретный маршрут. Единой платформы с каталогом, бронированием и хоть каким-то интеллектуальным подбором не существовало.",
    solution: "Backend на Flask, frontend на Next.js, каталог, бронирование и рекомендации разделены на отдельные сервисы. Сначала рекомендации фильтруются по тегам активности, погоде, уровню и наличию на складе, потом запрос к OpenAI ранжирует только эту небольшую выборку. Рядом с каталогом работает AI-чат, который знает сайт и остатки товаров. Отдельная страница рекомендаций на GPT-4o-mini подбирает комплект по уровню, направлению и погоде. Вход по OTP и JWT. Менеджер подтверждает заказы, администратор управляет товарами и заказами и выгружает аналитику продаж в CSV для Excel.",
    arch: [
      ["API-слой", "Flask отдаёт версионированные эндпоинты для каталога, бронирований, отзывов и рекомендаций, которые потребляет отдельный Next.js frontend через типизированный Axios-клиент."],
      ["Пайплайн рекомендаций", "Предфильтрация по тегам (активность, погода, уровень) и наличию на складе сужает список кандидатов, затем запрос к GPT-4o-mini ранжирует и объясняет получившийся шортлист — это удерживает стоимость и задержку под контролем."],
      ["AI-ассистент", "Чат-виджет берёт из каталога и базы названия, цены и остатки и отвечает по этим данным."],
      ["Внешние сервисы", "Погода через OpenWeatherMap, SMS-шлюз для OTP-кодов и платёжный сервис (демо Kaspi QR) подключены через отдельный слой сервисов, поэтому бизнес-логика отделена от маршрутов."],
      ["Деплой", "Backend запускается через Gunicorn, PostgreSQL — основной источник данных для каталога, бронирований и пользователей."]
    ],
    features: [
      "Каталог снаряжения с карточками: название, цена и остаток на складе",
      "Страницы: главная, каталог, профиль и «Мои заказы»",
      "Бронирование с оплатой и проверкой доступности по датам",
      "AI-чат-ассистент сбоку на сайте: знает сайт и каталог, называет товары, цены и остатки",
      "Страница AI-рекомендаций (GPT-4o-mini): уточняет уровень и направление, подбирает комплект с учётом погоды (например, новичок + трекинг → палатка, трекинговые палки)",
      "Аутентификация через OTP и JWT",
      "Отзывы и рейтинги для каждого объявления",
      "Панель менеджера: проверка и подтверждение заказов",
      "Панель администратора: добавление, изменение и удаление товаров, приём и отмена заказов, полный доступ",
      "Аналитика продаж с выгрузкой отчётов (CSV, открывается в Excel): самые продаваемые товары, выручка, самые активные покупатели",
      "Демо-оплата через Kaspi QR"
    ],
    stack: [
      ["Backend", "Python / Flask / SQLAlchemy / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API (GPT-4o-mini) / AI chat assistant / Rule-based filtering / Hybrid recommendation logic"],
      ["Инфраструктура и сервисы", "Gunicorn / OpenWeatherMap / SMS API"]
    ],
    challenge: "Сложнее всего было сделать рекомендации полезными и при этом объяснимыми. Я ограничил, что модель видит и что решает, чтобы ответ приходил быстро, прямо во время бронирования.",
    learned: "AI-функцию удобнее проектировать как один ограниченный шаг в пайплайне. Качество «умной» функции почти целиком зависит от того, как подготовлены данные до запроса к модели."
  },
  kk: {
    kicker: "Дипломдық жоба · AI · Full-Stack",
    lead: "Тау жабдықтарын жалға беретін AI-платформа: басынан аяғына дейін жасалған дипломдық жоба.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend, frontend, архитектура"], ["Форматы", "Дипломдық жоба"], ["Сервистер", "API · Web"]],
    problem: "Тау жабдықтарын жалға алу әдетте жалға беру пунктімен тікелей жазысуға саяды: жабдықты салыстырудың, бар-жоғын тексерудің немесе нақты маршрутқа лайық жабдықты таңдаудың құрылымдалған жолы жоқ. Каталогы, брондауы және кем дегенде қандай да бір ақылды таңдауы бар бірыңғай платформа болмаған.",
    solution: "Backend Flask-те, frontend Next.js-те жазылған, каталог, брондау және ұсынымдар бөлек сервистерге бөлінген. Ұсынымдар алдымен белсенділік тегтері, ауа райы, деңгей және қоймадағы бар-жоғы бойынша сүзіледі, содан кейін OpenAI сұранысы тек осы шағын тізімді саралайды. Каталогтың жанында сайт пен тауар қалдығын білетін AI-чат жұмыс істейді. GPT-4o-mini негізіндегі бөлек ұсыным беті деңгей, бағыт және ауа райы бойынша жиынтық таңдайды. Кіру OTP және JWT арқылы. Менеджер тапсырыстарды растайды, админ тауарлар мен тапсырыстарды басқарып, сатылым аналитикасын Excel-ге арналған CSV-ге жүктейді.",
    arch: [
      ["API қабаты", "Flask каталог, брондау, пікірлер және ұсынымдар үшін нұсқаланған эндпоинттерді ұсынады. Оларды бөлек Next.js frontend типтелген Axios-клиент арқылы пайдаланады."],
      ["Ұсыным пайплайны", "Тегтер (белсенділік, ауа райы, деңгей) және қоймадағы бар-жоғы бойынша алдын ала сүзгі үміткерлерді қысқартады, содан кейін GPT-4o-mini сұранысы шыққан шағын тізімді саралап, түсіндіреді. Бұл шығын мен кідірісті бақылауда ұстайды."],
      ["AI-ассистент", "Чат-виджет каталог пен дерекқордан атауларды, бағаларды және қалдықтарды алып, сол деректер бойынша жауап береді."],
      ["Сыртқы сервистер", "OpenWeatherMap арқылы ауа райы, OTP-кодтар үшін SMS-шлюз және төлем сервисі (демо Kaspi QR) бөлек сервис қабаты арқылы қосылған, сондықтан бизнес-логика маршруттардан бөлек."],
      ["Деплой", "Backend Gunicorn арқылы жұмыс істейді, PostgreSQL каталог, брондау және пайдаланушылар үшін негізгі дерек көзі."]
    ],
    features: [
      "Атауы, бағасы және қоймадағы қалдығы көрсетілген жабдық каталогы",
      "Беттер: басты бет, каталог, профиль және «Менің тапсырыстарым»",
      "Төлеммен және күндер бойынша қолжетімділікті тексеретін брондау",
      "Сайттың шетіндегі AI-чат-ассистент: сайт пен каталогты біледі, тауар атауын, бағасын және қалдығын айтады",
      "AI-ұсыным беті (GPT-4o-mini): деңгей мен бағытты нақтылап, ауа райын ескере отырып жиынтық ұсынады (мысалы, жаңадан бастаушы + трекинг → шатыр, трекинг таяқтары)",
      "OTP және JWT арқылы аутентификация",
      "Әр хабарландыруға пікірлер мен рейтингтер",
      "Менеджер панелі: тапсырыстарды тексеру және растау",
      "Админ панелі: тауар қосу, өзгерту, жою, тапсырысты қабылдау және болдырмау, толық қолжетімділік",
      "Сатылым аналитикасы мен есептерді жүктеу (CSV, Excel-де ашылады): ең көп сатылған тауарлар, түсім, ең белсенді сатып алушылар",
      "Kaspi QR арқылы демо-төлем"
    ],
    stack: [
      ["Backend", "Python / Flask / SQLAlchemy / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API (GPT-4o-mini) / AI chat assistant / Rule-based filtering / Hybrid recommendation logic"],
      ["Инфрақұрылым және сервистер", "Gunicorn / OpenWeatherMap / SMS API"]
    ],
    challenge: "Ең қиыны ұсынымдарды пайдалы әрі түсінікті ету болды. Жауап брондау кезінде жылдам келуі үшін модель нені көретінін және нені шешетінін шектедім.",
    learned: "AI-функцияны пайплайндағы бір шектеулі қадам ретінде жобалаған ыңғайлы екенін түсіндім. «Ақылды» функцияның сапасы модельге сұраныс жібермес бұрын деректердің қалай дайындалғанына тәуелді."
  },
  en: {
    kicker: "Graduation project · AI · Full-Stack",
    lead: "An AI platform for renting mountain equipment: a graduation project built end to end.",
    meta: [["Role", "Solo developer: backend, frontend, architecture"], ["Format", "Graduation project"], ["Services", "API · Web"]],
    problem: "Renting mountain gear usually comes down to messaging a rental shop directly, with no structured way to compare equipment, check availability or get a suggestion for a specific route. There was no single platform with a catalog, booking and at least some intelligent selection.",
    solution: "A Flask backend and a Next.js frontend, with the catalog, booking and recommendations split into separate services. Recommendations are first filtered by activity tags, weather, level and stock, and then an OpenAI request ranks only that short list. Next to the catalog there is an AI chat that knows the site and the stock. A separate GPT-4o-mini recommendation page builds a kit by level, direction and weather. Sign-in uses OTP and JWT. The manager confirms orders, and the admin manages products and orders and exports sales analytics as CSV for Excel.",
    arch: [
      ["API layer", "Flask serves versioned endpoints for the catalog, bookings, reviews and recommendations, consumed by a separate Next.js frontend through a typed Axios client."],
      ["Recommendation pipeline", "Tag-based prefiltering (activity, weather, level) and stock availability narrows the candidates, then a GPT-4o-mini request ranks and explains the resulting shortlist, which keeps cost and latency under control."],
      ["AI assistant", "The chat widget takes product names, prices and stock from the catalog and the database and answers from that data."],
      ["External services", "Weather via OpenWeatherMap, an SMS gateway for OTP codes and a payment service (Kaspi QR demo) are connected through a separate service layer, so business logic stays apart from the routes."],
      ["Deployment", "The backend runs on Gunicorn, with PostgreSQL as the primary source of truth for the catalog, bookings and users."]
    ],
    features: [
      "Equipment catalog with cards showing name, price and stock level",
      "Pages: home, catalog, profile and “My orders”",
      "Booking with payment and date-based availability checks",
      "AI chat assistant on the side of the site: knows the site and the catalog, can tell product names, prices and stock",
      "AI recommendation page (GPT-4o-mini): asks for the level and direction, then builds a kit that takes the weather into account (for example, beginner + trekking → tent, trekking poles)",
      "OTP and JWT authentication",
      "Reviews and ratings for every listing",
      "Manager panel: review and confirm orders",
      "Admin panel: add, edit and delete products, accept and cancel orders, full access",
      "Sales analytics with report export (CSV, opens in Excel): best-selling products, revenue, most active buyers",
      "Demo payment via Kaspi QR"
    ],
    stack: [
      ["Backend", "Python / Flask / SQLAlchemy / PostgreSQL / JWT"],
      ["Frontend", "Next.js / React / TypeScript / Tailwind CSS / Zustand / React Query / Axios"],
      ["AI", "OpenAI API (GPT-4o-mini) / AI chat assistant / Rule-based filtering / Hybrid recommendation logic"],
      ["Infrastructure and services", "Gunicorn / OpenWeatherMap / SMS API"]
    ],
    challenge: "The hardest part was keeping the recommendations useful and explainable. I limited what the model sees and decides, so the answer arrives quickly, right inside the booking flow.",
    learned: "An AI feature is easier to design as one bounded step in a pipeline. How good a \"smart\" feature is depends mostly on how the data is prepared before the model is called."
  }
},

/* ------------------------------------------------------------------ */
"ai-business-assistant": {
  num: "02", years: "2026", done: false,
  gradient: "linear-gradient(135deg,#333,#3a5a6a)",
  title: "AI Business Assistant",
  gh: "",
  url: "https://cvyermekov.vercel.app/ru/projects/ai-business-assistant",
  card: false, files: [],   // нақты скриншот болмағанша карточкада иллюстрация тұрады; файл атын осында жазыңыз
  ru: {
    title: "AI-ассистент для бизнеса",
    kicker: "AI Engineering · Автоматизация · Интеграции",
    lead: "AI-ассистент, который ведёт бизнес-процессы в Telegram, WhatsApp и Instagram.",
    meta: [["Роль", "Один разработчик — backend и интеграции"], ["Каналы", "Telegram · WhatsApp · Instagram"], ["Слой данных", "PostgreSQL · Google Sheets"]],
    problem: "Малый бизнес, который ведёт процессы вручную через мессенджеры, теряет время на повторяющиеся структурированные задачи — приём заказов, фиксацию заявок, синхронизацию данных — которые не обязательно каждый раз делать руками.",
    solution: "Backend-логику я написал на Python и подключил API Telegram, WhatsApp и Instagram, так что все каналы попадают в один workflow-движок. Ассистент собирает и структурирует входящие запросы, при необходимости обращается к внешним сервисам и записывает результат в PostgreSQL и Google Sheets, где у бизнеса всегда актуальные данные для анализа. Логика бота построена вокруг процессов конкретного бизнеса: приём заявок, ответы на типовые вопросы, передача данных менеджеру.",
    arch: [
      ["Приём из нескольких каналов", "Telegram, WhatsApp и Instagram ведут в один Python backend, поэтому логику workflow я пишу один раз для всех каналов."],
      ["Логика workflow", "Входящие сообщения разбираются в структурированные запросы и направляются по логике конкретного бизнеса."],
      ["Внешние интеграции", "Внутри workflow backend обращается к внешним API и сервисам, когда это нужно."],
      ["Слой данных", "Структурированные результаты записываются в PostgreSQL как основной источник данных, а живая синхронизация с Google Sheets позволяет нетехническим сотрудникам смотреть данные без доступа к базе."]
    ],
    features: [
      "Приём сообщений сразу из Telegram, WhatsApp и Instagram",
      "Python backend, который ведёт диалог и логику workflow",
      "Интеграция с внешними API и сервисами",
      "Структурированное хранение данных в PostgreSQL",
      "Живая синхронизация с Google Sheets для нетехнических сотрудников",
      "Повторяющиеся бизнес-процессы выполняются автоматически"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Каналы", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Автоматизация", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "Сложнее всего было удержать один workflow-движок на трёх платформах с разными API и форматами сообщений, чтобы бизнес-логика не разошлась на три версии.",
    learned: "Понял, что ценность AI-бота для бизнеса в первую очередь в workflow и передаче данных, которые стоят за диалогом. Канал служит только точкой входа."
  },
  kk: {
    title: "Бизнеске арналған AI-ассистент",
    kicker: "AI Engineering · Автоматтандыру · Интеграциялар",
    lead: "Telegram, WhatsApp және Instagram-да бизнес-процестерді жүргізетін AI-ассистент.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend және интеграциялар"], ["Арналар", "Telegram · WhatsApp · Instagram"], ["Дерек қабаты", "PostgreSQL · Google Sheets"]],
    problem: "Процестерді мессенджерлер арқылы қолмен жүргізетін шағын бизнес қайталанатын құрылымдалған тапсырмаларға (тапсырыс қабылдау, өтінімдерді тіркеу, деректерді синхрондау) уақытын жоғалтады. Ал оларды әр жолы қолмен істеудің қажеті жоқ.",
    solution: "Backend-логиканы Python-да жазып, Telegram, WhatsApp және Instagram API-ларын қостым, сонда барлық арна бір workflow-қозғалтқышқа түседі. Ассистент кіріс сұраныстарды жинап, құрылымдайды, қажет болса сыртқы сервистерге жүгінеді және нәтижені PostgreSQL мен Google Sheets-ке жазады, сонда бизнестің талдауға дайын өзекті деректері болады. Бот логикасы нақты бизнестің процестеріне құрылған: өтінім қабылдау, жиі сұрақтарға жауап беру, деректерді менеджерге беру.",
    arch: [
      ["Көп арналы қабылдау", "Telegram, WhatsApp және Instagram бір Python backend-ке апарады, сондықтан workflow-логиканы барлық арна үшін бір рет жазамын."],
      ["Workflow-логика", "Кіріс хабарламалар құрылымдалған сұраныстарға талданып, нақты бизнестің логикасы бойынша бағытталады."],
      ["Сыртқы интеграциялар", "Workflow ішінде backend қажет кезде сыртқы API мен сервистерге жүгінеді."],
      ["Дерек қабаты", "Құрылымдалған нәтижелер негізгі дерек көзі ретінде PostgreSQL-ге жазылады, ал Google Sheets-пен тірі синхрондау техникалық емес қызметкерлерге дерекқорға кірмей-ақ деректерді көруге мүмкіндік береді."]
    ],
    features: [
      "Telegram, WhatsApp және Instagram-нан бір мезгілде хабарлама қабылдау",
      "Диалог пен workflow-логиканы жүргізетін Python backend",
      "Сыртқы API мен сервистермен интеграция",
      "PostgreSQL-де құрылымдалған деректерді сақтау",
      "Техникалық емес қызметкерлерге арналған Google Sheets-пен тірі синхрондау",
      "Қайталанатын бизнес-процестер автоматты түрде орындалады"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Арналар", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Автоматтандыру", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "Ең қиыны әрқайсысының өз API ерекшеліктері мен хабарлама форматтары бар үш түрлі платформада бір workflow-қозғалтқышты ұстап тұру болды, сонда бизнес-логика үш бөлек нұсқаға таралып кетпеді.",
    learned: "Бизнеске арналған AI-боттың құндылығы бірінші кезекте диалогтың артындағы workflow мен деректер беруде екенін түсіндім. Арна тек кіру нүктесі."
  },
  en: {
    title: "AI Assistant for Business",
    kicker: "AI Engineering · Automation · Integrations",
    lead: "An AI assistant that runs business processes in Telegram, WhatsApp and Instagram.",
    meta: [["Role", "Solo developer: backend and integrations"], ["Channels", "Telegram · WhatsApp · Instagram"], ["Data layer", "PostgreSQL · Google Sheets"]],
    problem: "Small businesses that run processes by hand through messengers lose time on repetitive, structured tasks such as taking orders, logging requests and syncing data, which do not have to be done manually every time.",
    solution: "I wrote the backend logic in Python and connected the Telegram, WhatsApp and Instagram APIs, so all channels feed into one workflow engine. The assistant collects and structures incoming requests, calls external services when needed and writes the result to PostgreSQL and Google Sheets, where the business always has current data to analyze. The bot logic follows the processes of a specific business: taking requests, answering common questions and passing data to a manager.",
    arch: [
      ["Multi-channel intake", "Telegram, WhatsApp and Instagram all lead into the same Python backend, so I write the workflow logic once for every channel."],
      ["Workflow logic", "Incoming messages are parsed into structured requests and routed through the logic of the specific business."],
      ["External integrations", "Within a workflow, the backend calls external APIs and services when it needs them."],
      ["Data layer", "Structured results are written to PostgreSQL as the primary source of truth, while live sync with Google Sheets lets non-technical staff view the data without database access."]
    ],
    features: [
      "Receives messages from Telegram, WhatsApp and Instagram at once",
      "Python backend that drives the dialog and workflow logic",
      "Integration with external APIs and services",
      "Structured data storage in PostgreSQL",
      "Live Google Sheets sync for non-technical staff",
      "Repeatable business processes run automatically"
    ],
    stack: [
      ["Backend", "Python / API integration / PostgreSQL"],
      ["Channels", "Telegram Bot API / WhatsApp Business API / Instagram Messaging API"],
      ["Automation", "Google Sheets API / n8n / Workflow automation"]
    ],
    challenge: "The hardest part was keeping a single workflow engine running on three different platforms, each with its own API quirks and message formats, so that the business logic would not split into three separate versions.",
    learned: "The value of a business AI bot lies mostly in the workflow and data handoff behind the dialog. The channel is only an entry point."
  }
},

/* ------------------------------------------------------------------ */
"ken-tereze-ai": {
  num: "03", years: "2026", done: false,
  gradient: "linear-gradient(135deg,#3a3a3a,#5a4a7a)",
  title: "Ken Tereze AI",
  gh: "",
  url: "https://cvyermekov.vercel.app/ru/projects/ken-tereze-ai",
  card: "1.png", files: ["1.png", "2.png"],
  ru: {
    kicker: "Python · AI · Автоматизация",
    lead: "Telegram-бот для дилеров: принимает PDF-заказ на окна, рассчитывает стоимость по материалам из базы и после согласия дилера передаёт заказ менеджеру.",
    meta: [["Роль", "Один разработчик — backend и автоматизация"], ["Отрасль", "Производство окон и дверей"], ["Интерфейс", "Telegram"]],
    problem: "Дилер присылает заказ в PDF: размеры окон, из каких материалов они делаются и сколько штук нужно. Чтобы назвать сумму, нужно разобрать документ и вручную посчитать каждую позицию — раму, стекло, фурнитуру и ручки — по актуальным ценам, а на это уходит время и появляются ошибки.",
    solution: "Дилер отправляет PDF Telegram-боту. Система разбирает документ и извлекает размеры, количество и материалы, затем рассчитывает стоимость по комплектующим из базы данных — рама, стекло, ручка и другие материалы — и сразу сообщает дилеру итоговую сумму. Если дилер соглашается, заказ автоматически уходит менеджеру в Telegram. Результаты расчётов и история заказов хранятся в базе.",
    arch: [
      ["Приём", "Дилер отправляет PDF-заказ Telegram-боту. Бот передаёт файл в конвейер обработки и остаётся отзывчивым, пока идёт разбор."],
      ["Парсинг", "Отдельный парсер извлекает из PDF структурированные поля: размеры изделий, количество и материалы (профиль, стекло, фурнитура, ручки и другое)."],
      ["Расчёт стоимости", "Каждая позиция заказа сопоставляется с материалами и ценами в базе данных (около 400 позиций), из них складывается итоговая сумма — независимо от цены, указанной в самом PDF."],
      ["AI-диалог", "Ответы дилеру формирует OpenAI API. Стоимость считается по данным из базы, поэтому модель на сумму не влияет."],
      ["Подтверждение", "Бот показывает дилеру сумму. Если дилер принимает расчёт, заказ отправляется менеджеру в Telegram для дальнейшей работы."],
      ["Хранение данных", "Заказы, разобранные параметры, материалы и рассчитанные цены хранятся в базе данных."]
    ],
    features: [
      "Приём PDF-заказов дилеров через Telegram-бота",
      "Автоматический разбор размеров, количества и материалов из PDF",
      "Расчёт стоимости по материалам из базы: рама, стекло, ручка и другие комплектующие",
      "Ответы бота дилеру формируются через OpenAI API, итоговая сумма сообщается сразу",
      "Подтверждение расчёта дилером",
      "Автоматическая отправка принятого заказа менеджеру в Telegram",
      "История заказов и расчётов в базе данных"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Автоматизация", "Telegram Bot API / OpenAI API / PDF parsing / Internal pricing engine"],
      ["Инфраструктура", "Docker Compose"]
    ],
    challenge: "Разметка PDF из программы проектирования не всегда одинакова, поэтому парсер должен выдерживать структурные отличия, не искажая параметры — неверный код профиля или фурнитуры меняет итоговую цену.",
    learned: "Что убрать повторяющийся ручной шаг — пересчёт цены каждого заказа вручную — часто ценнее любой чат-бот-функции, и что асинхронный Python хорошо справляется с такими I/O-зависимыми задачами."
  },
  kk: {
    kicker: "Python · AI · Автоматтандыру",
    lead: "Дилерлерге арналған Telegram-бот: терезеге PDF-тапсырысты қабылдап, бағаны базадағы материалдар бойынша есептейді, дилер келіскен соң тапсырысты менеджерге жібереді.",
    meta: [["Рөлі", "Жалғыз әзірлеуші: backend және автоматтандыру"], ["Сала", "Терезе мен есік өндірісі"], ["Интерфейс", "Telegram"]],
    problem: "Дилер PDF форматында тапсырыс жібереді: терезе өлшемдері, қандай материалдардан жасалатыны және неше дана керек екені көрсетіледі. Соманы айту үшін құжатты талдап, әр позицияны (жақтау, әйнек, фурнитура, тұтқа) өзекті бағамен қолмен есептеу керек, бұл уақыт алады және қателікке апарады.",
    solution: "Дилер PDF-ті Telegram-ботқа жібереді. Жүйе құжатты талдап, өлшемдерді, санын және материалдарды шығарады, содан кейін дерекқордағы құрамдауыштар (жақтау, әйнек, тұтқа және басқа материалдар) бойынша құнын есептеп, дилерге түпкілікті соманы бірден айтады. Дилер келіссе, тапсырыс автоматты түрде менеджерге Telegram арқылы жіберіледі. Есептеу нәтижелері мен тапсырыс тарихы базада сақталады.",
    arch: [
      ["Қабылдау", "Дилер PDF-тапсырысты Telegram-ботқа жібереді. Бот файлды өңдеу конвейеріне береді және талдау жүріп жатқанда жылдам жауап беріп тұрады."],
      ["Талдау", "Бөлек парсер PDF-тен құрылымдалған өрістерді шығарады: бұйым өлшемдері, саны және материалдар (профиль, әйнек, фурнитура, тұтқалар және басқа)."],
      ["Құнды есептеу", "Тапсырыстың әр позициясы дерекқордағы материалдар мен бағалармен (шамамен 400 позиция) салыстырылып, түпкілікті сома жиналады. Бұл PDF-тегі бағадан тәуелсіз."],
      ["AI-диалог", "Дилерге жауаптарды OpenAI API қалыптастырады. Құн дерекқордағы деректер бойынша есептеледі, сондықтан модель сомаға әсер етпейді."],
      ["Растау", "Бот дилерге соманы көрсетеді. Дилер есептеуді қабылдаса, тапсырыс әрі қарай жұмыс істеу үшін менеджерге Telegram арқылы жіберіледі."],
      ["Деректерді сақтау", "Тапсырыстар, талданған параметрлер, материалдар және есептелген бағалар дерекқорда сақталады."]
    ],
    features: [
      "Дилерлердің PDF-тапсырыстарын Telegram-бот арқылы қабылдау",
      "PDF-тен өлшемдерді, санын және материалдарды автоматты талдау",
      "Базадағы материалдар бойынша құнды есептеу: жақтау, әйнек, тұтқа және басқа құрамдауыштар",
      "Бот жауаптары OpenAI API арқылы қалыптасады, түпкілікті сома дилерге бірден айтылады",
      "Дилердің есептеуді растауы",
      "Қабылданған тапсырысты менеджерге Telegram арқылы автоматты жіберу",
      "Тапсырыстар мен есептеулер тарихы дерекқорда"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Автоматтандыру", "Telegram Bot API / OpenAI API / PDF parsing / Internal pricing engine"],
      ["Инфрақұрылым", "Docker Compose"]
    ],
    challenge: "Жобалау бағдарламасының PDF-тері әрдайым бірдей болмайды, сондықтан парсер параметрлерді бұрмаламай, құрылымдағы айырмашылықтарға төтеп бере білуі керек. Профиль немесе фурнитура кодының қате болуы түпкілікті бағаны өзгертеді.",
    learned: "Қайталанатын қолмен істелетін қадамды, яғни әр тапсырыстың бағасын қолмен қайта есептеуді жою көбіне кез келген чат-бот функциясынан құнды екенін және асинхронды Python мұндай I/O-ға тәуелді тапсырмаларды жақсы атқаратынын түсіндім."
  },
  en: {
    kicker: "Python · AI · Automation",
    lead: "A Telegram bot for dealers: it takes a PDF window order, calculates the cost from the materials in the database and, once the dealer agrees, passes the order to a manager.",
    meta: [["Role", "Solo developer: backend and automation"], ["Industry", "Window and door manufacturing"], ["Interface", "Telegram"]],
    problem: "A dealer sends an order as a PDF with window dimensions, the materials they are made from and the quantity. To name a price, someone has to parse the document and calculate every item by hand (frame, glass, hardware and handles) at current prices, which takes time and invites mistakes.",
    solution: "The dealer sends the PDF to a Telegram bot. The system parses the document and extracts dimensions, quantities and materials, then calculates the cost from the components in the database (frame, glass, handle and other materials) and immediately tells the dealer the final amount. If the dealer agrees, the order is automatically sent to the manager in Telegram. Calculation results and order history are stored in the database.",
    arch: [
      ["Intake", "The dealer sends a PDF order to the Telegram bot. The bot hands the file to a processing pipeline and stays responsive while parsing runs."],
      ["Parsing", "A dedicated parser extracts structured fields from the PDF: item dimensions, quantity and materials (profile, glass, hardware, handles and more)."],
      ["Cost calculation", "Every order item is matched against the materials and prices in the database (about 400 items) to build the total, independent of the price stated in the PDF."],
      ["AI dialog", "The OpenAI API writes the replies to the dealer. The cost is calculated from the data in the database, so the model has no effect on the amount."],
      ["Confirmation", "The bot shows the dealer the total. If the dealer accepts the calculation, the order is sent to a manager in Telegram for further work."],
      ["Data storage", "Orders, parsed parameters, materials and calculated prices are stored in the database."]
    ],
    features: [
      "Dealer PDF orders received through a Telegram bot",
      "Automatic extraction of dimensions, quantities and materials from the PDF",
      "Cost calculated from the materials in the database: frame, glass, handle and other components",
      "Bot replies are generated through the OpenAI API, and the dealer gets the final amount immediately",
      "Dealer confirmation of the calculation",
      "Accepted order is sent to the manager in Telegram automatically",
      "Order and calculation history in the database"
    ],
    stack: [
      ["Backend", "Python / FastAPI / AsyncIO / Async SQLAlchemy 2.0 / PostgreSQL / Alembic"],
      ["Automation", "Telegram Bot API / OpenAI API / PDF parsing / Internal pricing engine"],
      ["Infrastructure", "Docker Compose"]
    ],
    challenge: "PDF layouts from the design software are not always identical, so the parser has to tolerate structural differences without distorting the parameters. A wrong profile or hardware code changes the final price.",
    learned: "That removing a repetitive manual step, recalculating the price of every order by hand, is often worth more than any chatbot feature, and that async Python handles such I/O-bound tasks well."
  }
}

};
