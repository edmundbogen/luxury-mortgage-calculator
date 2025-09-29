// State variables
let homePrice = 1000000;
let downPayment = 200000;
let interestRate = 6.5;
let loanTerm = 30;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateAllDisplays();
    calculateMortgage();
});

// Setup all event listeners
function setupEventListeners() {
    // Home Price
    const homePriceInput = document.getElementById('homePriceInput');
    const homePriceSlider = document.getElementById('homePriceSlider');

    homePriceInput.addEventListener('input', function() {
        homePrice = Number(this.value);
        homePriceSlider.value = homePrice;
        updateHomePrice();
    });

    homePriceSlider.addEventListener('input', function() {
        homePrice = Number(this.value);
        homePriceInput.value = homePrice;
        updateHomePrice();
    });

    // Down Payment
    const downPaymentInput = document.getElementById('downPaymentInput');
    const downPaymentSlider = document.getElementById('downPaymentSlider');

    downPaymentInput.addEventListener('input', function() {
        downPayment = Number(this.value);
        downPaymentSlider.value = downPayment;
        updateDownPayment();
    });

    downPaymentSlider.addEventListener('input', function() {
        downPayment = Number(this.value);
        downPaymentInput.value = downPayment;
        updateDownPayment();
    });

    // Interest Rate
    const interestRateInput = document.getElementById('interestRateInput');
    const interestRateSlider = document.getElementById('interestRateSlider');

    interestRateInput.addEventListener('input', function() {
        interestRate = Number(this.value);
        interestRateSlider.value = interestRate;
        updateInterestRate();
    });

    interestRateSlider.addEventListener('input', function() {
        interestRate = Number(this.value);
        interestRateInput.value = interestRate;
        updateInterestRate();
    });

    // Loan Term Buttons
    const termButtons = document.querySelectorAll('.term-button');
    termButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            termButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update loan term
            loanTerm = Number(this.dataset.term);
            calculateMortgage();
        });
    });

    // CTA Button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // You can customize this action
        alert('Thank you for your interest! Edmund Bogen will contact you soon to discuss your luxury real estate needs.');
    });
}

// Update functions
function updateHomePrice() {
    document.getElementById('homePriceDisplay').textContent = homePrice.toLocaleString();
    // Update down payment slider max value
    const downPaymentSlider = document.getElementById('downPaymentSlider');
    downPaymentSlider.max = homePrice;
    // Check if down payment exceeds home price
    if (downPayment > homePrice) {
        downPayment = homePrice;
        document.getElementById('downPaymentInput').value = downPayment;
        document.getElementById('downPaymentSlider').value = downPayment;
        updateDownPayment();
    }
    updateDownPaymentPercentage();
    calculateMortgage();
}

function updateDownPayment() {
    document.getElementById('downPaymentDisplay').textContent = downPayment.toLocaleString();
    updateDownPaymentPercentage();
    calculateMortgage();
}

function updateDownPaymentPercentage() {
    const percentage = ((downPayment / homePrice) * 100).toFixed(1);
    document.getElementById('downPaymentPercent').textContent = percentage;
}

function updateInterestRate() {
    document.getElementById('interestRateDisplay').textContent = interestRate.toFixed(1);
    calculateMortgage();
}

// Main calculation function
function calculateMortgage() {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment;

    if (monthlyRate === 0) {
        // Handle 0% interest rate
        monthlyPayment = principal / numberOfPayments;
    } else {
        // Standard mortgage formula
        monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Update display
    updateResults({
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment,
        totalInterest: totalInterest,
        principal: principal
    });
}

// Update results display
function updateResults(results) {
    document.getElementById('monthlyPayment').textContent =
        Math.round(results.monthlyPayment).toLocaleString();

    document.getElementById('loanAmount').textContent =
        Math.round(results.principal).toLocaleString();

    document.getElementById('totalInterest').textContent =
        Math.round(results.totalInterest).toLocaleString();

    document.getElementById('totalPayment').textContent =
        Math.round(results.totalPayment).toLocaleString();
}

// Update all displays on load
function updateAllDisplays() {
    document.getElementById('homePriceDisplay').textContent = homePrice.toLocaleString();
    document.getElementById('downPaymentDisplay').textContent = downPayment.toLocaleString();
    document.getElementById('interestRateDisplay').textContent = interestRate.toFixed(1);
    updateDownPaymentPercentage();
}