const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const startTime = Date.now();

function toBase(num, base){
    if(num == 0){
        return "0";
    }
    let result = [];

    while(num > 0){
        let remainder = num % base
        result.push(digits[remainder]) 
        num = Math.floor(num / base);
    }
    return result.reverse().join('');
}

function updateContent(){
    let timeElapsed = Math.round((Date.now() - startTime) / 1000);

    for (let base = 2; base <= 36; base++) {
        let element = document.getElementById(`base${base}`);
        if (element) {
            element.textContent = toBase(timeElapsed, base);
        }
    }
}

updateContent();

setInterval(updateContent, 500);

