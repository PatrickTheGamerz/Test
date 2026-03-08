const bird = document.getElementById('bird');
const world = document.getElementById('world');
const hangar = document.getElementById('hangar-viewport');
const cursor = document.getElementById('cursor');

// --- GAME STATE ---
let mode = 'loading';
let currentGameMode = 'original';
let currentProtocol = 'single';
let birdY = 300, vel = 0;
let pipes = [], frame = 0, score = 0;
let panX = -1750, panY = -1625; // Centered on 2000,2000
let isPanning = false, lastX, lastY;

let credits = parseInt(localStorage.getItem('ob_pts')) || 0;
let highscore = parseInt(localStorage.getItem('ob_hi')) || 0;
let owned = JSON.parse(localStorage.getItem('ob_own')) || [];
let achievements = JSON.parse(localStorage.getItem('ob_ach')) || [];

// --- SKILL DATA ---
const skills = [
    { id: 'core', name: 'CORE DRIVE', d: 'Enable Flight', cost: 0, x: 2000, y: 2000, pre: null },
    { id: 'ag1', name: 'SLIM CHASSIS', d: 'Smaller Hitbox', cost: 25, x: 2000, y: 1800, pre: 'core' },
    { id: 'wt1', name: 'DATA LINK', d: '+5 CR/Level', cost: 40, x: 2200, y: 2000, pre: 'core' },
    { id: 'ag2', name: 'NITRO FLAP', d: 'Low Latency', cost: 60, x: 2000, y: 1600, pre: 'ag1' }
];

const rankList = [
    { id: 'r1', name: 'VANGUARD', d: '10 Points', tier: 'cyan', cond: () => highscore >= 10 },
    { id: 'r2', name: 'ORBITAL ACE', d: '30 Points', tier: 'blue', cond: () => highscore >= 30 },
    { id: 'r3', name: 'NEBULA COMMAND', d: '60 Points', tier: 'orange', cond: () => highscore >= 60 }
];

// --- NAVIGATION ---
function switchUI(m) {
    mode = m;
    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');
    const target = document.getElementById(`${m}-ui`);
    if (target) target.style.display = 'flex';

    if (m === 'menu') updateDisplay();
    if (m === 'hangar') initHangar();
}

function updateDisplay() {
    document.getElementById('points-val').innerText = credits;
    document.getElementById('high-val').innerText = highscore;
    document.getElementById('hangar-pts').innerText = credits;
}

// --- MISSION LOGIC ---
function setProtocol(p) {
    currentProtocol = p;
    document.getElementById('p-solo').className = p === 'single' ? 'select-btn active' : 'select-btn';
    document.getElementById('p-multi').className = p === 'multi' ? 'select-btn active' : 'select-btn';
}

function startGame(type) {
    if (!owned.includes('core')) return showToast("LOCKED", "Unlock Core Drive in Hangar!");
    if (currentProtocol === 'multi') return showToast("ERROR", "No servers found in this sector.");

    currentGameMode = type;
    mode = 'play';
    score = 0; pipes = []; birdY = 350; vel = 0; frame = 0;
    world.innerHTML = '';
    document.getElementById('top-score').innerText = '0';
    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');
    loop();
}

function loop() {
    if (mode !== 'play') return;
    frame++;

    vel += 0.4;
    birdY += vel;
    bird.style.top = birdY + 'px';
    bird.style.transform = `rotate(${Math.min(vel * 3, 45)}deg)`;

    if (frame % (currentGameMode === 'advanced' ? 80 : 110) === 0) spawnPipe();

    pipes.forEach((p, i) => {
        p.x -= 4;
        p.dt.style.left = p.x + 'px';
        p.db.style.left = p.x + 'px';

        const b = bird.getBoundingClientRect();
        const t = p.dt.getBoundingClientRect();
        const bot = p.db.getBoundingClientRect();
        const hit = owned.includes('ag1') ? 12 : 4;

        if (b.right-hit > t.left && b.left+hit < t.right) {
            if (b.top+hit < t.bottom || b.bottom-hit > bot.top) endGame();
        }

        if (p.x < 50 && !p.passed) {
            p.passed = true; score++;
            document.getElementById('top-score').innerText = score;
        }
    });

    if (birdY > 740 || birdY < -50) endGame();
    requestAnimationFrame(loop);
}

