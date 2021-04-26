'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Scoll smooth first link "Learn more"
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {

  // const s1coords = section1.getBoundingClientRect();
  //   console.log('Section 1');
  //   console.log(s1coords);
  //   console.log('Window offset');
  //   console.log(window.pageYOffset);
  //   window.scrollTo(window.pageXOffset +  s1coords.x , window.pageYOffset +  s1coords.y);

  
   section1.scrollIntoView({behavior: 'smooth'});
});


// Link smooth scroll 
// Page navigation smooth
// Nu e buna ca folosim forEach
///////////////////////////////////////////////
// const linkBtns = document.querySelectorAll('.nav__link__scroll');

// linkBtns.forEach(function(el){

//   el.addEventListener('click', function(e){
  
//     e.preventDefault();
//     const href = e.target.getAttribute('href');
//     document.querySelector(`${href}`).scrollIntoView({behavior: 'smooth'});
//   });
// });


////////////////////////////////////////////
// Page navigation with event delegation


// get the ul/ parrent
const navLinks = document.querySelector('.nav__links');

// add event to the parent
navLinks.addEventListener('click', function(e){
  // prevent default
  e.preventDefault();
  // if the target classlist contains the li class
  if(e.target.classList.contains('nav__link__scroll')){
    // take the href atribute with is the section we want to scroll
    const id = e.target.getAttribute('href');
    // scroll there
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});





////////////////////////////////////////////////////////////
// Content show and click btn


const containerTab = document.querySelector('.operations__tab-container');
const btnTabs = document.querySelectorAll('.operations__tab');
const contentTabs = document.querySelectorAll('.operations__content');


containerTab.addEventListener('click', function(e){

  
  // find the closest element with that class
  const tabClicked = e.target.closest('.operations__tab');

  // return if closest doesn't exist, null
  if(!tabClicked) return

  //get the dataset from html element
  const number = tabClicked.dataset.tab;
  const tabShow = document.querySelector(`.operations__content--${number}`)
  // const tabShow =
  // == document.querySelector(`.operations__content--${tabClicked.dataset.tab}`)
  
  // eliminate the active class from buttons and content tabs
  btnTabs.forEach(el => el.classList.remove('operations__tab--active'));
  contentTabs.forEach(el => el.classList.remove('operations__content--active'));
  
  // add active class to pressed button and corresponding tab
  tabClicked.classList.add('operations__tab--active')
  tabShow.classList.add('operations__content--active');

});



////////////////////////////////////////////
 // navigatie fade on mouse over

 // select the parent witch is the nav
 const nav = document.querySelector('.nav');

// function to change the opacity
 function hideOther(e){
   // check if the a link class is in the element clicked
  if(e.target.classList.contains('nav__link')){
    // curent link is the curent target
    const link = e.target;
    // get the siblings by selecting the parent of link, then select all a links
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // same with the img
    const logo = link.closest('.nav').querySelector('img');

    // set the opacity for all sibling, only the clicked on link stay the same
    siblings.forEach(el =>{ if(el!= link) el.style.opacity = this});
    logo.style.opacity = this;
  }
};

//  nav.addEventListener('mouseover', function(e){ hideOther(e, 0.5)});
//  nav.addEventListener('mouseout', function(e){ hideOther(e, 1 )});
// we bind the element with bind and pass the opacity with will be acesible 
// with this in funtion
 nav.addEventListener('mouseover', hideOther.bind(0.5));
 nav.addEventListener('mouseout', hideOther.bind(1 ));





///////////////////////////////////
 // sticky on scoll
 // this is bad

// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);
//   const coords = section1.getBoundingClientRect();
  
//   console.log('section 1 coords');
//   console.log(coords.y);

//   if(coords.y < 90) nav.classList.add('sticky');
//    else nav.classList.remove('sticky');
  
// })





//////////////////////////////////////////
// observer API 
const header = document.querySelector('.header');
// obtinem inaltimea navigatiei
let height = nav.getBoundingClientRect().height;

// optiunile obj observer
let options = {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`
}

// functia pe care o chemam in obj observer
function callbackFunction(e){
  // daca window intersecteza sectiunea1  

  // adaugam clasa sticky
  if(!e[0].isIntersecting)document.querySelector('.nav').classList.add('sticky');
  else document.querySelector('.nav').classList.remove('sticky');
  // daca nu o eliminam
  
}
// noul observer obj
let observer =  new IntersectionObserver(callbackFunction, options);
// observam headerul 
observer.observe(header);









////////////////////////////////////////////
// Sections revealing

const sections = document.querySelectorAll('.section');

// Aplly hidden 
// sections.classList.add('section--hidden');

// functia callback din obj observer
function showSection(entries){
  // entries e o lisa cu 1 el si il luam pe primul adica singurul
  const [entrie] = entries;
  // daca scroll a intersectat sectiunea
  if(entrie.isIntersecting) {
    // eliminam clasa hidden din entrie.target
    entrie.target.classList.remove('section--hidden');
    // o unobservam
    sectionObserver.unobserve(entrie.target);
  }
}
  // optiunile pentru obj observer
 const optionsSection = {
  root: null,
  threshold: 0.1
};

// cream un nou obj observer cu functie callback si optiuni
const sectionObserver = new IntersectionObserver(showSection, optionsSection);

// din vectorul cu sectiuni, facem foreach si le observam pe toate
// si pune classa hidden 
sections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});






//////////////////////////////////////////////
// Lazy load image


const images = document.querySelectorAll('[data-src]');


function lazyImageLoad(entries, observer){
  const [entrie] = entries;
  const {src} = entrie.target.dataset;
  
  entrie.target.setAttribute('src', src);
  entrie.target.addEventListener('load', function(e){
    e.target.classList.remove('lazy-img');
    observerImageLoad.unobserve(e.target);
  });
}

const optionsLazyLoad = {
  root: null,
  threshold: 0.9,
}

const observerImageLoad = new IntersectionObserver(lazyImageLoad, optionsLazyLoad);

images.forEach(image => observerImageLoad.observe(image));


//////////////////////////////////////////////////////
// Slider 


const slides = document.querySelectorAll('.slide');

const slide1 = document.querySelector('.slide--1');
const slide2 = document.querySelector('.slide--2');
const slide3 = document.querySelector('.slide--3');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');




let curentSlide = 0;
const numberOfSlides = slides.length -1;

////// RENDER THE SLIDES
function renderSlides(curentSlide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curentSlide)}%)`;
  })
}




