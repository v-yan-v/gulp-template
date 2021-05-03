
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('h1')
    .style.color = 'green'
  
  let counter = 10
  while (counter--) {
    console.log(counter)
  }
})