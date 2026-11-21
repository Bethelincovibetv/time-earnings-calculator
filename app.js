document.addEventListener('DOMContentLoaded', () => {
    let seconds = 0;
    let timerInterval = null;
    
    const displayEarnings = document.getElementById('total-earnings');
    const displayTime = document.getElementById('timer-display');
    const rateInput = document.getElementById('hourly-rate');
    const currencySelect = document.getElementById('currency');
    const toggleBtn = document.getElementById('toggle-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (!displayEarnings || !displayTime || !rateInput || !currencySelect || !toggleBtn || !resetBtn) return;

    window.show = (viewId) => {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const target = document.getElementById(viewId);
        if (target) target.classList.remove('hidden');
    };

    const formatTime = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return [h, m, sec].map(v => String(v).padStart(2, '0')).join(':');
    };

    const update = () => {
        const rate = parseFloat(rateInput.value || 0);
        const earnings = (rate / 3600) * seconds;
        displayEarnings.innerText = `${currencySelect.value}${earnings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        displayTime.innerText = formatTime(seconds);
    };

    toggleBtn.onclick = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            toggleBtn.innerText = 'Start';
            toggleBtn.classList.replace('bg-red-600', 'bg-blue-600');
        } else {
            timerInterval = setInterval(() => { seconds++; update(); }, 1000);
            toggleBtn.innerText = 'Pause';
            toggleBtn.classList.replace('bg-blue-600', 'bg-red-600');
        }
    };

    resetBtn.onclick = () => {
        clearInterval(timerInterval);
        timerInterval = null;
        seconds = 0;
        toggleBtn.innerText = 'Start';
        toggleBtn.classList.replace('bg-red-600', 'bg-blue-600');
        update();
    };

    currencySelect.onchange = update;
    rateInput.oninput = update;
});