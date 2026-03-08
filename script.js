FLY MISSION button sends player to hangar also player cant exit the hangar for some reason, the MEDALS names shouldnt be like.. BRONZE TROPHY and stuff like that i mean trophies themselves textures and thier colors.. the achivments names should be nicer and more custom like...

and for hangar player should always start the hangar at the center u know the first skill center skill... also title screen and stuf like that look weird so fix that also way better loading screen make that and background for the loading screen prob of kinda gameplay itself by bot kinda. while game loads.

and the FLY MISSION gui should be more like... create server and stuff like that and then SELECT MISSION... and there will be to pick SIGEPLAYER mode on that or MULTIPLAYER and way more! and make sure that everything will work very well!





























index.html



<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>ORANGEBIRD PRO | AEROSPACE</title>

    <link rel="stylesheet" href="style.css">

</head>

<body oncontextmenu="return false;">



    <div id="loading-screen">

        <div class="loader-container">

            <div class="loader"></div>

            <div class="loader-inner"></div>

        </div>

        <h2 id="loading-text">INITIALIZING SYSTEMS...</h2>

        <p id="loading-tip">TIP: Unlock "Core Systems" in the hangar to begin flight.</p>

    </div>



    <div id="cursor"></div>



    <div id="game-container">

        <div id="bg-far"></div>

        <div id="bg-near"></div>

        

        <div id="top-score" class="ingame-ui">0</div>



        <div id="menu-ui" class="gui">

            <div class="logo-area">

                <span class="version">V3.0 ELITE</span>

                <h1>ORANGEBIRD</h1>

            </div>

            <div class="stats-bar">

                <div class="stat"><span>PILOT RECORD</span><b id="high-val">0</b></div>

                <div class="stat"><span>CREDITS</span><b id="points-val">0</b></div>

            </div>

            <button id="btn-play" class="btn" onclick="switchUI('mission-select')">FLY MISSION</button>

            <button class="btn btn-sec" onclick="switchUI('hangar')">ENGINEERING HANGAR</button>

            <button class="btn btn-sec" onclick="switchUI('medals')">PILOT RECORDS</button>

        </div>



        <div id="mission-ui" class="gui" style="display:none;">

            <h2 class="gui-title">SELECT MISSION</h2>

            <div class="mission-grid">

                <div class="mission-card" onclick="startGame('original')">

                    <h3>ORIGINAL</h3>

                    <p>Standard obstacle course. Classic physics.</p>

                </div>

                <div class="mission-card advanced" onclick="startGame('advanced')">

                    <h3>ADVANCED</h3>

                    <p>Moving pipes & narrow gaps. High risk.</p>

                </div>

                <div class="mission-card locked">

                    <h3>MULTIPLAYER</h3>

                    <p>Coming to v3.1: Duel for Credits.</p>

                </div>

            </div>

            <button class="btn btn-sec" onclick="switchUI('menu')">BACK</button>

        </div>



        <div id="gameover-ui" class="gui" style="display:none;">

            <h2 id="death-msg">MISSION FAILED</h2>

            <div class="results-card">

                <div class="res-row"><span>PIPES PASSED</span><b id="res-score">0</b></div>

                <div class="res-row"><span>CREDITS EARNED</span><b id="res-points">0</b></div>

                <div class="res-row"><span>BEST RECORD</span><b id="res-high">0</b></div>

            </div>

            <button class="btn" onclick="startGame(currentGameMode)">RE-DEPLOY</button>

            <button class="btn btn-sec" onclick="switchUI('menu')">RETURN TO BASE</button>

        </div>



        <div id="hangar-ui" class="gui" style="display:none; background:transparent;">

            <div id="hangar-viewport">

                <svg id="lines" style="position:absolute; width:100%; height:100%; pointer-events:none;"></svg>

            </div>

            <div class="hangar-overlay">

                <div class="hangar-hud">CREDITS: <span id="hangar-pts">0</span></div>

                <div class="hangar-controls">DRAG TO NAVIGATE RESEARCH TREE</div>

                <button class="btn back-btn" onclick="switchUI('menu')">EXIT HANGAR</button>

            </div>

        </div>



        <div id="medals-ui" class="gui" style="display:none;">

            <h2 class="gui-title">PILOT MEDALS</h2>

            <div id="ach-list" class="scroll-box"></div>

            <button class="btn" onclick="switchUI('menu')">BACK</button>

        </div>



        <div id="toast">

            <div class="toast-img" id="toast-icon">🏆</div>

            <div class="toast-body"><b id="t-name"></b><span id="t-desc"></span></div>

        </div>



        <div id="bird"></div>

        <div id="world"></div>

    </div>



    <script src="script.js"></script>

