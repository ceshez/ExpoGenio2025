"use client";
import React, { useRef, useEffect, useState } from 'react';

interface Alien {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Bullet {
  x: number;
  y: number;
  w: number;
  h: number;
}

const SpaceInvaders: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number>(0);

  // Estado de UI
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  // Estado del juego (useRef para mutar sin re-render)
  const gameRef = useRef({
    playerX: 0,
    playerY: 0,
    playerW: 40,
    playerH: 20,
    aliens: [] as Alien[],
    alienDirection: 1,
    alienSpeedX: 1,
    alienSpeedY: 10,
    alienFireInterval: 1000,
    lastAlienFireTime: 0,
    playerBullets: [] as Bullet[],
    alienBullets: [] as Bullet[],
    playerBulletSpeed: 5,
    alienBulletSpeed: 3,
    invulnerableUntil: 0,
    leftPressed: false,
    rightPressed: false,
    isPaused: false,
    isGameOver: false,
    lastFrameTime: 0,
    lives: 3,
    level: 1,
    score: 0
  });

  // Inicializar aliens para un nivel
  const initLevel = () => {
    const g = gameRef.current;
    // Crear formación de aliens (ej. 6 columnas x 4 filas)
    const cols = 6;
    const rows = 4;
    const alienW = 30, alienH = 20;
    const spacingX = 10, spacingY = 10;
    const startX = 50;
    const startY = 30;
    g.aliens = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        g.aliens.push({
          x: startX + c * (alienW + spacingX),
          y: startY + r * (alienH + spacingY),
          w: alienW,
          h: alienH
        });
      }
    }
    g.alienDirection = 1;
    // Ajustar dificultad según nivel
    g.alienSpeedX = 1 + (g.level - 1) * 0.2;
    g.alienSpeedY = 10;
    g.alienFireInterval = Math.max(200, 1000 - (g.level - 1) * 100);
    g.lastAlienFireTime = 0;
    // Limpiar balas existentes
    g.playerBullets = [];
    g.alienBullets = [];
    // Reposicionar jugador al centro inferior
    if (canvasRef.current) {
      g.playerX = canvasRef.current.width / 2 - g.playerW / 2;
      g.playerY = canvasRef.current.height - g.playerH - 10;
    }
    // Nota: vidas y score se mantienen; nivel ya está actualizado.
  };

  // Reiniciar juego completo
  const resetGame = () => {
    const g = gameRef.current;
    setScore(0);
    setLevel(1);
    setLives(3);
    g.score = 0;
    g.level = 1;
    g.lives = 3;
    g.isGameOver = false;
    g.isPaused = false;
    g.invulnerableUntil = 0;
    initLevel();
  };

  // Disparar bala del jugador
  const shootBullet = () => {
    const g = gameRef.current;
    if (g.playerBullets.length < 1) {
      const bulletW = 4, bulletH = 10;
      g.playerBullets.push({
        x: g.playerX + g.playerW / 2 - bulletW / 2,
        y: g.playerY - bulletH,
        w: bulletW,
        h: bulletH
      });
    }
  };

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const g = gameRef.current;
      // Evitar scroll con flechas/espacio
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " "].includes(e.key)) {
        e.preventDefault();
      }
      const key = e.key;
      switch (key) {
        case "ArrowLeft":
        case "a":
        case "A":
          g.leftPressed = true;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          g.rightPressed = true;
          break;
        case "ArrowUp":
          shootBullet();
          break;
        default:
          break;
      }
      // Disparo con tecla espacio
      if (e.code === "Space") {
        shootBullet();
      }
      // Pausa con 'P'
      if (key.toLowerCase() === "p") {
        g.isPaused = !g.isPaused;
        if (!g.isPaused) {
          // Al reanudar, resetear tiempo para evitar salto
          g.lastFrameTime = 0;
        }
      }
      // Reinicio con 'R'
      if (key.toLowerCase() === "r") {
        if (g.isGameOver) {
          resetGame();
          // Reiniciar loop si estaba detenido
          if (animationRef.current === 0) {
            animationRef.current = requestAnimationFrame(gameLoop);
          }
        } else {
          // Permitir reiniciar aunque no haya game over
          resetGame();
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const g = gameRef.current;
      const key = e.key;
      switch (key) {
        case "ArrowLeft":
        case "a":
        case "A":
          g.leftPressed = false;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          g.rightPressed = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Bucle principal del juego
  const gameLoop = (timestamp: number) => {
    const g = gameRef.current;
    const ctx = contextRef.current;
    if (!ctx || !canvasRef.current) return;
    // Game Over: mostrar mensaje y no continuar loop
    if (g.isGameOver) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // Dibujar estado final (aliens restantes y jugador)
      ctx.fillStyle = "#0f0";
      g.aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alien.w, alien.h);
      });
      ctx.fillStyle = "white";
      ctx.fillRect(g.playerX, g.playerY, g.playerW, g.playerH);
      ctx.fillStyle = "white";
      g.playerBullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });
      ctx.fillStyle = "red";
      g.alienBullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });
      // Mensaje Game Over
      ctx.fillStyle = "white";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasRef.current.width / 2, canvasRef.current.height / 2);
      ctx.fillText("Presiona R para reiniciar", canvasRef.current.width / 2, canvasRef.current.height / 2 + 30);
      animationRef.current = 0;
      return;
    }
    // Pausa: mostrar texto y no actualizar estado
    if (g.isPaused) {
      ctx.fillStyle = "white";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PAUSA", canvasRef.current.width / 2, canvasRef.current.height / 2);
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    // Calcular delta (opcional, no se usa para velocidades fijas)
    let dt = 0;
    if (g.lastFrameTime) {
      dt = timestamp - g.lastFrameTime;
    }
    g.lastFrameTime = timestamp;
    // Mover jugador según input
    const canvasWidth = canvasRef.current.width;
    const moveSpeed = 3;
    if (g.leftPressed) {
      g.playerX -= moveSpeed;
      if (g.playerX < 0) g.playerX = 0;
    }
    if (g.rightPressed) {
      g.playerX += moveSpeed;
      if (g.playerX + g.playerW > canvasWidth) {
        g.playerX = canvasWidth - g.playerW;
      }
    }
    // Mover aliens
    let hitEdge = false;
    g.aliens.forEach(alien => {
      alien.x += g.alienDirection * g.alienSpeedX;
      if (alien.x < 0 || alien.x + alien.w > canvasWidth) {
        hitEdge = true;
      }
    });
    if (hitEdge) {
      g.aliens.forEach(alien => {
        alien.y += g.alienSpeedY;
      });
      g.alienDirection *= -1;
    }
    // Disparos de aliens
    if (timestamp - g.lastAlienFireTime > g.alienFireInterval && g.aliens.length > 0) {
      g.lastAlienFireTime = timestamp;
      const aliensAlive = g.aliens;
      const shooter = aliensAlive[Math.floor(Math.random() * aliensAlive.length)];
      g.alienBullets.push({
        x: shooter.x + shooter.w / 2 - 2,
        y: shooter.y + shooter.h,
        w: 4,
        h: 10
      });
    }
    // Mover balas
    g.playerBullets.forEach(b => {
      b.y -= g.playerBulletSpeed;
    });
    g.alienBullets.forEach(b => {
      b.y += g.alienBulletSpeed;
    });
    // Eliminar balas fuera de pantalla
    g.playerBullets = g.playerBullets.filter(b => b.y + b.h >= 0);
    g.alienBullets = g.alienBullets.filter(b => b.y <= canvasRef.current!.height);
    // Colisiones bala jugador vs aliens
    for (let i = 0; i < g.playerBullets.length; i++) {
      const b = g.playerBullets[i];
      for (let j = 0; j < g.aliens.length; j++) {
        const a = g.aliens[j];
        if (b.x < a.x + a.w && b.x + b.w > a.x && b.y < a.y + a.h && b.y + b.h > a.y) {
          // Impacto: eliminar alien y bala
          g.aliens.splice(j, 1);
          g.playerBullets.splice(i, 1);
          i--;
          // Sumar puntaje
          g.score += 10;
          setScore(g.score);
          break;
        }
      }
    }
    // Colisiones bala alien vs jugador
    for (let i = 0; i < g.alienBullets.length; i++) {
      const b = g.alienBullets[i];
      const pX = g.playerX, pY = g.playerY, pW = g.playerW, pH = g.playerH;
      if (b.x < pX + pW && b.x + b.w > pX && b.y < pY + pH && b.y + b.h > pY) {
        // Impacto al jugador
        g.alienBullets.splice(i, 1);
        i--;
        if (timestamp >= g.invulnerableUntil) {
          g.lives -= 1;
          setLives(g.lives);
          if (g.lives <= 0) {
            g.isGameOver = true;
          } else {
            // Aún tiene vidas: activar invulnerabilidad
            g.invulnerableUntil = timestamp + 2000;
            g.playerX = canvasWidth / 2 - g.playerW / 2; // reubicar nave al centro
            g.alienBullets = []; // eliminar balas enemigas restantes para evitar daño inmediato
          }
        }
      }
    }
    // Verificar invasión alien (Game Over si alien toca la línea del jugador)
    g.aliens.forEach(a => {
      if (a.y + a.h >= g.playerY) {
        g.isGameOver = true;
      }
    });
    // Pasar de nivel si no quedan aliens
    if (!g.isGameOver && g.aliens.length === 0) {
      g.level += 1;
      setLevel(g.level);
      initLevel();
    }
    // Renderizar frame
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // Fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // Aliens
    ctx.fillStyle = "#0f0";
    g.aliens.forEach(alien => {
      ctx.fillRect(alien.x, alien.y, alien.w, alien.h);
    });
    // Jugador (parpadeo si invulnerable)
    if (timestamp < g.invulnerableUntil) {
      if (Math.floor(timestamp / 100) % 2 === 0) {
        ctx.fillStyle = "white";
        ctx.fillRect(g.playerX, g.playerY, g.playerW, g.playerH);
      }
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(g.playerX, g.playerY, g.playerW, g.playerH);
    }
    // Balas del jugador
    ctx.fillStyle = "white";
    g.playerBullets.forEach(b => {
      ctx.fillRect(b.x, b.y, b.w, b.h);
    });
    // Balas de aliens
    ctx.fillStyle = "red";
    g.alienBullets.forEach(b => {
      ctx.fillRect(b.x, b.y, b.w, b.h);
    });
    // Solicitar próximo frame
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    // Configurar canvas y contexto 2D
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }
    // Ajustar tamaño inicial del canvas
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const width = containerRef.current.clientWidth;
        const height = (width * 2) / 3;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        // Reubicar jugador al nuevo tamaño
        const g = gameRef.current;
        g.playerX = width / 2 - g.playerW / 2;
        g.playerY = height - g.playerH - 10;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // Iniciar juego
    initLevel();
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Estilos de los botones
  const buttonStyle: React.CSSProperties = {
padding: "8px 14px",
margin: "0 6px",
fontSize: "16px",
borderRadius: "6px",
background: "#1e293b",
color: "white",
border: "none"
};


