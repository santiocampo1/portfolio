export const techStack = {
  frontend: ["React", "Next.js", "Vue.js", "TypeScript", "Three.js", "HTML / CSS"],
  backend: ["Node.js", "Express", "Java", "Spring Boot", "PHP", "Python", "REST / GraphQL"],
  data: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  devops: ["AWS", "Docker", "Jenkins", "GitHub Actions", "CI/CD"],
};

export const CITIES = [
  { name: "Santa Fe", lat: -31.62, lng: -60.70, color: 0x7c3aed, height: 0.20 },
  { name: "Buenos Aires", lat: -34.60, lng: -58.38, color: 0x2f5bff, height: 0.32 },
  { name: "Orlando", lat: 28.54, lng: -81.38, color: 0xf59e0b, height: 0.26 },
  { name: "Lima", lat: -12.05, lng: -77.04, color: 0x0d9488, height: 0.24 },
];

export const NAV_SECTIONS = [
  "hero", "about", "projects", "architecture", "experience", "education", "guestbook", "contact", "books"
];

export const NAV_ITEMS_PRO = [
  { id: "about", labelKey: "about" },
  { id: "projects", labelKey: "projects" },
  { id: "architecture", labelKey: "architecture" },
  { id: "experience", labelKey: "experience" },
  { id: "education", labelKey: "education" },
  { id: "guestbook", labelKey: "guestbook" },
  { id: "contact", labelKey: "contact" },
];

export const NAV_ITEMS_PERSONAL = [
  { id: "books", labelKey: "books" },
];

export const BOOKS = {
  personal: [
    { title: "El Club de las 5 de la mañana", author: "Robin Sharma" },
    { title: "Deep Work", author: "Cal Newport" },
    { title: "El Poder del Ahora", author: "Eckhart Tolle" },
    { title: "El Hombre En Busca Del Sentido", author: "Viktor Frankl" },
    { title: "Los 7 hábitos de la gente altamente efectiva Ed.re", author: "Stephen Covey" },
    { title: "Hábitos Atómicos", author: "James Clear" },
    { title: "El Monje Que Vendio Su Ferrari", author: "Robin Sharma" },
    { title: "La disciplina marcará tu destino", author: "Ryan Holiday" },
    { title: "Manual de Vida", author: "Epicteto" },
    { title: "Focus: The Hidden Driver of Excellence", author: "Daniel Goleman" },
  ],
  biography: [
    { title: "Steve Jobs", author: "Walter Isaacson" },
    { title: "Elon Musk", author: "Walter Isaacson" },
    { title: "Nunca te pares", author: "Phil Knight" },
    { title: "Los innovadores", author: "Walter Isaacson" },
    { title: "Invent and Wander", author: "Jeff Bezos" },
  ],
  technical: [
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "Java y UML Orientacion Objetos", author: "Carlos Fontela" },
    { title: "Ubuntu Linux Starter Kit", author: "Varios" },
    { title: "The Pragmatic Programmer", author: "David Thomas & Andrew Hunt" },
    { title: "AWS Certified Cloud Practitioner Study Guide", author: "Ben Piper & David Clinton" },
  ],
  other: [
    { title: "The four", author: "Scott Galloway" },
    { title: "Liderazgo", author: "Alex Ferguson" },
    { title: "Manipulados", author: "Varios" },
    { title: "Why Simple Wins Toolkit", author: "Alan Siegel" },
    { title: "Aquí no hay reglas", author: "Reed Hastings" },
  ],
};