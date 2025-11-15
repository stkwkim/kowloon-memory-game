// =============================================
// 九龍記憶庫 - 完整遊戲數據
// 8個關卡，4-6小時沉浸式體驗
// =============================================

const GAME_DATA = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶",
            description: "您現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。1960年代填海前，這裡是漁船停泊的碼頭，見證了香港從漁港到現代城市的轉變。",
            task: "拍攝鯨魚石與現代建築的對比照片，了解填海歷史對社區的影響",
            estimatedTime: "45分鐘",
            
            arConfig: {
                triggerObject: "鯨魚石",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1095-large.mp4",
                scanTime: 8,
                correctPassword: "FILLSEA1965", // 可更改
                arEffect: "海岸線重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false,
                photoTask: false
            },
            
            collectible: {
                name: "老漁民日記",
                description: "記錄了1960年代海邊生活的珍貴文獻，描述當時的漁港盛況",
                image: "📖",
                historicalContext: "1960年代土瓜灣仍是漁港，每日有數十艘漁船在此作業"
            },
            
            historicalFacts: [
                "海心公園原為海中心的小島，名為『海心島'",
                "1965-1970年代進行大規模填海工程", 
                "海岸線向北推移近500米",
                "漁村和碼頭從此消失，工業區逐漸建立"
            ],
            
            nextMission: "mission2.html",
            coordinates: "22.3165° N, 114.1905° E",
            passwordHint: "填海工程的開始年份+工程英文"
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群",
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展和人口急增。每棟樓宇都承載着移民家庭的記憶。",
            task: "觀察唐樓建築特色，記錄不同樓宇的年份，了解戰後移民歷史",
            estimatedTime: "50分鐘",
            
            arConfig: {
                triggerObject: "唐樓騎樓",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vintage-building-facade-1129-large.mp4", 
                scanTime: 7,
                correctPassword: "POSTWAR1958", // 可更改
                arEffect: "1950年代街景重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false,
                architectureSketch: false
            },
            
            collectible: {
                name: "建築藍圖",
                description: "1958年唐樓的原始設計圖，展現戰後建築特色",
                image: "📐",
                historicalContext: "為解決內地移民住屋需求而建的典型戰後建築"
            },
            
            historicalFacts: [
                "建於1950-60年代戰後重建時期",
                "見證香港工業化與人口急劇增長", 
                "混合用途設計：地下商鋪、樓上住宅",
                "反映當時的建築技術和社會狀況"
            ],
            
            nextMission: "mission3.html",
            coordinates: "22.3178° N, 114.1892° E",
            passwordHint: "戰後+代表性年份"
        },
        {
            id: 3,
            location: "九龍寨城公園",
            title: "🏯 三不管地帶的記憶", 
            description: "這裡曾經是著名的九龍寨城 - 世界上人口最密集的地方。1994年清拆前，這裡是獨特的社區生態系統，承載着無數故事。",
            task: "尋找歷史遺跡，了解寨城的獨特社區生態和清拆歷史",
            estimatedTime: "60分鐘",
            
            arConfig: {
                triggerObject: "衙門遺址",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-old-city-street-with-buildings-1127-large.mp4",
                scanTime: 10,
                correctPassword: "WALLEDCITY94", // 可更改
                arEffect: "寨城巷道重現"
            },
            
            requirements: {
                watchVideo: false, 
                correctAnswer: false,
                collectedItem: false,
                findArtifacts: false
            },
            
            collectible: {
                name: "寨城照片",
                description: "1993年清拆前的珍貴照片，記錄獨特社區生活",
                image: "📷",
                historicalContext: "0.026平方公里居住近5萬人的傳奇社區"
            },
            
            historicalFacts: [
                "清朝時已是軍事駐地，設有城牆和衙門",
                "1947-1993年發展成獨特的三不管地帶", 
                "1994年完成清拆，1995年建成公園",
                "公園設計保留原有城牆和衙門遺址"
            ],
            
            nextMission: "mission4.html", 
            coordinates: "22.3320° N, 114.1895° E",
            passwordHint: "英文名稱+清拆年份"
        },
        {
            id: 4,
            location: "九龍城泰國社區",
            title: "🍜 小泰國的由來",
            description: "九龍城是香港泰國社區的中心，這裡的發展與香港航空業歷史密切相關。體驗多元文化融合的獨特魅力。",
            task: "探索泰式商店，了解泰國文化如何融入香港社區",
            estimatedTime: "55分鐘",
            
            arConfig: {
                triggerObject: "泰式餐廳招牌",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-asian-street-market-1130-large.mp4",
                scanTime: 6,
                correctPassword: "THAITOWN1975", // 可更改  
                arEffect: "1970年代街市重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false,
                culturalInterview: false
            },
            
            collectible: {
                name: "泰式食譜",
                description: "傳統泰國菜食譜，記錄文化融合的飲食歷史", 
                image: "📜",
                historicalContext: "與啟德機場國際航線發展同步形成的社區"
            },
            
            historicalFacts: [
                "1970年代開始形成，與啟德機場歷史相關",
                "泰籍航空人員聚居帶動商店發展",
                "展現香港文化多元性和國際化特色", 
                "成為本地人體驗泰國文化的熱門地點"
            ],
            
            nextMission: "mission5.html",
            coordinates: "22.3302° N, 114.1913° E", 
            passwordHint: "英文社區名+形成年代"
        },
        {
            id: 5,
            location: "紅磡觀音廟",
            title: "🙏 漁民信仰與社區",
            description: "紅磡觀音廟見證了該區從漁港到市區的轉變，是重要的社區信仰中心。了解傳統信仰在現代社會的角色。",
            task: "觀察廟宇建築，了解觀音信仰在漁民社區的歷史角色", 
            estimatedTime: "40分鐘",
            
            arConfig: {
                triggerObject: "觀音像",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-historical-temple-architecture-1131-large.mp4",
                scanTime: 5,
                correctPassword: "GUANYIN1873", // 可更改
                arEffect: "清代廟宇場景"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false, 
                collectedItem: false,
                architectureStudy: false
            },
            
            collectible: {
                name: "廟宇籤文",
                description: "清代流傳下來的觀音籤文，反映當時漁民信仰",
                image: "🎴",
                historicalContext: "漁民出海前祈福保佑平安的重要場所"
            },
            
            historicalFacts: [
                "建於清朝同治年間，超過150年歷史",
                "原為漁民祈福保佑出海平安的重要場所", 
                "見證紅磡從漁港到現代市區的完整轉變",
                "現為三級歷史建築，繼續服務社區"
            ],
            
            nextMission: "mission6.html",
            coordinates: "22.3095° N, 114.1895° E",
            passwordHint: "英文神名+建廟年份"  
        },
        {
            id: 6, 
            location: "土瓜灣牛棚藝術村",
            title: "🎨 工業遺產的再生",
            description: "前身為屠房及牛隻檢疫站，現在轉型為藝術村。見證了土瓜灣從工業區到文化區的轉型過程。",
            task: "探索藝術空間，了解工業建築如何活化為文化場所",
            estimatedTime: "50分鐘",
            
            arConfig: {
                triggerObject: "紅磚建築",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-urban-art-graffiti-1132-large.mp4",
                scanTime: 7,
                correctPassword: "CATTLE2001", // 可更改
                arEffect: "工業時期重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false, 
                artAppreciation: false
            },
            
            collectible: {
                name: "藝術家手稿",
                description: "本地藝術家的創作手稿，展現社區藝術發展",
                image: "🎨", 
                historicalContext: "見證香港工業遺產活化的成功案例"
            },
            
            historicalFacts: [
                "建於1908年，曾為屠房及牛隻檢疫站",
                "2001年開始轉型為藝術村",
                "見證土瓜灣工業遺產的活化過程", 
                "成為本地藝術家的重要創作基地"
            ],
            
            nextMission: "mission7.html",
            coordinates: "22.3190° N, 114.1901° E",
            passwordHint: "英文原用途+轉型年份"
        },
        {
            id: 7,
            location: "九龍城碼頭",
            title: "⛵ 渡輪時代的記憶", 
            description: "九龍城碼頭曾經是連接香港島的重要渡輪航點，見證了海上交通的發展歷史。",
            task: "了解渡輪歷史，思考海上交通對社區連接的重要性",
            estimatedTime: "35分鐘",
            
            arConfig: {
                triggerObject: "碼頭燈塔",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-ferry-boat-on-the-river-1133-large.mp4",
                scanTime: 6,
                correctPassword: "FERRY1950", // 可更改
                arEffect: "1950年代碼頭景象"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false,
                transportationStudy: false
            },
            
            collectible: {
                name: "渡輪時刻表", 
                description: "1950年代的渡輪時刻表，記錄當時的海上交通",
                image: "⏱️",
                historicalContext: "連接九龍城與北角的重要海上航線"
            },
            
            historicalFacts: [
                "1950年代開始營運九龍城至北角航線",
                "見證香港海上交通的發展歷程", 
                "隨着隧道通車逐漸式微",
                "碼頭建築保留着當時的設計特色"
            ],
            
            nextMission: "mission8.html",
            coordinates: "22.3280° N, 114.1910° E",
            passwordHint: "英文交通工具+開始年份"
        },
        {
            id: 8,
            location: "啟德機場舊址",
            title: "✈️ 機場傳奇的終結",
            description: "啟德機場曾是世界上最危險的機場之一，1998年搬遷前是香港的國際門戶。了解其獨特歷史和城市影響。", 
            estimatedTime: "60分鐘",
            task: "探索機場舊址，了解啟德對九龍城區發展的深遠影響",
            
            arConfig: {
                triggerObject: "跑道遺跡",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-airplane-flying-in-the-sky-1134-large.mp4",
                scanTime: 8,
                correctPassword: "KAI1998TAK", // 可更改
                arEffect: "機場運作重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false, 
                collectedItem: false,
                legacyResearch: false
            },
            
            collectible: {
                name: "機場紀念章",
                description: "啟德機場的紀念印章，承載航空歷史記憶",
                image: "✈️",
                historicalContext: "1925-1998年運作的傳奇機場"
            },
            
            historicalFacts: [
                "1925年開始運作，1998年搬遷",
                "曾是世界上最危險的機場之一", 
                "對九龍城區發展有深遠影響",
                "舊址現發展為郵輪碼頭和住宅區"
            ],
            
            nextMission: "certificate.html",
            coordinates: "22.3095° N, 114.2145° E", 
            passwordHint: "英文機場名+搬遷年份"
        }
    ]
};

