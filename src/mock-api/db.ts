// Mock API database with localStorage persistence

// Simple UUID generator
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price_text: string;
  duration: string;
  images: string[];
  icon: string;
  courses: { id: string; title: string; syllabus: string[] }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  date: string;
  caption: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  course_slug: string;
  created_at: string;
  payment_screenshot_url: string;
  paid_flag: boolean;
  status: 'new' | 'processed' | 'paid';
}

export interface AdminUser {
  username: string;
  token: string;
}

const SEED_SERVICES: Service[] = [
  {
    id: uuid(), slug: 'drawing-painting', title: 'Drawing & Painting',
    description: 'Comprehensive art classes covering pencil sketching, watercolors, acrylics, and oil pastels. Students learn fundamental techniques while developing their unique artistic style.',
    category: 'art', price_text: 'From ₹2,500 / month', duration: '3 months',
    images: [], icon: '🎨',
    courses: [
      { id: 'dp-1', title: 'Beginner Sketching', syllabus: ['Basic shapes', 'Shading techniques', 'Still life drawing'] },
      { id: 'dp-2', title: 'Watercolor Wonders', syllabus: ['Color mixing', 'Wet-on-wet technique', 'Landscape painting'] },
      { id: 'dp-3', title: 'Advanced Mixed Media', syllabus: ['Acrylics', 'Oil pastels', 'Portfolio creation'] },
    ],
  },
  {
    id: uuid(), slug: 'chess', title: 'Chess',
    description: 'Strategic thinking and problem-solving through chess. From beginner moves to tournament preparation, we develop young minds through the royal game.',
    category: 'strategy', price_text: 'From ₹1,500 / month', duration: '3 months',
    images: [], icon: '♟️',
    courses: [
      { id: 'ch-1', title: 'Chess Fundamentals', syllabus: ['Piece movement', 'Basic tactics', 'Opening principles'] },
      { id: 'ch-2', title: 'Tournament Prep', syllabus: ['Advanced strategies', 'Time management', 'Competition practice'] },
    ],
  },
  {
    id: uuid(), slug: 'tuitions', title: 'Tuitions (1st–10th)',
    description: 'Academic tutoring for students from 1st to 10th standard. Personalized attention in Mathematics, Science, and English with a focus on conceptual clarity.',
    category: 'academic', price_text: 'From ₹2,000 / month', duration: 'Ongoing',
    images: [], icon: '📚',
    courses: [
      { id: 'tu-1', title: 'Primary (1st-5th)', syllabus: ['Mathematics', 'English', 'Environmental Science'] },
      { id: 'tu-2', title: 'Middle School (6th-8th)', syllabus: ['Mathematics', 'Science', 'English Grammar'] },
      { id: 'tu-3', title: 'High School (9th-10th)', syllabus: ['Mathematics', 'Physics', 'Chemistry'] },
    ],
  },
  {
    id: uuid(), slug: 'craft-workshop', title: 'Craft Workshops',
    description: 'Hands-on creative workshops for children to explore paper crafts, clay modeling, origami, and more. Perfect for developing fine motor skills and imagination.',
    category: 'art', price_text: 'From ₹1,800 / month', duration: '1 month',
    images: [], icon: '✂️',
    courses: [
      { id: 'cr-1', title: 'Paper Crafts', syllabus: ['Origami', 'Quilling', 'Collage art'] },
      { id: 'cr-2', title: 'Clay & Sculpture', syllabus: ['Basic sculpting', 'Clay modeling', 'Painting sculptures'] },
    ],
  },
  {
    id: uuid(), slug: 'calligraphy', title: 'Calligraphy',
    description: 'Learn the beautiful art of handwriting. From basic lettering to decorative scripts, students develop patience and precision through calligraphy.',
    category: 'art', price_text: 'From ₹1,500 / month', duration: '2 months',
    images: [], icon: '✍️',
    courses: [
      { id: 'ca-1', title: 'Basic Lettering', syllabus: ['Brush pen basics', 'Alphabet practice', 'Simple compositions'] },
    ],
  },
  {
    id: uuid(), slug: 'summer-camp', title: 'Summer Camp',
    description: 'An exciting summer program packed with art, crafts, games, and creative activities. A perfect way for children to spend their vacation productively.',
    category: 'events', price_text: '₹5,000 for 2 weeks', duration: '2 weeks',
    images: [], icon: '☀️',
    courses: [
      { id: 'sc-1', title: 'Art Explorer', syllabus: ['Daily painting', 'Craft sessions', 'Art games', 'Exhibition'] },
    ],
  },
];

