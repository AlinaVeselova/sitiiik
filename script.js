function checkPasswordAndScroll() {
    const userInput = document.getElementById('pass-input').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');
    const mainContent = document.getElementById('main-content');

    // Твое секретное слово
    const correctPassword = "24.03.2024"; 

    if (userInput === correctPassword) {
        errorMsg.style.display = 'none';
        
        mainContent.style.display = 'block';
        
        // Оставляем тот же цвет сетки для бесшовного перехода
        document.body.style.backgroundColor = "#d2daf0";
        
        mainContent.scrollIntoView({ behavior: 'smooth' });
    } else {
        errorMsg.style.display = 'block';
    }
}

function flipCard(cardWrapper) {
    cardWrapper.classList.toggle('flipped');
}
// --- ЛОГИКА РЕТРО ПЛЕЕРА ---
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const vinyl = document.getElementById('player-vinyl');
const trackTitle = document.getElementById('track-title');
const timeDisplay = document.getElementById('time-display');
const trackItems = document.querySelectorAll('.track-item');

let currentTrackIndex = 0;

// Массив данных треков для переключения кнопками ⏮ ⏭
const tracks = [
    { src: 'audio/track1.mp3', title: 'TRACK 1: CATHARSIS.mp3' },
    { src: 'audio/track2.mp3', title: 'TRACK 2: KOSMOS.mp3' },
    { src: 'audio/track3.mp3', title: 'TRACK 3: POD LUNOY.mp3' },
    { src: 'audio/track4.mp3', title: 'TRACK 4: PADAT\' V GRYAZ.mp3' },
    { src: 'audio/track5.mp3', title: 'TRACK 5: BESKONECHNOYE LETO.mp3' }
];

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = '⏸';
        vinyl.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerText = '▶';
        vinyl.classList.remove('playing');
    }
}

function selectTrack(index, src, title) {
    currentTrackIndex = index;
    audio.src = src;
    trackTitle.innerText = title;
    
    // Обновляем визуальное выделение в списке
    trackItems.forEach(item => item.classList.remove('active'));
    trackItems[index].classList.add('active');
    
    // Запускаем воспроизведение
    audio.play();
    playBtn.innerText = '⏸';
    vinyl.classList.add('playing');
}

function nextTrack() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) newIndex = 0;
    selectTrack(newIndex, tracks[newIndex].src, tracks[newIndex].title);
}

function prevTrack() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    selectTrack(newIndex, tracks[newIndex].src, tracks[newIndex].title);
}

// Обновление таймера времени (00:00)
audio.addEventListener('timeupdate', () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    
    const formattedMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    const formattedSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;
    
    timeDisplay.innerText = `${formattedMinutes}:${formattedSeconds}`;
});

// Автопереключение на следующий трек, когда текущий закончился
audio.addEventListener('ended', () => {
    nextTrack();
});
// ==========================================
// ЛОГИКА ДЛЯ МИНИ-ИГР И ИНТЕРАКТИВА
// ==========================================

