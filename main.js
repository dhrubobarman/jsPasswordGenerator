const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Copy Password to clipboard
clipboardEl.addEventListener("click", () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;
    if (!password) {
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password Copied To Clipboard')
})

// Event Listner
generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
})

// Generate Password
function generatePassword(upper, lower, number, symbol, length) {
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log("funcName: ", funcName)
            generatePassword += randomFunc[funcName]();
        });
    }
    finalPassword = generatePassword.slice(0, length);
    return finalPassword;
}


// Generator Functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+-*/,./;[]\<>?:"{}|';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(getRandomSymbol());