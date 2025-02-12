//Q1 1から100までの数字を画面上に表示する

const displayNumbers = () => {
    const numberDisplay = document.querySelector('.numberDisplay-content');
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

//応用 宝探しゲーム
let input;
const $treasureCount = document.getElementById('treasureCount');


const changeTreasure = () => {
    const inputValue = parseInt($treasureCount.value, 10);
    input = inputValue
    hiddenTreasureStart(inputValue)
}
$treasureCount.addEventListener('change', changeTreasure)

const hiddenTreasureStart = (count) => {
    console.log(`宝の数:${count}`)
    const changeTreasure = (count) => {
        return Math.floor(Math.random() * count) + 1
    };
    let treasure = changeTreasure(count);

    console.log(`お宝の位置: ${treasure}`);
    const $hiddenTreasure = document.querySelector('.hiddenTreasure-content');
    // 既存の内容をクリア
    $hiddenTreasure.innerHTML = '';
    let row;
    for (let i = 1; i <= count; i++) {
        if ((i - 1) % 10 === 0) {
            row = document.createElement('div');
            row.className = 'row';
            $hiddenTreasure.appendChild(row);
        }
        const $treasureElement = document.createElement('div');
        $treasureElement.className = 'treasure-cell col text-center border p-2';
        $treasureElement.textContent = i;
        $treasureElement.style.cursor = 'pointer'

        $treasureElement.addEventListener('click', () => {
            const $body = document.getElementsByTagName('body')[0];
            if (i === treasure) {
                // 画面いっぱいに文字を表示する
                const celebrationDiv = document.createElement('div');
                celebrationDiv.textContent = '今夜は宴だーーー！！！肉持ってこーい！！！';
                celebrationDiv.style.position = 'fixed';
                celebrationDiv.style.top = '0';
                celebrationDiv.style.left = '0';
                celebrationDiv.style.width = '100%';
                celebrationDiv.style.height = '100%';
                celebrationDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                celebrationDiv.style.color = 'white';
                celebrationDiv.style.display = 'flex';
                celebrationDiv.style.justifyContent = 'center';
                celebrationDiv.style.alignItems = 'center';
                celebrationDiv.style.fontSize = '3rem';
                celebrationDiv.style.zIndex = '1000';
                $body.appendChild(celebrationDiv);

                //画面クリックで元の画面に戻る
                celebrationDiv.addEventListener('click', () => {
                    $body.removeChild(celebrationDiv);
                })
                //treasure-cellの背景色リセット
                const $treasureElementAll = $hiddenTreasure.querySelectorAll('.treasure-cell');
                $treasureElementAll.forEach((el) => {
                    el.style.backgroundColor = ''
                });

                treasure = changeTreasure(count)
                console.log(`お宝の位置: ${treasure}`);


            } else {
                alert('おいおい、宝がねェじゃねぇか！！！');
                $treasureElement.style.backgroundColor = 'gray';
            }
        })

        row.appendChild($treasureElement);
    }
    const $resetButton = document.querySelector('.reset-btn');
    $resetButton.addEventListener('click', () => {
        treasure = changeTreasure(input)
        console.log(`お宝の位置: ${treasure}`);

    })
}

//Q2 配列の最大値を見つける
const numbersArray = [];
const inputElement = document.getElementById('numberInput');
const largestItem = document.querySelector('.largestNumber-item')

const addLargestNumber = (event) => {
    event.preventDefault();
    const inputValue = parseInt(inputElement.value, 10);

    if (!isNaN(inputValue) && numbersArray.length < 5) {
        numbersArray.push(inputValue);
        inputElement.value = '';
        console.log(numbersArray)

        if (numbersArray.length === 5) {
            const maxNumber = Math.max(...numbersArray);
            largestItem.textContent = `最大値:${maxNumber}`
        }

    } else if (numbersArray.length >= 5) {
        alert('最大5個まで登録できます。');
    } else {
        alert('半角の数字のみ入力可能です。有効な数字を再入力してください。')
    }
}

const resetArray = () => {
    numbersArray.length = 0;
    largestItem.textContent = '最大値:'; // 表示をリセット
    document.getElementById('numberInput').value = ''; // 入力フィールドをクリア
    console.log('配列がリセットされました:', numbersArray);
}

document.querySelector(".numberArrayReset").addEventListener('click', resetArray);
document.getElementById('submitNumber').addEventListener('click', addLargestNumber);

//応用 最大値を当てろ！ゲーム

let numberArry = [];
let gameActive = false;

const createNumber5 = () => {
    if (numberArry.length === 0) {
        let numbers = [];
        while (numbers.length < 5) {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
        $startBtn.style.display = 'none'
        gameActive = true;
        console.log(numbers);
        numberArry = numbers;
    }
}

const $startBtn = document.querySelector('.guessMaximum-start')
$startBtn.addEventListener('click', createNumber5);

const $sendInput = document.getElementsByClassName('guessMaximum-submit')[0];
$sendInput.addEventListener('click', (e) => {
    e.preventDefault()
    const $numInput = document.getElementById('guessMaximum-numInput');
    const guessedNumber = parseInt($numInput.value, 10);
    $numInput.value = ''

    if (!isNaN(guessedNumber) && gameActive) { // 有効な数値・ゲームが始まっているか確認
        const input = guessedNumber;
        const maxNumber = numberArry.length > 0 ? Math.max(...numberArry) : null;

        if (maxNumber === input) {
            alert('おめでとうございます。正解です')
            const $numberItem = document.querySelector('.guessMaximum-item');
            console.log(numberArry)
            $numberItem.textContent = `${numberArry} でした。`
            numberArry = [];
            gameActive = false
            showRestartButton();
        } else {
            alert('残念！！不正解')
        }
    }
});

const showRestartButton = () => {
    const restartButton = document.createElement('button');
    restartButton.textContent = '再スタート';
    restartButton.className = 'btn btn-secondary mt-3';
    document.querySelector('.guessMaximum-main').appendChild(restartButton);

    restartButton.addEventListener('click', () => {
        numberArry = []; // 配列をリセット
        const $numberItem = document.querySelector('.guessMaximum-item');
        $numberItem.textContent = '今回数字は…'; // 表示をリセット
        createNumber5(); // 新しいゲームを開始
        restartButton.remove(); // ボタンを削除
    });
}
