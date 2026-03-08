const bird = document.getElementById('bird');
const world = document.getElementById('world');
const hangar = document.getElementById('hangar-viewport');
const pointsVal = document.getElementById('points-val');
const highVal = document.getElementById('high-val');

// GAME STATE
let mode = 'menu';
let birdY = 300, vel = 0;
let pipesPassed = 0, pipes = [], frame = 0;
let isPanning = false, lastX, lastY, panX = -1750, panY = -1625;

// SAVE DATA
let points = parseInt(localStorage.getItem('ob_pts')) || 0;
let highscore = parseInt(localStorage.getItem('ob_hi')) || 0;
let owned = JSON.parse(localStorage.getItem('ob_own')) || [];
let achievements = JSON.parse(localStorage.getItem('ob_ach')) || [];

// UPGRADE STATS
let stats = { gravity: 0.5, jump: -9, pipeGap: 190, pointMult: 1, size: 1 };

// RADIAL SKILL TREE DATA (Center is 2000, 2000)
const skills = [
    { id: 'core', name: 'CORE SYSTEMS', d: 'Unlock Flight', cost: 0, x: 1940, y: 1940, pre: null },
    // Agility Path (Up)
    { id: 'ag1', name: 'Light Frame', d: 'Less Gravity', cost: 10, x: 1940, y: 1750, pre: 'core' },
    { id: 'ag2', name: 'Turbo Flap', d: 'Stronger Jump', cost: 25, x: 1940, y: 1550, pre: 'ag1' },
    // Wealth Path (Right)
    { id: 'wt1', name: 'Data Link', d: '2x Credits', cost: 15, x: 2150, y: 1940, pre: 'core' },
    { id: 'wt2', name: 'Midas Drive', d: '5x Credits', cost: 50, x: 2350, y: 1940, pre: 'wt1' },
    // Size Path (Down)
    { id: 'sz1', name: 'Slim Nano', d: 'Smaller Bird', cost: 20, x: 1940, y: 2150, pre: 'core' },
    // Luck Path (Left)
    { id: 'lk1', name: 'Wide Gate', d: 'Larger Gaps', cost: 15, x: 1730, y: 1940, pre: 'core' }
];

const medals = [
    { id: 'first_fly', name: 'First Sortie', d: 'Passed 1 Pipe', cond: () => highscore >= 1 },
    { id: 'rich', name: 'Investor', d: 'Earned 50 Credits', cond: () => points >= 50 },
    { id: 'pro', name: 'Ace Pilot', d: 'Score 20 Pipes', cond: () => highscore >= 20 }
];

// INITIALIZE
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('loading-screen').remove(), 1000);
    }, 1500);
    updateUIStrings();
    checkStart();
};

function updateUIStrings() {
    pointsVal.innerText = points;
    highVal.innerText = highscore;
}

function checkStart() {
    const btn = document.getElementById('btn-play');
    if(owned.includes('core')) btn.classList.remove('lock');
    else btn.classList.add('lock');
}

// UI NAVIGATION
function switchUI(m) {
    mode = m;
    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');
    if (m === 'menu') {
        document.getElementById('menu-ui').style.display = 'flex';
        updateUIStrings();
        checkStart();
    } else if (m === 'play') {
        if(!owned.includes('core')) return switchUI('hangar');
        initGame();
    } else if (m === 'hangar') {
        document.getElementById('hangar-ui').style.display = 'flex';
        initSkillTree();
    } else if (m === 'medals') {
        document.getElementById('medals-ui').style.display = 'flex';
        renderMedals();
    }
}

function initGame() {
    birdY = 300; vel = 0; pipesPassed = 0; pipes = []; frame = 0;
    world.innerHTML = '';
    bird.style.transform = `rotate(0deg) scale(${stats.size})`;
    applyUpgrades();
    requestAnimationFrame(engineLoop);
}

function applyUpgrades() {
    stats = { gravity: 0.5, jump: -9, pipeGap: 190, pointMult: 1, size: 1 };
    if(owned.includes('ag1')) stats.gravity = 0.35;
    if(owned.includes('ag2')) stats.jump = -11;
    if(owned.includes('wt1')) stats.pointMult = 2;
    if(owned.includes('wt2')) stats.pointMult = 5;
    if(owned.includes('sz1')) stats.size = 0.7;
    if(owned.includes('lk1')) stats.pipeGap = 240;
}

