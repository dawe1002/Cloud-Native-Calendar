document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const addTerminBtn = document.getElementById('addTermin');
    const deleteTerminBtn = document.getElementById('deleteTermin');


	// TODO add termin
	//addTermin Button
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
	//deleteTermin Button
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

	//Funktion loadCalendar()
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
	
	document.getElementById("registerButton").addEventListener("click", loadRegisterDialog);

	//Funktion loadRegisterDialog()
	function loadRegisterDialog() {
	    const dialogContainer = document.getElementById("dialog-container");

	    // Add overlay for better UX
	    const overlay = document.createElement("div");
	    overlay.className = "dialog-overlay";
	    overlay.addEventListener("click", () => {
	        dialogContainer.classList.remove("active");
	        overlay.remove();
	    });

	    // Create the dialog HTML
	    dialogContainer.innerHTML = `
	        <form id="registerForm">
	            <h2>Registrierung</h2>
	            <label for="vorname">Vorname:</label>
	            <input type="text" id="vorname" name="vorname" required>
	            <label for="nachname">Nachname:</label>
	            <input type="text" id="nachname" name="nachname" required>
	            <label for="email">E-Mail:</label>
	            <input type="email" id="email" name="email" required>
	            <label for="password">Passwort:</label>
	            <input type="password" id="password" name="password" required>
	            <div id="registerButtonContainer">
				<button type="submit">Registrieren</button>
	            <button type="button" id="closeDialog">Abbrechen</button>
				</div>
	        </form>
	    `;

	    // Show the dialog and overlay
	    document.body.appendChild(overlay);
	    dialogContainer.classList.add("active");

	    // Close dialog
	    document.getElementById("closeDialog").addEventListener("click", () => {
	        dialogContainer.classList.remove("active");
	        overlay.remove();
	    });

	    // Handle form submission
	    document.getElementById("registerForm").addEventListener("submit", async (event) => {
	        event.preventDefault();

	        const formData = {
	            vorname: document.getElementById("vorname").value,
	            nachname: document.getElementById("nachname").value,
	            email: document.getElementById("email").value,
	            password: document.getElementById("password").value,
	        };

	        try {
	            const response = await fetch('/register', {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify(formData),
	            });

	            if (response.ok) {
	                alert('Registrierung erfolgreich!');
	                dialogContainer.classList.remove("active");
	                overlay.remove();
	            } else {
	                alert('Registrierung fehlgeschlagen.');
	            }
	        } catch (error) {
	            console.error('Fehler bei der Registrierung:', error);
	            alert('Ein Fehler ist aufgetreten.');
	        }
	    });
	}

//reload Calendar
loadCalendar();

