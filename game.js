// 遊戲數據 - 所有關卡信息
const gameData = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶",
            description: "你現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。尋找傳說中的鯨魚石，想像50年前這裡的漁船景象。",
            task: "📸 任務：拍攝鯨魚石與現代建築的對比照片",
            qrData: "mission2.html",
            coordinates: "22.3165° N, 114.1905° E",
            story: "海心公園曾是土瓜灣海邊，1960年代填海後形成現在的面貌。鯨魚石是這裡的地標，見證了從漁港到市區的轉變。"
        },
        {
            id: 2,
            location: "土瓜灣老街市",
            title: "🏪 老店的故事",
            description: "漫步土瓜灣老街，尋找至少3家經營超過30年的老字號店鋪。",
            task: "🎯 任務：記錄老店名稱並與店主交流（如果可能）",
            qrData: "mission3.html", 
            coordinates: "22.3178° N, 114.1892° E",
            story: "土瓜灣保留了很多傳統店鋪，這些老店見證了社區的變遷，每一家都有獨特的故事。"
        },
        {
            id: 3, 
            location: "九龍寨城公園",
            title: "🏯 消失的城寨",
            description: "你現在來到九龍寨城公園，這裡曾經是著名的三不管地帶 - 九龍寨城。",
            task: "🔍 任務：尋找公園內的歷史遺跡，了解寨城的獨特歷史",
            qrData: "mission4.html",
            coordinates: "22.3320° N, 114.1895° E",
            story: "九龍寨城曾經是世界上最密集的居住區，1994年清拆後改建為公園，但很多故事仍在流傳。"
        },
        {
            id: 4,
            location: "九龍城泰國社區",
            title: "🍜 異國美食之旅", 
            description: "探索九龍城的泰國社區，感受香港的多元文化。",
            task: "🌶️ 任務：找到一家泰國餐廳，了解泰國文化在香港的發展",
            qrData: "mission5.html",
            coordinates: "22.3302° N, 114.1913° E",
            story: "九龍城是香港泰國社區的中心，這裡有地道的泰國美食和商品，展現了香港的國際化特色。"
        },
        {
            id: 5,
            location: "終點站 - 九龍城廣場",
            title: "🎉 完成挑戰！",
            description: "恭喜你完成了九龍記憶庫的所有挑戰！",
            task: "🏆 任務：分享你的探索經歷",
            qrData: "certificate.html",
            coordinates: "22.3325° N, 114.1920° E",
            story: "你已經深入了解了土瓜灣和九龍城的歷史文化，成為真正的九龍探索者！"
        }
    ]
};

// 遊戲狀態管理
let currentGameState = {
    teamName: "",
    currentMission: 0,
    startTime: null,
    completedMissions: [],
    photos: []
};

// 開始遊戲
function startGame() {
    const teamName = document.getElementById('teamName').value;
    const startCode = document.getElementById('startCode').value;
    
    if (!teamName || !startCode) {
        alert('請輸入隊伍名稱和啟動密碼');
        return;
    }
    
    // 驗證啟動密碼（簡單驗證）
    if (startCode !== '8888') { // 默認密碼，可根據需要修改
        alert('啟動密碼錯誤，請檢查後重試');
        return;
    }
    
    currentGameState.teamName = teamName;
    currentGameState.startTime = new Date();
    
    // 保存到本地存儲
    saveGameState();
    
    // 顯示遊戲界面
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    
    // 加載第一個任務
    loadMission(0);
}

// 加載任務
function loadMission(missionIndex) {
    const mission = gameData.missions[missionIndex];
    currentGameState.currentMission = missionIndex;
    
    // 更新界面
    document.getElementById('currentLocation').textContent = mission.location;
    document.getElementById('missionTitle').textContent = mission.title;
    document.getElementById('missionDescription').textContent = mission.description;
    document.getElementById('missionTask').innerHTML = `<strong>${mission.task}</strong>`;
    
    // 生成QR碼
    generateQRCode(mission.qrData);
    
    // 保存狀態
    saveGameState();
}

// 生成QR碼
function generateQRCode(data) {
    const qrCodeDiv = document.getElementById('qrCodeDisplay');
    
    // 使用簡單的QR碼生成（實際使用時可以接入QR碼庫）
    // 這裡使用Google Charts API生成QR碼
    const qrUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(data)}&choe=UTF-8`;
    
    qrCodeDiv.innerHTML = `<img src="${qrUrl}" alt="QR Code" style="width:100%;height:100%;">`;
}

// 保存遊戲狀態
function saveGameState() {
    localStorage.setItem(`gameState_${currentGameState.teamName}`, JSON.stringify(currentGameState));
}

// 加載遊戲狀態
function loadGameState(teamName) {
    const saved = localStorage.getItem(`gameState_${teamName}`);
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// 顯示進度
function showProgress() {
    const completed = currentGameState.completedMissions.length;
    const total = gameData.missions.length;
    alert(`進度: ${completed}/${total} 關卡完成\n開始時間: ${currentGameState.startTime}`);
}

// 重置遊戲
function resetGame() {
    if (confirm('確定要重新開始遊戲嗎？所有進度將會丟失。')) {
        localStorage.removeItem(`gameState_${currentGameState.teamName}`);
        location.reload();
    }
}

// 頁面加載時檢查是否有保存的遊戲
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const team = urlParams.get('team');
    
    if (team) {
        const savedState = loadGameState(team);
        if (savedState) {
            currentGameState = savedState;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            loadMission(currentGameState.currentMission);
        }
    }
};