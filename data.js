/**
 * DATA SOURCE: Descriptive Text - Great Athletes (Grade X)
 * SMA PLUS PGRI CIBINONG - TAHUN AJARAN 2026/2027
 */

const APP_DATA = {
  schoolInfo: {
    name: "SMA PLUS PGRI CIBINONG",
    subject: "Bahasa Inggris (English)",
    grade: "X (Fase E)",
    chapter: "Chapter 1: Great Athletes",
    topic: "Descriptive Text (Reading Literacy & Language Features)",
    academicYear: "2026/2027"
  },

  // 1. MATERI PEMBELAJARAN
  theory: {
    descriptiveText: {
      definition: "A Descriptive Text is a text that describes a particular person, place, or thing in detail. In this chapter, we describe Great Athletes—their physical appearance, personality traits, distinctive skills, and notable achievements.",
      socialFunction: "To describe, identify, and reveal the specific characteristics, qualities, and achievements of a particular athlete to the readers.",
      genericStructure: [
        {
          part: "1. Identification",
          description: "Introduces the subject (who the athlete is, nationality, sport, and general overview).",
          example: "Thom Jan Marinus Haye is an accomplished professional football player who commands the midfield for both Persib Bandung and the Indonesian national team."
        },
        {
          part: "2. Description",
          description: "Provides specific details regarding the athlete's physical appearance (height, build), skills/abilities (passing, speed, tactical vision), personality traits (composed, vibrant), and achievements.",
          example: "Standing tall at 187 cm with a sturdy physical build, he brings both size and balance to the center of the pitch..."
        }
      ],
      languageFeatures: [
        "Focus on specific participants (e.g., Thom Haye, Usain Bolt, Anthony Ginting).",
        "Use of Simple Present Tense for facts, qualities, and current states (e.g., 'He operates in a deep-lying role').",
        "Abundant use of Adjectives to describe physical features and playing style (e.g., 'sturdy', 'tactical', 'imposing', 'vibrant').",
        "Use of Adverbs of Manner/Frequency to describe how or how often the athlete performs actions (e.g., 'regularly', 'aggressively', 'cleanly', 'universally').",
        "Action verbs (e.g., 'commands', 'dictates', 'sprints', 'smashes')."
      ]
    },

    adjectivesVsAdverbs: {
      explanation: "Understanding the distinction between Adjectives and Adverbs is essential for analyzing and creating descriptive texts about athletes.",
      comparisonTable: [
        {
          element: "Definition",
          adjective: "Modifies or describes a <strong>Noun</strong> (person, athlete, body part, quality, object).",
          adverb: "Modifies a <strong>Verb</strong> (action), an <strong>Adjective</strong>, or another <strong>Adverb</strong>. It tells <em>how, when, where,</em> or <em>to what degree</em> an action happens."
        },
        {
          element: "Questions Answered",
          adjective: "What kind? Which one? How many? (e.g. <em>What kind of player? A tactical player.</em>)",
          adverb: "How? In what manner? How often? (e.g. <em>How does he pass? He passes accurately.</em>)"
        },
        {
          element: "Typical Position",
          adjective: "Before the noun (<em>pinpoint pass</em>) or after linking verbs like <em>is, seems, stands</em> (<em>He is tall</em>).",
          adverb: "Usually ends in <strong>-ly</strong> (though not always), placed near verbs (<em>pushes aggressively</em>) or before adjectives (<em>universally recognized</em>)."
        }
      ],
      examplesFromAthletes: [
        {
          type: "Adjectives (Describing Nouns)",
          items: [
            { word: "sturdy", sentence: "He has a <strong>sturdy</strong> physical build. (describes 'build')", category: "Physical Appearance" },
            { word: "tactical", sentence: "Supporters admire his <strong>tactical</strong> vision. (describes 'vision')", category: "Intellectual / Playing Quality" },
            { word: "imposing", sentence: "Standing at an <strong>imposing</strong> 195 cm... (describes height/presence)", category: "Physical Appearance" },
            { word: "vibrant", sentence: "Bolt captivates with his <strong>vibrant</strong> charisma. (describes 'charisma')", category: "Personality" }
          ]
        },
        {
          type: "Adverbs (Describing Verbs & Adjectives)",
          items: [
            { word: "regularly", sentence: "He <strong>regularly</strong> drops back between the center-backs. (modifies verb 'drops')", category: "Adverb of Frequency" },
            { word: "aggressively", sentence: "Wing-backs push forward <strong>aggressively</strong>. (modifies verb 'push forward')", category: "Adverb of Manner" },
            { word: "cleanly", sentence: "He breaks up counterattacks <strong>cleanly</strong>. (modifies verb 'breaks up')", category: "Adverb of Manner" },
            { word: "universally", sentence: "Bolt is <strong>universally</strong> recognized. (modifies adjective 'recognized')", category: "Adverb of Degree" }
          ]
        }
      ]
    },

    vocabularyBank: [
      { term: "Accomplished", pos: "Adjective", meaning: "Berprestasi, sangat terampil dan berpengalaman", context: "an accomplished professional football player" },
      { term: "Dictate", pos: "Verb", meaning: "Mengatur, mengendalikan tempo permainan", context: "dictate the tempo of build-up play" },
      { term: "Pinpoint", pos: "Adjective", meaning: "Sangat akurat / tepat sasaran", context: "pinpoint long-range diagonal distribution" },
      { term: "Spatial awareness", pos: "Noun Phrase", meaning: "Kepekaan memahami ruang posisi di lapangan", context: "his spatial awareness allows wing-backs to push forward" },
      { term: "Imposing", pos: "Adjective", meaning: "Sangat tinggi, gagah, atau mengesankan secara fisik", context: "standing at an imposing 195 cm" },
      { term: "Velocity", pos: "Noun", meaning: "Kecepatan laju gerak", context: "unmatched top-end velocity exceeding 44 km/h" },
      { term: "Charisma", pos: "Noun", meaning: "Daya tarik kepribadian yang memikat banyak orang", context: "vibrant charisma and theatrical showmanship" },
      { term: "Universally", pos: "Adverb", meaning: "Secara universal / diakui oleh seluruh dunia", context: "universally recognized as the fastest human" }
    ]
  },

  // 2. WARM-UP / PEMANASAN: 5 SOAL ANTHONY SINISUKA GINTING
  warmUp: {
    title: "Warm-Up Session: Anthony Sinisuka Ginting",
    instructions: "Read the short descriptive text about Indonesian badminton star Anthony Sinisuka Ginting below. Answer the 5 warm-up questions to test your understanding before entering the main exam.",
    text: `Anthony Sinisuka Ginting is an elite Indonesian professional badminton player who competes in the men's singles division. Born in Cimahi, West Java, Ginting has established himself as one of the most formidable badminton players in the world through his explosive playing style and remarkable international achievements, including an Olympic bronze medal at the 2020 Tokyo Olympics and winning the prestigious Badminton Asia Championships.

Standing at 171 cm with an agile and compact physical frame, Ginting is widely celebrated for his lightning-fast footwork and lethal offensive smashes. On the court, he moves exceptionally fast across all corners, retrieving difficult shuttlecocks with effortless balance. His trademark deceptive net shots frequently disorient his opponents, allowing him to create decisive attacking opportunities. Beyond his technical prowess, Ginting is admired for his humble demeanor and relentless fighting spirit, making him a true sports icon for Indonesian youth.`,
    questions: [
      {
        id: "wu-1",
        question: "What is the main purpose of the text above?",
        options: [
          "A. To narrate Anthony Ginting's childhood story in Cimahi",
          "B. To describe Anthony Sinisuka Ginting's characteristics, playing style, and achievements",
          "C. To persuade readers to support the Indonesian badminton national team",
          "D. To explain how to execute a lethal jumping smash in badminton",
          "E. To report the latest scores of the Badminton Asia Championships"
        ],
        correctAnswer: "B",
        explanation: "Tujuan utama teks deskriptif (Social Function of Descriptive Text) adalah mendeskripsikan subjek secara spesifik (dalam hal ini karakteristik fisik, gaya bermain, dan prestasi Anthony Sinisuka Ginting)."
      },
      {
        id: "wu-2",
        question: "Based on the generic structure of descriptive text, which part of the text represents the 'Identification'?",
        options: [
          "A. The entire second paragraph describing his footwork and fighting spirit",
          "B. The first sentence of paragraph 1 introducing who Anthony Sinisuka Ginting is",
          "C. The description of his 171 cm height and compact physical frame",
          "D. The explanation of his deceptive net shots and lethal smashes",
          "E. The closing statement regarding his status as a sports icon"
        ],
        correctAnswer: "B",
        explanation: "Bagian 'Identification' berada di awal teks yang berfungsi memperkenalkan subjek (siapa Anthony Sinisuka Ginting, cabang olahraganya, dan gambaran umumnya)."
      },
      {
        id: "wu-3",
        question: "Which of the following words from the text functions as an ADJECTIVE describing physical or personal qualities?",
        options: [
          "A. exceptionally",
          "B. frequently",
          "C. agile",
          "D. disorient",
          "E. retrieves"
        ],
        correctAnswer: "C",
        explanation: "'Agile' (lincah/tangkas) adalah Adjective (Kata Sifat) yang mendeskripsikan postur dan fisik Ginting ('agile and compact physical frame'). Sementara 'exceptionally' dan 'frequently' adalah Adverb, 'disorient' dan 'retrieves' adalah Verb."
      },
      {
        id: "wu-4",
        question: "In the sentence 'On the court, he moves exceptionally fast across all corners...', the word 'exceptionally' functions as ...",
        options: [
          "A. an adverb of degree modifying the adverb 'fast'",
          "B. an adjective describing the noun 'court'",
          "C. an action verb showing Ginting's movement",
          "D. a preposition indicating location",
          "E. a conjunction linking two clauses"
        ],
        correctAnswer: "A",
        explanation: "'Exceptionally' adalah Adverb (berakhiran -ly) yang menerangkan tingkat kecepatan ('fast') dari pergerakan Ginting di lapangan (Adverb of Degree)."
      },
      {
        id: "wu-5",
        question: "What makes Anthony Ginting's attacking play dangerous for his opponents according to paragraph 2?",
        options: [
          "A. His imposing 195 cm height and tall physical posture",
          "B. His ability to defend passively near the baseline throughout the match",
          "C. His lightning-fast footwork, deceptive net shots, and lethal offensive smashes",
          "D. His slow and defensive build-up play behind the center-backs",
          "E. His preference for playing doubles matches rather than singles"
        ],
        correctAnswer: "C",
        explanation: "Teks menyebutkan secara eksplisit bahwa Ginting terkenal karena 'lightning-fast footwork and lethal offensive smashes' serta 'deceptive net shots' yang mengecoh lawan."
      }
    ]
  },

  // 3. MAIN PRACTICE TEST: 20 SOAL (THOM HAYE & USAIN BOLT)
  mainExam: {
    title: "TKA READING COMPREHENSION: GREAT ATHLETES",
    subtitle: "Thom Haye & Usain Bolt — Reading Literacy and Language Analysis",
    instructions: "Read each text carefully. Questions 1–5 and 11–15 are Multiple Choice with one correct answer. Questions 6–10 and 16–20 are MCMA (Multiple Choice Multiple Answer); choose the two correct answers indicated.",
    
    texts: {
      text1: {
        id: "text1",
        athlete: "Thom Haye",
        title: "TEXT 1 – THOM HAYE",
        content: `Thom Jan Marinus Haye is an accomplished professional football player who commands the midfield for both Persib Bandung and the Indonesian national team. Born in Amsterdam, Netherlands, Haye honed his football foundation within the AZ Alkmaar youth academy before building an extensive career across the Dutch Eredivisie with sides like Willem II and SC Heerenveen. Standing tall at 187 cm with a sturdy physical build, he brings both size and balance to the center of the pitch. Supporters and commentators affectionately refer to him as The Professor due to his advanced tactical vision, mature decision-making, and rare ability to read match situations before they develop.

At Persib Bandung, Haye acts as the team's primary playmaker and tactical anchor. Operating in a deep-lying role just in front of the defense, he regularly drops back between the center-backs to receive possession and dictate the tempo of build-up play. His skill set is defined by pinpoint long-range diagonal distribution, clean line-breaking passes into the attacking third, and dangerous deliveries from direct free kicks and corners. His spatial awareness allows Persib’s wing-backs to push forward aggressively, safe in the knowledge that Haye provides structural cover behind them. Defensively, he relies on positioning and reading passing lanes to break up counterattacks cleanly. Whether commanding the domestic league with Persib or guiding Indonesia in international competition, Haye provides composed leadership that elevates his entire squad.`
      },

      text2: {
        id: "text2",
        athlete: "Usain Bolt",
        title: "TEXT 2 – USAIN BOLT",
        content: `Usain St. Leo Bolt is a legendary retired Jamaican sprinter universally recognized as the fastest human in recorded history. Born in Sherwood Content, Trelawny, Jamaica, Bolt revolutionized track and field over a remarkable career featuring eight Olympic gold medals and eleven World Championship titles. Standing at an imposing 195 cm, he broke the long-standing belief that world-class sprinters needed short, compact frames for quick starts. His stature allowed him to generate an enormous stride length, finishing the 100-meter dash in approximately 41 powerful strides compared to the standard 44 to 46 required by his rivals.

While Bolt was rarely the fastest out of the blocks, his dominance emerged between the 40-meter and 70-meter marks, where he unleashed an unmatched top-end velocity exceeding 44 km/h. During the 2009 World Championships in Berlin, he recorded historic world record times of 9.58 seconds in the 100 meters and 19.19 seconds in the 200 meters—benchmarks that remain untouched today. Beyond his raw athletic capability, Bolt captivated global audiences with his vibrant charisma, theatrical showmanship, and relaxed humor prior to high-stakes races. His signature celebration, To the World—pointing his arms skyward like an archer drawing a bow—stands as an enduring global symbol of sporting greatness.`
      }
    },

    questions: [
      // TEXT 1: THOM HAYE (Q1 - Q10)
      {
        number: 1,
        textRef: "text1",
        type: "single",
        skill: "Main Idea",
        question: "What is the main idea of the text?",
        options: [
          "A. Thom Haye’s physical strength makes him a dominant midfielder in Indonesia.",
          "B. Thom Haye’s career demonstrates his success as a Dutch football player.",
          "C. Thom Haye’s tactical intelligence makes him an influential midfield leader.",
          "D. Thom Haye’s passing ability makes him the strongest player at Persib.",
          "E. Thom Haye’s international experience makes him Indonesia’s best midfielder."
        ],
        correctAnswer: "C",
        explanation: "Pilihan C tepat karena keseluruhan teks menekankan peran Haye sebagai 'The Professor' dan playmaker dengan visi taktik yang matang, kepemimpinan tenang, dan kemampuan mengatur tempo permainan baik di level klub maupun timnas."
      },
      {
        number: 2,
        textRef: "text1",
        type: "single",
        skill: "Inference",
        question: "What can be inferred about Haye’s role when Persib’s wing-backs move forward?",
        options: [
          "A. He provides defensive protection while maintaining the team’s possession.",
          "B. He changes into an attacking position to support the wing-backs directly.",
          "C. He remains close to the goalkeeper to prevent dangerous counterattacks.",
          "D. He focuses mainly on creating scoring opportunities from the wings.",
          "E. He asks the center-backs to control the midfield during attacks."
        ],
        correctAnswer: "A",
        explanation: "Teks menyatakan 'safe in the knowledge that Haye provides structural cover behind them' dan 'drops back... to receive possession', yang berarti Haye memberikan perlindungan pertahanan sekaligus menjaga penguasaan bola tim saat wing-back maju menyerang (Pilihan A)."
      },
      {
        number: 3,
        textRef: "text1",
        type: "single",
        skill: "Vocabulary in Context",
        question: "The word “dictate” in the phrase “dictate the tempo of build-up play” is closest in meaning to ...",
        options: [
          "A. control",
          "B. observe",
          "C. increase",
          "D. follow",
          "E. predict"
        ],
        correctAnswer: "A",
        explanation: "Dalam konteks sepak bola, 'dictate the tempo' berarti memegang kendali atau mengatur kecepatan ritme permainan tim (control = mengendalikan)."
      },
      {
        number: 4,
        textRef: "text1",
        type: "single",
        skill: "Reference",
        question: "The word “them” in “to receive possession and dictate the tempo of build-up play... structural cover behind them” refers most closely to ...",
        options: [
          "A. the center-backs",
          "B. the wing-backs",
          "C. the opponents",
          "D. the supporters",
          "E. the teammates"
        ],
        correctAnswer: "A",
        explanation: "Berdasarkan rujukan kalimat pada paragraf 2, kata ganti merujuk pada unit pemain bertahan / center-backs & wing-backs yang dicover oleh Haye (Sesuai Kunci PDF: A)."
      },
      {
        number: 5,
        textRef: "text1",
        type: "single",
        skill: "Adjective Analysis",
        question: "Which sentence contains an adjective that describes Haye’s tactical or intellectual qualities?",
        options: [
          "A. He brings both size and balance to the center of the pitch.",
          "B. His skill set is defined by pinpoint long-range diagonal distribution.",
          "C. Supporters refer to him as “The Professor” because of his advanced tactical vision.",
          "D. He regularly drops back between the center-backs to receive possession.",
          "E. He provides structural cover behind the advancing wing-backs."
        ],
        correctAnswer: "C",
        explanation: "Pilihan C memuat kata sifat 'advanced' dan 'tactical' yang secara khusus menerangkan kualitas intelektual dan visi taktik Haye."
      },
      {
        number: 6,
        textRef: "text1",
        type: "mcma",
        requiredCount: 2,
        skill: "Specific Information",
        question: "Choose TWO answers. Which TWO statements are explicitly supported by the text?",
        options: [
          "A. Haye developed his football foundation at the AZ Alkmaar youth academy.",
          "B. Haye spent most of his professional career playing outside the Netherlands.",
          "C. Haye is recognized for his long-range diagonal distribution and passing.",
          "D. Haye became famous because he regularly scored goals for Persib Bandung.",
          "E. Haye began his professional career after joining the Indonesian national team."
        ],
        correctAnswer: ["A", "C"],
        explanation: "Pernyataan A didukung oleh teks: 'Haye honed his football foundation within the AZ Alkmaar youth academy'. Pernyataan C didukung oleh: 'His skill set is defined by pinpoint long-range diagonal distribution...'."
      },
      {
        number: 7,
        textRef: "text1",
        type: "mcma",
        requiredCount: 2,
        skill: "Cause and Effect",
        question: "Choose TWO answers. Which TWO characteristics best explain why Haye is called “The Professor”?",
        options: [
          "A. His ability to understand tactical situations before they develop.",
          "B. His ability to make mature decisions during important match situations.",
          "C. His ability to physically overpower most opposing midfielders.",
          "D. His ability to score consistently from close-range attacking positions.",
          "E. His ability to entertain supporters through humorous celebrations."
        ],
        correctAnswer: ["A", "B"],
        explanation: "Teks menyebutkan julukan 'The Professor' diberikan karena 'his advanced tactical vision, mature decision-making, and rare ability to read match situations before they develop' (Pilihan A dan B)."
      },
      {
        number: 8,
        textRef: "text1",
        type: "mcma",
        requiredCount: 2,
        skill: "Adverb Analysis",
        question: "Choose TWO answers. Which TWO words function as adverbs in the text?",
        options: [
          "A. regularly",
          "B. aggressively",
          "C. tactical",
          "D. physical",
          "E. dangerous"
        ],
        correctAnswer: ["A", "B"],
        explanation: "'Regularly' (adverb of frequency) dan 'aggressively' (adverb of manner) adalah kata keterangan berakhiran -ly yang memodifikasi kata kerja. Opsi C, D, E adalah adjectives."
      },
      {
        number: 9,
        textRef: "text1",
        type: "mcma",
        requiredCount: 2,
        skill: "Inference",
        question: "Choose TWO answers. Which TWO conclusions can reasonably be drawn from the text?",
        options: [
          "A. Haye contributes to both attacking construction and defensive organization.",
          "B. Haye’s positioning allows other players to take greater attacking risks.",
          "C. Haye primarily contributes through physical strength rather than tactical awareness.",
          "D. Haye’s role becomes unnecessary when Persib is building attacks from defense.",
          "E. Haye depends mainly on individual dribbling to control the team’s tempo."
        ],
        correctAnswer: ["A", "B"],
        explanation: "Pernyataan A benar karena Haye membangun serangan ('dictate the tempo') dan bertahan ('break up counterattacks cleanly'). Pernyataan B benar karena cover posisinya memungkinkan wing-back maju menyerang secara agresif."
      },
      {
        number: 10,
        textRef: "text1",
        type: "mcma",
        requiredCount: 2,
        skill: "Adjective Analysis",
        question: "Choose TWO answers. Which TWO adjectives describe Haye’s playing qualities rather than his physical appearance?",
        options: [
          "A. tactical",
          "B. composed",
          "C. sturdy",
          "D. tall",
          "E. physical"
        ],
        correctAnswer: ["A", "B"],
        explanation: "'Tactical' (visi bermain) dan 'composed' (ketenangan bermain) menggambarkan kualitas gaya bermainnya, sedangkan 'sturdy', 'tall', dan 'physical' mendeskripsikan tampilan fisiknya."
      },

      // TEXT 2: USAIN BOLT (Q11 - Q20)
      {
        number: 11,
        textRef: "text2",
        type: "single",
        skill: "Main Idea",
        question: "What is the main idea of the text?",
        options: [
          "A. Usain Bolt became famous because of his extraordinary physical appearance.",
          "B. Usain Bolt dominated sprinting through exceptional speed, achievements, and charisma.",
          "C. Usain Bolt succeeded mainly because he developed a revolutionary running technique.",
          "D. Usain Bolt changed athletics by introducing longer races for professional sprinters.",
          "E. Usain Bolt became popular because of his entertaining personality outside competitions."
        ],
        correctAnswer: "B",
        explanation: "Teks merangkum kecepatan rekor dunia Bolt, 8 medali emas Olimpiade, 11 gelar juara dunia, serta karisma dan daya tarik pertunjukannya yang mendominasi dunia atletik (Pilihan B)."
      },
      {
        number: 12,
        textRef: "text2",
        type: "single",
        skill: "Inference",
        question: "What can be inferred from Bolt’s performance between 40 and 70 meters?",
        options: [
          "A. His strongest competitive advantage developed after the initial acceleration phase.",
          "B. His greatest weakness appeared when he approached maximum running velocity.",
          "C. His performance depended primarily on having the fastest reaction at the starting line.",
          "D. His physical height prevented him from reaching a competitive speed during races.",
          "E. His long stride became ineffective once he reached the middle of the race."
        ],
        correctAnswer: "A",
        explanation: "Teks menyatakan 'rarely the fastest out of the blocks, his dominance emerged between the 40-meter and 70-meter marks, where he unleashed an unmatched top-end velocity', menyimpulkan bahwa keunggulan utamanya muncul setelah fase akselerasi awal (Pilihan A)."
      },
      {
        number: 13,
        textRef: "text2",
        type: "single",
        skill: "Vocabulary in Context",
        question: "The word “imposing” in “an imposing 195 cm” most nearly means ...",
        options: [
          "A. remarkably tall",
          "B. unusually weak",
          "C. relatively short",
          "D. naturally flexible",
          "E. physically ordinary"
        ],
        correctAnswer: "A",
        explanation: "Kata 'imposing' dalam konteks tinggi badan atlet (195 cm) berarti sangat tinggi dan memberikan kesan fisik yang gagah/mencolok (remarkably tall)."
      },
      {
        number: 14,
        textRef: "text2",
        type: "single",
        skill: "Cause and Effect",
        question: "Why was Bolt’s height significant in the context of sprinting?",
        options: [
          "A. It helped him produce a longer stride than many competing sprinters.",
          "B. It allowed him to react faster than shorter athletes at the starting line.",
          "C. It helped him maintain a lower body position throughout the entire race.",
          "D. It enabled him to complete the race with fewer movements than his rivals.",
          "E. It made him physically stronger during the first phase of acceleration."
        ],
        correctAnswer: "A",
        explanation: "Teks menyatakan 'His stature allowed him to generate an enormous stride length, finishing the 100-meter dash in approximately 41 powerful strides compared to the standard 44 to 46 required by his rivals' (Pilihan A)."
      },
      {
        number: 15,
        textRef: "text2",
        type: "single",
        skill: "Adverb Analysis",
        question: "Which sentence contains an adverb that describes how Bolt influenced or entertained audiences?",
        options: [
          "A. Bolt revolutionized track and field over a remarkable career.",
          "B. He recorded historic world record times in Berlin.",
          "C. Bolt captivated global audiences with his vibrant charisma.",
          "D. He was universally recognized as the fastest human in recorded history.",
          "E. His stature allowed him to generate an enormous stride length."
        ],
        correctAnswer: "D",
        explanation: "Pilihan D memuat adverb 'universally' yang menerangkan bagaimana pengakuan masyarakat dunia secara luas terhadap reputasi Bolt."
      },
      {
        number: 16,
        textRef: "text2",
        type: "mcma",
        requiredCount: 2,
        skill: "Specific Information",
        question: "Choose TWO answers. Which TWO achievements are directly mentioned in the text?",
        options: [
          "A. He won eight Olympic gold medals during his career.",
          "B. He won eleven World Championship titles during his career.",
          "C. He became the first sprinter to win twelve Olympic gold medals.",
          "D. He established his career record primarily in the 400-meter event.",
          "E. He became world champion after competing exclusively in relay races."
        ],
        correctAnswer: ["A", "B"],
        explanation: "Teks secara eksplisit menyebutkan: 'featuring eight Olympic gold medals and eleven World Championship titles' (Pilihan A dan B)."
      },
      {
        number: 17,
        textRef: "text2",
        type: "mcma",
        requiredCount: 2,
        skill: "Specific Information",
        question: "Choose TWO answers. Which TWO factors contributed to Bolt’s sprinting advantage according to the text?",
        options: [
          "A. His enormous stride length helped him cover distance efficiently.",
          "B. His exceptional top-end velocity allowed him to dominate later stages.",
          "C. His rapid starting reaction gave him an immediate advantage over rivals.",
          "D. His compact body structure helped him accelerate from the starting blocks.",
          "E. His ability to maintain moderate speed prevented opponents from passing him."
        ],
        correctAnswer: ["A", "B"],
        explanation: "Dua faktor keunggulan Bolt adalah langkahnya yang panjang (enormous stride length) dan kecepatan maksimal yang tak tertandingi melebihi 44 km/jam (exceptional top-end velocity) (Pilihan A dan B)."
      },
      {
        number: 18,
        textRef: "text2",
        type: "mcma",
        requiredCount: 2,
        skill: "Adjective Analysis",
        question: "Choose TWO answers. Which TWO adjectives describe Bolt’s personal characteristics or public image?",
        options: [
          "A. vibrant",
          "B. relaxed",
          "C. Jamaican",
          "D. imposing",
          "E. athletic"
        ],
        correctAnswer: ["A", "B"],
        explanation: "'Vibrant' (charisma) dan 'relaxed' (humor) adalah kata sifat yang mendeskripsikan kepribadian dan citra publik Bolt yang enerjik dan santai."
      },
      {
        number: 19,
        textRef: "text2",
        type: "mcma",
        requiredCount: 2,
        skill: "Text Evaluation",
        question: "Choose TWO answers. Which TWO statements best explain why Bolt became more than simply a successful athlete?",
        options: [
          "A. His sporting achievements were combined with an entertaining public personality.",
          "B. His distinctive celebration became a recognizable symbol of his success.",
          "C. His success depended mainly on his ability to compete in many different sports.",
          "D. His popularity resulted primarily from his ability to avoid international competitions.",
          "E. His reputation was created mainly by his physical appearance rather than achievements."
        ],
        correctAnswer: ["A", "B"],
        explanation: "Bolt menjadi ikon global karena menggabungkan prestasi olahraga dengan kepribadian memikat (vibrant charisma & showmanship) serta gaya selebrasi terkenalnya 'To the World' (Pilihan A dan B)."
      },
      {
        number: 20,
        textRef: "text2",
        type: "mcma",
        requiredCount: 2,
        skill: "Adverb Analysis",
        question: "Choose TWO answers. Which TWO words are adverbs used to modify the meaning of other words in the text?",
        options: [
          "A. universally",
          "B. approximately",
          "C. historic",
          "D. remarkable",
          "E. powerful"
        ],
        correctAnswer: ["A", "B"],
        explanation: "'Universally' (memodifikasi recognized) dan 'approximately' (memodifikasi angka 41 strides) adalah Adverbs. Pilihan C, D, E adalah Adjectives."
      }
    ]
  }
};
