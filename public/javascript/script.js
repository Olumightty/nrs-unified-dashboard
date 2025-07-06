// add hovered class to selected list item

let list = document.querySelectorAll('.list')
list.forEach(item => item.addEventListener("mouseover", activeLink));
// menu toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
let logo = document.querySelector("#logo");

toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
    logo.classList.toggle("active");
}

let links = document.querySelectorAll(".navigation a");
links.forEach(link => {
    if (window.location.href.includes(link.href)) {
        link.classList.add("hovered");
    }
})

