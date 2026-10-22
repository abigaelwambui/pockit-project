const drawer = document.querySelector('.drawer')
const toggleButton = document.querySelector('.navbar-toggler')
const closeButton = document.querySelector('.btn-close')

toggleButton.addEventListener('click', ()=> {
    drawer.showModal()
    toggleButton.setAttribute("aria-expanded", "true")

})

closeButton.addEventListener('click', ()=> {
    drawer.close()
})