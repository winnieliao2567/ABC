const copyRight = " 共饗有限公司. All Rights Reserved.";

const TestModel = true; //test

const version = "1.0.1";
const host = "https://sharings.com.tw/";
const AutoKey = "sharings-api-r^rz-jofw-ccwf";

const currentPage = 1; // 當前頁面
const pageSize = 10; // 每頁顯示筆數
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);

const menuId = urlParams.get("mid");
const storeId = urlParams.get("sid");

// console.log("menuId-------------" + menuId);
// console.log("storeId-------------" + storeId);

const userFunction = [
    {
        icon: "fas fa-users-cog",
        name: "權限管理",
        status: "",
        url: "roleSetting.html",
    },
    {
        icon: "fas fa-user",
        name: "帳戶管理",
        status: "",
        url: "",
        item: [
            {
                icon: "fas fa-circle",
                name: "店家端帳戶",
                status: "",
                url: "account_Store.html",
            },
            {
                icon: "fas fa-circle",
                name: "用戶端帳戶",
                status: "",
                url: "account_User.html",
            },
            {
                icon: "fas fa-circle",
                name: "維運端帳戶",
                status: "",
                url: "account_System.html",
            },
        ],
    },
    {
        icon: "fas fa-store",
        name: "店家管理",
        status: "",
        url: "SearchStore.html",
    },
    {
        icon: "fas fa-clipboard-list",
        name: "訂單",
        status: "",
        url: "OrderMaintain.html",
    },
    {
        icon: "fas fa-tags",
        name: "標籤管理",
        status: "",
        url: "",
        item: [
            {
                icon: "fas fa-circle",
                name: "標籤分類",
                status: "",
                url: "TabClass.html",
            },
            {
                icon: "fas fa-circle",
                name: "標籤",
                status: "",
                url: "TabList.html",
            },
        ],
    },
    {
        icon: "fas fa-print",
        name: "出單機管理",
        status: "",
        url: "",
        item: [
            {
                icon: "fas fa-circle",
                name: "出單紀錄",
                status: "",
                url: "PrintList.html",
            },
            {
                icon: "fas fa-circle",
                name: "登入管理與指派",
                status: "",
                url: "PrintSetting.html",
            },
        ],
    },
    {
        icon: "fas fa-address-book",
        name: "活動日誌",
        status: "",
        url: "",
    },
];

function loadingOff() {
    // console.log("移除遮罩");
    $(".preloader").css("height", 0);
    // setTimeout(function () {
    $(".preloader").children().hide();
    // }, 0);
}
function loadingOn() {
    // console.log("顯示遮罩");
    $(".preloader").css("height", "100%");
    // setTimeout(function () {
    $(".preloader").children().show();
    // }, 0);
}
function apiWeb(_url, _type, _data, TimelogTag, _fun) {
    // console.log("● API-" + TimelogTag + "(" + _url + ")");
    console.log(_url);

    // console.log("● data-" + TimelogTag + ":", _data);

    let ApiAuto = "";

    $.ajax({
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: ApiAuto, // 需要的話可以加上授權標頭
        },
        url: host + "/api/auth/keylogin",
        data: JSON.stringify({
            key: AutoKey,
        }),
        // sync: true,
        success: function (v) {
            ApiAuto = "Bearer " + v.token;

            if (TestModel) {
                console.log("● auto-" + TimelogTag + ":", ApiAuto);
            }

            if (_url == "_url") {
                if (_fun) _fun();
            } else {
                $.ajax({
                    type: _type == "" ? "POST" : _type,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        Authorization: ApiAuto, // 需要的話可以加上授權標頭
                    },
                    url: host + _url,
                    data: _data,
                    statusCode: {
                        400: function (xhr) {
                            if (TestModel) {
                                console.log(xhr);
                            }
                            toastr.error(xhr.responseText);
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        },
                        401: function (xhr) {
                            if (TestModel) {
                                console.log("Forbidden (401):", xhr);
                            }

                            if (TimelogTag == "管理員登入") {
                                toastr.error("登入失敗");
                                loadingOff();
                            } else {
                                // apiWeb(_url, _type, _data, TimelogTag, _fun);
                                toastr.error("憑證錯誤，請登入後再試一次");
                                setTimeout(() => {
                                    window.location.href = "login.html";
                                }, 3000);
                            }
                        },
                        default: function (xhr) {
                            // 捕捉所有其他狀態碼
                            toastr.error(TimelogTag + "系統問題導致失敗");
                        },
                    },
                    success: function (v) {
                        if (TestModel) {
                            console.log("● API-" + TimelogTag + "(" + _url + ")");
                            console.log("● Reques-" + TimelogTag + " : ", v);
                        }

                        // toastr.success(TimelogTag + "成功");

                        if (_fun) _fun(v);
                    },
                    error: function (v) {
                        if (TestModel) {
                            console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                            toastr.error(TimelogTag + "系統問題導致失敗");
                            console.log("Error:", JSON.stringify(v));
                        }
                    },
                });
            }
        },
    });
}

