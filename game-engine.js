// =============================================
// 九龍記憶庫 - 遊戲引擎
// 完整的任務系統、AR觸發、密碼驗證
// =============================================

// 🎯 遊戲數據配置
const GAME_CONFIG = {
    currentMission: 0,
    userProgress: {},
    missionRequirements: {}
};

// 🗺️ 完整的任務數據
const GAME_DATA = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶",
            description: "您現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。1960年代填海前，這裡是漁船停泊的碼頭。",
            task: "拍攝鯨魚石與現代建築的對比照片，了解填海歷史",
            
            // AR配置
            arConfig: {
                triggerObject: "鯨魚石",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1095-large.mp4",
                scanTime: 5, // 模擬掃描時間(秒)
                correctPassword: "填海工程"
            },
            
            // 任務要求
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            // 收集物品
            collectible: {
                name: "老漁民日記",
                description: "記錄了1960年代海邊生活的珍貴文獻",
                image: "📖"
            },
            
            nextMission: "mission2.html",
            coordinates: "22.3165° N, 114.1905° E"
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群",
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展和人口急增。",
            task: "觀察唐樓建築特色，了解戰後移民歷史",
            
            arConfig: {
                triggerObject: "唐樓騎樓",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-vintage-building-facade-1129-large.mp4",
                scanTime: 6,
                correctPassword: "戰後重建"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "建築藍圖",
                description: "1950年代唐樓的原始設計圖",
                image: "📐"
            },
            
            nextMission: "mission3.html",
            coordinates: "22.3178° N, 114.1892° E"
        },
        {
            id: 3,
            location: "九龍寨城公園",
            title: "🏯 三不管地帶的記憶", 
            description: "這裡曾經是著名的九龍寨城 - 世界上人口最密集的地方。1994年清拆後改建為公園。",
            task: "尋找歷史遺跡，了解寨城的獨特社區生態",
            
            arConfig: {
                triggerObject: "衙門遺址",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-old-city-street-with-buildings-1127-large.mp4",
                scanTime: 7,
                correctPassword: "九龍寨城"
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false, 
                collectedItem: false
            },
            
            collectible: {
                name: "寨城照片",
                description: "1993年清拆前的珍貴照片",
                image: "📷"
            },
            
            nextMission: "mission4.html",
            coordinates: "22.3320° N, 114.1895° E"
        }
    ]
};

// 🎮 遊戲狀態管理
let gameState = {
    currentMissionIndex: 0,
    completedMissions: [],
    collectedItems: [],
    userStats: {
        startTime: null,
        totalPlayTime: 0,
        correctAnswers: 0
    }
};

// 🚀 初始化遊戲進度
function loadGameProgress() {
    const savedProgress = localStorage.getItem('kowloonGameProgress');
    const currentUser = localStorage.getItem('currentUser');
    
    if (savedProgress && currentUser) {
        const userData = JSON.parse(currentUser);
        const allProgress = JSON.parse(savedProgress);
        
        // 加載該用戶的進度
        if (allProgress[userData.username]) {
            gameState = allProgress[userData.username];
            GAME_CONFIG.currentMission = gameState.currentMissionIndex;
        }
    } else {
        // 新遊戲
        gameState.userStats.startTime = new Date();
        GAME_CONFIG.currentMission = 0;
    }
    
    loadCurrentMission();
}

// 📍 加載當前任務
function loadCurrentMission() {
    const mission = GAME_DATA.missions[GAME_CONFIG.currentMission];
    if (!mission) {
        completeGame();
        return;
    }
    
    // 更新界面
    document.getElementById('missionTitle').textContent = mission.title;
    document.getElementById('missionDescription').textContent = mission.description;
    document.getElementById('missionProgress').textContent = `第 ${GAME_CONFIG.currentMission + 1} 關 / 共 ${GAME_DATA.missions.length} 關`;
    document.getElementById('taskDescription').textContent = mission.task;
    document.getElementById('nextMissionName').textContent = GAME_DATA.missions[GAME_CONFIG.currentMission + 1]?.location || '完成';
    
    // 重置任務要求
    resetMissionRequirements();
    
    // 更新AR區域
    updateARSection(mission);
    
    // 更新庫存顯示
    updateInventory();
    
    // 隱藏QR碼區域
    document.getElementById('qrSection').style.display = 'none';
    
    // 禁用完成按鈕
    document.getElementById('completeButton').disabled = true;
    document.getElementById('completionHint').style.display = 'block';
}

