import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    timerElem: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabledTime = true;

let timeoutID = null

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            window.alert('Please choose a date in the future')
            refs.startBtn.disabled = true
        }
        if (selectedDates[0] >= options.defaultDate) {
            {
                refs.startBtn.disabled = false
            }
        }
    },
}

const calendar = flatpickr(refs.timerElem, options)

refs.startBtn.addEventListener('click', onStartBtnClick)

function onStartBtnClick() {
    timeoutID = setInterval(() => {
        updateTime()
    }, 1000)
    refs.timerElem.disabledTime = true
    refs.startBtn.disabledTime = true
}

function convertMs(ms) {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    // Remaining days
    const days = Math.floor(ms / day)
    // Remaining hours
    const hours = Math.floor((ms % day) / hour)
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute)
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    return { days, hours, minutes, seconds }
}

function updateTime() {
    const currentTime = new Date()
    const selectedTime = new Date(refs.timerElem.value)
    const deltaTime = selectedTime - currentTime

    if (deltaTime < 0) {
        return;
    } else {
        const { days, hours, minutes, seconds } = convertMs(deltaTime)
        refs.days.textContent = `${days}`
        refs.hours.textContent = `${hours}`
        refs.minutes.textContent = `${minutes}`
        refs.seconds.textContent = `${seconds}`
    }
}



