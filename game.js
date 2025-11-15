// =============================================
// 九龍記憶庫 - 遊戲核心邏輯
// 簡化版本，專注於AR場景管理和遊戲流程
// =============================================

// 🎯 遊戲配置
const GAME_CONFIG = {
    // AR場景配置 - 可輕鬆更換認證方法
    AR_SCENES: {
        METHOD: 'qr', // 可更換為: 'qr', 'gps', 'image', 'nfc'
        TYPES: {
            QR: 'qr',           // QR碼掃描
            GPS: 'gps',         // 地理位置
            IMAGE: 'image',     // 圖像識別
            MARKER: 'marker'    // AR標記
        }
    },
    
    // 密碼生成配置
    PASSWORD: {
        METHOD: 'dynamic', // 'dynamic' 或 'fixed'
        FIXED_CODE: '8888', // 固定密碼
        LENGTH: 4
    },
    
    // 遊戲設定
    SETTINGS: {
        AUTO_ADVANCE: true,
        ENABLE_SOUND: true,
        COLLECT_ANALYTICS: true
    }
};

// 🗺️ 遊戲數據 - 可輕鬆更換AR場景
const GAME_DATA = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶",
            description: "你現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。1960年代填海前，這裡是漁船停泊的碼頭。",
            task: "📸 任務：拍攝鯨魚石與現代建築的對比照片",
            
            // 🔧 AR場景配置 - 可輕鬆更換
            arConfig: {
                type: GAME_CONFIG.AR_SCENES.TYPES.QR,
                trigger: "mission2.html", // QR碼內容
                coordinates: { lat: 22.3165, lng: 114.1905 }, // GPS座標
                markerImage: "pattern-whale.png", // 圖像標記
                content: `
                    <div class="ar-overlay">
                        <h3>🏗️ 土瓜灣填海歷史</h3>
                        <p>1960年代，土瓜灣進行大規模填海工程，海岸線向北推移了近500米。</p>
                        <div class="ar-media">
                            <img src="historical/whale_rock_old.jpg" alt="歷史照片">
                        </div>
                    </div>
                `
            },
            
            historicalFacts: [
                "海心公園原為海中心的小島，名為『海心島'",
                "1960年代填海後與陸地連接成為公園", 
                "見證了香港工業化時期的發展和轉型"
            ]
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群", 
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展。",
            task: "🎯 任務：觀察唐樓建築特色，記錄不同樓宇的年份",
            
            arConfig: {
                type: GAME_CONFIG.AR_SCENES.TYPES.QR,
                trigger: "mission3.html",
                coordinates: { lat: 22.3178, lng: 114.1892 },
                content: `
                    <div class="ar-overlay">
                        <h3>📅 十三街歷史</h3>
                        <p>土瓜灣十三街建於1950-60年代，是典型的戰後唐樓群。</p>
                    </div>
                `
            },
            
            historicalFacts: [
                "建於1950-60年代戰後重建時期",
                "見證香港工業化與人口急劇增長", 
                "反映當時的建築風格與生活模式"
            ]
        }
        // 可以繼續添加更多關卡...
    ]
};

// 🎮 遊戲狀態管理
let gameState = {
    currentMission: 0,
    playerName: "",
    playerEmail: "",
    planType: "",
    completedMissions: [],
    startTime: null,
    collectedItems: []
};

// 🔑 密碼生成系統
const PasswordSystem = {
    // 生成動態密碼
    generateDynamic: function(teamName) {
        const teamCodes = {
            '測試隊伍': '2024',
            '九龍記憶': '8888'
        };
        
        if (teamCodes[teamName]) {
            return teamCodes[teamName];
        }
        
        // 基於隊伍名稱生成
        let code = '';
        for (let i = 0; i < teamName.length && code.length < 4; i++) {
            const charCode = teamName.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) {
                code += teamName[i];
            }
        }
        
        while (code.length < 4) {
            code += Math.floor(Math.random() * 10);
        }
        
        return code.substring(0, 4);
    },
    
    // 獲取密碼
    getPassword: function(teamName) {
        if (GAME_CONFIG.PASSWORD.METHOD === 'fixed') {
            return GAME_CONFIG.PASSWORD.FIXED_CODE;
        } else {
            return this.generateDynamic(teamName);
        }
    }
};

