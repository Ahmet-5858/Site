window.EducationData = {
    // URL Mappings for Notes
    notes: {
        matematik: "https://rehbermatematik.com/tyt-matematik-kamp-notlari",
        fizik: "https://vipfizik.com/tyt-fizik-video-ders-notlari-ucretsiz-pdf/",
        kimya: "https://bio.link/meschemy",
        biyoloji: "https://biyosem.com/tyt-biyoloji-pdf/",
        edebiyat: "https://www.denizhoca.com/9-sinif-edebiyat-notlari-pdf/",
        cografya: "https://cografyaninkodlari.com/tyt-cografya-video-ders-notlari-pdf/",
        tarih: "" // Link not provided
    },

    // Global configurations
    config: {
        grades: [9, 10, 11, 12],
        lessons: [
            { id: 'matematik', name: 'Matematik', icon: '📐', color: 'blue' },
            { id: 'fizik', name: 'Fizik', icon: '⚡', color: 'purple' },
            { id: 'kimya', name: 'Kimya', icon: '🧪', color: 'green' },
            { id: 'biyoloji', name: 'Biyoloji', icon: '🧬', color: 'teal' },
            { id: 'edebiyat', name: 'Edebiyat', icon: '📚', color: 'orange' },
            { id: 'tarih', name: 'Tarih', icon: '🏛️', color: 'red' },
            { id: 'cografya', name: 'Coğrafya', icon: '🌍', color: 'yellow' }
        ]
    },

    // Content Hierarchy: Grade -> Lesson -> Topics -> Resources
    content: {
        9: {
            matematik: [
                {
                    title: "Mantık ve Kümeler",
                    resources: [
                        { type: "video", title: "Temel Zemin Kampı - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxIPDL0QcGxNCL_8hocCrDsAp" }
                    ]
                },
                {
                    title: "Sayı Kümeleri",
                    resources: [
                        { type: "video", title: "Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=jqT1JzF5hks" }
                    ]
                },
                {
                    title: "1. Dönem 1. Yazılı",
                    resources: [
                        { type: "video", title: "Genel Tekrar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=up6zsk5SB9I" }
                    ]
                },
                {
                    title: "1. Dönem 2. Yazılı (Analiz)",
                    resources: [
                        { type: "video", title: "Konu Analizi - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=rjosWsa040M" }
                    ]
                },
                {
                    title: "1. Dönem 2. Yazılı (Prova)",
                    resources: [
                        { type: "video", title: "Soru Provası - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=mxYKUUbTBwM" }
                    ]
                }
            ],
            fizik: [
                {
                    title: "9. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (Maarif) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwpTQ-7dOJGF3hnUZ14Re3aJ" }
                    ]
                },
                {
                    title: "Fizik Bilimine Giriş",
                    resources: [
                        { type: "video", title: "Konu Anlatımı (2026) - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=xt_Ptx3idM8" }
                    ]
                },
                {
                    title: "Madde ve Özellikleri",
                    resources: [
                        { type: "video", title: "Yeni Müfredat Detaylı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=DiYbLCxiVMo" }
                    ]
                },
                {
                    title: "9. Sınıf 1. Yazılı",
                    resources: [
                        { type: "video", title: "Genel Tekrar (Maarif Model) - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=IrcmodDyOd4" }
                    ]
                }
            ],

            kimya: [
                {
                    title: "9. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (Maarif) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_blpreJjtlv1jjjsMY0tI7l" }
                    ]
                },
                {
                    title: "Kimya Bilimi (1. Tema)",
                    resources: [
                        { type: "video", title: "Yeni Müfredat Başlangıç - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=-lgqmJV3_v8" }
                    ]
                },
                {
                    title: "Atom ve Periyodik Sistem",
                    resources: [
                        { type: "video", title: "Detaylı Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=2MItYrH-QPc" }
                    ]
                },
                {
                    title: "9. Sınıf 1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Maarif Model Genel Tekrar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=_MvRFV6DYRk" }
                    ]
                }
            ],
            biyoloji: [
                {
                    title: "9. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (2026) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJW_fmD_OQo8H2B8DjPxH4Q-" }
                    ]
                },
                {
                    title: "Yaşam Bilimi Biyoloji",
                    resources: [
                        { type: "video", title: "Konu Anlatımı & Başlangıç - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=VFJ3SrWDVOA" }
                    ]
                },
                {
                    title: "Biyolojinin Önemi",
                    resources: [
                        { type: "video", title: "Maarif Model Ders 1 - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=84J7RbQH-fU" }
                    ]
                },
                {
                    title: "Hücre ve Yapısı",
                    resources: [
                        { type: "video", title: "Detaylı Konu Anlatımı - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJW_fmD_OQo8H2B8DjPxH4Q-" }
                    ]
                }
            ],
            tarih: [
                {
                    title: "9. Sınıf 1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Maarif Modeli Full Tekrar - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=zVyU-h5a0V0" }
                    ]
                },
                {
                    title: "9. Sınıf Tarih Konu Özeti",
                    resources: [
                        { type: "video", title: "Maarif Modeli Hızlı Tekrar - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=ymI3B7gFAII" }
                    ]
                },
                {
                    title: "9. Sınıf Yazılı Provası",
                    resources: [
                        { type: "video", title: "MEB Kazanımlı Sorular - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=uid_Lo8pySs" }
                    ]
                }
            ],
            cografya: [
                {
                    title: "9. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (Maarif) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7LhwmBQYEc2pdsKGC4wuVjD" }
                    ]
                },
                {
                    title: "Doğa ve İnsan",
                    resources: [
                        { type: "video", title: "Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=vYYFZoeTj8g" }
                    ]
                },
                {
                    title: "Coğrafi Koordinatlar",
                    resources: [
                        { type: "video", title: "Detaylı Kodlamalar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=DzoqD30tomo" }
                    ]
                },
                {
                    title: "Dünya Harita Çalışması",
                    resources: [
                        { type: "video", title: "Harita Bilgisi Kampı - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7K5FU2po54d5tpNVriujzuz" }
                    ]
                }
            ]
        },
        10: {
            matematik: [
                {
                    title: "Sayma ve Olasılık",
                    resources: [
                        { type: "video", title: "Maarif Model Anlatım - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxIPrpNi6oFyVVMlM-bUO7E6c" }
                    ]
                },
                {
                    title: "Fonksiyon & Polinom",
                    resources: [
                        { type: "video", title: "Konu Anlatım Serisi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxINcNPlkr0-Ngou1jmIYcl7" }
                    ]
                },
                {
                    title: "1. Dönem 1. Yazılı",
                    resources: [
                        { type: "video", title: "Genel Tekrar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=6hbPJ8bH6Nk" }
                    ]
                },
                {
                    title: "1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Senaryo Çözümü - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=GfaSnuxHmVk" }
                    ]
                }
            ],

            fizik: [
                {
                    title: "10. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (Maarif) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwofhQK0jLH0QAUNPS1oQuZ5" }
                    ]
                },
                {
                    title: "Elektrik ve Manyetizma",
                    resources: [
                        { type: "video", title: "Başlangıç ve Temel Kavramlar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=uMkwo5MtBdo" }
                    ]
                },
                {
                    title: "Basınç ve Kaldırma",
                    resources: [
                        { type: "video", title: "Detaylı Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=0LPJceD7BBc" }
                    ]
                },
                {
                    title: "İş, Güç ve Enerji",
                    resources: [
                        { type: "video", title: "Maarif Model Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=RFDVHkd6NwM" }
                    ]
                }
            ],
            kimya: [
                {
                    title: "10. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (Maarif) Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_bpYlgDVIpcwM29P8smcaL9" }
                    ]
                },
                {
                    title: "Kimyanın Temel Yasaları",
                    resources: [
                        { type: "video", title: "Konu Anlatımı & Hesaplamalar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=OyQpO1TwBOQ" }
                    ]
                },
                {
                    title: "Mol Kavramı",
                    resources: [
                        { type: "video", title: "Detaylı ve Kolay Anlatım - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=KSKC7njZ6l4" }
                    ]
                },
                {
                    title: "10. Sınıf 1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Maarif Model Prova - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=XPp_XOjo8o0" }
                    ]
                }
            ],
            biyoloji: [
                {
                    title: "10. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Yeni Müfredat (2025-2026) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJVmsrdagmvTgqqJm0AgXNVX" }
                    ]
                },
                {
                    title: "ATP ve Enerji",
                    resources: [
                        { type: "video", title: "Enerji Ünitesi Başlangıç - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=62gPUkz2HTQ" }
                    ]
                },
                {
                    title: "Hücre Bölünmeleri",
                    resources: [
                        { type: "video", title: "Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=y-VvITjNoN8" }
                    ]
                },
                {
                    title: "10. Sınıf Yazılı Hazırlık",
                    resources: [
                        { type: "video", title: "Sınav Öncesi Genel Tekrar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=fRDAF3yDypc" }
                    ]
                }
            ],
            tarih: [
                {
                    title: "10. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Maarif Modeli Oynatma Listesi - Mehmet Celal", duration: "Playlist", url: "http://www.youtube.com/playlist?list=PLjsFV1N4WKLgSQb8k-6rjMA_c9aU3cFFE" }
                    ]
                },
                {
                    title: "10. Sınıf Tek Part Videolar",
                    resources: [
                        { type: "video", title: "Ünite Özetleri - Mehmet Celal", duration: "Playlist", url: "http://www.youtube.com/playlist?list=PLjsFV1N4WKLjxe_eRqwE81wDm5Anbm_WM" }
                    ]
                },
                {
                    title: "10. Sınıf 1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Konu Özet Full Tekrar - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=QJQnF-YhQ2k" }
                    ]
                },
                {
                    title: "10. Sınıf 1. Dönem 1. Yazılı",
                    resources: [
                        { type: "video", title: "Yazılı Hazırlık Provası - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=dwFy0EnD21A" }
                    ]
                }
            ],
            cografya: [
                {
                    title: "10. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "Tüm Konular (2025-2026) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7IUOWp789EotatvsiuQBYiI" }
                    ]
                },
                {
                    title: "İç Kuvvetler",
                    resources: [
                        { type: "video", title: "Kodlamalı Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=I7Da2Vmp0H4" }
                    ]
                },
                {
                    title: "Su Kaynakları",
                    resources: [
                        { type: "video", title: "Haritalarla Anlatım - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=TM5R-HnFm2w" }
                    ]
                },
                {
                    title: "10. Sınıf Konu Listesi",
                    resources: [
                        { type: "video", title: "Alternatif Detaylı Liste - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7I6uzVY9RD96pLGdUPhojeE" }
                    ]
                }
            ]
        },
        11: {
            matematik: [
                {
                    title: "Trigonometri/Analitik",
                    resources: [
                        { type: "video", title: "Konu Anlatım Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxINraREO_NIOTazDmOdWkRkX" }
                    ]
                },
                {
                    title: "1. Dönem 1. Yazılı",
                    resources: [
                        { type: "video", title: "Genel Tekrar - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=mvLJiFSjGPs" }
                    ]
                },
                {
                    title: "1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "Soru Çözümü - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=zGh6ZYyE1Lw" }
                    ]
                },
                {
                    title: "Yazılı Hazırlık",
                    resources: [
                        { type: "video", title: "Prova Soruları - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=WDdsv9WyIUk" }
                    ]
                }
            ],

            fizik: [
                {
                    title: "11. Sınıf Full Kamp",
                    resources: [
                        { type: "video", title: "AYT Fizik Temel Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwom9fevJaUOeTehSfgNeeIHV" }
                    ]
                },
                {
                    title: "Vektörler ve Kuvvet",
                    resources: [
                        { type: "video", title: "Konu Anlatımı & Soru Çözümü - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=lYh_C087wmQ" }
                    ]
                },
                {
                    title: "Bağıl Hareket",
                    resources: [
                        { type: "video", title: "AYT Odaklı Anlatım - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=xmvf-BayR0Q" }
                    ]
                },
                {
                    title: "11. Sınıf 1. Yazılı",
                    resources: [
                        { type: "video", title: "Soru Provası (2025-2026) - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=TOpdCFY7wrU" }
                    ]
                }
            ],
            kimya: [
                {
                    title: "39 Günde AYT Kimya",
                    resources: [
                        { type: "video", title: "2025-2026 Güncel Kamp Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_ZDJ9zWOOprF8Vi4VjXtXGk" }
                    ]
                },
                {
                    title: "Modern Atom Teorisi",
                    resources: [
                        { type: "video", title: "AYT Başlangıç Konusu - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=x1EIcNatU2o" }
                    ]
                },
                {
                    title: "Periyodik Özellikler",
                    resources: [
                        { type: "video", title: "AYT Odaklı Anlatım - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=OOmdF09OL0o" }
                    ]
                },
                {
                    title: "11. Sınıf 1. Yazılı Hazırlık",
                    resources: [
                        { type: "video", title: "MEB Senaryolu Prova - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=Btu-RPT_7Q8" }
                    ]
                }
            ],
            biyoloji: [
                {
                    title: "Denetleyici ve Düzenleyici",
                    resources: [
                        { type: "video", title: "Sinir Sistemi (Beyin) - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=C6HSM3oNx6c" }
                    ]
                },
                {
                    title: "Sistemler Full Kamp",
                    resources: [
                        { type: "video", title: "AYT Biyoloji Hazırlık - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJXkJwFkoefNX2K_nTMfl158" }
                    ]
                },
                {
                    title: "Endokrin Sistem",
                    resources: [
                        { type: "video", title: "Detaylı Konu Anlatımı - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=4TSDgTt83yw" }
                    ]
                },
                {
                    title: "11. Sınıf Genel Tekrar",
                    resources: [
                        { type: "video", title: "Yazılıya Hazırlık Soruları - ZEDUVA", duration: "Arama", url: "https://www.youtube.com/@Biosem/search?query=11.sınıf" }
                    ]
                }
            ],
            tarih: [
                {
                    title: "11. Sınıf 1. Dönem 2. Yazılı",
                    resources: [
                        { type: "video", title: "2025-2026 Full Tekrar - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=R43prLm_7Ig" }
                    ]
                },
                {
                    title: "11. Sınıf Tarih Prova",
                    resources: [
                        { type: "video", title: "Yazılıya Hazırlık - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=vnNRaDN6t4w" }
                    ]
                }
            ],
            cografya: [
                {
                    title: "Ekosistem ve Biyoçeşitlilik",
                    resources: [
                        { type: "video", title: "AYT Başlangıç Konuları - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=Hi7vOmknvC8" }
                    ]
                },
                {
                    title: "Türkiye'de Ekonomi",
                    resources: [
                        { type: "video", title: "Harita Odaklı Analiz - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=63f1gaqAn2k" }
                    ]
                },
                {
                    title: "11. Sınıf Yazılı Hazırlık",
                    resources: [
                        { type: "video", title: "Sınav Öncesi Genel Tekrar - ZEDUVA", duration: "Arama", url: "https://www.youtube.com/@cografyaninkodlari/search?query=11.sınıf+yazılı" }
                    ]
                },
                {
                    title: "AYT Coğrafya Kampı",
                    resources: [
                        { type: "video", title: "11. Sınıfı Kapsayan AYT Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7LeZJX315_SnVZEJzUh4CLt" }
                    ]
                }
            ]
        },
        12: {
            matematik: [
                {
                    title: "YKS Yol Haritası",
                    resources: [
                        { type: "video", title: "2025-2026 Strateji - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=bJ9sp9jr2Tw" }
                    ]
                },
                {
                    title: "AYT Matematik Kampı",
                    resources: [
                        { type: "video", title: "Sıralı Tüm Konular - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxIMw2hDlyOSGb9DAyZHibmm5" }
                    ]
                },
                {
                    title: "L-T-İ (Limit-Türev)",
                    resources: [
                        { type: "video", title: "AYT Konu Anlatımı - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxINraREO_NIOTazDmOdWkRkX" }
                    ]
                },
                {
                    title: "1. Dönem 1. Yazılı",
                    resources: [
                        { type: "video", title: "MEB Senaryo Uyumu - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=o0_UIgPWXi8" }
                    ]
                },
                {
                    title: "TYT Soru Bankası",
                    resources: [
                        { type: "video", title: "Barış Yay. Çözümleri - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLHtzdL6xrxIMgjhxScWc2JBOZaBWs9D8L" }
                    ]
                }
            ],

            fizik: [
                {
                    title: "39 Günde TYT Kampı",
                    resources: [
                        { type: "video", title: "YKS 2026 Güncel Liste - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwqWbRHpDnhpBCRxiyNkZgq0" }
                    ]
                },
                {
                    title: "39 Günde AYT Kampı",
                    resources: [
                        { type: "video", title: "2025-2026 AYT Full Liste - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwowVyIegsf3QQw3OsYfEkPR" }
                    ]
                },
                {
                    title: "12 Günde Kritik Konular",
                    resources: [
                        { type: "video", title: "Hızlı Tekrar ve Garanti Konular - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwoFWrn9afhH3nUVPPlKBY3O" }
                    ]
                },
                {
                    title: "TYT Fizik (Hızlı Kamp)",
                    resources: [
                        { type: "video", title: "27 Günde Temel Fizik - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLwyfvkhKMmwo0KbHkMFN-v27LgqKix75J" }
                    ]
                }
            ],
            kimya: [
                {
                    title: "39 Günde TYT Kimya",
                    resources: [
                        { type: "video", title: "2026-2027 Hedefli Liste - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_ZfnhNcNTUhF36t17ynwZho" }
                    ]
                },
                {
                    title: "27 Günde TYT Kimya",
                    resources: [
                        { type: "video", title: "Hızlı ve Yoğun Kamp (2025) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_YU0m0vJQSM_MJzM-k0p1Vu" }
                    ]
                },
                {
                    title: "33 Günde TYT (Temel-Orta)",
                    resources: [
                        { type: "video", title: "Sıfırdan Başlayanlar İçin - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_aKpGOYcnp6jECbqcCeelvg" }
                    ]
                },
                {
                    title: "12 Günde Kritik Konular",
                    resources: [
                        { type: "video", title: "Soru Kaçırılmayacak Önemli Yerler - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLBals97P4r_aoqiY8GPHE3M3eJb4qhE80" }
                    ]
                }
            ],
            biyoloji: [
                {
                    title: "39 Günde TYT Kampı",
                    resources: [
                        { type: "video", title: "En Güncel TYT Listesi (2026) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJWEP58XKgI5LE1BeMTOkhjJ" }
                    ]
                },
                {
                    title: "42 Günde AYT Kampı",
                    resources: [
                        { type: "video", title: "Ayrıntılı AYT Hazırlık - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJXkJwFkoefNX2K_nTMfl158" }
                    ]
                },
                {
                    title: "TYT Biyoloji Hızlı Bitir",
                    resources: [
                        { type: "video", title: "Alternatif Kamp Listesi - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLqLwBmByktJWbDXnjbl5CMRrm5nEwMFOg" }
                    ]
                },
                {
                    title: "0'dan Biyoloji",
                    resources: [
                        { type: "video", title: "Temel Seviye Başlangıç - ZEDUVA", duration: "Çevrimiçi", url: "https://www.youtube.com/watch?v=PxL73jp6LBI" }
                    ]
                }
            ],
            tarih: [
                {
                    title: "2026 TYT Tarih Kampı",
                    resources: [
                        { type: "video", title: "Sıralı Konu Anlatımı - Mehmet Celal", duration: "Playlist", url: "http://www.youtube.com/playlist?list=PL5kIOunpmSBOLwwdcjJ6DTE6nqL3J0pIY" }
                    ]
                },
                {
                    title: "39 Günde TYT Tarih",
                    resources: [
                        { type: "video", title: "Detaylı Soru Çözümlü Kamp - Mehmet Celal", duration: "Playlist", url: "http://www.youtube.com/playlist?list=PLRbyTgiOSh9nqSw97n5L-ywijENKVkvgs" }
                    ]
                },
                {
                    title: "5 Saatte TYT Tarih",
                    resources: [
                        { type: "video", title: "Hızlı Genel Tekrar Kampı - Mehmet Celal", duration: "Playlist", url: "http://www.youtube.com/playlist?list=PLSbLCxwRotRt4j-MwcnqxbKrJKJAd07jY" }
                    ]
                },
                {
                    title: "AYT Tarih 2026",
                    resources: [
                        { type: "video", title: "Mehmet Celal Özyıldız Kampı - Mehmet Celal", duration: "Çevrimiçi", url: "http://www.youtube.com/watch?v=5QxOpTALmEE" }
                    ]
                }
            ],
            cografya: [
                {
                    title: "39 Günde TYT Kampı",
                    resources: [
                        { type: "video", title: "En Güncel TYT Listesi (2026) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7J3C3CJCelCOWIwUezzxBZIT" }
                    ]
                },
                {
                    title: "TYT Konu + Soru Çözüm",
                    resources: [
                        { type: "video", title: "2025-2026 Hızlı Tekrar - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7LVQ5xJc8x0QNSK29UjPxpW" }
                    ]
                },
                {
                    title: "Dünya Haritası Kampı",
                    resources: [
                        { type: "video", title: "Haritaların Kodları (Full) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7K5FU2po54d5tpNVriujzuz" }
                    ]
                },
                {
                    title: "KPSS & AGS Hazırlık",
                    resources: [
                        { type: "video", title: "Genel Coğrafya (2026) - ZEDUVA", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLnBnugScc-7ImTQrm8DvvMFHByN5Pg31V" }
                    ]
                }
            ]
        }
    }
};
