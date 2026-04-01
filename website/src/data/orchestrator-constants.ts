export const CHIEF_PROTOCOLS = [
  { id: "cp1", label: "1. Sistem Analizi", desc: "İstek analizi, dosya tespiti ve etki alanı araştırması." },
  { id: "cp2", label: "2. Operasyon Planı", desc: "Görev dağılımı, strateji belirleme ve ajan yönetimi." },
  { id: "cp3", label: "3. Mimari & Görsel Denetim", desc: "Tasarım standartları ve marka uyumu kontrolü." },
  { id: "cp4", label: "4. Uygulama & Kodlama", desc: "Teknik değişikliğin hayata geçirilmesi ve build süreci." },
  { id: "cp5", label: "5. Sistem Entegrasyonu", desc: "Linkleme, bağımlılık kontrolü ve fonksiyonel doğrulama." },
  { id: "cp6", label: "6. Final Kalite Kontrol (QA)", desc: "Build onarımı, typo denetimi ve responsive testi." },
  { id: "cp7", label: "7. Hafıza & Protokol Mührü", desc: "Sürecin GEMINI.md ve global hafıza sistemine kalıcı kaydı." }
];

export const AGENT_PROTOCOLS: Record<string, { id: string, label: string, desc: string }[]> = {
  "brand-expert": [
    { id: "be1", label: "1. Identity Activation", desc: "Premium Enterprise persona ve temel kuralların (Build yasağı vb.) kuşanılması." },
    { id: "be2", label: "2. Audience Profiling", desc: "C-Level vs. Teknisyen niyet analizi ve stratejik hedef belirleme." },
    { id: "be3", label: "3. Messaging Hierarchy", desc: "Birincil, ikincil ve destekleyici mesaj hiyerarşisinin kurgulanması." },
    { id: "be4", label: "4. Terminology Refinement", desc: "Ucuz dilin temizlenmesi ve 'High-Performance' terminolojisinin enjeksiyonu." },
    { id: "be5", label: "5. Brand Audit Score", desc: "Stratejik vizyona uygunluk puanlaması (🟢|🟡|🔴) ve geri bildirim." },
    { id: "be6", label: "6. Fallback Hypothesis", desc: "Eksik bağlam durumunda yüksek güvenli marka hipotezinin üretilmesi." },
    { id: "be7", label: "7. Strategic Deliverable", desc: "brandBrief JSON paketinin hazırlanması ve sonraki adıma handoff." }
  ],
  "content-seo-lead": [
    { id: "csl1", label: "1. Intent Decryption", desc: "Kullanıcının sayfadaki 'Arama Niyeti'nin (Intent) deşifre edilmesi." },
    { id: "csl2", label: "2. Cannibalization Check", desc: "Yeni içeriğin sitedeki mevcut yapıyla SEO çakışma analizi." },
    { id: "csl3", label: "3. Semantic Architecture", desc: "H1-H3 başlık hiyerarşisi ve semantik HTML yapısının inşası." },
    { id: "csl4", label: "4. Meta & Slug Design", desc: "Karakter sınırına uygun Meta Title, Description ve URL mimarisi." },
    { id: "csl5", label: "5. Keyword Calibration", desc: "Primary ve Long-Tail anahtar kelimelerin metne stratejik dağılımı." },
    { id: "csl6", label: "6. SEO Impact Report", desc: "Yapılan değişikliğin sıralama üzerindeki potansiyel etkisinin raporlanması." },
    { id: "csl7", label: "7. contentSpec Delivery", desc: "SEO ve içerik spesifikasyonlarının JSON olarak mühürlenmesi." }
  ],
  "ui-ux-architect": [
    { id: "ux1", label: "1. Aesthetic Variable", desc: "Yeni estetik değişkenler ve vizyoner tasarım önerilerinin geliştirilmesi." },
    { id: "ux2", label: "2. Superdesign Protocol", desc: "Mimari tasarım yeteneklerinin (Glassmorphism, Blurs) en üst seviyede uygulanması." },
    { id: "ux3", label: "3. Layout Sectioning", desc: "Sayfanın hikaye anlatan mantıksal section'lara ve gridlere bölünmesi." },
    { id: "ux4", label: "4. Lego Componentization", desc: "Tasarımın tekrar kullanılabilir 'lego blokları' olarak kurgulanması." },
    { id: "ux5", label: "5. Bento Grid Logic", desc: "Modern ve asimetrik kutu yerleşimlerinin (Bento) tasarım sistemine adaptasyonu." },
    { id: "ux6", label: "6. Responsive Matrix", desc: "Mobil, Tablet ve Desktop için özelleşmiş görsel stratejilerin üretilmesi." },
    { id: "ux7", label: "7. layoutSpec Handoff", desc: "Tüm teknik tasarım detaylarının (Tokens, Variants) teslimi." }
  ],
  "design-system-guardian": [
    { id: "dsg1", label: "1. Token-First Audit", desc: "Hardcoded sınıfların tespiti ve design-tokens.json ile değiştirilmesi." },
    { id: "dsg2", label: "2. Typography Scale", desc: "H1-H6 hiyerarşisinin ve font ağırlıklarının milimetrik denetimi." },
    { id: "dsg3", label: "3. Spacing Rhythm", desc: "Section padding (py-24) ve container limitlerinin korunması." },
    { id: "dsg4", label: "4. Variant Standardization", desc: "Buton, input ve form bileşenlerinin varyant birliğinin sağlanması." },
    { id: "dsg5", label: "5. Evolution Protocol", desc: "Yeni tasarım atomlarının JSON->CSS->React hiyerarşisiyle sisteme eklenmesi." },
    { id: "dsg6", label: "6. Visual Deviation", desc: "Tasarım sapmalarının raporlanması (tokenAudit) ve skorlama." },
    { id: "dsg7", label: "7. System Lockdown", desc: "Görsel anayasanın korunması ve tüm sayfaların senkronizasyonu." }
  ],
  "motion-master": [
    { id: "mm1", label: "1. Experience Soul", desc: "Deneyimin 'ruhunu' belirleyen mikro-etkileşim döngülerinin tasarımı." },
    { id: "mm2", label: "2. Spring Physics", desc: "Organik hissettiren yay tabanlı (stiffness, damping) fizik kalibrasyonu." },
    { id: "mm3", label: "3. Entrance Orchestration", desc: "Öğelerin sahneye giriş sırasının ve zamanlamasının yönetilmesi." },
    { id: "mm4", label: "4. Scroll Trigger Plan", desc: "Kullanıcı kaydırdıkça tetiklenen hikayesel animasyonların kurgusu." },
    { id: "mm5", label: "5. GPU Optimization", desc: "60 FPS akıcılık için GPU Compositing ve performans denetimi." },
    { id: "mm6", label: "6. Accessibility Path", desc: "Harekete duyarlı kullanıcılar için 'Reduced Motion' alternatiflerinin inşası." },
    { id: "mm7", label: "7. interactionSpec", desc: "Tüm animasyon parametrelerinin kod seviyesine teslimi." }
  ],
  "next-code-master": [
    { id: "ncm1", label: "1. Architecture Logic", desc: "Server Component vs Client Component karar matrisinin uygulanması." },
    { id: "ncm2", label: "2. 58-Rule Clean Code", desc: "Vercel'in 'React Best Practices' kılavuzuna göre kod denetimi." },
    { id: "ncm3", label: "3. Compound Patterns", desc: "Karmaşık bileşenlerin lego gibi birleştirilebilir (Compound) inşası." },
    { id: "ncm4", label: "4. Strict TypeScript", desc: "Tüm veri akışının katı tipler ve interface'ler ile güvenceye alınması." },
    { id: "ncm5", label: "5. Dynamic Binding", desc: "JSON verilerinin manuel yazım yerine programatik map() edilmesi." },
    { id: "ncm6", label: "6. Re-render Shield", desc: "Memoization ve state yönetimi ile gereksiz renderların engellenmesi." },
    { id: "ncm7", label: "7. Technical Scorecard", desc: "Kodun bundle boyutu ve Lighthouse üzerindeki etkisinin mühürlenmesi." }
  ],
  "qa-engineer": [
    { id: "qa1", label: "1. Evidence-Based Fix", desc: "'Should work' yerine 'Ran command, result is X' kanıt protokolü." },
    { id: "qa2", label: "2. Systematic Debug", desc: "Hataların 4 fazlı (Root Cause, Pattern, Hypo, Fix) bilimsel onarımı." },
    { id: "qa3", label: "3. Cross-Viewport Audit", desc: "320px'den 1440px'e kadar tam kapsamlı responsive testi." },
    { id: "qa4", label: "4. Web Vitals Guard", desc: "CLS < 0.1 ve LCP < 2.5s performans kriterlerinin doğrulanması." },
    { id: "qa5", label: "5. WCAG Access Audit", desc: "Renk kontrastı, ARIA ve klavye erişilebilirliği denetimi." },
    { id: "qa6", label: "6. Visual Regression", desc: "Yeni kodun eski yapıyı bozup bozmadığının milimetrik kontrolü." },
    { id: "qa7", label: "7. Terminal Final Sign", desc: "İşlemin %100 bittiğine dair kanıtlı, programatik onay mührü." }
  ]
};
