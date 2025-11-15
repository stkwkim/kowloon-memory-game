// 遊戲數據 - 強化歷史內容和付費功能
const gameData = {
    missions: [
        {
            id: 1,
            location: "海心公園鯨魚石",
            title: "🐋 消失的碼頭記憶",
            description: "你現在位於土瓜灣海心公園，這裡曾經是繁忙的海岸線。1960年代填海前，這裡是漁船停泊的碼頭，見證了香港從漁港到現代城市的轉變。",
            task: "📸 任務：拍攝鯨魚石與現代建築的對比照片，思考海岸線的變遷對社區的影響",
            arContent: `
                <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 20px; border-radius: 10px; text-align: left;">
                    <h3><i class="fas fa-water"></i> 土瓜灣填海歷史</h3>
                    <p><strong>時間線：</strong>1960-1970年代</p>
                    <p><strong>變化：</strong>海岸線向北推移近500米</p>
                    <p><strong>影響：</strong>漁村消失，工業區建立</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <small>💡 你知道嗎？填海用的泥土來自附近的山丘平整工程</small>
                    </div>
                </div>
            `,
            qrData: "mission2.html",
            coordinates: "22.3165° N, 114.1905° E",
            historicalFacts: [
                "海心公園原為海中心的小島，名為『海心島'",
                "1960年代填海後與陸地連接成為公園", 
                "見證了香港工業化時期的發展和轉型",
                "周邊的工廠大廈多建於1970-80年代"
            ],
            premiumContent: {
                unlocked: true,
                content: "🎧 語音導覽：聆聽老漁民口述當年海邊生活"
            }
        },
        {
            id: 2,
            location: "土瓜灣十三街",
            title: "🏘️ 戰後唐樓群",
            description: "漫步土瓜灣十三街，這些1950-60年代建成的唐樓，見證了戰後香港的住屋發展和人口急增的歷史時刻。",
            task: "🎯 任務：觀察唐樓建築特色，記錄不同樓宇的年份，思考當年的居住環境",
            arContent: `
                <div style="background: linear-gradient(135deg, #8B4513, #A0522D); color: white; padding: 20px; border-radius: 10px; text-align: left;">
                    <h3><i class="fas fa-building"></i> 戰後建築特色</h3>
                    <p><strong>建築年代：</strong>1950-1960年代</p>
                    <p><strong>特色：</strong>騎樓式設計、露台、金字頂</p>
                    <p><strong>材料：</strong>鋼筋混凝土 + 磚牆</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <small>🏠 這些唐樓當時主要租予內地來港的移民家庭</small>
                    </div>
                </div>
            `,
            qrData: "mission3.html",
            coordinates: "22.3178° N, 114.1892° E",
            historicalFacts: [
                "建於1950-60年代戰後重建時期",
                "見證香港工業化與人口急劇增長",
                "反映當時的建築風格與生活模式",
                "部分唐樓仍保留原有商住混合功能"
            ],
            premiumContent: {
                unlocked: false,
                content: "📊 獨家資料：十三街人口變遷統計圖表"
            }
        },
        {
            id: 3, 
            location: "九龍寨城公園",
            title: "🏯 三不管地帶的記憶",
            description: "這裡曾經是著名的九龍寨城 - 世界上人口最密集的地方。1994年清拆後改建為公園，但它的傳奇故事仍在流傳。",
            task: "🔍 任務：尋找公園內的歷史遺跡，想像當年寨城獨特的生活模式和社區網絡",
            arContent: `
                <div style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 20px; border-radius: 10px; text-align: left;">
                    <h3><i class="fas fa-history"></i> 九龍寨城時間線</h3>
                    <p><strong>清朝：</strong>軍事駐地</p>
                    <p><strong>1947-1993：</strong>獨特社區形成</p>
                    <p><strong>1994：</strong>清拆完成</p>
                    <p><strong>1995：</strong>公園開放</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <small>🌃 巔峰時期0.026平方公里居住近5萬人</small>
                    </div>
                </div>
            `,
            qrData: "mission4.html",
            coordinates: "22.3320° N, 114.1895° E",
            historicalFacts: [
                "清朝時已是軍事駐地，設有衙門",
                "1940-1990年代發展成獨特的三不管地帶",
                "1994年清拆，1995年建成現在的主題公園",
                "公園設計保留原有城牆和衙門遺址"
            ],
            premiumContent: {
                unlocked: false,
                content: "🎬 珍貴影片：1993年寨城清拆前紀錄片"
            }
        },
        {
            id: 4,
            location: "九龍城泰國社區",
            title: "🍜 小泰國的由來",
            description: "九龍城是香港泰國社區的中心，這裡的發展與香港航空業歷史密切相關，展現了香港作為國際城市的多元文化融合。",
            task: "🌶️ 任務：尋找泰式商店，與店主交流（如可能），了解泰國文化如何融入香港社區",
            arContent: `
                <div style="background: linear-gradient(135deg, #c41e3a, #dc143c); color: white; padding: 20px; border-radius: 10px; text-align: left;">
                    <h3><i class="fas fa-globe-asia"></i> 泰國社區發展史</h3>
                    <p><strong>1970s：</strong>泰籍空勤人員聚居</p>
                    <p><strong>1980s：</strong>泰國商店開始出現</p>
                    <p><strong>1990s：</strong>『小泰國』名聲確立</p>
                    <p><strong>現在：</strong>文化美食地標</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <small>✈️ 與啟德機場的國際航線發展同步</small>
                    </div>
                </div>
            `,
            qrData: "mission5.html",
            coordinates: "22.3302° N, 114.1913° E",
            historicalFacts: [
                "與啟德機場歷史密切相關，1970年代開始形成",
                "泰籍航空人員在此聚居，帶動泰國商店發展",
                "展現香港文化多元性和國際化特色",
                "成為本地人體驗泰國文化的熱門地點"
            ],
            premiumContent: {
                unlocked: false,
                content: "👨‍🍳 大師班：泰國廚師教授傳統菜式"
            }
        },
        {
            id: 5,
            location: "紅磡觀音廟",
            title: "🙏 漁民信仰與社區",
            description: "紅磡觀音廟見證了該區從漁港到市區的轉變，是重要的社區信仰中心，凝聚了不同時代居民的情感。",
            task: "📿 任務：了解觀音廟的歷史背景，觀察廟宇建築，思考信仰在社區發展中的角色",
            arContent: `
                <div style="background: linear-gradient(135deg, #8B7355, #A0522D); color: white; padding: 20px; border-radius: 10px; text-align: left;">
                    <h3><i class="fas fa-pray"></i> 紅磡漁港變遷</h3>
                    <p><strong>清朝：</strong>漁港時期，廟宇建成</p>
                    <p><strong>1960s：</strong>填海工程，漁業式微</p>
                    <p><strong>1980s：</strong>市區發展，社區轉型</p>
                    <p><strong>現在：</strong>文化遺產，社區象徵</p>
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                        <small>⛵ 原為漁民出海前祈福的重要場所</small>
                    </div>
                </div>
            `,
            qrData: "certificate.html",
            coordinates: "22.3095° N, 114.1895° E",
            historicalFacts: [
                "建於清朝同治年間，超過150年歷史",
                "原為漁民祈福保佑出海平安的重要場所",
                "見證紅磡從漁港到現代市區的完整轉變",
                "現為三級歷史建築，繼續服務社區"
            ],
            premiumContent: {
                unlocked: false,
                content: "📜 古文件：觀音廟清代地契複製品"
            }
        }
    ]
};

