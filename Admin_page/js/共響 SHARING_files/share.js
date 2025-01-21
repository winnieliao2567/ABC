const copyRight = " 共響有限公司. All Rights Reserved.";
const version = "1.0.1";

function loadingOff() {
    console.log("移除遮罩");

    $(".preloader").css("height", 0);
    setTimeout(function () {
        $(".preloader").children().hide();
    }, 200);
}
function loadingOn() {
    console.log("顯示遮罩");
    $(".preloader").css("height", "auto");
    setTimeout(function () {
        $(".preloader").children().show();
    }, 200);
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
            url: _url,
            data: _data,
            statusCode: {
                403: function (xhr) {
                    console.log("Forbidden (403):", xhr);
                },
                404: function (xhr) {
                    console.log("Not Found (404):", xhr);
                },
                500: function (xhr) {
                    console.log("Server Error (500):", xhr);
                },
            },
            success: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                if (_fun) _fun(v);
            },
            error: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + _url + ")");
                console.log("Error:", JSON.stringify(v));
            },
        });
    }
}

//確認登入資料
function checkUserInfo() {
    if (
        sessionStorage.userInfo == null ||
        sessionStorage.storeInfo == null ||
        sessionStorage.allStore == null ||
        sessionStorage.userFunction == null
    ) {
        $("#reloginModal").modal("show");
        loadingOff();
    } else {
        loadingOff();
    }
}

$(function () {
    //copyRight
    $("#copyRight").text("© " + moment().format("YYYY") + copyRight);

    $("#version").text("version " + version);

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
});
