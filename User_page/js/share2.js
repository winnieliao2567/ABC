const copyRight = " 共饗有限公司. All Rights Reserved.";
const version = "1.0.1";
const host = "https://sharings.com.tw/";
const AutoKey = "sharings-api-r^rz-jofw-ccwf";

const TestModel = false; //test
const testdemo = true; //testdemo - 啟用Demo測試資料
const currentPage = 1; // 當前頁面
const pageSize = 10; // 每頁顯示筆數
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);
const radius = 200000; //距離半徑

const classId = urlParams.get("cid"); //tagId
const classType = urlParams.get("ctype"); //tag type
const className = urlParams.get("cname"); //tag name
const keyWord = urlParams.get("kw"); //關鍵字

const userId = urlParams.get("uid");
const storeId = urlParams.get("sid");
const orderId = urlParams.get("order");
const pageStatus = urlParams.get("status");

// console.log("menuId-------------" + redirect);
// console.log("storeId-------------" + storeId);

const userFunction = [
    {
        icon: "fas fa-user-edit",
        name: "會員資訊",
        status: "",
        url: "userInfomationEdit.html?",
    },
    {
        icon: "fas fa-history",
        name: "歷史訂單",
        status: "",
        url: "historyList.html?uid=",
    },
    {
        icon: "fas fa-sign-out-alt",
        name: "登出",
        status: "",
        url: "login.html",
    },
];

function loadingOff() {
    // console.log("移除遮罩");
    $(".preloader").css("height", 0);
    setTimeout(function () {
        $(".preloader").children().hide();
    }, 0);
}
function loadingOn() {
    // console.log("顯示遮罩");
    $(".preloader").css("height", "100%");
    setTimeout(function () {
        $(".preloader").children().show();
    }, 0);
}
function apiWeb(_url, _type, _data, TimelogTag, _fun) {
    if (TestModel) {
        console.time("● API-" + TimelogTag + "(" + _url + ")");
        console.log("● data-" + TimelogTag + ":", _data);
    }

    let ApiAuto = "";
    $.ajax({
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
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

            $.ajax({
                type: _type == "" ? "POST" : _type,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: ApiAuto, // 需要的話可以加上授權標頭
                },
                url: host + _url,
                data: _data,
                // sync: true,
                statusCode: {
                    400: function (xhr) {
                        if (TestModel) {
                            console.log();
                        }
                        toastr.error(xhr.responseJSON.message);
                        // setTimeout(() => {
                        //     location.reload();
                        // }, 1500);
                    },
                    // 403: function (xhr) {
                    //     console.log("Forbidden (403):", xhr);
                    // },
                    // 404: function (xhr) {
                    //     console.log("Not Found (404):", xhr);
                    // },
                    // 500: function (xhr) {
                    //     console.log("Server Error (500):", xhr);
                    // },
                    default: function (xhr) {
                        // 捕捉所有其他狀態碼
                        toastr.error(TimelogTag + "系統問題導致失敗");
                    },
                },
                success: function (v) {
                    if (TestModel) {
                        console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                        // toastr.success(TimelogTag + "成功");
                    }
                    if (TestModel) {
                        console.log("● Reques-" + TimelogTag + " : ", v);
                    }
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
        },
    });
}

function SetUpError(errorInfo) {
    $(function () {
        $("body").append(
            '<div class="modal fade" id="reloginModal" tabindex="-1" data-backdrop="static" data-keyboard="false" ole="dialog" aria-labelledby="reloginModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="reloginModalLabel">錯誤</h5></div><div class="modal-body">' +
                errorInfo +
                '，請重新登入以繼續使用系統。</div><div class="modal-footer"><button type="button" class="btn btn-primary toLogin" >重新登入</button></div></div></div></div>'
        );
        $("#reloginModal").modal("show");
    });
}
//加密
const secretKey = "your-secure-key"; // 建議存入環境變數
// 加密函數
function encryptObject(data) {
    if (!data || typeof data !== "object") {
        SetUpError("系統錯誤");
        console.error("加密失敗：資料必須是物件-" + data);
        return;
    }
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}
// 解密函數
function decryptObject(encryptedData) {
    if (!encryptedData || typeof encryptedData !== "string") {
        SetUpError("系統錯誤");
        console.error("解密失敗：加密資料必須是字串-" + encryptedData);
        return;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    } catch (error) {
        SetUpError("系統錯誤");
        console.error("解密錯誤，可能是密鑰不匹配或加密數據格式錯誤");
        return;
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

    $("body").on("click", ".toLogin", function () {
        window.location.href = "login.html";
    });

    $("body").on("click", ".toIndex", function () {
        window.location.href = "index.html?";
    });

    $("body").on("click", ".toCart", function () {
        window.location.href = "cart.html";
    });
});
