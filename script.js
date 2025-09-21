// --- Fondo estrellado con estrellas fugaces ---
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
let stars = [], shootingStars = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener("resize", resize); resize();
for (let i = 0; i < 200; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 }); }
function drawStars() {
    ctx.fillStyle = "black"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
        ctx.globalAlpha = Math.random();
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI); ctx.fill();
    });
    ctx.globalAlpha = 1;
}
function spawnShootingStar() {
    const y = Math.random() * canvas.height / 2;
    shootingStars.push({ x: Math.random() * canvas.width, y: y, len: 300, spd: 15 });
}
function drawShootingStars() {
    shootingStars.forEach((s, i) => {
        ctx.strokeStyle = "white"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.len, s.y + s.len / 5); ctx.stroke();
        s.x += s.spd * -1; s.y += s.spd * 0.2;
        if (s.x < -s.len || s.y > canvas.height + 50) shootingStars.splice(i, 1);
    });
}
setInterval(() => { if (Math.random() < 0.1) spawnShootingStar() }, 1000);
function animate() { drawStars(); drawShootingStars(); requestAnimationFrame(animate); }
animate();

// --- Mensajes secuenciales y eventos ---
document.addEventListener("DOMContentLoaded", () => {
    const msgs = "Hola María- eres una persona muy especial para mi- te quiero con todo mi corazón- todo mi amor es tuyo- esta vez no te puedes quedar sin tus flores amrillas- te mereces esto y mucho mas -esto es para ti espero te guste - y es importante que sepas- que son mas que flores".split("-");
    const msgEl = document.getElementById("message");
    const giftContainer = document.querySelector(".gift-container");
    const btn = document.getElementById("openGiftBtn");
    const wreathContainer = document.querySelector(".wreath-container");
    const centerText = document.querySelector(".center-text");
    let msgIdx = 0;

    function showMessage() {
        if (msgIdx < msgs.length) {
            msgEl.textContent = msgs[msgIdx].trim();
            msgEl.style.animation = "none";
            void msgEl.offsetWidth;
            msgEl.style.animation = "fadeInOut 3s ease forwards";
            msgIdx++;
            setTimeout(showMessage, 3000);
        } else {
            giftContainer.classList.remove("hidden");
        }
    }

    btn.addEventListener("click", () => {
        giftContainer.classList.add("hidden");
        wreathContainer.classList.remove("hidden");
        centerText.classList.remove("hidden");
        setTimeout(() => {
            wreathContainer.classList.add("visible");
            centerText.classList.add("visible");
            createWreath();
        }, 50);
    });

    function createWreath() {
        const wreathInner = document.querySelector('.wreath-inner');
        const numFlowers = 6;
        const radius = 250;

        for (let i = 0; i < numFlowers; i++) {
            const angle = (360 / numFlowers) * i;
            const x = radius * Math.cos(angle * Math.PI / 180);
            const y = radius * Math.sin(angle * Math.PI / 180);
            
            const flower = document.createElement('div');
            flower.classList.add('wreath-element', 'flower');
            flower.style.left = "50%";
            flower.style.top = "50%";
            flower.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            
            // Pétalos
            const numPetals = 12;
            const petalRadius = 25; // Distancia del pétalo al centro de la flor
            for(let j = 0; j < numPetals; j++){
                const petal = document.createElement('div');
                petal.classList.add('flower-petal');
                const petalAngle = (360 / numPetals) * j;
                const petalX = petalRadius * Math.cos(petalAngle * Math.PI / 180 - Math.PI/2);
                const petalY = petalRadius * Math.sin(petalAngle * Math.PI / 180 - Math.PI/2);
                petal.style.transform = `translate(${petalX}px, ${petalY}px) rotate(${petalAngle}deg)`;
                flower.appendChild(petal);
            }
            
            // Centro
            const center = document.createElement('div');
            center.classList.add('flower-center');
            flower.appendChild(center);
            
            wreathInner.appendChild(flower);
        }
    }

    showMessage();

});
