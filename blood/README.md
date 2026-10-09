# 🩸 রক্তদান | Blood Donate BD

**[roktodanbd.com](https://roktodanbd.com)** — ঠাকুরগাঁও থেকে শুরু হওয়া, সারা বাংলাদেশের জন্য বিনামূল্যের রক্তদাতা নেটওয়ার্ক।

A free blood donor network for Bangladesh. Find donors by blood group, district and upazila across all 64 districts, post urgent blood requests, and contact donors directly.

## ✨ ফিচার
- রক্তের গ্রুপ, বিভাগ, জেলা ও উপজেলা দিয়ে ডোনার খোঁজা — কল, SMS, WhatsApp, Messenger
- Google / Gmail + পাসওয়ার্ড দিয়ে যাচাই করা অ্যাকাউন্ট (ভুয়া অ্যাকাউন্ট ঠেকাতে)
- 🚨 জরুরি রক্তের অনুরোধ — প্রতিটি অনুরোধের আলাদা কোড (#RD-xxxx) ও আলাদা আলোচনা
- 📘 Facebook গ্রুপে এক চাপে পোস্ট (লেখা কপি + গ্রুপ খোলা)
- 💬 কমিউনিটি চ্যাট — বিষয় ট্যাগ (রক্ত দরকার / দিতে চাই), রিপ্লাই
- 📝 ব্লগ — ছবিসহ পোস্ট, হোমপেজে সাম্প্রতিক পোস্ট
- 🤖 অফলাইন AI সহকারী — সাইটের লাইভ ডেটা থেকে উত্তর
- 📍 ৬৪ জেলার আলাদা SEO পেজ (`/blood/<district>/`)
- বাংলা / English, লাইট / ডার্ক মোড

## 🗂 ফাইল
| পথ | কাজ |
|---|---|
| `index.html` | মূল ওয়েবসাইট (এক ফাইলে HTML + CSS + JS) |
| `blood/` | ৬৪ জেলার পেজ + `district.css`, `district.js` |
| `sitemap.xml`, `robots.txt` | Google-এর জন্য |
| `manifest.json`, আইকন, `og-image.jpg` | মোবাইল অ্যাপ আইকন ও শেয়ারের ছবি |

## ☁️ ব্যাকএন্ড
Firebase Authentication + Cloud Firestore (collections: `donors`, `users`, `requests`, `requests/{id}/chat`, `community`, `blog`, `blogImages`).

## 🔒 নিরাপত্তা
- `firestore.rules` (ডেটাবেসের নিরাপত্তা নিয়ম ও অ্যাডমিন তালিকা) এবং `.htaccess` ইচ্ছাকৃতভাবে এই রিপোজিটরিতে **নেই** — এগুলো শুধু Firebase Console ও হোস্টিংয়ে থাকে।
- Firebase কনফিগ (apiKey ইত্যাদি) এই রিপোতে নেই — এটা `firebase-config.js` ফাইলে থাকে, যেটা শুধু হোস্টিংয়ে রাখা হয়। নমুনা: `firebase-config.example.js`। ডেটার সুরক্ষা আসে Firestore Rules থেকে।

## 👨‍💻 ডেভেলপার
**Md Sanuwar Hossen Sabbir** — Thakurgaon, Bangladesh · 📞 01732-096778

© ২০২৬ রক্তদান
