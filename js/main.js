const helpBtns = [...document.querySelectorAll('#helpbtn, #closebtn')];

helpBtns.forEach(element => element.addEventListener('click', () => {
    document.getElementById('help').classList.toggle('nodisplay');
  }))
  