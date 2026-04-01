# ServiceCore Web Platform

**ServiceCore**, kurumsal hizmet yönetiminde (ESM/ITSM) yeni nesil bir deneyim sunan, ITIL 4 standartlarına dayalı kapsamlı bir platformdur. Bu depo (repository), ServiceCore'un web arayüzünü ve bu ekosistemi destekleyen gelişmiş AI Ajan sistemini içerir.

## Proje Vizyonu

ServiceCore, karmaşık kurumsal süreçleri basitleştirmeye ve değer odaklı bir hizmet kültürü oluşturmaya odaklanır. "Keep it simple" ve "Focus on value" felsefesiyle, ITIL 4 süreçlerini (Incident, Problem, Change, Service Request vb.) tek bir çatı altında, modern ve kullanıcı dostu bir arayüzle sunar.

## Temel Özellikler

- **ITIL 4 Uyumluluğu:** Tüm modüller ITIL 4 metodolojisine uygun olarak tasarlanmıştır.
- **ESM & ITSM Suite:** Sadece BT değil, İK, Tesis Yönetimi ve diğer tüm departmanlar için entegre hizmet yönetimi.
- **Low Code Mimari:** Teknik bilgi gerektirmeden dinamik formlar ve süreçler oluşturabilme.
- **Rest API Entegrasyonu:** Diğer sistemlerle sorunsuz veri alışverişi.
- **Yapay Zeka Desteği:** İş süreçlerini optimize eden ve otomatize eden entegre AI ajan framework'ü.

## Teknoloji Yığını

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** Tailwind CSS / PostCSS
- **State Management:** React Hooks & Context API
- **AI Framework:** .gemini Agent System
- **Deployment:** Vercel

## Geliştirme ve Katkı

Projeyi yerel ortamda çalıştırmak için:

```bash
npm install
npm run dev
```

### AI Ajan Framework (.gemini)

Bu projenin en özgün yanlarından biri, geliştirme ve bakım süreçlerinde kullanılan `.gemini` klasöründeki AI ajan yapılandırmasıdır. Ajanlar, marka dilimizi ve teknik standartlarımızı (ITIL 4, Accessibility vb.) bu klasördeki dökümanlardan öğrenerek geliştirme yaparlar.

Daha fazla detay için: [`.gemini/README.md`](./.gemini/README.md)

## Lisans ve İletişim

Bu proje **ServiceCore Bilgi Teknolojileri A.Ş.**'ye aittir.
- **Destek:** support@servicecore.app
- **Web:** [servicecore.com.tr](https://www.servicecore.com.tr)
