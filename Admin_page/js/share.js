const copyRight = " 共饗有限公司. All Rights Reserved.";

const TestModel = false; //test

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
        icon: "fas fa-store",
        name: "商店管理",
        status: "",
        url: "",
        item: [
            {
                icon: "fas fa-info-circle",
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
                name: "出單排序管理",
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
    {
        icon: "fas fa-user-clock",
        name: "帳號登入記錄",
        status: "",
        url: "LogInlog.html?sid=" + storeId,
    },
    {
        icon: "fas fa-hamburger",
        name: "快速設定",
        status: "",
        url: "QuickSetup.html?sid=" + storeId,
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

    // console.log("● data-" + TimelogTag + ":", _data);

    let ApiAuto = "";

    $.ajax({
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            //Authorization: ApiAuto, // 需要的話可以加上授權標頭
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
                        "EMPAUTH":localStorage.token,
                        "X-Page-Url":window.location.href
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

//確認登入資料
function checkUserInfo() {
    // console.log(localStorage.keepLogIn, sessionStorage.keepLogIn);

    if (localStorage.keepLogIn == "true" || sessionStorage.keepLogIn == "true") {
        // sid = NULL，userinfo = NULL
        if (!storeId && localStorage.userInfo == null) {
            // 跳登入頁
            userError();
            return;
        }
        // sid != NULL，userinfo != NULL
        else if (storeId && localStorage.userInfo != null) {
            // 保留現店家
            apiWeb("/api/Store/basic-info/" + storeId, "GET", null, "更新店家資訊", function (v) {
                localStorage.storeInfo = encryptObject(v);
                if (v.status.isOpen == true) {
                    $("#OpenStatus").addClass("text-success");
                } else {
                    $("#OpenStatus").addClass("text-danger");
                }
            });
        }
        // sid = NULL，userinfo != NULL
        else if (!storeId && localStorage.userInfo != null) {
            // 選擇店家
            let data = {
                encryptedId: decryptObject(localStorage.userInfo).id,
            };
            apiWeb(
                "/api/Login/quick-admin-login",
                "POST",
                JSON.stringify(data),
                "取得所有店家",
                function (v) {
                    // console.log(v.stores);
                    selectedStore(v.stores, "local");
                }
            );
            return;
        }
        // sid != NULL，userinfo = NULL
        else if (storeId && localStorage.userInfo == null) {
            // 跳登入頁
            userError();
            return;
        }
    } else {
        window.location.href = "login.html";
    }
}
function selectedStore(List, place) {
    // console.log(List);

    $("body").append(
        '<div class="modal fade" id="reloginModal" tabindex="-1" data-backdrop="static" data-keyboard="false" ole="dialog" aria-labelledby="reloginModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="reloginModalLabel">選擇管理店家</h5></div><div class="modal-body"><select class="form-control" id="selectStore"><option>-- 請選擇店家 --</option></select></div><div class="modal-footer"><button type="button" class="btn btn-primary" id="checkStore">開始管理店家</button></div></div></div></div>'
    );

    for (var i = 0; i < List.length; i++) {
        // console.log(List[i]);
        $("#selectStore").append(
            '<option value="' + List[i].storeId + '">' + List[i].storeName + "</option>"
        );
    }

    $("#reloginModal").modal("show");

    $("#checkStore").click(function () {
        selectStore($("#selectStore").val(), place);
    });
}

function userError() {
    $("body").append(
        '<div class="modal fade" id="reloginModal" tabindex="-1" data-backdrop="static" data-keyboard="false" ole="dialog" aria-labelledby="reloginModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="reloginModalLabel">錯誤</h5></div><div class="modal-body">資料載入發生錯誤，請重新登入以繼續使用系統。</div><div class="modal-footer"><button type="button" class="btn btn-primary" onclick="window.location.href=' +
            "'login.html'" +
            '">重新登入</button></div></div></div></div>'
    );
    $("#reloginModal").modal("show");
}
function itemClick(obj) {
    // console.log(obj.attr("id"));
    loadingOn();
    selectStore(obj.attr("id"), "index");
}
function selectStore(Id, place) {
    // console.log("selectid: " + Id);
    // loadingOn();
    apiWeb("/api/Store/basic-info/" + Id, "GET", null, "更換店家，取得資訊", function (v) {
        // 存入 localStorage
        // console.log("選擇的商店:", foundStore);
        localStorage.storeInfo = encryptObject(v);
        console.log(place);

        // 跳轉頁面
        if (place == "index") {
            window.location.href = "index.html?sid=" + Id;
        } else if (place == "local") {
            let a = window.location.href + "?sid=" + Id;
            window.location.href = a;
        }
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
});
