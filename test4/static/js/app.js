
const popup = document.querySelector('.popup');
const buttonPopup = document.querySelector('.header__button');


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonPopup.addEventListener('mouseup', openPopup, false);
window.addEventListener('mouseup', (evt) => {
  if(!evt.target.classList.contains('popup') && popup.classList.contains('popup_opened')) {
    closePopup();
  }
}, true);

window.addEventListener('keyup', (evt) => {
  if(evt.key === 'Escape') {
    closePopup();
  }
})