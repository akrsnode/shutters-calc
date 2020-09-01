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
    if(data[0].value > 0 && data[1].value > 0 && data[2].value > 0) return false;
    return true;
}


btn.addEventListener('click', (e) => {
    if(validateForm(e)) return;
    let itemPrice = calcPrice(form[0].value, form[1].value, form[2].value);
    showPrice(itemPrice, true);
    let newForm = form.cloneNode(true);
    newForm.id = itemPrice;
    addEraseBtn(newForm[3])
    document.getElementById('elementList').appendChild(newForm);
    [...form].forEach(element => element.value = '');
})