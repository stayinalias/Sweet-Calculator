const localGamesDatabase = [
{ id: "g1", title: "Iron Snout", plays: "1.2M Plays", tag: "action", popular: true, icon: "⚔️", url: "gamedistribution.com" },
{ id: "g2", title: "Final Ninja Zero", plays: "285K Plays", tag: "action", popular: false, icon: "🥷", url: "gamedistribution.com" },
{ id: "g3", title: "Cubefield", plays: "2M Plays", tag: "popular", popular: true, icon: "🧊", url: "crazygames.com" },
{ id: "g4", title: "Magic Battleground", plays: "3.9K Plays", tag: "action", popular: true, icon: "🪄", url: "gamedistribution.com" },
{ id: "g5", title: "Slither.io", plays: "4.5M Plays", tag: "io", popular: true, icon: "🐍", url: "slither.io" },
{ id: "g6", title: "Paper.io 2", plays: "890K Plays", tag: "io", popular: false, icon: "📄", url: "paper-io.com" }
];
let activeFilterTag = "all";
let gatekeeperCodeModeActive = false;
let isHudSettingsPanelOpen = false;
/* --- CANVAS ENGINE MOUSE TRACKING SYSTEM --- */
const canvas = document.getElementById('bg-particle-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let activeCanvasEffect = "neon";
let mousePosition = { x: null, y: null };
let particleArray = [];
if (canvas) {
window.addEventListener('resize', resizeBackgroundTrackingCanvas);
window.addEventListener('mousemove', (e) => {
mousePosition.x = e.clientX;
mousePosition.y = e.clientY;
if (activeCanvasEffect !== "none") generateTrackingParticleNode();
});
}
function resizeBackgroundTrackingCanvas() {
if (!canvas) return;
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
if (!ctx) return;
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
if (!canvas || canvas.style.display === "none" || !ctx) return;
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
if (display.value === "0" || display.value === "CODE" || display.value === "INCORRECT") {
display.value = digitValue;
} else {
display.value = display.value + digitValue;
}
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
function submitPasscodeVerification() {
const display = document.getElementById('calc-display-node');
if (!gatekeeperCodeModeActive) {
showToastNotificationPopUp("Activate CD Mode before entering passcodes.", false);
return;
}
if (display.value === "2002") {
showToastNotificationPopUp("Correct Code! Unlocking dashboard...", true);
setTimeout(unlockPlatformDashboardEcosystem, 800);
} else {
showToastNotificationPopUp("Incorrect passcode parameter.", false);
display.value = "INCORRECT";
}
}
function showToastNotificationPopUp(messageText, isSuccessStyle) {
const toast = document.getElementById('passcode-toast-notification');
if (!toast) return;
toast.innerText = messageText;
toast.className = "toast-visible " + (isSuccessStyle ? "toast-success" : "toast-error");
setTimeout(() => { toast.className = "toast-hidden"; }, 2500);
}
function unlockPlatformDashboardEcosystem() {
document.getElementById('stealth-calculator-mask').style.display = "none";
document.getElementById('unlocked-gaming-hub').className = "view-visible";
document.getElementById('browser-tab-title').innerText = "Neegy Games";
document.getElementById('bg-particle-canvas').style.display = "block";
document.body.classList.add('wavy-active');
const avatar = document.getElementById('nav-brand-avatar');
if (avatar) {
avatar.src = "github.io";
avatar.style.display = "block";
}
document.getElementById('browser-tab-icon').setAttribute('href', 'github.io');
resizeBackgroundTrackingCanvas();
loopBackgroundAnimations();
renderGamesCatalogDisplay(localGamesDatabase);
}
/* --- SECTION C: HUD CONTROLS --- */
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
}
function engageInstantPanicCalculatorLock() {
isHudSettingsPanelOpen = false;
unloadActiveGameSession();
closeActiveUtilityAppSession();
document.getElementById('hud-settings-panel').className = "settings-panel-hidden";
document.getElementById('unlocked-gaming-hub').className = "view-hidden";
document.getElementById('bg-particle-canvas').style.display = "none";
document.body.classList.remove('wavy-active');
document.getElementById('browser-tab-title').innerText = "Sweet Calculator";
document.getElementById('browser-tab-icon').setAttribute('href', 'data:image/svg+xml,<svg xmlns=%22w3.org viewBox=%220 0 100 100%22>🧮');
document.getElementById('stealth-calculator-mask').style.display = "flex";
toggleCodeEntryMode(); clearCalculatorScreen();
}
/* --- SECTION D: GAME DISPLAY --- */
function renderGamesCatalogDisplay(dataset) {
const mount = document.getElementById('catalog-grid-mount');
if (!mount) return;
mount.innerHTML = "";
dataset.forEach(game => {
const card = document.createElement('div');
card.className = "game-card";
card.setAttribute('onclick', launchSelectedGame('${game.url}', '${game.title}'));
let popular = game.popular ? <span class="card-badge-popular">Popular</span> : "";
card.innerHTML = ${popular} <div class="media-placeholder-art"> <span class="fallback-icon">${game.icon}</span> </div> <h4>${game.title}</h4> <p>🎮 ${game.plays}</p>;
mount.appendChild(card);
});
}
function filterGameCatalog(t) { switchToGameCatalogView(); activeFilterTag = t; document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active')); const targetedBtn = document.getElementById(tab-${t}); if (targetedBtn) targetedBtn.classList.add('active'); const h = document.getElementById('catalog-title-header'); if (h) h.innerText = t === 'all' ? 'All Games' : ${t.toUpperCase()} Games; if (t === 'all') { renderGamesCatalogDisplay(localGamesDatabase); } else { renderGamesCatalogDisplay(localGamesDatabase.filter(g => g.tag === t || (t === 'popular' && g.popular))); } }
function switchToGameCatalogView() { document.getElementById('stealth-unblocker-view-panel').className = "view-hidden"; document.getElementById('game-catalog-view-panel').className = "view-visible"; document.getElementById('promo-banner-node').style.display = "flex"; document.getElementById('navbar-search-container').style.display = "block"; if (document.getElementById('wavy-effect-routing').value === "on") document.body.classList.add('wavy-active'); }
function switchToProxyUnblockerView() { unloadActiveGameSession(); document.getElementById('game-catalog-view-panel').className = "view-hidden"; document.getElementById('promo-banner-node').style.display = "none"; document.getElementById('navbar-search-container').style.display = "none"; document.getElementById('stealth-unblocker-view-panel').className = "view-visible"; }
function executeLiveGameSearch() { const q = document.getElementById('game-search-input').value.trim().toLowerCase(); let p = localGamesDatabase; if (activeFilterTag !== 'all') { p = localGamesDatabase.filter(g => g.tag === activeFilterTag || (activeFilterTag === 'popular' && g.popular)); } renderGamesCatalogDisplay(p.filter(g => g.title.toLowerCase().includes(q))); }
function launchRandomGame() { const game = localGamesDatabase[Math.floor(Math.random() * localGamesDatabase.length)]; launchSelectedGame(game.url, game.title); }
function launchSelectedGame(u, gameTitle) { document.getElementById('game-catalog-view-panel').className = "view-hidden"; document.getElementById('stealth-unblocker-view-panel').className = "view-hidden"; document.getElementById('inline-fullscreen-game-container').className = "view-visible"; document.body.classList.remove('wavy-active'); document.getElementById('active-playing-game-title').innerText = gameTitle; document.getElementById('inline-game-frame-target').src = u; }
function unloadActiveGameSession() { document.getElementById('inline-fullscreen-game-container').className = "view-hidden"; document.getElementById('inline-game-frame-target').src = "about:blank"; switchToGameCatalogView(); }
/* --- STEALTH OFFLINE UTILITY HANDLERS --- */
function launchOfflineUtilityApp(appType) {
const container = document.getElementById('utility-app-canvas-container');
const title = document.getElementById('active-utility-app-title');
const frame = document.getElementById('utility-app-frame-target');
container.className = "view-visible";
if (appType === 'notepad') {
title.innerText = "Stealth Note Scratchpad";
frame.src = "data:text/html,";
} else if (appType === 'canvas') {
title.innerText = "Retro Paint Canvas";
frame.src = "data:text/html,const canvas=document.getElementById('c');const ctx=canvas.getContext('2d');let painting=false;function start(e){painting=true;draw(e)}function end(){painting=false;ctx.beginPath()}function draw(e){if(!painting)return;ctx.lineWidth=5;ctx.lineCap='round';ctx.strokeStyle='%23ef4444';ctx.lineTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop);ctx.stroke();ctx.beginPath();ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop)}canvas.addEventListener('mousedown',start);canvas.addEventListener('mouseup',end);canvas.addEventListener('mousemove',draw);";
} else if (appType === 'portal') {
title.innerText = "Static Frame Viewer";
let target = prompt("Enter full website link to test inside container layer:", "https://example.com");
if (target) frame.src = target;
}
}
function closeActiveUtilityAppSession() {
if (!document.getElementById('utility-app-canvas-container')) return;
document.getElementById('utility-app-canvas-container').className = "view-hidden";
document.getElementById('utility-app-frame-target').src = "about:blank";
}
