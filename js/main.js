 let btn = document.querySelector('form #addbtn');
 let form = document.querySelector('form');
 let summary = document.getElementsByClassName('price');

 let validate = true
 let formIndex = 0;
 let price = 0;

//Calculate price
const calcPrice = (width, height, quantity) => {
    price += (width*height*quantity*350);
    summary[0].textContent = price + 'zł';
}

const addEvList = () => {
    document.querySelectorAll('#erase').forEach(element => {
        element.addEventListener('click', () => {
            element.parentElement.remove();
        })
    })
}


btn.addEventListener('click', (e) => {
    e.preventDefault();
    [...form].forEach(element => element.value == "" ? validate = false : validate = true)
    if(validate) return;
    calcPrice(form[0].value, form[1].value, form[2].value);
    let newForm = form.cloneNode(true);
    newForm.id = ++formIndex;
    //newForm[3].addEventListener('click', eraseElement(formIndex));
    newForm[3].id = "erase"
    newForm[3].textContent = "Usuń";
    document.getElementById('elementList').appendChild(newForm);
    [...form].forEach(element => element.value = '');
    addEvList();
})