// 🎯 AR場景管理系統
const ARSceneManager = {
    // 初始化AR場景
    init: function() {
        console.log('🎮 初始化AR場景管理器');
        this.setupEventListeners();
    },
    
    // 設置事件監聽
    setupEventListeners: function() {
        // 相機權限請求
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('ar-start-btn')) {
                ARSceneManager.requestCameraPermission();
            }
        });
    },
    
    // 請求相機權限
    requestCameraPermission: function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    console.log('✅ 相機權限獲取成功');
                    ARSceneManager.startARCamera();
                })
                .catch(function(error) {
                    console.log('❌ 相機權限獲取失敗:', error);
                    ARSceneManager.showARFallback();
                });
        } else {
            ARSceneManager.showARFallback();
        }
    },
    
    // 啟動AR相機
    startARCamera: function() {
        const arContainer = document.getElementById('arContainer');
        if (!arContainer) return;
        
        arContainer.innerHTML = `
            <div class="ar-camera-view">
                <video id="arVideo" autoplay playsinline></video>
                <div class="ar-overlay-content" id="arOverlay"></div>
                <div class="ar-controls">
                    <button onclick="ARSceneManager.stopARCamera()" class="ar-btn">
                        <i class="fas fa-times"></i> 關閉AR
                    </button>
                </div>
            </div>
        `;
        
        // 這裡可以接入真正的AR庫，如AR.js、A-Frame等
        console.log('📷 啟動AR相機視圖');
    },
    
    // 停止AR相機
    stopARCamera: function() {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = '';
        }
    },
    
    // AR備用方案
    showARFallback: function() {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div class="ar-fallback">
                    <div class="fallback-content">
                        <i class="fas fa-camera-slash" style="font-size: 3rem; color: #6b7280; margin-bottom: 1rem;"></i>
                        <h3>AR模式不可用</h3>
                        <p>無法訪問相機功能，顯示歷史資訊版本。</p>
                        <button onclick="ARSceneManager.showHistoricalContent()" class="pricing-button">
                            查看歷史內容
                        </button>
                    </div>
                </div>
            `;
        }
    },
    
    // 顯示歷史內容
    showHistoricalContent: function() {
        const currentMission = GAME_DATA.missions[gameState.currentMission];
        const arContainer = document.getElementById('arContainer');
        
        if (arContainer && currentMission) {
            arContainer.innerHTML = `
                <div class="historical-content">
                    <h3>📚 歷史資訊</h3>
                    <div class="historical-text">
                        ${currentMission.arConfig.content || '<p>此地點的歷史資訊將在這裡顯示。</p>'}
                    </div>
                    <div class="historical-facts">
                        <h4>歷史知識點</h4>
                        ${currentMission.historicalFacts.map(fact => 
                            `<div class="fact-item">📌 ${fact}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    },
    
    // 加載AR場景
    loadScene: function(missionId) {
        const mission = GAME_DATA.missions[missionId];
        if (!mission) return;
        
        console.log(`🎯 加載AR場景: ${mission.location}`);
        
        // 根據配置類型加載不同的AR場景
        switch(mission.arConfig.type) {
            case GAME_CONFIG.AR_SCENES.TYPES.QR:
                this.loadQRScene(mission);
                break;
            case GAME_CONFIG.AR_SCENES.TYPES.GPS:
                this.loadGPSScene(mission);
                break;
            case GAME_CONFIG.AR_SCENES.TYPES.IMAGE:
                this.loadImageScene(mission);
                break;
            default:
                this.loadDefaultScene(mission);
        }
    },
    
    // 加載QR碼場景
    loadQRScene: function(mission) {
        this.generateQRCode(mission.arConfig.trigger);
        this.showHistoricalContent(); // 同時顯示歷史內容
    },
    
    // 加載GPS場景
    loadGPSScene: function(mission) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    const targetPos = mission.arConfig.coordinates;
                    
                    // 計算距離（簡化版本）
                    const distance = ARSceneManager.calculateDistance(userPos, targetPos);
                    
                    if (distance < 0.1) { // 100米範圍內
                        ARSceneManager.showARContent(mission);
                    } else {
                        ARSceneManager.showDistanceHint(distance);
                    }
                },
                function(error) {
                    console.log('GPS錯誤:', error);
                    ARSceneManager.showHistoricalContent();
                }
            );
        } else {
            ARSceneManager.showHistoricalContent();
        }
    },
    
    // 計算距離
    calculateDistance: function(pos1, pos2) {
        const R = 6371; // 地球半徑(公里)
        const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
        const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },
    
    // 顯示距離提示
    showDistanceHint: function(distance) {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div class="distance-hint">
                    <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h3>尚未到達目的地</h3>
                    <p>您距離目標地點還有 ${distance.toFixed(2)} 公里</p>
                    <p>請繼續前往指定位置解鎖AR內容</p>
                </div>
            `;
        }
    },
    
    // 生成QR碼
    generateQRCode: function(data) {
        const qrContainer = document.getElementById('qrCode');
        if (!qrContainer) return;
        
        const qrUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(data)}&choe=UTF-8`;
        qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code" style="width: 100%; height: 100%; border-radius: 5px;">`;
    }
};

