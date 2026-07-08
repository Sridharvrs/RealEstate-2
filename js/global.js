
// ==============================================
/* ===========================================
        UNIVERSAL SCROLL REVEAL
=========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const items=document.querySelectorAll(
".reveal-left,.reveal-right,.reveal-up,.reveal-pop"
);

items.forEach((el,index)=>{

if(el.classList.contains("reveal-pop")){
el.style.setProperty("--delay",index%6);
}

});

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

observer.unobserve(entry.target);

}

});

},{
threshold:.15
});

items.forEach(el=>observer.observe(el));

});