return (
<div style={{ background: "black", color: "white", fontFamily: "sans-serif", padding: "10px" }}>
<div style={{ textAlign: "center", marginBottom: "8px", fontSize: "18px" }}>
Vidas: {lives} &nbsp; Puntos: {score} &nbsp; Nivel: {level}
</div>
<div
ref={containerRef}
style={{
width: "min(90vmin, 90vw)",
height: "min(60vmin, 60vw)",
position: "relative",
margin: "0 auto"
}}
>
<canvas
ref={canvasRef}
style={{ width: "100%", height: "100%", display: "block", background: "#0b1021" }}
/>
<div style={{ textAlign: "center", marginTop: "8px" }}>
<button
style={buttonStyle}
onPointerDown={(e) => {
e.preventDefault();
gameRef.current.leftPressed = true;
(e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
}}
onPointerUp={(e) => {
gameRef.current.leftPressed = false;
(e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
}}
>
◀
</button>
<button
style={buttonStyle}
onPointerDown={(e) => {
e.preventDefault();
shootBullet();
}}
>
FUEGO
</button>
<button
style={buttonStyle}
onPointerDown={(e) => {
e.preventDefault();
gameRef.current.rightPressed = true;
(e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
}}
onPointerUp={(e) => {
gameRef.current.rightPressed = false;
(e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
}}
>
▶
</button>
</div>
</div>
</div>
);
}
export default SpaceInvaders;
