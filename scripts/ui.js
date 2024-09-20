let totalMoney = document.getElementById('totalValue'); // Total Money owned
let betInput = document.getElementById('moneyInput'); // Betting value inputted

const allinBtn = document.getElementById('allInBtn');
const doubleBtn = document.getElementById('doubleBtn');
const halfBtn = document.getElementById('halfBtn');
const dropBtn = document.getElementById('dropBtn');

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

dropBtn.addEventListener("click", function(){
    spawnBall();
});