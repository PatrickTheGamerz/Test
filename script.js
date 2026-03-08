const bird = document.getElementById('bird');
const world = document.getElementById('world');
const hangar = document.getElementById('hangar-viewport');
const cursor = document.getElementById('cursor');

// GAME ENGINE STATE
let mode = 'menu';
let currentGameMode = 'original';
let birdY = 300, vel = 0;
let pipesPassed = 0, pipes = [], frame = 0;
let isPanning = false, lastX, lastY, panX = -1750, panY = -1625;

// SAVE DATA
let points = parseInt(localStorage.getItem('ob_pts')) || 0;
let highscore = parseInt(localStorage.getItem('ob_hi')) || 0;
let owned = JSON.parse(localStorage.getItem('ob_own')) || [];
let achievements = JSON.parse(localStorage.getItem('ob_ach')) || [];

// TECH TREE DATA
const skillTree = [
    { id: 'core', name: 'CORE DRIVE', d: 'Enables Flight', cost: 0, x: 2000, y: 2000, pre: null },
    { id: 'ag1', name: 'SLIM FRAME', d: 'Tight Hitbox', cost: 15, x: 2000, y: 1800, pre: 'core' },
    { id: 'wt1', name: 'CREDIT CHIP', d: '+2 Per Pipe', cost: 25, x: 2200, y: 2000, pre: 'core' },
    { id: 'wt2', name: 'MIDAS TOUCH', d: 'Double Rewards', cost: 60, x: 2400, y: 2000, pre: 'wt1' }
];

const medals = [
    { id: 'm1', name: 'BRONZE WINGS', d: '10 Pipes Score', icon: '🥉', cond: () => highscore >= 10 },
    { id: 'm2', name: 'SILVER TALON', d: '30 Pipes Score', icon: '🥈', cond: () => highscore >= 30 },
    { id: 'm3', name: 'GOLDEN PHOENIX', d: '50 Pipes Score', icon: '🥇', cond: () => highscore >= 50 }
];

// INITIAL LOAD
window.onload = () => {
    updateUI();
    // Simulate Loading
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('loading-screen').remove(), 800);
    }, 2500);
};

function updateUI() {
    document.getElementById('points-val').innerText = points;
    document.getElementById('high-val').innerText = highscore;
    document.getElementById('hangar-pts').innerText = points;
}

// UI NAVIGATION
function switchUI(m) {
    mode = m;
    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');
    
    if (m === 'menu') {
        document.getElementById('menu-ui').style.display = 'flex';
        updateUI();
    } else if (m === 'lobby') {
        document.getElementById('lobby-ui').style.display = 'flex';
    } else if (m === 'hangar') {
        document.getElementById('hangar-ui').style.display = 'flex';
        // ALWAYS CENTER ON CORE
        panX = -1750; panY = -1625;
        initSkillTree();
    } else if (m === 'medals') {
        document.getElementById('medals-ui').style.display = 'flex';
        renderMedals();
    }
}

function selectMode(type) {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('mode-' + type).classList.add('active');
    document.getElementById('single-setup').style.display = (type === 'single' ? 'block' : 'none');
    document.getElementById('server-list').style.display = (type === 'multi' ? 'block' : 'none');
}

// GAMEPLAY LOGIC
function startGame(mission) {
    if (!owned.includes('core')) {
        showToast("LOCKED", "Unlock 'Core Drive' in Hangar!");
        return switchUI('hangar');
    }
    currentGameMode = mission;
    mode = 'play';
    document.querySelectorAll('.gui').forEach(g => g.style.display = 'none');
    birdY = 350; vel = 0; pipesPassed = 0; pipes = []; frame = 0;
    world.innerHTML = '';
    document.getElementById('top-score').innerText = '0';
    requestAnimationFrame(engineLoop);
}

