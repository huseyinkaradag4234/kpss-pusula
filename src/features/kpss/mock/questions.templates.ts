export const QUESTION_TEMPLATES = [
  {
    title: 'Kavram Sorusu',
    text: 'Aşağıdakilerden hangisi verilen tanıma en uygun seçenektir?',
    options: [
      'Birinci seçenek ifadesi',
      'İkinci seçenek ifadesi',
      'Üçüncü seçenek ifadesi',
      'Dördüncü seçenek ifadesi',
    ] as [string, string, string, string],
    explanation:
      'Bu soruda doğru cevap, tanımın özelliklerine en uygun ifadeyi bulmayı gerektirir. Anahtar kavramları işaretleyerek eleme yapın.',
  },
  {
    title: 'Uygulama Sorusu',
    text: 'Verilen bilgilere göre aşağıdaki yorumlardan hangisi doğrudur?',
    options: [
      'Yorum A doğru sonuca ulaşır',
      'Yorum B eksik değerlendirme yapar',
      'Yorum C yanlış çıkarım içerir',
      'Yorum D konu dışıdır',
    ] as [string, string, string, string],
    explanation:
      'Uygulama sorularında önce verilen bilgileri sırayla değerlendirin, ardından seçenekleri tek tek eleyin.',
  },
  {
    title: 'Analiz Sorusu',
    text: 'Bu konuyla ilgili aşağıdaki ifadelerden hangisi kesinlikle yanlıştır?',
    options: [
      'Genel geçer bir kural ifadesi',
      'Örnekle desteklenen bilgi',
      'Konuyla ilgili istisna durumu',
      'Yanlış kabul edilen yaygın bilgi',
    ] as [string, string, string, string],
    explanation:
      'Analiz sorularında "kesinlikle yanlış" ifadesine dikkat edin. Mutlak ifadeler genelde tuzak niteliğindedir.',
  },
  {
    title: 'Karşılaştırma Sorusu',
    text: 'İki kavram arasındaki temel fark aşağıdakilerden hangisinde doğru verilmiştir?',
    options: [
      'Kavram A daha geniş kapsamlıdır',
      'Kavram B daha dar tanımlıdır',
      'Her iki kavram eş anlamlıdır',
      'Kavramlar farklı alanlara aittir',
    ] as [string, string, string, string],
    explanation:
      'Karşılaştırma sorularında kavramların kapsam, amaç ve kullanım alanlarını ayırt edin.',
  },
  {
    title: 'Sentez Sorusu',
    text: 'Tüm bilgiler bir arada değerlendirildiğinde en doğru sonuç hangisidir?',
    options: [
      'Sonuç I',
      'Sonuç II',
      'Sonuç III',
      'Sonuç IV',
    ] as [string, string, string, string],
    explanation:
      'Sentez sorularında parça bilgileri birleştirerek bütüncül bir sonuca ulaşmanız gerekir.',
  },
] as const