function spawnPipe() {
    const gap = 190;
    const topH = Math.random() * (750 - gap - 200) + 100;
    const p = { 
        x: 550, passed: false, 
        dt: document.createElement('div'), 
        db: document.createElement('div') 
    };
    p.dt.className = 'pipe pipe-top'; p.dt.style.height = topH + 'px'; p.dt.style.top = '0';
    p.db.className = 'pipe pipe-bottom'; p.db.style.height = (750 - topH - gap) + 'px'; p.db.style.bottom = '0';
    world.appendChild(p.dt); world.appendChild(p.db);
    pipes.push(p);
}

function endGame() {
    mode = 'dead';
    let reward = score * (currentGameMode === 'advanced' ? 2 : 1);
    if (owned.includes('wt1')) reward += 10;
    credits += reward;
    if (score > highscore) highscore = score;
    
    localStorage.setItem('ob_pts', credits);
    localStorage.setItem('ob_hi', highscore);
    
    document.getElementById('gameover-ui').style.display = 'flex';
    document.getElementById('res-score').innerText = score;
    document.getElementById('res-points').innerText = reward;
    checkAchievements();
}

// --- HANGAR & SKILLS ---
function initHangar() {
    const svg = document.getElementById('lines');
    svg.innerHTML = '';
    document.querySelectorAll('.node').forEach(n => n.remove());
    hangar.style.transform = `translate(${panX}px, ${panY}px)`;

    skills.forEach(s => {
        const isOwned = owned.includes(s.id);
        const isReady = !s.pre || owned.includes(s.pre);
        const div = document.createElement('div');
        div.className = `node ${isOwned ? 'node-owned' : (isReady ? 'node-ready' : '')}`;
        div.style.left = s.x + 'px'; div.style.top = s.y + 'px';
        div.innerHTML = `<b>${s.name}</b><br><small>${isOwned ? 'INSTALLED' : s.cost + ' CR'}</small>`;
        
        div.onclick = () => {
            if (isReady && !isOwned && credits >= s.cost) {
                credits -= s.cost; owned.push(s.id);
                localStorage.setItem('ob_own', JSON.stringify(owned));
                initHangar(); updateDisplay();
                showToast("UPGRADED", s.name);
            }
        };
        hangar.appendChild(div);

        if (s.pre) {
            const preNode = skills.find(x => x.id === s.pre);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", preNode.x); line.setAttribute("y1", preNode.y);
            line.setAttribute("x2", s.x); line.setAttribute("y2", s.y);
            line.setAttribute("stroke", isOwned ? "#ff9f43" : "#1e293b");
            line.setAttribute("stroke-width", "4");
            svg.appendChild(line);
        }
    });
}

// --- MISC ---
function checkAchievements() {
    rankList.forEach(r => {
        if (!achievements.includes(r.id) && r.cond()) {
            achievements.push(r.id);
            localStorage.setItem('ob_ach', JSON.stringify(achievements));
            showToast("RANK UP", r.name);
        }
    });
}

function showToast(name, desc) {
    document.getElementById('t-name').innerText = name;
    document.getElementById('t-desc').innerText = desc;
    const t = document.getElementById('toast');
    t.style.display = 'flex';
    setTimeout(() => t.style.display = 'none', 3000);
}

// --- INITIALIZE & INPUTS ---
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        switchUI('menu');
    }, 2800);
};

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
    if (mode === 'play') vel = -7.5;
    if (mode === 'hangar') { isPanning = true; lastX = e.clientX; lastY = e.clientY; }
});
document.addEventListener('mouseup', () => isPanning = false);
