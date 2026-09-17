import type { Dictionary } from "../../dictionary-types";

export const dictionary: Dictionary = {
  nav: {
    homeAria: "Mubarak — go to home",
    menuAria: "Open menu",
    languageAria: "Change language",
    links: ["Menu", "Delivery", "Booking", "Loyalty", "Branches"],
    order: "Order",
    orderNow: "Order now",
  },
  hero: {
    badge: "Oriental and Kyrgyz cuisine",
    titleLead: "The taste of",
    titleBrandTail: "chaikhana, now in one app",
    reviews: "12,000+ reviews",
    branches: "branches",
    deliveryTime: "Delivery from 30 min",
    since: "since 1998",
    description:
      "Online menu, fast delivery, table reservations and QR ordering right at your table. One digital platform for the whole network of 9+ branches.",
    orderFood: "Order food",
    bookTable: "Book a table",
    cardOrderLabel: "Order #4821",
    cardOrderStatus: "On the way · 12 min",
    cardRatingTitle: "Happy guests",
    cardRatingSub: "98% recommend",
  },
  features: {
    label: "Features",
    title: "Everything for a smooth order",
    subtitle:
      "One platform brings together menu, delivery, booking and loyalty — on the web, mobile app and Telegram.",
    items: [
      {
        title: "Smart online menu",
        text: "Photo, ingredients, calories, macros, allergens, weight and cooking time for every dish.",
      },
      {
        title: "Fast delivery",
        text: "Automatic order routing, courier GPS and precise arrival time on the map.",
      },
      {
        title: "Table reservations",
        text: "Pick a branch, a zone — hall, terrace or VIP, date, time and pre-order dishes.",
      },
      {
        title: "QR ordering at the table",
        text: "Scan the QR on your table — open the menu, order and pay the bill without waiting.",
      },
      {
        title: "Loyalty program",
        text: "Cashback, bonuses and birthday gifts across Bronze, Silver, Gold and Platinum tiers.",
      },
      {
        title: "Notifications",
        text: "Order and booking status in real time — push, SMS and Telegram.",
      },
    ],
  },
  menu: {
    label: "Menu",
    title: "Over 200 oriental cuisine dishes",
    subtitle:
      "Breakfasts, soups, plov, manti, kebabs, Kyrgyz cuisine, desserts and drinks — all cooked from fresh ingredients every day.",
    openAll: "Open the full menu",
    unit: "som",
    categories: [
      { name: "Plov", count: "8 kinds" },
      { name: "Manti", count: "6 kinds" },
      { name: "Kebabs", count: "12 kinds" },
      { name: "Soups", count: "9 kinds" },
      { name: "Salads", count: "14 kinds" },
      { name: "Desserts", count: "10 kinds" },
    ],
    dishes: [
      {
        name: "Fergana-style plov",
        desc: "Devzira rice, lamb, carrots, cumin",
        weight: "350 g",
        badge: "Hit",
      },
      {
        name: "Manti with lamb",
        desc: "Hand-folded, juicy filling, onion",
        weight: "5 pcs · 300 g",
        badge: "Popular",
      },
      {
        name: "Lamb kebab",
        desc: "Oriental marinade, lavash, sauce",
        weight: "250 g",
        badge: "Spicy",
      },
    ],
  },
  orderTypes: {
    label: "How to order",
    title: "Three convenient ways",
    subtitle:
      "Choose your format, pay however you like and get your favorite dishes with no extra steps.",
    featuredBadge: "Popular",
    items: [
      {
        title: "Delivery",
        text: "We deliver your hot order across the city with courier tracking on the map.",
        points: ["Delivery from 30 minutes", "Courier GPS and ETA", "Contactless"],
      },
      {
        title: "Pickup",
        text: "We'll have your order ready when you arrive — no queue, no waiting.",
        points: ["Ready on time", "Pickup discount", "Online payment"],
      },
      {
        title: "Dine-in order",
        text: "Order at your table via QR code and pay the bill from your smartphone.",
        points: ["QR menu on the table", "Call the waiter", "Pay by QR"],
      },
    ],
    paymentTitle: "Pay however you like",
    paymentSubtitle: "Online, by card, cash or by QR at the restaurant",
    payments: ["QR payment", "MBank", "Elcart", "Visa / Mastercard", "Cash"],
  },
  booking: {
    label: "Booking",
    title: "Book a table in a minute",
    subtitle:
      "Choose a branch, zone and time, set the number of guests and pre-order dishes if you like. Confirmation arrives via SMS and Telegram.",
    book: "Book now",
    zones: [
      { name: "Hall", desc: "Cozy main area", seats: "up to 6 guests" },
      { name: "Terrace", desc: "Fresh air and a view", seats: "up to 8 guests" },
      { name: "VIP", desc: "Private room", seats: "up to 12 guests" },
    ],
    cardTitle: "New reservation",
    cardStatus: "Confirmed",
    rowBranch: "Branch",
    rowBranchValue: "Mubarak · Center",
    rowDate: "Date",
    rowDateValue: "Sat, Sep 20",
    rowTime: "Time",
    rowTimeValue: "19:30 — 21:30",
    rowGuests: "Guests",
    rowGuestsValue: "4 guests · Terrace",
    preorder: "Pre-order",
    preorderValue: "Plov, manti, tea",
    deposit: "Deposit",
    depositValue: "1,000 som",
    confirmation: "Confirmation sent to Telegram",
  },
  loyalty: {
    badge: "Loyalty program",
    title: "The more often you visit — the more you save",
    subtitle:
      "Collect cashback and bonuses, get discounts, birthday gifts and invite friends through the referral program.",
    cashbackNote: "cashback on every order",
    tiers: [
      { name: "Bronze", perks: "Program start" },
      { name: "Silver", perks: "Personal discounts" },
      { name: "Gold", perks: "Birthday gift" },
      { name: "Platinum", perks: "Private events" },
    ],
    referralStrong: "Invite a friend",
    referralRest: "— and you both get bonuses on your first order.",
  },
  branches: {
    label: "Branches",
    title: "9+ branches near you",
    subtitle:
      "The Mubarak chaikhana network is growing across Kyrgyzstan. Find the nearest branch on the map — with address, opening hours and directions.",
    viewMap: "View on map",
    items: [
      { name: "Mubarak · Center", address: "128 Chui Ave", hours: "09:00 — 00:00", city: "Bishkek" },
      { name: "Mubarak · South", address: "97 Akhunbaev St", hours: "10:00 — 23:00", city: "Bishkek" },
      { name: "Mubarak · Vostok-5", address: "12 Vostok-5 district", hours: "09:00 — 23:00", city: "Bishkek" },
      { name: "Mubarak · Djal", address: "23 Djal district", hours: "10:00 — 00:00", city: "Bishkek" },
      { name: "Mubarak · Osh", address: "40 Kurmanjan Datka St", hours: "09:00 — 23:00", city: "Osh" },
      { name: "Mubarak · Kara-Balta", address: "5 Kozhomberdiev St", hours: "10:00 — 22:00", city: "Kara-Balta" },
    ],
  },
  appPromo: {
    badge: "App · PWA",
    title: "Mubarak always at hand",
    subtitle:
      "Install the app without the App Store, right from your browser. Order, book and collect bonuses from your smartphone — and receive orders via the Telegram bot.",
    perks: [
      "Push notifications about order status",
      "QR ordering and payment right at the table",
      "Offline menu and quick access",
    ],
    install: "Install the app",
    openTelegram: "Open in Telegram",
    phoneSubtitle: "Delivery · Center",
    phoneOrderLabel: "Order #4821",
    phoneStatus: "On the way",
    phoneEta: "Arrives in",
    phoneEtaValue: "12 min",
    phoneItems: ["Fergana-style plov", "Manti with lamb", "Thyme tea"],
    phoneTotal: "Total · 1,060 som",
  },
  cta: {
    title: "Ready to taste Mubarak?",
    subtitle:
      "Place your first order online and get bonuses to your loyalty account. We'll deliver it hot in 30 minutes.",
    order: "Order now",
    phone: "+996 700 000 000",
  },
  footer: {
    description:
      "Mubarak digital chaikhana network — oriental and Kyrgyz cuisine, delivery, booking and a loyalty program in one place.",
    address: "Bishkek, 128 Chui Ave",
    phone: "+996 700 000 000",
    hours: "Daily · 09:00 — 00:00",
    columns: [
      {
        title: "Menu",
        links: ["Plov", "Manti", "Kebabs", "Soups", "Desserts", "Drinks"],
      },
      {
        title: "Service",
        links: ["Delivery", "Pickup", "Booking", "QR order", "Loyalty"],
      },
      {
        title: "Company",
        links: ["About us", "Branches", "Promotions", "Careers", "Contacts", "FAQ"],
      },
    ],
    copyright: "© {year} Mubarak Chaikhana. All rights reserved.",
    telegramAria: "Telegram",
    siteAria: "Website",
  },
};
