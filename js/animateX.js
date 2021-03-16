// 能够实现元素左右移动的动画,需要元素有定位
//position为目标位置的left值
export function animateX(obj, position, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let step = (position-obj.offsetLeft)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft == position) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + "px";
    }, 10);
};

