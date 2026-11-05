const localGamesDatabase = [
{ id: "g1", title: "Iron Snout", plays: "1.2M Plays", tag: "action", popular: true, poster: "unsplash.com", url: "gamedistribution.com" },
{ id: "g2", title: "Final Ninja Zero", plays: "285 Plays", tag: "action", popular: false, poster: "unsplash.com", url: "gamedistribution.com" },
{ id: "g3", title: "Cubefield", plays: "207 Plays", tag: "popular", popular: true, poster: "unsplash.com", url: "crazygames.com" },
{ id: "g4", title: "Magic Battleground", plays: "3.9K Plays", tag: "action", popular: true, poster: "unsplash.com", url: "gamedistribution.com" },
{ id: "g5", title: "Slither.io", plays: "4.5M Plays", tag: "io", popular: true, poster: "unsplash.com", url: "slither.io" },
{ id: "g6", title: "Paper.io 2", plays: "890K Plays", tag: "io", popular: false, poster: "unsplash.com", url: "paper-io.com" }
];
let activeFilterTag = "all";
let gatekeeperCodeModeActive = false;
let isHudSettingsPanelOpen = false;
/* --- CANVAS ENGINE MOUSE TRACKING SYSTEM --- */
const canvas = document.getElementById('bg-particle-canvas');
const ctx = canvas.getContext('2d');
let activeCanvasEffect = "neon";
let mousePosition = { x: null, y: null };
let particleArray = [];
window.addEventListener('resize', resizeBackgroundTrackingCanvas);
window.addEventListener('mousemove', (e) => {
mousePosition.x = e.clientX;
mousePosition.y = e.clientY;
if (activeCanvasEffect !== "none") generateTrackingParticleNode();
});
function resizeBackgroundTrackingCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
class TrackingParticle {
constructor() {
this.x = mousePosition.x;
this.y = mousePosition.y;
this.size = Math.random() * 5 + 2;
this.speedX = Math.random() * 3 - 1.5;
this.speedY = Math.random() * 3 - 1.5;
this.color = getComputedStyle(document.documentElement).getPropertyValue('--bg-accent-border').trim() || '#ef4444';
this.alpha = 1;
}
update() {
if (activeCanvasEffect === "explosion") {
this.x += this.speedX * 2; this.y += this.speedY * 2;
} else if (activeCanvasEffect === "wave") {
this.x += Math.sin(this.y / 10); this.y -= 1;
} else {
this.x += this.speedX; this.y += this.speedY;
}
this.alpha -= 0.015;
}
draw() {
ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath();
ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color;
if (activeCanvasEffect === "neon") { ctx.shadowBlur = 10; ctx.shadowColor = this.color; }
ctx.fill(); ctx.restore();
}
}
function generateTrackingParticleNode() {
for (let i = 0; i < (activeCanvasEffect === 'explosion' ? 6 : 2); i++) {
particleArray.push(new TrackingParticle());
}
}
function loopBackgroundAnimations() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < particleArray.length; i++) {
particleArray[i].update(); particleArray[i].draw();
if (particleArray[i].alpha <= 0) { particleArray.splice(i, 1); i--; }
}
requestAnimationFrame(loopBackgroundAnimations);
}
/* --- SECTION B: STEALTH CALCULATOR ENGINE --- */
function clearCalculatorScreen() { document.getElementById('calc-display-node').value = "0"; }
function pressCalculatorSymbol(symbol) { if (gatekeeperCodeModeActive) return; document.getElementById('calc-display-node').value += symbol; }
function executeCalculatorMath() { if (gatekeeperCodeModeActive) return; const d = document.getElementById('calc-display-node'); try { d.value = Function('"use strict";return (' + d.value + ')')(); } catch (e) { d.value = "Error"; } }
function pressCalculatorNumber(digitValue) {
const display = document.getElementById('calc-display-node');
if (display.value === "0" || gatekeeperCodeModeActive) {
display.value = (gatekeeperCodeModeActive && display.value === "CODE") ? digitValue : digitValue;
} else { display.value += digitValue; }
if (gatekeeperCodeModeActive && display.value === "0001") unlockPlatformDashboardEcosystem();
}
function toggleCodeEntryMode() {
gatekeeperCodeModeActive = !gatekeeperCodeModeActive;
const mode = document.getElementById('calc-mode-indicator');
const d = document.getElementById('calc-display-node');
if (gatekeeperCodeModeActive) {
mode.innerText = "Code Entry Active"; mode.className = "mode-text-active"; d.value = "CODE";
} else {
mode.innerText = "Standard Mode"; mode.className = "mode-text-stealth"; d.value = "0";
}
}
function unlockPlatformDashboardEcosystem() {
document.getElementById('stealth-calculator-mask').style.display = "none";
document.getElementById('unlocked-gaming-hub').className = "view-visible";
document.getElementById('browser-tab-title').innerText = "Neegy Games";
document.getElementById('bg-particle-canvas').style.display = "block";
document.body.classList.add('wavy-active');
const avatar = document.getElementById('nav-brand-avatar');
avatar.src = "github.io";
avatar.style.display = "block";
document.getElementById('browser-tab-icon').setAttribute('href', 'github.io');
resizeBackgroundTrackingCanvas();
loopBackgroundAnimations();
renderGamesCatalogDisplay(localGamesDatabase);
}
/* --- SECTION C: HUD SETTINGS & WAVE CONTROLS --- */
function toggleSettingsDashboardPanel() {
isHudSettingsPanelOpen = !isHudSettingsPanelOpen;
document.getElementById('hud-settings-panel').className = isHudSettingsPanelOpen ? "settings-panel-visible" : "settings-panel-hidden";
}
function adjustActiveMouseTrackingEffect() {
activeCanvasEffect = document.getElementById('canvas-effect-routing').value;
particleArray = [];
}
function toggleWavyPhysicsEffect() {
const route = document.getElementById('wavy-effect-routing').value;
if (route === "on") { document.body.classList.add('wavy-active'); } else { document.body.classList.remove('wavy-active'); }
}
function reassignCorePlatformChroma(bgChroma, accentChroma) {
document.documentElement.style.setProperty('--bg-main-deep', bgChroma);
document.documentElement.style.setProperty('--bg-accent-border', accentChroma);
document.documentElement.style.setProperty('--btn-neon', accentChroma);
document.querySelectorAll('.color-palette-dot').forEach(dot => dot.classList.remove('active'));
event.currentTarget.classList.add('active');
}
function engageInstantPanicCalculatorLock() {
isHudSettingsPanelOpen = false;
document.getElementById('hud-settings-panel').className = "settings-panel-hidden";
document.getElementById('unlocked-gaming-hub').className = "view-hidden";
document.getElementById('bg-particle-canvas').style.display = "none";
document.body.classList.remove('wavy-active');
document.getElementById('browser-tab-title').innerText = "Sweet Calculator";
document.getElementById('browser-tab-icon').setAttribute('href', 'data:image/svg+xml,<svg xmlns=%22w3.org viewBox=%220 0 100 100%22>🧮');
document.getElementById('stealth-calculator-mask').style.display = "flex";
toggleCodeEntryMode(); clearCalculatorScreen();
}
/* --- SECTION D: CATALOG DISPLAY --- */
function renderGamesCatalogDisplay(d) {
const m = document.getElementById('catalog-grid-mount'); if (!m) return; m.innerHTML = "";
d.forEach(game => {
const c = document.createElement('div'); c.className = "game-card";
c.setAttribute('onclick', launchSelectedGame('${game.url}'));
let p = game.popular ? <span class="card-badge-popular">Popular</span> : "";
c.innerHTML = ${p}<img src="${game.poster}" alt="${game.title}"><h4>${game.title}</h4><p>🎮 ${game.plays}</p>;
m.appendChild(c);
});
}
function filterGameCatalog(t) { switchToGameCatalogView(); activeFilterTag = t; document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active')); const targetedBtn = document.getElementById(tab-${t}); if (targetedBtn) targetedBtn.classList.add('active'); const h = document.getElementById('catalog-title-header'); if (h) h.innerText = t === 'all' ? 'All Games' : ${t.toUpperCase()} Games; if (t === 'all') { renderGamesCatalogDisplay(localGamesDatabase); } else { renderGamesCatalogDisplay(localGamesDatabase.filter(g => g.tag === t || (t === 'popular' && g.popular))); } }
function switchToGameCatalogView() { document.getElementById('stealth-unblocker-view-panel').className = "view-hidden"; document.getElementById('game-catalog-view-panel').className = "view-visible"; document.getElementById('promo-banner-node').style.display = "flex"; document.getElementById('navbar-search-container').style.display = "block"; }
switchToProxyUnblockerView() { document.getElementById('game-catalog-view-panel').className = "view-hidden"; document.getElementById('promo-banner-node').style.display = "none"; document.getElementById('navbar-search-container').style.display = "none"; document.getElementById('stealth-unblocker-view-panel').className = "view-visible"; }
function executeLiveGameSearch() { const q = document.getElementById('game-search-input').value.trim().toLowerCase(); let p = localGamesDatabase; if (activeFilterTag !== 'all') { p = localGamesDatabase.filter(g => g.tag === activeFilterTag || (activeFilterTag === 'popular' && g.popular)); } renderGamesCatalogDisplay(p.filter(g => g.title.toLowerCase().includes(q))); }
function launchRandomGame() { launchSelectedGame(localGamesDatabase[Math.floor(Math.random() * localGamesDatabase.length)].url); }
function launchSelectedGame(u) { const m = document.getElementById('game-player-modal'); const i = document.getElementById('game-frame-target'); if (m && i) { document.body.classList.remove('wavy-active'); i.src = u; m.className = "modal-visible"; } }
function closeActiveGameSession() { const m = document.getElementById('game-player-modal'); const i = document.getElementById('game-frame-target'); if (m && i) { i.src = ""; m.className = "modal-hidden"; if (document.getElementById('wavy-effect-routing').value === "on") document.body.classList.add('wavy-active'); } }
