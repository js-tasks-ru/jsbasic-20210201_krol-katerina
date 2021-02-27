function hideSelf() {
  buttonHidden = document.querySelector('.hide-self-button');
  buttonHidden.addEventListener('click', function() {
    buttonHidden.setAttribute('hidden', 'hidden');
  });
}
