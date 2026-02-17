import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

function generateKey() {
  return Math.random().toString(36).substring(2, 11)
}

async function updateBlogPostsContent() {
  console.log('🚀 Updating blog posts with full content...\n')

  // Post 1: Successful Summer Camp - Add more detailed content
  const post1Content = {
    uk: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Цього літа наш табір приймав понад 80 пластунів різних вікових груп. Протягом двох тижнів учасники навчалися виживанню на природі, орієнтуванню, вузлам та багатьом іншим пластовим навичкам.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Програма табору' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Програма табору включала походи, ігри, спортивні змагання, вечірні вогнища з піснями та розповідями. Особливо популярним був нічний похід під зірками та змагання з орієнтування.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Кожен день починався з ранкової зарядки та підняття прапора. Після сніданку пластуни розходилися по гуртках, де навчалися різних навичок:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Орієнтування на місцевості та читання карт' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: "В'язання пластових вузлів" }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Розпалювання вогнища та приготування їжі на природі' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Перша допомога' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Будування наметів та укриттів' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Особливі моменти' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Найяскравішим моментом табору стала триденна мандрівка по гірських стежках. Пластуни несли свої рюкзаки, розбивали табір на новому місці кожного вечора та готували їжу на вогнищі. Це був справжній випробування на витривалість та командну роботу!' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Також незабутнім був вечір талантів, де кожен загін підготував виступ. Були пісні, танці, гуморески та навіть маленька вистава про пластову історію.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Подяки' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Дякуємо всім провідникам, волонтерам та батькам за підтримку! Особлива подяка нашим досвідченим виховникам, які працювали день і ніч, щоб забезпечити безпеку та цікаву програму для всіх учасників.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ми вже плануємо наступний табір на літо 2026 року. Реєстрація почнеться весною!' }], markDefs: [] },
    ],
    de: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Diesen Sommer nahmen über 80 Pfadfinder verschiedener Altersgruppen an unserem Lager teil. Während zwei Wochen lernten die Teilnehmer Überleben in der Natur, Navigation, Knoten und viele andere Pfadfinderfähigkeiten.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Lagerprogramm' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Das Lagerprogramm umfasste Wanderungen, Spiele, Sportwettbewerbe, abendliche Lagerfeuer mit Liedern und Geschichten. Besonders beliebt waren die Nachtwanderung unter den Sternen und der Orientierungswettbewerb.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Jeder Tag begann mit Morgengymnastik und Flaggenhissen. Nach dem Frühstück gingen die Pfadfinder in verschiedene Workshops, wo sie verschiedene Fähigkeiten erlernten:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Navigation und Kartenlesen' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Pfadfinderknoten binden' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Feuer machen und Kochen in der Natur' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Erste Hilfe' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Zelt- und Unterkunftsbau' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Besondere Momente' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Der Höhepunkt des Lagers war eine dreitägige Wanderung durch Bergpfade. Die Pfadfinder trugen ihre Rucksäcke, schlugen jeden Abend an einem neuen Ort ihr Lager auf und kochten am Lagerfeuer. Das war eine echte Prüfung für Ausdauer und Teamarbeit!' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Unvergesslich war auch der Talentabend, bei dem jede Gruppe eine Aufführung vorbereitete. Es gab Lieder, Tänze, Sketche und sogar ein kleines Theaterstück über die Geschichte der Pfadfinder.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Danksagung' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Vielen Dank an alle Leiter, Freiwilligen und Eltern für die Unterstützung! Besonderer Dank gilt unseren erfahrenen Betreuern, die Tag und Nacht arbeiteten, um die Sicherheit und ein interessantes Programm für alle Teilnehmer zu gewährleisten.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Wir planen bereits das nächste Lager für Sommer 2026. Die Registrierung beginnt im Frühling!' }], markDefs: [] },
    ],
    en: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'This summer, our camp hosted over 80 scouts of various age groups. During two weeks, participants learned outdoor survival, navigation, knots, and many other scouting skills.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Camp Program' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'The camp program included hiking, games, sports competitions, evening campfires with songs and stories. Particularly popular were the night hike under the stars and the orienteering competition.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Each day began with morning exercises and flag raising. After breakfast, scouts went to different workshops where they learned various skills:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Navigation and map reading' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Tying scout knots' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Fire building and outdoor cooking' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'First aid' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Tent and shelter building' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Special Moments' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'The highlight of the camp was a three-day trek through mountain trails. Scouts carried their backpacks, set up camp at a new location each evening, and cooked meals over a campfire. This was a real test of endurance and teamwork!' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Also memorable was the talent night, where each troop prepared a performance. There were songs, dances, skits, and even a small play about scout history.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Acknowledgments' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Thank you to all leaders, volunteers, and parents for the support! Special thanks to our experienced counselors who worked day and night to ensure safety and an engaging program for all participants.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'We are already planning the next camp for summer 2026. Registration will begin in spring!' }], markDefs: [] },
    ],
  }

  // Post 2: New Leaders Training
  const post2Content = {
    uk: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: "Вітаємо наших п'ять нових провідників, які успішно завершили багатомісячний курс підготовки! Курс включав теоретичні знання з педагогіки, психології роботи з дітьми, пластових традицій та практичні навички організації заходів." }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Програма навчання' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Курс тривав шість місяців і включав:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Теоретичні заняття з педагогіки та психології' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Вивчення пластових традицій та історії' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Практичні навички проведення сходин' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Організація та планування заходів' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Перша допомога та безпека' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Робота з батьками та конфліктними ситуаціями' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Нові провідники' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: "Наші нові провідники: Марія, Андрій, Олена, Тарас та Юлія. Кожен з них пройшов практику під керівництвом досвідчених провідників і тепер готовий самостійно вести свої групи." }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Марія буде працювати з новачками 6-8 років, Андрій та Олена очолять загін юнаків 12-15 років, а Тарас та Юлія допомагатимуть з організацією старших пластунів.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Дякуємо всім, хто брав участь у навчанні, і бажаємо новим провідникам успіхів у їхній важливій місії!' }], markDefs: [] },
    ],
    de: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Wir gratulieren unseren fünf neuen Leitern, die erfolgreich einen mehrmonatigen Ausbildungskurs abgeschlossen haben! Der Kurs umfasste theoretisches Wissen in Pädagogik, Kinderpsychologie, Plast-Traditionen und praktische Fähigkeiten zur Veranstaltungsorganisation.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Ausbildungsprogramm' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Der Kurs dauerte sechs Monate und umfasste:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Theoretische Lektionen in Pädagogik und Psychologie' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Studium der Plast-Traditionen und Geschichte' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Praktische Fähigkeiten zur Durchführung von Treffen' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Organisation und Planung von Veranstaltungen' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Erste Hilfe und Sicherheit' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Arbeit mit Eltern und Konfliktsituationen' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Neue Leiter' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Unsere neuen Leiter: Maria, Andriy, Olena, Taras und Julia. Jeder von ihnen absolvierte eine Praktikumszeit unter der Leitung erfahrener Leiter und ist nun bereit, seine eigenen Gruppen selbstständig zu führen.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Maria wird mit Anfängern im Alter von 6-8 Jahren arbeiten, Andriy und Olena werden eine Gruppe von Jugendlichen im Alter von 12-15 Jahren leiten, und Taras und Julia werden bei der Organisation älterer Pfadfinder helfen.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Vielen Dank an alle, die an der Ausbildung teilgenommen haben, und wir wünschen den neuen Leitern viel Erfolg bei ihrer wichtigen Mission!' }], markDefs: [] },
    ],
    en: [
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'We congratulate our five new leaders who successfully completed a multi-month training course! The course included theoretical knowledge in pedagogy, child psychology, Plast traditions, and practical skills in event organization.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Training Program' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'The course lasted six months and included:' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Theoretical lessons in pedagogy and psychology' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Study of Plast traditions and history' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Practical skills in conducting meetings' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Organization and planning of events' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'First aid and safety' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Working with parents and conflict situations' }], listItem: 'bullet', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'New Leaders' }], style: 'h2', markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Our new leaders: Maria, Andriy, Olena, Taras, and Julia. Each of them completed a practicum under the guidance of experienced leaders and is now ready to independently lead their own groups.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Maria will work with beginners aged 6-8, Andriy and Olena will lead a troop of youth aged 12-15, and Taras and Julia will help organize senior scouts.' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: '' }], markDefs: [] },
      { _key: generateKey(), _type: 'block', children: [{ _key: generateKey(), _type: 'span', text: 'Thank you to everyone who participated in the training, and we wish the new leaders success in their important mission!' }], markDefs: [] },
    ],
  }

  console.log('📝 Updating blog posts...')

  try {
    await client.patch('post-summer-camp-success-2025').set({ content: post1Content }).commit()
    console.log('✓ Updated: Successful Summer Camp 2025')
  } catch (error) {
    console.error('✗ Failed to update Summer Camp post:', error)
  }

  try {
    await client.patch('post-new-leaders-training-2025').set({ content: post2Content }).commit()
    console.log('✓ Updated: New Leaders Completed Training')
  } catch (error) {
    console.error('✗ Failed to update Leaders Training post:', error)
  }

  console.log('\n✅ Blog posts updated successfully!')
}

updateBlogPostsContent().catch(console.error)
