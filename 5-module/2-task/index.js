function toggleText() {
  toggleButton = document.querySelector('.toggle-text-button');
  textHidden = document.getElementById('text');
  toggleButton.addEventListener('click', function() {
    if (!textHidden.hasAttribute('hidden')) {
      textHidden.setAttribute('hidden', 'hidden');
    } else {
      textHidden.removeAttribute('hidden');
    }
  });
}
