(function () {
    // Создание канваса и добавление в DOM
    const canvas = document.createElement('canvas');
    canvas.className = 'rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomNum(max, min) {
        return Math.random() * (max - min) + min;
    }

    class GlitchLine {
        constructor(x, y, length, isVertical, speed, color, opacity) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.isVertical = isVertical;
            this.speed = speed;
            this.color = color;
            this.opacity = opacity;
        }

        draw() {
            const shake = Math.random() > 0.9 ? randomNum(-2, 2) : 0;

            ctx.beginPath();
            if (this.isVertical) {
                ctx.moveTo(this.x + shake, this.y);
                ctx.lineTo(this.x + shake, this.y + this.length);
            } else {
                ctx.moveTo(this.x, this.y + shake);
                ctx.lineTo(this.x + this.length, this.y + shake);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.stroke();
        }

        update() {
            if (this.isVertical) {
                this.y += this.speed;
                if (this.y > canvas.height) {
                    this.y = -this.length;
                    this.x = randomNum(canvas.width, 0);
                }
            } else {
                this.x += this.speed;
                if (this.x > canvas.width) {
                    this.x = -this.length;
                    this.y = randomNum(canvas.height, 0);
                }
            }

            // Удалено: случайное мерцание прозрачности
            this.draw();
        }
    }

    let glitchLines = [];
    const NUM_LINES = 140;

    for (let i = 0; i < NUM_LINES; i++) {
        const x = randomNum(canvas.width, 0);
        const y = randomNum(canvas.height, 0);
        const length = randomNum(20, 5);
        const isVertical = Math.random() > 0.5;
        const speed = randomNum(1.5, 0.3);
        const color = Math.random() > 0.5 ? '0, 255, 255' : '255, 255, 255';
        const opacity = randomNum(0.3, 0.7); // Постоянная прозрачность
        glitchLines.push(new GlitchLine(x, y, length, isVertical, speed, color, opacity));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Удалено: фоновая пульсация

        glitchLines.forEach(line => line.update());
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();
