let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#custom');


const timer = seconds => {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeleft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeleft(secondsLeft)
    }, 1000)
}


const displayTimeleft = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

const displayEndTime = timeStamp => {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`
}


buttons.forEach(button => button.addEventListener('click', () => {
    const seconds = parseInt(button.dataset.time);
    timer(seconds);
}));

document.customForm.addEventListener('submit', e => {
    e.preventDefault();
    const mins = form.minutes.value;
    console.log(mins);
    timer(mins * 60);
    form.reset();
})
