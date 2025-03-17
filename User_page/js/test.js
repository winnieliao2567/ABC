new Vue({
    el: "#app",
    data: {
        currentCoords: null, // 用戶當前座標
        stores: [], // 店家列表
        loading: false, // 加載狀態
        error: null, // 錯誤信息
        locationRequired: true, // 標記位置是否必須
    },
    mounted() {
        // 頁面載入時自動請求位置
        this.getLocation();
    },
    methods: {
        // 獲取用戶位置並查詢附近店家
        getLocation() {
            this.loading = true;
            this.error = null;
            this.stores = [];

            // 檢查瀏覽器是否支持地理定位
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    // 成功獲取位置
                    (position) => {
                        this.currentCoords = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        console.log("獲取位置成功:", this.currentCoords);
                        this.fetchNearbyStores();
                    },
                    // 獲取位置失敗
                    (error) => {
                        this.loading = false;
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                this.error =
                                    "您必須允許位置訪問才能使用本服務。請重新整理頁面並允許位置請求，或在瀏覽器設定中啟用位置服務。";
                                this.showLocationInstructions();
                                break;
                            case error.POSITION_UNAVAILABLE:
                                this.error = "位置信息不可用，請確認您的設備GPS或位置服務已開啟";
                                break;
                            case error.TIMEOUT:
                                this.error = "請求位置超時，請檢查您的網絡連接並重試";
                                break;
                            case error.UNKNOWN_ERROR:
                                this.error = "發生未知錯誤，請重新整理頁面後再試";
                                break;
                        }
                    },
                    // 選項
                    {
                        enableHighAccuracy: true, // 高精度
                        timeout: 10000, // 10秒超時
                        maximumAge: 0, // 不使用緩存
                    }
                );
            } else {
                this.loading = false;
                this.error = "您的瀏覽器不支持地理定位，請使用支持地理定位的現代瀏覽器";
            }
        },

        // 顯示位置訪問指導
        showLocationInstructions() {
            // 根據不同瀏覽器顯示不同的指導
            const browser = this.detectBrowser();
            let instructions = "要使用本服務，您需要允許位置訪問。";

            if (browser === "chrome") {
                instructions +=
                    " 在Chrome中，請點擊地址欄左側的鎖頭圖標，並將「位置」設置為「允許」。";
            } else if (browser === "firefox") {
                instructions +=
                    " 在Firefox中，請點擊地址欄左側的信息圖標，並將「位置」設置為「允許」。";
            } else if (browser === "safari") {
                instructions += " 在Safari中，請前往「設定 > Safari > 位置服務」並啟用。";
            }

            instructions += " 設置完成後，請重新整理頁面。";

            this.error = instructions;
        },

        // 檢測瀏覽器類型
        detectBrowser() {
            const userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf("chrome") > -1) return "chrome";
            if (userAgent.indexOf("firefox") > -1) return "firefox";
            if (userAgent.indexOf("safari") > -1) return "safari";
            return "unknown";
        },

        // 重試獲取位置
        retryLocation() {
            this.getLocation();
        },

        // 獲取附近店家
        fetchNearbyStores() {
            // 使用 fetch API 發送請求到後端
            fetch(
                `/api/stores?latitude=${this.currentCoords.latitude}&longitude=${this.currentCoords.longitude}`
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP 錯誤! 狀態: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    this.stores = data;
                    this.loading = false;
                })
                .catch((error) => {
                    this.error = `獲取店家數據失敗: ${error.message}`;
                    this.loading = false;
                    console.error("API 請求錯誤:", error);
                });
        },

        // 格式化距離顯示
        formatDistance(distance) {
            if (distance < 1) {
                return `${Math.round(distance * 1000)} 公尺`;
            } else {
                return `${distance.toFixed(1)} 公里`;
            }
        },
    },
});