// 遊戲狀態管理 - 增強版
let currentGameState = {
    teamName: "",
    userEmail: "",
    planType: "",
    currentMission: 0,
    startTime: null,
    completedMissions: [],
    collectedFacts: [],
    photos: [],
    paymentStatus: "pending",
    userConsents: {
        dataCollection: false,
        volunteerInfo: false,
        membership: false
    }
};

// 大數據收集功能
const analytics = {
    trackEvent: function(eventName, data) {
        // 這裡可以接入Google Analytics或其他分析工具
        console.log('📊 事件追蹤:', eventName, data);
        
        // 保存到本地存儲供後續上傳
        const analyticsData = JSON.parse(localStorage.getItem('kowloon_analytics') || '[]');
        analyticsData.push({
            timestamp: new Date().toISOString(),
            event: eventName,
            data: data,
            user: currentGameState.userEmail
        });
        localStorage.setItem('kowloon_analytics', JSON.stringify(analyticsData));
    },

    trackMissionStart: function(missionId) {
        this.trackEvent('mission_start', {
            mission_id: missionId,
            mission_name: gameData.missions[missionId].location,
            timestamp: new Date().toISOString()
        });
    },

    trackMissionComplete: function(missionId, timeSpent) {
        this.trackEvent('mission_complete', {
            mission_id: missionId,
            time_spent: timeSpent,
            facts_collected: gameData.missions[missionId].historicalFacts.length
        });
    },

    trackUserInterest: function(interestType) {
        this.trackEvent('user_interest', {
            type: interestType,
            plan: currentGameState.planType
        });
    }
};

