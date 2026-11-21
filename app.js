let seconds = 0; let timerInterval = null;
const displayEarnings = document.getElementById('total-earnings');
const displayTime = document.getElementById('timer-display');
const rateInput = document.getElementById('hourly-rate');
const currencySelect = document.getElementById('currency');
const toggleBtn = document.getElementById('toggle-btn');
const resetBtn = document.getElementById('reset-btn');

function show(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

const formatTime = (s) => [Math.floor(s/3600), Math.floor((s%3600)/60), s%60].map(v => String(v).padStart(2, '0')).join(':');

function update() {
    const earnings = (parseFloat(rateInput.value || 0) / 3600) * seconds;
    displayEarnings.innerText = `${currencySelect.value}${earnings.toFixed(2)}`;
    displayTime.innerText = formatTime(seconds);
}

toggleBtn.onclick = () => {
    if (timerInterval) {
        clearInterval(timerInterval); timerInterval = null; toggleBtn.innerText = 'Start';
    } else {
        timerInterval = setInterval(() => { seconds++; update(); }, 1000); toggleBtn.innerText = 'Pause';
    }
};

resetBtn.onclick = () => { clearInterval(timerInterval); timerInterval = null; seconds = 0; toggleBtn.innerText = 'Start'; update(); };
currencySelect.onchange = rateInput.oninput = update;