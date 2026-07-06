import type { Difficulty } from '../../types'

export interface TopicDefinition {
  name: string
  slug: string
  difficulty: Difficulty
}

export interface SubjectDefinition {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  topics: TopicDefinition[]
}

export const SUBJECT_CURRICULUM: SubjectDefinition[] = [
  {
    id: 'turkce',
    name: 'Türkçe',
    slug: 'turkce',
    description: 'Sözcük bilgisi, anlam bilgisi, paragraf ve dil bilgisi',
    icon: 'book-text',
    color: '#6366f1',
    topics: [
      { name: 'Sözcükte Anlam', slug: 'sozcukte-anlam', difficulty: 'medium' },
      { name: 'Cümlede Anlam', slug: 'cumlede-anlam', difficulty: 'medium' },
      { name: 'Paragraf', slug: 'paragraf', difficulty: 'hard' },
      { name: 'Yazım Kuralları', slug: 'yazim-kurallari', difficulty: 'easy' },
      { name: 'Noktalama', slug: 'noktalama', difficulty: 'easy' },
      { name: 'Ses Bilgisi', slug: 'ses-bilgisi', difficulty: 'medium' },
      { name: 'Sözcük Türleri', slug: 'sozcuk-turleri', difficulty: 'medium' },
      { name: 'Fiiller', slug: 'fiiller', difficulty: 'hard' },
      { name: 'Cümle Bilgisi', slug: 'cumle-bilgisi', difficulty: 'medium' },
      { name: 'Anlatım Bozukluğu', slug: 'anlatim-bozuklugu', difficulty: 'hard' },
    ],
  },
  {
    id: 'matematik',
    name: 'Matematik',
    slug: 'matematik',
    description: 'Temel matematik, problemler ve sayısal mantık',
    icon: 'calculator',
    color: '#0d9488',
    topics: [
      { name: 'Sayılar ve İşlemler', slug: 'sayilar-islemler', difficulty: 'easy' },
      { name: 'Temel Kavramlar', slug: 'temel-kavramlar', difficulty: 'easy' },
      { name: 'Problemler', slug: 'problemler', difficulty: 'hard' },
      { name: 'Oran-Orantı', slug: 'oran-oranti', difficulty: 'medium' },
      { name: 'Yüzde Problemleri', slug: 'yuzde-problemleri', difficulty: 'medium' },
      { name: 'Karışım Problemleri', slug: 'karisim-problemleri', difficulty: 'hard' },
      { name: 'İşçi-Havuz Problemleri', slug: 'isci-havuz', difficulty: 'hard' },
      { name: 'Hareket Problemleri', slug: 'hareket-problemleri', difficulty: 'hard' },
      { name: 'Kesirler', slug: 'kesirler', difficulty: 'medium' },
      { name: 'EBOB-EKOK', slug: 'ebob-ekok', difficulty: 'medium' },
    ],
  },
  {
    id: 'tarih',
    name: 'Tarih',
    slug: 'tarih',
    description: 'Türk tarihi, Osmanlı ve Cumhuriyet dönemi',
    icon: 'landmark',
    color: '#f59e0b',
    topics: [
      { name: 'İlk Türk Devletleri', slug: 'ilk-turk-devletleri', difficulty: 'medium' },
      { name: 'Osmanlı Kuruluş', slug: 'osmanli-kurulus', difficulty: 'medium' },
      { name: 'Osmanlı Yükselme', slug: 'osmanli-yukselme', difficulty: 'medium' },
      { name: 'Osmanlı Dağılma', slug: 'osmanli-dagilma', difficulty: 'hard' },
      { name: 'Kurtuluş Savaşı', slug: 'kurtulus-savasi', difficulty: 'medium' },
      { name: 'Atatürk İlkeleri', slug: 'ataturk-ilkeleri', difficulty: 'easy' },
      { name: 'İnkılap Tarihi', slug: 'inkilap-tarihi', difficulty: 'medium' },
    ],
  },
  {
    id: 'cografya',
    name: 'Coğrafya',
    slug: 'cografya',
    description: 'Türkiye ve dünya coğrafyası, ekonomik coğrafya',
    icon: 'globe',
    color: '#22c55e',
    topics: [
      { name: "Türkiye'nin Fiziki Coğrafyası", slug: 'turkiye-fiziki', difficulty: 'medium' },
      { name: 'İklim', slug: 'iklim', difficulty: 'medium' },
      { name: 'Nüfus', slug: 'nufus', difficulty: 'easy' },
      { name: 'Bölgeler', slug: 'bolgeler', difficulty: 'medium' },
      { name: 'Tarım', slug: 'tarim', difficulty: 'easy' },
      { name: 'Sanayi', slug: 'sanayi', difficulty: 'medium' },
      { name: 'Ulaşım', slug: 'ulasim', difficulty: 'easy' },
    ],
  },
  {
    id: 'vatandaslik',
    name: 'Vatandaşlık',
    slug: 'vatandaslik',
    description: 'Hukuk, anayasa ve devlet yapısı',
    icon: 'scale',
    color: '#8b5cf6',
    topics: [
      { name: 'Hukuk', slug: 'hukuk', difficulty: 'medium' },
      { name: 'Anayasa', slug: 'anayasa', difficulty: 'medium' },
      { name: 'Yasama', slug: 'yasama', difficulty: 'medium' },
      { name: 'Yürütme', slug: 'yurutme', difficulty: 'medium' },
      { name: 'Yargı', slug: 'yargi', difficulty: 'hard' },
      { name: 'İdare', slug: 'idare', difficulty: 'easy' },
    ],
  },
  {
    id: 'guncel',
    name: 'Güncel Bilgiler',
    slug: 'guncel',
    description: 'Güncel olaylar, kurumlar ve uluslararası gelişmeler',
    icon: 'newspaper',
    color: '#ef4444',
    topics: [
      { name: 'Uluslararası Kuruluşlar', slug: 'uluslararasi', difficulty: 'medium' },
      { name: 'Türkiye Gündemi', slug: 'turkiye-gundemi', difficulty: 'easy' },
    ],
  },
]
