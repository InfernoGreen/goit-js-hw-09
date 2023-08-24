import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate instanceof Date) {
      const now = new Date();
      if (selectedDate <= now) {
        window.alert("Please choose a date in the future.");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    }
  },
};

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerContainer = document.querySelector('.timer');
const timerDigits = timerContainer.querySelectorAll('.value');

let countdownInterval;

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerDigits[0].textContent = String(days).padStart(2, '0');
  timerDigits[1].textContent = String(hours).padStart(2, '0');
  timerDigits[2].textContent = String(minutes).padStart(2, '0');
  timerDigits[3].textContent = String(seconds).padStart(2, '0');
}

function startCountdown(targetDate) {
  clearInterval(countdownInterval);

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    updateTimerDisplay(days, hours, minutes, seconds);
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value).getTime();

  if (!isNaN(selectedDate)) {
    startCountdown(selectedDate);
  } else {
    alert('Invalid date format. Please use YYYY-MM-DD HH:MM:SS format.');
  }
});

flatpickr(datePicker, options);
startButton.disabled = true;