// 🔑 所有關卡密碼列表 (方便測試)
const MISSION_PASSWORDS = {
    1: "FILLSEA1965",    // 海心公園
    2: "POSTWAR1958",    // 十三街  
    3: "WALLEDCITY94",   // 寨城公園
    4: "THAITOWN1975",   // 泰國社區
    5: "GUANYIN1873",    // 觀音廟
    6: "CATTLE2001",     // 牛棚藝術
    7: "FERRY1950",      // 九龍城碼頭
    8: "KAI1998TAK"      // 啟德機場
};

// 🎯 AR測試配置
const AR_TEST_CONFIG = {
    // 測試模式開關
    TEST_MODE: true,
    
    // AR效果模擬選項
    SIMULATE_EFFECTS: {
        '海岸線重現': '顯示1960年代海岸線對比動畫',
        '1950年代街景重現': '黑白照片轉彩色動畫', 
        '寨城巷道重現': '3D寨城建築重現',
        '1970年代街市重現': '懷舊街市場景',
        '清代廟宇場景': '古裝人物互動',
        '工業時期重現': '牛隻運輸場景',
        '1950年代碼頭景象': '復古渡輪動畫',
        '機場運作重現': '飛機起降場景'
    },
    
    // 快速測試功能
    QUICK_TEST: {
        skipScan: true,      // 跳過掃描等待
        autoPlayVideo: true, // 自動播放影片
        showPasswordHint: true // 顯示密碼提示
    }
};
