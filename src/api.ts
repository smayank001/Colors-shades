// const API_URL = 'http://localhost:5000';
const API_URL = 'https://colors-shades-backend.vercel.app';

function getAuthToken() {
  return localStorage.getItem('admin_token');
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  localStorage.setItem('admin_token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated() {
  return !!getAuthToken();
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: any = {
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API Error');
  return data;
}

// Services
export const getServices = () => fetchAPI('/services').then(res => res.data);
export const addService = (data) => fetchAPI('/services', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const updateService = (id, data) => fetchAPI(`/services/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const deleteService = (id) => fetchAPI(`/services/${id}`, { method: 'DELETE' });

// Course Modules
export const getCourseModules = (serviceId) => fetchAPI(`/course_modules/${serviceId}`).then(res => res.data);
export const addCourseModule = (data) => fetchAPI('/course_modules', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const updateCourseModule = (id, data) => fetchAPI(`/course_modules/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const deleteCourseModule = (id) => fetchAPI(`/course_modules/${id}`, { method: 'DELETE' });

// Courses
export const getCourses = (serviceId) => fetchAPI(serviceId ? `/courses?service_id=${serviceId}` : '/courses').then(res => res.data);
export const addCourse = (data) => fetchAPI('/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const deleteCourse = (id) => fetchAPI(`/courses/${id}`, { method: 'DELETE' });

// Media
export const getMedia = (section?: string, category?: string) => {
  let url = '/media?';
  if (section) url += `section=${section}&`;
  if (category) url += `category=${category}`;
  return fetchAPI(url).then(res => res.data);
};
export const addMedia = (formData) => {
  const token = getAuthToken();
  return fetch(`${API_URL}/media`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData, // do not set Content-Type, browser sets it for FormData
  }).then(async res => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Media upload failed');
    return data;
  });
};
export const deleteMedia = (id) => fetchAPI(`/media/${id}`, { method: 'DELETE' });

// Enquiries
export const getEnquiries = () => fetchAPI('/enquiries').then(res => res.data);
export const addEnquiry = (data) => fetchAPI('/enquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

// QR
export const getQR = () => fetchAPI('/qr').then(res => res.data);
export const uploadQR = (formData) => {
  const token = getAuthToken();
  return fetch(`${API_URL}/qr`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  }).then(async res => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'QR upload failed');
    return data;
  });
};
