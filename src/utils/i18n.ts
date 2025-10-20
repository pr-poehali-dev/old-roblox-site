export type Language = 'ru' | 'en' | 'es' | 'de' | 'fr' | 'pt';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  welcome: {
    ru: 'ДОБРО ПОЖАЛОВАТЬ В ROBLOX!',
    en: 'WELCOME TO ROBLOX!',
    es: '¡BIENVENIDO A ROBLOX!',
    de: 'WILLKOMMEN BEI ROBLOX!',
    fr: 'BIENVENUE DANS ROBLOX!',
    pt: 'BEM-VINDO AO ROBLOX!'
  },
  welcomeDesc: {
    ru: 'Исследуйте миры, созданные игроками. Стройте, играйте, общайтесь!',
    en: 'Explore worlds created by players. Build, play, communicate!',
    es: '¡Explora mundos creados por jugadores. Construye, juega, comunícate!',
    de: 'Erkunden Sie Welten, die von Spielern erstellt wurden. Bauen, spielen, kommunizieren!',
    fr: 'Explorez des mondes créés par les joueurs. Construisez, jouez, communiquez!',
    pt: 'Explore mundos criados por jogadores. Construa, jogue, comunique!'
  },
  login: {
    ru: 'ВОЙТИ В ИГРУ',
    en: 'LOG IN TO GAME',
    es: 'INICIAR SESIÓN',
    de: 'ANMELDEN',
    fr: 'SE CONNECTER',
    pt: 'ENTRAR NO JOGO'
  },
  download: {
    ru: 'СКАЧАТЬ КЛИЕНТ',
    en: 'DOWNLOAD CLIENT',
    es: 'DESCARGAR CLIENTE',
    de: 'CLIENT HERUNTERLADEN',
    fr: 'TÉLÉCHARGER LE CLIENT',
    pt: 'BAIXAR CLIENTE'
  },
  popularGames: {
    ru: 'ПОПУЛЯРНЫЕ ИГРЫ',
    en: 'POPULAR GAMES',
    es: 'JUEGOS POPULARES',
    de: 'BELIEBTE SPIELE',
    fr: 'JEUX POPULAIRES',
    pt: 'JOGOS POPULARES'
  },
  play: {
    ru: 'ИГРАТЬ',
    en: 'PLAY',
    es: 'JUGAR',
    de: 'SPIELEN',
    fr: 'JOUER',
    pt: 'JOGAR'
  },
  playNow: {
    ru: 'ИГРАТЬ СЕЙЧАС',
    en: 'PLAY NOW',
    es: 'JUGAR AHORA',
    de: 'JETZT SPIELEN',
    fr: 'JOUER MAINTENANT',
    pt: 'JOGAR AGORA'
  },
  settings: {
    ru: 'НАСТРОЙКИ',
    en: 'SETTINGS',
    es: 'AJUSTES',
    de: 'EINSTELLUNGEN',
    fr: 'PARAMÈTRES',
    pt: 'CONFIGURAÇÕES'
  },
  language: {
    ru: 'Язык',
    en: 'Language',
    es: 'Idioma',
    de: 'Sprache',
    fr: 'Langue',
    pt: 'Idioma'
  },
  profile: {
    ru: 'ПРОФИЛЬ',
    en: 'PROFILE',
    es: 'PERFIL',
    de: 'PROFIL',
    fr: 'PROFIL',
    pt: 'PERFIL'
  },
  home: {
    ru: 'ГЛАВНАЯ',
    en: 'HOME',
    es: 'INICIO',
    de: 'STARTSEITE',
    fr: 'ACCUEIL',
    pt: 'INÍCIO'
  },
  friends: {
    ru: 'ДРУЗЬЯ',
    en: 'FRIENDS',
    es: 'AMIGOS',
    de: 'FREUNDE',
    fr: 'AMIS',
    pt: 'AMIGOS'
  },
  studio: {
    ru: 'ROBLOX STUDIO',
    en: 'ROBLOX STUDIO',
    es: 'ROBLOX STUDIO',
    de: 'ROBLOX STUDIO',
    fr: 'ROBLOX STUDIO',
    pt: 'ROBLOX STUDIO'
  },
  playersOnline: {
    ru: 'Игроков онлайн',
    en: 'Players online',
    es: 'Jugadores en línea',
    de: 'Spieler online',
    fr: 'Joueurs en ligne',
    pt: 'Jogadores online'
  },
  rating: {
    ru: 'Рейтинг',
    en: 'Rating',
    es: 'Clasificación',
    de: 'Bewertung',
    fr: 'Évaluation',
    pt: 'Classificação'
  }
};

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

export const getTranslation = (key: string, language: Language): string => {
  return translations[key]?.[language] || translations[key]?.['ru'] || key;
};

export const getCurrentLanguage = (): Language => {
  const saved = localStorage.getItem('roblox_language');
  return (saved as Language) || 'ru';
};

export const setCurrentLanguage = (language: Language): void => {
  localStorage.setItem('roblox_language', language);
};
