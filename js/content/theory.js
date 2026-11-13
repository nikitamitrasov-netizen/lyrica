window.LYRICA_THEORY = [
  {
    id: "present-simple",
    title: "Present Simple",
    ru: "Настоящее простое",
    level: "a1",
    summary: "Время для регулярных действий, привычек, фактов и расписаний. Оно показывает то, что происходит всегда, обычно или по плану, а не прямо сейчас.",
    formula: [
      "+ I work here. / She works here.",
      "− I do not work here. / She does not work here.",
      "? Do you work here? / Does she work here?"
    ],
    rules: [
      "В 3-м лице единственного числа к смысловому глаголу добавляется -s: he plays, she watches, it goes.",
      "Отрицание и вопрос строятся с do/does; после does смысловой глагол стоит без -s: Does she play?",
      "Маркеры: always, usually, often, sometimes, never, every day, on Mondays.",
      "С глаголами состояния (know, like, need, seem) обычно не используется Continuous."
    ],
    examples: [
      { en: "I take the same bus to school every morning.", ru: "Каждое утро я езжу в школу на одном и том же автобусе." },
      { en: "She doesn’t drink coffee after six.", ru: "Она не пьёт кофе после шести." },
      { en: "Does your brother play the guitar?", ru: "Твой брат играет на гитаре?" }
    ],
    mistakes: [
      { wrong: "She go to work by train.", right: "She goes to work by train.", why: "В 3-м лице единственного числа нужна форма с -s." },
      { wrong: "He doesn’t likes jazz.", right: "He doesn’t like jazz.", why: "После doesn’t глагол теряет -s." }
    ],
    check: {
      q: "Выбери правильную форму: My sister ___ at a hospital.",
      options: ["work", "works", "is work"],
      answer: 1,
      explain: "С подлежащим my sister (3-е лицо единственного числа) глагол получает -s: works."
    },
    related: ["present-continuous", "adverbs-frequency", "past-simple"]
  },
  {
    id: "present-continuous",
    title: "Present Continuous",
    ru: "Настоящее длительное",
    level: "a1",
    summary: "Действие происходит прямо сейчас, в этот период или по договорённости в ближайшем будущем. Форма подчёркивает процесс, временность и незавершённость.",
    formula: [
      "+ I am working now.",
      "− She is not working today.",
      "? Are you listening? / What are they doing?",
      "+ We are meeting at seven."
    ],
    rules: [
      "Форма: am/is/are + глагол с окончанием -ing.",
      "Маркеры: now, at the moment, today, this week, Look!, Listen!",
      "Present Continuous — временная ситуация, Present Simple — постоянная привычка или факт.",
      "Глаголы состояния (know, want, believe, belong) обычно не ставятся в Continuous.",
      "При добавлении -ing конечная e часто отпадает (make — making), а согласная может удваиваться (run — running)."
    ],
    examples: [
      { en: "The kids are building a tent in the garden.", ru: "Дети строят палатку в саду." },
      { en: "I’m staying with my aunt this week.", ru: "На этой неделе я живу у тёти." },
      { en: "Why is the bus moving so slowly?", ru: "Почему автобус едет так медленно?" }
    ],
    mistakes: [
      { wrong: "She is wanting a new phone.", right: "She wants a new phone.", why: "Want — глагол состояния, поэтому используется Present Simple." },
      { wrong: "They are go to the cinema.", right: "They are going to the cinema.", why: "После am/is/are нужен глагол с -ing, а не начальная форма." }
    ],
    check: {
      q: "Какое предложение описывает временную ситуацию?",
      options: ["I live in Moscow.", "I am living in Moscow this month.", "I lived in Moscow."],
      answer: 1,
      explain: "Оборот this month показывает временность, поэтому нужен Present Continuous."
    },
    related: ["present-simple", "future-forms"]
  },
  {
    id: "past-simple",
    title: "Past Simple",
    ru: "Прошедшее простое",
    level: "a2",
    summary: "Завершённое действие в прошлом с известным или подразумеваемым временем. Регулярная форма образуется прибавлением -ed, а неправильные глаголы нужно запоминать.",
    formula: [
      "+ I visited the museum. / She wrote a letter.",
      "− We did not see the film.",
      "? Did you call him? / Where did she go?"
    ],
    rules: [
      "Время действия закончилось: yesterday, last week, in 2020, two days ago.",
      "Вопрос и отрицание строятся с did + начальная форма глагола.",
      "Неправильные глаголы имеют особую форму прошедшего времени: go — went, see — saw, take — took.",
      "Present Perfect не используется с точным законченным временем: I saw him yesterday, а не I have seen him yesterday."
    ],
    examples: [
      { en: "We walked to the station in the rain.", ru: "Мы шли до станции под дождём." },
      { en: "She didn’t answer my message.", ru: "Она не ответила на моё сообщение." },
      { en: "Did they enjoy the concert?", ru: "Им понравился концерт?" }
    ],
    mistakes: [
      { wrong: "I didn’t went home.", right: "I didn’t go home.", why: "После did/didn’t используется начальная форма глагола." },
      { wrong: "She has called me yesterday.", right: "She called me yesterday.", why: "Слово yesterday указывает на законченное прошлое, поэтому нужен Past Simple." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ you see the message yesterday?",
      options: ["Did", "Have", "Were"],
      answer: 0,
      explain: "Для вопроса о законченном действии в прошлом нужен вспомогательный глагол did."
    },
    related: ["past-continuous", "present-perfect", "used-to"]
  },
  {
    id: "past-continuous",
    title: "Past Continuous",
    ru: "Прошедшее длительное",
    level: "a2",
    summary: "Процесс, который шёл в определённый момент в прошлом или был прерван другим действием. Форма создаёт фон события и показывает его незавершённость.",
    formula: [
      "+ I was reading at nine.",
      "− They weren’t sleeping when I came in.",
      "? Was she cooking? / What were you doing?"
    ],
    rules: [
      "Форма: was/were + глагол с -ing.",
      "Маркеры: at 8 p.m. yesterday, while, when, all evening.",
      "While обычно вводит длительное действие, when — короткое событие на его фоне.",
      "Для последовательности завершённых событий нужен Past Simple, а не Past Continuous.",
      "Глаголы состояния обычно не употребляются в Continuous."
    ],
    examples: [
      { en: "I was waiting for the bus when my phone rang.", ru: "Я ждал автобус, когда зазвонил телефон." },
      { en: "They were playing cards while the rain fell outside.", ru: "Они играли в карты, пока на улице шёл дождь." },
      { en: "What were you thinking about during the song?", ru: "О чём ты думал во время песни?" }
    ],
    mistakes: [
      { wrong: "I was read when he called.", right: "I was reading when he called.", why: "После was нужен глагол с -ing." },
      { wrong: "While I cooked, the phone rang.", right: "While I was cooking, the phone rang.", why: "While подчёркивает длительный процесс, который прервали." }
    ],
    check: {
      q: "Выбери правильный вариант: While we ___ dinner, the lights went out.",
      options: ["were having", "had", "have had"],
      answer: 0,
      explain: "Ужин был длительным фоном для короткого события, поэтому нужен Past Continuous."
    },
    related: ["past-simple", "narrative-tenses"]
  },
  {
    id: "present-perfect",
    title: "Present Perfect",
    ru: "Настоящее совершённое",
    level: "a2",
    summary: "Связывает прошлое с настоящим: важен результат сейчас, жизненный опыт или период, который ещё не закончился. Точная дата в прошлом обычно не называется.",
    formula: [
      "+ I have finished the letter.",
      "− She hasn’t arrived yet.",
      "? Have you ever been to London? / How long has he lived here?"
    ],
    rules: [
      "Форма: have/has + третья форма глагола (V3).",
      "Маркеры: already, just, yet, ever, never, for, since, so far.",
      "For указывает длительность, since — точку начала: for two years, since 2020.",
      "Нельзя использовать с yesterday, last year, ago и другими законченными отрезками прошлого.",
      "Present Perfect не сообщает, когда всё произошло; Past Simple сообщает или подразумевает время."
    ],
    examples: [
      { en: "I have lost my ticket, so I can’t get in.", ru: "Я потерял билет, поэтому не могу войти." },
      { en: "We have known each other since school.", ru: "Мы знакомы со школы." },
      { en: "Has she sent the email yet?", ru: "Она уже отправила письмо?" }
    ],
    mistakes: [
      { wrong: "I have seen him yesterday.", right: "I saw him yesterday.", why: "Yesterday — законченное время в прошлом, поэтому нужен Past Simple." },
      { wrong: "She has went home.", right: "She has gone home.", why: "После have/has используется третья форма глагола: go — went — gone." }
    ],
    check: {
      q: "Выбери правильный вариант: We ___ this film three times.",
      options: ["saw", "have seen", "are seeing"],
      answer: 1,
      explain: "Речь идёт о жизненном опыте без точной даты, поэтому используется Present Perfect."
    },
    related: ["past-simple", "past-continuous", "narrative-tenses"]
  },
  {
    id: "future-forms",
    title: "Future Forms",
    ru: "Способы выразить будущее",
    level: "a2",
    summary: "Будущее в английском передаётся разными формами, и выбор зависит от значения: спонтанное решение, план, договорённость или расписание. Одна форма не заменяет все остальные: смысл подсказывает, какую конструкцию выбрать.",
    formula: [
      "+ I will call you later. / We are going to move.",
      "− She isn’t going to stay.",
      "? Will you help me? / Are they leaving at six?"
    ],
    rules: [
      "Will — спонтанное решение, обещание, предсказание или предложение помощи.",
      "Be going to + инфинитив — заранее продуманное намерение или вывод по видимым признакам.",
      "Present Continuous — договорённость с конкретным временем и местом: I’m meeting Anna at five.",
      "Present Simple — расписание, график, программа: The train leaves at 7:15.",
      "После when, if, as soon as, until будущее выражается настоящим временем, а не will."
    ],
    examples: [
      { en: "I’ll get the door — I’m nearest.", ru: "Я открою дверь — мне ближе всех." },
      { en: "We’re going to paint the kitchen next month.", ru: "В следующем месяце мы собираемся покрасить кухню." },
      { en: "They are playing at the club on Friday.", ru: "В пятницу они играют в клубе." }
    ],
    mistakes: [
      { wrong: "When I will arrive, I will call you.", right: "When I arrive, I will call you.", why: "В придаточном времени после when будущее не ставится." },
      { wrong: "Look at those clouds! It will rain.", right: "Look at those clouds! It is going to rain.", why: "Видимые признаки указывают на неизбежное ближайшее будущее, поэтому нужна be going to." }
    ],
    check: {
      q: "Выбери правильный вариант: The train ___ at 7:15 according to the timetable.",
      options: ["leaves", "is leaving", "will leave"],
      answer: 0,
      explain: "Расписание и график передаются через Present Simple."
    },
    related: ["present-continuous", "present-simple", "conditionals"]
  },
  {
    id: "modals",
    title: "Modal Verbs",
    ru: "Модальные глаголы",
    level: "a1",
    summary: "Модальные глаголы показывают отношение говорящего к действию: возможность, разрешение, обязанность, совет или вероятность. Они не изменяются по лицам и сочетаются с инфинитивом без to.",
    formula: [
      "+ You should rest. / She can swim.",
      "− We must not be late. / He cannot come.",
      "? May I open the window? / Could you help me?"
    ],
    rules: [
      "После модального глагола нужен инфинитив без to: can swim, must go. Исключения — have to и ought to.",
      "Модальные глаголы не получают -s, -ed и не требуют do в вопросе: Can she swim?",
      "Must — сильная обязанность со стороны говорящего; have to — обязанность по обстоятельствам.",
      "Mustn’t означает запрет, а don’t have to — отсутствие необходимости.",
      "Прошлые формы: can — could, must — had to, may — might."
    ],
    examples: [
      { en: "You should drink more water before the concert.", ru: "Тебе стоит пить больше воды перед концертом." },
      { en: "We had to leave early because of the storm.", ru: "Нам пришлось уйти рано из-за бури." },
      { en: "Could I borrow your pen for a moment?", ru: "Можно мне одолжить твою ручку на минуту?" }
    ],
    mistakes: [
      { wrong: "She can sings very well.", right: "She can sing very well.", why: "После модального глагола не ставится окончание -s." },
      { wrong: "You must to wear a seat belt.", right: "You must wear a seat belt.", why: "После must нужен инфинитив без to." }
    ],
    check: {
      q: "Выбери правильный вариант: You ___ smoke here; it’s forbidden.",
      options: ["don’t have to", "mustn’t", "shouldn’t"],
      answer: 1,
      explain: "Запрет передаётся через mustn’t; don’t have to значит «не обязательно»."
    },
    related: ["imperatives", "conditionals", "questions"]
  },
  {
    id: "imperatives",
    title: "Imperatives",
    ru: "Повелительное наклонение",
    level: "a1",
    summary: "Повелительное наклонение используется для команд, инструкций, приглашений и советов. Оно обращено к собеседнику, поэтому подлежащее обычно не называется.",
    formula: [
      "+ Turn left at the corner.",
      "− Don’t forget your keys.",
      "? Would you open the window, please?"
    ],
    rules: [
      "Утвердительная форма совпадает с начальной формой глагола: Sit down.",
      "Отрицательная форма: do not/don’t + начальная форма глагола.",
      "Please, could you, would you делают просьбу вежливее.",
      "Let’s + инфинитив выражает совместное предложение: Let’s start.",
      "Повелительное наклонение не имеет времени и не требует подлежащего."
    ],
    examples: [
      { en: "Take the second road and follow the signs.", ru: "Сверни на вторую дорогу и следуй за указателями." },
      { en: "Don’t worry about the small mistakes.", ru: "Не переживай из-за мелких ошибок." },
      { en: "Let’s listen to the song one more time.", ru: "Давайте послушаем песню ещё раз." }
    ],
    mistakes: [
      { wrong: "Don’t to run in the hallway.", right: "Don’t run in the hallway.", why: "После don’t нужен инфинитив без to." },
      { wrong: "Let’s to go outside.", right: "Let’s go outside.", why: "После let’s используется начальная форма глагола без to." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ worry about the test.",
      options: ["Not", "Don’t", "Doesn’t"],
      answer: 1,
      explain: "Отрицательное повелительное предложение начинается с Don’t + начальная форма глагола."
    },
    related: ["modals", "questions"]
  },
  {
    id: "articles-nouns",
    title: "Articles and Nouns",
    ru: "Артикли и существительные",
    level: "a1",
    summary: "Артикль помогает понять, идёт ли речь о чём-то новом, уже известном или о категории в целом. Выбор a/an/the/нулевого артикля зависит от исчисляемости, числа и контекста.",
    formula: [
      "+ I saw a dog. The dog was wet.",
      "− There isn’t any milk. / She doesn’t have a car.",
      "? Is there a bank near here? / Do you like music?"
    ],
    rules: [
      "A/an — один любой предмет, впервые упомянутый, только с исчисляемым существительным в единственном числе.",
      "An ставится перед гласным звуком: an hour, an apple; a — перед согласным: a university.",
      "The — конкретный предмет, уже известный, единственный в контексте или упомянутый повторно.",
      "Нулевой артикль — множественное число и неисчисляемые существительные в общем значении: Dogs are loyal. Water is vital.",
      "С именами собственными артикль обычно не нужен, но есть устойчивые исключения: the Thames, the Alps."
    ],
    examples: [
      { en: "I bought a book and a cup. The book was a gift.", ru: "Я купил книгу и чашку. Книга была подарком." },
      { en: "She plays the piano, but she doesn’t own a piano.", ru: "Она играет на пианино, но у неё нет пианино." },
      { en: "Honesty matters more than a perfect answer.", ru: "Честность важнее идеального ответа." }
    ],
    mistakes: [
      { wrong: "I need an advice.", right: "I need some advice.", why: "Advice — неисчисляемое существительное, поэтому a/an с ним не используется." },
      { wrong: "She is teacher.", right: "She is a teacher.", why: "Перед названием профессии в единственном числе нужен артикль a/an." }
    ],
    check: {
      q: "Выбери правильный вариант: We stayed in ___ hotel near the station. ___ hotel was clean.",
      options: ["a / The", "the / A", "a / A"],
      answer: 0,
      explain: "При первом упоминании нужен a, при повторном — the."
    },
    related: ["countable-uncountable", "questions"]
  },
  {
    id: "questions",
    title: "Questions",
    ru: "Вопросительные предложения",
    level: "a1",
    summary: "Английский вопрос обычно требует вспомогательного глагола перед подлежащим. Исключение — вопросы к подлежащему, где порядок слов остаётся прямым.",
    formula: [
      "? Do you like tea? / Does he work here?",
      "? Where did they go?",
      "? Who called you?"
    ],
    rules: [
      "Общий вопрос: вспомогательный глагол + подлежащее + смысловой глагол: Are you ready?",
      "Специальный вопрос: вопросительное слово + вспомогательный глагол + подлежащее: Where are you going?",
      "Вопрос к подлежащему не использует do/does/did: Who called you?",
      "Вопросительное слово может быть фразой: How long have you lived here?",
      "В косвенных вопросах порядок слов прямой: Could you tell me where he lives?"
    ],
    examples: [
      { en: "Do you usually listen to music while you work?", ru: "Ты обычно слушаешь музыку во время работы?" },
      { en: "Where did you find that old record?", ru: "Где ты нашёл эту старую пластинку?" },
      { en: "Who wrote the message on the wall?", ru: "Кто написал сообщение на стене?" }
    ],
    mistakes: [
      { wrong: "Where you are going?", right: "Where are you going?", why: "В специальном вопросе вспомогательный глагол ставится перед подлежащим." },
      { wrong: "Who did call you?", right: "Who called you?", why: "Who — подлежащее, поэтому вспомогательный did не нужен." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ you know the answer?",
      options: ["Do", "Are", "Have"],
      answer: 0,
      explain: "Know — смысловой глагол в Present Simple, поэтому вопрос строится с Do."
    },
    related: ["question-tags", "reported-speech", "present-simple"]
  },
  {
    id: "adjectives-adverbs",
    title: "Adjectives and Adverbs",
    ru: "Прилагательные и наречия",
    level: "a1",
    summary: "Прилагательное описывает существительное, а наречие — действие, признак или другое наречие. В английском их формы и место в предложении различаются.",
    formula: [
      "+ a quiet room / She speaks quietly.",
      "− He isn’t careful. / He doesn’t drive carefully.",
      "? Is the soup hot? / Does she work hard?"
    ],
    rules: [
      "Прилагательное стоит перед существительным или после глагола-связки: a warm voice, the voice is warm.",
      "Наречие обычно образуется прибавлением -ly: careful — carefully, quiet — quietly.",
      "После глаголов чувств (look, sound, smell, taste, feel) используется прилагательное: It sounds beautiful.",
      "Некоторые формы совпадают: fast, hard, late; good образует наречие well, а hardly значит «едва».",
      "Наречие не ставится между глаголом и его прямым дополнением: She speaks English well."
    ],
    examples: [
      { en: "Her voice sounds calm even in a difficult song.", ru: "Её голос звучит спокойно даже в сложной песне." },
      { en: "He answered the question politely.", ru: "Он вежливо ответил на вопрос." },
      { en: "The train moved slowly through the fog.", ru: "Поезд медленно двигался сквозь туман." }
    ],
    mistakes: [
      { wrong: "She sings beautiful.", right: "She sings beautifully.", why: "Наречие описывает действие sing, поэтому нужна форма beautifully." },
      { wrong: "He works hardly every day.", right: "He works hard every day.", why: "Hard как наречие значит «усердно»; hardly значит «едва»." }
    ],
    check: {
      q: "Выбери правильное слово: The soup smells ___.",
      options: ["deliciously", "delicious", "deliciousness"],
      answer: 1,
      explain: "После глагола-связки smells описывается сам суп, поэтому нужно прилагательное delicious."
    },
    related: ["comparatives", "adverbs-frequency"]
  },
  {
    id: "prepositions-time",
    title: "Prepositions of Time",
    ru: "Предлоги времени",
    level: "a1",
    summary: "Предлоги at, on и in помогают назвать точное время, день или более длинный период. Их выбор зависит от масштаба времени и устойчивых сочетаний.",
    formula: [
      "+ at 7 o’clock, on Friday, in July",
      "− I don’t work on Sundays. / We didn’t meet in May.",
      "? Are you free at noon? / Does the class start on Monday?"
    ],
    rules: [
      "At — точное время и устойчивые сочетания: at 7:30, at noon, at midnight, at night.",
      "On — дни, даты и праздники: on Monday, on 5 May, on my birthday.",
      "In — месяцы, годы, сезоны и части дня: in July, in 2024, in winter, in the morning. Исключение — at night.",
      "С next, last, this, every предлог не нужен: next week, last summer, every Friday.",
      "В британском варианте at the weekend, в американском on the weekend."
    ],
    examples: [
      { en: "The rehearsal starts at six on Thursday.", ru: "Репетиция начинается в шесть в четверг." },
      { en: "We met in 2019 and became friends at once.", ru: "Мы познакомились в 2019 году и сразу подружились." },
      { en: "I’ll call you on Saturday morning.", ru: "Я позвоню тебе в субботу утром." }
    ],
    mistakes: [
      { wrong: "I will call you in Monday.", right: "I will call you on Monday.", why: "С днями недели используется on." },
      { wrong: "We met at 2020.", right: "We met in 2020.", why: "С годами используется in." }
    ],
    check: {
      q: "Выбери правильный вариант: The concert starts ___ 8 p.m. ___ Friday.",
      options: ["at / on", "on / at", "in / on"],
      answer: 0,
      explain: "Точное время требует at, а день недели — on."
    },
    related: ["present-simple", "questions", "articles-nouns"]
  },
  {
    id: "comparatives",
    title: "Comparatives and Superlatives",
    ru: "Сравнительная и превосходная степень",
    level: "a2",
    summary: "Сравнительная степень сравнивает два объекта, а превосходная выделяет один среди всех. Форма зависит от длины прилагательного и его значения.",
    formula: [
      "+ She is taller than her brother. / This book is more interesting.",
      "− He isn’t as patient as his sister.",
      "? Is your car faster than mine? / Which is the best?"
    ],
    rules: [
      "Короткие прилагательные получают -er/-est: warm — warmer — the warmest.",
      "Длинные прилагательные сочетаются с more/most: useful — more useful — the most useful.",
      "Для сравнения используется than; для равенства — as ... as; для неравенства — not as ... as.",
      "Неправильные формы: good — better — the best, bad — worse — the worst, far — farther/further — the farthest/furthest.",
      "Нельзя соединять две сравнительные формы: more taller неверно."
    ],
    examples: [
      { en: "This melody is simpler than the first one.", ru: "Эта мелодия проще первой." },
      { en: "The final verse is the most moving part of the song.", ru: "Последний куплет — самая трогательная часть песни." },
      { en: "My old guitar sounds as warm as a new one.", ru: "Моя старая гитара звучит так же тепло, как новая." }
    ],
    mistakes: [
      { wrong: "She is more taller than me.", right: "She is taller than me.", why: "Taller уже является сравнительной формой; more с ней не нужно." },
      { wrong: "This is the most easy exercise.", right: "This is the easiest exercise.", why: "Easy — короткое прилагательное, поэтому превосходная степень образуется с -est." }
    ],
    check: {
      q: "Выбери правильный вариант: This test is ___ than the last one.",
      options: ["more difficult", "most difficult", "difficult"],
      answer: 0,
      explain: "Difficult — длинное прилагательное, поэтому сравнительная степень строится с more."
    },
    related: ["adjectives-adverbs", "countable-uncountable"]
  },
  {
    id: "countable-uncountable",
    title: "Countable and Uncountable Nouns",
    ru: "Исчисляемые и неисчисляемые существительные",
    level: "a2",
    summary: "Исчисляемые существительные можно посчитать и поставить во множественное число, а неисчисляемые обычно называют вещество или идею. От этого зависят артикли и кванторы.",
    formula: [
      "+ two books, a chair, some water",
      "− There isn’t much time. / We don’t have many chairs.",
      "? How many eggs? / How much sugar?"
    ],
    rules: [
      "Исчисляемые существительные имеют единственное и множественное число: a song — two songs.",
      "С исчисляемыми используются many, a few, a number of; с неисчисляемыми — much, a little, an amount of.",
      "Some обычно в утверждениях и предложениях, any — в вопросах и отрицаниях.",
      "В английском неисчисляемы advice, information, furniture, news, luggage, хотя в русском они могут быть исчисляемыми.",
      "Для порции неисчисляемого используется конструкция a piece of, a bottle of, a slice of."
    ],
    examples: [
      { en: "There are a few seats left near the stage.", ru: "У сцены осталось несколько мест." },
      { en: "We don’t have much time before the show.", ru: "У нас мало времени до шоу." },
      { en: "She gave me a useful piece of advice.", ru: "Она дала мне полезный совет." }
    ],
    mistakes: [
      { wrong: "I need some informations.", right: "I need some information.", why: "Information — неисчисляемое существительное, у него нет формы informations." },
      { wrong: "How much apples do we have?", right: "How many apples do we have?", why: "Apples — исчисляемое существительное во множественном числе, поэтому нужен many." }
    ],
    check: {
      q: "Выбери правильный вариант: There are only ___ chairs in the room.",
      options: ["a little", "a few", "much"],
      answer: 1,
      explain: "Chairs — исчисляемое существительное во множественном числе, поэтому используется a few."
    },
    related: ["articles-nouns", "comparatives"]
  },
  {
    id: "adverbs-frequency",
    title: "Adverbs of Frequency",
    ru: "Наречия частотности",
    level: "a2",
    summary: "Наречия частотности показывают, как часто происходит действие: от always до never. Их место зависит от типа глагола и вспомогательных форм.",
    formula: [
      "+ I always walk to work.",
      "− She never eats meat.",
      "? Do you often go there? / Are they usually late?"
    ],
    rules: [
      "Перед смысловым глаголом: I often listen to music.",
      "После глагола be: She is usually calm.",
      "Между вспомогательным и смысловым глаголом: He has never been late.",
      "Шкала частотности: always — usually — often — sometimes — occasionally — rarely — never.",
      "Never и hardly ever уже содержат отрицание, поэтому не сочетаются с don’t/doesn’t: I never smoke."
    ],
    examples: [
      { en: "I usually rehearse in the evening.", ru: "Обычно я репетирую вечером." },
      { en: "She has never sung this song in public.", ru: "Она никогда не пела эту песню на публике." },
      { en: "Do you sometimes forget the words?", ru: "Ты иногда забываешь слова?" }
    ],
    mistakes: [
      { wrong: "She goes always to the gym.", right: "She always goes to the gym.", why: "Наречие частотности стоит перед смысловым глаголом." },
      { wrong: "I don’t never drink coffee.", right: "I never drink coffee.", why: "Never уже отрицательное, двойное отрицание здесь не нужно." }
    ],
    check: {
      q: "Выбери правильный вариант: He ___ late for class.",
      options: ["is usually", "usually is", "usually"],
      answer: 0,
      explain: "После глагола be наречие частотности ставится после него: is usually late."
    },
    related: ["present-simple", "adjectives-adverbs"]
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs",
    ru: "Фразовые глаголы",
    level: "b1",
    summary: "Фразовый глагол состоит из глагола и частицы, и его значение часто отличается от значения исходного глагола. Одни глаголы разделяются дополнением, другие — нет.",
    formula: [
      "+ We set off at dawn. / She looked after her sister.",
      "− He didn’t give up after the first try.",
      "? Can you turn the music down? / Who looks after the dog?"
    ],
    rules: [
      "Значение фразового глагола нужно запоминать целиком: give up — сдаваться, run into — случайно встретить.",
      "Разделяемые глаголы ставят местоимение между глаголом и частицей: turn it off, а не turn off it.",
      "С существительным возможны оба порядка: turn off the light / turn the light off.",
      "Неразделяемые глаголы не разрываются: look after her, а не look her after.",
      "Есть трёхчастные глаголы: put up with — мириться с чем-то."
    ],
    examples: [
      { en: "The meeting was called off at the last minute.", ru: "Встречу отменили в последнюю минуту." },
      { en: "I ran into an old friend at the station.", ru: "Я случайно встретил старого друга на станции." },
      { en: "Please put your coat on before you leave.", ru: "Пожалуйста, надень пальто перед уходом." }
    ],
    mistakes: [
      { wrong: "Please turn off it.", right: "Please turn it off.", why: "С местоимением разделяемый фразовый глагол обязательно разрывается." },
      { wrong: "She looks after to her brother.", right: "She looks after her brother.", why: "После look after дополнение идёт без предлога to." }
    ],
    check: {
      q: "Выбери правильный вариант: I can’t hear you. Could you turn the radio ___?",
      options: ["up", "off", "after"],
      answer: 0,
      explain: "Turn up значит «сделать громче»; по смыслу нужен именно этот глагол."
    },
    related: ["gerund-infinitive", "used-to", "register-style"]
  },
  {
    id: "wish-past-perfect",
    title: "Wish and Past Perfect",
    ru: "Конструкции с wish и Past Perfect",
    level: "b1",
    summary: "Конструкция wish выражает сожаление или нереальное желание. Wish + Past Perfect говорит о прошлом, которое уже нельзя изменить, а wish + Past Simple — о настоящем.",
    formula: [
      "+ I wish I had studied harder.",
      "− I wish she hadn’t left so early.",
      "? Do you wish you had taken that job?"
    ],
    rules: [
      "Wish + Past Simple — сожаление о настоящем: I wish I knew the answer.",
      "Wish + Past Perfect (had + V3) — сожаление о прошлом: I wish I had listened.",
      "Wish + would — желание изменить чужое поведение или раздражение: I wish you would stop.",
      "If only звучит сильнее, но использует те же формы: If only I had known.",
      "Для реального будущего используется hope + Present/Future, а не wish."
    ],
    examples: [
      { en: "I wish I had learned to read music as a child.", ru: "Жаль, что я не научился читать ноты в детстве." },
      { en: "She wishes she hadn’t said those words.", ru: "Она сожалеет, что сказала те слова." },
      { en: "I wish we had more time to rehearse.", ru: "Хотелось бы, чтобы у нас было больше времени на репетицию." }
    ],
    mistakes: [
      { wrong: "I wish I studied harder last year.", right: "I wish I had studied harder last year.", why: "Речь идёт о прошлом, поэтому нужен Past Perfect после wish." },
      { wrong: "I wish she will come to the show.", right: "I wish she would come to the show.", why: "Для желаемого изменения ситуации после wish используется would, а не will." }
    ],
    check: {
      q: "Выбери правильный вариант: I wish I ___ more time to practise before the concert.",
      options: ["had", "have", "will have"],
      answer: 0,
      explain: "Здесь выражено нереальное желание о настоящем, поэтому после wish нужен Past Simple: had."
    },
    related: ["conditionals", "past-simple", "present-perfect"]
  },
  {
    id: "gerund-infinitive",
    title: "Gerund and Infinitive",
    ru: "Герундий и инфинитив",
    level: "b1",
    summary: "После некоторых глаголов нужен герундий (-ing), после других — инфинитив с to, а иногда выбор меняет смысл. Предлоги всегда требуют герундия.",
    formula: [
      "+ I enjoy cooking. / She decided to wait.",
      "− He avoids answering questions. / They didn’t want to leave.",
      "? Do you mind opening the window? / What do you plan to do?"
    ],
    rules: [
      "Enjoy, finish, mind, suggest, avoid, keep требуют -ing: enjoy singing.",
      "Want, decide, hope, plan, promise, agree требуют to + инфинитив: decide to go.",
      "После предлога всегда -ing: good at singing, interested in learning.",
      "Stop + to do — остановиться, чтобы что-то сделать; stop + doing — прекратить действие.",
      "После модальных глаголов, make и let используется инфинитив без to."
    ],
    examples: [
      { en: "I enjoy writing short songs about ordinary days.", ru: "Мне нравится писать короткие песни об обычных днях." },
      { en: "She suggested meeting after the rehearsal.", ru: "Она предложила встретиться после репетиции." },
      { en: "He stopped to check the tuning of his guitar.", ru: "Он остановился, чтобы проверить настройку гитары." }
    ],
    mistakes: [
      { wrong: "I enjoy to read poetry.", right: "I enjoy reading poetry.", why: "После enjoy используется герундий, а не to-инфинитив." },
      { wrong: "She suggested to go home.", right: "She suggested going home.", why: "Suggest требует герундия; конструкция suggest to неверна." }
    ],
    check: {
      q: "В предложении «He stopped ___ because he was tired» нужно значение «он перестал работать».",
      options: ["to work", "working", "work"],
      answer: 1,
      explain: "Stop + -ing значит «прекратить действие»; stop to work значило бы «остановиться, чтобы поработать»."
    },
    related: ["conditionals", "phrasal-verbs", "passive-voice"]
  },
  {
    id: "conditionals",
    title: "Conditionals",
    ru: "Условные предложения",
    level: "b1",
    summary: "Условные предложения показывают, при каком условии возможно действие. Тип конструкции зависит от реальности условия и времени, к которому оно относится.",
    formula: [
      "+ If it rains, we will stay in. / If I were you, I would apologize.",
      "− If you don’t hurry, we won’t catch the train.",
      "? What would you do if you lost your phone?"
    ],
    rules: [
      "Zero Conditional: if + Present Simple, Present Simple — общая истина: If you heat ice, it melts.",
      "First Conditional: if + Present Simple, will + инфинитив — реальное будущее.",
      "Second Conditional: if + Past Simple, would + инфинитив — нереальное настоящее или будущее.",
      "Third Conditional: if + Past Perfect, would have + V3 — нереальное прошлое.",
      "В придаточном с if не используется will; unless значит «если не»."
    ],
    examples: [
      { en: "If you practise every day, your pronunciation will improve.", ru: "Если ты будешь заниматься каждый день, твоё произношение улучшится." },
      { en: "If I had more time, I would learn the piano.", ru: "Если бы у меня было больше времени, я бы учился играть на пианино." },
      { en: "If they had left earlier, they would have caught the train.", ru: "Если бы они вышли раньше, они бы успели на поезд." }
    ],
    mistakes: [
      { wrong: "If I will see him, I will tell him.", right: "If I see him, I will tell him.", why: "В условии после if Future не используется." },
      { wrong: "If I would have known, I would have helped.", right: "If I had known, I would have helped.", why: "В Third Conditional в условии нужен Past Perfect, а не would have." }
    ],
    check: {
      q: "Выбери правильный вариант: If I ___ you, I would take the offer.",
      options: ["were", "am", "will be"],
      answer: 0,
      explain: "В Second Conditional с I традиционно используется were: If I were you."
    },
    related: ["wish-past-perfect", "future-forms", "modals"]
  },
  {
    id: "used-to",
    title: "Used To",
    ru: "Конструкция used to",
    level: "b1",
    summary: "Used to + инфинитив описывает прошлую привычку или состояние, которых больше нет. Не путайте эту конструкцию с be used to, которая значит «привыкнуть к чему-то».",
    formula: [
      "+ I used to play chess with my grandfather.",
      "− She didn’t use to like spicy food.",
      "? Did you use to live here?"
    ],
    rules: [
      "Used to + начальная форма глагола обозначает регулярное действие или состояние в прошлом, которого уже нет.",
      "В отрицании и вопросе используется did + use to, без -d: didn’t use to, Did you use to...?",
      "Be used to + существительное или -ing значит «привыкнуть к»: I’m used to cold weather.",
      "Would тоже передаёт прошлые повторяющиеся действия, но не используется с состояниями: I would visit, но не I would know.",
      "У used to нет формы настоящего времени; для нынешней привычки нужен Present Simple."
    ],
    examples: [
      { en: "We used to meet in a tiny café after school.", ru: "Раньше мы встречались в маленьком кафе после школы." },
      { en: "He didn’t use to enjoy live music.", ru: "Раньше ему не нравилась живая музыка." },
      { en: "Did you use to sing in a choir?", ru: "Ты раньше пел в хоре?" }
    ],
    mistakes: [
      { wrong: "I am used to play football every day.", right: "I used to play football every day.", why: "Для прошлой привычки нужна конструкция used to + инфинитив, без am." },
      { wrong: "Did you used to have a bike?", right: "Did you use to have a bike?", why: "После did используется начальная форма use, а не used." }
    ],
    check: {
      q: "Выбери правильный вариант: There ___ a small bakery on this corner, but it closed last year.",
      options: ["used to be", "is used to being", "would be"],
      answer: 0,
      explain: "Конструкция used to be описывает прошлое состояние, которого больше нет."
    },
    related: ["past-simple", "gerund-infinitive", "narrative-tenses"]
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    ru: "Косвенная речь",
    level: "b1",
    summary: "Косвенная речь передаёт чужие слова без прямой цитаты. При переводе из прямой речи меняются местоимения, время, а иногда и указатели места и времени.",
    formula: [
      "+ She said that she was tired. / He told me to wait.",
      "− They said they didn’t know.",
      "? She asked where I lived. / He asked if I could help."
    ],
    rules: [
      "Если вводящий глагол в прошлом, время обычно сдвигается на шаг назад: is — was, will — would, have done — had done.",
      "Say не требует адресата, tell требует: say that..., tell somebody that...",
      "Меняются местоимения и указатели: now — then, today — that day, here — there, tomorrow — the next day.",
      "В косвенном вопросе прямой порядок слов и нет do/does/did: He asked where I lived.",
      "Сдвиг не обязателен, если слова всё ещё верны или передаются сразу: She says she is busy."
    ],
    examples: [
      { en: "He said that he had never seen the sea.", ru: "Он сказал, что никогда не видел моря." },
      { en: "She told us to meet her after the show.", ru: "Она велела нам встретиться с ней после шоу." },
      { en: "They asked whether the tickets were still available.", ru: "Они спросили, есть ли ещё билеты." }
    ],
    mistakes: [
      { wrong: "She said me that she was busy.", right: "She told me that she was busy.", why: "Tell требует адресата, say — нет; можно также She said that she was busy." },
      { wrong: "He asked where did I live.", right: "He asked where I lived.", why: "В косвенном вопросе используется прямой порядок слов и не нужен did." }
    ],
    check: {
      q: "Выбери правильный вариант: He told me ___ quiet during the recording.",
      options: ["to keep", "keep", "keeping"],
      answer: 0,
      explain: "После tell somebody в приказе используется to + инфинитив."
    },
    related: ["questions", "question-tags", "narrative-tenses"]
  },
  {
    id: "question-tags",
    title: "Question Tags",
    ru: "Разделительные вопросы",
    level: "b1",
    summary: "Короткий вопрос-хвостик присоединяется к утверждению или отрицанию, чтобы попросить подтверждение или вовлечь собеседника. Он повторяет вспомогательный глагол и подлежащее.",
    formula: [
      "+ She is a doctor, isn’t she?",
      "− They didn’t call, did they?",
      "? Let’s start, shall we?"
    ],
    rules: [
      "После утверждения ставится отрицательный хвостик, после отрицания — утвердительный.",
      "В хвостике используется тот же вспомогательный глагол, что и в предложении, и местоимение вместо подлежащего.",
      "Особый случай: I am ... , aren’t I?",
      "После повелительного наклонения используются will you/won’t you, после let’s — shall we.",
      "Падающая интонация ожидает согласия, восходящая превращает хвостик в настоящий вопрос."
    ],
    examples: [
      { en: "You have heard this song before, haven’t you?", ru: "Ты ведь слышал эту песню раньше?" },
      { en: "She doesn’t play the drums, does she?", ru: "Она ведь не играет на барабанах?" },
      { en: "Let’s take a short break, shall we?", ru: "Давайте сделаем короткий перерыв, хорошо?" }
    ],
    mistakes: [
      { wrong: "You are tired, are you?", right: "You are tired, aren’t you?", why: "После утверждения нужен отрицательный хвостик." },
      { wrong: "She can swim, doesn’t she?", right: "She can swim, can’t she?", why: "В хвостике повторяется модальный глагол can, а не вспомогательный does." }
    ],
    check: {
      q: "Выбери правильный вариант: They have finished, ___?",
      options: ["haven’t they", "don’t they", "didn’t they"],
      answer: 0,
      explain: "В предложении есть have, поэтому в отрицательном хвостике повторяется haven’t + they."
    },
    related: ["questions", "reported-speech", "modals"]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    ru: "Относительные придаточные",
    level: "b1",
    summary: "Относительное придаточное уточняет существительное и вводится словами who, which, that, whose, where или when. Запятые зависят от того, уточняет ли оно смысл или добавляет дополнительную информацию.",
    formula: [
      "+ The woman who called is my aunt.",
      "− The book which I bought wasn’t expensive.",
      "? Is this the place where you met?"
    ],
    rules: [
      "Who — для людей, which — для предметов и идей, that — для определяющих придаточных, where — для места, when — для времени.",
      "Whose показывает принадлежность: the singer whose voice we heard.",
      "Определяющее придаточное не выделяется запятыми и называет, о ком или о чём именно речь.",
      "Нераспространительное придаточное выделяется запятыми и не использует that: My brother, who lives in Berlin, is visiting.",
      "В определяющем придаточном who/which/that можно опустить, если они являются дополнением: the book I bought."
    ],
    examples: [
      { en: "The singer who wrote this line grew up near the sea.", ru: "Певица, которая написала эту строку, выросла у моря." },
      { en: "This is the studio where they recorded their first album.", ru: "Это студия, где они записали свой первый альбом." },
      { en: "My friend, whose brother plays bass, introduced us.", ru: "Мой друг, чей брат играет на басу, познакомил нас." }
    ],
    mistakes: [
      { wrong: "The man which lives next door is a pilot.", right: "The man who lives next door is a pilot.", why: "Для людей используется who, а не which." },
      { wrong: "My brother, that works in Berlin, is visiting.", right: "My brother, who works in Berlin, is visiting.", why: "В нераспространительном придаточном that не используется." }
    ],
    check: {
      q: "Выбери правильный вариант: This is the café ___ we first met.",
      options: ["which", "where", "who"],
      answer: 1,
      explain: "We first met указывает на место, поэтому нужно относительное слово where."
    },
    related: ["participle-clauses", "cleft-sentences", "questions"]
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    ru: "Страдательный залог",
    level: "b2",
    summary: "Страдательный залог нужен, когда важно само действие или его результат, а не исполнитель. Форма строится из be в нужном времени и третьей формы смыслового глагола.",
    formula: [
      "+ The song was recorded in 1999.",
      "− The results haven’t been published yet.",
      "? Was the letter sent yesterday? / When will the bridge be opened?"
    ],
    rules: [
      "Общая формула: be + V3; время меняется через форму be: is written, was written, has been written.",
      "Исполнитель вводится через by, только если он важен: The letter was written by Anna.",
      "Пассив уместен, когда исполнитель неизвестен, очевиден или несущественен.",
      "Пассив образуют только переходные глаголы, у которых есть прямое дополнение.",
      "С модальными глаголами: modal + be + V3; в Perfect: have been + V3; в Continuous: being + V3."
    ],
    examples: [
      { en: "The old theatre was rebuilt after the fire.", ru: "Старый театр был восстановлен после пожара." },
      { en: "Her words have been quoted in many reviews.", ru: "Её слова цитировались во многих рецензиях." },
      { en: "The final version will be checked tomorrow.", ru: "Финальная версия будет проверена завтра." }
    ],
    mistakes: [
      { wrong: "The house was build in 1900.", right: "The house was built in 1900.", why: "В пассиве нужна третья форма глагола: build — built — built." },
      { wrong: "She was went to hospital.", right: "She was taken to hospital.", why: "После was нужна форма V3 смыслового глагола, а не прошедшее время went." }
    ],
    check: {
      q: "Выбери правильный вариант: The emails ___ tomorrow morning.",
      options: ["will send", "will be sent", "are sending"],
      answer: 1,
      explain: "Письма не отправляют действие сами; они будут отправлены, поэтому нужен будущий пассив will be sent."
    },
    related: ["narrative-tenses", "participle-clauses", "register-style"]
  },
  {
    id: "narrative-tenses",
    title: "Narrative Tenses",
    ru: "Времена в повествовании",
    level: "b2",
    summary: "В рассказе времена распределяют роли: одно действие двигает сюжет, другое создаёт фон, третье произошло раньше. Выбор формы помогает слушателю понять последовательность.",
    formula: [
      "+ We arrived at the station and waited.",
      "− Nobody had told us about the delay.",
      "? What were you doing when the storm began?"
    ],
    rules: [
      "Past Simple — основные события, которые происходят одно за другим.",
      "Past Continuous — фон, атмосфера или действие, которое было прервано.",
      "Past Perfect — событие, случившееся раньше другого прошлого события.",
      "Past Perfect Continuous подчёркивает длительность процесса до момента в прошлом: She had been waiting for hours.",
      "Present Simple иногда используется для драматического настоящего, чтобы сделать рассказ живее."
    ],
    examples: [
      { en: "We were driving home when the radio suddenly went silent.", ru: "Мы ехали домой, когда радио внезапно замолчало." },
      { en: "By the time she arrived, the band had already left.", ru: "К тому времени, как она пришла, группа уже ушла." },
      { en: "He opened the door, stepped outside and listened.", ru: "Он открыл дверь, вышел и прислушался." }
    ],
    mistakes: [
      { wrong: "When I arrived, she already left.", right: "When I arrived, she had already left.", why: "Уход произошёл раньше прибытия, поэтому нужно Past Perfect." },
      { wrong: "I was knowing the answer.", right: "I knew the answer.", why: "Know — глагол состояния, он не употребляется в Continuous." }
    ],
    check: {
      q: "Выбери правильный вариант: By the time we got there, the film ___.",
      options: ["started", "had started", "was starting"],
      answer: 1,
      explain: "Фильм начался раньше момента прибытия, поэтому нужен Past Perfect."
    },
    related: ["past-simple", "past-continuous", "present-perfect"]
  },
  {
    id: "linking-words",
    title: "Linking Words",
    ru: "Слова-связки",
    level: "b2",
    summary: "Слова-связки показывают логику между идеями: добавление, противопоставление, причину, результат или последовательность. Они делают текст связным, но требуют правильной грамматики и пунктуации.",
    formula: [
      "+ It was cold, so we stayed inside.",
      "− We didn’t go out because of the rain.",
      "? Have you finished, or do you need more time?"
    ],
    rules: [
      "Addition: and, also, moreover, in addition; contrast: but, however, although, despite.",
      "Cause: because + придаточное; because of + существительное или -ing.",
      "Result: so, therefore, as a result; sequence: first, then, finally.",
      "However и therefore обычно выделяются запятыми и не соединяют два предложения одной запятой.",
      "Although вводит придаточное, despite — существительное или -ing: although it rained / despite the rain."
    ],
    examples: [
      { en: "The lyrics are simple; nevertheless, they carry a strong message.", ru: "Текст простой, тем не менее он несёт сильный посыл." },
      { en: "She left early because she had an early train.", ru: "Она ушла рано, потому что у неё был ранний поезд." },
      { en: "First we tuned the guitars, and then we began.", ru: "Сначала мы настроили гитары, а затем начали." }
    ],
    mistakes: [
      { wrong: "Although it was raining, but we went out.", right: "Although it was raining, we went out.", why: "Although и but одновременно не используются для одной связи." },
      { wrong: "He was tired, however he finished.", right: "He was tired; however, he finished.", why: "However — вводное слово, ему нужна точка с запятой или новое предложение, а не одна запятая." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ the heavy traffic, we arrived on time.",
      options: ["Although", "Despite", "Because"],
      answer: 1,
      explain: "После Despite ставится существительное the heavy traffic; Although требовало бы целого придаточного."
    },
    related: ["register-style", "narrative-tenses", "ellipsis-substitution"]
  },
  {
    id: "metaphor-imagery",
    title: "Metaphor and Imagery",
    ru: "Метафора и образность",
    level: "b2",
    summary: "Метафора называет один объект другим, не используя like или as, и переносит свойства из одной сферы в другую. Образность создаётся всеми деталями, которые воздействуют на чувства и воображение.",
    formula: [
      "+ The road was a silver ribbon.",
      "+ Her laugh became a key.",
      "? What does the image make you see, hear or feel?"
    ],
    rules: [
      "В метафоре нет прямого маркера сравнения: The city is a sleeping animal, а не like a sleeping animal.",
      "Imagery — это не только зрительные картины; важны звуки, запахи, осязание и движение.",
      "Анализируйте, какие свойства переносятся: размер, температура, движение, материал, звук.",
      "Проверяйте, развивается ли образ по тексту или остаётся одной яркой деталью.",
      "Смешанная метафора соединяет несовместимые образы и разрушает картину: the ship of hope melted like a sword."
    ],
    examples: [
      { en: "The city was a sleeping animal, breathing under the streetlights.", ru: "Город был спящим зверем, дышавшим под уличными фонарями." },
      { en: "Her voice became a warm room where every worry could rest.", ru: "Её голос стал тёплой комнатой, где могла отдохнуть любая тревога." },
      { en: "His words were dry leaves scattered across the page.", ru: "Его слова были сухими листьями, рассыпанными по странице." }
    ],
    mistakes: [
      { wrong: "The moon is like a coin — это метафора.", right: "The moon is a coin — это метафора; с like это сравнение.", why: "Like и as — маркеры сравнения, а метафора утверждает тождество." },
      { wrong: "Любой яркий образ обязательно является метафорой.", right: "Образ может создаваться сравнением, эпитетом, звукописью или описанием.", why: "Метафора — один из способов образности, а не её общее название." }
    ],
    check: {
      q: "Какое предложение содержит метафору?",
      options: ["The road was a silver ribbon.", "The road shone like silver.", "The road was long and empty."],
      answer: 0,
      explain: "В первом предложении дорога прямо названа серебряной лентой, без like или as."
    },
    related: ["personification", "literary-analysis", "irony-tone"]
  },
  {
    id: "personification",
    title: "Personification",
    ru: "Олицетворение",
    level: "b2",
    summary: "Олицетворение наделяет предмет, природу или абстрактное понятие человеческими качествами, действиями или голосом. Приём делает образ живым и часто задаёт эмоциональный тон.",
    formula: [
      "+ The wind whispered through the trees.",
      "+ Hope knocked on the door.",
      "? Which human quality is given to the object?"
    ],
    rules: [
      "Олицетворение приписывает нечеловеческому существу человеческое действие: the moon watches, the city breathes.",
      "Это может быть не только глагол, но и прилагательное: a patient river, an angry sky.",
      "Приём влияет на настроение: ласковый шёпот ветра создаёт покой, а хватающие тени — тревогу.",
      "Не путайте олицетворение со сравнением: The wind whispered — олицетворение; The wind sounded like a whisper — сравнение.",
      "Спросите, зачем предмету дан голос: он утешает, предупреждает, обвиняет или насмехается?"
    ],
    examples: [
      { en: "The old house remembered every song sung inside it.", ru: "Старый дом помнил каждую песню, спетую в нём." },
      { en: "Fear sat beside her and refused to speak.", ru: "Страх сидел рядом с ней и отказывался говорить." },
      { en: "The morning opened its eyes behind the rooftops.", ru: "Утро открыло глаза за крышами." }
    ],
    mistakes: [
      { wrong: "The wind whispered through the trees — это сравнение.", right: "The wind whispered through the trees — это олицетворение.", why: "Ветру приписано человеческое действие без слов like или as." },
      { wrong: "Олицетворение всегда использует слово like.", right: "Олицетворение обходится без like: the moon watched us.", why: "Like характерно для сравнения, а не для олицетворения." }
    ],
    check: {
      q: "Какой пример является олицетворением?",
      options: ["The wind whispered through the trees.", "The wind was as cold as ice.", "The wind blew all night."],
      answer: 0,
      explain: "В первом примере ветру приписано человеческое действие whispered."
    },
    related: ["metaphor-imagery", "literary-analysis", "cultural-references"]
  },
  {
    id: "word-formation",
    title: "Word Formation",
    ru: "Словообразование",
    level: "c1",
    summary: "Новые слова образуются с помощью приставок, суффиксов, сложения основ и перехода из одной части речи в другую. Понимание моделей помогает догадываться о значении и точнее писать.",
    formula: [
      "+ happy → unhappy → happiness",
      "+ act → action → actor → active",
      "? Which suffix turns this adjective into a noun?"
    ],
    rules: [
      "Приставки чаще меняют значение, а не часть речи: un-, re-, over-, under-, mis-.",
      "Суффиксы часто меняют часть речи: -ness, -ity, -tion, -ment, -ance образуют существительные; -able, -ful, -less — прилагательные.",
      "Написание может меняться: happy — happiness, decide — decision, begin — beginning.",
      "Сложение основ создаёт новые слова: songwriting, lifelong, well-known.",
      "Конверсия меняет часть речи без добавления аффикса: to record — a record; ударение при этом может смещаться."
    ],
    examples: [
      { en: "Her unexpected kindness made the room feel warmer.", ru: "Её неожиданная доброта сделала комнату теплее." },
      { en: "The decision was difficult but understandable.", ru: "Решение было трудным, но понятным." },
      { en: "They rebuilt the stage in a single afternoon.", ru: "Они перестроили сцену за один день." }
    ],
    mistakes: [
      { wrong: "She is a very kindness person.", right: "She is a very kind person.", why: "Kindness — существительное; перед person нужно прилагательное kind." },
      { wrong: "His explane was clear.", right: "His explanation was clear.", why: "От глагола explain образуется существительное explanation." }
    ],
    check: {
      q: "Выбери правильный вариант: The ___ of the plan took two weeks.",
      options: ["implement", "implementation", "implemented"],
      answer: 1,
      explain: "После артикля the и перед of нужно существительное implementation."
    },
    related: ["abstract-nouns", "literary-vocabulary", "register-style"]
  },
  {
    id: "inversion",
    title: "Inversion",
    ru: "Инверсия",
    level: "c1",
    summary: "Инверсия меняет обычный порядок слов, ставя вспомогательный глагол перед подлежащим. В современном английском она чаще всего создаёт эмфазу, формальный или литературный оттенок.",
    formula: [
      "Never + auxiliary + subject: Never have I seen such a crowd.",
      "Had + subject + V3: Had I known, I would have called.",
      "Not only + auxiliary + subject: Not only did she sing, but she also danced.",
      "So/Neither + auxiliary + subject: So do I. / Neither has she."
    ],
    rules: [
      "После отрицательных и ограничительных наречий в начале предложения (never, rarely, seldom, little, no sooner) нужен вопросительный порядок слов.",
      "После not only, not until, no sooner вспомогательный глагол также ставится перед подлежащим.",
      "В условных предложениях возможна инверсия без if: Had I known..., Should you need..., Were I in your place...",
      "После so, neither, nor используется тот же вспомогательный глагол, что и в предыдущей реплике.",
      "Инверсия неуместна в обычном нейтральном повествовании и звучит книжно или драматично."
    ],
    examples: [
      { en: "Never have I heard such a quiet audience.", ru: "Никогда я не слышал такой тихой публики." },
      { en: "Had I known about the change, I would have come earlier.", ru: "Если бы я знал об изменении, я бы пришёл раньше." },
      { en: "Rarely does she raise her voice.", ru: "Она редко повышает голос." }
    ],
    mistakes: [
      { wrong: "Never I have seen such a crowd.", right: "Never have I seen such a crowd.", why: "После never в начале предложения вспомогательный глагол ставится перед подлежащим." },
      { wrong: "Not only she sings, but she also dances.", right: "Not only does she sing, but she also dances.", why: "После not only нужен вспомогательный глагол и вопросительный порядок слов." }
    ],
    check: {
      q: "Выбери правильный вариант: Rarely ___ such a patient teacher.",
      options: ["we meet", "do we meet", "we do meet"],
      answer: 1,
      explain: "Rarely в начале предложения требует инверсии: do + we + meet."
    },
    related: ["cleft-sentences", "conditionals", "register-style"]
  },
  {
    id: "cleft-sentences",
    title: "Cleft Sentences",
    ru: "Расщеплённые предложения",
    level: "c1",
    summary: "Расщеплённое предложение делит мысль на две части и выносит нужную информацию в центр внимания. Конструкция нужна не для новой грамматической точности, а для эмфазы и управления фокусом.",
    formula: [
      "+ It was Maria who called.",
      "+ What I need is a break.",
      "? Was it the rain that woke you?"
    ],
    rules: [
      "It-cleft: It is/was + выделяемая часть + that/who + остальное: It was the chorus that stayed with me.",
      "Wh-cleft: What + подлежащее + глагол + is/was + выделяемая часть: What I remember is the silence.",
      "В it-cleft с людьми возможен who, с предметами и обстоятельствами — that.",
      "После выделяемой части сохраняется обычный порядок слов; дублировать подлежащее местоимением нельзя.",
      "В песнях конструкция помогает сместить ритмическое и смысловое ударение, поэтому её стоит читать вслух."
    ],
    examples: [
      { en: "It was her calm voice that made the room go quiet.", ru: "Именно её спокойный голос заставил комнату замолчать." },
      { en: "What I miss most is the sound of the crowd.", ru: "Больше всего мне не хватает звука толпы." },
      { en: "It wasn’t the words but the pause that hurt.", ru: "Ранила не фраза, а пауза." }
    ],
    mistakes: [
      { wrong: "It was my brother he broke the window.", right: "It was my brother who broke the window.", why: "После выделяемой части нужен who/that, а не повторное подлежащее he." },
      { wrong: "What I want it is to sleep.", right: "What I want is to sleep.", why: "В wh-cleft после придаточного сразу ставится is, лишнее it не нужно." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ I remember most is the silence.",
      options: ["It", "What", "That"],
      answer: 1,
      explain: "Здесь используется wh-cleft: What I remember most is..."
    },
    related: ["inversion", "relative-clauses", "rhetorical-questions"]
  },
  {
    id: "participle-clauses",
    title: "Participle Clauses",
    ru: "Причастные обороты",
    level: "c1",
    summary: "Причастный оборот заменяет целое придаточное и делает речь компактнее. Форма на -ing обычно активна, форма V3 — пассивна, а having + V3 показывает действие, произошедшее раньше.",
    formula: [
      "+ Walking home, she saw a fox.",
      "+ Written in 1920, the novel still feels modern.",
      "+ Having finished the report, he went out."
    ],
    rules: [
      "Оборот с -ing описывает активное действие того же лица, что и в главной части: Walking home, she saw a fox.",
      "Оборот с V3 описывает пассивное действие: Written in 1920, the novel...",
      "Having + V3 показывает, что действие оборота завершилось раньше действия главной части.",
      "Подлежащее оборота должно совпадать с подлежащим главной части, иначе возникает dangling participle.",
      "Оборот может заменять относительное придаточное: the girl who was singing — the girl singing."
    ],
    examples: [
      { en: "Holding the old photograph, he remembered the summer.", ru: "Держа старую фотографию, он вспомнил то лето." },
      { en: "Surprised by the applause, she forgot her next line.", ru: "Удивлённая аплодисментами, она забыла следующую реплику." },
      { en: "Having heard the demo, the producer called the band.", ru: "Прослушав демозапись, продюсер позвонил группе." }
    ],
    mistakes: [
      { wrong: "Walking home, the rain started.", right: "Walking home, I felt the rain start.", why: "Подлежащее оборота walking home должно совпадать с подлежащим главной части; дождь не шёл домой." },
      { wrong: "Having wrote the letter, she left.", right: "Having written the letter, she left.", why: "После having нужна третья форма глагола: write — wrote — written." }
    ],
    check: {
      q: "Выбери правильный вариант: ___ by the noise, the baby woke up.",
      options: ["Frightening", "Frightened", "Having frightened"],
      answer: 1,
      explain: "Ребёнок был испуган шумом, поэтому нужен пассивный причастный оборот frightened."
    },
    related: ["relative-clauses", "passive-voice", "narrative-tenses"]
  },
  {
    id: "rhetorical-questions",
    title: "Rhetorical Questions",
    ru: "Риторические вопросы",
    level: "c1",
    summary: "Риторический вопрос задаётся не для получения информации, а чтобы подчеркнуть мысль, бросить вызов или пригласить к согласию. Его сила зависит от контекста и интонации.",
    formula: [
      "+ Who could forget that night?",
      "+ Isn’t it time we left?",
      "? Do you really want to live with that regret?"
    ],
    rules: [
      "Риторический вопрос не требует фактического ответа; ответ уже подразумевается.",
      "Положительная форма часто подразумевает отрицательный ответ, а отрицательная — положительный.",
      "Приём создаёт вовлечение, давление, иронию или эмоциональный подъём.",
      "В песне вопрос может звучать как обращение к другому человеку, к себе или к слушателю.",
      "Отличайте риторический вопрос от настоящего по контексту: есть ли реальная неизвестная информация?"
    ],
    examples: [
      { en: "Who would trade this view for a screen?", ru: "Кто бы променял этот вид на экран?" },
      { en: "After all we have been through, how can you doubt me?", ru: "После всего, через что мы прошли, как ты можешь сомневаться во мне?" },
      { en: "Do we really need another reason to wait?", ru: "Неужели нам нужна ещё одна причина ждать?" }
    ],
    mistakes: [
      { wrong: "Риторический вопрос всегда требует прямого ответа.", right: "Он приглашает к согласию или размышлению, но не запрашивает новую информацию.", why: "Функция вопроса определяется контекстом, а не знаком вопроса." },
      { wrong: "Любой вопрос в песне является риторическим.", right: "Вопрос становится риторическим только по функции и контексту.", why: "Персонаж может действительно задавать вопрос, на который ждёт ответа." }
    ],
    check: {
      q: "Какой вопрос скорее всего является риторическим?",
      options: ["What time does the train leave?", "Who could possibly forget that voice?", "Could you pass the salt?"],
      answer: 1,
      explain: "Вопрос Who could possibly forget... не запрашивает информацию, а утверждает, что голос невозможно забыть."
    },
    related: ["questions", "irony-tone", "literary-analysis"]
  },
  {
    id: "register-style",
    title: "Register and Style",
    ru: "Регистр и стиль",
    level: "c1",
    summary: "Регистр — это уместность языка для ситуации, адресата и цели. Стиль шире: он включает выбор слов, синтаксис, ритм и дистанцию между говорящим и слушателем.",
    formula: [
      "+ Formal: The committee has reached a decision.",
      "+ Informal: The group’s made up its mind.",
      "? Who is speaking to whom, and in what situation?"
    ],
    rules: [
      "Формальность — не просто длинные слова, а сочетание лексики, грамматики, дистанции и конвенций жанра.",
      "Формальный регистр чаще использует полные формы, пассив, номинализации и нейтральную лексику.",
      "Неформальный регистр допускает сокращения, фразовые глаголы, эллипсис и разговорные маркеры.",
      "Песня может намеренно смешивать регистры: официальная фраза в припеве звучит отстранённо или иронично.",
      "Анализируйте эффект, а не только правильность: кому адресован текст и какую дистанцию он создаёт?"
    ],
    examples: [
      { en: "The report indicates a significant increase in attendance.", ru: "В отчёте отмечается значительный рост посещаемости." },
      { en: "We’re gonna sort it out after the show.", ru: "Мы разберёмся с этим после шоу." },
      { en: "Ladies and gentlemen, may I have your attention?", ru: "Дамы и господа, можно попросить вашего внимания?" }
    ],
    mistakes: [
      { wrong: "Если текст использует gonna, он грамматически неправильный.", right: "Форма допустима в неформальной речи, но неуместна в официальном отчёте.", why: "Регистр оценивается по ситуации, а не по абсолютной шкале правильности." },
      { wrong: "Формальный стиль — это просто длинные слова.", right: "Формальность создаётся сочетанием лексики, грамматики, дистанции и ситуации.", why: "Даже короткое предложение может быть формальным, если оно уместно и нейтрально." }
    ],
    check: {
      q: "Какой вариант лучше всего подходит для официального отчёта?",
      options: ["We’re gonna fix the problem.", "The problem will be addressed.", "We’ll sort it out."],
      answer: 1,
      explain: "Нейтральная пассивная конструкция и полная форма соответствуют официальному письменному регистру."
    },
    related: ["literary-analysis", "linking-words", "ellipsis-substitution"]
  },
  {
    id: "literary-analysis",
    title: "Literary Analysis",
    ru: "Литературный анализ",
    level: "c2",
    summary: "Литературный анализ объясняет, как текст создаёт смысл, а не пересказывает содержание. Он соединяет наблюдение над формой с доказательством из текста и ясным тезисом.",
    formula: [
      "Claim + evidence: The refrain turns private grief into collective memory.",
      "Ask: How does form shape meaning here?",
      "Ask: What changes between the first and final stanza?"
    ],
    rules: [
      "Начинайте с тезиса, который можно доказать, а не с общего впечатления вроде «песня красивая».",
      "Подкрепляйте мысль конкретной деталью: повтором, образностью, синтаксисом, рифмой или сменой голоса.",
      "Различайте автора, исполнителя и лирического героя: голос текста может быть вымышленным.",
      "Смотрите на структуру: что меняется между куплетом и припевом, что повторяется и что остаётся неразрешённым.",
      "Не подменяйте анализ пересказом сюжета и не объясняйте текст только биографией автора."
    ],
    examples: [
      { en: "The repeated door image suggests both escape and return.", ru: "Повторяющийся образ двери предполагает и побег, и возвращение." },
      { en: "The shift to direct address makes the ending feel accusatory.", ru: "Переход к прямому обращению делает финал обвинительным." },
      { en: "The short final stanza leaves the conflict unresolved.", ru: "Короткая последняя строфа оставляет конфликт неразрешённым." }
    ],
    mistakes: [
      { wrong: "The speaker is always the singer.", right: "The speaker is a constructed voice and may differ from the singer.", why: "Лирическое «я» — художественная роль, а не автоматически биография исполнителя." },
      { wrong: "A strong interpretation ignores details that do not fit.", right: "A strong interpretation accounts for tension and counterevidence.", why: "Убедительный анализ объясняет не только удобные примеры, но и противоречия." }
    ],
    check: {
      q: "Какое начало лучше всего подходит для близкого анализа?",
      options: ["The song is about love.", "The repeated image of the closed door turns the refrain into a study of exclusion.", "I liked the song because it is catchy."],
      answer: 1,
      explain: "Второй вариант содержит тезис и указывает на конкретный приём, который можно доказать текстом."
    },
    related: ["metaphor-imagery", "register-style", "literary-vocabulary"]
  },
  {
    id: "cultural-references",
    title: "Cultural References",
    ru: "Культурные отсылки",
    level: "c2",
    summary: "Культурная отсылка активирует знание, общее для автора и аудитории: текст, место, событие, обычай или образ. Она может создавать близость, иронию или ощущение исключённости.",
    formula: [
      "The line echoes a familiar fairy tale.",
      "A place name carries a whole history.",
      "Ask: What must a listener know for this reference to work?"
    ],
    rules: [
      "Отсылка может быть прямой (имя, название) или косвенной (намёк, перефразирование, характерная деталь).",
      "Значение зависит от аудитории: для одних слушателей отсылка очевидна, для других остаётся тёмным местом.",
      "Спросите, что отсылка добавляет к образу, тону или конфликту, а не только откуда она взята.",
      "Отсылка может быть переосмыслена или использована иронически, поэтому не спешите считывать её буквально.",
      "Если источник неясен, проверьте контекст; не выдумывайте связь, которую текст не поддерживает."
    ],
    examples: [
      { en: "The song never names the war, but the ruined bridge places the story in living memory.", ru: "В песне не названа война, но разрушенный мост помещает историю в живую память." },
      { en: "A reference to a children’s game makes the chorus sound both playful and threatening.", ru: "Отсылка к детской игре делает припев одновременно игривым и угрожающим." },
      { en: "The mention of a national holiday changes how the farewell is heard.", ru: "Упоминание национального праздника меняет восприятие прощания." }
    ],
    mistakes: [
      { wrong: "Культурная отсылка всегда называет свой источник прямо.", right: "Она может быть косвенной и требовать узнавания.", why: "Аллюзия часто работает намёком, а не цитатой." },
      { wrong: "Если я не знаю отсылку, она не имеет значения.", right: "Значение может быть частичным, а контекст помогает его восстановить.", why: "Понимание культурного кода зависит от опыта аудитории, но не отменяет смысла текста." }
    ],
    check: {
      q: "Песня упоминает известную реку, не объясняя её. Какой аналитический вопрос лучший?",
      options: ["Сколько раз повторяется слово «река»?", "Какие ассоциации несёт эта река для предполагаемой аудитории?", "Сколько слов в этой строке?"],
      answer: 1,
      explain: "Вопрос об ассоциациях раскрывает функцию отсылки, а подсчёты сами по себе не объясняют смысл."
    },
    related: ["literary-analysis", "irony-tone", "register-style"]
  },
  {
    id: "ellipsis-substitution",
    title: "Ellipsis and Substitution",
    ru: "Эллипсис и замещение",
    level: "c2",
    summary: "Эллипсис опускает слова, которые легко восстановить из контекста, а замещение заменяет их коротким словом вроде one, do, so, neither. Эти приёмы делают речь естественной и ритмичной.",
    formula: [
      "+ I can play the guitar, and she can too.",
      "+ I didn’t call, but I should have.",
      "? Do you need a hand? — I do."
    ],
    rules: [
      "Эллипсис возможен, только если пропущенное восстанавливается однозначно: She can swim and I can too.",
      "Substitution: one/ones заменяют существительное, do/does/did — глагольную группу, so/not — целую мысль.",
      "Neither/nor и so требуют вспомогательного глагола, согласованного с предыдущей репликой: So do I.",
      "В разговорной речи и песнях эллипсис создаёт скорость, близость и ритм.",
      "В формальном тексте эллипсис допустим, но требует осторожности, чтобы не потерять логику."
    ],
    examples: [
      { en: "I asked her to stay, and she did.", ru: "Я попросил её остаться, и она осталась." },
      { en: "He hasn’t finished, but he will.", ru: "Он ещё не закончил, но закончит." },
      { en: "I thought the show was over, but it wasn’t.", ru: "Я думал, что шоу закончилось, но оно не закончилось." }
    ],
    mistakes: [
      { wrong: "I like jazz. — So am I.", right: "I like jazz. — So do I.", why: "В ответе повторяется вспомогательный глагол do, потому что like — смысловой глагол в Present Simple." },
      { wrong: "She can swim and I can too can.", right: "She can swim and I can too.", why: "После too глагол уже не повторяется; эллипсис не должен дублировать слово." }
    ],
    check: {
      q: "Выбери правильный вариант: I haven’t seen the film, but she ___.",
      options: ["has", "does", "is"],
      answer: 0,
      explain: "She has заменяет she has seen the film; вспомогательный глагол должен соответствовать Present Perfect."
    },
    related: ["question-tags", "linking-words", "register-style"]
  },
  {
    id: "irony-tone",
    title: "Irony and Tone",
    ru: "Ирония и тон",
    level: "c2",
    summary: "Ирония возникает из разрыва между буквальным смыслом слов и ситуацией или ожиданием. Тон — это отношение говорящего, которое читатель восстанавливает по контексту, а не только по словам.",
    formula: [
      "+ Oh, perfect — the bus is late again.",
      "+ He called the delay a lovely surprise.",
      "? Does the context support a reading against the literal words?"
    ],
    rules: [
      "Вербальная ирония говорит одно, а подразумевает обратное; слушатель должен заметить несоответствие.",
      "Тон может быть тёплым, насмешливым, усталым или гневным даже при внешне нейтральных словах.",
      "Сигналы иронии: преувеличение, недосказанность, резкий контраст, знание ситуации, интонация.",
      "Сарказм — более едкая форма, часто направленная на человека; ирония может быть мягкой и игровой.",
      "Не приписывайте автору намерение без опоры на текст: анализируйте эффект, который создают детали."
    ],
    examples: [
      { en: "What a wonderful day, she said as the rain soaked the stage.", ru: "Какой чудесный день, сказала она, пока дождь заливал сцену." },
      { en: "The instructions were admirably clear, if you enjoy solving riddles.", ru: "Инструкции были восхитительно ясны, если вам нравится разгадывать загадки." },
      { en: "The song praises the city’s silence while listing every siren.", ru: "Песня восхваляет тишину города, перечисляя при этом каждую сирену." }
    ],
    mistakes: [
      { wrong: "Irony is simply lying.", right: "Irony invites the listener to infer a gap between words and situation; a lie aims to deceive.", why: "Ирония предполагает понимание несоответствия, а не обман." },
      { wrong: "If a line sounds negative, it cannot be ironic.", right: "Irony can be affectionate, playful or critical; tone depends on context.", why: "Ирония не сводится к негативу, её оттенок задаёт ситуация." }
    ],
    check: {
      q: "Певец произносит «What a wonderful day», описывая катастрофу. Каков наиболее вероятный эффект?",
      options: ["буквальная похвала", "иронический контраст", "нейтральная инструкция"],
      answer: 1,
      explain: "Похвала явно противоречит катастрофе, поэтому возникает иронический контраст."
    },
    related: ["metaphor-imagery", "rhetorical-questions", "literary-analysis"]
  },
  {
    id: "abstract-nouns",
    title: "Abstract Nouns",
    ru: "Абстрактные существительные",
    level: "b2",
    summary: "Абстрактные существительные называют идею, качество, состояние или процесс, а не физический предмет. Они часто образуются с помощью суффиксов и делают речь более обобщённой и книжной.",
    formula: [
      "+ Her kindness surprised everyone.",
      "+ The decision changed the mood.",
      "? What idea does the noun name?"
    ],
    rules: [
      "Конкретные существительные называют то, что можно воспринять органами чувств; абстрактные — идеи и состояния.",
      "Типичные суффиксы: -ness (kindness), -ity (honesty), -tion (decision), -ment (movement), -ance (patience), -ship (friendship).",
      "Многие абстрактные существительные неисчисляемы, но некоторые могут становиться исчисляемыми в конкретном значении: a hope, hopes.",
      "Номинализация превращает действие или признак в существительное и делает стиль более официальным.",
      "В анализе текста абстрактные существительные помогают называть темы, но их стоит связывать с конкретными образами."
    ],
    examples: [
      { en: "Freedom has a price that is rarely discussed.", ru: "У свободы есть цена, о которой редко говорят." },
      { en: "Her courage inspired the whole team.", ru: "Её смелость вдохновила всю команду." },
      { en: "His honesty made the apology believable.", ru: "Его честность сделала извинение убедительным." }
    ],
    mistakes: [
      { wrong: "We discussed several informations.", right: "We discussed several pieces of information.", why: "Information неисчисляемо, поэтому считают не слово, а порции информации." },
      { wrong: "His happy was obvious.", right: "His happiness was obvious.", why: "После his нужно существительное happiness, а не прилагательное happy." }
    ],
    check: {
      q: "Выбери абстрактное существительное.",
      options: ["table", "freedom", "window"],
      answer: 1,
      explain: "Freedom называет идею, а table и window — физические объекты."
    },
    related: ["word-formation", "countable-uncountable", "literary-vocabulary"]
  },
  {
    id: "literary-vocabulary",
    title: "Literary Vocabulary",
    ru: "Литературоведческая лексика",
    level: "c2",
    summary: "Термины литературного анализа нужны, чтобы точно называть приёмы и объяснять их эффект. Словарь помогает не украшать ответ, а делать наблюдения проверяемыми.",
    formula: [
      "imagery: language that appeals to the senses",
      "tone: the speaker’s attitude",
      "? Which term best describes the repeated initial sounds?"
    ],
    rules: [
      "Metaphor утверждает тождество, simile сравнивает через like/as, personification наделяет человеческими качествами.",
      "Alliteration — повтор согласных в начале слов; assonance — повтор гласных звуков внутри строк.",
      "Stanza — строфа, refrain — повторяющаяся строка или группа строк, enjambment — перенос мысли через границу строки без паузы.",
      "Speaker — голос в тексте, persona — созданная роль; tone — отношение говорящего, mood — атмосфера для читателя.",
      "Используйте термин только вместе с примером и объяснением эффекта: что приём меняет в звучании или смысле?"
    ],
    examples: [
      { en: "The alliteration slows the line and makes the refrain feel heavier.", ru: "Аллитерация замедляет строку и делает припев тяжелее." },
      { en: "The enjambment pushes the thought into the next stanza, so the pause feels unresolved.", ru: "Перенос перебрасывает мысль в следующую строфу, поэтому пауза кажется незавершённой." },
      { en: "The simile compares the voice to smoke, stressing its fading quality.", ru: "Сравнение уподобляет голос дыму, подчёркивая его угасание." }
    ],
    mistakes: [
      { wrong: "Alliteration is repetition of vowel sounds.", right: "Alliteration repeats consonant sounds; vowel repetition is assonance.", why: "Эти термины различаются типом повторяющегося звука." },
      { wrong: "Tone and mood are the same.", right: "Tone is the speaker’s attitude; mood is the atmosphere felt by the reader.", why: "Тон относится к говорящему, настроение — к эффекту текста." }
    ],
    check: {
      q: "Повтор одинаковых согласных звуков в начале соседних слов — это...",
      options: ["assonance", "alliteration", "enjambment"],
      answer: 1,
      explain: "Alliteration — повтор начальных согласных; assonance — повтор гласных, enjambment — перенос строки."
    },
    related: ["literary-analysis", "metaphor-imagery", "word-formation"]
  }
];
