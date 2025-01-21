// //未保持登入且重新開啟網頁=>需重新登入
// if (sessionStorage.userInfo == null && document.cookie == null) {
//     window.location.href = "login.html";
// }
// //保持登入但重新開啟網頁=>自動重新登入
// else if (sessionStorage.userInfo == null && document.cookie != null) {
//     sessionStorage.allStore = JSON.stringify([
//         {
//             id: "216hewjfbwkef",
//             name: "鹹酥雞 中和店",
//             address: "新北市中和區某某路二段717巷7號",
//             city: "新北市",
//             districts: "中和區",
//             road: "某某路二段717巷7號",
//             email: "abc@gmail.com",
//             tel: "02-1234-5678",
//             businessNum: "12345678",
//             introduction:
//                 '<p><strong style="background-color: rgb(230, 0, 0); color: rgb(255, 255, 255);">歡迎光臨！！</strong></p><p><strong class="ql-size-huge">現在正在買五送一！！</strong></p>',
//             tags: ["A商圈", "B商圈", "鹹酥雞", "炸物", "宵夜"],
//         },
//         {
//             id: "32yhj82904354",
//             name: "鹹酥雞 松山店",
//             address: "臺北市松山區行愛路254巷2號",
//             city: "臺北市",
//             districts: "松山區",
//             road: "行愛路254巷2號",
//             email: "abc@gmail.com",
//             tel: "02-1234-5678",
//             businessNum: "12345678",
//             introduction:
//                 '<p><strong style="background-color: rgb(230, 0, 0); color: rgb(255, 255, 255);">歡迎光臨！！</strong></p><p><strong class="ql-size-huge">現在正在買五送一！！</strong></p>',
//             tags: ["A商圈", "B商圈", "鹹酥雞", "炸物", "宵夜"],
//         },
//         {
//             id: "cmzekoa294935",
//             name: "鹹酥雞 內湖店",
//             address: "臺北市內湖區行愛路421巷9號",
//             city: "臺北市",
//             districts: "內湖區",
//             road: "行愛路421巷9號",
//             email: "abc@gmail.com",
//             tel: "02-1234-5678",
//             businessNum: "12345678",
//             introduction:
//                 '<p><strong style="background-color: rgb(230, 0, 0); color: rgb(255, 255, 255);">歡迎光臨！！</strong></p><p><strong class="ql-size-huge">現在正在買五送一！！</strong></p>',
//             tags: ["A商圈", "B商圈", "鹹酥雞", "炸物", "宵夜"],
//         },
//     ]);
//     sessionStorage.userInfo = JSON.stringify({
//         name: "winnie",
//         account: "winnieliao2567@gmail.com",
//         accountKey: "123456",
//     });
//     if (JSON.parse(sessionStorage.allStore).length != 1) {
//         $("#storeModal").modal("show");
//     }
// }
