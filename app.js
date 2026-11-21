let seconds = 0; let timerInterval = null;
const elements = {
    displayEarnings: document.getElementById('total-earnings'),
    displayTime: document.getElementById('timer-display'),
    rateInput: document.getElementById('hourly-rate'),
    currencySelect: document.getElementById('currency'),
    toggleBtn: document.getElementById('toggle-btn'),
    resetBtn: document.getElementById('reset-btn')
};

function show(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(viewId);
    if (target) target.classList.remove('hidden');
}

function formatTime(s) {
    return [Math.floor(s/3600), Math.floor((s%3600)/60), s%60].map(v => String(v).padStart(2, '0')).join(':');
}

function update() {
    const rate = parseFloat(elements.rateInput?.value || 0);
    const earnings = (rate / 3600) * seconds;
    if (elements.displayEarnings) elements.displayEarnings.innerText = `${elements.currencySelect?.value || '$'}${earnings.toFixed(2)}`;
    if (elements.displayTime) elements.displayTime.innerText = formatTime(seconds);
}

if (elements.toggleBtn) {
    elements.toggleBtn.onclick = () => {
        if (timerInterval) {
            clearInterval(timerInterval); timerInterval = null; elements.toggleBtn.innerText = 'Start';
        } else {
            timerInterval = setInterval(() => { seconds++; update(); }, 1000); elements.toggleBtn.innerText = 'Pause';
        }
    };
}

if (elements.resetBtn) {
    elements.resetBtn.onclick = () => {
        clearInterval(timerInterval); timerInterval = null; seconds = 0; 
        if (elements.toggleBtn) elements.toggleBtn.innerText = 'Start'; 
        update();
    };
}

if (elements.currencySelect) elements.currencySelect.onchange = update;
if (elements.rateInput) elements.rateInput.oninput = update;