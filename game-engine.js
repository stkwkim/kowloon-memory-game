// =============================================
// 九龍記憶庫 - 完整遊戲引擎 (8個關卡)
// 4-6小時沉浸式體驗
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
                correctPassword: "填海工程",
                arEffect: "海岸線重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "老漁民日記",
                description: "1962年漁民記錄的出海日誌，描述當時海邊生活",
                image: "📖",
                story: "『每日清晨四時出海，黃昏歸來，海心島一帶魚獲最豐富...』"
            },
            
            historicalContext: {
                period: "1960年代",
                significance: "土瓜灣填海工程的起點",
                impact: "海岸線向北推移500米，漁村消失"
            },
            
            nextMission: "mission2.html",
            coordinates: "22.3165° N, 114.1905° E"
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群",
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展和內地移民潮。每棟唐樓都承載着不同家庭的故事。",
            task: "觀察唐樓的騎樓設計，了解戰後建築特色與社區形成",
            estimatedTime: "50分鐘",
            
            arConfig: {
                triggerObject: "唐樓騎樓",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vintage-building-facade-1129-large.mp4",
                scanTime: 7,
                correctPassword: "戰後重建",
                arEffect: "1950年代街景重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "建築藍圖",
                description: "1958年唐樓原始設計圖，展現戰後建築風格",
                image: "📐",
                story: "設計師在藍圖旁註明：『為新移民提供安身之所』"
            },
            
            historicalContext: {
                period: "1950-1960年代", 
                significance: "戰後移民住屋解決方案",
                impact: "形成緊密社區網絡，商住混合模式"
            },
            
            nextMission: "mission3.html",
            coordinates: "22.3178° N, 114.1892° E"
        },
        {
            id: 3,
            location: "九龍寨城公園",
            title: "🏯 三不管地帶的記憶",
            description: "這裡曾經是傳奇的九龍寨城 - 世界上人口最密集的地方。在0.026平方公里土地上居住近5萬人，形成獨特的社區生態系統。",
            task: "尋找清朝衙門遺址，了解寨城從軍事駐地到獨特社區的演變",
            estimatedTime: "60分鐘",
            
            arConfig: {
                triggerObject: "衙門遺址",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-old-city-street-with-buildings-1127-large.mp4",
                scanTime: 10,
                correctPassword: "九龍寨城",
                arEffect: "寨城巷道重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "寨城照片",
                description: "1993年清拆前最後的照片，記錄獨特社區生活",
                image: "📷", 
                story: "照片背面寫着：『最後的牙醫診所，服務社區三十年』"
            },
            
            historicalContext: {
                period: "1947-1994年",
                significance: "獨特的三不管地帶社區",
                impact: "1994年清拆，1995年改建公園"
            },
            
            nextMission: "mission4.html",
            coordinates: "22.3320° N, 114.1895° E"
        },
        {
            id: 4,
            location: "九龍城泰國社區",
            title: "🍜 小泰國的誕生",
            description: "九龍城是香港泰國社區的中心，這裡的發展與啟德機場歷史緊密相連。從泰籍空勤人員聚居地發展成文化美食地標。",
            task: "探索泰式商店，了解文化融合與社區多元性",
            estimatedTime: "55分鐘",
            
            arConfig: {
                triggerObject: "泰式餐廳招牌",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-night-market-with-food-stalls-1088-large.mp4",
                scanTime: 6,
                correctPassword: "啟德機場",
                arEffect: "1970年代街市重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false, 
                collectedItem: false
            },
            
            collectible: {
                name: "泰式食譜",
                description: "第一代泰國移民的傳統食譜手稿",
                image: "📜",
                story: "食譜邊緣註明：『用香港食材做出家鄉味道』"
            },
            
            historicalContext: {
                period: "1970年代至今",
                significance: "國際化社區形成的典範", 
                impact: "文化多元共融，美食地標"
            },
            
            nextMission: "mission5.html",
            coordinates: "22.3302° N, 114.1913° E"
        },
        {
            id: 5,
            location: "紅磡觀音廟",
            title: "🙏 漁民信仰中心",
            description: "紅磡觀音廟建於清朝同治年間，見證了紅磡從漁港到現代市區的完整轉變。這裡曾是漁民出海前祈福的重要場所。",
            task: "了解觀音廟建築特色，思考信仰在社區變遷中的角色",
            estimatedTime: "40分鐘",
            
            arConfig: {
                triggerObject: "觀音廟正門",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-historical-temple-entrance-1131-large.mp4",
                scanTime: 5,
                correctPassword: "清朝同治",
                arEffect: "清代漁港重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "祈福木牌",
                description: "1950年代漁民留下的祈福木牌",
                image: "🪵",
                story: "木牌上刻着：『風調雨順，滿載而歸』"
            },
            
            historicalContext: {
                period: "清朝至今",
                significance: "漁民信仰與社區凝聚象徵",
                impact: "從漁港信仰中心到市區文化遺產"
            },
            
            nextMission: "mission6.html", 
            coordinates: "22.3095° N, 114.1895° E"
        },
        {
            id: 6,
            location: "土瓜灣牛棚藝術村",
            title: "🎨 工業遺產再生",
            description: "前身為1908年建成的牛隻檢疫站，見證香港屠宰業歷史。現在轉型為藝術村，展現工業遺產的創意重生。",
            task: "探索紅磚建築，了解工業遺址的文化轉型",
            estimatedTime: "50分鐘",
            
            arConfig: {
                triggerObject: "紅磚拱門",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-architectural-details-of-a-historical-building-1130-large.mp4",
                scanTime: 7,
                correctPassword: "牛隻檢疫",
                arEffect: "1908年牛棚運作重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "建築磚塊",
                description: "1908年原始紅磚，刻有當時標記",
                image: "🧱",
                story: "磚塊側面印着『香港政府 1908』字樣"
            },
            
            historicalContext: {
                period: "1908年至今",
                significance: "香港早期現代化設施遺址",
                impact: "工業遺產創意再利用典範"
            },
            
            nextMission: "mission7.html",
            coordinates: "22.3190° N, 114.1898° E"
        },
        {
            id: 7, 
            location: "九龍城碼頭",
            title: "⛵ 渡輪時代記憶",
            description: "曾經是連接九龍城與港島的重要渡輪碼頭，見證了海上交通的繁華時代。隨著隧道通車，渡輪服務逐漸式微。",
            task: "尋找碼頭遺跡，了解海上交通對社區發展的影響",
            estimatedTime: "45分鐘",
            
            arConfig: {
                triggerObject: "碼頭石壆",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-ferry-approaching-the-pier-1132-large.mp4",
                scanTime: 8,
                correctPassword: "渡輪服務",
                arEffect: "1960年代碼頭繁忙景象"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "船票存根",
                description: "1975年九龍城至北角渡輪船票",
                image: "🎫",
                story: "票根背面寫着：『最後一班渡輪，1984.6.30』"
            },
            
            historicalContext: {
                period: "1950-1980年代",
                significance: "維港两岸重要交通樞紐",
                impact: "海底隧道通車導致渡輪式微"
            },
            
            nextMission: "mission8.html",
            coordinates: "22.3250° N, 114.1910° E"
        },
        {
            id: 8,
            location: "九龍城廣場",
            title: "🏬 社區商業演變",
            description: "從傳統街市到現代商場，見證九龍城區商業模式的轉變。這裡融合了老字號與新商鋪，展現社區的延續與創新。",
            task: "對比新舊商業模式，思考社區經濟的發展軌跡",
            estimatedTime: "55分鐘",
            
            arConfig: {
                triggerObject: "商場中庭",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-shopping-mall-interior-1133-large.mp4", 
                scanTime: 6,
                correctPassword: "商業轉型",
                arEffect: "1980年代街市重現"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "商場藍圖",
                description: "1990年代商場規劃設計圖",
                image: "🏢",
                story: "設計師註解：『保留社區記憶，創造現代空間』"
            },
            
            historicalContext: {
                period: "1990年代至今",
                significance: "社區商業現代化轉型代表",
                impact: "新舊融合的社區商業模式"
            },
            
            nextMission: "complete.html",
            coordinates: "22.3325° N, 114.1920° E"
        }
    ]
};

