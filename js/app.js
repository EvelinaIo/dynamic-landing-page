/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll("section");
const navBar = document.querySelector("#navbar__list");
const topBtn = document.getElementById("topBtn");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Helper function to check if an element is in viewport
//if in viewport returns true
function isInViewport(element) {
    const distance = element.getBoundingClientRect();
    return (
        distance.top <= 100 &&
        distance.left >= 0 &&
        distance.bottom >= 90 &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth));
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav menu
function buildNavBar () {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        let newNavItem = document.createElement('li');
        const id = section.id;
        const dataNav = section.dataset.nav;
        newNavItem.innerHTML = `<a class="menu__link ${id}" href="#${id}">${dataNav}</a>`;
        fragment.appendChild(newNavItem);
    }
    navBar.appendChild(fragment);
}

buildNavBar();


//Event listener for scroll into section - uses the isInViewpot function
// Set sections and links as active
document.addEventListener('scroll', function activeSection(){
    for (const section of sections) {
        const navItem = document.querySelector(`.${section.id}`);
        if (isInViewport(section)) {
            section.classList.add("section-active");
            navItem.classList.add("link-active");
            console.log(`Section ${section.id} is active`);
        } else {
            section.classList.remove("section-active");
            navItem.classList.remove("link-active");
        }
    }
}
)


// Scroll to section on link click
const links = document.querySelectorAll(".menu__link");
console.log(links);
for (const link of links) {
    link.addEventListener("click", function clickHandler(a){
        a.preventDefault();
        const href = document.querySelector(link.getAttribute("href"));
        console.log(href);
        href.scrollIntoView({ behavior: "smooth" });
    });
}

//Reveal "scroll to top" button after scrolling down the viewport
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
}

//Event Listener for button click - uses the topFunction to scroll to top
topBtn.addEventListener('click', topFunction());
function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
/**
 * End Main Functions
 * Begin Events
 * 
*/