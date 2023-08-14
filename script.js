'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// button scrolling

scrollTo.addEventListener('click',function(){
  section1.scrollIntoView({behavior: 'smooth'});
});

///////////////////////////////////////
// navigation scrolling

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})
/*
document.querySelectorAll('.nav__link').forEach((el) => {
  el.addEventListener('click',function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  })
});
*/

///////////////////////////////////////
// tabbed content

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  //removing the active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

///////////////////////////////////////
// menu fade animation

nav.addEventListener('mouseover',function(e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if(el !== link) {
        el.style.opacity = 0.5;
      }
    })
    logo.style.opacity = 0.5;
  }
})

nav.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if(el !== link) {
        el.style.opacity = 1;
      }
    })
    logo.style.opacity = 1;
  }
})

// sticky navigation
const cords = section1.getBoundingClientRect();

document.addEventListener('scroll',function(){
  if(window.scrollY > cords.top){
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky');
  }
})

// revealing sections

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserver(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries,observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})

imgTargets.forEach(function(img){
  imgObserver.observe(img);
})

//slider

const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');

let currSlide = 0;
let maxSlide = slides.length;

const gotoSlide = function(slide) {
  slides.forEach((e , i) => {
    e.style.transform = `translateX(${100 * (i - slide)}%)`
  });
}
gotoSlide(0);

const nextSlide = function() {
  if(currSlide === maxSlide-1) {
    currSlide = 0;
  }
  else {
    currSlide++;
  }
  gotoSlide(currSlide);
}

const prevSlide = function() {
  if(currSlide === 0) {
    currSlide = maxSlide-1;
  }
  else {
    currSlide--;
  }
  gotoSlide(currSlide);
}
leftBtn.addEventListener('click',prevSlide);
rightBtn.addEventListener('click',nextSlide);