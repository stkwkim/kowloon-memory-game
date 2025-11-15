// =============================================
// 九龍記憶庫 - 系統配置
// 所有可更改的設定都在這裡
// =============================================

const SYSTEM_CONFIG = {
    // 🔑 密碼系統配置
    PASSWORDS: {
        // 各關卡密碼 - 可在這裡更改
        MISSION_1: "FILLSEA1965",
        MISSION_2: "POSTWAR1958", 
        MISSION_3: "WALLEDCITY94",
        MISSION_4: "THAITOWN1975",
        MISSION_5: "GUANYIN1873",
        MISSION_6: "CATTLE2001",
        MISSION_7: "FERRY1950",
        MISSION_8: "KAI1998TAK",
        
        // 密碼規則
        REQUIRE_CAPITAL: true,
        ALLOW_NUMBERS: true,
        MIN_LENGTH: 8
    },
    
    // 🎬 AR系統配置  
    AR_SYSTEM: {
        // 影片資源 - 可在這裡替換
        VIDEO_URLS: {
            MISSION_1: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1095-large.mp4",
            MISSION_2: "https://assets.mixkit.co/videos/preview/mixkit-vintage-building-facade-1129-large.mp4",
            // ... 其他關卡影片
        },
        
        // 掃描設定
        SCAN_TIMES: {
            MISSION_1: 8,
            MISSION_2: 7,
            // ... 其他關卡掃描時間
        },
        
        // AR效果設定
        EFFECTS: {
            ENABLE_3D: false,      // 是否啟用3D效果
            ENABLE_AUDIO: true,    // 是否啟用音效
            QUALITY: "medium"      // 畫質設定
        }
    },
    
    // ⚙️ 遊戲設定
    GAME_SETTINGS: {
        // 時間設定
        ESTIMATED_TIMES: {
            MISSION_1: 45,
            MISSION_2: 50,
            // ... 各關卡預計時間(分鐘)
        },
        
        // 難度設定
        DIFFICULTY: {
            ENABLE_HINTS: true,      // 啟用提示
            SHOW_PASSWORD_HINTS: true, // 顯示密碼提示
            AUTO_SAVE: true          // 自動保存進度
        },
        
        // 內容設定
        CONTENT: {
            SHOW_HISTORICAL_FACTS: true,
            ENABLE_COLLECTIBLES: true,
            SHOW_MAP_COORDINATES: true
        }
    },
    
    // 🎯 測試模式設定
    TEST_MODE: {
        ENABLED: true,              // 啟用測試模式
        SKIP_AR_SCAN: true,         // 跳過AR掃描
        AUTO_PLAY_VIDEO: true,      // 自動播放影片
        SHOW_ALL_PASSWORDS: true    // 顯示所有密碼
    }
};

// 🔄 更新密碼函數
function updateMissionPassword(missionId, newPassword) {
    if (missionId >= 1 && missionId <= 8) {
        SYSTEM_CONFIG.PASSWORDS[`MISSION_${missionId}`] = newPassword;
        console.log(`✅ 已更新第${missionId}關密碼為: ${newPassword}`);
        return true;
    }
    return false;
}

// 🔄 更新AR影片函數  
function updateARVideo(missionId, newVideoUrl) {
    if (missionId >= 1 && missionId <= 8) {
        SYSTEM_CONFIG.AR_SYSTEM.VIDEO_URLS[`MISSION_${missionId}`] = newVideoUrl;
        console.log(`✅ 已更新第${missionId}關AR影片`);
        return true;
    }
    return false;
}
