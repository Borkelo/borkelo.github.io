const fish = document.getElementById("fish");
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const speed = 5;

document.addEventListener("mousemove", (e) => {
    targetX = e.clientX - fish.offsetWidth / 2;
    targetY = e.clientY - fish.offsetHeight / 2;
});

fish.addEventListener("mouseenter", () =>{
    window.location.href ="../"
});

function animate(){
    let dx = targetX - currentX;
    let dy = targetY - currentY;
    
    let distance = Math.sqrt(dx * dx + dy * dy); 

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