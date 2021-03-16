const floor = document.querySelector(".floor");
const sideBar = document.querySelector("aside.sideBar");
const floorGuide = document.querySelector("aside.sideBar .floorGuide");
const returnTop = document.querySelector("aside.sideBar .returnTop");

// const floorTop = floor.offsetTop;//楼层区距离网页顶部的距离

let floorsTop = [];//存储各个楼层距离顶部的距离
for (let i = 0; i < 3; i++) {
    floorsTop[i] = floor.children[i].offsetTop;//每个楼层区域距离整个文档顶部的距离
    // console.log("楼层 "+ (i+1)+" 距离顶部的距离是 "+floor.children[i].offsetTop);
}
sideBar.style.top = floorsTop[0] + "px";

// 使侧边栏跟随窗口滚动而变化
document.addEventListener("scroll", function () {
    //window.pageYOffset:返回文档当前沿垂直轴（即向上或向下）滚动的像素数,也就是当前可视区域顶端距离整个文档顶端的距离
    if (window.pageYOffset <= floorsTop[0]) {
        sideBar.style.position = "absolute";
        sideBar.style.top = floorsTop[0] + "px";
        return;
    }
    else if (window.pageYOffset >= floorsTop[2]) {
        changeFloor(2);
    }
    else if (window.pageYOffset >= floorsTop[1]) {
        changeFloor(1);
    }
    else if (window.pageYOffset >= floorsTop[0]) {
        changeFloor(0);
    }
    sideBar.style.position = "fixed";
    sideBar.style.top = "0px";
});

// 为侧边栏添加跳转的功能
for (let i = 0; i < floorGuide.children.length; i++) {
    floorGuide.children[i].addEventListener("click", function () {
        window.scrollTo({
            top: floorsTop[i],
            behavior: "smooth"
        });
    });
}
// 返回顶部的功能
returnTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
//使用 for in获取到的i是string类型
// for (let i in sideBar.children) {
//     console.log(typeof(i));
//     sideBar.children[i].addEventListener("click", function () {
//         window.scrollTo({
//             top: floorsTop[i],
//             behavior: "smooth"
//         });
//     });
// }

function changeFloor(target) {
    for (let i = 0; i < floorGuide.children.length; i++) {
        floorGuide.children[i].className = "";
    }
    floorGuide.children[target].className = "current";
}