function engineLoop() {
    if (mode !== 'play') return;
    frame++;
    
    vel += 0.45; birdY += vel;
    bird.style.top = birdY + 'px';
    bird.style.transform = `rotate(${Math.min(vel * 3, 90)}deg)`;

    const spawnRate = (currentGameMode === 'advanced') ? 95 : 140;
    if (frame % spawnRate === 0) spawnPipe();

    pipes.forEach((p, i) => {
        p.x -= 4;
        p.dt.style.left = p.x + 'px'; p.db.style.left = p.x + 'px';

        const b = bird.getBoundingClientRect();
        const pt = p.dt.getBoundingClientRect();
        const pb = p.db.getBoundingClientRect();
        const pad = owned.includes('ag1') ? 14 : 7;

        if (b.right-pad > pt.left && b.left+pad < pt.right) {
            if (b.top+pad < pt.bottom || b.bottom-pad > pb.top) gameOver();
        }

        if (p.x < 50 && !p.passed) {
            p.passed = true; pipesPassed++;
            document.getElementById('top-score').innerText = pipesPassed;
            checkMedals();
        }
    });

    if (birdY > 730 || birdY < -50) gameOver();
    requestAnimationFrame(engineLoop);
}

function spawnPipe() {
    const gap = (currentGameMode === 'advanced') ? 175 : 210;
    const topH = Math.random() * (750 - gap - 200) + 100;
    const p = { x: 550, passed: false, dt: document.createElement('div'), db: document.createElement('div') };
    p.dt.className = 'pipe'; p.db.className = 'pipe';
    p.dt.style.height = topH + 'px'; p.dt.style.top = '0';
    p.db.style.height = (750 - topH - gap) + 'px'; p.db.style.bottom = '0';
    world.appendChild(p.dt); world.appendChild(p.db);
    pipes.push(p);
}

function gameOver() {
    mode = 'dead';
    let baseReward = pipesPassed * (currentGameMode === 'advanced' ? 5 : 2);
    if(owned.includes('wt1')) baseReward += (pipesPassed * 2);
    if(owned.includes('wt2')) baseReward *= 2;
    
    points += baseReward;
    if (pipesPassed > highscore) highscore = pipesPassed;
    save();

    document.getElementById('gameover-ui').style.display = 'flex';
    document.getElementById('res-score').innerText = pipesPassed;
    document.getElementById('res-points').innerText = baseReward;
    document.getElementById('res-high').innerText = highscore;
}

// HANGAR LOGIC
function initSkillTree() {
    const svg = document.getElementById('lines');
    svg.innerHTML = '';
    document.querySelectorAll('.node').forEach(n => n.remove());
    hangar.style.transform = `translate(${panX}px, ${panY}px)`;

    skillTree.forEach(s => {
        const div = document.createElement('div');
        const isOwned = owned.includes(s.id);
        const isReady = s.pre === null || owned.includes(s.pre);
        
        div.className = `node ${isOwned ? 'node-owned' : (isReady ? 'node-ready' : '')}`;
        div.style.left = s.x + 'px'; div.style.top = s.y + 'px';
        div.innerHTML = `<b>${s.name}</b><br><small>${s.d}</small><br><b>${isOwned?'ACTIVE':s.cost+' CR'}</b>`;
        
        div.onclick = (e) => {
            e.stopPropagation();
            if (isReady && !isOwned && points >= s.cost) {
                points -= s.cost; owned.push(s.id); save();
                initSkillTree(); updateUI();
                showToast("RESEARCHED", s.name);
            }
        };
        hangar.appendChild(div);

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

// HELPERS
function save() {
    localStorage.setItem('ob_pts', points);
    localStorage.setItem('ob_hi', highscore);
    localStorage.setItem('ob_own', JSON.stringify(owned));
    localStorage.setItem('ob_ach', JSON.stringify(achievements));
}

function showToast(n, d) {
    document.getElementById('t-name').innerText = n; document.getElementById('t-desc').innerText = d;
    const t = document.getElementById('toast'); t.classList.add('pop');
    setTimeout(() => t.classList.remove('pop'), 3000);
}

function renderMedals() {
    const box = document.getElementById('ach-list'); box.innerHTML = '';
    medals.forEach(m => {
        const got = achievements.includes(m.id);
        box.innerHTML += `<div class="medal-item ${got?'earned':''}">
            <span class="m-icon">${m.icon}</span>
            <div class="m-txt"><b>${m.name}</b><br><small>${m.d}</small></div>
        </div>`;
    });
}

function checkMedals() {
    medals.forEach(m => {
        if (!achievements.includes(m.id) && m.cond()) {
            achievements.push(m.id); save(); showToast("MEDAL EARNED", m.name);
        }
    });
}

// INPUTS
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
