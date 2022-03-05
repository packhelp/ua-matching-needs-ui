export type Locales = "pl-PL" | "uk-UA"

const PL = {
  "/tickets/add": "Zgłoś potrzebę",
  "/tickets/active": "Potrzeby",
  "/tickets/active/mine": "Moje potrzeby",
  "/tickets/inactive/mine": "Moje nieaktywne potrzeby",
  "/sign-in": "Zaloguj się",
  "/contact": "Kontakt",
  "/faq": "FAQ",

  generic: {
    yes: "yes",
    no: "no",
  },

  pages: {
    active: {
      title: "Aktualne Zapotrzebowanie",
    },
    "sign-in": {
      title: "Zaloguj się",
      label: "Podaj numer telefonu",
      placeholder: "601601601",
      next: "Dalej",
      "phone-verification": {
        title: "Podaj kod weryfikacyjny",
        label:
          "Wysłaliśmy kod weryfikacyjny, na twój numer telefonu, w wiadomości SMS. Wpisz go poniżej aby zalogować się.",
        placeholder: "123 456",
        next: "Dalej",
      },
    },
    main: {
      header: "Szybkie i proste zarządzanie organizacją pomocy humanitarnej",
      subheader: "Pomagasz innym? Pomożemy Ci zorganizować pomoc!",
      description:
        "Powiedz czego potrzebujesz, a my przekażemy Twoją prośbę do organizacji i osób, które pomogą Ci to zorganizować.",
      "show-all-button": "Sprawdź potrzeby",
      "add-new-button": "Zgłoś potrzebę",
      "steps-section": {
        header: "Jak to działa?",
        "step-1-title": "Zgłaszasz potrzebę",
        "step-1-description":
          "Podajesz numer telefonu i wpisujesz to, czego potrzebujesz i gdzie chcesz to dostarczyć.",
        "step-2-title": "My publikujemy potrzebę i szukamy rozwiązania",
        "step-2-description":
          "Twoją potrzebę przekazujemy organizacjom i osobom, które mają to, czego potrzebujesz i  pomogą Ci zorganizować pomoc.",
        "step-3-title": "Dezaktywujemy stare potrzeby",
        "step-3-description":
          "Ogłoszenie wygasa automatycznie po 24 godzinach lub wtedy kiedy je usuniesz - nie będziesz dostawać setek telefonów.",
      },
      "for-whom-section": {
        header: "Dla kogo jest ta platforma?",
        "list-item-1":
          "Dla organizatorów i koordynatorów zbiórek i pomocy dla Ukrainy",
        "list-item-2": "Dla punktów recepcyjnych na granicach",
        "list-item-3": "Dla każdego, kto chce zorganizować pomoc!",
      },
    },
    ticket: {
      metaTitle: {
        need: "Potrzeba",
        cta: "Pomóż Ukrainie z potrzeby-ua.org",
      },
      description: {
        "read-more": "Czytaj więcej",
      },
      shareButton: {
        deliverTo: "Gdzie dostarczyć:",
        copySuccess: "Skopiowano do schowka!",
      },
      verifiedOrganisation: "Zweryfikowana organizacja",
      whoRequested: "Kto zgłosił?",
      whoRequestedNeed: "Kto zgłosił zapotrzebowanie?",
      whereToDeliver: "Gdzie dostarczyć?",
      added: "Dodano",
      share: "Udostępnij",
      whatsNeeded: "Co potrzeba?",
      howMuchIsNeeded: "Ile potrzeba?",
      needActiveTill: "Zgłoszenie aktywne do",
      views: "Odsłon",
      needNumber: "Numer zgłoszenia",
      details: "Szczegóły",
      ticketRemovedAddNew: "Ogłoszenie usunięte. Mozesz dodać kolejne.",
      ticketSolvedAddNew:
        "Ogłoszenie zostało oznaczone jako rozwiąne! Mozesz dodać kolejne.",
      ticketNotFound:
        "Zgłoszenia nie znaleziono lub jest juz nieaktualne. Ale pewnie się coś znajdzie ",
      here: "tutaj",
      errorOnRemove: "Wystąpił błąd z usuwaniem zgłoszenia",
      errorOnResolved: "Wystąpił błąd z oznaczeniem zgłoszenia jako rozwiąane",
      warningTicketExpired: "UWAGA: Zgłoszenie nieaktualne!",
      ticketExpiresAfterSetTime:
        "Ogłoszenie wygasa po czasie ustalonym przez osobę zgłaszającą",
      requesterCanExpireTicketAtAnyTime:
        "Osoba zgłąszająca w każdym momencie może wygasić ogłoszenie",
      lookForAnotherTicketThanksForHelp:
        "Poszukaj innego zgłoszenia - dziękujemy za pomoc!",
      helpType: "Rodzaj pomocy",
      call: "Zadzwoń",
      areYouTheAuthorOfThisTicket: "Jesteś autorem tego zgłoszenia?",
      problemSolved: "Problem rozwiązany!",
      remove: "Usuń",
      needExpired: "Zgłoszenie wygasło",
    },
    "add-ticket": {
      "add-need": "Dodaj potrzebę",
      adults: "Dorosłych",
      "adults-hint": "Liczba osób > 12 lat",
      children: "Dzieci",
      "has-pets": "Zwierzęta",
      "children-hint": "Liczba osób < 12 lat",
      "what-do-you-need": "Opis potrzeby",
      "what-do-you-need-hint":
        "Na przykład: Materac 2-osobowy dla mamy z dzieckiem. Dlaczego i jak pilnie jest potrzebne: miałyśmy przyjąć uchodźców (mamę z dzieckiem) do naszego domu, ale ostatecznnie teraz gościmy już babcię, 3 mamy i 2 dzieci. Nie mamy gdzie ich położyć. Dodatkowe informacje: Nie mamy transportu. Prośba o przywiezienie do nas.",
      "how-much-do-you-need": "Ile potrzebujesz?",
      "in-pieces-if-applicable": "W sztukach, jeśli dotyczy",
      "where-do-you-need-it-delivered": "Gdzie to potrzebujesz dostarczyć?",
      "address-or-gps":
        'Adres lub lokalizacja GPS (na przykład "Malczewskiego 5, Warszawa", albo "Szpital Dziecięcy w Poznaniu")',
      "who-needs-it": "Kto to potrzebuje?",
      "name-surname-or-org-name":
        "Twoje imię i nazwisko lub Twoja nazwa organizacji",
      "request-added": "Zgłoszenie przyjęte!",
      "need-added": "Zgłoszono potrzebę!",
      show_phone_public: "Pokaż mój numer telefonu publicznie",
      whereFrom: "Skąd?",
      whereTo: "Dokąd?",
    },
  },
  "sign-out": "Wyloguj się",
  "terms-of-service": {
    title: "Regulamin",
    "title-alternate": "Regulamin serwisu",
    agreemenent:
      "Zgłoszenie potrzeby jest równoznaczne z akceptacją regulaminu działania serwisu",
  },
  contact: {
    "contact-us-via": "Skontaktuj się z nami przez",
    slack: "Slack",
    discord: "Discord",
    github: "Github",
    authors: "Autorzy narzędzia",
    "in-cooperation-with": "Narzędzie zostało stworzone przy współpracy:",
  },
  partners: {
    "with-us": "Współpracują z nami",
  },
  errors: {
    "error-occured-while-adding": "Wystąpił błąd podczas dodawania: ",
  },
  auth: {
    "you-have-been-logged-out": "Zostałeś wylogowany",
  },
  faq: {
    header: "FAQ",
    sectionOne: {
      title: "Czym jest",
      description:
        "Platforma powstała w celu usprawnienia organizacji pomocy humanitarnej dla ofiar wojny w Ukrainie. W prosty sposób możesz dodać ogłoszenie dotyczące jakiegokolwiek sposobu pomocy - jeśli szukasz mieszkania dla osób z Ukrainy, potrzebujesz transportu z granicy, lub też zapewnienia jedzenia lub leków. Następnie dodajesz lokalizację - czyli np, miejsce odbioru na granicy, lub docelowe iejsce w którym szukasz zakwaaterowania - oraz numer kontaktowy do siebie. Po dodaniu informacji my zajmujemy się szukaniem organizacji lub osób, które mogą pomóc z Twoim zgłoszeniem.",
    },
    sectionTwo: {
      title: "Dlaczego podaję swój numer telefonu?",
      description:
        "Zależy nam na sprawnym działaniu oraz szybkim rozwiązywaniu zapytań. Dlatego potrzebujemy numeru kontaktowego jedynie w celach określonych w opisie Twojej potrzeby. Twój numer nie zostaje przetrzymany ani nie będzie wykorzystany w żadnym innym celu.",
    },
    sectionThree: {
      title: "Czy mogę udostępniać trwające zgłoszenia?",
      description:
        "Tak, możesz udostępniać wszystkie zgłoszenia na Twitterze, Telegramie oraz Facebooku, a także jako bezpośredni link.",
    },
    sectionFour: {
      title:
        "Czy mogę kontaktować się bezpośrednio z osobami szukającymi pomocy?",
      description:
        "Tak, podane numery służą do tego, by osoby mogące udzielić potrzebnej pomocy mogły szybko skontaktować się i zając się problemem.",
    },
    sectionFive: {
      title: "Czy ogłoszenia są usuwane automatycznie?",
      description:
        "Tak, po 24 godzinach każde ogłoszenie zostaje automatycznie usunięte. Jeśli Twoje zgłoszenie zostało już wcześniej rozwiązane - np. udało Ci się znaleźć transport po kilku godzinach od wystawienia zgłoszenia - możesz je samodzielnie usunąć.",
    },
    sectionSix: {
      title: "Gdzie znajdę regulamin serwisu?",
      description: "Regulamin serwisu znajdziesz",
      here: "tutaj",
    },
    sectionSeven: {
      title: "Czy korzystanie z platformy jest płatne?",
      description:
        "Nie, platforma jest całkowicie bezpłatna. Naszym celem jest sprawne organizowanie pomocy humanitarnej.",
    },
    sectionEight: {
      title: "Do czego służą kategorie?",
      description:
        "Kategorie pozwalają na precyzyjniejsze określenie rodzaju potrzebnej pomocy, a także sprawniejszemu wyszukiwaniu potencjalnych zgłoszeń dla osób chcących pomóc.",
    },
  },
  filters: {
    selectNeeds: "Wybierz rodzaj potrzeby",
    all: "Wszystkie",
  },
  menu: {
    open: "Open main menu",
  },
  metaData: {
    title: "Pomóżmy Ukrainie!",
    description:
      "Szybkie i proste zarządzanie organizacją pomocy humanitarnej. Pomagasz innym? Pomożemy Ci zorganizować tę pomoc!",
  },
}

