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
