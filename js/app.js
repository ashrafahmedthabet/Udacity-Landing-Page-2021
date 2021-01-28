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
sectionId = 1;
mainTag = document.getElementsByTagName("main");
SectionAdd = document.getElementById("add-sections");
sectionCounter = document.getElementById("section-counter");
navList = document.getElementById("navbar__list");
buttonTop = document.getElementById("scroll-to-top");


/**
 * End Global Variables
 *
 */

/**
 *
 * Begin Main Functions
 *
 */
// create section
function createSection(count = 1) {
  if (count > 1) {
    let x = 0;
    while (x < count) {
      let sectionContent = `<section id="section${sectionId}" data-nav="Section ${sectionId}" class="your-active-class">
    <div class="landing__container">
      <h2>Section ${sectionId}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
  </section>`;
      mainTag[0].insertAdjacentHTML("beforeend", sectionContent);
      sectionId += 1;
      x++;
    }
    createNavBar();
  } else {
    let sectionContent = `<section id="section${sectionId}" data-nav="Section ${sectionId}" class="your-active-class">
    <div class="landing__container">
      <h2>Section ${sectionId}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
  </section>`;
    sectionId += 1;
    mainTag[0].insertAdjacentHTML("beforeend", sectionContent);
    createNavBar();
  }
}
// check sectionCounter
function checkSectionCounter(){
    if(sectionCounter.value<=0 || sectionCounter.value>10){
        alert("enter number from 1 to 10");
    }
    else{
    createSection(sectionCounter.value);
    }
}

// Add dynamic sections
SectionAdd.addEventListener("click", function () {
    checkSectionCounter();
});

// build the nav
function createNavBar() {
  navList.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    navList.insertAdjacentHTML(
      "beforeend",
      `<li><a class="menu__link" href="#${section.id}" data-link="${section.id}">
        ${section.dataset.nav}</a></li>`
    );
  });
  scrollToSection();
}
/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll smooth to section on link click

function scrollToSection() {
  let links = document.querySelectorAll(".menu__link");
  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        let section = document.getElementById(link.dataset.link);
        section.scrollIntoView({ behavior: "smooth" });
        removeActiveClass();
        addActiveClass(link.dataset.link);
      });
    });
  }
}

// Scroll to top

function scollToTop() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    buttonTop.style.display = "block";
  } else {
    buttonTop.style.display = "none";
  }
}

// add active link when scroll

window.addEventListener("scroll", function () {
  let position = window.pageYOffset;
  let sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    let sectionId = section.getAttribute("id");
    if (
      position > section.offsetTop - 50 &&
      position < section.offsetTop + section.offsetHeight
    ) {
      removeActiveClass();
      addActiveClass(sectionId);
    } else {
      document
        .querySelector(`a[href="#${sectionId}"]`)
        .classList.remove("active-link");
      document
        .getElementById(`${sectionId}`)
        .classList.remove("your-active-class");
    }
  });
  scollToTop();
});

// scroll to top with smooth

buttonTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Set anchor & sections as active

function addActiveClass(id) {
  document.querySelector(`nav a[href='#${id}']`).classList.add("active-link");
  document.querySelector(`#${id}`).classList.add("your-active-class");
}

// remove active class from anchor & section

function removeActiveClass() {
  let links = document.querySelectorAll(".menu__link");
  let sections = document.querySelectorAll("section");
  x = 0;
  while (x < links.length) {
    links[x].classList.remove("active-link");
    sections[x].classList.remove("your-active-class");
    x++;
  }
}

/**
 * End Events
 *
 */

// create 4 sections
createSection(4);