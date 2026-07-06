/**
 * KPSS modül kayıtları — feature modüllerinin merkezi indeksi.
 */
export const kpssModules = [
  { id: 'subjects', label: 'Dersler', path: '/subjects' },
  { id: 'topics', label: 'Konular', path: '/subjects' },
  { id: 'question-bank', label: 'Soru Bankası', path: '/question-bank' },
  { id: 'exams', label: 'Denemeler', path: '/exams' },
  { id: 'progress', label: 'İlerleme', path: '/progress' },
  { id: 'favorites', label: 'Favoriler', path: '/favorites' },
  { id: 'statistics', label: 'İstatistikler', path: '/statistics' },
  { id: 'daily-goals', label: 'Günlük Hedefler', path: '/daily-goals' },
  { id: 'achievements', label: 'Başarılar', path: '/achievements' },
] as const