// --- 1. РАБОЧИЙ MS PAINT ---
const canvas = document.getElementById('paintCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    ctx.strokeStyle = '#1018a8'; // Синий цвет маркера по дефолту
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function startDraw(e) { isDrawing = true; draw(e); }
    function stopDraw() { isDrawing = false; ctx.beginPath(); }
    
    function draw(e) {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    // События мыши
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mousemove', draw);

    // События тачскрина для мобилок
    canvas.addEventListener('touchstart', (e) => { startDraw(e); e.preventDefault(); });
    canvas.addEventListener('touchend', stopDraw);
    canvas.addEventListener('touchmove', (e) => { draw(e); e.preventDefault(); });
}

function clearCanvas() {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- 2. ТАМАГОЧИ ---
const petArt = document.getElementById('pet-art');
const petStatus = document.getElementById('pet-status');

function feedPet() {
    petArt.innerHTML = " (\\_/)\n ( >.<)\n / >🥢";
    petStatus.innerText = "СТАТУС: ОБОЖАЕТ ВОК!!";
}

function dancePet() {
    petArt.innerHTML = " (\\_/)\n ＼(•.•)／\n  /  \\";
    petStatus.innerText = "СТАТУС: ТАНЦУЕТ ПОД ПЛЕЕР!";
    setTimeout(() => {
        petArt.innerHTML = " (\\_/)\n ＼(•.•)／\n  /  \\".replace('＼',' ').replace('／',' ');
    }, 300);
}

function sleepPet() {
    petArt.innerHTML = " (\\_/)\n ( -.-) zZ\n /   \\";
    petStatus.innerText = "СТАТУС: СЧАСТЛИВ С ТОБОЙ";
}

// --- 3. ЦЕПОЧКА ОШИБОК МИЛОТЫ ---
let currentErrorIndex = 0;
const errors = [
    { title: 'MEMORY OVERFLOW', text: 'Система перегружена совместными воспоминаниями. Сбросить данные?', btn: 'НИ ЗА ЧТО' },
    { title: 'CRITICAL ERROR 404', text: 'Ошибка: Невозможно любить тебя еще сильнее! Система заблокирована обожанием.', btn: 'ОК' }
];

function startErrorChain() {
    currentErrorIndex = 0;
    showError();
}

function showError() {
    const overlay = document.getElementById('error-overlay');
    const title = document.getElementById('error-title');
    const text = document.getElementById('error-text');
    const btn = document.getElementById('error-action-btn');

    title.innerText = errors[currentErrorIndex].title;
    text.innerText = errors[currentErrorIndex].text;
    btn.innerText = errors[currentErrorIndex].btn;

    overlay.style.display = 'flex';
}

function nextError() {
    currentErrorIndex++;
    if (currentErrorIndex < errors.length) {
        showError();
    } else {
        closeError();
    }
}

function closeError() {
    document.getElementById('error-overlay').style.display = 'none';
}

let score = 0;

function startFullscreenGame() {
    const overlay = document.getElementById('game-overlay');
    const gameArea = document.getElementById('game-area-full');
    
    // Показываем слой с игрой
    overlay.style.display = 'block';
    score = 0;
    
    // Очищаем поле перед запуском
    gameArea.innerHTML = '';
    
    const interval = setInterval(() => {
        // Условие победы(можно изменить количество очков здесь)
        if (score >= 10) {
            clearInterval(interval);
            showFireworks();
            
            // Закрываем игру через 2 секунды после победы
            setTimeout(() => {
                overlay.style.display = 'none';
                gameArea.innerHTML = '';
            }, 2000);
            return;
        }
        createGiftFullscreen(gameArea);
    }, 1200); // Подарки появляются каждые 1.2 секунды
}

function createGiftFullscreen(area) {
    const gift = document.createElement('img');
    
    // Убедись, что путь к картинке верный
    gift.src = 'img/gift.png'; 
    gift.className = 'gift-item';
    gift.style.position = 'absolute';
    
    // Размер картинки
    gift.style.width = '60px'; 
    gift.style.height = '60px';
    
    // Случайные координаты (5% - 85% экрана)
    gift.style.left = (Math.random() * 80 + 5) + '%';
    gift.style.top = (Math.random() * 80 + 5) + '%';
    
    // Обработка клика
    gift.onclick = (e) => {
        score++;
        gift.remove();
        // Можно добавить звук при клике, если хочешь
    };
    
    area.appendChild(gift);
    
    // Подарок исчезает через 2.5 секунды, если не успели нажать
    setTimeout(() => {
        if (gift.parentElement) {
            gift.remove();
        }
    }, 1200); 
}

function showFireworks() {
    // 1. Создаем контейнер для салюта
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    // 2. Создаем 60 частиц
    for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        
        // Разные эмодзи
        const symbols = ['✨', '🎈', '🎉', '🌟', '💖', '💥', '🎊'];
        c.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Математика разлета: скорость и угол
        const angle = Math.random() * Math.PI * 2; // Случайный угол (радианы)
        const velocity = Math.random() * 150 + 100; // Случайная скорость (пиксели)
        
        // Вычисляем конечные координаты X и Y
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Записываем их в CSS-переменные для каждого элемента
        c.style.setProperty('--x', `${tx}px`);
        c.style.setProperty('--y', `${ty}px`);
        
        // Добавляем случайную задержку старта для реалистичности
        c.style.animationDelay = `${Math.random() * 0.3}s`;
        
        container.appendChild(c);
    }

    // 3. Удаляем контейнер после окончания анимации
    setTimeout(() => container.remove(), 3200);
}
