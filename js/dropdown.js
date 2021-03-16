import { move } from "/js/tools.js";
const dropdown = document.querySelectorAll(".shortcut .fr .dd");
for (let i = 0; i < dropdown.length; i++) {
    let head = dropdown[i].children[0];
    let body = dropdown[i].children[1];
    head.addEventListener("mouseenter", function () {
        // body.style.height = "auto";
        let itemCount = body.children.length;
        let itemHeight = parseInt(getComputedStyle(body.children[0])["height"]);
        let target = itemCount*itemHeight;//动态计算dorpdown中body的高度
        move(body, "height", target, 20);
    });
    dropdown[i].addEventListener("mouseleave", function () {
        // body.style.height = "0";
        move(body, "height", 0, 20);
    });
}