// 🎬 更新AR區域
function updateARSection(mission) {
    const arTriggerArea = document.getElementById('arTriggerArea');
    const arVideoContainer = document.getElementById('arVideoContainer');
    
    arTriggerArea.innerHTML = `
        <h4>🔍 掃描目標：${mission.arConfig.triggerObject}</h4>
        <p>將相機對準${mission.arConfig.triggerObject}，保持穩定${mission.arConfig.scanTime}秒</p>
        <button onclick="startARScan(${GAME_CONFIG.currentMission})" class="action-button">
            <i class="fas fa-camera"></i> 啟動AR掃描
        </button>
        <div id="scanProgress" style="margin-top: 1rem; display: none;">
            <div style="background: #374151; height: 4px; border-radius: 2px; overflow: hidden;">
                <div id="scanProgressBar" style="background: var(--accent); height: 100%; width: 0%; transition: width 0.1s;"></div>
            </div>
            <p style="margin-top: 0.5rem; color: #93c5fd;">
                <i class="fas fa-sync fa-spin"></i> 掃描中... <span id="scanTime">${mission.arConfig.scanTime}</span>秒
            </p>
        </div>
    `;
    
    arVideoContainer.style.display = 'none';
}

// 📹 啟動AR掃描
function startARScan(missionIndex) {
    const mission = GAME_DATA.missions[missionIndex];
    const scanProgress = document.getElementById('scanProgress');
    const scanProgressBar = document.getElementById('scanProgressBar');
    const scanTimeElement = document.getElementById('scanTime');
    
    // 顯示掃描進度
    scanProgress.style.display = 'block';
    
    let timeLeft = mission.arConfig.scanTime;
    const scanInterval = setInterval(() => {
        timeLeft--;
        scanTimeElement.textContent = timeLeft;
        
        const progress = ((mission.arConfig.scanTime - timeLeft) / mission.arConfig.scanTime) * 100;
        scanProgressBar.style.width = progress + '%';
        
        if (timeLeft <= 0) {
            clearInterval(scanInterval);
            onARScanComplete(missionIndex);
        }
    }, 1000);
}

// ✅ AR掃描完成
function onARScanComplete(missionIndex) {
    const mission = GAME_DATA.missions[missionIndex];
    const arTriggerArea = document.getElementById('arTriggerArea');
    const arVideoContainer = document.getElementById('arVideoContainer');
    const videoElement = document.getElementById('historyVideo');
    
    // 隱藏掃描區域，顯示影片
    arTriggerArea.style.display = 'none';
    arVideoContainer.style.display = 'block';
    
    // 設置影片源
    videoElement.src = mission.arConfig.videoUrl;
    
    // 開始播放影片
    videoElement.play().then(() => {
        console.log('🎬 開始播放歷史影片');
    }).catch(error => {
        console.log('❌ 影片播放失敗:', error);
        // 模擬影片播放完成
        setTimeout(onVideoComplete, 3000);
    });
    
    // 監聽影片結束
    videoElement.onended = onVideoComplete;
    
    function onVideoComplete() {
        // 標記影片觀看完成
        mission.requirements.watchVideo = true;
        
        // 解鎖收集物品
        mission.requirements.collectedItem = true;
        addCollectibleItem(mission.collectible);
        
        // 顯示提示
        arVideoContainer.innerHTML += `
            <div style="background: var(--success); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <h5><i class="fas fa-check"></i> AR探索完成！</h5>
                <p>已獲得物品：<strong>${mission.collectible.name}</strong></p>
                <p>現在請回答歷史問題來完成任務</p>
            </div>
        `;
        
        checkMissionCompletion();
    }
}