// 開始遊戲
function startGame() {
    // 從本地存儲加載用戶數據
    const userData = JSON.parse(localStorage.getItem('kowloon_user_data'));
    if (userData) {
        currentGameState = { ...currentGameState, ...userData };
    }
    
    // 追蹤遊戲開始
    analytics.trackEvent('game_start', {
        plan_type: currentGameState.planType,
        mission_count: gameData.missions.length
    });
    
    // 加載第一個任務
    loadMission(0);
}

// 加載任務 - 增強版
function loadMission(missionIndex) {
    const mission = gameData.missions[missionIndex];
    const missionStartTime = new Date();
    
    currentGameState.currentMission = missionIndex;
    
    // 更新界面
    document.getElementById('currentLocation').textContent = mission.location;
    document.getElementById('missionTitle').textContent = mission.title;
    document.getElementById('missionDescription').textContent = mission.description;
    document.getElementById('missionTask').innerHTML = `<strong>${mission.task}</strong>`;
    
    // 顯示歷史事實
    displayHistoricalFacts(mission.historicalFacts);
    
    // 生成QR碼
    generateQRCode(mission.qrData);
    
    // 顯示AR內容
    document.getElementById('arContent').innerHTML = mission.arContent;
    
    // 顯示高級內容（如果解鎖）
    displayPremiumContent(mission.premiumContent);
    
    // 追蹤任務開始
    analytics.trackMissionStart(missionIndex);
    
    // 保存狀態
    saveGameState();
    
    return missionStartTime;
}

// 顯示歷史事實
function displayHistoricalFacts(facts) {
    const factsHtml = facts.map(fact => 
        `<div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 12px; margin: 8px 0; border-radius: 8px; border-left: 4px solid #2196f3;">
            <i class="fas fa-book-open" style="color: #2196f3; margin-right: 8px;"></i>
            ${fact}
        </div>`
    ).join('');
    
    document.getElementById('historicalFacts').innerHTML = `
        <h4><i class="fas fa-graduation-cap"></i> 歷史知識點</h4>
        ${factsHtml}
    `;
}

// 顯示高級內容
function displayPremiumContent(premiumContent) {
    if (premiumContent.unlocked) {
        const premiumHtml = `
            <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 15px; border-radius: 10px; margin: 15px 0; border: 2px dashed #ff6b00;">
                <h4><i class="fas fa-crown"></i> 尊享內容</h4>
                <p>${premiumContent.content}</p>
                <small style="color: #666;">💎 高級方案獨家</small>
            </div>
        `;
        document.getElementById('historicalFacts').innerHTML += premiumHtml;
    }
}

