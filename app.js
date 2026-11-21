let seconds = 0;
let timerInterval = null;
const displayEarnings = document.getElementById('total-earnings');
const displayTime = document.getElementById('time-elapsed');
const rateInput = document.getElementById('hourly-rate');
const currencySelect = document.getElementById('currency');
const toggleBtn = document.getElementById('toggle-btn');
const resetBtn = document.getElementById('reset-btn');

function formatTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateDisplay() {
    const rate = parseFloat(rateInput.value) || 0;
    const earnings = (rate / 3600) * seconds;
    displayEarnings.innerText = `${currencySelect.value}${earnings.toFixed(2)}`;
    displayTime.innerText = formatTime(seconds);
}

toggleBtn.onclick = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        toggleBtn.innerText = 'Start';
    } else {
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        toggleBtn.innerText = 'Pause';
    }
};

resetBtn.onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    toggleBtn.innerText = 'Start';
    updateDisplay();
};

currencySelect.onchange = updateDisplay;
rateInput.oninput = updateDisplay;