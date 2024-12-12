document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    const ticketTypeSelect = document.getElementById('ticketType');
    const ticketPriceDiv = document.getElementById('ticketPrice');

    const ticketPrices = {
        '': 'please select a ticket type',
        'Economy': '100 USD',
        'Business': '200 USD',
        'First': '300 USD'
    };

    ticketTypeSelect.addEventListener('change', function() {
        const selectedPrice = ticketPrices[ticketTypeSelect.value];
        ticketPriceDiv.textContent = `Price: ${selectedPrice}`;
    });

    document.getElementById('ticketForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const date = document.getElementById('date').value;
        const ticketType = document.getElementById('ticketType').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVC = document.getElementById('cardCVC').value;

        if (new Date(date) < new Date(today)) {
            alert("You cannot book a ticket for a past date.");
            return;
        }

        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = email;
        newRow.insertCell(2).textContent = departure;
        newRow.insertCell(3).textContent = arrival;
        newRow.insertCell(4).textContent = date;
        newRow.insertCell(5).textContent = ticketType;
        newRow.insertCell(6).textContent = 'Credit Card';

        // Clear the form
        document.getElementById('ticketForm').reset();
    });
});