// 生成QR碼
function generateQRCode(data) {
    const qrCodeDiv = document.getElementById('qrCodeDisplay');
    
    // 使用Google Charts API生成QR碼
    const qrUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(data)}&choe=UTF-8`;
    
    qrCodeDiv.innerHTML = `
        <img src="${qrUrl}" alt="QR Code" style="width:100%;height:100%; border-radius: 5px;">
        <p style="font-size:12px; margin:5px 0; color: #666;">掃描進入下一關</p>
    `;
    
    // 顯示QR碼區域
    document.getElementById('qrSection').style.display = 'block';
}

// 完成任務
function completeMission() {
    const currentMission = gameData.missions[currentGameState.currentMission];
    const missionEndTime = new Date();
    
    // 添加到完成列表
    currentGameState.completedMissions.push(currentMission.id);
    
    // 收集歷史事實
    currentGameState.collectedFacts = [...new Set([...currentGameState.collectedFacts, ...currentMission.historicalFacts])];
    
    // 追蹤任務完成
    const timeSpent = Math.round((missionEndTime - new Date(currentGameState.startTime)) / 60000); // 分鐘
    analytics.trackMissionComplete(currentMission.id, timeSpent);
    
    // 檢查是否所有任務完成
    if (currentGameState.currentMission < gameData.missions.length - 1) {
        // 加載下一關
        loadMission(currentGameState.currentMission + 1);
        
        // 顯示完成動畫
        showCompletionAnimation();
    } else {
        // 遊戲完成
        completeGame();
    }
    
    saveGameState();
}

// 顯示完成動畫
function showCompletionAnimation() {
    const completionDiv = document.createElement('div');
    completionDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                   background: rgba(0,0,0,0.9); color: white; padding: 30px; border-radius: 15px; 
                   z-index: 1000; text-align: center;">
            <h2 style="color: #4CAF50;">🎉 任務完成！</h2>
            <p>已解鎖下一關卡</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                繼續探索
            </button>
        </div>
    `;
    document.body.appendChild(completionDiv);
    
    // 3秒後自動消失
    setTimeout(() => {
        if (completionDiv.parentElement) {
            completionDiv.remove();
        }
    }, 3000);
}

// 完成整個遊戲
function completeGame() {
    analytics.trackEvent('game_complete', {
        total_missions: currentGameState.completedMissions.length,
        total_facts: currentGameState.collectedFacts.length,
        total_time: Math.round((new Date() - new Date(currentGameState.startTime)) / 60000)
    });
    
    // 顯示完成證書
    showCompletionCertificate();
    
    // 詢問是否加入會員
    showMembershipOffer();
}

// 顯示完成證書
function showCompletionCertificate() {
    document.getElementById('gameScreen').innerHTML = `
        <div style="text-align: center; padding: 30px 20px;">
            <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 40px; border-radius: 20px; 
                       border: 10px solid #ff6b00; margin: 20px 0; position: relative;">
                <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); 
                           background: #ff6b00; color: white; padding: 10px 30px; border-radius: 25px;">
                    <i class="fas fa-trophy"></i> 探索證書
                </div>
                
                <h1 style="color: #2d3436; margin-top: 20px;">🏆 九龍記憶庫</h1>
                <h2 style="color: #2d3436;">探索成就證書</h2>
                
                <div style="margin: 30px 0; padding: 20px; background: rgba(255,255,255,0.9); border-radius: 15px;">
                    <p>頒發給：<strong>${currentGameState.teamName}</strong></p>
                    <p>完成時間：${new Date().toLocaleString('zh-HK')}</p>
                    <p>探索地點：<strong>${currentGameState.completedMissions.length}</strong> 個歷史地標</p>
                    <p>收集知識：<strong>${currentGameState.collectedFacts.length}</strong> 個歷史事實</p>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
                    <div style="background: #e74c3c; color: white; padding: 10px 20px; border-radius: 20px;">
                        <i class="fas fa-map-marker-alt"></i> ${currentGameState.completedMissions.length}/5
                    </div>
                    <div style="background: #3498db; color: white; padding: 10px 20px; border-radius: 20px;">
                        <i class="fas fa-book"></i> ${currentGameState.collectedFacts.length}
                    </div>
                </div>
            </div>
            
            <div style="margin: 30px 0;">
                <button onclick="shareAchievement()" style="background: #1877f2; margin: 10px;">
                    <i class="fab fa-facebook"></i> 分享成就
                </button>
                <button onclick="showVolunteerOpportunities()" style="background: #27ae60; margin: 10px;">
                    <i class="fas fa-hands-helping"></i> 義工機會
                </button>
                <button onclick="resetGame()" style="background: #95a5a6; margin: 10px;">
                    <i class="fas fa-redo"></i> 重新開始
                </button>
            </div>
        </div>
    `;
}