// 🔑 檢查密碼答案
function checkPassword() {
    const mission = GAME_DATA.missions[GAME_CONFIG.currentMission];
    const passwordInput = document.getElementById('missionPassword');
    const userAnswer = passwordInput.value.trim();
    
    if (userAnswer === mission.arConfig.correctPassword) {
        // 答案正確
        mission.requirements.correctAnswer = true;
        
        // 顯示成功訊息
        const passwordSection = document.querySelector('.password-input');
        passwordSection.innerHTML = `
            <div style="background: var(--success); color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <h5><i class="fas fa-check-circle"></i> 答案正確！</h5>
                <p>您已成功解開歷史之謎</p>
            </div>
        `;
        
        gameState.userStats.correctAnswers++;
        checkMissionCompletion();
        
    } else {
        // 答案錯誤
        alert('❌ 答案不正確！請仔細觀看AR影片中的線索。');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// ✅ 檢查任務完成狀態
function checkMissionCompletion() {
    const mission = GAME_DATA.missions[GAME_CONFIG.currentMission];
    const completeButton = document.getElementById('completeButton');
    const completionHint = document.getElementById('completionHint');
    
    const allCompleted = Object.values(mission.requirements).every(req => req === true);
    
    if (allCompleted) {
        completeButton.disabled = false;
        completionHint.innerHTML = '<span style="color: var(--success);">✅ 所有任務要求已完成！現在可以完成任務。</span>';
    } else {
        const missingRequirements = [];
        if (!mission.requirements.watchVideo) missingRequirements.push('觀看AR影片');
        if (!mission.requirements.correctAnswer) missingRequirements.push('回答歷史問題');
        if (!mission.requirements.collectedItem) missingRequirements.push('收集物品');
        
        completionHint.innerHTML = `⚠️ 仍需完成: ${missingRequirements.join(', ')}`;
    }
}

// 🏁 完成當前任務
function completeMission() {
    const mission = GAME_DATA.missions[GAME_CONFIG.currentMission];
    
    // 添加到完成列表
    gameState.completedMissions.push(mission.id);
    gameState.currentMissionIndex = GAME_CONFIG.currentMission + 1;
    
    // 顯示完成動畫
    showCompletionAnimation();
    
    // 生成QR碼
    generateQRCode(mission.nextMission);
    
    // 顯示QR碼區域
    setTimeout(() => {
        document.getElementById('qrSection').style.display = 'block';
        saveGameProgress();
    }, 2000);
}

// 🎉 顯示完成動畫
function showCompletionAnimation() {
    const completionDiv = document.createElement('div');
    completionDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    completionDiv.innerHTML = `
        <div style="background: white; padding: 3rem; border-radius: 20px; text-align: center; animation: popIn 0.5s ease-out;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: var(--success); margin-bottom: 1rem;">任務完成！</h2>
            <p>恭喜您解鎖了 ${GAME_DATA.missions[GAME_CONFIG.currentMission].location} 的歷史秘密</p>
            <div style="margin-top: 2rem; font-size: 0.9rem; color: #6b7280;">
                獲得物品: ${GAME_DATA.missions[GAME_CONFIG.currentMission].collectible.name}
            </div>
        </div>
    `;
    
    document.body.appendChild(completionDiv);
    
    setTimeout(() => {
        completionDiv.remove();
    }, 3000);
}

// 🔄 加載下一關
function loadNextMission() {
    GAME_CONFIG.currentMission++;
    
    if (GAME_CONFIG.currentMission >= GAME_DATA.missions.length) {
        completeGame();
    } else {
        loadCurrentMission();
        
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 🏆 完成整個遊戲
function completeGame() {
    const gameContent = document.querySelector('.game-container');
    gameContent.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
            <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); 
                        padding: 3rem; border-radius: 20px; border: 5px solid #f59e0b; 
                        margin-bottom: 2rem;">
                <h1 style="color: #2d3436; margin-bottom: 1rem;">🏆 探索完成！</h1>
                <h2 style="color: #2d3436;">九龍記憶庫大師探索者</h2>
            </div>
            
            <div style="background: white; padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <h3>探索成就總結</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem;">${gameState.completedMissions.length}</div>
                        <div>完成關卡</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem;">${gameState.collectedItems.length}</div>
                        <div>收集物品</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem;">${gameState.userStats.correctAnswers}</div>
                        <div>正確答案</div>
                    </div>
                </div>
            </div>
            
            <button onclick="restartGame()" class="action-button">
                <i class="fas fa-redo"></i> 重新開始遊戲
            </button>
        </div>
    `;
}

// 📦 添加收集物品
function addCollectibleItem(item) {
    if (!gameState.collectedItems.shenzhen(collected => collected.name === item.name)) {
        gameState.collectedItems.push(item);
        updateInventory();
    }
}

// 🎒 更新庫存顯示
function updateInventory() {
    const inventoryItems = document.getElementById('inventoryItems');
    inventoryItems.innerHTML = '';
    
    gameState.collectedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${item.image}</div>
            <div style="font-weight: bold; font-size: 0.9rem;">${item.name}</div>
        `;
        itemElement.title = item.description;
        inventoryItems.appendChild(itemElement);
    });
}

// 🔄 重置任務要求
function resetMissionRequirements() {
    const mission = GAME_DATA.missions[GAME_CONFIG.currentMission];
    if (mission) {
        mission.requirements = {
            watchVideo: false,
            correctAnswer: false,
            collectedItem: false
        };
    }
}

// 💾 保存遊戲進度
function saveGameProgress() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const userData = JSON.parse(currentUser);
    let allProgress = JSON.parse(localStorage.getItem('kowloonGameProgress') || '{}');
    
    allProgress[userData.username] = gameState;
    localStorage.setItem('kowloonGameProgress', JSON.stringify(allProgress));
}

// 🔄 重新開始遊戲
function restartGame() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        let allProgress = JSON.parse(localStorage.getItem('kowloonGameProgress') || '{}');
        delete allProgress[userData.username];
        localStorage.setItem('kowloonGameProgress', JSON.stringify(allProgress));
    }
    
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// 📱 生成QR碼
function generateQRCode(url) {
    const qrContainer = document.getElementById('qrCode');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    
    qrContainer.innerHTML = `
        <img src="${qrUrl}" 
             alt="QR Code" 
             style="width: 100%; height: 100%; border-radius: 5px;"
             onerror="this.onerror=null; this.src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(url)}&choe=UTF-8'">
    `;
}
