<template>
  <canvas
    ref="canvas"
    style="position: fixed; left: 0; top: 0; pointer-events: none; z-index: 999999"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let animationFrameId = null;
let particles = [];
let circles = [];
const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

// 设置画布大小
function setCanvasSize() {
  const canvasEl = canvas.value;
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + "px";
  canvasEl.style.height = window.innerHeight + "px";
  canvasEl.getContext("2d").scale(2, 2);
}

// 创建粒子
function createParticle(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 3;
  const radius = 4 + Math.random() * 8;
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    x,
    y,
    radius,
    color,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    life: 100 + Math.random() * 100, // 生命周期
    currentLife: 0,
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.currentLife++;
      this.radius *= 0.98; // 逐渐缩小

      // 根据生命周期调整透明度
      const progress = this.currentLife / this.life;
      if (progress > 0.5) {
        this.radius *= 0.95;
      }

      return this.currentLife < this.life;
    }
  };
}

// 创建圆形扩散效果
function createCircle(x, y) {
  const radius = 5 + Math.random() * 10;
  const color = "#FFF";

  return {
    x,
    y,
    radius,
    color,
    maxRadius: 80 + Math.random() * 80,
    lineWidth: 6,
    alpha: 0.5,
    speed: 1 + Math.random(),
    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    update() {
      this.radius += this.speed * 2;
      this.alpha *= 0.97;
      this.lineWidth *= 0.98;
      return this.radius < this.maxRadius && this.alpha > 0.01;
    }
  };
}

// 创建随机圆形
function createRandomCircle(x, y) {
  const radius = 1;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const maxRadius = 50 + Math.random() * 40;

  return {
    x,
    y,
    radius,
    color,
    maxRadius,
    alpha: 1,
    speed: 1 + Math.random(),
    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    },
    update() {
      this.radius += this.speed * 3;
      this.alpha *= 0.96;
      return this.radius < this.maxRadius && this.alpha > 0.01;
    }
  };
}

// 动画循环
function animate() {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // 更新并绘制粒子
  particles = particles.filter(particle => {
    particle.update();
    particle.draw(ctx);
    return particle.currentLife < particle.life;
  });

  // 更新并绘制圆形
  circles = circles.filter(circle => {
    const shouldKeep = circle.update();
    circle.draw(ctx);
    return shouldKeep;
  });

  animationFrameId = requestAnimationFrame(animate);
}

// 处理点击事件
function handleClick(e) {
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  // 创建粒子
  for (let i = 0; i < 20; i++) {
    particles.push(createParticle(x, y));
  }

  // 创建圆形扩散效果
  circles.push(createCircle(x, y));

  // 创建随机圆形
  circles.push(createRandomCircle(x, y));
}

onMounted(() => {
  setCanvasSize();
  const tapEvent = "ontouchstart" in window ? "touchstart" : "mousedown";
  window.addEventListener(tapEvent, handleClick);
  window.addEventListener("resize", setCanvasSize);
  animate();
});

onUnmounted(() => {
  const tapEvent = "ontouchstart" in window ? "touchstart" : "mousedown";
  window.removeEventListener(tapEvent, handleClick);
  window.removeEventListener("resize", setCanvasSize);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>