const SEED_GALLERY: GalleryItem[] = [
  { id: uuid(), title: 'Sunset Landscape', type: 'photo', url: '', thumbnail: '', category: 'paintings', tags: ['watercolor', 'landscape'], date: '2025-03-01', caption: 'By Aarav, Age 9' },
  { id: uuid(), title: 'Flower Garden', type: 'photo', url: '', thumbnail: '', category: 'paintings', tags: ['acrylic', 'nature'], date: '2025-02-15', caption: 'By Priya, Age 7' },
  { id: uuid(), title: 'Abstract Dreams', type: 'photo', url: '', thumbnail: '', category: 'paintings', tags: ['abstract', 'oil-pastel'], date: '2025-01-20', caption: 'By Rohan, Age 11' },
  { id: uuid(), title: 'Clay Animals', type: 'photo', url: '', thumbnail: '', category: 'crafts', tags: ['clay', 'sculpture'], date: '2025-02-28', caption: 'By Sneha, Age 6' },
  { id: uuid(), title: 'Paper Origami', type: 'photo', url: '', thumbnail: '', category: 'crafts', tags: ['origami', 'paper'], date: '2025-03-05', caption: 'By Karthik, Age 8' },
  { id: uuid(), title: 'Summer Camp Exhibition', type: 'photo', url: '', thumbnail: '', category: 'summer-camp', tags: ['exhibition', 'group'], date: '2025-04-10', caption: 'Summer Camp 2025' },
];

const SEED_ACHIEVEMENTS: Achievement[] = [
  { id: uuid(), title: 'Inter-school Painting Award - Gold', date: '2024-12-10', image: '', description: 'Our students won gold medals at the annual inter-school painting competition.' },
  { id: uuid(), title: 'State Level Art Exhibition', date: '2024-11-15', image: '', description: 'Five students selected for the Karnataka State Level Art Exhibition.' },
  { id: uuid(), title: 'National Drawing Competition - Silver', date: '2024-10-05', image: '', description: 'Aarav Kumar won silver at the National Drawing Competition held in Delhi.' },
  { id: uuid(), title: 'Best Art School Award', date: '2024-09-20', image: '', description: 'Colors \'n\' Shades recognized as the Best Art School in Bangalore by Education Today.' },
];

const SEED_ENQUIRIES: Enquiry[] = [
  { id: uuid(), name: 'Sunita Rao', phone: '+91 98765 11111', email: 'sunita@example.com', message: 'Interested in drawing classes for my 6-year-old daughter.', course_slug: 'drawing-painting', created_at: '2025-03-10T10:00:00Z', payment_screenshot_url: '', paid_flag: false, status: 'new' },
  { id: uuid(), name: 'Amit Shah', phone: '+91 98765 22222', email: 'amit@example.com', message: 'Would like to enroll my son in chess classes.', course_slug: 'chess', created_at: '2025-03-08T14:30:00Z', payment_screenshot_url: '', paid_flag: true, status: 'paid' },
];

const DB_KEYS = {
  services: 'cns_services',
  gallery: 'cns_gallery',
  achievements: 'cns_achievements',
  enquiries: 'cns_enquiries',
  auth: 'cns_auth_token',
  settings: 'cns_settings',
};

