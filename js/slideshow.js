// import { animateX } from "/js/animateX.js";
import { move } from "/js/tools.js";
// 获取节点
const slideShow = document.querySelector(".slideShow");
const arrowLeft = document.querySelector(".slideShow .arrowLeft");
const arrowRight = document.querySelector(".slideShow .arrowRight");
let imgs = document.querySelectorAll(".slideShow .slide");
const slides = document.querySelector(".slideShow ul.slides");
const indicators = document.querySelector(".slideShow ul.sliderIndicators");
// const sliderIndicators = document.querySelectorAll(".sliderIndicators li");

// 动态获取图片的宽度
const imgWidth = slideShow.offsetWidth;

let imgIndex = 0;//当前图片的索引
let left = 0;//当前图片的偏移
let flag = true;//设置节流阀

// 动态生成小圆点,并绑定事件
for (let i = 0; i < imgs.length; i++) {
    let li = document.createElement("li");
    indicators.appendChild(li);
    li.index = i;
    li.addEventListener("click", function () {
        // for(let j = 0; j < indicators.children.length; j++) {
        //     indicators.children[j].className = "";
        // }
        // for(let i in indicators.children) {
        //     indicators.children[i].className = "";
        // }
        // this.className = "selected";
        indicatorChange(this.index);
        left = -(this.index) * imgWidth;
        imgIndex = this.index;
        // animateX(slides, left);
        // move(slides, "left", left, 100);
        slides.style.left = left + "px";
    });
}
indicators.children[0].className = "selected";
indicatorChange(0);


//克隆第一张图片
let imgClone = slides.children[0].cloneNode(true);
slides.appendChild(imgClone);
imgs = document.querySelectorAll(".slideShow .slide");
//动态设置slides的宽度
slides.style.width = imgs.length * 100 + "%";

// 为节点绑定事件
// slideShow.addEventListener("mouseover", function() {
//     arrowRight.style.display = "block";
//     arrowLeft.style.display = "block";
// });

arrowLeft.addEventListener("click", function () {
    // indicatorChange("remove", index);
    // index = index<=0?4:index-1;
    // // console.log(index);
    // slide.src = imgs[index];
    // indicatorChange("add", index);
    if (flag == true) {
        flag = false;
        prevImg();
        indicatorChange(imgIndex);
    }
});
arrowRight.addEventListener("click", function () {
    // indicatorChange("remove", index);
    // index = ++index%5;
    // slide.src = imgs[index];
    // indicatorChange("add", index);
    if (flag == true) {
        flag = false;
        nextImg();
        indicatorChange(imgIndex);
    }
});
//鼠标停留在图片上时,自动播放停止并清空计时
slides.addEventListener("mouseenter", function () {
    clearInterval(timer);
});
slides.addEventListener("mouseleave", function () {
    timer = setInterval(function () {
        arrowRight.click();
    }, 2000);
});


function nextImg() {
    // if (slides.offsetLeft <= -(imgs.length - 1) * imgWidth) {
    //     slides.style.left = "0";
    //     // animateX(slides, 0);
    // }
    // else {
    //     slides.style.left = slides.offsetLeft + -imgWidth + "px";
    //     // animateX(slides, slides.offsetLeft + -imgWidth);
    //     console.log(slides.offsetLeft);
    // }
    //下一张图片的偏移量=(当前偏移量-单图片宽度)%全部图片的宽度
    // slides.style.left = (slides.offsetLeft - imgWidth) % (imgWidth * imgs.length) + "px";
    // let left = (slides.offsetLeft - imgWidth) % (imgWidth * imgs.length);
    // if(imgIndex == imgs.length-1) {
    //     imgIndex = 1;
    //     slides.style.left = "0";
    //     left = -imgIndex*imgWidth;
    //     slides.style.left = "0";
    //     animateX(slides, left);
    // }
    // else {
    //     imgIndex++;
    //     left = -imgIndex*imgWidth;
    //     animateX(slides, left);
    // }

    // if (++imgIndex == imgs.length - 1) {
    //     left = -imgIndex * imgWidth;
    //     animateX(slides, left, function () {
    //         flag = true;
    //         slides.style.left = "0px";
    //         imgIndex = 0;
    //     });
    // }
    // else {
    //     left = -imgIndex * imgWidth;
    //     animateX(slides, left, function () {
    //         flag = true;
    //     });
    // }

    imgIndex++;
    left = -imgIndex * imgWidth;
    if (imgIndex == imgs.length - 1) {
        // animateX(slides, left, function () {
        //     flag = true;
        //     slides.style.left = "0px";//这个写在函数后面会出bug;想了好久终于得出这样的解决方案
        // });
        move(slides, "left", left, 50, function() {
            flag = true;
            slides.style.left = "0px";//这个写在函数后面会出bug;想了好久终于得出这样的解决方案
        });
        imgIndex = 0;
    }
    else {
        // animateX(slides, left, function () {
        //     flag = true;
        // });
        move(slides, "left", left, 50, function() {
            flag = true;
        })
    }


    // if (imgIndex == imgs.length - 1) {
    //     slides.style.left = "1px";
    //     imgIndex = 0;
    // }
    // imgIndex++;
    // left = -imgIndex * imgWidth;
    // animateX(slides, left, function () {
    //     flag = true;
    // });
}

function prevImg() {
    // if (slides.offsetLeft >= 0) {
    //     slides.style.left = -(imgs.length - 1) * imgWidth + "px";
    // }
    // else {
    //     slides.style.left = slides.offsetLeft + imgWidth + "px";
    // }
    //前一张图片的偏移量=(当前偏移量-单图片宽度*(图片数量-1))%全部图片的宽度
    // slides.style.left =  (slides.offsetLeft-(imgWidth*(imgs.length-1))) %(imgWidth*imgs.length)  +"px";
    // let left = (slides.offsetLeft - (imgWidth * (imgs.length - 1))) % (imgWidth * imgs.length);

    if (imgIndex == 0) {
        slides.style.left = -(imgs.length - 1) * imgWidth + "px";
        imgIndex = imgs.length - 1;
    }
    imgIndex--;
    left = -imgIndex * imgWidth;
    // animateX(slides, left, function () {
    //     flag = true;
    // });
    move(slides, "left", left, 50, function() {
        flag = true;
    });
    // imgIndex--;//好迷啊,这样写为什么animate不执行?
    // if (imgIndex == -1) {
    //     imgIndex = imgs.length - 1;
    //     slides.style.left = -imgIndex * imgWidth + "px";
    //     imgIndex--;
    // }
    // left = -imgIndex * imgWidth + "px";
    // animateX(slides, left, function () {
    //     flag = true;
    // });
    console.log(imgIndex);
}

//使对应index的小圆点添加selected
function indicatorChange(index) {
    for (let i = 0; i < indicators.children.length; i++) {
        indicators.children[i].className = "";
    }
    indicators.children[index].className = "selected";
}

// 设置自动播放
let timer = setInterval(function () {
    if(flag) {
        arrowRight.click();
    }
}, 3000);