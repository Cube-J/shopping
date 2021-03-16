//position为目标位置的top值
export function animateY(obj, position, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let step = (position-obj.offsetTop)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetTop == position) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.top = obj.offsetTop + step + "px";
    }, 10);
};