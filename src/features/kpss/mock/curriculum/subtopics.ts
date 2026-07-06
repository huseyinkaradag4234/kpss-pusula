export interface SubTopicDefinition {
  name: string
  slug: string
}

export const SUBTOPIC_OVERRIDES: Record<string, SubTopicDefinition[]> = {
  paragraf: [
    { name: 'Ana Düşünce', slug: 'ana-dusunce' },
    { name: 'Yardımcı Düşünce', slug: 'yardimci-dusunce' },
    { name: 'Paragraf Tamamlama', slug: 'paragraf-tamamlama' },
    { name: 'Paragraf Oluşturma', slug: 'paragraf-olusturma' },
    { name: 'Anlatım Teknikleri', slug: 'anlatim-teknikleri' },
  ],
  'sozcukte-anlam': [
    { name: 'Gerçek Anlam', slug: 'gercek-anlam' },
    { name: 'Mecaz Anlam', slug: 'mecaz-anlam' },
    { name: 'Terim Anlam', slug: 'terim-anlam' },
    { name: 'Eş ve Zıt Anlam', slug: 'es-zit-anlam' },
  ],
  problemler: [
    { name: 'Sayı Problemleri', slug: 'sayi-problemleri' },
    { name: 'Yaş Problemleri', slug: 'yas-problemleri' },
    { name: 'Karışım Problemleri', slug: 'karisim-problemleri' },
    { name: 'Hareket Problemleri', slug: 'hareket-problemleri' },
  ],
  'osmanli-kurulus': [
    { name: 'Beylikten Devlete', slug: 'beylikten-devlete' },
    { name: 'Kuruluş Dönemi Savaşları', slug: 'kurulus-savaslari' },
    { name: 'Devlet Teşkilatı', slug: 'devlet-teskilati' },
  ],
  anayasa: [
    { name: 'Anayasa Kavramı', slug: 'anayasa-kavrami' },
    { name: 'Temel İlkeler', slug: 'temel-ilkeler' },
    { name: 'Değişiklik Süreci', slug: 'degisiklik-sureci' },
  ],
}

export function getSubTopicsForTopic(
  topicName: string,
  topicSlug: string,
): SubTopicDefinition[] {
  const override = SUBTOPIC_OVERRIDES[topicSlug]
  if (override) return override

  return [
    { name: `${topicName} — Temel Kavramlar`, slug: 'temel-kavramlar' },
    { name: `${topicName} — Uygulama`, slug: 'uygulama' },
    { name: `${topicName} — Pekiştirme`, slug: 'pekistirme' },
  ]
}