/////////////// NEXT SLIDE
function nextSlide(){;
  curentSlide++;
  if(curentSlide > numberOfSlides) curentSlide=0;
  renderSlides(curentSlide);
  removeDotsActiveClass(curentSlide)
}


/////////// PREV SLIDE
function prevSlide(){
  curentSlide--;
  if(curentSlide < 0) curentSlide=numberOfSlides;
  renderSlides(curentSlide);
  removeDotsActiveClass(curentSlide)
}


///////// RIGHT BTN
btnRight.addEventListener('click', nextSlide );

//////// LEFT BTN
btnLeft.addEventListener('click',prevSlide);

//////// KEY DOWN 
document.addEventListener('keydown', function(e){
  if( e.key === 'ArrowRight'){
    nextSlide();
  } else {
    prevSlide();
  }
})


///////// Slider with btns
const dots = document.querySelector('.dots');


// create butons 
function createButtons(){
  slides.forEach(function(e, i){
    dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"> </button>`);
  });
}


// remove dots class and add it to the active
function removeDotsActiveClass(number){
  const dotsAll = document.querySelectorAll('.dots__dot');
  dotsAll.forEach(e => e.classList.remove('dots__dot--active'));
  dotsAll[number].classList.add('dots__dot--active');
}

// Click on dots, move to clicked
dots.addEventListener('click', function(e){
    if(e.target.closest('.dots__dot')){
     let {slide}=  e.target.closest('.dots__dot').dataset;
     curentSlide = slide;
      renderSlides(curentSlide);
      removeDotsActiveClass(curentSlide);
    }
})


function Init(){
/////// SHOW THE SLIDERS ON PAGE LOAD
  renderSlides(curentSlide);

  createButtons();

  removeDotsActiveClass(curentSlide)
}

Init();









