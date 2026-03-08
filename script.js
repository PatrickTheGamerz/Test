// --- CORE ENGINE ---
const bird = document.getElementById('bird');
const world = document.getElementById('world');
const hangar = document.getElementById('hangar-viewport');
const cursor = document.getElementById('cursor');

let mode = 'menu';
let currentGameMode = 'original';
let birdY = 300, vel = 0;
let pipesPassed = 0, pipes = [], frame = 0;
let isPanning = false, lastX, lastY, panX = -1750, panY = -1625;

// --- PERSISTENCE ---
let points = parseInt(localStorage.getItem('ob_pro_pts')) || 0;
let highscore = parseInt(localStorage.getItem('ob_pro_hi')) || 0;
let owned = JSON.parse(localStorage.getItem('ob_pro_own')) || [];
let achievements = JSON.parse(localStorage.getItem('ob_pro_ach')) || [];

// --- ASSET DATA ---
const skillTree = [
    { id: 'core', name: 'CORE DRIVE', d: 'Enables flight systems.', cost: 0, x: 2000, y: 2000, pre: null },
    { id: 'ag1', name: 'SLIM FRAME', d: 'Reduced collision hitbox.', cost: 20, x: 2000, y: 1750, pre: 'core' },
    { id: 'wt1', name: 'CREDIT CHIP', d: '+2 Credits per pipe.', cost: 30, x: 2250, y: 2000, pre: 'core' },
    { id: 'wt2', name: 'MIDAS PROTOCOL', d: 'Double total rewards.', cost: 100, x: 2550, y: 2000, pre: 'wt1' },
    { id: 'ag2', name: 'FLUID PUMP', d: 'Lower gravity pull.', cost: 50, x: 1750, y: 1750, pre: 'ag1' }
];

const medals = [
    { id: 'a1', name: 'IRON WING', d: 'Score 10 Pipes.', icon: '🥉', cond: () => highscore >= 10 },
    { id: 'a2', name: 'SILVER STREAK', d: 'Score 30 Pipes.', icon: '🥈', cond: () => highscore >= 30 },
    { id: 'a3', name: 'ACE COMMANDER', d: 'Score 60 Pipes.', icon: '🥇', cond: () => highscore >= 60 },
    { id: 'a4', name: 'TITAN OF INDUSTRY', d: 'Hold 1000 Credits.', icon: '💎', cond: () => points >= 1000 }
];

// --- INITIALIZATION ---
window.onload = () => {
    updateGlobalUI();
    // Simulate complex loading
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        document.getElementById('load-bar').style.width = Math.min(progress, 100) + '%';
        if(progress >= 100) {
            clearInterval(interval);
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => document.getElementById('loading-screen').remove(), 800);
        }
    }, 50);
};

function updateGlobalUI() {
    document.getElementById('points-val').innerText = points;
    document.getElementById('high-val').innerText = highscore;
    document.getElementById('hangar-pts').innerText = points;
}

// --- NAVIGATION ---
function switchUI(target) {
    mode = target;
    document.querySelectorAll('.gui-overlay').forEach(g => g.style.display = 'none');
    
    if (target === 'menu') {
        document.getElementById('menu-ui').style.display = 'flex';
        updateGlobalUI();
    } else if (target === 'lobby') {
        document.getElementById('lobby-ui').style.display = 'flex';
        setLobbyMode('single');
    } else if (target === 'hangar') {
        document.getElementById('hangar-ui').style.display = 'flex';
        panX = -1750; panY = -1625; // Reset Center
        initHangar();
    } else if (target === 'medals') {
        document.getElementById('medals-ui').style.display = 'flex';
        renderMedals();
    }
}

function setLobbyMode(m) {
    const content = document.getElementById('lobby-content');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + m).classList.add('active');

    if (m === 'single') {
        content.innerHTML = `
            <div class="mission-list">
                <div class="mission-item" onclick="startGame('original')">
                    <h3>ORIGINAL MISSION</h3>
                    <p>Low turbulence. Standard credit yield.</p>
                </div>
                <div class="mission-item adv" onclick="startGame('advanced')">
                    <h3>ADVANCED MISSION</h3>
                    <p>Moving pipes. 2.5x Multiplier.</p>
                </div>
            </div>`;
    } else {
        content.innerHTML = `
            <div class="server-list">
                <div class="server-item" onclick="startGame('advanced')"><span>[US] ELITE_SQUAD_01</span><b>18/24</b></div>
                <div class="server-item locked"><span>[EU] MEGA_SERVER</span><b>FULL</b></div>
                <div class="btn btn-primary" style="width:100%" onclick="showToast('SERVER','Creating match...')">CREATE SERVER</div>
            </div>`;
    }
}

