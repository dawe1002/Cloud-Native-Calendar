
let jwtToken = null;
// WebSocket / RabbitMQ Notifications
let stompClient = null;

function connectWebSocket() {
    const socket = new SockJS('http://localhost:8083/ws'); // notifications-service
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        console.log('✅ WebSocket verbunden (notifications)');

        stompClient.subscribe('/topic/notifications', function (message) {
            alert(message.body);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
	
	// addTermin Button
	const addTerminBtn = document.getElementById('addTermin');
	addTerminBtn.addEventListener('click', async () => {
		const titel = prompt('Titel des Termins:');
		const beschreibung = prompt('Beschreibung:');
		const termin_datetime = prompt('Datum: (Format -> 2026-01-31T14:30:00)');

		if (!jwtToken) {
			alert('Nicht eingeloggt!');
			return;
		}

		const response = await fetch('/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`
			},
			body: JSON.stringify({ titel, beschreibung, termin_datetime })
		});

		const text = await response.text();
		alert(text);

		loadCalendar();
	});


    // deleteTermin Button
	const deleteTerminBtn = document.getElementById('deleteTermin');

	deleteTerminBtn.addEventListener('click', async () => {
		const id = prompt('ID des zu löschenden Termins (int):');
		if (!id) return;

		if (!jwtToken) {
			alert('Nicht eingeloggt!');
			return;
		}

		try {
			const res = await fetch('/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${jwtToken}`
				},
				body: JSON.stringify({ termin_id: Number(id) }),
			});

			const result = await res.json();

			if (!res.ok) {
				alert(`Fehler: ${result.error}`);
			} else {
				alert(result.message);
				loadCalendar();
			}

		} catch (err) {
			console.error("Fehler beim Löschen:", err);
			alert("Unerwarteter Fehler!");
		}
	});

	
	//showAllTermine Button
	const showAllTerminBtn = document.getElementById('showAllTermin');
	showAllTerminBtn.addEventListener('click', () => {

		if (!jwtToken) {
			alert('Nicht eingeloggt!');
			return;
		}

		fetch('/all', {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`
			},
			body: JSON.stringify({}),
		})
		.then(res => res.json())
		.then(data => displayTermine(data))
		.catch(error => {
			console.error("Fehler beim Laden der Termine:", error);
		});

		loadCalendar();
	});

	
	//displayTermine Funktion        
	function displayTermine(data) {
		const dialog_container2 = document.getElementById('dialog-container2');
	    const overlay = document.createElement("div");
	    overlay.className = "dialog-overlay2";
	    overlay.addEventListener("click", () => {
	        dialog_container2.classList.remove("active");
	        overlay.remove();
	    });

	    if (!Array.isArray(data) || data.length === 0) {
	        dialog_container2.innerHTML = "<p>Keine Termine gefunden.</p>";
	        return;
	    }

	    let table = "<table border='1' cellspacing='0' cellpadding='5'>";
	    table += "<tr><th>ID</th><th>Benutzer ID</th><th>Titel</th><th>Beschreibung</th><th>Datum & Zeit</th></tr>";

	    data.forEach(t => {
	        table += `
	            <tr>
	                <td>${t.termin_id ?? "—"}</td>
	                <td>${t.benutzer_id ?? "—"}</td>
	                <td>${t.titel ?? "—"}</td>
	                <td>${t.beschreibung ?? "—"}</td>
	                <td>${t.termin_datetime ?? "—"}</td>
	            </tr>`;
	    });

	    table += "</table>";
		// Show the dialog and overlay
	    dialog_container2.innerHTML = table;
		document.body.appendChild(overlay);
		dialog_container2.classList.add("active");

	}
	
	
	// Funktionen für die Kalenderansicht
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

	// Funktion loadCalendar()
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
	            // TODO onclick event -> zeigt termine
	            alert(`Tag ${day} ausgewählt!`);
	        });
	        calendarElem.appendChild(dayElem);
	    }
	}

	function getMonthName(month) {
	    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	    return months[month];
	}

    // Funktion loadRegisterDialog()
    document.getElementById("registerButton").addEventListener("click", loadRegisterDialog);

    function loadRegisterDialog() {
        const dialogContainer = document.getElementById("dialog-container");
        const overlay = document.createElement("div");
        overlay.className = "dialog-overlay";
        overlay.addEventListener("click", () => {
            dialogContainer.classList.remove("active");
            overlay.remove();
        });
        // Create HTML
        dialogContainer.innerHTML = `
            <form id="registerForm">
                <h2>Registrierung</h2>
                <label for="vorname">Vorname:</label>
                <input type="text" id="vorname" name="vorname" required>
                <label for="nachname">Nachname:</label>
                <input type="text" id="nachname" name="nachname" required>
                <label for="email">E-Mail:</label>
                <input type="email" id="emailInput" name="email" required>
                <label for="password">Passwort:</label>
                <input type="password" id="passwortInput" name="password" required>
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
                email: document.getElementById("emailInput").value,
                password: document.getElementById("passwortInput").value,
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					 },
                    body: JSON.stringify(formData),
                });

                if (response.status === 201) {
                    alert('Registrierung erfolgreich!');
                    dialogContainer.classList.remove("active");
                    overlay.remove();
                    login();
                } else if (response.status === 409) {
					alert('Nutzername bereits vergeben.');
				} else {
                    alert('Registrierung fehlgeschlagen.');
                }
            } catch (error) {
                console.error('Fehler bei der Registrierung:', error);
                alert('Ein Fehler ist aufgetreten.');
            }
        });
    }

    // Funktionen für Login/Logout View
	document.getElementById('loginButton').addEventListener('click', async () => {
		const email = document.getElementById('email').value;
		const passwort = document.getElementById('passwort').value;

		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, passwort })
			});

			if (!response.ok) {
				const err = await response.json();
				alert(err.message || 'Login fehlgeschlagen');
				return;
			}

			const data = await response.json();
			jwtToken = data.token;
			localStorage.setItem('jwt', jwtToken);


			console.log('JWT im Browser gespeichert:', jwtToken);

			alert('Login erfolgreich!');
			login();
			connectWebSocket();

		} catch (error) {
			console.error('Fehler beim Login:', error);
			alert('Login fehlgeschlagen');
		}
	});



    function login() {
        loadLogoutView();
        loadCalendar();
    }

	async function logout() {
		if (!jwtToken) {
			alert('Nicht eingeloggt');
			return;
		}

		try {
			await fetch('/logout', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${jwtToken}`
				}
			});

		} catch (e) {
			console.error('Logout Fehler:', e);
		}

		jwtToken = null;
		localStorage.clear();
		loadLoginView();
		loadCalendar();
		if (stompClient) {
			stompClient.disconnect();
		}
	}


    function loadLoginView() {
        document.getElementById('loginDialog').innerHTML =
            '<form id="loginForm" method="post">' +
            '<div id="logo">Cloud Native Kalender</div>' +
            '<input type="text" name="benutzer_id" placeholder="Benutzer-ID" required>' +
            '<input type="password" name="passwort" placeholder="Passwort" required>' +
            '<button id="loginButton" type="submit">Anmelden</button>' +
            '<button id="registerButton" type="button">Registrieren</button>' +
            '</form>' +
            '<div id="dialog-container"></div>' +
			'<div id="dialog-container2"></div>' +
            '</div>';
		location.reload();
    }

	function loadLogoutView() {
	    document.getElementById('loginDialog').innerHTML = 
			'<form id="loginForm">' +
	        '<div id="loginForm"><p class="welcomeText">Login erfolgreich, Willkommen! <button id="logoutButton">Abmelden</button></p></div>'+
			'<div id="dialog-container2"></div>' +
			'</div>';
			
	    document.getElementById('logoutButton').addEventListener('click', logout);
		
	}

    // reload Calendar
    loadCalendar();
});
