const numerals = document.querySelector('.numerals');

for(let i=9; i>=1; i--){
    numerals.style.display = 'grid';
    numerals.style.gridTemplateColumns = 'repeat(3, 1fr)';
    numerals.style.gridTemplateRows = 'repeat(3, 1fr)';
    const key = document.createElement('button');
    key.textContent = `${i}`;
    key.classList.add('numeric-keys');
    numerals.appendChild(key);
}
