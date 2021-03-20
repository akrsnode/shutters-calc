class Item {

  constructor(height, width, quantity) {
    this.height = height;
    this.width = width;
    this.quantity = quantity;
    this.value = this.calcValue();
    this.id = Math.floor(Math.random()*10000000);
  }

  getId() {
      return this.id;
  }

  edit(height, width, quantity) {
      this.height = height;
      this.width = width;
      this.quantity = quantity;
      this.value = this.calcValue();  
  }

  calcValue() {
    return (Math.floor((this.width * this.height * this.quantity * 350)/100)+1)*100;
  }

}

class Order {

  constructor() {
      this.items = new Map();
      this.value = 0;
      this.id = `${new Date().toLocaleDateString()}/${new Date().toLocaleTimeString()}/${Math.floor(Math.random()*1000000)}`
  }

  addItem(item) {
      this.items.set(item.getId(), item);
  }

  removeItem(id) {
      this.items.delete(id*1);
  }

  editItem(id, height, width, quantity) {
      this.items.get(id*1).edit(height, width, quantity);
  }

  getValue() {
      let result = 0;
      for (let item of this.getItems().values()) {
          result += item.calcValue();
      }
      return result;
  }

  getItems() {
      return this.items;
  }

  getId() {
      return this.id;
  }

  getSummary() {
    this.items = map_to_object(this.getItems());
    return this;
  }

}


const order = new Order();



let btn = document.querySelector('form #addbtn');
const submitFormBtns = document.querySelectorAll(".order"); 
let summary = document.getElementsByClassName('price');


//Form validation, return true when incorrect
const validateForm = (e) => {
  const item = e.target.parentElement;
  const data = e.target.parentElement.children;
  for(let i = 0; i < 4; i++) {
      if(data[i].value <= 0 && i != 1) {
          data[i].classList.add('errorborder');
      } else {
          data[i].classList.remove('errorborder');
      }
  }
  if(data[0].value > 0 && data[2].value > 0 && data[3].value > 0) {
      item.classList.remove("error")
      return false;
  } else {
      item.classList.add("error")
      return true;
  }
}

//Floor quantity value
const floorQuantity = (e) => {
  e.target.value = Math.floor(e.target.value);
}

//Displays
const displayPrice = () => {
  summary[0].textContent = order.getValue() + 'zł';
}

const addEraseBtn = (element) => {
  element.id = 'erase';
  element.classList += ' erase';
  element.textContent = 'Usuń';
  element.addEventListener('click', () => {
      order.removeItem(element.parentNode.id);
      element.parentNode.remove();
      displayPrice();
  })
}


//Change element
const updateElement = (e) => {
  if (validateForm(e)) return;

  const parent = e.target.parentElement;
  const values = [parent.children[0].value*1, parent.children[2].value*1, Math.floor(parent.children[3].value)];

  order.editItem(parent.id, ...values);
  displayPrice();
}




//Event listeners
btn.addEventListener('click', (e) => {

  if(validateForm(e)) return;

  const addItemForm = document.querySelector('form > div');
  const values = [addItemForm.children[0].value*1, addItemForm.children[2].value*1, addItemForm.children[3].value*1];
  const item = new Item(...values);

  //duplicate item modal
  const itemModel = addItemForm.cloneNode(true);
  addEraseBtn(itemModel.children[4]);
  itemModel.id = item.getId();
  document.getElementById('elementList').appendChild(itemModel);

  order.addItem(item);
  displayPrice();

  //clear add item form
  [...addItemForm.children].forEach(element => element.value = '');

  let inputs = [...document.querySelectorAll('input')];
  inputs.slice(3).forEach(element => element.addEventListener('change', updateElement))
})

function map_to_object(map) {
  const out = Object.create(null)
  map.forEach((value, key) => {
    if (value instanceof Map) {
      out[key] = map_to_object(value)
    }
    else {
      out[key] = value
    }
  })
  return out
}

submitFormBtns.forEach(e => e.addEventListener("click", () => {
  const inputs = document.querySelectorAll("form > div > input");
  const items = document.querySelectorAll("form > div");

  if (inputs.length == 3) return alert("Aby złożyć zamówienie dodaj min. 1 front.");
  for (let i = 3; i < inputs.length; i++) {
      if (inputs[i].value <= 0) return alert(`Nieprawidłowa wartość frontu!`);
  }


  document.getElementById("order-num").value = order.getId();
  document.getElementById("data").value = JSON.stringify(order.getSummary());
  document.querySelector("form").submit();
}));

