// Particle system for subtle background animation
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particles");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }

  resize() {
    const oldWidth = this.canvas.width;
    const oldHeight = this.canvas.height;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Recalculate particle count based on new canvas size
    const targetParticleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 15000,
    );
    const currentParticleCount = this.particles.length;

    if (targetParticleCount > currentParticleCount) {
      // Add more particles if canvas got bigger
      const particlesToAdd = targetParticleCount - currentParticleCount;
      for (let i = 0; i < particlesToAdd; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    } else if (targetParticleCount < currentParticleCount) {
      // Remove excess particles if canvas got smaller
      this.particles.length = targetParticleCount;
    }

    // Scale particle positions to new canvas size if canvas was resized
    if (oldWidth > 0 && oldHeight > 0) {
      const scaleX = this.canvas.width / oldWidth;
      const scaleY = this.canvas.height / oldHeight;

      this.particles.forEach((particle) => {
        particle.x *= scaleX;
        particle.y *= scaleY;
      });
    }
  }

  createParticles() {
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 15000,
    );

    this.particles = []; // Clear existing particles
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= (dx / distance) * force * 2;
        particle.y -= (dy / distance) * force * 2;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(150, 150, 150, ${particle.opacity})`;
      this.ctx.fill();
    });

    // Connect nearby particles
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(150, 150, 150, ${0.1 * (1 - distance / 120)})`;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ParticleSystem();

  // Console Easter egg for developers
  console.log(
    "%c🤖 Built in collaboration with Claude AI",
    "color: #00ff00; font-size: 14px; font-family: monospace;",
  );
  console.log(
    "%c👨‍💻 Human creativity + AI efficiency = ✨",
    "color: #b3b3b3; font-size: 12px; font-family: monospace;",
  );
  console.log(
    '%c👻 Looking for secrets? Try typing "ghost"...',
    "color: #00ff00; font-size: 14px; font-family: monospace;",
  );
  console.log(
    "%c🔍 Curious about the code? Check out https://github.com/nullcoder",
    "color: #b3b3b3; font-size: 12px; font-family: monospace;",
  );

  // Add magnetic effect to link icons
  const links = document.querySelectorAll(".link");

  links.forEach((link) => {
    link.addEventListener("mousemove", (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle magnetic pull
      link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translate(0, 0)";
    });
  });

  // Optional: Add subtle parallax to hero content
  const hero = document.querySelector(".hero");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    hero.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  // Null icon interaction - morphs on click or Enter key
  const nullIcon = document.querySelector(".null-icon");
  const ghostIcon = document.querySelector(".ghost-icon");

  if (nullIcon) {
    const triggerAnimation = () => {
      nullIcon.style.transform = "scale(1.1) rotate(180deg)";
      setTimeout(() => {
        nullIcon.style.transform = "scale(1) rotate(0deg)";
      }, 300);
    };

    // Mobile long press to reveal ghost
    let pressTimer;
    let longPressTriggered = false;

    const startPress = (e) => {
      longPressTriggered = false;
      pressTimer = setTimeout(() => {
        longPressTriggered = true;
        // Trigger ghost reveal
        if (!ghostIcon.classList.contains("ghost-revealed")) {
          revealGhost();
        }
      }, 1000); // 1 second long press
    };

    const endPress = (e) => {
      clearTimeout(pressTimer);
      if (!longPressTriggered) {
        // Regular click animation
        triggerAnimation();
      }
    };

    // Touch events for mobile
    nullIcon.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault(); // Prevent text selection
        startPress(e);
      },
      { passive: false },
    );

    nullIcon.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault(); // Prevent click event
        endPress(e);
      },
      { passive: false },
    );

    nullIcon.addEventListener("touchcancel", () => clearTimeout(pressTimer));

    // Mouse events for desktop
    nullIcon.addEventListener("mousedown", startPress);
    nullIcon.addEventListener("mouseup", endPress);
    nullIcon.addEventListener("mouseleave", () => clearTimeout(pressTimer));

    // Click for regular animation (desktop only)
    nullIcon.addEventListener("click", (e) => {
      // Only trigger if not a touch event
      if (!e.sourceCapabilities || !e.sourceCapabilities.firesTouchEvents) {
        if (!longPressTriggered) {
          e.preventDefault();
          triggerAnimation();
        }
      }
    });

    nullIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerAnimation();
      }
    });
  }

  // Function to reveal ghost
  const revealGhost = () => {
    const ghostIcon = document.querySelector(".ghost-icon");
    const nullIcon = document.querySelector(".null-icon");

    if (!ghostIcon.classList.contains("ghost-revealed")) {
      // Hide null icon with fade
      nullIcon.style.transition = "opacity 0.3s ease";
      nullIcon.style.opacity = "0";

      setTimeout(() => {
        nullIcon.style.display = "none";
        ghostIcon.classList.add("ghost-revealed");

        // Hide hint
        const hint = document.querySelector(".hint");
        if (hint) {
          hint.style.opacity = "0";
          hint.style.pointerEvents = "none";
        }

        // Add blink interaction for click and keyboard
        const blinkGhost = () => {
          const eyes = ghostIcon.querySelectorAll(".ghost-eye");
          eyes.forEach((eye) => {
            eye.style.opacity = "0";
            setTimeout(() => {
              eye.style.opacity = "1";
            }, 150);
          });
        };

        ghostIcon.addEventListener("click", blinkGhost);
        ghostIcon.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            blinkGhost();
          }
        });

        // Touch support for ghost blink
        ghostIcon.addEventListener("touchend", (e) => {
          e.preventDefault();
          blinkGhost();
        });

        // Optional: Type "null" to switch back (desktop only)
        let nullSequence = "";
        document.addEventListener("keypress", (e) => {
          nullSequence += e.key.toLowerCase();
          if (nullSequence.length > 4) {
            nullSequence = nullSequence.slice(-4);
          }
          if (nullSequence === "null") {
            // Hide ghost with fade (same as we hide null when revealing ghost)
            ghostIcon.style.transition = "opacity 0.3s ease";
            ghostIcon.style.opacity = "0";

            setTimeout(() => {
              // Reset ghost completely
              ghostIcon.style.display = "none";
              ghostIcon.classList.remove("ghost-revealed");
              ghostIcon.style.opacity = "";
              ghostIcon.style.transition = "";

              // Prepare null icon for animation
              nullIcon.style.display = "block";
              nullIcon.style.transition = "none";
              nullIcon.style.opacity = "0";
              nullIcon.style.transform = "scale(0) rotate(-360deg)";

              // Force browser to apply the initial state
              nullIcon.offsetHeight; // Force reflow

              // Now animate
              requestAnimationFrame(() => {
                nullIcon.style.transition =
                  "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                nullIcon.style.opacity = "1";
                nullIcon.style.transform = "scale(1) rotate(0deg)";

                // Clean up after animation
                setTimeout(() => {
                  nullIcon.style.transition = "";
                  nullIcon.style.transform = "";
                }, 600);
              });

              // Reset sequence
              nullSequence = "";
            }, 300);
          }
        });
      }, 300);
    }
  };

  // Ghost easter egg - type "ghost" to reveal
  let ghostSequence = "";
  const ghostTrigger = "ghost";

  document.addEventListener("keypress", (e) => {
    ghostSequence += e.key.toLowerCase();

    // Keep only last 5 characters
    if (ghostSequence.length > ghostTrigger.length) {
      ghostSequence = ghostSequence.slice(-ghostTrigger.length);
    }

    // Check if ghost was typed
    if (ghostSequence === ghostTrigger) {
      revealGhost();
      // Reset sequence
      ghostSequence = "";
    }
  });
});
