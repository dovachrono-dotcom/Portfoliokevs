export const BLOG_CATEGORIES = [
  { id: "capstone", label: "Capstone" },
  { id: "student-life", label: "Student life" },
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: (typeof BLOG_CATEGORIES)[number]["id"];
  publishedAt: string;
  cover: {
    src: string;
    alt: string;
    position?: string;
    scale?: number;
  };
  photo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  video?: {
    src: string;
    poster: string;
    width: number;
    height: number;
    label: string;
    caption: string;
  };
  sections: { heading?: string; paragraphs: string[] }[];
};

// First-person drafts requested by Kevin. Project/profile facts are grounded;
// day-to-day scenes and reflections are creative writing, not research evidence.
const defensePhoto = {
  src: "/blog/capstone-defense-day.png",
  alt: "A group photo from capstone defense day, supplied by Kevin.",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "capstone-defense-day",
    title: "Defense day: we could finally breathe",
    excerpt: "The nerves before, the photo after, and how good it felt to finally be done.",
    category: "capstone",
    publishedAt: "2026-10-25",
    cover: { ...defensePhoto, position: "50% 55%" },
    photo: { ...defensePhoto, width: 1448, height: 1086, caption: "Capstone defense day with friends." },
    sections: [
      {
        paragraphs: [
          "For a long time, defense day was something I kept thinking about while working on the capstone. There was always another page to check, another thing to fix, or another part I wanted to explain better. Then the day finally came, and I had to stop preparing and actually do it.",
          "I knew what I had built, but I was still nervous. It feels different explaining a project when people are listening and you want your words to make sense. Even the parts I understood well suddenly felt harder to put into a sentence.",
        ],
      },
      {
        heading: "Trying to look less nervous",
        paragraphs: [
          "Having friends around helped. We could joke for a bit, check what we needed, and remind each other to calm down. I do not think any of us looked as relaxed as we wanted to, but at least we could laugh about it together.",
          "Before it started, I kept going over the same things in my head. What should I say first? What if I forget something simple? After a while, I just wanted to begin so I could stop imagining every possible problem.",
        ],
      },
      {
        heading: "Finally explaining the work",
        paragraphs: [
          "Working on HerbalAI had given me plenty of things to talk about. The pages, the plant information, and the assistant all came with choices I had to understand. During the defense, I tried to bring the discussion back to what the project does and why I made those choices.",
          "I did not want to sound like I had memorized words I could not explain. I wanted to talk about the work in a way that made sense. Remembering the problems I had already worked through helped me find something clear to say.",
        ],
      },
      {
        heading: "The feeling after",
        paragraphs: [
          "When the defense was over, I felt lighter. I could finally stop thinking about what I might forget to say. After all the coffee, late nights, and complaints about how long everything was taking, that part was done.",
          "We smiled, laughed, and took this photo. It felt good to stand with friends and enjoy the moment without immediately opening a laptop again. For a while, we could just be happy that we had reached the end of the defense.",
        ],
      },
      {
        heading: "A photo worth keeping",
        paragraphs: [
          "When I look at this picture, I remember the tired days that came before it too. I remember wanting to finish, getting annoyed when things took longer, and having people around who understood the feeling.",
          "I am glad we made time for the photo. It gives me a simple way to remember how good that day felt. We were tired, we were relieved, and we could finally breathe a little easier.",
        ],
      },
    ],
  },
  {
    slug: "capstone-nights-with-friends",
    title: "Coffee, complaints, and capstone nights",
    excerpt: "Long nights with friends, one more cup of coffee, and asking why the capstone was still not done.",
    category: "student-life",
    publishedAt: "2026-10-25",
    cover: {
      src: "/blog/capstone-nights-cover.webp",
      alt: "A frame from Kevin's video, showing friends around a laptop during their capstone nights.",
      position: "50% 52%",
    },
    video: {
      src: "/blog/capstone-nights-with-friends.mp4",
      poster: "/blog/capstone-nights-cover.webp",
      width: 720,
      height: 1280,
      label: "Capstone nights with friends",
      caption: "A short clip from our capstone nights with friends.",
    },
    sections: [
      {
        paragraphs: [
          "Some of my capstone memories are just a laptop, coffee, and friends who were also tired of hearing the word capstone. We wanted to finish, but there always seemed to be one more thing waiting for us.",
          "Having friends around while I worked made those nights easier. I still had to understand my project and do the work. But I also had people to talk to when I got stuck, needed a break, or wanted to complain for a minute before trying again.",
        ],
      },
      {
        heading: "We kept saying we were almost done",
        paragraphs: [
          "Almost done became a very familiar phrase. I would finish one part of HerbalAI and feel good about it, then notice something else that needed checking. A small fix could turn into another stretch of staring at the screen.",
          "Of course, we complained. Why was it taking so long? Why did a problem appear right when we thought we could rest? Saying it out loud did not fix anything, but hearing someone laugh and say they understood helped.",
        ],
      },
      {
        heading: "Coffee and a lot of side conversations",
        paragraphs: [
          "Coffee was part of the routine. Sometimes it helped me feel ready to work. Other times, I was simply holding a cup while trying to remember what I had opened a file for.",
          "There were side conversations, jokes, and moments when we had to remind ourselves to get back to work. Those little breaks made a long night feel less heavy. We could be annoyed about the project and still have a good time together.",
        ],
      },
      {
        heading: "The overnight part was not always fun",
        paragraphs: [
          "Staying up sounded easier before I was actually tired. After a while, reading the same code again did not mean I was understanding it. I would make a small change, forget why I made it, and have to slow down.",
          "I learned to leave a note about what still needed work. Even a short list was useful when I came back with more energy. The nights could be fun because of the people around me, but sleep still mattered. Another cup of coffee could not fix everything.",
        ],
      },
      {
        heading: "The people made it a better memory",
        paragraphs: [
          "After the defense, those nights felt different to remember. The complaints were still real, and so was the stress. But I could also remember the jokes, the company, and how good it felt when something finally worked.",
          "I am happy that the defense is done. I am also happy that the work came with time spent with friends. When I think back to making the capstone, I will probably remember the coffee and the laughter as clearly as the pages I built.",
        ],
      },
    ],
  },
  {
    "slug": "building-herbalai",
    "cover": {
      "src": "/projects/herbalai.webp",
      "alt": "The HerbalAI homepage, with its forest background and Philippine medicinal-plant library introduction.",
      "position": "left top"
    },
    "title": "How HerbalAI became my capstone project",
    "excerpt": "What started as a school requirement became a project that kept teaching me new things.",
    "category": "capstone",
    "publishedAt": "2026-10-25",
    "sections": [
      {
        "paragraphs": [
          "When I first started thinking about my capstone, my main thought was simple: I need to build something that works. I was not thinking about a perfect website or a long list of features. I just wanted a project I could explain and keep working on without getting lost.",
          "That project became HerbalAI, a place to learn about Philippine medicinal plants, with an AI assistant and community features. It sounded simple when I described it in one sentence. Building it was a different story."
        ]
      },
      {
        "heading": "Starting with the small things",
        "paragraphs": [
          "I started with the pages people would actually use. Can someone find a plant? Can they read its information without getting confused? Can they move around the site on a phone? Those questions helped me decide what needed to come first.",
          "I used Next.js and React for the pages, Express for the backend, and PostgreSQL to store the records. Prisma helped the app read and save data. At first, these felt like separate things I had to learn. Slowly, I started seeing how they worked together."
        ]
      },
      {
        "heading": "The AI part needed more care",
        "paragraphs": [
          "Adding an AI chat did not mean the project was finished. I wanted the assistant to use information from the plant library instead of just giving an answer that sounded nice. That meant spending time on how the app finds useful information before asking Gemini to write a reply.",
          "This was the part that made me slow down. If the app could not find enough information, it needed to say that clearly. A confident answer was not enough. I also had to think about the sources and what the assistant should avoid claiming."
        ]
      },
      {
        "heading": "Learning while building",
        "paragraphs": [
          "There were days when a small change took much longer than I expected. I would open the project to fix one thing and notice two more things that needed work. It was annoying, but it also taught me to look beyond the page I was currently editing.",
          "I used AI tools when I got stuck, but I still had to read the code and check what changed. Copying a fix without understanding it usually made the next problem harder. I started keeping short notes so I would not have to learn the same lesson twice."
        ]
      },
      {
        "heading": "More than a requirement",
        "paragraphs": [
          "HerbalAI gave me a reason to connect what I learned in class with something I could actually open in a browser. It also showed me that building a project is not only about adding features. Sometimes the best progress is making an existing feature easier to use.",
          "I still see things I want to improve. That does not make the work useless. It means I understand the project better now than when I started. For me, that is one of the best parts of making it."
        ]
      }
    ]
  },
  {
    "slug": "herbalai-struggles",
    "cover": {
      "src": "/projects/herbalai.webp",
      "alt": "A closer crop of the Dr. Ai assistant panel on the HerbalAI homepage.",
      "position": "right center",
      "scale": 1.25
    },
    "title": "The parts of HerbalAI that tested my patience",
    "excerpt": "Broken pages, confusing errors, and learning to stop fixing everything at once.",
    "category": "capstone",
    "publishedAt": "2026-10-25",
    "sections": [
      {
        "paragraphs": [
          "The screenshots are usually the clean part of a project. They do not show the time spent wondering why a button stopped working or why a page looked fine yesterday and strange today. HerbalAI had plenty of those moments for me.",
          "I used to think that getting stuck meant I was doing badly. Now I think it is a normal part of building something that has more than one moving part. That does not make it less frustrating, though."
        ]
      },
      {
        "heading": "It worked once, so I thought it was done",
        "paragraphs": [
          "One mistake I kept making was checking a feature only in the easiest situation. If a page loaded and the button worked, I wanted to move on. Then I would try a different screen size, refresh the page, or use a different account and find a problem.",
          "I had to get used to asking more questions. What happens when there is no result? What happens when an image does not load? What does someone see while waiting? Those parts are easy to forget when you are excited to finish."
        ]
      },
      {
        "heading": "The page was not always the problem",
        "paragraphs": [
          "Sometimes I spent too much time changing the frontend when the real problem was behind it. The page could look wrong because the data was missing or the request failed. Looking only at the screen did not tell me enough.",
          "I started checking the request, the response, and the stored data before changing random parts of the page. It sounds basic now, but learning to follow the problem from one place to another saved me a lot of guessing."
        ]
      },
      {
        "heading": "I had to stop changing everything",
        "paragraphs": [
          "When several things were wrong, I wanted to fix all of them in one sitting. I would change the layout, adjust the data, and edit another feature at the same time. After that, it was hard to tell which change caused a new problem.",
          "The better approach was less exciting: write down what went wrong, fix one thing, and check it again. I also learned to leave a short note before stopping. Coming back to a clear next step is much easier than opening the project and trying to remember everything."
        ]
      },
      {
        "heading": "Taking a break is part of the work",
        "paragraphs": [
          "There were times when I kept staring at the same code even though I was already tired. I was reading the lines, but nothing was really going in. Pushing for another hour did not always help.",
          "A short break, some music, or a fresh look the next day could make the problem feel smaller. I am still learning when to keep going and when to stop. Finishing a capstone takes effort, but it also takes enough patience to come back and try again."
        ]
      }
    ]
  },
  {
    "slug": "life-as-a-working-student",
    "cover": {
      "src": "/virt.jpg",
      "alt": "A group photograph of the catering team at Kevin’s workplace.",
      "position": "50% 65%"
    },
    "title": "Life as a working student is not always neat",
    "excerpt": "School, work, unfinished code, and trying to find enough time for rest.",
    "category": "student-life",
    "publishedAt": "2026-10-25",
    "sections": [
      {
        "paragraphs": [
          "Being a working student can be a hassle. Some days I have a clear plan for what I want to finish. Other days, the plan is just to get through school, do my work properly, and still have enough energy to open my laptop.",
          "It is not always the kind of routine that looks good in a picture. There are unfinished tasks, late starts, and days when I feel like I should have done more. I am learning that a busy day and a productive day do not always look the same."
        ]
      },
      {
        "heading": "Work needs my attention too",
        "paragraphs": [
          "I work as a head waiter at Virtucio Caterers. When I am working, I need to pay attention to the service, the people around me, and how we speak with clients. I cannot treat it like something I am only doing while waiting to get back to schoolwork.",
          "That job has taught me things I also use as a student. I have to communicate clearly, stay calm when several things need attention, and work with other people. It is different from coding, but those habits still matter."
        ]
      },
      {
        "heading": "Finding time for the capstone",
        "paragraphs": [
          "Working on HerbalAI beside everything else can be hard. Sometimes I have the time but not much energy. Sometimes I feel ready to work, but another responsibility has to come first. I cannot always wait for a perfect free afternoon.",
          "I try to leave myself smaller tasks. Fix a form. Check a page on my phone. Read about an error I do not understand. A short session with one clear task usually helps me more than a long list that I know I cannot finish."
        ]
      },
      {
        "heading": "Rest should not feel like a mistake",
        "paragraphs": [
          "I like playing games, reading, listening to rock music, and spending time outside. There are days when I feel guilty doing those things because I know there is still schoolwork waiting.",
          "But being tired all the time does not help me do better work. I need time when I am not thinking about a deadline or a broken page. I do not always balance it well, but I am trying to stop treating every free minute like another work slot."
        ]
      },
      {
        "heading": "Small progress still counts",
        "paragraphs": [
          "I used to compare what I finished in a day with what I thought other people were doing. That usually made me feel worse. It also ignored the fact that we do not all have the same schedule.",
          "Some days, progress is finishing a feature. Other days, it is showing up, doing my job well, and writing down what I will do next. I want to finish my studies and keep getting better at building things, even if the pace is not always fast.",
          "I do not have a perfect routine to share. I am still figuring it out. For now, I am trying to do what I can, take care of my responsibilities, and give myself enough room to keep going."
        ]
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getCategoryLabel(category: string) {
  return BLOG_CATEGORIES.find((item) => item.id === category)?.label ?? category;
}

export function getReadingMinutes(post: BlogPost) {
  const words = post.sections.flatMap((section) => [section.heading ?? "", ...section.paragraphs]).join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
}
