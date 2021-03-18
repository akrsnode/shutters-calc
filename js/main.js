 let btn = document.querySelector('form #addbtn');
 let helpBtns = [...document.querySelectorAll('#helpbtn, #closebtn')];
 const submitFormBtns = document.querySelectorAll(".order"); 
 let formItem = document.querySelector('form > div');
 let summary = document.getElementsByClassName('price');

 
 let price = 0;

//Price calculation
const calcPrice = (width, height, quantity) => {
    return ((Math.floor((width*height*quantity*350)/100)+1)*100);
}
const showPrice = (val, add) => {
    add ? price += val : price -= val;
    summary[0].textContent = price + 'zł';
}
//Create erase button
const addEraseBtn = (element) => {
    element.id = 'erase';
    element.classList += ' erase';
    element.textContent = 'Usuń';
    element.addEventListener('click', () => {
        showPrice(element.parentNode.id, false);
        element.parentNode.remove();
    })
}
//Form validation, return true when incorrect
const validateForm = (e) => {
    let data = e.target.parentElement.children;
    for(let i = 0; i < 4; i++) {
        if(data[i].value <= 0 && i != 1) {
            data[i].classList.add('errorborder');
        } else {
            data[i].classList.remove('errorborder');
        }
    }
    if(data[0].value > 0 && data[2].value > 0 && data[3].value > 0) return false;
    return true;
}


//Change element
const updateElement = (e) => {
    if (validateForm(e)) return;

    const parent = e.target.parentElement;
    const values = [parent.children[0].value, parent.children[2].value, Math.floor(parent.children[3].value)];

    showPrice(parent.id, false)
    let newPrice = calcPrice(...values);
    parent.id = newPrice;
    showPrice(newPrice, true);    
}


//Floor quantity value
const floorQuantity = (e) => {
    e.target.value = Math.floor(e.target.value);
}

//Event listeners

btn.addEventListener('click', (e) => {

    if(validateForm(e)) return;

    const values = [formItem.children[0].value, formItem.children[2].value, formItem.children[3].value];

    const itemPrice = calcPrice(...values);
    showPrice(itemPrice, true);

    let newForm = formItem.cloneNode(true);
    newForm.id = itemPrice;
    addEraseBtn(newForm.children[4]);

    document.getElementById('elementList').appendChild(newForm);

    [...formItem.children].forEach(element => element.value = '');
    let inputs = [...document.querySelectorAll('input')];
    inputs.slice(3).forEach(element => element.addEventListener('change', updateElement))
})

helpBtns.forEach(element => element.addEventListener('click', () => {
    document.getElementById('help').classList.toggle('nodisplay');
}))

submitFormBtns.forEach(e => e.addEventListener("click", () => {
    const inputs = document.querySelectorAll("form > div > input");

    if (inputs.length == 3) return alert("Aby złożyć zamówienie dodaj min. 1 front.");
    for (let i = 3; i < inputs.length; i++) {
        if (inputs[i].value <= 0) return alert(`Nieprawidłowa wartość frontu!`);
    }

    document.querySelector("form").submit();
}));
