function initializePage() {
    setupEventDates();
    setupNextButton();
}

function setupEventDates() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var events = [
        new Date(2023, 6, 20), // July 20
        new Date(2023, 10, 1), // November 1
        new Date(2024, 1, 5), // February 5
        new Date(2024, 5, 20), // June 20
        new Date(2024, 6, 1), // July 1
        new Date(2024, 6, 8), // July 8
        new Date(2024, 6, 29), // July 29
        new Date(2024, 8, 2), // September 2
        new Date(2024, 8, 3) // September 3
    ];


    var eventElements = document.querySelectorAll('.event');

    eventElements.forEach(function (eventElement, index) {
        if (events[index] < today) {
            eventElement.classList.add('past');
        }
    });

    var pastEvents = Array.from(eventElements).filter(event => event.classList.contains('past'));
    var todayPosition = pastEvents.length - 1;
    var todayElement = document.querySelector('.event-today');
    if (todayElement) {
        todayElement.style.top = `calc(${(todayPosition / (eventElements.length - 1)) * 100}% - 10px)`;
    }
}

function setupNextButton() {
    var radios = document.getElementsByName('conference');
    var nextButton = document.querySelector('#next-button button'); // select the button inside the anchor
    var errorMessage = document.getElementById('error-message');


    function checkRadioSelected() {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    nextButton.addEventListener('click', function (e) {
        if (!checkRadioSelected()) {
            e.preventDefault();
            errorMessage.innerText = "Please select a conference option to move forward.";
        } else {
            errorMessage.innerText = "";
            window.location.href = 'next-page-hotel.html';
        }
    });
}

let scheduleData = {
    "workshop": {
        "title": "Workshops at Fremantle",
        "description": "To be given by by Prof. Hans-Peter Piepho and Dr Roger Payne. More information shall be provided later.",
        "organizer": "AASC + VSNI",
        "type": "Interactive + Learning",
        "location": "Esplanade Hotel Fremantle",
        "date": "Monday 3 July 2024",
        "time": "09:30 - 16:00"
    },
    "monday-arvo": {
        "title": "Travel to Rottnest",
        "description": "Meeting at Fremantle (B Shed) 14:00 to depart to Rottnest Island",
        "organizer": "AASC + Rottnest Express",
        "location": "Rottnest Express B Shed Terminal",
        "date": "Monday 3 July 2024",
        "time": "14:00 - 15:00"
    },
    "monday-dinner": {
        "title": "Welcome Dinner",
        "description": "Be prepared to be wine and dined with Rottnest Island all to yourselves",
        "organizer": "AASC",
        "location": "Samphire",
        "date": "Monday 3 July 2024",
        "time": "18:00"
    },
    "tuesday": {
        "title": "Full day of conference + networking",
        "description": "More information will be revealed later.",
        "organizer": "AASC",
        "location": "Samphire",
        "date": "Tuesday 4 July 2024",
        "time": "09:00 - 16:00"
    },
    "wed-morn": {
        "title": "Half day of conference + networking",
        "description": "More information will be revealed later.",
        "organizer": "AASC",
        "location": "Samphire",
        "date": "Wednesday 5 July 2024",
        "time": "09:00 - 13:00"
    },
    "wed-arvo": {
        "title": "Free Time",
        "description": "AASC will provide a list of organised social activities or feel free to roam around the island. Make sure to take plenty of selfies with quokkas.",
        "organizer": "AASC",
        "location": "Rottnest Island",
        "date": "Wednesday 5 July 2024",
        "time": "14:00 - Night"
    },
    "thursday": {
        "title": "Full day of conference + networking",
        "description": "More information will be revealed later.",
        "organizer": "AASC",
        "location": "Samphire",
        "date": "Thursday 6 July 2024",
        "time": "09:00 - 14:00"
    },
    "thursday-bye": {
        "title": "A Sad Goodbye",
        "description": "Commencement of conference will occur at afternoon tea.",
        "organizer": "AASC",
        "location": "Samphire",
        "date": "Thursday 6 July 2024",
        "time": "14:00"
    }
    // Add additional schedule items here...
};

function displayDetails(id) {
    let data = scheduleData[id];
    if (data) {
        let popup = document.getElementById('detail-popup');
        let html = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <p><strong>Organiser:</strong> ${data.organizer}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <button id="close-button">Close</button>
        `;
        popup.innerHTML = html;
        popup.style.display = 'block';

        // Here we add the event listener to the dynamically created close button
        let closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', closeDetails);
    }
}

function closeDetails() {
    let popup = document.getElementById('detail-popup');
    popup.style.display = 'none';
}

window.onload = function () {
    var acc = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.querySelector(".fa-solid").classList.replace('fa-minus', 'fa-plus'); // change to plus sign when accordion closes
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                this.querySelector(".fa-solid").classList.replace('fa-plus', 'fa-minus'); // change to minus sign when accordion opens
            }
        });
    }
}

function scrollToContent() {
    document.querySelector('header').scrollIntoView({
        behavior: 'smooth'
    });
}

// reCAPTCHA 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    grecaptcha.execute('6LeqrlEoAAAAAETyXI8rhZnGvWvl0BtFVdSkXLk5', { action: 'submit' }).then(async function (token) {
        const formData = new FormData(e.target);
        formData.append('g-recaptcha-response', token);

        // Check reCAPTCHA response
        const verification = await fetch('/verify-recaptcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'g-recaptcha-response': token })
        });

        const result = await verification.json();

        if (result.success) {
            // Now submit the form data to your server or handle as necessary
            // You can use fetch to POST the formData to your server endpoint that handles the form submission
        } else {
            // Handle reCAPTCHA failure
            alert(result.error || 'Submission failed. Please try again.');
        }
    });
});