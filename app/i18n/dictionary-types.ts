// Shape of a single language dictionary. Every locale folder exports a
// `dictionary` object that conforms to this type, so all languages stay in sync.

export type Dictionary = {
  nav: {
    homeAria: string;
    menuAria: string;
    languageAria: string;
    links: string[]; // matches nav hrefs by index
    order: string;
    orderNow: string;
    login: string;
    account: string;
    logout: string;
  };
  // Sign-in / sign-up page at /auth
  auth: {
    badge: string;
    backHome: string;
    tabs: { login: string; register: string };
    login: { title: string; subtitle: string; submit: string };
    register: { title: string; subtitle: string; submit: string };
    fields: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      passwordHint: string; // use {min} placeholder
    };
    pending: string;
    or: string;
    google: string;
    googleUnavailable: string;
    legal: string;
    session: { title: string; home: string; logout: string };
    errors: {
      fields: string;
      email: string;
      password: string; // use {min} placeholder
      credentials: string;
      emailTaken: string;
      blocked: string;
      googleCancelled: string;
      googleFailed: string;
      googleExpired: string;
      googleUnavailable: string;
      unknown: string;
    };
  };
  hero: {
    badge: string;
    titleLead: string;
    titleBrandTail: string;
    reviews: string;
    branches: string;
    deliveryTime: string;
    since: string;
    description: string;
    orderFood: string;
    bookTable: string;
    cardOrderLabel: string;
    cardOrderStatus: string;
    cardRatingTitle: string;
    cardRatingSub: string;
  };
  features: {
    label: string;
    title: string;
    subtitle: string;
    items: { title: string; text: string }[]; // 6 items
  };
  menu: {
    label: string;
    title: string;
    subtitle: string;
    openAll: string;
    unit: string;
    categories: { name: string; count: string }[]; // 6 items
    dishes: { name: string; desc: string; weight: string; badge: string }[]; // 3 items
  };
  orderTypes: {
    label: string;
    title: string;
    subtitle: string;
    featuredBadge: string;
    items: { title: string; text: string; points: string[] }[]; // 3 items
    paymentTitle: string;
    paymentSubtitle: string;
    payments: string[];
  };
  booking: {
    label: string;
    title: string;
    subtitle: string;
    book: string;
    zones: { name: string; desc: string; seats: string }[]; // 3 items
    cardTitle: string;
    cardStatus: string;
    rowBranch: string;
    rowBranchValue: string;
    rowDate: string;
    rowDateValue: string;
    rowTime: string;
    rowTimeValue: string;
    rowGuests: string;
    rowGuestsValue: string;
    preorder: string;
    preorderValue: string;
    deposit: string;
    depositValue: string;
    confirmation: string;
  };
  loyalty: {
    badge: string;
    title: string;
    subtitle: string;
    cashbackNote: string;
    tiers: { name: string; perks: string }[]; // 4 items
    referralStrong: string;
    referralRest: string;
  };
  branches: {
    label: string;
    title: string;
    subtitle: string;
    viewMap: string;
    items: { name: string; address: string; hours: string; city: string }[]; // 6 items
  };
  appPromo: {
    badge: string;
    title: string;
    subtitle: string;
    perks: string[]; // 3 items
    install: string;
    openTelegram: string;
    phoneSubtitle: string;
    phoneOrderLabel: string;
    phoneStatus: string;
    phoneEta: string;
    phoneEtaValue: string;
    phoneItems: string[]; // 3 items
    phoneTotal: string;
  };
  cta: {
    title: string;
    subtitle: string;
    order: string;
    phone: string;
  };
  footer: {
    description: string;
    address: string;
    phone: string;
    hours: string;
    columns: { title: string; links: string[] }[]; // 3 items
    copyright: string; // use {year} placeholder
    telegramAria: string;
    siteAria: string;
  };
};
