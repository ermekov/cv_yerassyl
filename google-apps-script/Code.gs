/**
 * cv_yermekov: сайттағы байланыс формасы -> Google Sheets
 * Орнату: кестені ашыңыз -> Extensions -> Apps Script -> осы кодты қойыңыз -> Deploy -> Web app.
 *
 * Мәндер 1-жолдағы баған атауы бойынша қойылады, сондықтан бағандарды өзіңіз өзгерте аласыз.
 * Танылатын атаулар: date, name, email, subject, message, lang, page (орысша/қазақша баламалары да бар).
 */
const SHEET_NAME   = '';   // бос болса, кестенің БІРІНШІ парағы қолданылады
const NOTIFY_EMAIL = '';   // мысалы 'ermekov_erasil@icloud.com'; бос болса хат жіберілмейді

const ALIASES = {
  date:    ['date', 'дата', 'timestamp', 'время', 'күні', 'уақыты'],
  name:    ['name', 'имя', 'аты', 'аты-жөні'],
  email:   ['email', 'e-mail', 'почта', 'пошта'],
  subject: ['subject', 'тема', 'тақырып'],
  message: ['message', 'сообщение', 'хабарлама'],
  lang:    ['lang', 'language', 'язык', 'тіл'],
  page:    ['page', 'url', 'страница', 'бет']
};
const DEFAULT_HEADERS = ['date', 'name', 'email', 'subject', 'message', 'lang', 'page'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const p = (e && e.parameter) || {};

    if (p.website) return json_({ ok: true });            // honeypot: спам-боттар

    const data = {
      date:    new Date(),
      name:    clean_(p.name, 120),
      email:   clean_(p.email, 200),
      subject: clean_(p.subject, 200),
      message: clean_(p.message, 5000),
      lang:    clean_(p.lang, 10),
      page:    clean_(p.page, 300)
    };
    if (!data.name || !data.message || !/^\S+@\S+\.\S+$/.test(data.email)) return json_({ ok: false, error: 'invalid' });

    appendLead_(getSheet_(), data);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({ to: NOTIFY_EMAIL, replyTo: data.email,
        subject: 'Новая заявка с сайта: ' + data.name,
        body: 'Имя: ' + data.name + '\nEmail: ' + data.email + '\nТема: ' + data.subject + '\n\n' + data.message });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Браузерде сілтемені ашып, скрипттің жұмыс істеп тұрғанын тексеруге болады
function doGet() {
  return json_({ ok: true, message: 'cv_yermekov form endpoint is running' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (SHEET_NAME) return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  return ss.getSheets()[0];
}

// 1-жолдағы баған атауына қарап мәнді дұрыс бағанға жазады
function appendLead_(sh, data) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(DEFAULT_HEADERS);
    sh.getRange(1, 1, 1, DEFAULT_HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  const headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0]
    .map(function (h) { return String(h).trim().toLowerCase(); });

  let matched = false;
  const row = headers.map(function (h) {
    for (const key in ALIASES) {
      if (ALIASES[key].indexOf(h) > -1) { matched = true; return data[key]; }
    }
    return '';
  });
  sh.appendRow(matched ? row : DEFAULT_HEADERS.map(function (k) { return data[k]; }));
}

// мәтінді тазалау + "=" немесе "+" деп басталатын формула-инъекциядан қорғау
function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
