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

        // Store the booking data in localStorage or a global variable
        localStorage.setItem('bookingData', JSON.stringify({ name, email, departure, arrival, date, ticketType }));

        // Hide the booking form and show the payment form
        document.getElementById('booking-form').style.display = 'none';
        document.getElementById('payment-form').style.display = 'block';
    });

    const paymentMethodSelect = document.getElementById('paymentMethod');
    const creditCardInfoDiv = document.getElementById('creditCardInfo');

    paymentMethodSelect.addEventListener('change', function() {
        if (paymentMethodSelect.value === 'Credit Card') {
            creditCardInfoDiv.style.display = 'block';
        } else {
            creditCardInfoDiv.style.display = 'none';
        }
    });

    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i += 4) {
            formattedValue += value.substr(i, 4) + ' ';
        }
        event.target.value = formattedValue.trim();
    });

    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length >= 2) {
            value = value.substr(0, 2) + '/' + value.substr(2, 2);
        }
        event.target.value = value;
    });

    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const paymentMethod = document.getElementById('paymentMethod').value;

        // Retrieve the booking data from localStorage or a global variable
        const bookingData = JSON.parse(localStorage.getItem('bookingData'));
        bookingData.paymentMethod = paymentMethod;

        if (paymentMethod === 'Credit Card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVC = document.getElementById('cardCVC').value;
            bookingData.cardNumber = cardNumber;
            bookingData.cardExpiry = cardExpiry;
            bookingData.cardCVC = cardCVC;
        }

        addToTable(bookingData);

        // Clear the stored booking data
        localStorage.removeItem('bookingData');

        // Hide the payment form and show the booking form
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('booking-form').style.display = 'block';

        // Clear the forms
        document.getElementById('ticketForm').reset();
        document.getElementById('paymentForm').reset();

        // Reset the ticket price display
        ticketPriceDiv.textContent = '';
    });

    function addToTable(data) {
        const table = document.getElementById('dataTable');
        const newRow = table.insertRow();

        const nameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const departureCell = newRow.insertCell(2);
        const arrivalCell = newRow.insertCell(3);
        const dateCell = newRow.insertCell(4);
        const ticketTypeCell = newRow.insertCell(5);
        const paymentMethodCell = newRow.insertCell(6);

        nameCell.textContent = data.name;
        emailCell.textContent = data.email;
        destinationCell.textContent = data.destination;
        dateCell.textContent = data.date;
        ticketTypeCell.textContent = data.ticketType;
        paymentMethodCell.textContent = data.paymentMethod;
    }
});