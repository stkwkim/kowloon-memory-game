const GAME_DATA = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶", 
            description: "您現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。1960年代填海前，這裡是漁船停泊的碼頭。",
            task: "了解填海歷史對社區的影響",
            estimatedTime: "45分鐘",
            
            arConfig: {
                triggerObject: "鯨魚石",
                correctPassword: "FILLSEA1965",
                scanTime: 8
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "老漁民日記",
                description: "記錄了1960年代海邊生活的珍貴文獻",
                image: "📖"
            },
            
            nextMission: "mission2.html"
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群",
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展。",
            task: "觀察唐樓建築特色，了解戰後移民歷史",
            estimatedTime: "50分鐘",
            
            arConfig: {
                triggerObject: "唐樓騎樓", 
                correctPassword: "POSTWAR1958",
                scanTime: 7
            },
            
            requirements: {
                watchVideo: false,
                correctAnswer: false,
                collectedItem: false
            },
            
            collectible: {
                name: "建築藍圖",
                description: "1958年唐樓的原始設計圖",
                image: "📐"
            },
            
            nextMission: "mission3.html"
        }
    ]
};

let gameState = {
    currentMissionIndex: 0,
    completedMissions: [],
    collectedItems: []
};

function loadGameProgress() {
    const savedProgress = localStorage.getItem('kowloonGameProgress');
    const currentUser = localStorage.getItem('currentUser');
    
    if (savedProgress && currentUser) {
        const userData = JSON.parse(currentUser);
        const allProgress = JSON.parse(savedProgress);
        
        if (allProgress[userData.username]) {
            gameState = allProgress[userData.username];
        }
    }
    
    loadCurrentMission();
}

function loadCurrentMission() {
    const mission = GAME_DATA.missions[gameState.currentMissionIndex];
    
    document.getElementById('missionTitle').textContent = mission.title;
    document.getElementById('missionDescription').textContent = mission.description;
    document.getElementById('missionProgress').textContent = `第 ${gameState.currentMissionIndex + 1} 關 / 共 ${GAME_DATA.missions.length} 關`;
    
    document.getElementById('qrSection').style.display = 'none';
    document.getElementById('completeButton').disabled = true;
    
    updateInventory();
}

function startARScan() {
    const mission = GAME_DATA.missions[gameState.currentMissionIndex];
    const arTriggerArea = document.getElementById('arTriggerArea');
    const arVideoContainer = document.getElementById('arVideoContainer');
    
    arTriggerArea.style.display = 'none';
    arVideoContainer.style.display = 'block';
    
    setTimeout(() => {
        mission.requirements.watchVideo = true;
        mission.requirements.collectedItem = true;
        addCollectibleItem(mission.collectible);
        
        arVideoContainer.innerHTML = `
            <div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px;">
                <h5>✅ AR探索完成！</h5>
                <p>已獲得物品：${mission.collectible.name}</p>
            </div>
        `;
        
        checkMissionCompletion();
    }, 3000);
}

function checkPassword() {
    const mission = GAME_DATA.missions[gameState.currentMissionIndex];
    const passwordInput = document.getElementById('missionPassword');
    const userAnswer = passwordInput.value.trim();
    
    if (userAnswer === mission.arConfig.correctPassword) {
        mission.requirements.correctAnswer = true;
        
        const passwordSection = document.querySelector('.password-input');
        passwordSection.innerHTML = `
            <div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; text-align: center;">
                <h5>✅ 答案正確！</h5>
            </div>
        `;
        
        checkMissionCompletion();
    } else {
        alert('密碼錯誤！');
        passwordInput.value = '';
    }
}

function checkMissionCompletion() {
    const mission = GAME_DATA.missions[gameState.currentMissionIndex];
    const completeButton = document.getElementById('completeButton');
    
    const allCompleted = mission.requirements.watchVideo && mission.requirements.correctAnswer;
    
    if (allCompleted) {
        completeButton.disabled = false;
    }
}

function completeMission() {
    const mission = GAME_DATA.missions[gameState.currentMissionIndex];
    
    gameState.completedMissions.push(mission.id);
    gameState.currentMissionIndex++;
    
    const completionDiv = document.createElement('div');
    completionDiv.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
    `;
    completionDiv.innerHTML = `
        <div style="background: white; padding: 3rem; border-radius: 20px; text-align: center;">
            <h2 style="color: #10b981;">任務完成！</h2>
        </div>
    `;
    document.body.appendChild(completionDiv);
    
    setTimeout(() => {
        completionDiv.remove();
        generateQRCode(mission.nextMission);
        document.getElementById('qrSection').style.display = 'block';
        saveGameProgress();
    }, 2000);
}

function loadNextMission() {
    if (gameState.currentMissionIndex >= GAME_DATA.missions.length) {
        document.querySelector('.game-container').innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <h1>🏆 遊戲完成！</h1>
                <button onclick="restartGame()" class="action-button">重新開始</button>
            </div>
        `;
    } else {
        loadCurrentMission();
    }
}

function addCollectibleItem(item) {
    if (!gameState.collectedItems.find(collected => collected.name === item.name)) {
        gameState.collectedItems.push(item);
        updateInventory();
    }
}

function updateInventory() {
    const inventoryItems = document.getElementById('inventoryItems');
    inventoryItems.innerHTML = '';
    
    gameState.collectedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `
            <div style="font-size: 2rem;">${item.image}</div>
            <div style="font-weight: bold;">${item.name}</div>
        `;
        inventoryItems.appendChild(itemElement);
    });
}

function generateQRCode(url) {
    const qrContainer = document.getElementById('qrCode');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    qrContainer.innerHTML = `<img src="${qrUrl}" style="width: 100%; height: 100%; border-radius: 5px;">`;
}

function saveGameProgress() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const userData = JSON.parse(currentUser);
    let allProgress = JSON.parse(localStorage.getItem('kowloonGameProgress') || '{}');
    
    allProgress[userData.username] = gameState;
    localStorage.setItem('kowloonGameProgress', JSON.stringify(allProgress));
}

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