//加密
const secretKey = "your-secure-key"; // 建議存入環境變數
// 加密函數
function encryptObject(data) {
    if (!data || typeof data !== "object") {
        // throw new Error("加密失敗：資料必須是物件-" + data);
        return false;
    }
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}
// 解密函數
function decryptObject(encryptedData) {
    if (!encryptedData || typeof encryptedData !== "string") {
        // throw new Error("解密失敗：加密資料必須是字串-" + encryptedData);
        return false;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    } catch (error) {
        throw new Error("解密錯誤，可能是密鑰不匹配或加密數據格式錯誤");
    }
}

/*--- 超出字數變成... ---*/
//後面
function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;
    }
    return string;
}
//中間
function add3DotsMiddle(string, limit) {
    var dots = "...";
    if (string.length > limit) {
        var partLength = Math.floor((limit - dots.length) / 2); // 計算保留的部分長度
        return (
            string.substring(0, partLength) + dots + string.substring(string.length - partLength)
        );
    }
    return string;
}

// 格式化金額
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US").format(amount);
}

//初始資料獲得失敗 func
function GetDataError(data) {
    toastr.error(data + "失敗，請重新登入");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

// === Auth Utilities ==================================================
function saveAuthFromVerifyResponse(resp) {
    if (!resp || typeof resp !== "object") return;
    const encryptedId = resp.encryptedId ?? resp.EncryptedId ?? "";
    const userData = resp.userData ?? resp.UserData ?? {};
    const username = resp.username ?? resp.Username ?? userData.username ?? "";
    const roles = resp.roles ?? resp.Roles ?? userData.roles ?? "";
    const userId = userData.userId ?? userData.UserId ?? "";

    if (encryptedId) localStorage.setItem("userToken", encryptedId);
    if (username) localStorage.setItem("username", username);
    if (roles !== undefined && roles !== null) localStorage.setItem("roles", String(roles));
    if (userId) localStorage.setItem("userId", userId);
    if (Object.keys(userData).length) localStorage.setItem("userData", JSON.stringify(userData));
}

function getAuth() {
    return {
        token: localStorage.getItem("userToken") || "",
        username: localStorage.getItem("username") || "",
        roles: localStorage.getItem("roles") || "",
        userId: localStorage.getItem("userId") || "",
        userData: (function () {
            try {
                return JSON.parse(localStorage.getItem("userData") || "{}");
            } catch {
                return {};
            }
        })(),
    };
}

function clearAuth() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
}

function hasRole(required) {
    const r = (localStorage.getItem("roles") || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    return r.includes(String(required));
}

function renderUsername(selector) {
    const name = localStorage.getItem("username") || "";
    if (!name) return;
    const targets = document.querySelectorAll(selector || ".js-username, [data-username]");
    targets.forEach((el) => {
        el.textContent = name;
    });
}

function requireLogin(redirect) {
    if (!(localStorage.getItem("userToken") || localStorage.getItem("username"))) {
        toastr.error("請先登入");
        setTimeout(() => {
            window.location.href = redirect || "login.html";
        }, 800);
        return false;
    }
    return true;
}

$(function () {
    //copyRight
    $("#copyRight").text("© " + moment().format("YYYY") + copyRight);

    $("#version").text("v " + version);

    //顯示密碼按鈕
    $("body").on("click", ".password-undisabled", function () {
        // $(".password-undisabled").click(function () {
        var id = $(this).attr("data-for");
        // console.log(id);
        $(this)
            .addClass("password-disabled")
            .removeClass("password-undisabled")
            .html('<i class="fas fa-eye"></i>');
        $(id).attr("type", "text");
    });
    $("body").on("click", ".password-disabled", function () {
        // $(".password-disabled").click(function () {
        var id = $(this).attr("data-for");
        // console.log(id);
        $(this)
            .addClass("password-undisabled")
            .removeClass("password-disabled")
            .html('<i class="fas fa-eye-slash"></i>');
        $(id).attr("type", "password");
    });

    if (storeId != "" && $("#" + storeId).length > 0) {
        $("#" + storeId).addClass("selected-item");
    }

    $(".toEditAccount").click(function () {
        window.location.href = "account_edit.html?sid=" + storeId;
    });
    $(".toLogin").click(function () {
        window.location.href = "login.html";
    });
    $(".toIndex").click(function () {
        window.location.href = "index.html?sid=" + storeId;
    });

    // 自動渲染頁面上的使用者名稱
    renderUsername(".js-username, [data-username]");
});
