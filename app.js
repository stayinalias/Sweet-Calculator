/* Basic reset */
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family: Arial, Helvetica, sans-serif; background:#111; color:#eee; display:flex; flex-direction:column; align-items:center; min-height:100vh; }

/* Mouse‑tracing background */
body::before {
  content:"";
  position:fixed;
  top:0; left:0; width:100%; height:100%;
  background-size:cover;
  background-image:url('assets/bg1.jpg');
  opacity:0.1;
  z-index:-1;
  pointer-events:none;
}

/* Color‑changing border effect */
@keyframes rainbow {
  0%   { border-color:#ff0080; }
  20%  { border-color:#ff8c00; }
  40%  { border-color:#00ff66; }
  60%  { border-color:#0000ff; }
  80%  { border-color:#ff00ff; }
  100% { border-color:#ff0080; }
}

#calculator {
  width:320px;
  border:2px solid #ff0080;
  border-radius:10px;
  animation:rainbow 6s linear infinite;
  margin-top:50px;
  background:#222;
  padding:10px;
  box-shadow:0 4px 10px rgba(0,0,0,0.5);
}

#display {
  margin-bottom:10px;
  text-align:right;
}

#calc-output {
  width:100%;
  height:40px;
  background:#333;
  border:none;
  color:#fff;
  font-size:1.5rem;
  padding:5px 10px;
}

.keys { display:grid; grid-template-columns:repeat(4,1fr); gap:5px; }

button { padding:15px; font-size:1.2rem; border:none; border-radius:5px; cursor:pointer; background:#444; color:#fff; transition:background .2s; }
button:hover { background:#555; }
button.special { grid-column:1 / -1; background:#0080ff; }
button.special:hover { background:#0040ff; }

.hidden { display:none; }


* Rainbow border – subtle rainbow transition.
* Mouse‑tracing – a light background image that can be swapped automatically with a JS loop if you want more dynamic tracing.
* Responsive – works on most screen sizes; just keep the width at 320px.

---

## 4. games.json

[
  {
    "title":"Lucky Block Battle Grounds",
    "link":"https://www.roblox.com/games/662417684/LUCKY-BLOCKS-Battlegrounds",
    "image":"assets/lucky.png"
  },
  {
    "title":"Natural Disaster Survival",
    "link":"https://www.roblox.com/games/189707/Natural-Disaster-Survival",
    "image":"assets/disaster.png"
  },
  {
    "title":"Mining Simulator",
    "link":"https://www.roblox.com/games/1417427737/Mining-Simulator",
    "image":"assets/mining.png"
  },
  {
    "title":"Survive and Kill the Killers in Area 51!",
    "link":"https://www.roblox.com/games/155382109/Survive-and-Kill-the-Killers-in-Area-51",
    "image":"assets/area51.png"
  }
]