function getStore<T>(key: string, seed: T[]): T[] {
  const raw = localStorage.getItem(key);
  if (raw) {
    try { return JSON.parse(raw); } catch { /* fall through */ }
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ============ API Functions ============

// Services
export function getServices(): Service[] {
  return getStore(DB_KEYS.services, SEED_SERVICES);
}
export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find(s => s.slug === slug);
}
export function createService(service: Omit<Service, 'id'>): Service {
  const all = getServices();
  const created = { ...service, id: uuid() };
  setStore(DB_KEYS.services, [...all, created]);
  return created;
}
export function updateService(id: string, updates: Partial<Service>): Service | null {
  const all = getServices();
  const idx = all.findIndex(s => s.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  setStore(DB_KEYS.services, all);
  return all[idx];
}
export function deleteService(id: string): boolean {
  const all = getServices();
  const filtered = all.filter(s => s.id !== id);
  setStore(DB_KEYS.services, filtered);
  return filtered.length < all.length;
}

// Gallery
export function getGallery(): GalleryItem[] {
  return getStore(DB_KEYS.gallery, SEED_GALLERY);
}
export function createGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
  const all = getGallery();
  const created = { ...item, id: uuid() };
  setStore(DB_KEYS.gallery, [...all, created]);
  return created;
}
export function deleteGalleryItem(id: string): boolean {
  const all = getGallery();
  const filtered = all.filter(g => g.id !== id);
  setStore(DB_KEYS.gallery, filtered);
  return filtered.length < all.length;
}

// Achievements
export function getAchievements(): Achievement[] {
  return getStore(DB_KEYS.achievements, SEED_ACHIEVEMENTS);
}
export function createAchievement(item: Omit<Achievement, 'id'>): Achievement {
  const all = getAchievements();
  const created = { ...item, id: uuid() };
  setStore(DB_KEYS.achievements, [...all, created]);
  return created;
}
export function deleteAchievement(id: string): boolean {
  const all = getAchievements();
  const filtered = all.filter(a => a.id !== id);
  setStore(DB_KEYS.achievements, filtered);
  return filtered.length < all.length;
}

// Enquiries
export function getEnquiries(): Enquiry[] {
  return getStore(DB_KEYS.enquiries, SEED_ENQUIRIES);
}
export function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Enquiry {
  const all = getEnquiries();
  const created: Enquiry = { ...enquiry, id: uuid(), created_at: new Date().toISOString(), status: 'new' };
  setStore(DB_KEYS.enquiries, [...all, created]);
  return created;
}
export function updateEnquiry(id: string, updates: Partial<Enquiry>): Enquiry | null {
  const all = getEnquiries();
  const idx = all.findIndex(e => e.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  setStore(DB_KEYS.enquiries, all);
  return all[idx];
}

// Auth (mock)
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };
export function mockLogin(username: string, password: string): AdminUser | null {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = btoa(JSON.stringify({ username, exp: Date.now() + 86400000 }));
    localStorage.setItem(DB_KEYS.auth, token);
    return { username, token };
  }
  return null;
}
export function getAuthToken(): string | null {
  return localStorage.getItem(DB_KEYS.auth);
}
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.exp > Date.now();
  } catch { return false; }
}
export function logout() {
  localStorage.removeItem(DB_KEYS.auth);
}

// Settings
interface SiteSettings {
  qr_image: string;
  hero_slides: string[];
}
export function getSettings(): SiteSettings {
  const raw = localStorage.getItem(DB_KEYS.settings);
  if (raw) try { return JSON.parse(raw); } catch { /* fall through */ }
  return { qr_image: '', hero_slides: [] };
}
export function updateSettings(updates: Partial<SiteSettings>) {
  const current = getSettings();
  localStorage.setItem(DB_KEYS.settings, JSON.stringify({ ...current, ...updates }));
}
