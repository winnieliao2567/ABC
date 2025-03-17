const copyRight = " 共饗有限公司. All Rights Reserved.";
const version = "1.0.1";
const host = "https://202.182.109.207/";
const currentPage = 1; // 當前頁面
const pageSize = 10; // 每頁顯示筆數
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const menuId = urlParams.get("mid");
const storeId = urlParams.get("sid");

// console.log("menuId-------------" + menuId);
// console.log("storeId-------------" + storeId);

const userFunction = [
    {
        icon: "fas fa-store",
        name: "商店管理",
        status: "",
        url: "",
        item: [
            {
                icon: "fas fa-store",
                name: "店家管理",
                status: "",
                url: "StoreMaintain.html?sid=" + storeId,
            },
            {
                icon: "fas fa-border-all",
                name: "菜單管理",
                status: "",
                url: "MenuList.html?sid=" + storeId,
            },
            {
                icon: "fas fa-utensils",
                name: "品項管理",
                status: "",
                url: "Productor.html?sid=" + storeId,
            },
            {
                icon: "fas fa-sort-amount-up",
                name: "排序管理",
                status: "",
                url: "SortClass.html?sid=" + storeId,
            },
            {
                icon: "fas fa-seedling",
                name: "客製化屬性",
                status: "",
                url: "Customized.html?sid=" + storeId,
            },
        ],
    },
    {
        icon: "fas fa-clipboard-list",
        name: "訂餐紀錄",
        status: "",
        url: "OrderList.html?sid=" + storeId,
    },
    {
        icon: "fas fa-user-slash",
        name: "黑名單",
        status: "",
        url: "BanList.html?sid=" + storeId,
    },
    // {
    //     icon: "fas fa-user-clock",
    //     name: "帳號登入記錄",
    //     status: "",
    //     url: "LogInlog.html?sid=" + storeId,
    // },
    {
        icon: "fas fa-user-clock",
        name: "快速設定",
        status: "",
        url: "quicksetup.html?sid=" + storeId,
    },
];

function loadingOff() {
    console.log("移除遮罩");
    $(".preloader").css("height", 0);
    setTimeout(function () {
        $(".preloader").children().hide();
    }, 0);
}
function loadingOn() {
    console.log("顯示遮罩");
    $(".preloader").css("height", "100%");
    setTimeout(function () {
        $(".preloader").children().show();
    }, 0);
}
function apiWeb(_url, _type, _data, TimelogTag, _fun) {
    console.time("● API-" + TimelogTag + "(" + _url + ")");
    console.log("● data-" + TimelogTag + ":", _data);
    if (_url == "_url") {
        if (_fun) _fun();
    } else {
        $.ajax({
            type: _type == "" ? "POST" : _type,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // Authorization: localStorage.token, // 需要的話可以加上授權標頭
            },
            url: host + _url,
            data: _data,
            statusCode: {
                400: function (xhr) {
                    // console.log();
                    toastr.error(xhr.responseJSON.message);
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                },
                403: function (xhr) {
                    console.log("Forbidden (403):", xhr);
                },
                404: function (xhr) {
                    console.log("Not Found (404):", xhr);
                },
                500: function (xhr) {
                    console.log("Server Error (500):", xhr);
                },
                default: function (xhr) {
                    // 捕捉所有其他狀態碼
                    toastr.error(TimelogTag + "系統問題導致失敗");
                },
            },
            success: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                // toastr.success(TimelogTag + "成功");
                console.log("● Reques-" + TimelogTag + " : " + JSON.stringify(v));
                if (_fun) _fun(v);
            },
            error: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                // toastr.error(TimelogTag + "系統問題導致失敗");
                console.log("Error:", JSON.stringify(v));
            },
        });
    }
}

//確認登入資料
function checkUserInfo() {
    var errorInfo = "";
    if (storeId == "") {
        // window.location.href = "login.html";
        errorInfo = "找不到店家資訊";
        console.error(errorInfo);
        userError();
        return;
    }
    if (
        sessionStorage.userInfo == null ||
        sessionStorage.allStore == null ||
        sessionStorage.userInfo == "" ||
        sessionStorage.allStore == ""
    ) {
        errorInfo = "找不到管理員資訊";
        console.error(errorInfo);
        userError();
    }
    apiWeb("api/Store/detail/" + storeId, "GET", null, "更新店家資訊", function (v) {
        sessionStorage.storeInfo = encryptObject(v);
        if (v.status.isOpen == true) {
            $("#OpenStatus").addClass("fas fa-store text-success");
        } else {
            $("#OpenStatus").addClass("fas fa-store-slash text-danger");
        }
    });

    function userError() {
        $("body").append(
            '<div class="modal fade" id="reloginModal" tabindex="-1" data-backdrop="static" data-keyboard="false" ole="dialog" aria-labelledby="reloginModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="reloginModalLabel">錯誤</h5></div><div class="modal-body">' +
                errorInfo +
                '，請重新登入以繼續使用系統。</div><div class="modal-footer"><button type="button" class="btn btn-primary" onclick="window.location.href=' +
                "'login.html'" +
                '">重新登入</button></div></div></div></div>'
        );
        $("#reloginModal").modal("show");
    }
}
function itemClick(obj) {
    // console.log(obj.attr("id"));
    selectStore(obj.attr("id"));
}
function selectStore(Id) {
    console.log("selectid: " + Id);
    // loadingOn();
    apiWeb("api/Store/detail/" + Id, "GET", null, "更換店家，取得資訊", function (v) {
        // 存入 sessionStorage
        // console.log("選擇的商店:", foundStore);
        sessionStorage.storeInfo = encryptObject(v);
        // 跳轉頁面
        window.location.href = "index.html?sid=" + Id;
    });
}
//加密
const secretKey = "your-secure-key"; // 建議存入環境變數
// 加密函數
function encryptObject(data) {
    if (!data || typeof data !== "object") {
        throw new Error("加密失敗：資料必須是物件-" + data);
    }
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}
// 解密函數
function decryptObject(encryptedData) {
    if (!encryptedData || typeof encryptedData !== "string") {
        throw new Error("解密失敗：加密資料必須是字串-" + encryptedData);
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
$(function () {
    //copyRight
    $("#copyRight").text("© " + moment().format("YYYY") + copyRight);

    $("#version").text("v " + version);

    //顯示密碼按鈕
    $("body").on("click", ".password-undisabled", function () {
        // $(".password-undisabled").click(function () {
        var id = $(this).attr("data-for");
        console.log(id);
        $(this)
            .addClass("password-disabled")
            .removeClass("password-undisabled")
            .html('<i class="fas fa-eye"></i>');
        $(id).attr("type", "text");
    });
    $("body").on("click", ".password-disabled", function () {
        // $(".password-disabled").click(function () {
        var id = $(this).attr("data-for");
        console.log(id);
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
        window.location.href = "account_edit.html";
    });
    $(".toLogin").click(function () {
        window.location.href = "login.html";
    });
    $(".toIndex").click(function () {
        window.location.href = "index.html?sid=" + storeId;
    });
});
