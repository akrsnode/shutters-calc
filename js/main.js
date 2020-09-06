 let btn = document.querySelector('form #addbtn');
 let form = document.querySelector('form');
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
//Form validation
const validateForm = (e) => {
    let data = e.target.parentElement;
    for(let i = 0; i < 3; i++) {
        if(data[i].value <= 0) {
            form[i].classList.add('errorborder');
        } else {
            form[i].classList.remove('errorborder');
        }
    }
    if(data[0].value > 0 && data[1].value > 0 && data[2].value > 0) return false;
    return true;
}
//Change element
const changeElement = (e) => {
    let parent = e.target.parentElement;
    showPrice(parent.id, false)
    let itemPrice = calcPrice(parent[0].value, parent[1].value, parent[2].value);
    parent.id = itemPrice;
    showPrice(itemPrice, true);    
}


btn.addEventListener('click', (e) => {
    if(validateForm(e)) return;
    let itemPrice = calcPrice(form[0].value, form[1].value, form[2].value);
    showPrice(itemPrice, true);
    let newForm = form.cloneNode(true);
    newForm.id = itemPrice;
    addEraseBtn(newForm[3]);
    document.getElementById('elementList').appendChild(newForm);
    [...form].forEach(element => element.value = '');
    let inputs = [...document.querySelectorAll('input')];
    inputs.slice(3).forEach(element => element.addEventListener('change', changeElement))
})
