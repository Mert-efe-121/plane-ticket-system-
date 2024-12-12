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

        if (new Date(date) < new Date(today)) {
            alert("You cannot book a ticket for a past date.");
            return;
        }

        // Show the payment form
        document.getElementById('payment-form').style.display = 'block';

        // Optionally, hide the ticket form
        document.getElementById('booking-form').style.display = 'none';
    });

    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVC = document.getElementById('cardCVC').value;

        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        newRow.insertCell(0).textContent = document.getElementById('name').value;
        newRow.insertCell(1).textContent = document.getElementById('email').value;
        newRow.insertCell(2).textContent = document.getElementById('departure').value;
        newRow.insertCell(3).textContent = document.getElementById('arrival').value;
        newRow.insertCell(4).textContent = document.getElementById('date').value;
        newRow.insertCell(5).textContent = document.getElementById('ticketType').value;
        newRow.insertCell(6).textContent = 'Credit Card';

        // Clear the forms
        document.getElementById('ticketForm').reset();
        document.getElementById('paymentForm').reset();

        // Optionally, hide the payment form and show the ticket form again
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('booking-form').style.display = 'block';
    });
});