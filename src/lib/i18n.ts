export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];

export const site = {
  name: 'Rodrigo López Monroy',
  github: 'https://github.com/rodrigolopezu',
};

export const ui = {
  es: {
    htmlLang: 'es',
    role: 'Estudiante de Ingeniería de Software',
    place: 'UPC · Lima, Perú',
    intro:
      'Me interesa el machine learning y la ciencia de datos. Aquí dejo los proyectos que voy construyendo.',
    github: 'GitHub',
    projects: 'Proyectos',
    empty: 'Todavía no hay proyectos.',
    back: '← Todos los proyectos',
    repo: 'Ver en GitHub',
    demo: 'Demo',
    lastTrained: 'Último entrenamiento',
    color: 'Color',
    switchTo: 'Cambiar a inglés',
    description:
      'Portafolio de Rodrigo López Monroy, estudiante de Ingeniería de Software en la UPC (Lima, Perú), enfocado en machine learning y ciencia de datos.',
    home: 'Inicio',
  },
  en: {
    htmlLang: 'en',
    role: 'Software Engineering student',
    place: 'UPC · Lima, Peru',
    intro:
      "I'm interested in machine learning and data science. These are the projects I build along the way.",
    github: 'GitHub',
    projects: 'Projects',
    empty: 'No projects yet.',
    back: '← All projects',
    repo: 'View on GitHub',
    demo: 'Demo',
    lastTrained: 'Last trained',
    color: 'Color',
    switchTo: 'Switch to Spanish',
    description:
      'Portfolio of Rodrigo López Monroy, Software Engineering student at UPC (Lima, Peru), focused on machine learning and data science.',
    home: 'Home',
  },
} satisfies Record<Lang, Record<string, string>>;

export const other = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Prefixes a site-relative path with the configured base. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export const homeUrl = (lang: Lang) => url(`${lang}/`);
export const projectUrl = (lang: Lang, slug: string) => url(`${lang}/projects/${slug}/`);

/** Collection ids look like "nba-roles-clustering/es". */
export function splitId(id: string): { slug: string; lang: Lang } {
  const [slug, lang] = id.split('/');
  return { slug, lang: lang as Lang };
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    date,
  );
}
