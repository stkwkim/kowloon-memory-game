// =============================================
// AR場景配置系統
// 可輕鬆更換不同的AR認證方法
// =============================================

const AR_CONFIG = {
    // 當前使用的AR方法
    currentMethod: 'qr',
    
    // 所有可用的AR方法
    methods: {
        QR: {
            id: 'qr',
            name: 'QR碼掃描',
            description: '通過掃描QR碼觸發AR內容',
            enabled: true,
            requirements: ['camera'],
            setup: function() {
                return this.initializeQRScanner();
            }
        },
        
        GPS: {
            id: 'gps', 
            name: '地理位置',
            description: '通過GPS定位觸發AR內容',
            enabled: true,
            requirements: ['geolocation'],
            setup: function() {
                return this.initializeGPSTracking();
            }
        },
        
        IMAGE: {
            id: 'image',
            name: '圖像識別',
            description: '通過識別特定圖像觸發AR內容',
            enabled: false, // 需要額外庫支持
            requirements: ['camera', 'image_recognition'],
            setup: function() {
                return this.initializeImageRecognition();
            }
        },
        
        MARKER: {
            id: 'marker',
            name: 'AR標記',
            description: '通過AR標記圖案觸發內容',
            enabled: false, // 需要AR.js等庫
            requirements: ['camera', 'ar_library'],
            setup: function() {
                return this.initializeMarkerTracking();
            }
        }
    },
    
    // 場景配置
    scenes: {
        mission1: {
            id: 'mission1',
            location: '海心公園鯨魚石',
            coordinates: { lat: 22.3165, lng: 114.1905 },
            qrCode: 'mission1_ar_content',
            imageTarget: 'whale_rock_pattern',
            arContent: {
                type: 'historical',
                title: '消失的碼頭記憶',
                media: [
                    { type: 'image', url: 'ar_content/whale_rock_old.jpg', caption: '1960年代的海心公園' },
                    { type: 'audio', url: 'ar_content/fisherman_story.mp3', duration: 120 },
                    { type: '3d', url: 'ar_content/old_harbor.glb', scale: 1.0 }
                ]
            }
        },
        
        mission2: {
            id: 'mission2',
            location: '土瓜灣十三街',
            coordinates: { lat: 22.3178, lng: 114.1892 },
            qrCode: 'mission2_ar_content',
            arContent: {
                type: 'architectural',
                title: '戰後唐樓群',
                media: [
                    { type: 'image', url: 'ar_content/old_street_1950s.jpg', caption: '1950年代的十三街' },
                    { type: 'text', content: '這些唐樓見證了戰後香港的住屋發展' }
                ]
            }
        }
    },
    
    // 初始化方法
    initialize: function(method = 'qr') {
        this.currentMethod = method;
        const selectedMethod = this.methods[method.toUpperCase()];
        
        if (!selectedMethod || !selectedMethod.enabled) {
            console.warn(`AR方法 ${method} 不可用，使用QR碼作為備用`);
            this.currentMethod = 'qr';
            return this.methods.QR.setup();
        }
        
        console.log(`🎯 初始化AR方法: ${selectedMethod.name}`);
        return selectedMethod.setup();
    },
    
    // 切換AR方法
    switchMethod: function(newMethod) {
        if (this.methods[newMethod.toUpperCase()] && this.methods[newMethod.toUpperCase()].enabled) {
            this.currentMethod = newMethod;
            console.log(`🔄 已切換到AR方法: ${this.methods[newMethod.toUpperCase()].name}`);
            return this.initialize(newMethod);
        } else {
            console.warn(`AR方法 ${newMethod} 不可用`);
            return false;
        }
    },
    
    // 獲取當前場景配置
    getSceneConfig: function(sceneId) {
        return this.scenes[sceneId] || null;
    },
    
    // QR碼掃描初始化
    initializeQRScanner: function() {
        return {
            success: true,
            message: 'QR碼掃描器已就緒',
            features: ['scan', 'decode', 'redirect']
        };
    },
    
    // GPS追踪初始化
    initializeGPSTracking: function() {
        if (!navigator.geolocation) {
            return {
                success: false,
                message: '此設備不支持GPS功能',
                fallback: 'qr'
            };
        }
        
        return {
            success: true,
            message: 'GPS追踪已啟用',
            features: ['location_tracking', 'proximity_detection']
        };
    },
    
    // 圖像識別初始化
    initializeImageRecognition: function() {
        // 這裡可以接入TensorFlow.js或其他圖像識別庫
        return {
            success: false,
            message: '圖像識別功能需要額外套件',
            fallback: 'qr'
        };
    },
    
    // AR標記追踪初始化
    initializeMarkerTracking: function() {
        // 這裡可以接入AR.js、A-Frame等AR庫
        return {
            success: false, 
            message: 'AR標記追踪需要AR.js庫',
            fallback: 'qr'
        };
    },
    
    // 觸發AR場景
    triggerScene: function(sceneId, method = null) {
        const scene = this.getSceneConfig(sceneId);
        const arMethod = method || this.currentMethod;
        
        if (!scene) {
            console.error(`未找到場景配置: ${sceneId}`);
            return false;
        }
        
        console.log(`🎮 觸發AR場景: ${scene.location} (方法: ${arMethod})`);
        
        switch(arMethod) {
            case 'qr':
                return this.triggerQRScene(scene);
            case 'gps':
                return this.triggerGPSScene(scene);
            case 'image':
                return this.triggerImageScene(scene);
            case 'marker':
                return this.triggerMarkerScene(scene);
            default:
                return this.triggerQRScene(scene);
        }
    },
    
    // QR碼場景觸發
    triggerQRScene: function(scene) {
        // 顯示QR碼掃描界面
        this.showQRScanner(scene.qrCode);
        return true;
    },
    
    // GPS場景觸發
    triggerGPSScene: function(scene) {
        if (!scene.coordinates) {
            console.error('場景缺少GPS座標');
            return false;
        }
        
        this.startGPSTracking(scene.coordinates);
        return true;
    },
    
    // 顯示QR掃描器
    showQRScanner: function(qrData) {
        const arContainer = document.getElementById('arContainer');
        if (!arContainer) return;
        
        arContainer.innerHTML = `
            <div class="qr-scanner-view">
                <div class="scanner-frame">
                    <div class="scanning-animation"></div>
                    <p>對準QR碼進行掃描</p>
                </div>
                <div class="qr-fallback">
                    <p>或手動輸入代碼: <strong>${qrData}</strong></p>
                    <button onclick="AR_SCENE_MANAGER.manualUnlock('${qrData}')" class="unlock-btn">
                        手動解鎖
                    </button>
                </div>
            </div>
        `;
    },
    
    // 開始GPS追踪
    startGPSTracking: function(targetCoords) {
        const arContainer = document.getElementById('arContainer');
        if (!arContainer) return;
        
        arContainer.innerHTML = `
            <div class="gps-tracker-view">
                <div class="gps-status">
                    <i class="fas fa-satellite"></i>
                    <h3>GPS定位中...</h3>
                </div>
                <div class="distance-display" id="distanceDisplay">
                    計算距離中...
                </div>
                <div class="gps-hint">
                    <p>請前往目標位置解鎖AR內容</p>
                    <p>目標: ${targetCoords.lat}, ${targetCoords.lng}</p>
                </div>
            </div>
        `;
        
        this.updateGPSPosition(targetCoords);
    },
    
    // 更新GPS位置
    updateGPSPosition: function(targetCoords) {
        if (!navigator.geolocation) return;
        
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const userCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                const distance = this.calculateDistance(userCoords, targetCoords);
                this.updateDistanceDisplay(distance);
                
                if (distance < 0.05) { // 50米範圍內
                    this.unlockARContent();
                    navigator.geolocation.clearWatch(watchId);
                }
            },
            (error) => {
                console.error('GPS錯誤:', error);
                this.showGPSError();
            },
            { 
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
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
    
    // 更新距離顯示
    updateDistanceDisplay: function(distance) {
        const display = document.getElementById('distanceDisplay');
        if (display) {
            if (distance < 1) {
                display.innerHTML = `距離目標: ${(distance * 1000).toFixed(0)} 米`;
            } else {
                display.innerHTML = `距離目標: ${distance.toFixed(2)} 公里`;
            }
        }
    },
    
    // 解鎖AR內容
    unlockARContent: function() {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div class="ar-unlocked">
                    <div class="unlock-animation">
                        <i class="fas fa-lock-open"></i>
                        <h3>AR內容已解鎖！</h3>
                    </div>
                    <button onclick="AR_SCENE_MANAGER.showARContent()" class="view-content-btn">
                        查看AR內容
                    </button>
                </div>
            `;
        }
    },
    
    // 手動解鎖
    manualUnlock: function(code) {
        console.log(`手動解鎖代碼: ${code}`);
        this.unlockARContent();
    },
    
    // 顯示AR內容
    showARContent: function() {
        // 這裡顯示真正的AR內容
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div class="ar-content-view">
                    <h3>🏗️ 歷史重現</h3>
                    <div class="historical-media">
                        <img src="https://via.placeholder.com/300x200?text=歷史照片" alt="歷史重現">
                        <p>這裡顯示歷史場景的AR重現內容</p>
                    </div>
                    <div class="ar-controls">
                        <button onclick="AR_SCENE_MANAGER.closeAR()" class="close-ar-btn">
                            <i class="fas fa-times"></i> 關閉AR
                        </button>
                    </div>
                </div>
            `;
        }
    },
    
    // 關閉AR
    closeAR: function() {
        const arContainer = document.getElementById('arContainer');
        if (arContainer) {
            arContainer.innerHTML = `
                <div class="ar-closed">
                    <p>AR內容已關閉</p>
                    <button onclick="AR_SCENE_MANAGER.showARContent()" class="reopen-btn">
                        重新開啟AR
                    </button>
                </div>
            `;
        }
    }
};

// 全局AR場景管理器
window.AR_SCENE_MANAGER = AR_CONFIG;
