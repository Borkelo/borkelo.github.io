const fish = document.getElementById("fish");
let targetX = 1000, targetY = 1000;
let currentX = 0, currentY = 0;
const speed = 5;
const minDistance = 10;
let lost = false;

document.addEventListener("mousemove", (e) => {
    targetX = e.clientX - fish.offsetWidth / 2;
    targetY = e.clientY - fish.offsetHeight / 2;
});

document.addEventListener("mousemove", checkDistance)

function checkDistance(e){

    if(lost == true){
        return;
    }

    let fishRect = fish.getBoundingClientRect();
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (mouseX < fishRect.left && mouseX > fishRect.right &&
        mouseY < fishRect.top && mouseY > fishRect.bottom) {
            window.location.href = "../";
            lost = true;
    } 
}

function animate(){
    let dx = targetX - currentX;
    let dy = targetY - currentY;
    
    let distance = Math.sqrt(dx * dx + dy * dy); 

    if(distance < minDistance){
        window.location.href ="../"
    }

    if (distance < speed) {
        currentX = targetX;
        currentY = targetY;
    } else {
        let directionX = dx / distance;
        let directionY = dy / distance;

        currentX += directionX * speed;
        currentY += directionY * speed;
    }

    if (targetX < currentX) {
        let angle = Math.atan2(-dy, Math.abs(dx)) * 100 /Math.PI;
        fish.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg) scaleX(-1)`;
    } else {
        let angle = Math.atan2(dy, Math.abs(dx)) * 100 /Math.PI;
        fish.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg) scaleX(1)`;
    }

    requestAnimationFrame(animate);
}

animate();