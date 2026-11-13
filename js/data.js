/* ============================================================
   LYRICA — content model
   Уровни CEFR, песни, словарь, задания и домашние работы.
   Тексты песен не воспроизводятся полностью: упражнения
   построены вокруг лексики, смысла и языковых паттернов.
   ============================================================ */

window.LYRICA = (() => {
  const LEVELS = [
    {
      id: "a1",
      code: "A1",
      name: "Beginner",
      ru: "Начальный",
      color: "#E8552F",
      tint: "#FBE6DD",
      deep: "#8C2D18",
      tagline: "Первые слова, которые хочется подпевать",
      description:
        "Простые фразы, знакомая лексика и короткие предложения. Начинаем с песен, где всё понятно почти без перевода.",
      skills: ["Present Simple", "Базовые существительные", "Простые вопросы"],
      outcome: "Расскажешь о друге, природе и своих чувствах 5–7 предложениями."
    },
    {
      id: "a2",
      code: "A2",
      name: "Elementary",
      ru: "Базовый",
      color: "#D89B1F",
      tint: "#FAEFD3",
      deep: "#7A5408",
      tagline: "Учишься рассказывать о прошлом и мечтах",
      description:
        "Уверенные бытовые темы, Past Simple и планы на будущее. Песни становятся историями с характером.",
      skills: ["Past Simple", "Present Perfect", "Фразовые глаголы"],
      outcome: "Опишешь идеальный вечер и расскажешь историю в 8–10 предложениях."
    },
    {
      id: "b1",
      code: "B1",
      name: "Intermediate",
      ru: "Средний",
      color: "#2E8B77",
      tint: "#DDF0E9",
      deep: "#145243",
      tagline: "Смысл важнее перевода",
      description:
        "Учишься слышать эмоцию, а не только слова. Разбираем идиомы, оттенки чувств и разговорные конструкции.",
      skills: ["Идиомы", "Gerund / Infinitive", "Wish + Past Perfect"],
      outcome: "Поддержать разговор о мечтах, деньгах и отношениях."
    },
    {
      id: "b2",
      code: "B2",
      name: "Upper-Intermediate",
      ru: "Выше среднего",
      color: "#3F6AD8",
      tint: "#E3EAFB",
      deep: "#1E3A87",
      tagline: "Понимаешь метафоры и подтекст",
      description:
        "Работаем с образами, пассивом и историческим нарративом. Учишься объяснять, что хотел сказать автор.",
      skills: ["Passive Voice", "Narrative tenses", "Метафоры"],
      outcome: "Разберёшь песню как текст: тему, образы и авторскую позицию."
    },
    {
      id: "c1",
      code: "C1",
      name: "Advanced",
      ru: "Продвинутый",
      color: "#7A4FD6",
      tint: "#ECE4FA",
      deep: "#45228E",
      tagline: "Свобода в языке и в интерпретации",
      description:
        "Сложные регистры, литературные приёмы и игра слов. Обсуждаем внутренний конфликт и общественную сатиру.",
      skills: ["Conditionals", "Inversion", "Словообразование"],
      outcome: "Напишешь аргументированный текст и объяснишь иронию."
    },
    {
      id: "c2",
      code: "C2",
      name: "Proficiency",
      ru: "Владение в совершенстве",
      color: "#1C1917",
      tint: "#EAE4DB",
      deep: "#000000",
      tagline: "Язык как искусство",
      description:
        "Литературные отсылки, библейские образы и авторский стиль. Здесь важны нюансы, звучание и культурный контекст.",
      skills: ["Literary analysis", "Inversion", "Cultural references"],
      outcome: "Проанализируешь текст на уровне стиля, символов и культурного кода."
    }
  ];

  const cover = (bg1, bg2, ink, accent, motif) => ({ bg1, bg2, ink, accent, motif });

  const SONGS = [
    /* ============================== A1 ============================== */
    {
      id: "count-on-me",
      title: "Count on Me",
      artist: "Bruno Mars",
      year: 2010,
      genre: "Pop",
      level: "a1",
      duration: "3:18",
      theme: "Дружба и поддержка",
      cover: cover("#F6C1AB", "#E8552F", "#2A1510", "#FFE4CF", "wave"),
      description:
        "Тёплая поп-песня о дружбе, на которую всегда можно положиться. Короткие фразы, повторяющийся ритм и лексика, которая пригодится в первом же разговоре.",
      why:
        "A1: простые предложения в Present Simple, базовая лексика о друзьях и чувствах, много повторов и понятная структура.",
      grammar: "Present Simple · can · Imperatives",
      chunks: [
        { en: "count on someone", ru: "рассчитывать на кого-то" },
        { en: "when you need a hand", ru: "когда нужна помощь" },
        { en: "sail the world", ru: "обогнуть мир под парусом" }
      ],
      vocab: [
        { word: "count on", pos: "phrasal verb", ipa: "/kaʊnt ɒn/", ru: "полагаться на", example: "I can always count on my best friend." },
        { word: "friend", pos: "noun", ipa: "/frend/", ru: "друг", example: "A true friend listens without judging." },
        { word: "sail", pos: "verb", ipa: "/seɪl/", ru: "плыть под парусом", example: "They sailed across the sea in a small boat." },
        { word: "sea", pos: "noun", ipa: "/siː/", ru: "море", example: "The sea was calm and bright that morning." },
        { word: "lost", pos: "adjective", ipa: "/lɒst/", ru: "потерянный, заблудившийся", example: "I felt lost in a new city until she called." },
        { word: "find", pos: "verb", ipa: "/faɪnd/", ru: "находить", example: "It is easy to find a friend in a kind person." },
        { word: "light", pos: "noun", ipa: "/laɪt/", ru: "свет", example: "Your message was a light in a dark day." },
        { word: "shoulder", pos: "noun", ipa: "/ˈʃəʊldə(r)/", ru: "плечо", example: "She cried on my shoulder after the bad news." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «count on»?", options: ["считать вслух", "полагаться на", "отказываться от"], answer: 1, word: "count on", explain: "Count on someone — рассчитывать на кого-то, быть уверенным в его поддержке." },
        { type: "choice", prompt: "Выбери перевод слова «shoulder»", options: ["плечо", "ладонь", "колено"], answer: 0, word: "shoulder", explain: "Shoulder — плечо. Оборот «a shoulder to cry on» означает человека, которому можно поплакаться." },
        { type: "choice", prompt: "Что делает человек, если он «sails»?", options: ["идёт пешком", "плывёт под парусом", "летит на самолёте"], answer: 1, word: "sail", explain: "Sail — управлять парусным судном или плыть под парусом." },
        { type: "gap", prompt: "My friend got ___ in a new city, so I helped him find the hotel.", options: ["lost", "loud", "late"], answer: 0, word: "lost", explain: "Get lost — заблудиться. Lost здесь прилагательное." },
        { type: "gap", prompt: "You can always ___ me when you need help.", options: ["count up", "count on", "count out"], answer: 1, word: "count on", explain: "Конструкция: count on + человек. Предлог on обязателен." },
        { type: "listen", audio: "I can count on my best friend.", prompt: "Послушай фразу. Что она значит?", options: ["Я могу положиться на лучшего друга.", "Я считаю лучших друзей.", "Я ищу лучшего друга."], answer: 0, explain: "Can count on = могу положиться. Best friend = лучший друг." },
        { type: "choice", prompt: "Выбери правильную форму: «She ___ on me when I have a problem.»", options: ["count", "counts", "counting"], answer: 1, explain: "Present Simple, третье лицо единственного числа: she counts." },
        { type: "choice", prompt: "Какая главная идея песни?", options: ["Путешествие вокруг света", "Дружба и взаимная поддержка", "История о первой любви"], answer: 1, explain: "Песня о дружбе: друг поможет, выслушает и поддержит в трудный момент." }
      ],
      homework: [
        { title: "Письмо другу", type: "Письмо", minutes: 15, task: "Напиши другу короткое письмо на 6–8 предложений. Расскажи, за что ты можешь на него положиться, и предложи свою помощь. Используй слова count on, shoulder, light и хотя бы одну фразу из блока «Языковые паттерны».", hint: "Начни с Hi ___, I’m writing because… и закончи вопросом How can I help you this week?" },
        { title: "Голосовое на 45 секунд", type: "Говорение", minutes: 10, task: "Запиши голосовое сообщение другу: почему дружба важна и какой поступок друга ты запомнил. Используй 5 новых слов из урока. Говори медленно, но не читай с листа.", hint: "План: 1) приветствие, 2) один пример, 3) вывод. Не бойся пауз." },
        { title: "Плейлист поддержки", type: "Творчество", minutes: 15, task: "Собери мини-плейлист из трёх песен о дружбе. Для каждой напиши по-английски одно предложение: почему она подходит под тему урока. Используй Present Simple.", hint: "Например: This song feels warm because… It is about…" }
      ]
    },
    {
      id: "wonderful-world",
      title: "What a Wonderful World",
      artist: "Louis Armstrong",
      year: 1967,
      genre: "Jazz",
      level: "a1",
      duration: "2:20",
      theme: "Красота повседневного мира",
      cover: cover("#F1D37A", "#83B8A7", "#163A34", "#FFF3CF", "sun"),
      description:
        "Джазовая классика, которая учит замечать простое: деревья, розы, небо и улыбки. Медленный темп и чистые образы делают её идеальной для первого слушания.",
      why:
        "A1: названия цветов и природы, Present Simple, восклицание What a…! и очень размеренная речь.",
      grammar: "Present Simple · What a…! · Colours",
      chunks: [
        { en: "look around you", ru: "осмотрись вокруг" },
        { en: "bloom in spring", ru: "расцветать весной" },
        { en: "a bright blue sky", ru: "ярко-голубое небо" }
      ],
      vocab: [
        { word: "wonderful", pos: "adjective", ipa: "/ˈwʌndəfl/", ru: "удивительный, прекрасный", example: "We had a wonderful evening by the river." },
        { word: "world", pos: "noun", ipa: "/wɜːld/", ru: "мир", example: "The world looks different in the morning light." },
        { word: "tree", pos: "noun", ipa: "/triː/", ru: "дерево", example: "A big tree grows in front of our school." },
        { word: "rose", pos: "noun", ipa: "/rəʊz/", ru: "роза", example: "He gave her a red rose for her birthday." },
        { word: "bloom", pos: "verb", ipa: "/bluːm/", ru: "цвести, расцветать", example: "The garden blooms every May." },
        { word: "rainbow", pos: "noun", ipa: "/ˈreɪnbəʊ/", ru: "радуга", example: "A rainbow appeared after the rain." },
        { word: "bright", pos: "adjective", ipa: "/braɪt/", ru: "яркий", example: "The stars are bright tonight." },
        { word: "watch", pos: "verb", ipa: "/wɒtʃ/", ru: "наблюдать, смотреть", example: "We watched the sunset from the hill." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «wonderful»?", options: ["скучный", "удивительный, прекрасный", "опасный"], answer: 1, word: "wonderful", explain: "Wonderful — очень хороший, вызывающий восхищение." },
        { type: "choice", prompt: "Выбери перевод слова «bloom»", options: ["цвести", "падать", "сохнуть"], answer: 0, word: "bloom", explain: "Bloom — расцветать. Часто говорят о цветах и деревьях весной." },
        { type: "choice", prompt: "Что такое «rainbow»?", options: ["гроза", "радуга", "облако"], answer: 1, word: "rainbow", explain: "Rainbow появляется после дождя, когда солнце светит сквозь капли." },
        { type: "gap", prompt: "The sky is ___ today: there are no clouds at all.", options: ["bright", "broken", "boring"], answer: 0, word: "bright", explain: "Bright sky — яркое, светлое небо." },
        { type: "gap", prompt: "Roses ___ in spring and the garden looks beautiful.", options: ["bloom", "blooms", "blooming"], answer: 0, word: "bloom", explain: "Roses — множественное число, поэтому bloom без -s." },
        { type: "listen", audio: "The world is wonderful when you look around.", prompt: "Послушай фразу. Что она значит?", options: ["Мир прекрасен, когда ты смотришь по сторонам.", "Мир огромен, когда ты путешествуешь.", "Мир скучен, когда ты дома."], answer: 0, explain: "Look around — осмотреться. Фраза призывает замечать красоту вокруг." },
        { type: "choice", prompt: "Выбери правильный артикль: «What ___ wonderful world!»", options: ["a", "an", "the"], answer: 0, explain: "Восклицание с исчисляемым существительным в единственном числе: What a wonderful world!" },
        { type: "choice", prompt: "О чём эта песня?", options: ["О красоте обычного мира", "О школе и друзьях", "О космическом путешествии"], answer: 0, explain: "Песня замечает красоту в простых вещах: деревьях, розах, небе и людях." }
      ],
      homework: [
        { title: "Открытка миру", type: "Письмо", minutes: 15, task: "Напиши 5–7 предложений о том, что ты видишь из окна. Используй 5 цветов и 3 новых слова: wonderful, bloom, bright, rainbow, world. Добавь одно восклицание What a…!", hint: "Структура: I can see… The sky is… It makes me feel…" },
        { title: "Экскурсия по любимому месту", type: "Говорение", minutes: 10, task: "Запиши аудио на 40–60 секунд: проведи воображаемую экскурсию по месту, которое тебе нравится. Используй Present Simple и хотя бы 4 слова урока.", hint: "Не описывай всё подряд: выбери три детали и объясни, почему они важны." },
        { title: "Коллаж «Мой мир»", type: "Творчество", minutes: 20, task: "Сделай коллаж из фотографий, рисунков или вырезок. Подпиши 8 объектов по-английски и добавь к трём из них прилагательное: bright, wonderful, calm, colourful.", hint: "Подписи можно оформить как музейные таблички: A quiet tree. A bright sky." }
      ]
    },

    /* ============================== A2 ============================== */
    {
      id: "perfect",
      title: "Perfect",
      artist: "Ed Sheeran",
      year: 2017,
      genre: "Pop",
      level: "a2",
      duration: "4:23",
      theme: "Любовь и чувство дома",
      cover: cover("#F0C4D8", "#A87BC4", "#34162B", "#FFF0F7", "orbit"),
      description:
        "Романтическая баллада о человеке, рядом с которым мир становится спокойнее. Медленная мелодия помогает услышать окончания глаголов и структуру Past Simple.",
      why:
        "A2: Past Simple и Present Perfect, лексика чувств и внешности, простые метафоры, которые легко пересказать.",
      grammar: "Past Simple · Present Perfect · used to",
      chunks: [
        { en: "dance barefoot", ru: "танцевать босиком" },
        { en: "keep a promise", ru: "сдержать обещание" },
        { en: "feel like home", ru: "чувствовать себя как дома" }
      ],
      vocab: [
        { word: "perfect", pos: "adjective", ipa: "/ˈpɜːfɪkt/", ru: "идеальный", example: "The evening was perfect: music, tea and rain outside." },
        { word: "barefoot", pos: "adjective / adverb", ipa: "/ˈbeəfʊt/", ru: "босиком", example: "They danced barefoot on the wooden floor." },
        { word: "whisper", pos: "verb / noun", ipa: "/ˈwɪspə(r)/", ru: "шептать; шёпот", example: "She whispered the answer so nobody else could hear." },
        { word: "promise", pos: "noun / verb", ipa: "/ˈprɒmɪs/", ru: "обещание; обещать", example: "He promised to call her after the concert." },
        { word: "discover", pos: "verb", ipa: "/dɪˈskʌvə(r)/", ru: "обнаруживать, открывать для себя", example: "We discovered a tiny café near the station." },
        { word: "carry", pos: "verb", ipa: "/ˈkæri/", ru: "нести, держать", example: "He carried her bag all the way home." },
        { word: "heartbeat", pos: "noun", ipa: "/ˈhɑːtbiːt/", ru: "сердцебиение", example: "I could hear my heartbeat before the performance." },
        { word: "deserve", pos: "verb", ipa: "/dɪˈzɜːv/", ru: "заслуживать", example: "You deserve a quiet holiday after this year." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «barefoot»?", options: ["в носках", "босиком", "в кроссовках"], answer: 1, word: "barefoot", explain: "Barefoot — без обуви, босиком." },
        { type: "choice", prompt: "Выбери перевод слова «whisper»", options: ["кричать", "шептать", "молчать"], answer: 1, word: "whisper", explain: "Whisper — говорить очень тихо, шёпотом." },
        { type: "choice", prompt: "Что значит «deserve»?", options: ["заслуживать", "забывать", "дарить"], answer: 0, word: "deserve", explain: "Deserve — быть достойным чего-то. You deserve it! — Ты это заслужил!" },
        { type: "gap", prompt: "She ___ a promise to call me every day.", options: ["made", "did", "took"], answer: 0, word: "promise", explain: "Устойчивое сочетание: make a promise — дать обещание." },
        { type: "gap", prompt: "We ___ a quiet beach by accident and stayed there all day.", options: ["discovered", "deserved", "whispered"], answer: 0, word: "discover", explain: "Discover — обнаружить, найти что-то новое." },
        { type: "listen", audio: "We were dancing barefoot in the kitchen.", prompt: "Послушай фразу. Что происходило?", options: ["Они танцевали босиком на кухне.", "Они готовили ужин на кухне.", "Они убирали кухню."], answer: 0, explain: "Were dancing — Past Continuous: действие происходило в прошлом." },
        { type: "choice", prompt: "Выбери правильную форму: «I have never ___ anyone like you.»", options: ["meet", "met", "meeting"], answer: 1, explain: "Present Perfect: have + third form. Meet — met — met." },
        { type: "choice", prompt: "Какое настроение у песни?", options: ["Тревожное и злое", "Тёплое и романтическое", "Насмешливое"], answer: 1, explain: "Песня звучит нежно и уверенно: рядом с любимым человеком герой чувствует себя дома." }
      ],
      homework: [
        { title: "Идеальный вечер", type: "Письмо", minutes: 20, task: "Опиши идеальный вечер в 8–10 предложениях. Используй Past Simple, слова perfect, barefoot, whisper, promise и хотя бы один оборот feel like home.", hint: "Добавь сенсорные детали: что ты слышал, видел, чувствовал." },
        { title: "Признание без имени", type: "Говорение", minutes: 15, task: "Запиши монолог на 60–90 секунд о человеке, рядом с которым тебе спокойно. Не называй его имя. Используй 6 новых слов и Present Perfect (I have never met…).", hint: "Сделай паузу после первой фразы и говори медленнее, чем обычно." },
        { title: "Плейлист «чувство дома»", type: "Творчество", minutes: 15, task: "Выбери три песни, которые ассоциируются у тебя с домом. Напиши по-английски по два предложения о каждой: что ты чувствуешь и почему.", hint: "Полезные фразы: It reminds me of… It makes me feel…" }
      ]
    },
    {
      id: "let-it-be",
      title: "Let It Be",
      artist: "The Beatles",
      year: 1970,
      genre: "Rock ballad",
      level: "a2",
      duration: "4:03",
      theme: "Принятие и надежда",
      cover: cover("#D6DFAC", "#8FA775", "#1F2A16", "#F8FFE4", "leaf"),
      description:
        "Спокойная баллада о том, как отпустить тревогу и довериться времени. Простые куплеты, повторы и императивы помогают запомнить полезные фразы для поддержки.",
      why:
        "A2: императивы, будущее will, лексика надежды и поддержки. Медленный темп и ясная дикция.",
      grammar: "Imperatives · will · Past Simple",
      chunks: [
        { en: "let it be", ru: "пусть будет так" },
        { en: "words of wisdom", ru: "мудрые слова" },
        { en: "when times get hard", ru: "когда наступают трудные времена" }
      ],
      vocab: [
        { word: "wisdom", pos: "noun", ipa: "/ˈwɪzdəm/", ru: "мудрость", example: "Her advice is full of quiet wisdom." },
        { word: "answer", pos: "noun / verb", ipa: "/ˈɑːnsə(r)/", ru: "ответ; отвечать", example: "I don’t have an answer yet, and that’s okay." },
        { word: "broken", pos: "adjective", ipa: "/ˈbrəʊkən/", ru: "сломленный, разбитый", example: "He felt broken after the long year." },
        { word: "darkness", pos: "noun", ipa: "/ˈdɑːknəs/", ru: "темнота", example: "The darkness made the stars look brighter." },
        { word: "wake", pos: "verb", ipa: "/weɪk/", ru: "просыпаться, будить", example: "I wake up early when the sun is out." },
        { word: "arise", pos: "verb", ipa: "/əˈraɪz/", ru: "возникать, подниматься", example: "New problems arise when we stop talking." },
        { word: "let go", pos: "phrasal verb", ipa: "/let ɡəʊ/", ru: "отпустить", example: "You can’t change the past, so let it go." },
        { word: "mother", pos: "noun", ipa: "/ˈmʌðə(r)/", ru: "мама, мать", example: "My mother always knows when I need to talk." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «wisdom»?", options: ["мудрость", "скорость", "усталость"], answer: 0, word: "wisdom", explain: "Wisdom — способность принимать мудрые решения, жизненный опыт." },
        { type: "choice", prompt: "Выбери перевод «arise»", options: ["исчезать", "возникать", "спать"], answer: 1, word: "arise", explain: "Arise — появляться, возникать. Часто о проблемах или вопросах." },
        { type: "choice", prompt: "Что значит «let go»?", options: ["держать крепче", "отпустить", "поднять"], answer: 1, word: "let go", explain: "Let go — перестать держаться за что-то, отпустить ситуацию." },
        { type: "gap", prompt: "She spoke with the ___ of someone who had lived a long life.", options: ["wisdom", "darkness", "promise"], answer: 0, word: "wisdom", explain: "With the wisdom of… — с мудростью кого-то." },
        { type: "gap", prompt: "Don’t hold on to the past — sometimes you need to let ___.", options: ["go", "up", "out"], answer: 0, word: "let go", explain: "Фразовый глагол let go не разделяется в этой конструкции." },
        { type: "listen", audio: "There is an answer, so let it be.", prompt: "Послушай фразу. Какая идея звучит?", options: ["Ответ существует, поэтому не нужно бороться.", "Нужно немедленно найти ответ.", "Ответа никогда не будет."], answer: 0, explain: "Let it be — пусть всё идёт своим чередом, отпусти ситуацию." },
        { type: "choice", prompt: "Выбери правильную форму: «Let it ___.»", options: ["is", "be", "was"], answer: 1, explain: "После let + объект используется инфинитив без to: let it be." },
        { type: "choice", prompt: "Какая главная идея песни?", options: ["Принятие и надежда в трудные времена", "Победа в соревновании", "Путешествие по морю"], answer: 0, explain: "Песня о том, что иногда нужно перестать тревожиться и позволить жизни идти дальше." }
      ],
      homework: [
        { title: "Совет от бабушки", type: "Письмо", minutes: 15, task: "Напиши 6–7 предложений с советами для друга, который волнуется из-за экзамена. Используй императивы, let go, wisdom, answer и will.", hint: "Начни с Don’t worry… и закончи Everything will be okay." },
        { title: "Письмо себе", type: "Говорение", minutes: 10, task: "Запиши аудио на 60 секунд: назови одну тревогу и объясни, как ты можешь «let it be». Используй 4 новых слова.", hint: "Говори как будто поддерживаешь близкого друга — это снижает волнение." },
        { title: "Перевод смысла", type: "Перевод", minutes: 15, task: "Переведи на английский четыре идеи, используя слова урока: «мудрые слова», «ответ придёт», «в темноте», «отпусти прошлое». Затем проверь порядок слов.", hint: "Не переводи дословно. Сначала найди главное действие в каждом предложении." }
      ]
    },

    /* ============================== B1 ============================== */
    {
      id: "someone-like-you",
      title: "Someone Like You",
      artist: "Adele",
      year: 2011,
      genre: "Soul / Pop",
      level: "b1",
      duration: "4:45",
      theme: "Расставание и движение дальше",
      cover: cover("#2C2A4A", "#8C5A7A", "#F8E7EF", "#F2A7C3", "rain"),
      description:
        "Душевная баллада о встрече с прошлым и трудном решении двигаться дальше. Живая разговорная лексика и фразовые глаголы делают её отличным материалом для B1.",
      why:
        "B1: фразовые глаголы, Past Simple и Past Perfect, конструкции I wish / I hope, эмоциональный подтекст.",
      grammar: "Past Perfect · wish + Past Perfect · Phrasal verbs",
      chunks: [
        { en: "settle down", ru: "остепениться, создать семью" },
        { en: "out of the blue", ru: "совершенно неожиданно" },
        { en: "move on", ru: "двигаться дальше" }
      ],
      vocab: [
        { word: "settle down", pos: "phrasal verb", ipa: "/ˈsetl daʊn/", ru: "остепениться, начать спокойную жизнь", example: "They decided to settle down in a small town." },
        { word: "regret", pos: "verb / noun", ipa: "/rɪˈɡret/", ru: "сожалеть; сожаление", example: "I regret not saying goodbye properly." },
        { word: "instead", pos: "adverb", ipa: "/ɪnˈsted/", ru: "вместо этого", example: "I wanted to call, but I wrote a letter instead." },
        { word: "arrange", pos: "verb", ipa: "/əˈreɪndʒ/", ru: "договариваться, организовывать", example: "We arranged to meet after the concert." },
        { word: "turn up", pos: "phrasal verb", ipa: "/tɜːn ʌp/", ru: "появляться, приходить", example: "He turned up an hour late without calling." },
        { word: "out of the blue", pos: "idiom", ipa: "/ˌaʊt əv ðə ˈbluː/", ru: "неожиданно, как снег на голову", example: "She called me out of the blue after five years." },
        { word: "glory", pos: "noun", ipa: "/ˈɡlɔːri/", ru: "слава, великолепие", example: "The old theatre has lost its former glory." },
        { word: "move on", pos: "phrasal verb", ipa: "/muːv ɒn/", ru: "двигаться дальше, начинать новую главу", example: "It took her a year to move on after the breakup." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «settle down»?", options: ["переехать в другой город", "остепениться, начать спокойную жизнь", "поссориться"], answer: 1, word: "settle down", explain: "Settle down — обустроиться, часто о создании семьи и спокойной жизни." },
        { type: "choice", prompt: "Выбери перевод идиомы «out of the blue»", options: ["неожиданно", "очень грустно", "на пляже"], answer: 0, word: "out of the blue", explain: "Буквально «из синевы» — совершенно неожиданно, без предупреждения." },
        { type: "choice", prompt: "Что значит «regret»?", options: ["сожалеть", "забывать", "праздновать"], answer: 0, word: "regret", explain: "Regret — жалеть о чём-то. После regret можно использовать -ing: I regret saying that." },
        { type: "gap", prompt: "I was surprised when he called me out of the ___.", options: ["blue", "green", "black"], answer: 0, word: "out of the blue", explain: "Устойчивая идиома: out of the blue." },
        { type: "gap", prompt: "She hopes to ___ down and start a family next year.", options: ["settle", "sit", "turn"], answer: 0, word: "settle down", explain: "Settle down — осесть, начать спокойную семейную жизнь." },
        { type: "listen", audio: "I heard that you are doing well, and I hope you are happy.", prompt: "Послушай фразу. Какое чувство она передаёт?", options: ["Искреннюю надежду на счастье другого", "Злость и желание отомстить", "Полное равнодушие"], answer: 0, explain: "I hope you are happy — надеюсь, ты счастлив. Тон песни скорее светлый, чем злой." },
        { type: "choice", prompt: "Выбери правильную форму: «I wish I ___ known the truth earlier.»", options: ["have", "had", "would"], answer: 1, explain: "Wish + Past Perfect выражает сожаление о прошлом: I wish I had known." },
        { type: "choice", prompt: "Какая тема ближе всего песне?", options: ["Умение отпустить прошлое и двигаться дальше", "Радость от путешествий", "Борьба за власть"], answer: 0, explain: "Песня о встрече с бывшим и о том, как трудно, но необходимо двигаться дальше." }
      ],
      homework: [
        { title: "Письмо в прошлое", type: "Письмо", minutes: 25, task: "Напиши 8–10 предложений человеку из прошлого (без имён). Используй Past Simple, Past Perfect, wish + Past Perfect и 6 новых слов. Не жалуйся — опиши, чему научил этот опыт.", hint: "План: что случилось → что ты понял → что изменилось сейчас." },
        { title: "Монолог «Moving on»", type: "Говорение", minutes: 15, task: "Запиши монолог на 90 секунд о том, как люди переживают перемены. Используй settle down, regret, out of the blue, move on. Добавь один личный пример без лишних деталей.", hint: "Сделай три смысловые паузы: прошлое — чувства — вывод." },
        { title: "Анализ эмоции", type: "Анализ", minutes: 20, task: "Послушай песню и опиши её эмоциональную дугу по-английски: начало, перелом, финал. Используй 5 прилагательных и 3 фразовых глагола. Объём — 120 слов.", hint: "Полезные слова: bittersweet, nostalgic, hopeful, resigned, powerful." }
      ]
    },
    {
      id: "counting-stars",
      title: "Counting Stars",
      artist: "OneRepublic",
      year: 2013,
      genre: "Pop rock",
      level: "b1",
      duration: "4:17",
      theme: "Мечты против денег",
      cover: cover("#24336A", "#3D7EA6", "#EAF6FF", "#74D3D3", "stars"),
      description:
        "Энергичная поп-рок песня о том, что важнее: считать деньги или мечтать. Отличный материал для герундия, абстрактных существительных и разговора о ценностях.",
      why:
        "B1: герундий после предлогов, абстрактная лексика, условные конструкции и чёткая ритмическая структура.",
      grammar: "Gerund after prepositions · Conditionals · Abstract nouns",
      chunks: [
        { en: "chase a dream", ru: "гнаться за мечтой" },
        { en: "worth the effort", ru: "стоить усилий" },
        { en: "count your blessings", ru: "ценить то, что имеешь" }
      ],
      vocab: [
        { word: "worth", pos: "adjective", ipa: "/wɜːθ/", ru: "стоящий, заслуживающий", example: "The trip was tiring, but every hour was worth it." },
        { word: "earn", pos: "verb", ipa: "/ɜːn/", ru: "зарабатывать", example: "She earns money by teaching music." },
        { word: "desire", pos: "noun / verb", ipa: "/dɪˈzaɪə(r)/", ru: "желание; желать", example: "His desire to travel kept him motivated." },
        { word: "fortune", pos: "noun", ipa: "/ˈfɔːtʃuːn/", ru: "состояние; удача", example: "He made a fortune in software, then left it all." },
        { word: "chase", pos: "verb", ipa: "/tʃeɪs/", ru: "гнаться, преследовать", example: "Don’t chase money at the cost of your health." },
        { word: "seek", pos: "verb", ipa: "/siːk/", ru: "искать, стремиться", example: "We seek meaning in small everyday things." },
        { word: "swing", pos: "verb", ipa: "/swɪŋ/", ru: "качаться, раскачиваться", example: "The conversation swung from jokes to serious plans." },
        { word: "soul", pos: "noun", ipa: "/səʊl/", ru: "душа", example: "The song speaks to the soul more than to the mind." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «worth» в фразе «worth the effort»?", options: ["стоящий усилий", "слишком сложный", "бесполезный"], answer: 0, word: "worth", explain: "Worth the effort — стоит затраченных усилий." },
        { type: "choice", prompt: "Выбери перевод «seek»", options: ["прятать", "искать, стремиться", "терять"], answer: 1, word: "seek", explain: "Seek — искать, стремиться к чему-то. Seek — sought — sought." },
        { type: "choice", prompt: "Что значит «fortune»?", options: ["состояние, удача", "неудача", "работа"], answer: 0, word: "fortune", explain: "Fortune может означать и большое состояние, и удачу." },
        { type: "gap", prompt: "This old guitar isn’t ___ much, but it means a lot to me.", options: ["worth", "worthy", "value"], answer: 0, word: "worth", explain: "Be worth + сумма/существительное: it isn’t worth much." },
        { type: "gap", prompt: "Don’t spend your life chasing ___: health and love matter more.", options: ["fortune", "fortunes", "fortunate"], answer: 0, word: "fortune", explain: "Chase fortune — гнаться за богатством. В устойчивом значении «богатство» обычно без артикля." },
        { type: "listen", audio: "I don’t care about money; I want to chase my dreams.", prompt: "Послушай фразу. Что выбрал говорящий?", options: ["Мечты, а не деньги", "Деньги, а не мечты", "Работу за границей"], answer: 0, explain: "Chase my dreams — следовать за мечтой, даже если это не приносит сразу денег." },
        { type: "choice", prompt: "Выбери правильную форму: «Instead of ___ money, he started learning music.»", options: ["count", "counting", "counted"], answer: 1, explain: "После предлога instead of используется герундий: instead of counting." },
        { type: "choice", prompt: "Какая главная идея песни?", options: ["Мечты и смысл важнее материального успеха", "Нужно любой ценой заработать состояние", "Космос опасен для человека"], answer: 0, explain: "Песня противопоставляет погоню за деньгами желанию жить осмысленно и мечтать." }
      ],
      homework: [
        { title: "Эссе «Мечта или деньги»", type: "Письмо", minutes: 30, task: "Напиши эссе 120–150 слов: что важнее — стабильный доход или мечта? Приведи два аргумента и один контраргумент. Используй worth, desire, chase, seek и герундий после предлогов.", hint: "Структура: введение → аргумент 1 → аргумент 2 → контраргумент → вывод." },
        { title: "Дебаты на 90 секунд", type: "Говорение", minutes: 15, task: "Запиши речь в защиту тезиса «Dreams are worth more than money». Используй не менее 6 слов урока и одно условное предложение (If…, …).", hint: "Начни с сильного вопроса: What would you do if money didn’t matter?" },
        { title: "Аудио-детектив", type: "Аудирование", minutes: 15, task: "Послушай песню и выпиши все услышанные формы с -ing. Объясни по-английски, какие из них герундий, а какие — причастие. Добавь три своих примера.", hint: "Проверь: герундий часто выполняет роль существительного — Counting stars is…" }
      ]
    },

    /* ============================== B2 ============================== */
    {
      id: "viva-la-vida",
      title: "Viva la Vida",
      artist: "Coldplay",
      year: 2008,
      genre: "Baroque pop",
      level: "b2",
      duration: "4:01",
      theme: "Падение с вершины власти",
      cover: cover("#8C1C13", "#D9A441", "#FFF1D6", "#F2C14E", "crown"),
      description:
        "Барочная поп-эпопея от лица свергнутого правителя. Исторические образы, пассивные конструкции и метафоры власти превращают песню в большой текст для разбора.",
      why:
        "B2: пассивный залог, narrative tenses, историческая и политическая лексика, развёрнутые метафоры.",
      grammar: "Passive Voice · Narrative tenses · Metaphor",
      chunks: [
        { en: "come to power", ru: "прийти к власти" },
        { en: "fall from grace", ru: "потерять былое величие" },
        { en: "a puppet on a string", ru: "марионетка на ниточке" }
      ],
      vocab: [
        { word: "reign", pos: "noun / verb", ipa: "/reɪn/", ru: "правление; править", example: "The queen’s reign lasted forty years." },
        { word: "throne", pos: "noun", ipa: "/θrəʊn/", ru: "трон", example: "He sat on the throne and looked at the empty hall." },
        { word: "crown", pos: "noun", ipa: "/kraʊn/", ru: "корона", example: "The crown was kept in a glass case." },
        { word: "sword", pos: "noun", ipa: "/sɔːd/", ru: "меч", example: "The old sword hung above the fireplace." },
        { word: "missionary", pos: "noun", ipa: "/ˈmɪʃənri/", ru: "миссионер", example: "The missionary travelled from village to village." },
        { word: "cathedral", pos: "noun", ipa: "/kəˈθiːdrəl/", ru: "собор", example: "The cathedral was built in the centre of the city." },
        { word: "revolution", pos: "noun", ipa: "/ˌrevəˈluːʃn/", ru: "революция", example: "The revolution changed the country forever." },
        { word: "puppet", pos: "noun", ipa: "/ˈpʌpɪt/", ru: "марионетка, кукла", example: "The ruler was a puppet controlled by others." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «reign»?", options: ["правление; править", "дождь", "побег"], answer: 0, word: "reign", explain: "Reign — период правления монарха или глагол «править». Не путать с rain (дождь)." },
        { type: "choice", prompt: "Выбери перевод слова «throne»", options: ["трон", "трость", "порог"], answer: 0, word: "throne", explain: "Throne — трон, символ власти." },
        { type: "choice", prompt: "Кого называют «puppet» в переносном смысле?", options: ["Марионетку, человека под чужим контролем", "Художника", "Путешественника"], answer: 0, word: "puppet", explain: "Puppet — кукла, марионетка. В политике — лидер, действующий по чужой воле." },
        { type: "gap", prompt: "The king sat on his ___ and watched the crowd.", options: ["throne", "crown", "sword"], answer: 0, word: "throne", explain: "Sit on the throne — сидеть на троне." },
        { type: "gap", prompt: "After the revolution, the old ___ came to an end.", options: ["reign", "rain", "ring"], answer: 0, word: "reign", explain: "The old reign — старое правление. Reign — существительное." },
        { type: "listen", audio: "He used to rule the world, but now he wakes up alone.", prompt: "Послушай фразу. Что произошло с героем?", options: ["Он потерял власть и остался один", "Он стал ещё могущественнее", "Он отправился в путешествие"], answer: 0, explain: "Used to rule — когда-то правил. Now he wakes up alone — контраст прошлого и настоящего." },
        { type: "choice", prompt: "Выбери правильную форму: «The palace ___ in 1750.»", options: ["built", "was built", "has built"], answer: 1, explain: "Дворец не строил сам себя: нужен Passive Voice — was built." },
        { type: "choice", prompt: "Какая главная тема песни?", options: ["Хрупкость власти и славы", "Радость от путешествий", "История первой любви"], answer: 0, explain: "Герой вспоминает былое могущество и понимает, как легко его потерять." }
      ],
      homework: [
        { title: "Дневник свергнутого короля", type: "Письмо", minutes: 25, task: "Напиши 10 предложений от лица правителя после падения. Используй Past Simple, Past Perfect, Passive Voice и 7 новых слов. Передай контраст между прошлым и настоящим.", hint: "Начни: I used to… But now… I was…" },
        { title: "Историческое расследование", type: "Анализ", minutes: 30, task: "Выбери любого правителя и напиши 120 слов по-английски: как он пришёл к власти, что построил и почему потерял влияние. Используй минимум 5 пассивных конструкций.", hint: "Полезные глаголы: was crowned, was built, was controlled, was remembered." },
        { title: "Карта слов власти", type: "Творчество", minutes: 20, task: "Создай интеллект-карту из 8 слов урока: throne, crown, sword, reign, revolution, puppet, cathedral, missionary. Для каждого дай пример на английском и русский перевод.", hint: "Свяжи слова стрелками: кто с кем и как связан?" }
      ]
    },
    {
      id: "sound-of-silence",
      title: "The Sound of Silence",
      artist: "Simon & Garfunkel",
      year: 1964,
      genre: "Folk rock",
      level: "b2",
      duration: "3:05",
      theme: "Одиночество и потеря связи",
      cover: cover("#12181A", "#2F4B4F", "#DDEBE8", "#7FB7B4", "echo"),
      description:
        "Поэтическая притча о человеке, который не может достучаться до других. Символы, олицетворения и тревожная атмосфера дают богатый материал для B2.",
      why:
        "B2: литературные приёмы, абстрактные существительные, олицетворение и интерпретация подтекста.",
      grammar: "Metaphor · Personification · Past Simple",
      chunks: [
        { en: "break the silence", ru: "нарушить тишину" },
        { en: "a creeping feeling", ru: "подкрадывающееся чувство" },
        { en: "echo in the dark", ru: "эхо в темноте" }
      ],
      vocab: [
        { word: "vision", pos: "noun", ipa: "/ˈvɪʒn/", ru: "видение, образ", example: "The artist had a clear vision of the final painting." },
        { word: "creep", pos: "verb", ipa: "/kriːp/", ru: "подкрадываться, ползти", example: "A strange feeling began to creep over me." },
        { word: "seed", pos: "noun", ipa: "/siːd/", ru: "семя", example: "A doubt was planted like a seed in his mind." },
        { word: "echo", pos: "noun / verb", ipa: "/ˈekəʊ/", ru: "эхо; отдаваться эхом", example: "Her voice echoed through the empty hall." },
        { word: "disturb", pos: "verb", ipa: "/dɪˈstɜːb/", ru: "беспокоить, нарушать", example: "Please don’t disturb him while he is working." },
        { word: "silence", pos: "noun", ipa: "/ˈsaɪləns/", ru: "тишина, молчание", example: "The silence in the room was louder than words." },
        { word: "prophet", pos: "noun", ipa: "/ˈprɒfɪt/", ru: "пророк", example: "The prophet warned people about the coming storm." },
        { word: "pavement", pos: "noun", ipa: "/ˈpeɪvmənt/", ru: "тротуар", example: "Rain fell on the empty pavement." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «creep»?", options: ["подкрадываться, ползти", "громко петь", "прыгать"], answer: 0, word: "creep", explain: "Creep — двигаться медленно и незаметно. A creeping feeling — подкрадывающееся чувство." },
        { type: "choice", prompt: "Выбери перевод «disturb»", options: ["беспокоить", "украшать", "объяснять"], answer: 0, word: "disturb", explain: "Disturb — мешать, беспокоить. Do not disturb — не беспокоить." },
        { type: "choice", prompt: "Что такое «echo»?", options: ["эхо", "эхо-камера", "электричество"], answer: 0, word: "echo", explain: "Echo — отражённый звук. Может быть и глаголом: the sound echoed." },
        { type: "gap", prompt: "A strange feeling began to ___ over me.", options: ["creep", "crawl", "climb"], answer: 0, word: "creep", explain: "Creep over someone — постепенно охватывать кого-то (о чувстве)." },
        { type: "gap", prompt: "Please don’t ___ him while he is working.", options: ["disturb", "disturbing", "disturbed"], answer: 0, word: "disturb", explain: "После don’t нужен инфинитив без to: don’t disturb." },
        { type: "listen", audio: "The silence in the room was louder than words.", prompt: "Что означает эта метафора?", options: ["Молчание было очень значимым и напряжённым", "В комнате было шумно", "Все громко разговаривали"], answer: 0, explain: "Silence louder than words — тишина говорит громче слов. Это метафора эмоционального напряжения." },
        { type: "choice", prompt: "Выбери правильную форму: «The words ___ like a prayer in the empty hall.»", options: ["echoed", "echo", "echoing"], answer: 0, explain: "Past Simple для завершённого действия в прошлом: echoed." },
        { type: "choice", prompt: "Какая главная тема песни?", options: ["Одиночество и неспособность людей услышать друг друга", "Радость городской жизни", "История о морском путешествии"], answer: 0, explain: "Песня о людях, которые молчат и не слышат друг друга, хотя находятся рядом." }
      ],
      homework: [
        { title: "Тишина в городе", type: "Письмо", minutes: 25, task: "Опиши городскую сцену в 120–150 словах, где тишина важнее звука. Используй 7 новых слов, минимум одну метафору и одно олицетворение.", hint: "Олицетворение: the street held its breath; the windows watched." },
        { title: "Подкаст «Почему мы не слышим»", type: "Говорение", minutes: 20, task: "Запиши аудио на 2 минуты: почему люди перестают слушать друг друга и как это исправить. Используй silence, disturb, echo, vision. Добавь пример из жизни.", hint: "Структура: вопрос → причина → пример → решение." },
        { title: "Поэтический перевод", type: "Перевод", minutes: 20, task: "Придумай на русском четыре метафорические фразы о тишине и переведи их на английский. Не копируй текст песни. Объясни по-английски выбор образов.", hint: "Сравни прямой перевод и образный: что звучит сильнее?" }
      ]
    },

    /* ============================== C1 ============================== */
    {
      id: "bohemian-rhapsody",
      title: "Bohemian Rhapsody",
      artist: "Queen",
      year: 1975,
      genre: "Art rock",
      level: "c1",
      duration: "5:55",
      theme: "Внутренний конфликт и свобода",
      cover: cover("#19151A", "#5C3B63", "#F7E9D7", "#E7B75B", "stage"),
      description:
        "Шестиминутная рок-сюита: баллада превращается в оперу, а затем в жёсткий рок. История героя, который ищет прощения и свободы, открывает сложный пласт языка.",
      why:
        "C1: третий conditional, инверсия, драматический регистр, юридическая и религиозная лексика, игра со стилями.",
      grammar: "Third conditional · Inversion · Dramatic register",
      chunks: [
        { en: "face the consequences", ru: "столкнуться с последствиями" },
        { en: "beg for mercy", ru: "молить о пощаде" },
        { en: "a matter of life and death", ru: "вопрос жизни и смерти" }
      ],
      vocab: [
        { word: "fantasy", pos: "noun", ipa: "/ˈfæntəsi/", ru: "фантазия", example: "The film mixes reality and fantasy." },
        { word: "reality", pos: "noun", ipa: "/riˈæləti/", ru: "реальность", example: "It took him years to accept reality." },
        { word: "escape", pos: "verb / noun", ipa: "/ɪˈskeɪp/", ru: "убежать; побег", example: "Music was his escape from a noisy world." },
        { word: "consequence", pos: "noun", ipa: "/ˈkɒnsɪkwəns/", ru: "последствие", example: "Every choice has a consequence." },
        { word: "confession", pos: "noun", ipa: "/kənˈfeʃn/", ru: "признание", example: "Her confession surprised everyone in the room." },
        { word: "mercy", pos: "noun", ipa: "/ˈmɜːsi/", ru: "пощада, милосердие", example: "The judge showed mercy and reduced the sentence." },
        { word: "verdict", pos: "noun", ipa: "/ˈvɜːdɪkt/", ru: "вердикт, решение", example: "The jury reached a verdict after three hours." },
        { word: "destiny", pos: "noun", ipa: "/ˈdestəni/", ru: "судьба", example: "He believed it was his destiny to become a musician." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «consequence»?", options: ["последствие", "согласие", "причина"], answer: 0, word: "consequence", explain: "Consequence — результат, последствие действия. Often used in the phrase face the consequences." },
        { type: "choice", prompt: "Выбери перевод «mercy»", options: ["пощада, милосердие", "торговля", "память"], answer: 0, word: "mercy", explain: "Mercy — сострадание, готовность простить. Beg for mercy — молить о пощаде." },
        { type: "choice", prompt: "Что такое «verdict»?", options: ["вердикт, решение суда", "вопрос", "свидетель"], answer: 0, word: "verdict", explain: "Verdict — официальное решение присяжных или судьи." },
        { type: "gap", prompt: "Every choice has a ___, so think before you act.", options: ["consequence", "confession", "destiny"], answer: 0, word: "consequence", explain: "Have a consequence — иметь последствие." },
        { type: "gap", prompt: "The jury reached a ___ after three hours of discussion.", options: ["verdict", "mercy", "fantasy"], answer: 0, word: "verdict", explain: "Reach a verdict — вынести решение. Устойчивая коллокация." },
        { type: "listen", audio: "I have to face the consequences of my actions.", prompt: "Что собирается сделать говорящий?", options: ["Признать последствия своих поступков", "Избежать ответственности", "Пожаловаться на суд"], answer: 0, explain: "Face the consequences — принять последствия, не убегать от них." },
        { type: "choice", prompt: "Выбери правильную форму: «If I ___ known, I would have acted differently.»", options: ["had", "have", "would"], answer: 0, explain: "Third conditional: If + Past Perfect, would have + V3. Речь о нереальном прошлом." },
        { type: "choice", prompt: "Что происходит с героем песни?", options: ["Он переживает внутренний конфликт и ищет свободу", "Он побеждает в спортивном турнире", "Он открывает ресторан"], answer: 0, explain: "Герой проходит через признание, суд, отчаяние и надежду — это драма внутреннего освобождения." }
      ],
      homework: [
        { title: "Суд над собой", type: "Письмо", minutes: 30, task: "Напиши драматический монолог на 150 слов: герой признаёт ошибку, слышит вердикт и просит пощады. Используй confession, mercy, verdict, consequence, destiny и третье условное предложение.", hint: "Меняй ритм: короткие предложения в момент признания, длинные — в размышлении." },
        { title: "Оперная сцена", type: "Говорение", minutes: 20, task: "Запиши 90-секундный монолог с меняющимся регистром: начни спокойно, перейди к отчаянию и закончи надеждой. Используй 6 слов урока и хотя бы одну инверсию (Never have I…).", hint: "Не бойся пауз и смены темпа — это часть драматургии." },
        { title: "Разбор конфликта", type: "Анализ", minutes: 30, task: "Напиши 180 слов о внутреннем конфликте героя: чего он хочет, чего боится и что выбирает. Подкрепи тезисы образами из песни и 7 новыми словами.", hint: "Не пересказывай сюжет. Отвечай на вопрос «почему?»." }
      ]
    },
    {
      id: "logical-song",
      title: "The Logical Song",
      artist: "Supertramp",
      year: 1979,
      genre: "Progressive pop",
      level: "c1",
      duration: "4:11",
      theme: "Ирония над взрослым миром",
      cover: cover("#1B2A6B", "#4A6FE3", "#F3F7FF", "#C7F36B", "grid"),
      description:
        "Сатира на образование и общество, которое требует быть «логичным, разумным и практичным». Игра словообразований и риторические вопросы — настоящая тренировка C1.",
      why:
        "C1: словообразование, риторические вопросы, ирония, абстрактные прилагательные и смена регистра.",
      grammar: "Word formation · Rhetorical questions · Reported speech",
      chunks: [
        { en: "a sensible decision", ru: "разумное решение" },
        { en: "a cynical view", ru: "циничный взгляд" },
        { en: "question authority", ru: "подвергать сомнению авторитеты" }
      ],
      vocab: [
        { word: "logical", pos: "adjective", ipa: "/ˈlɒdʒɪkl/", ru: "логичный", example: "It was a logical conclusion, but not an obvious one." },
        { word: "sensible", pos: "adjective", ipa: "/ˈsensəbl/", ru: "разумный, благоразумный", example: "The sensible thing is to ask for help." },
        { word: "responsible", pos: "adjective", ipa: "/rɪˈspɒnsəbl/", ru: "ответственный", example: "She is responsible for the whole project." },
        { word: "practical", pos: "adjective", ipa: "/ˈpræktɪkl/", ru: "практичный, практический", example: "We need a practical solution, not a beautiful theory." },
        { word: "cynical", pos: "adjective", ipa: "/ˈsɪnɪkl/", ru: "циничный", example: "He has a cynical view of politics." },
        { word: "radical", pos: "adjective", ipa: "/ˈrædɪkl/", ru: "радикальный", example: "The band suggested a radical change to the education system." },
        { word: "fanatical", pos: "adjective", ipa: "/fəˈnætɪkl/", ru: "фанатичный", example: "He is fanatical about keeping the studio clean." },
        { word: "absurd", pos: "adjective", ipa: "/əbˈsɜːd/", ru: "абсурдный", example: "It sounds absurd to buy a new phone every month." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «sensible»?", options: ["чувствительный", "разумный, благоразумный", "скучный"], answer: 1, word: "sensible", explain: "Sensible — разумный, практичный. Не путать с sensitive (чувствительный)." },
        { type: "choice", prompt: "Выбери перевод «cynical»", options: ["циничный", "весёлый", "застенчивый"], answer: 0, word: "cynical", explain: "Cynical — не верящий в искренность людей, склонный видеть корысть." },
        { type: "choice", prompt: "Что значит «absurd»?", options: ["абсурдный", "абсолютный", "вежливый"], answer: 0, word: "absurd", explain: "Absurd — нелепый, противоречащий здравому смыслу." },
        { type: "gap", prompt: "It sounds ___ to buy a new phone every month, but people do it.", options: ["absurd", "sensible", "responsible"], answer: 0, word: "absurd", explain: "Absurd описывает нелепую ситуацию." },
        { type: "gap", prompt: "She is very ___ with money and never wastes it.", options: ["sensible", "fanatical", "radical"], answer: 0, word: "sensible", explain: "Sensible with money — разумно обращаться с деньгами." },
        { type: "listen", audio: "They told me to be logical, sensible and practical.", prompt: "Что от говорящего требовали?", options: ["Быть логичным, разумным и практичным", "Быть весёлым и спонтанным", "Много путешествовать"], answer: 0, explain: "Told me to be… — велели быть…; перечисление прилагательных передаёт давление ожиданий." },
        { type: "choice", prompt: "Выбери правильную форму: «He asked me ___ I was happy.»", options: ["if", "that", "what"], answer: 0, explain: "В косвенном вопросе да/нет используется if (или whether)." },
        { type: "choice", prompt: "Какой тон у песни?", options: ["Ироничный, с критикой общества", "Романтичный и нежный", "Торжественный и официальный"], answer: 0, explain: "Песня сатирически показывает, как общество превращает человека в набор «полезных» качеств." }
      ],
      homework: [
        { title: "Письмо школе", type: "Письмо", minutes: 30, task: "Напиши письмо на 150 слов: чему должна учить школа, кроме «логичного и практичного»? Используй 6 прилагательных урока и два риторических вопроса.", hint: "Риторический вопрос не требует ответа: Why do we…? What if…?" },
        { title: "Сатирические правила", type: "Творчество", minutes: 20, task: "Придумай пять абсурдных правил для взрослых (например, в офисе). Напиши их по-английски с must / mustn’t и объясни, над чем ты смеёшься, в одном предложении.", hint: "Сатира работает через преувеличение. Сделай правило узнаваемым, но невозможным." },
        { title: "Словообразовательная лаборатория", type: "Язык", minutes: 20, task: "Составь таблицу из 10 слов: существительное → прилагательное → наречие (logic → logical → logically). Добавь по одному примеру на английском. Найди в песне ещё три однокоренных слова.", hint: "Суффиксы: -ic, -al, -ous, -able, -ive. Не все формы существуют — проверяй по словарю." }
      ]
    },

    /* ============================== C2 ============================== */
    {
      id: "hallelujah",
      title: "Hallelujah",
      artist: "Leonard Cohen",
      year: 1984,
      genre: "Folk rock",
      level: "c2",
      duration: "4:39",
      theme: "Вера, сомнение и несовершенная любовь",
      cover: cover("#2B1833", "#7A4B5E", "#F8E8D4", "#D9A441", "halo"),
      description:
        "Многослойная баллада с библейскими отсылками и образами музыки, веры и падения. Каждая строфа — отдельная притча, требующая культурного и языкового комментария.",
      why:
        "C2: литературный и религиозный контекст, инверсия, высокая лексика, метафора и интерпретация на нескольких уровнях.",
      grammar: "Inversion · Literary metaphor · Biblical references",
      chunks: [
        { en: "compose a melody", ru: "сочинить мелодию" },
        { en: "a leap of faith", ru: "шаг веры, доверие без гарантий" },
        { en: "holy and human", ru: "святое и человеческое" }
      ],
      vocab: [
        { word: "hallelujah", pos: "interjection / noun", ipa: "/ˌhælɪˈluːjə/", ru: "аллилуйя", example: "The choir sang hallelujah at the end of the service." },
        { word: "baffled", pos: "adjective", ipa: "/ˈbæfld/", ru: "озадаченный, в недоумении", example: "I was completely baffled by his strange question." },
        { word: "compose", pos: "verb", ipa: "/kəmˈpəʊz/", ru: "сочинять (музыку), составлять", example: "She composed a beautiful melody in one evening." },
        { word: "chord", pos: "noun", ipa: "/kɔːd/", ru: "аккорд", example: "That chord sounds mysterious and warm." },
        { word: "faith", pos: "noun", ipa: "/feɪθ/", ru: "вера", example: "Her faith helped her through the hardest months." },
        { word: "holy", pos: "adjective", ipa: "/ˈhəʊli/", ru: "святой, священный", example: "The place felt quiet and holy." },
        { word: "doubtful", pos: "adjective", ipa: "/ˈdaʊtfl/", ru: "сомневающийся; сомнительный", example: "He looked doubtful, but he agreed to try." },
        { word: "praise", pos: "noun / verb", ipa: "/preɪz/", ru: "хвала; хвалить", example: "The song is a praise of love in all its forms." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «baffled»?", options: ["озадаченный, в недоумении", "восторженный", "уставший"], answer: 0, word: "baffled", explain: "Baffled — совершенно сбитый с толку, не понимающий." },
        { type: "choice", prompt: "Выбери перевод «compose»", options: ["сочинять музыку", "кричать", "хранить"], answer: 0, word: "compose", explain: "Compose music — сочинять музыку. Composer — композитор." },
        { type: "choice", prompt: "Что такое «chord»?", options: ["аккорд", "струна", "нота"], answer: 0, word: "chord", explain: "Chord — сочетание трёх и более нот, звучащих одновременно." },
        { type: "gap", prompt: "I was completely ___ by his strange question.", options: ["baffled", "holy", "doubtful"], answer: 0, word: "baffled", explain: "Baffled by something — озадачен чем-то." },
        { type: "gap", prompt: "She managed to ___ a beautiful melody in one evening.", options: ["compose", "composing", "composition"], answer: 0, word: "compose", explain: "Manage to + инфинитив: managed to compose." },
        { type: "listen", audio: "He composed a song that sounded holy and strange.", prompt: "Какой была песня?", options: ["Святой и странной", "Громкой и весёлой", "Короткой и простой"], answer: 0, explain: "Sounded holy and strange — звучала свято и странно. Sounded + прилагательное." },
        { type: "choice", prompt: "Выбери правильную форму: «___ I known the truth, I would have stayed.»", options: ["Had", "Have", "If"], answer: 0, explain: "Инверсия в третьем conditional: Had I known… = If I had known…" },
        { type: "choice", prompt: "Какая главная тема песни?", options: ["Вера, сомнение и несовершенная любовь", "Спортивные достижения", "Политическая революция"], answer: 0, explain: "Песня соединяет библейские образы, музыку и человеческую любовь — святую и земную одновременно." }
      ],
      homework: [
        { title: "Литературный анализ", type: "Анализ", minutes: 35, task: "Напиши 180 слов о том, как в песне соединены вера и сомнение. Используй faith, holy, doubtful, praise, chord и хотя бы одну инверсию. Не пересказывай сюжет — анализируй образы.", hint: "Тезис → два образа → вывод. Цитируй не больше 3–4 слов подряд." },
        { title: "Своя строфа", type: "Творчество", minutes: 25, task: "Напиши четверостишие на английском (не копируй песню) о моменте сомнения и надежды. Используй слова holy, doubtful, chord, faith. Затем объясни выбор образов в 3 предложениях.", hint: "Сначала выбери одну центральную метафору, потом строй вокруг неё." },
        { title: "Культурное расследование", type: "Исследование", minutes: 30, task: "Найди две библейские отсылки, которые обычно связывают с этой песней, и объясни их по-английски в 100–120 словах. Укажи источник и не копируй большие фрагменты текста.", hint: "Ищи истории о царе Давиде и Самсоне. Объясни, зачем автору эти параллели." }
      ]
    },
    {
      id: "wuthering-heights",
      title: "Wuthering Heights",
      artist: "Kate Bush",
      year: 1978,
      genre: "Art rock",
      level: "c2",
      duration: "4:29",
      theme: "Страсть, свобода и разрушение",
      cover: cover("#23302A", "#566B5C", "#F0F4E9", "#B8C9A7", "moor"),
      description:
        "Песня, написанная по мотивам романа Эмили Бронте. Ветреные пустоши, призраки и сильная страсть создают один из самых литературных текстов в поп-музыке.",
      why:
        "C2: литературная лексика, инверсия, образный язык, культурные отсылки и работа с настроением текста.",
      grammar: "Inversion · Literary vocabulary · Imagery",
      chunks: [
        { en: "the wild moors", ru: "дикие пустоши" },
        { en: "roam free", ru: "бродить на свободе" },
        { en: "a cruel twist of fate", ru: "жестокая превратность судьбы" }
      ],
      vocab: [
        { word: "wuthering", pos: "adjective", ipa: "/ˈwʌðərɪŋ/", ru: "завывающий (о ветре); пустынный", example: "The wuthering wind shook the windows all night." },
        { word: "moor", pos: "noun", ipa: "/mɔː(r)/", ru: "пустошь, вересковая степь", example: "They walked for hours across the empty moor." },
        { word: "roam", pos: "verb", ipa: "/rəʊm/", ru: "бродить, скитаться", example: "She loves to roam across the fields at sunset." },
        { word: "weep", pos: "verb", ipa: "/wiːp/", ru: "плакать, рыдать", example: "He wept when he heard the old song." },
        { word: "cruel", pos: "adjective", ipa: "/ˈkruːəl/", ru: "жестокий", example: "It was a cruel joke, and nobody laughed." },
        { word: "grief", pos: "noun", ipa: "/ɡriːf/", ru: "горе, скорбь", example: "Her grief was quiet but deep." },
        { word: "threshold", pos: "noun", ipa: "/ˈθreʃhəʊld/", ru: "порог", example: "He stopped at the threshold, afraid to enter." },
        { word: "wild", pos: "adjective", ipa: "/waɪld/", ru: "дикий, необузданный", example: "The garden had grown wild over the summer." }
      ],
      quiz: [
        { type: "choice", prompt: "Что значит «wuthering»?", options: ["завывающий (о ветре)", "тёплый", "солнечный"], answer: 0, word: "wuthering", explain: "Wuthering описывает сильный завывающий ветер. В романе это часть названия поместья." },
        { type: "choice", prompt: "Выбери перевод «moor»", options: ["пустошь", "море", "гора"], answer: 0, word: "moor", explain: "Moor — открытая болотистая пустошь, характерный пейзаж Англии." },
        { type: "choice", prompt: "Что значит «roam»?", options: ["бродить, скитаться", "спать", "строить"], answer: 0, word: "roam", explain: "Roam — свободно бродить без конкретной цели." },
        { type: "gap", prompt: "The wind was ___ across the empty hills all night.", options: ["wuthering", "weeping", "roaming"], answer: 0, word: "wuthering", explain: "Wuthering wind — завывающий ветер. Слово звукоподражательное." },
        { type: "gap", prompt: "She loves to ___ across the fields at sunset.", options: ["roam", "roams", "roaming"], answer: 0, word: "roam", explain: "После love to нужен инфинитив: loves to roam." },
        { type: "listen", audio: "I must go and roam the misty moors tonight.", prompt: "Куда собирается героиня?", options: ["Бродить по туманным пустошам", "В город на концерт", "Домой спать"], answer: 0, explain: "Roam the moors — бродить по пустошам. Misty — туманный." },
        { type: "choice", prompt: "Выбери правильную форму: «Never ___ I felt so free as on the moor.»", options: ["have", "has", "did"], answer: 0, explain: "Инверсия после Never: Never have I felt… — Я никогда не чувствовал себя так свободно." },
        { type: "choice", prompt: "Какая главная тема песни?", options: ["Страстная, разрушительная любовь и свобода", "Учёба в университете", "Путешествие по морю"], answer: 0, explain: "Песня передаёт страсть Кэти и Хитклиффа, их связь с дикой природой и разрушительную силу чувства." }
      ],
      homework: [
        { title: "Пейзаж как характер", type: "Письмо", minutes: 30, task: "Опиши место, которое отражает твоё внутреннее состояние, в 150 словах. Используй wuthering, moor, wild, grief и одну инверсию. Пейзаж должен «говорить» за героя.", hint: "Не называй эмоцию прямо — покажи её через погоду, звуки и движения." },
        { title: "Дневник Кэти", type: "Письмо", minutes: 30, task: "Напиши 12 предложений от лица героини после ключевой сцены романа. Используй Past Perfect, инверсию и 6 слов урока. Не копируй текст песни.", hint: "Начни с Never had I felt… — это сразу задаст литературный регистр." },
        { title: "Сравнение с романом", type: "Исследование", minutes: 35, task: "Прочитай краткое содержание романа «Грозовой перевал» и сравни его с песней. Напиши 150 слов: что взято из книги, а что добавлено музыкой? Используй минимум 5 слов урока.", hint: "Сравнивай не события, а настроение, точку зрения и центральный образ." }
      ]
    }
  ];

  let ALL_WORDS = SONGS.flatMap((song) =>
    song.vocab.map((v, index) => ({
      ...v,
      id: `${song.id}-${index}`,
      songId: song.id,
      songTitle: song.title,
      artist: song.artist,
      level: song.level
    }))
  );

  const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((level) => [level.id, level]));
  let SONG_BY_ID = Object.fromEntries(SONGS.map((song) => [song.id, song]));
  let THEORY = [];
  let THEORY_BY_ID = {};

  function hydrate() {
    const levelOrder = new Map(LEVELS.map((level, index) => [level.id, index]));
    const motifs = ["wave", "sun", "orbit", "leaf", "rain", "stars", "crown", "echo", "stage", "grid", "halo", "moor"];
    SONGS.sort((a, b) => (levelOrder.get(a.level) ?? 99) - (levelOrder.get(b.level) ?? 99));
    SONGS.forEach((song, index) => {
      song.vocab = Array.isArray(song.vocab) ? song.vocab : [];
      song.quiz = Array.isArray(song.quiz) ? song.quiz : [];
      song.homework = Array.isArray(song.homework) ? song.homework : [];
      song.chunks = Array.isArray(song.chunks) ? song.chunks : [];
      song.theory = Array.isArray(song.theory) ? song.theory : [];
      song.facts = Array.isArray(song.facts) ? song.facts : [];
      song.listenNext = Array.isArray(song.listenNext) ? song.listenNext : [];
      song.structure = Array.isArray(song.structure) ? song.structure : [];
      if (!song.cover || typeof song.cover !== "object") {
        song.cover = { bg1: "#F6C1AB", bg2: "#E8552F", ink: "#2A1510", accent: "#FFE4CF", motif: "wave" };
      }
      if (!motifs.includes(song.cover.motif)) {
        song.cover.motif = motifs[index % motifs.length];
      }
      const details = window.LYRICA_HOMEWORK_DETAILS && window.LYRICA_HOMEWORK_DETAILS[song.id];
      if (details && typeof details === "object") {
        song.homework.forEach((task, taskIndex) => {
          if (details[taskIndex] && task) Object.assign(task, details[taskIndex]);
        });
      }
    });
    ALL_WORDS = SONGS.flatMap((song) =>
      song.vocab.map((v, index) => ({
        ...v,
        id: `${song.id}-${index}`,
        songId: song.id,
        songTitle: song.title,
        artist: song.artist,
        level: song.level
      }))
    );
    SONG_BY_ID = Object.fromEntries(SONGS.map((song) => [song.id, song]));
    THEORY = Array.isArray(window.LYRICA_THEORY) ? window.LYRICA_THEORY : [];
    THEORY_BY_ID = Object.fromEntries(THEORY.map((topic) => [topic.id, topic]));
  }

  function mergeContent() {
    ["a1", "a2", "b1", "b2", "c1", "c2"].forEach((level) => {
      const key = `LYRICA_EXTRA_${level.toUpperCase()}`;
      const pack = Array.isArray(window[key]) ? window[key] : [];
      pack.forEach((song) => {
        if (!song || !song.id || SONG_BY_ID[song.id]) return;
        song.level = level;
        SONGS.push(song);
      });
    });

    const patch = window.LYRICA_PATCH && typeof window.LYRICA_PATCH === "object" ? window.LYRICA_PATCH : {};
    Object.entries(patch).forEach(([id, extra]) => {
      const song = SONG_BY_ID[id];
      if (!song || !extra) return;
      if (Array.isArray(extra.extraVocab)) song.vocab.push(...extra.extraVocab);
      if (Array.isArray(extra.extraHomework)) song.homework.push(...extra.extraHomework);
      if (Array.isArray(extra.theory)) song.theory = Array.from(new Set([...(song.theory || []), ...extra.theory]));
      if (extra.artistBio) song.artistBio = extra.artistBio;
      if (extra.sourceNote) song.sourceNote = extra.sourceNote;
      ["facts", "listenNext", "structure"].forEach((field) => {
        if (Array.isArray(extra[field]) && extra[field].length) song[field] = extra[field];
      });
    });

    hydrate();
    return { SONGS, ALL_WORDS, THEORY };
  }

  hydrate();

  return {
    LEVELS,
    SONGS,
    get ALL_WORDS() { return ALL_WORDS; },
    LEVEL_BY_ID,
    get SONG_BY_ID() { return SONG_BY_ID; },
    get THEORY() { return THEORY; },
    get THEORY_BY_ID() { return THEORY_BY_ID; },
    mergeContent
  };
})();
