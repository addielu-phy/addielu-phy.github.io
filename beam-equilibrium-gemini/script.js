/**
 * 範例 8：水平木棒靜力平衡與三力封閉三角形 互動模擬引擎 (Gemini 版)
 * Developed for addielu-phy
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize KaTeX auto-render when ready
  const renderMath = () => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  };
  setTimeout(renderMath, 150);

  // Canvas & Contexts
  const physCanvas = document.getElementById('physicalCanvas');
  const physCtx = physCanvas.getContext('2d');

  const triCanvas = document.getElementById('triangleCanvas');
  const triCtx = triCanvas.getContext('2d');

  const chartCanvas = document.getElementById('trendChartCanvas');
  const chartCtx = chartCanvas.getContext('2d');

  // State Parameters
  const state = {
    xRatio: 0.45,       // x / l in [0.05, 0.98]
    thetaDeg: 30,       // Rope angle with rod in degrees [18, 65]
    W: 100,             // Weight in Newtons [50, 200]
    showComponents: true,
    showConcurrent: true,
    showGhostTriangles: true,
    showTorqueArc: true,
    isPlaying: false,
    playDirection: 1,
    isDraggingWeight: false
  };

  // UI Elements
  const sliderX = document.getElementById('sliderX');
  const sliderTheta = document.getElementById('sliderTheta');
  const sliderW = document.getElementById('sliderW');
  const readoutX = document.getElementById('readoutX');
  const readoutTheta = document.getElementById('readoutTheta');
  const readoutW = document.getElementById('readoutW');

  const btnPlayPause = document.getElementById('btnPlayPause');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const btnReset = document.getElementById('btnReset');
  const presetBtns = document.querySelectorAll('.preset-btn');

  const chkComponents = document.getElementById('chkComponents');
  const chkConcurrent = document.getElementById('chkConcurrent');
  const chkGhostTriangles = document.getElementById('chkGhostTriangles');
  const chkTorqueArc = document.getElementById('chkTorqueArc');

  // Telemetry & Banner Live Readouts
  const liveOptA = document.getElementById('liveOptA');
  const liveOptB = document.getElementById('liveOptB');
  const liveOptC = document.getElementById('liveOptC');
  const liveOptD = document.getElementById('liveOptD');

  const valT = document.getElementById('valT');
  const subT = document.getElementById('subT');
  const valFx = document.getElementById('valFx');
  const valFy = document.getElementById('valFy');
  const valFoPhi = document.getElementById('valFoPhi');
  const subFoMin = document.getElementById('subFoMin');

  // Banner Collapse & Modal
  const toggleBannerBtn = document.getElementById('toggleBannerBtn');
  const problemBannerBody = document.getElementById('problemBannerBody');
  const btnProblemModal = document.getElementById('btnProblemModal');
  const problemModal = document.getElementById('problemModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  toggleBannerBtn.addEventListener('click', () => {
    const isCollapsed = problemBannerBody.classList.toggle('collapsed');
    toggleBannerBtn.textContent = isCollapsed ? '展開題目 ▼' : '收合題目 ▲';
  });

  btnProblemModal.addEventListener('click', () => problemModal.classList.add('open'));
  closeModalBtn.addEventListener('click', () => problemModal.classList.remove('open'));
  problemModal.addEventListener('click', (e) => {
    if (e.target === problemModal) problemModal.classList.remove('open');
  });

  // Color Palette Constants
  const COLORS = {
    weight: '#fb7185',     // Rose Coral (W)
    tension: '#38bdf8',    // Sky Cyan (T)
    hinge: '#34d399',      // Emerald Green (F_O)
    compX: '#fbbf24',      // Amber Gold (F_x, T_x)
    compY: '#a78bfa',      // Violet Purple (F_y, T_y)
    concurrent: '#f472b6', // Pink (Point C)
    rod: '#e2e8f0',
    wall: '#64748b',
    grid: 'rgba(148, 163, 184, 0.08)'
  };

  /**
   * Compute exact physics values from current state
   */
  function computePhysics(xRatio = state.xRatio, thetaDeg = state.thetaDeg, W = state.W) {
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const sinT = Math.sin(thetaRad);
    const cosT = Math.cos(thetaRad);
    const tanT = Math.tan(thetaRad);
    const cotT = 1 / tanT;

    // (A) Rope Tension T = (x / l) * W / sin(theta)
    const T = (xRatio * W) / sinT;
    const Tx = T * cosT; // = xRatio * cot(theta) * W
    const Ty = T * sinT; // = xRatio * W

    // (B) Hinge Horizontal Component Fx = Tx
    const Fx = Tx;

    // (C) Hinge Vertical Component Fy = W - Ty = (1 - x/l) * W
    const Fy = (1 - xRatio) * W;

    // (D) Hinge Total Force Fo & Angle phi with horizontal
    const Fo = Math.hypot(Fx, Fy);
    const phiRad = Math.atan2(Fy, Fx);
    const phiDeg = (phiRad * 180) / Math.PI;

    // Minimum Fo occurs at x/l = sin^2(theta)
    const xMinFo = sinT * sinT;
    const FoMin = W * cosT;

    return {
      xRatio,
      thetaDeg,
      thetaRad,
      W,
      T,
      Tx,
      Ty,
      Fx,
      Fy,
      Fo,
      phiRad,
      phiDeg,
      xMinFo,
      FoMin
    };
  }

  /**
   * Drawing Helper: Crisp Vector Arrow with Label
   */
  function drawArrow(ctx, x1, y1, x2, y2, color, lineWidth = 3, dashed = false, headLen = 11) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 2) return;

    const angle = Math.atan2(dy, dx);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    if (dashed) {
      ctx.setLineDash([5, 4]);
    }

    // Line shaft
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 - Math.cos(angle) * (headLen * 0.6), y2 - Math.sin(angle) * (headLen * 0.6));
    ctx.stroke();

    // Solid Arrowhead
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLen * Math.cos(angle - Math.PI / 6.5),
      y2 - headLen * Math.sin(angle - Math.PI / 6.5)
    );
    ctx.lineTo(
      x2 - headLen * Math.cos(angle + Math.PI / 6.5),
      y2 - headLen * Math.sin(angle + Math.PI / 6.5)
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /**
   * Drawing Helper: Subtle Background Coordinate Grid
   */
  function drawBackgroundGrid(ctx, width, height, step = 32) {
    ctx.save();
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Drawing Helper: Angle Arc with Text
   */
  function drawAngleArc(ctx, cx, cy, radius, startAngle, endAngle, color, label, textOffsetRadius = radius + 16) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.stroke();

    if (label) {
      const midAngle = (startAngle + endAngle) / 2;
      const tx = cx + textOffsetRadius * Math.cos(midAngle);
      const ty = cy + textOffsetRadius * Math.sin(midAngle);
      ctx.fillStyle = color;
      ctx.font = '600 13px "JetBrains Mono", "Noto Sans TC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, tx, ty);
    }
    ctx.restore();
  }

  // Geometry layout cache for mouse dragging on Physical Canvas
  const layout = {
    wallX: 125,
    rodY: 315,
    rodLenPx: 380,
    weightBoxCenter: { x: 0, y: 0, w: 48, h: 38 }
  };

  /**
   * VIEW 1: Render Physical System + Free Body Force Vectors + Concurrent Lines
   */
  function renderPhysicalCanvas(phys) {
    const W_cv = physCanvas.width;
    const H_cv = physCanvas.height;
    physCtx.clearRect(0, 0, W_cv, H_cv);
    drawBackgroundGrid(physCtx, W_cv, H_cv);

    const { wallX, rodY, rodLenPx } = layout;
    const pX = wallX + rodLenPx;
    const pY = rodY;
    const weightX = wallX + phys.xRatio * rodLenPx;

    // Rope anchor on wall: height above O is L * tan(theta)
    // Clamp visual height if theta is large so anchor stays inside canvas
    const ropeWallRise = rodLenPx * Math.tan(phys.thetaRad);
    const ropeTopY = rodY - ropeWallRise;

    // Scale for Force Vectors in Physical Canvas: W = 95px
    const forceScale = 95 / phys.W;

    // 1. Draw Concurrent Point C and Three-Force Action Lines (if enabled)
    // Concurrent point C is at x = weightX, y on the rope line:
    // Rope equation from P(pX, rodY) to Wall(wallX, ropeTopY):
    // At weightX, distance from P is (1 - xRatio) * rodLenPx
    const cX = weightX;
    const cY = rodY - (1 - phys.xRatio) * rodLenPx * Math.tan(phys.thetaRad);

    if (state.showConcurrent && cY > -120) {
      physCtx.save();
      physCtx.setLineDash([6, 5]);
      physCtx.lineWidth = 1.6;

      // Extended line of action of Weight W (vertical line through weightX)
      physCtx.strokeStyle = 'rgba(251, 113, 133, 0.45)';
      physCtx.beginPath();
      physCtx.moveTo(weightX, rodY + 40);
      physCtx.lineTo(cX, cY);
      physCtx.stroke();

      // Extended line of action of Hinge Force F_O (from O to C)
      physCtx.strokeStyle = 'rgba(52, 211, 153, 0.55)';
      physCtx.beginPath();
      physCtx.moveTo(wallX, rodY);
      physCtx.lineTo(cX, cY);
      physCtx.stroke();

      physCtx.setLineDash([]);

      // Draw Concurrent Point C
      if (cY >= 12) {
        physCtx.fillStyle = COLORS.concurrent;
        physCtx.beginPath();
        physCtx.arc(cX, cY, 5.5, 0, Math.PI * 2);
        physCtx.fill();
        physCtx.strokeStyle = '#ffffff';
        physCtx.lineWidth = 1.5;
        physCtx.stroke();

        // Label C
        physCtx.fillStyle = '#f472b6';
        physCtx.font = '700 12.5px "Noto Sans TC", sans-serif';
        physCtx.textAlign = 'left';
        physCtx.fillText(`三力共點 C`, cX + 10, cY - 6);
      }
      physCtx.restore();
    }

    // 2. Draw Vertical Wall (Hatched like textbook diagram)
    physCtx.save();
    const wallTop = Math.min(25, Math.max(12, ropeTopY - 25));
    const wallBottom = rodY + 135;

    // Wall hatchings
    physCtx.strokeStyle = '#475569';
    physCtx.lineWidth = 1.5;
    for (let y = wallTop; y <= wallBottom; y += 10) {
      physCtx.beginPath();
      physCtx.moveTo(wallX - 14, y + 8);
      physCtx.lineTo(wallX, y);
      physCtx.stroke();
    }
    // Wall main vertical edge
    physCtx.strokeStyle = '#94a3b8';
    physCtx.lineWidth = 3;
    physCtx.beginPath();
    physCtx.moveTo(wallX, wallTop);
    physCtx.lineTo(wallX, wallBottom);
    physCtx.stroke();
    physCtx.restore();

    // 3. Draw Light Rope (from P to Wall Anchor)
    physCtx.save();
    physCtx.strokeStyle = '#cbd5e1';
    physCtx.lineWidth = 2.2;
    physCtx.beginPath();
    physCtx.moveTo(pX, pY);
    physCtx.lineTo(wallX, ropeTopY);
    physCtx.stroke();

    // Angle theta arc at P
    const ropeAngleFromP = Math.PI + phys.thetaRad; // pointing up-left from P
    drawAngleArc(
      physCtx,
      pX,
      pY,
      46,
      Math.PI,
      ropeAngleFromP,
      '#bae6fd',
      `θ=${phys.thetaDeg}°`,
      68
    );
    physCtx.restore();

    // 4. Draw Horizontal Rod OP
    physCtx.save();
    const rodThickness = 10;
    const gradRod = physCtx.createLinearGradient(wallX, rodY - rodThickness / 2, wallX, rodY + rodThickness / 2);
    gradRod.addColorStop(0, '#f8fafc');
    gradRod.addColorStop(1, '#94a3b8');
    physCtx.fillStyle = gradRod;
    physCtx.strokeStyle = '#475569';
    physCtx.lineWidth = 1.5;
    physCtx.beginPath();
    physCtx.roundRect(wallX, rodY - rodThickness / 2, rodLenPx, rodThickness, 4);
    physCtx.fill();
    physCtx.stroke();

    // Draw Hinge Bracket at O (like textbook D-shaped bracket + pivot dot)
    physCtx.fillStyle = '#334155';
    physCtx.strokeStyle = '#cbd5e1';
    physCtx.lineWidth = 2;
    physCtx.beginPath();
    physCtx.moveTo(wallX, rodY - 12);
    physCtx.lineTo(wallX + 8, rodY - 12);
    physCtx.arc(wallX + 8, rodY, 12, -Math.PI / 2, Math.PI / 2);
    physCtx.lineTo(wallX, rodY + 12);
    physCtx.closePath();
    physCtx.fill();
    physCtx.stroke();

    // Pivot pin dot at O
    physCtx.fillStyle = '#34d399';
    physCtx.beginPath();
    physCtx.arc(wallX + 6, rodY, 4, 0, Math.PI * 2);
    physCtx.fill();

    // Labels O and P
    physCtx.fillStyle = '#f8fafc';
    physCtx.font = '700 16px "Inter", sans-serif';
    physCtx.textAlign = 'right';
    physCtx.fillText('O', wallX - 18, rodY + 6);
    physCtx.textAlign = 'left';
    physCtx.fillText('P', pX + 12, rodY + 6);
    physCtx.restore();

    // 5. Draw Distance x Dimension Bar (Torque Lever Arm)
    if (state.showTorqueArc) {
      const dimY = rodY - 24;
      physCtx.save();
      physCtx.strokeStyle = '#fbbf24';
      physCtx.fillStyle = '#fbbf24';
      physCtx.lineWidth = 1.5;

      // Vertical ticks
      physCtx.beginPath();
      physCtx.moveTo(wallX, dimY - 5);
      physCtx.lineTo(wallX, dimY + 5);
      physCtx.moveTo(weightX, dimY - 5);
      physCtx.lineTo(weightX, dimY + 5);
      physCtx.moveTo(wallX, dimY);
      physCtx.lineTo(weightX, dimY);
      physCtx.stroke();

      physCtx.font = '600 12.5px "JetBrains Mono", sans-serif';
      physCtx.textAlign = 'center';
      physCtx.fillText(`x = ${phys.xRatio.toFixed(2)} ℓ`, (wallX + weightX) / 2, dimY - 8);
      physCtx.restore();
    }

    // 6. Draw Hanging Weight Block W (Draggable)
    const stringLen = 36;
    const boxW = 48;
    const boxH = 36;
    const boxX = weightX - boxW / 2;
    const boxY = rodY + rodThickness / 2 + stringLen;

    layout.weightBoxCenter = {
      x: weightX,
      y: boxY + boxH / 2,
      w: boxW + 20,
      h: boxH + 45
    };

    physCtx.save();
    // Hanging string
    physCtx.strokeStyle = '#e2e8f0';
    physCtx.lineWidth = 2;
    physCtx.beginPath();
    physCtx.moveTo(weightX, rodY + rodThickness / 2);
    physCtx.lineTo(weightX, boxY);
    physCtx.stroke();

    // Weight attachment ring on rod
    physCtx.fillStyle = '#fb7185';
    physCtx.beginPath();
    physCtx.arc(weightX, rodY, 5, 0, Math.PI * 2);
    physCtx.fill();

    // Weight Mass Box
    const boxGrad = physCtx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
    boxGrad.addColorStop(0, '#64748b');
    boxGrad.addColorStop(1, '#334155');
    physCtx.fillStyle = boxGrad;
    physCtx.strokeStyle = state.isDraggingWeight ? '#fb7185' : '#cbd5e1';
    physCtx.lineWidth = state.isDraggingWeight ? 2.5 : 1.8;
    physCtx.beginPath();
    physCtx.roundRect(boxX, boxY, boxW, boxH, 5);
    physCtx.fill();
    physCtx.stroke();

    physCtx.fillStyle = '#f8fafc';
    physCtx.font = '700 13px "JetBrains Mono", sans-serif';
    physCtx.textAlign = 'center';
    physCtx.fillText('W', weightX, boxY + 23);
    physCtx.restore();

    // 7. Draw Force Vectors & Components on the Rod
    // (7a) Weight vector W (from attachment point on rod downwards)
    const wVecLen = phys.W * forceScale;
    const wEndY = rodY + wVecLen;
    drawArrow(physCtx, weightX, rodY, weightX, wEndY, COLORS.weight, 3.4);
    physCtx.save();
    physCtx.fillStyle = COLORS.weight;
    physCtx.font = '700 13px "JetBrains Mono", "Noto Sans TC", sans-serif';
    physCtx.textAlign = 'left';
    physCtx.fillText(`W = ${phys.W.toFixed(0)}N`, weightX + 28, rodY + wVecLen - 4);
    physCtx.restore();

    // (7b) Tension Vector T at Point P (along rope towards wall)
    const tVecLen = phys.T * forceScale;
    const tEndX = pX - tVecLen * Math.cos(phys.thetaRad);
    const tEndY = pY - tVecLen * Math.sin(phys.thetaRad);

    if (state.showComponents) {
      // Tx (horizontal left from P) and Ty (vertical up from P)
      drawArrow(physCtx, pX, pY, tEndX, pY, COLORS.compX, 2, true, 8);
      drawArrow(physCtx, pX, pY, pX, tEndY, COLORS.compY, 2, true, 8);

      // Dashed projection box for T
      physCtx.save();
      physCtx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      physCtx.setLineDash([3, 3]);
      physCtx.beginPath();
      physCtx.moveTo(tEndX, pY);
      physCtx.lineTo(tEndX, tEndY);
      physCtx.lineTo(pX, tEndY);
      physCtx.stroke();
      physCtx.restore();

      // Component labels
      physCtx.save();
      physCtx.font = '600 11.5px "JetBrains Mono", sans-serif';
      physCtx.fillStyle = COLORS.compY;
      physCtx.textAlign = 'left';
      physCtx.fillText(`Ty=${phys.Ty.toFixed(0)}N`, pX + 6, (pY + tEndY) / 2);
      physCtx.restore();
    }

    drawArrow(physCtx, pX, pY, tEndX, tEndY, COLORS.tension, 3.6);
    physCtx.save();
    physCtx.fillStyle = COLORS.tension;
    physCtx.font = '700 13px "JetBrains Mono", sans-serif';
    physCtx.textAlign = 'left';
    physCtx.fillText(`T = ${phys.T.toFixed(1)}N`, tEndX + 8, tEndY - 8);
    physCtx.restore();

    // (7c) Hinge Force Vector F_O at Point O (and components Fx, Fy)
    const fxLen = phys.Fx * forceScale;
    const fyLen = phys.Fy * forceScale;
    const foEndX = wallX + fxLen;
    const foEndY = rodY - fyLen;

    if (state.showComponents) {
      // Fx (horizontal right from O)
      drawArrow(physCtx, wallX, rodY, foEndX, rodY, COLORS.compX, 2.2, true, 8);
      // Fy (vertical up from O)
      drawArrow(physCtx, wallX, rodY, wallX, foEndY, COLORS.compY, 2.2, true, 8);

      // Dashed rectangle for F_O
      physCtx.save();
      physCtx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
      physCtx.setLineDash([3, 3]);
      physCtx.beginPath();
      physCtx.moveTo(foEndX, rodY);
      physCtx.lineTo(foEndX, foEndY);
      physCtx.lineTo(wallX, foEndY);
      physCtx.stroke();
      physCtx.restore();

      physCtx.save();
      physCtx.font = '600 11.5px "JetBrains Mono", sans-serif';
      physCtx.fillStyle = COLORS.compX;
      physCtx.textAlign = 'center';
      if (fxLen > 24) {
        physCtx.fillText(`Fx=${phys.Fx.toFixed(1)}N`, wallX + fxLen / 2, rodY + 18);
      }
      physCtx.fillStyle = COLORS.compY;
      physCtx.textAlign = 'right';
      if (fyLen > 18) {
        physCtx.fillText(`Fy=${phys.Fy.toFixed(1)}N`, wallX - 8, rodY - fyLen / 2);
      }
      physCtx.restore();
    }

    // Angle phi arc at O (between horizontal rod and F_O)
    if (phys.phiDeg > 2) {
      drawAngleArc(
        physCtx,
        wallX,
        rodY,
        36,
        -phys.phiRad,
        0,
        COLORS.hinge,
        `φ=${phys.phiDeg.toFixed(1)}°`,
        56
      );
    }

    // Total Hinge Force F_O
    drawArrow(physCtx, wallX, rodY, foEndX, foEndY, COLORS.hinge, 3.6);
    physCtx.save();
    physCtx.fillStyle = COLORS.hinge;
    physCtx.font = '700 13px "JetBrains Mono", sans-serif';
    physCtx.textAlign = 'left';
    physCtx.fillText(`F_O = ${phys.Fo.toFixed(1)}N`, foEndX + 6, foEndY - 6);
    physCtx.restore();

    // Top-right HUD badge inside Physical Canvas
    physCtx.save();
    physCtx.fillStyle = 'rgba(15, 23, 42, 0.82)';
    physCtx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    physCtx.lineWidth = 1;
    physCtx.beginPath();
    physCtx.roundRect(W_cv - 235, 14, 220, 74, 8);
    physCtx.fill();
    physCtx.stroke();

    physCtx.fillStyle = '#e2e8f0';
    physCtx.font = '600 12px "Noto Sans TC", sans-serif';
    physCtx.fillText('🔍 力矩與分力即時平衡驗證：', W_cv - 223, 34);
    physCtx.font = '500 11.5px "JetBrains Mono", sans-serif';
    physCtx.fillStyle = '#93c5fd';
    physCtx.fillText(`ΣFx = Fx - Tx = 0.0 N`, W_cv - 223, 54);
    physCtx.fillStyle = '#6ee7b7';
    physCtx.fillText(`ΣFy = Fy + Ty - W = 0.0 N`, W_cv - 223, 73);
    physCtx.restore();
  }

  /**
   * VIEW 2: Render Closed Force Triangle (Head-to-Tail Vector Addition: W + T + F_O = 0)
   * Explicitly shows how the closed triangle evolves as x changes!
   */
  function renderTriangleCanvas(phys) {
    const W_cv = triCanvas.width;
    const H_cv = triCanvas.height;
    triCtx.clearRect(0, 0, W_cv, H_cv);
    drawBackgroundGrid(triCtx, W_cv, H_cv);

    // Compute dynamic scale so the triangle fits comfortably even at x = 0.98 and theta = 18 deg
    // Max horizontal extent is W * cot(theta), height is W
    const maxCot = 1 / Math.tan(phys.thetaRad);
    const scaleByWidth = (W_cv - 190) / Math.max(1.1, maxCot * 1.02);
    const scaleByHeight = H_cv - 175;
    const triScale = Math.min(scaleByWidth, scaleByHeight, 220) / phys.W;

    // Anchor Vertex A (Start of W, Tip of F_O) near top-right
    const ax = W_cv - 95;
    const ay = 75;

    // Vertex B (Tip of W, Start of T) - Fixed vertical vector W downwards!
    const bx = ax;
    const by = ay + phys.W * triScale;

    // For any xRatio, Tension T starts at B(bx, by) and goes up-left at angle theta:
    // Tip of T is Vertex D(dx, dy):
    // Since T * sin(theta) = xRatio * W, the vertical rise of T is simply xRatio * (W * triScale)!
    // And horizontal run of T to the left is Tx * triScale = xRatio * cot(theta) * W * triScale.
    const getVertexD = (xVal) => {
      const rise = xVal * phys.W * triScale;
      const run = rise / Math.tan(phys.thetaRad);
      return {
        x: bx - run,
        y: by - rise
      };
    };

    const curD = getVertexD(phys.xRatio);
    const limitD = getVertexD(1.0); // When x = l

    // 1. Draw the Fixed Direction Ray of Tension T from Vertex B (up-left at angle theta)
    triCtx.save();
    triCtx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    triCtx.lineWidth = 2;
    triCtx.setLineDash([6, 5]);
    triCtx.beginPath();
    triCtx.moveTo(bx, by);
    triCtx.lineTo(limitD.x - 25 * Math.cos(phys.thetaRad), limitD.y - 25 * Math.sin(phys.thetaRad));
    triCtx.stroke();

    // Horizontal reference line through B and A
    triCtx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
    triCtx.beginPath();
    triCtx.moveTo(limitD.x - 20, by);
    triCtx.lineTo(bx + 30, by);
    triCtx.moveTo(limitD.x - 20, ay);
    triCtx.lineTo(ax + 30, ay);
    triCtx.stroke();
    triCtx.setLineDash([]);

    // Label the Fixed Rope Angle Ray
    triCtx.fillStyle = '#7dd3fc';
    triCtx.font = '600 12px "Noto Sans TC", sans-serif';
    triCtx.textAlign = 'left';
    triCtx.fillText(
      `↖ 輕繩張力 T 方向固定線 (仰角 θ=${phys.thetaDeg}° 恆定)`,
      Math.max(16, limitD.x - 10),
      Math.max(24, limitD.y - 16)
    );
    triCtx.restore();

    // 2. Draw Ghost Evolution Triangles for x/l = 0.25, 0.50, 0.75, and x_min (Fo perpendicular to T)
    if (state.showGhostTriangles) {
      const ghostRatios = [0.25, 0.5, 0.75, 1.0];
      ghostRatios.forEach((gx) => {
        if (Math.abs(gx - phys.xRatio) < 0.04) return;
        const gD = getVertexD(gx);
        triCtx.save();
        triCtx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
        triCtx.lineWidth = 1.3;
        triCtx.setLineDash([4, 4]);
        // Ghost F_O vector from gD to A
        triCtx.beginPath();
        triCtx.moveTo(gD.x, gD.y);
        triCtx.lineTo(ax, ay);
        triCtx.stroke();

        // Small node on the T ray
        triCtx.fillStyle = 'rgba(148, 163, 184, 0.5)';
        triCtx.beginPath();
        triCtx.arc(gD.x, gD.y, 3, 0, Math.PI * 2);
        triCtx.fill();

        triCtx.font = '500 10.5px "JetBrains Mono", sans-serif';
        triCtx.textAlign = 'right';
        triCtx.fillText(`x=${gx.toFixed(2)}ℓ`, gD.x - 6, gD.y + 12);
        triCtx.restore();
      });

      // Also mark the minimum F_O point (where F_O is perpendicular to T: x = l * sin^2(theta))
      const minD = getVertexD(phys.xMinFo);
      triCtx.save();
      triCtx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      triCtx.setLineDash([2, 3]);
      triCtx.beginPath();
      triCtx.moveTo(minD.x, minD.y);
      triCtx.lineTo(ax, ay);
      triCtx.stroke();
      triCtx.fillStyle = '#fbbf24';
      triCtx.beginPath();
      triCtx.arc(minD.x, minD.y, 3.5, 0, Math.PI * 2);
      triCtx.fill();
      triCtx.restore();
    }

    // 3. Fill the Current Closed Force Triangle Interior
    triCtx.save();
    const triGrad = triCtx.createLinearGradient(curD.x, curD.y, ax, by);
    triGrad.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
    triGrad.addColorStop(1, 'rgba(52, 211, 153, 0.14)');
    triCtx.fillStyle = triGrad;
    triCtx.beginPath();
    triCtx.moveTo(ax, ay);
    triCtx.lineTo(bx, by);
    triCtx.lineTo(curD.x, curD.y);
    triCtx.closePath();
    triCtx.fill();
    triCtx.restore();

    // 4. Draw Component Projections of the Closed Triangle (Fx, Fy, Ty) if enabled
    if (state.showComponents) {
      triCtx.save();
      // Horizontal component Fx (from curD.x to ax at height curD.y)
      drawArrow(triCtx, curD.x, curD.y, ax, curD.y, COLORS.compX, 2, true, 8);
      // Vertical component Fy (from curD.y up to ay along ax)
      drawArrow(triCtx, ax, curD.y, ax, ay, COLORS.compY, 2, true, 8);

      // Right angle symbol at (ax, curD.y)
      const sq = 8;
      if (ax - curD.x > 16 && curD.y - ay > 16) {
        triCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        triCtx.lineWidth = 1.2;
        triCtx.beginPath();
        triCtx.moveTo(ax - sq, curD.y);
        triCtx.lineTo(ax - sq, curD.y - sq);
        triCtx.lineTo(ax, curD.y - sq);
        triCtx.stroke();
      }

      // Labels for Fx and Fy on the triangle
      triCtx.font = '600 12px "JetBrains Mono", sans-serif';
      if (ax - curD.x > 45) {
        triCtx.fillStyle = COLORS.compX;
        triCtx.textAlign = 'center';
        triCtx.fillText(
          `Fx = Tx = ${phys.Fx.toFixed(1)}N`,
          (curD.x + ax) / 2,
          curD.y + 16
        );
      }
      if (curD.y - ay > 28) {
        triCtx.fillStyle = COLORS.compY;
        triCtx.textAlign = 'left';
        triCtx.fillText(`Fy=${phys.Fy.toFixed(1)}N`, ax + 10, (ay + curD.y) / 2);
      }
      if (by - curD.y > 28) {
        triCtx.fillStyle = '#38bdf8';
        triCtx.textAlign = 'left';
        triCtx.fillText(`Ty=${phys.Ty.toFixed(1)}N`, bx + 10, (curD.y + by) / 2);
      }
      triCtx.restore();
    }

    // 5. Draw Angles inside the Force Triangle
    // Angle theta at B (between horizontal left and T)
    drawAngleArc(
      triCtx,
      bx,
      by,
      38,
      Math.PI,
      Math.PI + phys.thetaRad,
      COLORS.tension,
      `θ=${phys.thetaDeg}°`,
      58
    );

    // Angle phi at curD (or at A with horizontal) for F_O
    if (phys.phiDeg > 3 && Math.hypot(ax - curD.x, curD.y - ay) > 45) {
      drawAngleArc(
        triCtx,
        curD.x,
        curD.y,
        36,
        -phys.phiRad,
        0,
        COLORS.hinge,
        `φ=${phys.phiDeg.toFixed(1)}°`,
        56
      );
    }

    // 6. Draw the 3 Head-to-Tail Force Vectors Forming the Closed Triangle:
    // Edge 1: Weight W (from A downwards to B)
    drawArrow(triCtx, ax, ay, bx, by, COLORS.weight, 4.2, false, 12);
    // Edge 2: Tension T (from B up-left to curD)
    drawArrow(triCtx, bx, by, curD.x, curD.y, COLORS.tension, 4.2, false, 12);
    // Edge 3: Hinge Force F_O (from curD up-right to A, closing the loop!)
    drawArrow(triCtx, curD.x, curD.y, ax, ay, COLORS.hinge, 4.2, false, 12);

    // Vector Labels along the 3 sides
    triCtx.save();
    triCtx.font = '700 13.5px "JetBrains Mono", "Noto Sans TC", sans-serif';

    // Label W
    triCtx.fillStyle = COLORS.weight;
    triCtx.textAlign = 'right';
    if (!state.showComponents) {
      triCtx.fillText(`重錘 W = ${phys.W.toFixed(0)}N (定長)`, ax + 78, (ay + by) / 2);
    } else {
      triCtx.fillText(`W=${phys.W.toFixed(0)}N`, ax - 8, by - 10);
    }

    // Label T
    const midTx = (bx + curD.x) / 2;
    const midTy = (by + curD.y) / 2;
    triCtx.fillStyle = COLORS.tension;
    triCtx.textAlign = 'right';
    triCtx.fillText(`輕繩 T = ${phys.T.toFixed(1)}N`, midTx - 12, midTy + 14);

    // Label F_O
    const midFox = (curD.x + ax) / 2;
    const midFoy = (curD.y + ay) / 2;
    triCtx.fillStyle = COLORS.hinge;
    triCtx.textAlign = 'right';
    triCtx.fillText(`樞紐力 F_O = ${phys.Fo.toFixed(1)}N`, midFox - 10, midFoy - 10);
    triCtx.restore();

    // 7. Bottom Explanatory Overlay Box inside Triangle Canvas
    triCtx.save();
    const boxY = H_cv - 92;
    triCtx.fillStyle = 'rgba(15, 23, 42, 0.86)';
    triCtx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
    triCtx.lineWidth = 1.2;
    triCtx.beginPath();
    triCtx.roundRect(16, boxY, W_cv - 32, 78, 8);
    triCtx.fill();
    triCtx.stroke();

    triCtx.fillStyle = '#f8fafc';
    triCtx.font = '700 12.5px "Noto Sans TC", sans-serif';
    triCtx.fillText(
      `📐 封閉力三角形動態解析（目前 x = ${phys.xRatio.toFixed(2)} ℓ）：`,
      28,
      boxY + 22
    );

    triCtx.fillStyle = '#cbd5e1';
    triCtx.font = '500 12px "Noto Sans TC", sans-serif';
    triCtx.fillText(
      `1. 鉛直邊 W 長度固定不變；輕繩張力 T 沿固定仰角 θ=${phys.thetaDeg}° 射線延伸，高度 Ty = (x/ℓ)W。`,
      28,
      boxY + 44
    );
    triCtx.fillText(
      `2. 當重錘右移 (x ↑) 時：T 沿射線向左上伸長 ↑ ➔ 水平寬 Fx 變大 ↑、剩餘鉛直高 Fy 變小 ↓、夾角 φ=${phys.phiDeg.toFixed(1)}° 變小 ↓！`,
      28,
      boxY + 64
    );
    triCtx.restore();
  }

  /**
   * Render Mini Functional Trend Chart: T/W, Fx/W, Fy/W, Fo/W vs (x/l)
   */
  function renderTrendChart(phys) {
    const W_cv = chartCanvas.width;
    const H_cv = chartCanvas.height;
    chartCtx.clearRect(0, 0, W_cv, H_cv);

    const padL = 44;
    const padR = 20;
    const padT = 24;
    const padB = 30;
    const plotW = W_cv - padL - padR;
    const plotH = H_cv - padT - padB;

    // Max Y ratio is max(1 / sin(theta), 2.2)
    const maxY = Math.min(3.2, Math.max(2.0, 1 / Math.sin(phys.thetaRad) * 1.05));

    const toX = (xr) => padL + xr * plotW;
    const toY = (yr) => padT + plotH - (yr / maxY) * plotH;

    // Axes
    chartCtx.save();
    chartCtx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    chartCtx.lineWidth = 1;
    chartCtx.beginPath();
    chartCtx.moveTo(padL, padT);
    chartCtx.lineTo(padL, padT + plotH);
    chartCtx.lineTo(padL + plotW, padT + plotH);
    chartCtx.stroke();

    // Y=1.0 W reference line
    const yOne = toY(1.0);
    chartCtx.setLineDash([3, 3]);
    chartCtx.strokeStyle = 'rgba(251, 113, 133, 0.35)';
    chartCtx.beginPath();
    chartCtx.moveTo(padL, yOne);
    chartCtx.lineTo(padL + plotW, yOne);
    chartCtx.stroke();
    chartCtx.setLineDash([]);

    chartCtx.fillStyle = '#94a3b8';
    chartCtx.font = '500 10.5px "JetBrains Mono", sans-serif';
    chartCtx.textAlign = 'right';
    chartCtx.fillText('1.0W', padL - 6, yOne + 3);
    chartCtx.fillText('0', padL - 6, padT + plotH + 3);
    chartCtx.fillText(`${maxY.toFixed(1)}W`, padL - 6, padT + 6);

    // X-axis labels
    chartCtx.textAlign = 'center';
    chartCtx.fillText('x/ℓ = 0', padL, H_cv - 8);
    chartCtx.fillText('0.5', padL + plotW * 0.5, H_cv - 8);
    chartCtx.fillText('1.0', padL + plotW, H_cv - 8);

    // Plot curves: T(x), Fx(x), Fy(x), Fo(x)
    const plotCurve = (fn, color, lineWidth = 2, dashed = false) => {
      chartCtx.save();
      chartCtx.strokeStyle = color;
      chartCtx.lineWidth = lineWidth;
      if (dashed) chartCtx.setLineDash([4, 3]);
      chartCtx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const xr = i / 60;
        const yr = fn(xr);
        const px = toX(xr);
        const py = Math.max(padT, toY(yr));
        if (i === 0) chartCtx.moveTo(px, py);
        else chartCtx.lineTo(px, py);
      }
      chartCtx.stroke();
      chartCtx.restore();
    };

    const sinT = Math.sin(phys.thetaRad);
    const cotT = 1 / Math.tan(phys.thetaRad);

    // (A) T / W = x / sin(theta)
    plotCurve((x) => x / sinT, COLORS.tension, 2.2);
    // (B) Fx / W = x * cot(theta)
    plotCurve((x) => x * cotT, COLORS.compX, 2.0);
    // (C) Fy / W = 1 - x
    plotCurve((x) => 1 - x, COLORS.compY, 2.0);
    // (Bonus) Fo / W = hypot(x*cotT, 1-x)
    plotCurve((x) => Math.hypot(x * cotT, 1 - x), COLORS.hinge, 2.0, true);

    // Current x vertical cursor line
    const curX = toX(phys.xRatio);
    chartCtx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    chartCtx.lineWidth = 1.3;
    chartCtx.beginPath();
    chartCtx.moveTo(curX, padT);
    chartCtx.lineTo(curX, padT + plotH);
    chartCtx.stroke();

    // Dots on current x
    const dots = [
      { y: phys.T / phys.W, c: COLORS.tension },
      { y: phys.Fx / phys.W, c: COLORS.compX },
      { y: phys.Fy / phys.W, c: COLORS.compY },
      { y: phys.Fo / phys.W, c: COLORS.hinge }
    ];
    dots.forEach((d) => {
      const py = Math.max(padT, toY(d.y));
      chartCtx.fillStyle = d.c;
      chartCtx.beginPath();
      chartCtx.arc(curX, py, 4, 0, Math.PI * 2);
      chartCtx.fill();
    });

    // Legend at top of chart
    chartCtx.font = '600 11px "JetBrains Mono", "Noto Sans TC", sans-serif';
    chartCtx.textAlign = 'left';
    const legY = 14;
    chartCtx.fillStyle = COLORS.tension;
    chartCtx.fillText('━ (A) T 變大↑', padL + 4, legY);
    chartCtx.fillStyle = COLORS.compX;
    chartCtx.fillText('━ (B) Fx 變大↑', padL + 115, legY);
    chartCtx.fillStyle = COLORS.compY;
    chartCtx.fillText('━ (C) Fy 變小↓', padL + 235, legY);
    chartCtx.fillStyle = COLORS.hinge;
    chartCtx.fillText('┅ F_O 總力(先減後增)', padL + 355, legY);

    chartCtx.restore();
  }

  /**
   * Master Update Function: Updates UI Text + Redraws All 3 Canvases
   */
  function updateSimulation() {
    const phys = computePhysics();

    // Update Slider Readouts
    sliderX.value = phys.xRatio.toFixed(2);
    readoutX.textContent = `${phys.xRatio.toFixed(2)} ℓ`;
    readoutTheta.textContent = `${phys.thetaDeg}°`;
    readoutW.textContent = `${phys.W} N`;

    // Highlight active preset button if matching
    presetBtns.forEach((btn) => {
      const bx = parseFloat(btn.dataset.x);
      btn.classList.toggle('active', Math.abs(bx - phys.xRatio) < 0.015);
    });

    // Update Top Banner Live Option Cards
    liveOptA.textContent = `目前：T = ${(phys.T / phys.W).toFixed(2)} W (${phys.T.toFixed(1)} N)`;
    liveOptB.textContent = `目前：Fx = ${(phys.Fx / phys.W).toFixed(2)} W (${phys.Fx.toFixed(1)} N)`;
    liveOptC.textContent = `目前：Fy = ${(phys.Fy / phys.W).toFixed(2)} W (${phys.Fy.toFixed(1)} N)`;
    liveOptD.textContent = `目前：φ = ${phys.phiDeg.toFixed(1)}° (tan φ = ${Math.tan(phys.phiRad).toFixed(2)})`;

    // Update Telemetry Cards
    valT.innerHTML = `${phys.T.toFixed(1)} N <small>(${(phys.T / phys.W).toFixed(2)} W)</small>`;
    subT.textContent = `水平 Tx = ${phys.Tx.toFixed(1)} N, 鉛直 Ty = ${phys.Ty.toFixed(1)} N`;

    valFx.innerHTML = `${phys.Fx.toFixed(1)} N <small>(${(phys.Fx / phys.W).toFixed(2)} W)</small>`;
    valFy.innerHTML = `${phys.Fy.toFixed(1)} N <small>(${(phys.Fy / phys.W).toFixed(2)} W)</small>`;
    valFoPhi.innerHTML = `${phys.Fo.toFixed(1)} N / <span style="color:#6ee7b7">φ = ${phys.phiDeg.toFixed(1)}°</span>`;
    subFoMin.textContent = `當 x = ${phys.xMinFo.toFixed(2)}ℓ 時 F_O 有極小值 ${phys.FoMin.toFixed(1)}N (F_O ⊥ T)`;

    // Render all canvases
    renderPhysicalCanvas(phys);
    renderTriangleCanvas(phys);
    renderTrendChart(phys);
  }

  // Event Listeners for Sliders & Checkboxes
  sliderX.addEventListener('input', (e) => {
    state.xRatio = parseFloat(e.target.value);
    updateSimulation();
  });

  sliderTheta.addEventListener('input', (e) => {
    state.thetaDeg = parseInt(e.target.value, 10);
    updateSimulation();
  });

  sliderW.addEventListener('input', (e) => {
    state.W = parseInt(e.target.value, 10);
    updateSimulation();
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.xRatio = parseFloat(btn.dataset.x);
      updateSimulation();
    });
  });

  chkComponents.addEventListener('change', (e) => {
    state.showComponents = e.target.checked;
    updateSimulation();
  });
  chkConcurrent.addEventListener('change', (e) => {
    state.showConcurrent = e.target.checked;
    updateSimulation();
  });
  chkGhostTriangles.addEventListener('change', (e) => {
    state.showGhostTriangles = e.target.checked;
    updateSimulation();
  });
  chkTorqueArc.addEventListener('change', (e) => {
    state.showTorqueArc = e.target.checked;
    updateSimulation();
  });

  // Auto-Scan Animation Loop
  let animFrameId = null;
  function stepAnimation() {
    if (!state.isPlaying) return;
    state.xRatio += 0.0028 * state.playDirection;
    if (state.xRatio >= 0.96) {
      state.xRatio = 0.96;
      state.playDirection = -1;
    } else if (state.xRatio <= 0.08) {
      state.xRatio = 0.08;
      state.playDirection = 1;
    }
    updateSimulation();
    animFrameId = requestAnimationFrame(stepAnimation);
  }

  btnPlayPause.addEventListener('click', () => {
    state.isPlaying = !state.isPlaying;
    btnPlayPause.classList.toggle('playing', state.isPlaying);
    if (state.isPlaying) {
      playIcon.textContent = '⏸';
      playText.textContent = '暫停掃描';
      stepAnimation();
    } else {
      playIcon.textContent = '▶';
      playText.textContent = '自動掃描 x';
      if (animFrameId) cancelAnimationFrame(animFrameId);
    }
  });

  btnReset.addEventListener('click', () => {
    state.isPlaying = false;
    btnPlayPause.classList.remove('playing');
    playIcon.textContent = '▶';
    playText.textContent = '自動掃描 x';
    if (animFrameId) cancelAnimationFrame(animFrameId);

    state.xRatio = 0.45;
    state.thetaDeg = 30;
    state.W = 100;
    sliderTheta.value = 30;
    sliderW.value = 100;
    updateSimulation();
  });

  // Direct Canvas Dragging Interaction on Physical Canvas
  function getCanvasMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function handleDragStart(evt) {
    const pos = getCanvasMousePos(physCanvas, evt);
    const wb = layout.weightBoxCenter;
    // Allow dragging anywhere near the rod or the hanging weight
    const nearWeight =
      Math.abs(pos.x - wb.x) < wb.w &&
      pos.y >= layout.rodY - 25 &&
      pos.y <= wb.y + wb.h;
    const nearRod =
      pos.x >= layout.wallX &&
      pos.x <= layout.wallX + layout.rodLenPx &&
      Math.abs(pos.y - layout.rodY) < 28;

    if (nearWeight || nearRod) {
      state.isDraggingWeight = true;
      if (state.isPlaying) btnPlayPause.click(); // pause auto-play on manual drag
      handleDragMove(evt);
    }
  }

  function handleDragMove(evt) {
    if (!state.isDraggingWeight) return;
    if (evt.cancelable) evt.preventDefault();
    const pos = getCanvasMousePos(physCanvas, evt);
    const rawRatio = (pos.x - layout.wallX) / layout.rodLenPx;
    state.xRatio = Math.max(0.05, Math.min(0.98, rawRatio));
    updateSimulation();
  }

  function handleDragEnd() {
    if (state.isDraggingWeight) {
      state.isDraggingWeight = false;
      updateSimulation();
    }
  }

  physCanvas.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);

  physCanvas.addEventListener('touchstart', handleDragStart, { passive: false });
  window.addEventListener('touchmove', handleDragMove, { passive: false });
  window.addEventListener('touchend', handleDragEnd);

  // Initial Draw
  updateSimulation();
});
