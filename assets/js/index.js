//Q1 1から100までの数字を画面上に表示する

const displayNumbers = () => {
    const numberDisplay = document.querySelector('.numberDisplay');
    let row;
    for (let i = 1; i <= 100; i++) {
        if ((i - 1) % 10 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            numberDisplay.appendChild(row);
        }
        const numberElement = document.createElement('div');
        numberElement.className = 'col text-center border p-2';
        numberElement.textContent = i;
        row.appendChild(numberElement);
    }
}

displayNumbers();

