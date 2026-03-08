const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let heartParticles = [];
let stars = [];
let burstHearts = []; 
const message = `Mi querida juli, feliz Día de la Mujer. 🌷

Quería decirte algo sencillo pero muy sincero. Me gusta verte feliz, de verdad. A veces eres un poquito cansona, un poquito complicada, y otras veces tan tierna y distraída que me sacas una sonrisa sin darte cuenta. Pero justo todo eso es lo que te hace tan única para mí.

No sé si hoy alguien ya te lo dijo, pero eres una mujer muy valiosa. Tienes una forma especial de ser que deja huella en quienes te rodean, aunque a veces tú misma no lo notes.

Solo quería recordarte que mereces cosas bonitas, tranquilidad en tu corazón y muchos motivos para sonreír. Y si hoy logro sacarte aunque sea una pequeña sonrisa con este mensaje, entonces ya valió la pena escribirte.

Que tengas un día bonito, Yurley se que es muy temprano para decirlo pero I LOVE YOU.💖`;
let charIndex = 0;
let mouse = { x: null, y: null };

// Registro de movimiento para el efecto magnetismo
window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });

function typeWriter() {
    if (charIndex < message.length) {
        document.getElementById('typing-text').textContent += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Clase para los corazones rojos (Evento de Clic)
class RedHeart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 10;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.opacity = 1;
    }
    draw() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
        ctx.font = `${this.size}px serif`;
        ctx.globalAlpha = this.opacity;
        ctx.fillText("❤️", this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

// Activar ráfaga al tocar a Snoopy
document.querySelector('.snoopy-img').addEventListener('click', (e) => {
    for(let i = 0; i < 20; i++) {
        burstHearts.push(new RedHeart(e.clientX, e.clientY));
    }
});

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.4 + 0.1;
        this.baseX = this.x;
    }
    draw() {
        this.y += this.speed;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < 100) { this.x -= dx / 15; } 
        else {
            if (this.x < this.baseX) this.x += 0.2;
            if (this.x > this.baseX) this.x -= 0.2;
        }
        if (this.y > canvas.height) this.y = -10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
    }
}

class HeartParticle {
    constructor() {
        this.t = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 2 + 0.5;
    }
    draw() {
        const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.08;
        const scale = 22 * pulse; 
        const x = 16 * Math.pow(Math.sin(this.t), 3);
        const y = -(13 * Math.cos(this.t) - 5 * Math.cos(2 * this.t) - 2 * Math.cos(3 * this.t) - Math.cos(4 * this.t));
        let posX = canvas.width / 2 + x * scale;
        let posY = canvas.height / 2 + y * scale;

        ctx.beginPath();
        ctx.arc(posX, posY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        this.t += this.speed;
    }
}

for (let i = 0; i < 150; i++) stars.push(new Star());
for (let i = 0; i < 600; i++) heartParticles.push(new HeartParticle());

function animate() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => s.draw());
    heartParticles.forEach(p => p.draw());
    
    burstHearts.forEach((h, index) => {
        h.draw();
        if (h.opacity <= 0) burstHearts.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

animate();
typeWriter();