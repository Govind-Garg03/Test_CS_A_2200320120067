function validateLogin(event) {
    event.preventDefault(); 

    const validUsername = "user";
    const validPassword = "password";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("converterSection").classList.remove("hidden");

        loadCurrencies();
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
}

async function loadCurrencies() {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
    } catch (error) {
        console.error("Failed to load currencies:", error);
    }
}

async function convertCurrency(event) {
    event.preventDefault(); 

    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const result = document.getElementById("result");

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.rates[toCurrency]) {
            const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
            result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            result.textContent = "Currency conversion not available.";
        }
    } catch (error) {
        result.textContent = "Failed to fetch conversion rates. Please try again.";
    }
}