// 顯示會員邀請
function showMembershipOffer() {
    setTimeout(() => {
        if (confirm('🎊 恭喜完成探索！您想成為九龍記憶庫正式會員嗎？\n\n會員福利：\n• 優先參與新活動\n• 義工活動邀請\n• 社區建設投票權\n• 獨家歷史資料')) {
            analytics.trackUserInterest('membership');
            currentGameState.userConsents.membership = true;
            saveGameState();
            alert('感謝您加入！我們將通過郵件發送會員資料。');
        }
    }, 2000);
}

// 顯示義工機會
function showVolunteerOpportunities() {
    const opportunities = [
        {
            title: "社區歷史導賞員",
            organization: "九龍城區文化協會",
            time: "週末上午",
            commitment: "每月2次"
        },
        {
            title: "歷史資料數碼化",
            organization: "香港歷史檔案館", 
            time: "彈性時間",
            commitment: "遠程工作"
        },
        {
            title: "社區活動協助",
            organization: "土瓜灣社區中心",
            time: "週末下午", 
            commitment: "活動基礎"
        }
    ];
    
    const opportunitiesHtml = opportunities.map(opp => `
        <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 10px; border-left: 4px solid #e74c3c;">
            <h4>${opp.title}</h4>
            <p><i class="fas fa-building"></i> ${opp.organization}</p>
            <p><i class="fas fa-clock"></i> ${opp.time}</p>
            <p><i class="fas fa-calendar"></i> ${opp.commitment}</p>
            <button onclick="applyVolunteer('${opp.title}')" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                申請參與
            </button>
        </div>
    `).join('');
    
    document.getElementById('gameScreen').innerHTML += `
        <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 15px;">
            <h3><i class="fas fa-hands-helping"></i> 推薦義工機會</h3>
            ${opportunitiesHtml}
        </div>
    `;
}

// 申請義工
function applyVolunteer(opportunity) {
    analytics.trackUserInterest('volunteer_application');
    alert(`已提交 ${opportunity} 的申請！我們將在3個工作日內聯絡您。`);
}

// 分享成就
function shareAchievement() {
    const text = `我剛剛完成了「九龍記憶庫」AR歷史解謎之旅！探索了${currentGameState.completedMissions.length}個歷史地點，學到了${currentGameState.collectedFacts.length}個歷史知識。🏙️\n\n一起來探索香港的歷史記憶吧！`;
    
    if (navigator.share) {
        navigator.share({
            title: '九龍記憶庫探索成就',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text + '\n' + window.location.href);
        alert('成就內容已複製到剪貼簿！請貼到社交媒體分享。');
    }
}

// 顯示進度
function showProgress() {
    const progress = (currentGameState.completedMissions.length / gameData.missions.length) * 100;
    const factsCount = currentGameState.collectedFacts.length;
    
    alert(`📊 您的探索進度：\n\n• 完成關卡：${currentGameState.completedMissions.length}/${gameData.missions.length}\n• 進度：${progress.toFixed(0)}%\n• 收集知識：${factsCount}個\n• 開始時間：${new Date(currentGameState.startTime).toLocaleString('zh-HK')}`);
}

// 保存遊戲狀態
function saveGameState() {
    localStorage.setItem(`gameState_${currentGameState.userEmail}`, JSON.stringify(currentGameState));
    localStorage.setItem('kowloon_user_data', JSON.stringify(currentGameState));
}

// 加載遊戲狀態
function loadGameState(email) {
    const saved = localStorage.getItem(`gameState_${email}`);
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// 重置遊戲
function resetGame() {
    if (confirm('確定要重新開始遊戲嗎？所有進度將會丟失。')) {
        localStorage.removeItem(`gameState_${currentGameState.userEmail}`);
        localStorage.removeItem('kowloon_user_data');
        location.reload();
    }
}

// 頁面加載時初始化
window.onload = function() {
    // 檢查是否有用戶數據
    const userData = localStorage.getItem('kowloon_user_data');
    if (userData) {
        currentGameState = JSON.parse(userData);
    }
    
    // 初始化分析
    analytics.trackEvent('page_view', {
        page: 'index',
        timestamp: new Date().toISOString()
    });
};