// --- GAMEPLAY ENGINE ---
function startGame(type) {
    if (!owned.includes('core')) {
        showToast("LOCKED", "Unlock 'Core Drive' in Hangar first!");
        return switchUI('hangar');
    }
    currentGameMode = type;
    mode = 'play';
    document.querySelectorAll('.gui-overlay').forEach(g => g.style.display = 'none');
    birdY = 350; vel = 0; pipesPassed = 0; pipes = []; frame = 0;
    world.innerHTML = '';
    document.getElementById('top-score').innerText = '0';
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (mode !== 'play') return;
    frame++;

    // Physics
    const grav = owned.includes('ag2') ? 0.38 : 0.48;
    vel += grav; birdY += vel;
    bird.style.top = birdY + 'px';
    bird.style.transform = `rotate(${Math.min(vel * 3, 90)}deg)`;

    // Spawn Logic
    const spawnRate = (currentGameMode === 'advanced') ? 90 : 130;
    if (frame % spawnRate === 0) spawnPipe();

    // Pipe Management
    pipes.forEach((p, i) => {
        p.x -= 4;
        p.dt.style.left = p.x + 'px'; p.db.style.left = p.x + 'px';

        // Collision
        const bRect = bird.getBoundingClientRect();
        const tRect = p.dt.getBoundingClientRect();
        const bPipeRect = p.db.getBoundingClientRect();
        const pad = owned.includes('ag1') ? 14 : 7;

        if (bRect.right - pad > tRect.left && bRect.left + pad < tRect.right) {
            if (bRect.top + pad < tRect.bottom || bRect.bottom - pad > bPipeRect.top) {
                endMission();
            }
        }

        // Scoring
        if (p.x < 50 && !p.passed) {
            p.passed = true;
            pipesPassed++;
            document.getElementById('top-score').innerText = pipesPassed;
            checkMedals();
        }
    });

    if (birdY > 730 || birdY < -50) endMission();
    requestAnimationFrame(gameLoop);
}

function spawnPipe() {
    const gap = (currentGameMode === 'advanced') ? 170 : 220;
    const minH = 100, maxH = 750 - gap - 100;
    const topH = Math.random() * (maxH - minH) + minH;

    const p = { 
        x: 550, passed: false, 
        dt: document.createElement('div'), 
        db: document.createElement('div') 
    };
    
    p.dt.className = 'pipe'; p.db.className = 'pipe';
    p.dt.style.height = topH + 'px'; p.dt.style.top = '0';
    p.db.style.height = (750 - topH - gap) + 'px'; p.db.style.bottom = '0';
    
    world.appendChild(p.dt); world.appendChild(p.db);
    pipes.push(p);
}

function endMission() {
    mode = 'gameover';
    let reward = pipesPassed * (currentGameMode === 'advanced' ? 5 : 2);
    if(owned.includes('wt1')) reward += (pipesPassed * 2);
    if(owned.includes('wt2')) reward *= 2;
    
    points += reward;
    const isNewHigh = pipesPassed > highscore;
    if(isNewHigh) highscore = pipesPassed;
    saveProgress();

    document.getElementById('gameover-ui').style.display = 'flex';
    document.getElementById('res-score').innerText = pipesPassed;
    document.getElementById('res-points').innerText = reward;
    document.getElementById('res-high').innerText = isNewHigh ? 'YES!' : 'NO';
    updateGlobalUI();
}

// --- HANGAR SYSTEM ---
function initHangar() {
    const svg = document.getElementById('skill-lines');
    const container = document.getElementById('node-container');
    svg.innerHTML = ''; container.innerHTML = '';
    hangar.style.transform = `translate(${panX}px, ${panY}px)`;

    skillTree.forEach(s => {
        const isOwned = owned.includes(s.id);
        const isReady = s.pre === null || owned.includes(s.pre);
        
        const div = document.createElement('div');
        div.className = `node ${isOwned ? 'node-owned' : (isReady ? 'node-ready' : '')}`;
        div.style.left = s.x + 'px'; div.style.top = s.y + 'px';
        div.innerHTML = `<b>${s.name}</b><br><small>${s.d}</small><br><b>${isOwned?'UNLOCKED':s.cost+' CR'}</b>`;
        
        div.onmousedown = (e) => {
            e.stopPropagation(); // Prevents panning while clicking
            if (isReady && !isOwned && points >= s.cost) {
                points -= s.cost; owned.push(s.id); 
                saveProgress(); initHangar(); updateGlobalUI();
                showToast("UPGRADE UNLOCKED", s.name);
            }
        };
        container.appendChild(div);

        if (s.pre) {
            const pre = skillTree.find(x => x.id === s.pre);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", pre.x); line.setAttribute("y1", pre.y);
            line.setAttribute("x2", s.x); line.setAttribute("y2", s.y);
            line.setAttribute("class", `connector ${isOwned ? 'connector-active' : ''}`);
            svg.appendChild(line);
        }
    });
}

// --- UTILS ---
function saveProgress() {
    localStorage.setItem('ob_pro_pts', points);
    localStorage.setItem('ob_pro_hi', highscore);
    localStorage.setItem('ob_pro_own', JSON.stringify(owned));
    localStorage.setItem('ob_pro_ach', JSON.stringify(achievements));
}

function renderMedals() {
    const box = document.getElementById('medal-list'); box.innerHTML = '';
    medals.forEach(m => {
        const got = achievements.includes(m.id);
        box.innerHTML += `
            <div class="medal-item ${got?'earned':''}">
                <div class="medal-hex">${m.icon}</div>
                <div class="medal-info"><h3>${m.name}</h3><p>${m.d}</p></div>
            </div>`;
    });
}

function checkMedals() {
    medals.forEach(m => {
        if (!achievements.includes(m.id) && m.cond()) {
            achievements.push(m.id);
            saveProgress();
            showToast("MEDAL EARNED", m.name);
        }
    });
}

function showToast(title, desc) {
    document.getElementById('t-name').innerText = title;
    document.getElementById('t-desc').innerText = desc;
    const t = document.getElementById('toast');
    t.classList.add('pop');
    setTimeout(() => t.classList.remove('pop'), 3500);
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
window.addEventListener('keydown', e => { if(e.code === 'Space' && mode === 'play') vel = -8.5; });
