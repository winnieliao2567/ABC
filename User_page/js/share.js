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

    $("#login_login").click(function () {
        var userphone = $("#login_phoneNum").val();
        var userpwd = $("#login_password").val();
        var usertoken;
        // 準備資料
        const postData = {
            MobileNumber: userphone,
            Password: userpwd,
        };
        // 發送 AJAX POST 請求
        $.ajax({
            url: baseURI + "/api/login/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                localStorage.userInformation = response.encryptedId;
                localStorage.username = response.username;
                console.log("登入成功:", response);
                window.location = "index.html";
            },
            error: function (xhr, status, error) {
                console.error("登入失敗:", error);
                alert("帳號或密碼錯誤！！！");
            },
        });
        if (userphone != "") {
            $("#empty-feedbback").hide();
            var MobileReg = /^(09)[0-9]{8}$/;
            console.log(userphone.match(MobileReg) ? true : false);
            if (userphone.match(MobileReg) ? true : false == true) {
                if (userpwd != "") {
                    if ($("#keepLogin").prop("checked")) {
                        localStorage.keepLogin = 1;
                    } else {
                        localStorage.keepLogin = 0;
                    }
                    var userInformation = "";
                    localStorage.userInformation = JSON.stringify(userInformation);
                    BtnLoading($(this));
                } else {
                    $("#storenum-feedbback").show();
                }
            } else {
                console.log("格式錯誤");
                $("#empty-feedbback").show();
            }
        } else {
            console.log("帳號為空");
            $("#empty-feedbback").show();
        }
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
    $("#goToCart").click(function () {
        var storeId = getParameterByName("id");
        window.location = "cart.html?id=" + storeId;
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
            window.location = "succes.html";
        }, 3000);
    });
});
