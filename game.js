let totalMoney = document.getElementById('totalValue');
let betInput = document.getElementById('moneyInput');

let allinBtn = document.getElementById('allInBtn');
let doubleBtn = document.getElementById('doubleBtn');
let halfBtn = document.getElementById('halfBtn');

// Set bet input default to $100
betInput.value = 100;

allinBtn.addEventListener("click", function() {
    betInput.value = totalMoney.innerText.substring(1);
})

doubleBtn.addEventListener("click", function() {
    if (betInput.value*2 < totalMoney.innerText.substring(1)) {
        betInput.value *= 2;
    } else {
        betInput.value = totalMoney.innerText.substring(1);
    }
});

halfBtn.addEventListener("click", function() {
    if (betInput.value*1 > totalMoney.innerText.substring(1)) {
        betInput.value = totalMoney.innerText.substring(1);
    }
    else if (betInput.value/2 < 1) {
        betInput.value = 1
    } else {
        betInput.value /= 2;
    }
});

let x = 100.301001;
let y = x.toFixed(2);
console.log(y);