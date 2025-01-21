document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/calendar')
    .then((response) => response.json())
    .then((data) => {
      const calendarDiv = document.getElementById('calendar');
      calendarDiv.innerText = data.message;
    })
    .catch((error) => console.error('Fehler beim Laden der Kalenderdaten:', error));
});