// GAME ENGINE
function engineLoop() {
    if (mode !== 'play') return;
    frame++;
    vel += stats.gravity; birdY += vel;
    bird.style.top = birdY + 'px';
    bird.style.transform = `rotate(${Math.min(vel * 3, 90)}deg) scale(${stats.size})`;

    if (frame % 120 === 0) spawnPipe();

    pipes.forEach((p, i) => {
        p.x -= 3.5;
        p.dt.style.left = p.x + 'px'; p.db.style.left = p.x + 'px';

        const b = bird.getBoundingClientRect();
        const pt = p.dt.getBoundingClientRect();
        const pb = p.db.getBoundingClientRect();

        // Better Collision (using a small padding)
        const pad = 8;
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

    if (birdY > 720 || birdY < -50) gameOver();
    requestAnimationFrame(engineLoop);
}

function spawnPipe() {
    const gap = stats.pipeGap;
    const topH = Math.random() * (750 - gap - 200) + 100;
    const p = { x: 550, passed: false, dt: document.createElement('div'), db: document.createElement('div') };
    p.dt.className = 'pipe'; p.dt.style.height = topH + 'px'; p.dt.style.top = '0';
    p.db.className = 'pipe'; p.db.style.height = (750 - topH - gap) + 'px'; p.db.style.bottom = '0';
    world.appendChild(p.dt); world.appendChild(p.db);
    pipes.push(p);
}

function gameOver() {
    mode = 'dead';
    const earned = pipesPassed * stats.pointMult;
    points += earned;
    if(pipesPassed > highscore) highscore = pipesPassed;
    save();

    // Show Results
    document.getElementById('gameover-ui').style.display = 'flex';
    document.getElementById('res-score').innerText = pipesPassed;
    document.getElementById('res-points').innerText = earned;
    document.getElementById('res-high').innerText = highscore;
}

// SKILL TREE LOGIC
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
        div.innerHTML = `<b>${s.name}</b><br>${s.d}<br>${isOwned?'[UNLOCKED]': (s.cost+' CR')}`;
        
        div.onclick = () => {
            if (isReady && !isOwned && points >= s.cost) {
                points -= s.cost; owned.push(s.id); save();
                initSkillTree();
                showToast("UPGRADE PURCHASED", s.name);
            }
        };
        hangar.appendChild(div);

        if (s.pre) {
            const pre = skills.find(x => x.id === s.pre);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", pre.x+60); line.setAttribute("y1", pre.y+60);
            line.setAttribute("x2", s.x+60); line.setAttribute("y2", s.y+60);
            line.setAttribute("class", `connector ${isOwned ? 'connector-active' : ''}`);
            svg.appendChild(line);
        }
    });
}

// ACHIEVEMENTS
function checkMedals() {
    medals.forEach(m => {
        if (!achievements.includes(m.id) && m.cond()) {
            achievements.push(m.id);
            save();
            showToast("ACHIEVEMENT UNLOCKED", m.name);
        }
    });
}

function renderMedals() {
    const list = document.getElementById('ach-list');
    list.innerHTML = '';
    medals.forEach(m => {
        const isGot = achievements.includes(m.id);
        list.innerHTML += `
            <div style="padding:15px; margin:10px; background:rgba(255,255,255,${isGot?0.1:0.02}); border-radius:10px; display:flex; align-items:center;">
                <div style="font-size:30px; margin-right:20px; filter:grayscale(${isGot?0:1})">🏆</div>
                <div>
                    <b style="color:${isGot?'#00d2ff':'#555'}">${m.name}</b><br>
                    <small style="color:#888">${m.d}</small>
                </div>
            </div>`;
    });
}

// UTILS
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

// INPUTS
document.addEventListener('mousemove', e => {
    document.getElementById('cursor').style.left = e.clientX + 'px';
    document.getElementById('cursor').style.top = e.clientY + 'px';
    if (isPanning && mode === 'hangar') {
        panX += e.clientX - lastX; panY += e.clientY - lastY;
        hangar.style.transform = `translate(${panX}px, ${panY}px)`;
        lastX = e.clientX; lastY = e.clientY;
    }
});
document.addEventListener('mousedown', e => {
    if(mode === 'hangar') { isPanning = true; lastX = e.clientX; lastY = e.clientY; }
    if(mode === 'play') vel = stats.jump;
});
document.addEventListener('mouseup', () => isPanning = false);
window.addEventListener('keydown', e => { if(e.code === 'Space' && mode === 'play') vel = stats.jump; });
