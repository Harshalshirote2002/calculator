// expectedEvents1 = ['numberEvent', 'operatorEvent', 'numberEvent', 'operateEvent'];
// expectedEvents2 = ['numberEvent', 'operatorEvent', 'numberEvent', 'operatorEvent'];
const numerals = document.querySelector('.numerals');

for (let i = 1; i <= 9; i++) {
    numerals.style.display = 'grid';
    numerals.style.gridTemplateColumns = 'repeat(3, 1fr)';
    numerals.style.gridTemplateRows = 'repeat(3, 1fr)';
    const key = document.createElement('button');
    key.textContent = `${i}`;
    key.classList.add('numeric-keys');
    numerals.appendChild(key);
}

function buttonPress(e){
    keys.forEach((key) => {
        if(Array.from(key.classList).includes('pressed-button')){
            key.classList.remove('pressed-button');
        }
    })
    e.target.classList.add('pressed-button');
}

function buttonRelease(e){
    keys.forEach((key) => {
        if(Array.from(key.classList).includes('pressed-button')){
            key.classList.remove('pressed-button');
        }
    })
}

//button click highlight handler
const keys = Array.from(document.querySelectorAll('button'));
keys.forEach((key) =>{key.addEventListener('mousedown', buttonPress)});
keys.forEach((key) =>{key.addEventListener('mouseup', buttonRelease)});

//Input Output handler

keys.forEach((key) => key.addEventListener('click', clickEvent));

const display = document.querySelector('.display');
let result = '0';
let operand = '';
let oldOperation = '+';
let beginMode = 1;

function validityCheck(){
    if(display.textContent ==''){
        display.textContent='0';
    }
    else if(display.textContent == '0'){
        operand='';
        beginMode=1;
    }
}

function rejectEvent(){
    alert('That is not what I expect!');
}

function numberEvent(e){
    if(!(e.target.textContent=='0') && beginMode==1){
        beginMode=0;
    }
    if(beginMode==0){
        if(e.target.textContent=='.'){
            if(!operand){
                operand='0';
            }
            operand.includes('.') || (operand+='.');
        }else{
            operand+=e.target.textContent;
            
        }
        display.textContent=operand;
        validityCheck();
    }
}

function toggleEvent(){
    if(parseFloat(display.textContent)>0){
        tempArr = display.textContent.split('');
        tempArr.unshift('-');
        display.textContent = tempArr.join('');
        if(operand){
            tempArr2 = operand.split('');
            tempArr2.unshift('-');
            operand = tempArr2.join('');
        }
    }else if(parseFloat(display.textContent)<0){
        tempArr = display.textContent.split('');
        tempArr.shift();
        display.textContent = tempArr.join('');
        if(operand){
            tempArr2 = operand.split('');
            tempArr2.shift();
            operand = tempArr2.join('');
        }
    }
}

function operationEvent(e){
    currentOperation = e.target.textContent;
    if(oldOperation=='÷' && display.textContent=='0'){
        alert('Now that\'s mischievous!');
        clearEvent();
        return 
    }
    result = operator(result, display.textContent, oldOperation);
    oldOperation = currentOperation;
    display.textContent=result;
    operand = '';
    validityCheck();
    
}

function operateEvent(e){
    if(!oldOperation){
        rejectEvent();
        return
    }
    result = operator(result, display.textContent, oldOperation);
    operand = result;
    result='0';
    display.textContent = operand;
    oldOperation = '+';
    if(operand=='Infinity' || operand=='-Infinity'){
        alert('Now that\'s mischievous!');
        clearEvent();
        return 
    }
    validityCheck();
}

function deleteEvent(e){
    if(!operand){
        rejectEvent();
        return
    }
    tempArr = operand.split('');
    tempArr.splice(tempArr.length-1, 1);
    operand = tempArr.join('');
    display.textContent = operand;
    validityCheck();
}

function clearEvent(){
    result = '0';
    operand = '';
    oldOperation = '+';
    beginMode = 1;
    display.textContent = '0';
}

function clickEvent(e){
    if(Array.from(e.target.classList).includes('numeric-keys')){
        numberEvent(e);
    }else if(Array.from(e.target.classList).includes('operation-keys')){
        operationEvent(e);
    }else if(Array.from(e.target.classList).includes('operate')){
        operateEvent(e);
    }else if(Array.from(e.target.classList).includes('clear')){
        clearEvent();
    }else if(Array.from(e.target.classList).includes('delete-btn')){
        deleteEvent(e);
    }else if(Array.from(e.target.classList).includes('sign-toggle')){
        toggleEvent();
    }
}

const operator = function operator(result, operand, operation) {
    if (operation == '+') {
        result = `${parseFloat(result) + parseFloat(operand)}`;
    } else if (operation == '-') {
        result = `${parseFloat(result) - parseFloat(operand)}`;
    } else if (operation == 'X') {
        result = `${parseFloat(result) * parseFloat(operand)}`;
    } else {
        result = `${parseFloat(result) / parseFloat(operand)}`;
    }
    return `${Math.round(result * 10000) / 10000}`;
}