</body>

</html>













style.css



:root {

    --orange: #ff9f43;

    --orange-dark: #ee5253;

    --accent: #00d2ff;

    --gold: #f1c40f;

    --silver: #bdc3c7;

    --bronze: #cd7f32;

    --bg-dark: #0f172a;

}



* { cursor: none !important; user-select: none; box-sizing: border-box; }



body {

    background: #020617; margin: 0; height: 100vh;

    display: flex; justify-content: center; align-items: center;

    font-family: 'Segoe UI', system-ui, sans-serif; overflow: hidden;

}



/* --- CURSOR FIX --- */

#cursor {

    width: 20px; height: 20px; border: 2px solid #fff; border-radius: 50%;

    position: fixed; pointer-events: none; z-index: 99999;

    background: rgba(255,159,67,0.3); box-shadow: 0 0 10px var(--orange);

    transition: transform 0.1s ease; transform: translate(-50%, -50%);

}



/* --- LOADING SCREEN --- */

#loading-screen {

    position: fixed; inset: 0; background: #020617; z-index: 10000;

    display: flex; flex-direction: column; align-items: center; justify-content: center;

}

.loader-container { position: relative; width: 80px; height: 80px; margin-bottom: 20px; }

.loader { width: 100%; height: 100%; border: 4px solid #1e293b; border-top-color: var(--orange); border-radius: 50%; animation: spin 1s linear infinite; }

.loader-inner { position: absolute; inset: 15px; border: 4px solid #1e293b; border-bottom-color: var(--accent); border-radius: 50%; animation: spin 0.5s linear reverse infinite; }

@keyframes spin { to { transform: rotate(360deg); } }



/* --- THE CONTAINER --- */

#game-container {

    width: 500px; height: 750px; background: #0f172a;

    position: relative; overflow: hidden; border: 10px solid #1e293b;

    border-radius: 20px; box-shadow: 0 0 100px rgba(0,0,0,0.8);

}



/* --- MISSION SELECT --- */

.mission-grid { display: flex; flex-direction: column; gap: 15px; margin: 20px 0; }

.mission-card {

    width: 320px; padding: 20px; background: rgba(255,255,255,0.05);

    border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; cursor: pointer; transition: 0.2s;

}

.mission-card:hover { background: rgba(255,255,255,0.1); border-color: var(--accent); transform: scale(1.02); }

.mission-card h3 { margin: 0; color: var(--accent); }

.mission-card p { margin: 5px 0 0; font-size: 13px; color: #94a3b8; }

.mission-card.advanced h3 { color: #f87171; }

.mission-card.locked { opacity: 0.4; cursor: not-allowed; }



/* --- HANGAR & NODES --- */

#hangar-viewport { position: absolute; width: 4000px; height: 4000px; background: radial-gradient(#1e293b 2px, transparent 2px) 0 0 / 60px 60px; }

.node {

    width: 130px; height: 130px; background: #1e293b; border: 4px solid #334155;

    border-radius: 24px; position: absolute; display: flex; flex-direction: column;

    align-items: center; justify-content: center; color: white; text-align: center;

    padding: 10px; transition: 0.3s; transform: translate(-50%, -50%);

}

.node-ready { border-color: var(--accent); cursor: pointer; }

.node-owned { background: var(--orange); color: #000; border-color: #fff; box-shadow: 0 0 30px var(--orange); }

.node b { font-size: 14px; }

.connector { stroke: #334155; stroke-width: 6; fill: none; transition: 0.5s; }

.connector-active { stroke: var(--orange); filter: drop-shadow(0 0 5px var(--orange)); }



/* --- MEDALS --- */

.medal-card {

    display: flex; align-items: center; gap: 20px; padding: 15px;

    background: rgba(255,255,255,0.05); margin: 10px; border-radius: 12px; width: 400px;

}

.medal-icon { font-size: 40px; }

.gold { color: var(--gold); text-shadow: 0 0 10px var(--gold); }

.silver { color: var(--silver); text-shadow: 0 0 10px var(--silver); }

.bronze { color: var(--bronze); text-shadow: 0 0 10px var(--bronze); }

.locked-medal { opacity: 0.2; filter: grayscale(1); }



/* --- PIPES --- */

.pipe { width: 85px; position: absolute; background: linear-gradient(90deg, #2ecc71, #27ae60); border: 4px solid #000; }

.pipe.moving { animation: pipe-wobble 2s ease-in-out infinite alternate; }

@keyframes pipe-wobble { from { transform: translateX(-20px); } to { transform: translateX(20px); } }



/* --- GUI OVERLAYS --- */

.gui {

    position: absolute; inset: 0; display: flex; flex-direction: column;

    align-items: center; justify-content: center; z-index: 500;

    background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px);

}

.btn {

    background: var(--orange); border: none; padding: 16px; color: white;

    font-weight: 900; border-radius: 8px; width: 280px; margin: 8px;

    box-shadow: 0 5px 0 #b33921; cursor: pointer;

}











script.js



const bird = document.getElementById('bird');

const world = document.getElementById('world');

const hangar = document.getElementById('hangar-viewport');

const cursor = document.getElementById('cursor');



// --- GAME DATA ---

let mode = 'menu';

let currentGameMode = 'original';

let birdY = 300, vel = 0;

let pipesPassed = 0, pipes = [], frame = 0;

let isPanning = false, lastX, lastY, panX = -1750, panY = -1625;



let points = parseInt(localStorage.getItem('ob_pts')) || 0;

let highscore = parseInt(localStorage.getItem('ob_hi')) || 0;

let owned = JSON.parse(localStorage.getItem('ob_own')) || [];

let achievements = JSON.parse(localStorage.getItem('ob_ach')) || [];



const tips = [

    "TIP: Drag the hangar to explore upgrades!",

    "TIP: Advanced mode grants 2x Credits per pipe.",

    "TIP: Buy 'Slim Frame' to dodge tight gaps.",

    "TIP: Highscores unlock Pilot Medals.",

    "TIP: Click to flap, don't hit the ceiling!"

];



// --- SKILL TREE DATA ---

const skills = [

    { id: 'core', name: 'CORE DRIVE', d: 'Enables Flight', cost: 0, x: 2000, y: 2000, pre: null },

    // Branch 1: Agility

    { id: 'ag1', name: 'SLIM FRAME', d: 'Smaller Hitbox', cost: 15, x: 2000, y: 1800, pre: 'core' },

    { id: 'ag2', name: 'NITRO FLAP', d: 'Quick Response', cost: 40, x: 2000, y: 1600, pre: 'ag1' },

    // Branch 2: Wealth

    { id: 'wt1', name: 'CREDIT CHIP', d: '+1 Bonus Credit', cost: 20, x: 2200, y: 2000, pre: 'core' },

    { id: 'wt2', name: 'TAX EVASION', d: 'Double Payout', cost: 60, x: 2450, y: 2000, pre: 'wt1' }

];



const medalList = [

    { id: 'br1', name: 'BRONZE WINGS', d: 'Reach 10 Score', tier: 'bronze', cond: () => highscore >= 10 },

    { id: 'sv1', name: 'SILVER FALCON', d: 'Reach 25 Score', tier: 'silver', cond: () => highscore >= 25 },

    { id: 'gd1', name: 'GOLDEN PHOENIX', d: 'Reach 50 Score', tier: 'gold', cond: () => highscore >= 50 },

    { id: 'rich', name: 'BILLIONAIRE', d: 'Have 500 Credits', tier: 'gold', cond: () => points >= 500 }

];



// --- INITIALIZATION ---

window.onload = () => {

    document.getElementById('loading-tip').innerText = tips[Math.floor(Math.random()*tips.length)];

    setTimeout(() => {

        document.getElementById('loading-screen').style.display = 'none';

    }, 2500);

    updateStatsDisplay();

};



function updateStatsDisplay() {

    document.getElementById('points-val').innerText = points;

    document.getElementById('high-val').innerText = highscore;

    document.getElementById('hangar-pts').innerText = points;

}



function switchUI(m) {

    mode = m;

    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');

    

    if (m === 'menu') {

        document.getElementById('menu-ui').style.display = 'flex';

        updateStatsDisplay();

    } else if (m === 'mission-select') {

        document.getElementById('mission-ui').style.display = 'flex';

    } else if (m === 'hangar') {

        document.getElementById('hangar-ui').style.display = 'flex';

        initSkillTree();

    } else if (m === 'medals') {

        document.getElementById('medals-ui').style.display = 'flex';

        renderMedals();

    }

}



function startGame(type) {

    if (!owned.includes('core')) {

        showToast("LOCKED", "Unlock Core Systems in Hangar!");

        return switchUI('hangar');

    }

    currentGameMode = type;

    mode = 'play';

    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');

    birdY = 350; vel = 0; pipesPassed = 0; pipes = []; frame = 0;

    world.innerHTML = '';

    document.getElementById('top-score').innerText = '0';

    requestAnimationFrame(engineLoop);

}



// --- CORE ENGINE ---

function engineLoop() {

    if (mode !== 'play') return;

    frame++;

    

    // Physics

    const gravity = owned.includes('ag2') ? 0.35 : 0.45;

    vel += gravity;

    birdY += vel;

    bird.style.top = birdY + 'px';

    bird.style.transform = `rotate(${Math.min(vel * 3, 90)}deg)`;



    // Spawn

    const spawnRate = currentGameMode === 'advanced' ? 90 : 130;

    if (frame % spawnRate === 0) spawnPipe();



    // Move & Collide

    pipes.forEach((p, i) => {

        p.x -= 4;

        p.dt.style.left = p.x + 'px'; p.db.style.left = p.x + 'px';



        const b = bird.getBoundingClientRect();

        const pt = p.dt.getBoundingClientRect();

        const pb = p.db.getBoundingClientRect();

        const pad = owned.includes('ag1') ? 14 : 6;



        if (b.right-pad > pt.left && b.left+pad < pt.right) {

            if (b.top+pad < pt.bottom || b.bottom-pad > pb.top) gameOver();

        }



        if (p.x < 50 && !p.passed) {

            p.passed = true;

            pipesPassed++;

            document.getElementById('top-score').innerText = pipesPassed;

            checkMedals();

        }

    });



    if (birdY > 730 || birdY < -50) gameOver();

    requestAnimationFrame(engineLoop);

}



function spawnPipe() {

    const gap = currentGameMode === 'advanced' ? 170 : 210;

    const topH = Math.random() * (750 - gap - 200) + 100;

    const p = { x: 550, passed: false, dt: document.createElement('div'), db: document.createElement('div') };

    

    [p.dt, p.db].forEach(el => {

        el.className = 'pipe' + (currentGameMode === 'advanced' && Math.random() > 0.5 ? ' moving' : '');

    });

    

    p.dt.style.height = topH + 'px'; p.dt.style.top = '0';

    p.db.style.height = (750 - topH - gap) + 'px'; p.db.style.bottom = '0';

    

    world.appendChild(p.dt); world.appendChild(p.db);

    pipes.push(p);

}



function gameOver() {

    mode = 'dead';

    let reward = pipesPassed * (currentGameMode === 'advanced' ? 2 : 1);

    if(owned.includes('wt1')) reward += 5;

    if(owned.includes('wt2')) reward *= 2;

    

    points += reward;

    if (pipesPassed > highscore) highscore = pipesPassed;

    save();



    document.getElementById('gameover-ui').style.display = 'flex';

    document.getElementById('res-score').innerText = pipesPassed;

    document.getElementById('res-points').innerText = reward;

    document.getElementById('res-high').innerText = highscore;

}



// --- HANGAR & SKILLS ---

function initSkillTree() {

    const svg = document.getElementById('lines');

    svg.innerHTML = '';

    document.querySelectorAll('.node').forEach(n => n.remove());

    hangar.style.transform = `translate(${panX}px, ${panY}px)`;



    skills.forEach(s => {

        const div = document.createElement('div');

        const isOwned = owned.includes(s.id);

        const isReady = s.pre === null || owned.includes(s.pre);

        

        div.className = `node ${isOwned ? 'node-owned' : (isReady ? 'node-ready' : '')}`;

        div.style.left = s.x + 'px'; div.style.top = s.y + 'px';

        div.innerHTML = `<b>${s.name}</b><small>${s.d}</small><br><b>${isOwned?'[UNLOCKED]':s.cost+' CR'}</b>`;

        

        div.onclick = () => {

            if (isReady && !isOwned && points >= s.cost) {

                points -= s.cost; owned.push(s.id); save();

                initSkillTree();

                updateStatsDisplay();

                showToast("RESEARCH COMPLETE", s.name);

            }

        };

        hangar.appendChild(div);



        if (s.pre) {

            const pre = skills.find(x => x.id === s.pre);

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            line.setAttribute("x1", pre.x); line.setAttribute("y1", pre.y);

            line.setAttribute("x2", s.x); line.setAttribute("y2", s.y);

            line.setAttribute("class", `connector ${isOwned ? 'connector-active' : ''}`);

            svg.appendChild(line);

        }

    });

}



// --- MEDALS ---

function renderMedals() {

    const box = document.getElementById('ach-list');

    box.innerHTML = '';

    medalList.forEach(m => {

        const isGot = achievements.includes(m.id);

        box.innerHTML += `

            <div class="medal-card ${!isGot ? 'locked-medal' : ''}">

                <div class="medal-icon ${m.tier}">🏆</div>

                <div>

                    <h3 style="margin:0; color:${isGot?'white':'#444'}">${m.name}</h3>

                    <small style="color:#888">${m.d}</small>

                </div>

            </div>`;

    });

}



function checkMedals() {

    medalList.forEach(m => {

        if (!achievements.includes(m.id) && m.cond()) {

            achievements.push(m.id);

            save();

            showToast("MEDAL EARNED", m.name);

        }

    });

}



// --- HELPERS ---

function save() {

    localStorage.setItem('ob_pts', points);

    localStorage.setItem('ob_hi', highscore);

    localStorage.setItem('ob_own', JSON.stringify(owned));

    localStorage.setItem('ob_ach', JSON.stringify(achievements));

}



function showToast(name, desc) {

    document.getElementById('t-name').innerText = name;

    document.getElementById('t-desc').innerText = desc;

    const t = document.getElementById('toast');

    t.classList.add('pop');

    setTimeout(() => t.classList.remove('pop'), 4000);

}



// --- INPUTS ---

document.addEventListener('mousemove', e => {

    cursor.style.left = e.clientX + 'px';

    cursor.style.top = e.clientY + 'px';

    if (isPanning && mode === 'hangar') {

        panX += e.clientX - lastX; panY += e.clientY - lastY;

        hangar.style.transform = `translate(${panX}px, ${panY}px)`;

        lastX = e.clientX; lastY = e.clientY;

    }

});



document.addEventListener('mousedown', e => {

    if(mode === 'hangar') { isPanning = true; lastX = e.clientX; lastY = e.clientY; }

    if(mode === 'play') vel = -8.5;

});

document.addEventListener('mouseup', () => isPanning = false);









And show the WHOLE UPDATED FILES
