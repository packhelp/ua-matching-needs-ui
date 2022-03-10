import { Translation } from "./definitions"

export const UA: Translation = {
  "/tickets/add": "Повідомте про потребу",
  "/tickets/active": "Потреби",
  "/tickets/active/mine": "Мої потреби",
  "/tickets/inactive/mine": "Мої неактивні потреби",
  "/tickets/claimed": "Moje przejęte potrzeby",
  "/sign-in": "Увійти",
  "/contact": "Сконтактуватись",
  "/faq": "FAQ",

  generic: {
    yes: "Так",
    no: "ні",
    close: "закрий",
  },

  pages: {
    active: {
      title: "Поточний попит",
    },
    "sign-in": {
      title: "Увійти",
      label: "Номер телефону",
      placeholder: "+38 097 123 123 12",
      next: "Далі",
      "phone-verification": {
        title: "Код верефікаціі з СМС",
        label:
          "Ми вислали вам код верифікаціі у повідомленні СМС. Введіть йогу щоб залогуватись",
        placeholder: "123 456",
        next: "Далі",
        error: "<need translation>",
      },
    },
    main: {
      header: "Швидке та просте управління організацією гуманітарної допомоги",
      subheader: "Допомагаєте іншим? Ми допоможемо вам організувати допомогу!",
      description:
        "Скажiть, що вам потрібно, і ми передамо ваш запит організаціям і людям, які допоможуть вам його організувати.",
      "show-all-button": "Перевірте потреби",
      "add-new-button": "Повідомте про потребу",
      "steps-section": {
        header: "Як це працює?",
        "step-1-title": "Ви повідомляєте про потребу",
        "step-1-description":
          "PВказуєте номер телефону та вводите те, що вам потрібно та куди ви хочете, щоб це було доставлено",
        "step-2-title": "Публікуємо потребу та шукаємо рішення",
        "step-2-description":
          "Ми передаємо ваші потреби організаціям і людям, які мають те, що вам потрібно, і допоможуть вам організувати допомогу",
        "step-3-title": "Ми деактивуємо старі потреби",
        "step-3-description":
          "Термін дії оголошення закінчується автоматично через 24 години, або коли ви його видалите, ви не отримаєте сотні телефонних дзвінків.",
      },
      "for-whom-section": {
        header: "Для кого ця платформа?",
        "list-item-1":
          "Для організаторів та координаторів зборів та допомоги Україні",
        "list-item-2": "Для пунктів прийому на кордонах",
        "list-item-3": "Для всіх, хто хоче організувати допомогу!",
      },
    },
    ticket: {
      metaTitle: {
        need: "Потреба",
        cta: "Допоможи Україні на potrzeby-ua.org",
      },
      description: {
        "read-more": "читати більше",
      },
      shareButton: {
        deliverTo: "Куди доставити",
        copySuccess: "Скопійовано в буфер обміну!",
      },
      verifiedOrganisation: "Перевірена організація",
      whoRequested: "Хто додав?",
      whoRequestedNeed: "Хто додав оголошення?",
      whereToDeliver: "Куди доставити?",
      added: "Додано",
      share: "Поділіться",
      whatsNeeded: "Що тобі потрібно?",
      howMuchIsNeeded: "Скільки потрібно?",
      needActiveTill: "Хто повідомив про запит?",
      views: "Хіти",
      needNumber: "Заявка №",
      details: "Деталі",
      ticketRemovedAddNew: "Оголошення усунено, можете додати наступне",
      ticketSolvedAddNew:
        "Оголошення було зазначено яко вирішене. Можете додати наступне",
      ticketNotFound:
        "Ми не знайшли цього оголошення або воно вже не актуальне. Але напевно знайдеться щось інше",

      here: "тут",
      errorOnRemove: "Під час видалення оголошення сталася помилка",
      errorOnResolved: "Помилка! Не вдалось зазначити оголошення як вирішеного",
      warningTicketExpired: "УВАГА! Оголошення не актуальне!",
      ticketExpiresAfterSetTime:
        "Термін дії оголошення закінчується після закінчення терміну, визначеного особою, яка створила оголошення",
      requesterCanExpireTicketAtAnyTime:
        "Заявник може виключити розміщення оголошення в будь-який час",
      lookForAnotherTicketThanksForHelp:
        "Шукайте інше оголошення - дякую за допомогу!",
      helpType: "Своєрідна допомога",
      call: "Зателефонуй мені",
      areYouTheAuthorOfThisTicket: "Ви є автором цього звіту",
      problemSolved: "Проблема вирішена!",
      remove: "Видалити",
      needExpired: "Оголошення не актуальне",
      ticketClaimed: "<need translation>",
      errorOnClaim: "<need translation>",
      claim: "<need translation>",
      claimedToHelp: "<need translation>",
      hasResponses: "<need translation>",
    },
    "add-ticket": {
      "add-need": "Додай потребу",
      adults: "Дорислих",
      adultsHint: "Кількість дорослих",
      adultsAge: "понад 12 років",
      children: "Діти",
      childrenHint: "Кількість дітей",
      childrenAge: "до 12 років",
      chooseLocation: "Виберіть місце",
      "has-pets": "Тварини",
      "children-hint": "Дітей менш ніж 12 років",
      title: "Назва (коротка)",
      "title-hint": "приклад: Проживання у Poznań для 4",
      "what-do-you-need": "Що за потреба?",
      "what-do-you-need-hint":
        "Наприклад: 2-місний матрац для матері з дитиною. Навіщо і як терміново це потрібн:  ми хочемо прийняти маму і дитину додому, але вийшло що ми приймаємо бабусю, 3 матерів і 2 дітей. Нам їх нікуди подіти. Додаткова інформація: транспорту у нас немає. Прохання привести до нас",
      "how-much-do-you-need": "Скільки?",
      "in-pieces-if-applicable": "В штуках",
      "where-do-you-need-it-delivered": "Де ця потеба? Містло, локалізація",
      "address-or-gps": "Адрес або коордатити GPS",
      "who-needs-it": "Хто потребує?",
      "name-surname-or-org-name": "Ім'я, прізвище або назва Oрганізаціі",
      "request-added": "Прийняли зголошення!",
      "need-added": "Додали потребу!",
      show_phone_public: "Показувати мій номер на сайті",
      whereFrom: "Звідки?",
      whereTo: "Куди?",
      "hide-phone-disclaimer":
        "Пам’ятайте, що особа, яка пропонує допомогу, повинна мати спосіб зв’язатися з вами. Якщо ви не хочете ділитися телефоном, вкажіть іншу форму контакту в описі.",
      required: "Це поле є обов'язковим",
    },
    claimed: {
      title: "Moje przejęte potrzeby",
    },
    extended: {
      title: "Оновлення оголошення",
      description: "Ваше оголошення продовжено: ",
      showTicket: "Перейти до оголошення",
    },
  },
  "sign-out": "Вийти",
  "terms-of-service": {
    title: "Правила",
    "title-alternate": "Правила Сервісу",
    agreemenent:
      "Додання оголошення рівносильно згоді з правилами роботи веб-сайту",
  },
  contact: {
    "contact-us-via": "Зв'яжіться з нами:",
    slack: "Slack",
    discord: "Discord",
    github: "Github",
    authors: "Автори сервісу",
    "in-cooperation-with": "Сервіс був створений у співпраці з:",
  },
  partners: {
    "with-us": "Вони працюють з нами",
  },
  errors: {
    "error-occured-while-adding": "Під час додавання сталася помилка:",
  },
  auth: {
    "you-have-been-logged-out": "Ви вийшли з системиmi",
  },
  faq: {
    header: "FAQ",
    sectionOne: {
      title: "Що таке",
      description:
        "Платформа створена для покращення організації гуманітарної допомоги жертвам війни в Україні. Ви можете легко додати свій запит про будь-яку допомогу: якщо ви шукаєте квартиру для людей з України, вам потрібен транспорт з кордону, продукти чи ліки. Потім ви маєте додати своє місце розташування - тобто локацію на кордоні, звідки вас треба забрати, або пункт призначення, де ви шукаєте житло - і також свій контактний номер, за яким з Вами можуть зв'язатися. Після додавання інформації ми шукаємо організацію або людей, які можуть допомогти з вашим запитом.",
    },
    sectionTwo: {
      title: "Навіщо Вам надавати свій номер телефону? ",
      description:
        "Ми дбаємо про оперативність нашої роботи та швидке вирішення питань. Тому нам потрібен Ваш контактний номер для того, щоб з‘єднатися з вами з метою допомоги згідно Вашого запиту. Ваш номер не буде зберігатися або використовуватися для будь-яких інших цілей",
    },
    sectionThree: {
      title: "Чи можу я поділитися оголошенням? ",
      description:
        "Так, ви можете поділитися усіма оголошеннями у Twitter, Telegram, Instagram, Facebook, а також прямим посиланням.",
    },
    sectionFour: {
      title:
        "Чи можу я безпосередньо зв'язатися з людьми, які потребують допомоги?",
      description:
        "Так, зазначені номери призначені для того, щоб люди, які можуть надати необхідну допомогу, могли швидко зв'язатися з тими, хто її потребує.",
    },
    sectionFive: {
      title: "Чи видаляються оголошення автоматично? ",
      description:
        "Так, через 24 години кожне оголошення автоматично видаляється. Також, якщо Ваша проблема вже вирішена, наприклад, вам вдалося знайти транспорт через кілька годин після публікації оголошення, ви можете видалити його самостійно.",
    },
    sectionSix: {
      title: "Де я можу знайти правила та умови веб-сайту? ",
      description: "З умовами обслуговування можна ознайомитись тут.",
      here: "тут",
    },
    sectionSeven: {
      title: "Чи стягується плата за використання платформи? ",
      description:
        "Ні, платформа абсолютно безкоштовна. Наша мета – ефективно організувати гуманітарну допомогу.",
    },
    sectionEight: {
      title: "Навіщо потрібні категорії? ",
      description:
        "Категорії дозволяють більш точно визначити тип необхідної допомоги, а також ефективніше шукати потенційні повідомлення для людей, які хочуть допомогти.",
    },
  },
  filters: {
    selectNeeds: "Виберіть тип потреби",
    all: "всі",
    whereFrom: "Звідки?",
    whereTo: "Куди?",
  },
  menu: {
    open: "Відкрити головне меню",
  },
  metaData: {
    title: "Допоможемо Україні!",
    description:
      "Швидке та просте управління організацією гуманітарної допомоги. Ви допомагаєте іншим? Ми допоможемо вам організувати цю допомогу!",
  },
  report: {
    title: "Чи містить цей запит помилки?",
    reportErrors: "повідомляти про порушення",
    reportStale: "Застарілий? Звіт.",
    actionReport: "Звіт",
    actionSend: "Надіслати",
    reason: {
      chooseReason: "Виберіть причину",
      options: {
        stale: "Запит",
        lacksContact: "У запиті відсутня контактна інформація",
        lacksDescription: "У запиті відсутній опис",
        itsAnOffer: "Це не прохання, це пропозиція",
        itsAnAdvertisementOrSpam: "Це реклама чи спам",
        wrongCategory: "Запиту призначено неправильну категорію",
        other: "Інша причина",
      },
    },
    reasonDetails: "більше інформації",
    thankYou: "Дякую!",
    thankYouForReport:
      "Дякую! Ваша заявка дозволить нам покращити надання допомоги. Наші модератори розглянуть це найближчим часом",
  },
  addTicket: {
    transport: {
      iKnowExactDate: "Точна дата",
    },
    wizard: {
      iNeedHelp: "Потрібна допомога",
      iCanHelp: "Я можу допомогти!",
      formNameTransport: "Транспорт",
      formNameOther: "Інше",
    },
    need: {
      whereFromNeeded: "<miss> Skąd potrzebujesz transportu?",
      whereToNeeded: "<miss> Dokąd potrzebujesz transportu?",
      when: "Коли?",
      extraLuggage: "додатковий багаж",
    },
    offer: {
      title: "<miss> Jeśli chcesz pomóc, przejrzyj bazę ofert",
      howToFilter: "<miss> Zobacz jak skutecznie filtrować",
      chooseCategory: "<miss> Wybierz kategorię:",
      youCanAlsoApply:
        "<miss> Możesz się też zgłosić do pomocy do jednego z naszych partnerów:",
    },
  },
}