// 🎮 遊戲核心功能
const GameEngine = {
    // 初始化遊戲
    init: function(playerName, playerEmail, planType) {
        gameState = {
            currentMission: 0,
            playerName: playerName,
            playerEmail: playerEmail,
            planType: planType,
            completedMissions: [],
            startTime: new Date(),
            collectedItems: []
        };
        
        console.log('🎮 遊戲初始化完成');
        this.saveGameState();
        this.loadMission(0);
    },
    
    // 加載任務
    loadMission: function(missionIndex) {
        if (missionIndex >= GAME_DATA.missions.length) {
            this.completeGame();
            return;
        }
        
        gameState.currentMission = missionIndex;
        const mission = GAME_DATA.missions[missionIndex];
        
        // 更新遊戲界面
        this.updateGameUI(mission);
        
        // 加載AR場景
        ARSceneManager.loadScene(missionIndex);
        
        this.saveGameState();
    },
    
    // 更新遊戲界面
    updateGameUI: function(mission) {
        const gameContent = document.getElementById('gameContent');
        if (!gameContent) return;
        
        gameContent.innerHTML = `
            <div class="section-header">
                <h2>${mission.location}</h2>
                <p>第 ${gameState.currentMission + 1} 關 / 共 ${GAME_DATA.missions.length} 關</p>
            </div>
            
            <div class="mission-card">
                <h3>${mission.title}</h3>
                <p>${mission.description}</p>
                
                <div style="background: #e3f2fd; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                    <h4>📝 任務說明</h4>
                    <p>${mission.task}</p>
                </div>
                
                <div id="arContainer" style="margin: 1rem 0;">
                    <!-- AR內容將在這裡顯示 -->
                </div>
            </div>
            
            <div class="qr-container">
                <h4>📱 掃描QR碼繼續</h4>
                <div class="qr-code" id="qrCode">
                    <!-- QR碼將動態生成 -->
                </div>
                <p style="color: #6b7280; margin-top: 1rem;">掃描此QR碼獲取下一關提示</p>
            </div>
            
            <button class="pricing-button" onclick="GameEngine.completeCurrentMission()" style="margin-top: 1rem;">
                <i class="fas fa-check"></i> 完成任務
            </button>
            
            <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <button class="pricing-button" onclick="GameEngine.showProgress()" style="background: #6b7280;">
                    <i class="fas fa-chart-bar"></i> 進度
                </button>
                <button class="pricing-button" onclick="GameEngine.switchARMethod()" style="background: #7c3aed;">
                    <i class="fas fa-sync"></i> 切換模式
                </button>
            </div>
        `;
    },
    
    // 完成當前任務
    completeCurrentMission: function() {
        const currentMission = GAME_DATA.missions[gameState.currentMission];
        gameState.completedMissions.push(currentMission.id);
        
        // 顯示完成動畫
        this.showCompletionAnimation();
        
        // 加載下一關
        setTimeout(() => {
            this.loadMission(gameState.currentMission + 1);
        }, 2000);
    },
    
    // 顯示完成動畫
    showCompletionAnimation: function() {
        const completionDiv = document.createElement('div');
        completionDiv.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0,0,0,0.8); z-index: 10000; display: flex; 
                        align-items: center; justify-content: center;">
                <div style="background: white; padding: 3rem; border-radius: 20px; text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                    <h2 style="color: #10b981;">任務完成！</h2>
                    <p>已解鎖下一關卡</p>
                </div>
            </div>
        `;
        document.body.appendChild(completionDiv);
        
        setTimeout(() => {
            completionDiv.remove();
        }, 2000);
    },
    
    // 完成遊戲
    completeGame: function() {
        const gameContent = document.getElementById('gameContent');
        if (gameContent) {
            gameContent.innerHTML = `
                <div class="section-header">
                    <h2>🏆 探索完成！</h2>
                    <p>恭喜您完成了九龍記憶庫的所有挑戰</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); 
                            padding: 3rem; border-radius: 20px; text-align: center; 
                            border: 5px solid #f59e0b; margin: 2rem 0;">
                    <h3>九龍記憶庫探索證書</h3>
                    <p>頒發給：<strong>${gameState.playerName}</strong></p>
                    <p>完成時間：${new Date().toLocaleString('zh-HK')}</p>
                    <p>探索地點：${gameState.completedMissions.length} 個歷史地標</p>
                </div>
                
                <button class="pricing-button" onclick="GameEngine.shareCertificate()">
                    <i class="fas fa-share-alt"></i> 分享成就
                </button>
                
                <button class="pricing-button" onclick="GameEngine.restartGame()" style="background: #6b7280; margin-left: 1rem;">
                    <i class="fas fa-redo"></i> 重新開始
                </button>
            `;
        }
    },
    
    // 顯示進度
    showProgress: function() {
        const progress = (gameState.completedMissions.length / GAME_DATA.missions.length) * 100;
        alert(`📊 您的探索進度：\n\n• 完成關卡：${gameState.completedMissions.length}/${GAME_DATA.missions.length}\n• 進度：${progress.toFixed(0)}%\n• 開始時間：${gameState.startTime.toLocaleString('zh-HK')}`);
    },
    
    // 切換AR方法
    switchARMethod: function() {
        const methods = Object.values(GAME_CONFIG.AR_SCENES.TYPES);
        const currentIndex = methods.indexOf(GAME_CONFIG.AR_SCENES.METHOD);
        const nextIndex = (currentIndex + 1) % methods.length;
        
        GAME_CONFIG.AR_SCENES.METHOD = methods[nextIndex];
        alert(`已切換到 ${GAME_CONFIG.AR_SCENES.METHOD.toUpperCase()} 模式`);
        
        // 重新加載當前場景
        ARSceneManager.loadScene(gameState.currentMission);
    },
    
    // 分享證書
    shareCertificate: function() {
        const text = `我剛剛完成了「九龍記憶庫」AR歷史解謎之旅！探索了${gameState.completedMissions.length}個歷史地點，成為真正的九龍探索者！🏙️`;
        
        if (navigator.share) {
            navigator.share({
                title: '九龍記憶庫探索證書',
                text: text
            });
        } else {
            navigator.clipboard.writeText(text);
            alert('證書內容已複製到剪貼簿！');
        }
    },
    
    // 重新開始遊戲
    restartGame: function() {
        if (confirm('確定要重新開始遊戲嗎？所有進度將會丟失。')) {
            localStorage.removeItem('kowloon_game_state');
            window.location.reload();
        }
    },
    
    // 保存遊戲狀態
    saveGameState: function() {
        localStorage.setItem('kowloon_game_state', JSON.stringify(gameState));
    },
    
    // 加載遊戲狀態
    loadGameState: function() {
        const saved = localStorage.getItem('kowloon_game_state');
        if (saved) {
            gameState = JSON.parse(saved);
            return true;
        }
        return false;
    }
};

// 🚀 初始化遊戲
function initGame(playerEmail) {
    // 從本地存儲加載用戶數據
    const userData = JSON.parse(localStorage.getItem('kowloon_user_data') || '{}');
    
    // 初始化AR系統
    ARSceneManager.init();
    
    // 開始遊戲
    GameEngine.init(
        userData.name || '探索者',
        playerEmail,
        userData.planType || 'standard'
    );
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 九龍記憶庫遊戲系統已加載');
    
    // 檢查是否有保存的遊戲狀態
    if (GameEngine.loadGameState()) {
        console.log('🔄 加載保存的遊戲狀態');
        GameEngine.loadMission(gameState.currentMission);
    }
});
