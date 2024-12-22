let hamburger=document.querySelector(".hamburger")
let cross=document.querySelector(".side-menu-cross")
let sideMenu=document.querySelector(".side-menu")
hamburger.addEventListener("click",()=>{
    CloseAndOpenSideMenu(true)
})
cross.addEventListener("click",()=>{
    CloseAndOpenSideMenu(false)
})
// side-menu Functionality
function CloseAndOpenSideMenu(bool){
   if(bool) sideMenu.classList.remove("hidden")
   else sideMenu.classList.add("hidden")
}