const UA: Translation = {
  "/tickets/add": "Повідомте про потребу",
  "/tickets/active": "Потреби",
  "/tickets/active/mine": "Мої потреби",
  "/tickets/inactive/mine": "Мої неактивні потреби",
  "/sign-in": "Увійти",
  "/contact": "Сконтактуватись",
  "/faq": "FAQ",

  generic: {
    yes: "yes",
    no: "no",
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
    },
    "add-ticket": {
      "add-need": "Додай потребу",
      adults: "Дорислих",
      "adults-hint": "Дорослих більш ніж 12 років",
      children: "Діти",
      "has-pets": "Тварини",
      "children-hint": "Дітей менш ніж 12 років",
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
    "with-us": "Współpracują z nami",
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
      title: "<miss_translation>", // Czym jest https://potrzeby-ua.org?
      description: "<miss_translation>",
    },
    sectionTwo: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
    sectionThree: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
    sectionFour: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
    sectionFive: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
    sectionSix: {
      title: "<miss_translation>",
      description: "<miss_translation>",
      here: "<miss_translation>",
    },
    sectionSeven: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
    sectionEight: {
      title: "<miss_translation>",
      description: "<miss_translation>",
    },
  },
  filters: {
    selectNeeds: "Виберіть тип потреби",
    all: "всі",
  },
  menu: {
    open: "Open main menu",
  },
  metaData: {
    title: "Допоможемо Україні!",
    description:
      "Швидке та просте управління організацією гуманітарної допомоги. Ви допомагаєте іншим? Ми допоможемо вам організувати цю допомогу!",
  },
}

const getPL = () => PL
type Translation = ReturnType<typeof getPL>

export const translations = {
  "pl-PL": PL,
  "uk-UA": UA,
}
