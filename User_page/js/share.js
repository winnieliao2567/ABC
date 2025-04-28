function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // url = url.replace("%", "%20")
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ForEarth() {
    console.log("Plastic");
    if ($("#ForEarth").prop("checked")) {
        $("#ForEarthTip").removeClass("d-none");
    } else {
        $("#ForEarthTip").addClass("d-none");
    }
}
function Plastic() {
    if ($("#checkboxPlastic").prop("checked")) {
        $("#PlasticPrice").removeClass("d-none");
    } else {
        $("#PlasticPrice").addClass("d-none");
    }
}
function BtnLoading(obj) {
    obj.addClass("disabled");
    obj.html("loading.");
    var Time = 1;
    setInterval(() => {
        if (Time == 3) {
            obj.html("loading.");
            Time = 1;
        } else if (Time == 1) {
            obj.html("loading..");
            Time = 2;
        } else if (Time == 2) {
            obj.html("loading...");
            Time = 3;
        }
    }, 500);
}
function sameUser() {
    if ($("#sameUser").prop("checked")) {
        $("#Subscriber").addClass("disabled").val("Winnie");
        $("#SubscriberNum").addClass("disabled").val("0912345678");
    } else {
        $("#Subscriber").removeClass("disabled").val("");
        $("#SubscriberNum").removeClass("disabled").val("");
    }
}
const baseURL = "https://202.182.109.207/api/";
function apiWeb(_url, _type, _data, TimelogTag, _fun) {
    console.time("● API-" + TimelogTag + "(" + baseURL + _url + ")");
    console.log("● data-" + TimelogTag + ":", _data);
    if (_url == "_url") {
        if (_fun) _fun(v);
    } else {
        $.ajax({
            type: _type == "" ? "POST" : _type,
            // headers: {
            //     "Content-Type": "application/json; charset=utf-8",
            //     // Authorization: localStorage.token, // 需要的話可以加上授權標頭
            // },
            contentType: "application/json",
            url: baseURL + _url,
            data: _data,
            statusCode: {
                403: function (xhr) {
                    console.timeEnd("● API-" + TimelogTag + "(" + baseURL + _url + ")");
                    console.log("Forbidden (403):", xhr);
                    window.location.href = "403.html";
                },
                404: function (xhr) {
                    console.timeEnd("● API-" + TimelogTag + "(" + baseURL + _url + ")");
                    console.log("Not Found (404):", xhr);
                    window.location.href = "404.html";
                },
                500: function (xhr) {
                    console.timeEnd("● API-" + TimelogTag + "(" + baseURL + _url + ")");
                    console.log("Server Error (500):", xhr);
                    window.location.href = "405.html";
                },
            },
            success: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + baseURL + _url + ")");
                if (_fun) _fun(v);
            },
            error: function (v) {
                console.timeEnd("● API-" + TimelogTag + "(" + baseURL + _url + ")");
                console.log("Error:", JSON.stringify(v));
            },
        });
    }
}

$(function () {
    //const baseURI = `${window.location.protocol}//${window.location.host}`;
    const baseURI = `https://localhost:7063`;
    $(".logoToIndex").click(function () {
        window.location = "index.html";
    });

    $("#register_register").click(function () {
        localStorage.clear("userInformation");
        //window.location = "login.html";
    });

    // $("#menuBtn").click(function () {
    $(".navbar-toggler").click(function () {
        if ($("#menuBtn").attr("src") == "img/menu.svg") {
            $("#menuBtn").attr("src", "img/menuX.svg");
        } else {
            $("#menuBtn").attr("src", "img/menu.svg");
        }
    });
    $("body").on("click", ".TradeImformation", function () {
        var TradeId = $(this).attr("id");
        window.location = "historyImformaiton.html?trade=" + TradeId;
    });
    $(".ToLogOut").click(function () {
        localStorage.clear("userInformation");
        window.location = "login.html";
    });
    $(".ToUserAccount").click(function () {
        window.location = "userAccount.html";
    });
    $(".ToHistoryList").click(function () {
        window.location = "historyList.html";
    });
    $(".editBtn").click(function () {
        if ($(this).hasClass("dis") == true) {
            var id = $(this).attr("data-edit");
            $("#" + id)
                .removeClass("disabled")
                .focus();
            $('img[data-edit="' + id + '"]').attr("src", "img/check.svg");
            $(this).removeClass("dis");
        } else {
            var id = $(this).attr("data-edit");
            $("#" + id).addClass("disabled");
            $('img[data-edit="' + id + '"]').attr("src", "img/edit-3.svg");
            $(this).addClass("dis");
        }
    });
    $("body").on("click", ".salesItem", function () {
        var type = $(this).attr("data-type");
        var title = $(this).attr("data-title");

        window.location = "ClassImformation.html?type=" + type + "&title=" + title;
    });
    $("body").on("click", ".TypeItem", function () {
        var type = $(this).attr("data-type");
        var title = $(this).attr("data-title");

        window.location = "ClassImformation.html?type=" + type + "&title=" + title;
    });

    $("body").on("click", ".StoreItem", function () {
        var id = $(this).attr("data-id");

        window.location = "StoreImformation.html?id=" + id;
    });

    $("body").on("click", ".tabBtn", function () {
        var key = $(this).attr("data-tabs");
        $(".tabBtn").removeClass("active");
        $(this).addClass("active");
        $(".tabPage").removeClass("active");
        $('.tabPage[data-tabs="' + key + '"]').addClass("active");
    });

    $("#addCountToCart-plus").click(function () {
        if ($("#addCountToCart").val() >= 1) {
            var val = $("#addCountToCart").val();
            // console.log(val);
            val++;
            $("#addCountToCart").attr("value", val);
            if ($("#addCountToCart").val() > 1) {
                $("#addCountToCart-educe").removeClass("disabled");
            }
        }
    });
    $("#addCountToCart-educe").click(function () {
        if ($("#addCountToCart").val() > 0) {
            var val = $("#addCountToCart").val();
            // console.log(val);
            val--;
            $("#addCountToCart").attr("value", val);
            if ($("#addCountToCart").val() == 1) {
                $("#addCountToCart-educe").addClass("disabled");
            }
        }
    });
    $(".goToCart").click(function () {
        var storeId = getParameterByName("id");
        window.location = "cart.html";
    });
    $("#continueToOrder").click(function () {
        var id = getParameterByName("id");
        console.log(id);
        window.location = "StoreImformation.html?id=" + id;
    });
    $("#goToCheckOut").click(function () {
        var id = getParameterByName("id");
        console.log(id);
        window.location = "pay.html?id=" + id;
    });
    $("#suerToCart").click(function () {
        BtnLoading($(this));
        setTimeout(() => {
            window.location = "orderInfo.html";
        }, 3000);
    });
});