// 🔑 所有關卡密碼列表 (測試用)
const MISSION_PASSWORDS = {
    1: "填海工程",
    2: "戰後重建", 
    3: "九龍寨城",
    4: "啟德機場",
    5: "清朝同治",
    6: "牛隻檢疫",
    7: "渡輪服務",
    8: "商業轉型"
};

// 🎯 AR測試配置
const AR_TEST_CONFIG = {
    // 測試模式 - 可切換真實AR或模擬模式
    testMode: true,
    
    // AR效果類型
    effects: {
        "海岸線重現": {
            description: "重現1960年代海岸線景象",
            testMethod: "點擊AR按鈕後等待8秒掃描"
        },
        "1950年代街景重現": {
            description: "顯示戰後時期的街道景象", 
            testMethod: "掃描唐樓騎樓結構"
        },
        "寨城巷道重現": {
            description: "重現密集建築中的狹窄巷道",
            testMethod: "在衙門遺址位置觸發"
        },
        "1970年代街市重現": {
            description: "顯示早期泰國社區街市",
            testMethod: "掃描泰文招牌元素"
        }
    },
    
    // 模擬AR觸發方法
    simulateAR: function(missionId) {
        const mission = GAME_DATA.missions[missionId];
        console.log(`🎬 模擬AR觸發: ${mission.arConfig.arEffect}`);
        
        // 顯示模擬AR效果
        const arContainer = document.getElementById('arVideoContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div style="background: #000; color: white; padding: 2rem; border-radius: 10px; text-align: center;">
                    <h4>🧪 AR測試模式</h4>
                    <p>效果: <strong>${mission.arConfig.arEffect}</strong></p>
                    <p>${mission.arConfig.triggerObject} 識別成功！</p>
                    <div style="background: #1f2937; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p>🎥 正在播放歷史影片...</p>
                        <video controls style="width: 100%; max-width: 300px; border-radius: 5px;">
                            <source src="${mission.arConfig.videoUrl}" type="video/mp4">
                        </video>
                    </div>
                    <button onclick="AR_TEST_CONFIG.completeARTest(${missionId})" 
                            style="background: var(--accent); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        完成AR體驗
                    </button>
                </div>
            `;
            
            // 自動播放影片
            const video = arContainer.querySelector('video');
            video.play().catch(e => console.log('影片自動播放被阻止，需要手動播放'));
        }
    },
    
    completeARTest: function(missionId) {
        const mission = GAME_DATA.missions[missionId];
        mission.requirements.watchVideo = true;
        mission.requirements.collectedItem = true;
        
        // 添加收集物品
        addCollectibleItem(mission.collectible);
        
        // 更新界面
        updateARC
