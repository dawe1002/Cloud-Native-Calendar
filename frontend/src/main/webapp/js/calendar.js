document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const addTerminBtn = document.getElementById('addTermin');
    const deleteTerminBtn = document.getElementById('deleteTermin');


	// TODO add termin
    addTerminBtn.addEventListener('click', () => {
		const titel = prompt('Titel des Termins:');
		const beschreibung = prompt('Beschreibung:');
		const termin_datetime = prompt('Datum für den Termin (Format: 2025-01-31 14:30:00 ):');
        
        fetch('/termine', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add', titel, beschreibung, termin_datetime }),
        }).then((res) => res.text()).then(alert);
        loadCalendar();
    });
	
	// TODO delete termin
    deleteTerminBtn.addEventListener('click', () => {
        const datum = prompt('Datum des zu löschenden Termins (YYYY-MM-DD):');
        fetch('/termine', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', datum }),
        }).then((res) => res.text()).then(alert);
		loadCalendar();
    });
});


	const monthYearElem = document.getElementById("month-year");
	const calendarElem = document.getElementById("calendar");
	let currentDate = new Date();

	document.getElementById("prev-month-btn").addEventListener("click", () => {
	    currentDate.setMonth(currentDate.getMonth() - 1);
	    loadCalendar();
	});

	document.getElementById("next-month-btn").addEventListener("click", () => {
	    currentDate.setMonth(currentDate.getMonth() + 1);
	    loadCalendar();
	});

	function loadCalendar() {
	    const month = currentDate.getMonth();
	    const year = currentDate.getFullYear();

	    const firstDayOfMonth = new Date(year, month, 1);
	    const lastDayOfMonth = new Date(year, month + 1, 0);
	    
	    const daysInMonth = lastDayOfMonth.getDate();
	    const firstDay = firstDayOfMonth.getDay();
	    
		// Empty HTML
	    calendarElem.innerHTML = "";

	    // Display month and year
	    monthYearElem.textContent = `${getMonthName(month)} ${year}`;

	    // Generate days of the month
	    for (let day = 1; day <= daysInMonth; day++) {
	        const dayElem = document.createElement("div");
	        dayElem.classList.add("day");
	        dayElem.textContent = day;
	        dayElem.addEventListener("click", () => {
				// TODO onlick event
	            alert(`Tag ${day} ausgewählt!`);
	        });
	        calendarElem.appendChild(dayElem);
	    }
	}

	function getMonthName(month) {
	    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	    return months[month];
	}
//reload Calendar
loadCalendar();

