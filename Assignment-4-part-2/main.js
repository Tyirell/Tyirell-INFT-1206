const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');



const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const filenames = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg',]


/* Declaring the alternative text for each image file */
const alternative = {
    'pic1': "Closeup of a human eye",
    'pic2': "A Giant white wave",
    'pic3': "Purple and White Flowers",
    'pic4': "Ancient Ruins",
    'pic5': "Insect on a Leaf",
}
/* Looping through images */
for (let i = 1; i <= filenames.length(); i++ ) {
    let imageLocation = `images/pic${i}.jpg`
    let alttext = alternative['pic'+ [i]]

    const newImage = document.createElement('img');
    newImage.setAttribute('src', imageLocation);
    newImage.setAttribute('alt', alttext);
    thumbBar.appendChild(newImage);


newImage.addEventListener("click",locate => {
    displayedImage.src = locate.target.src;
    displayedImage.alt = locate.target.alt;


});
}



/* Wiring up the Darken/Lighten button */
btn.getAttribute("class")
btn.setAttribute("class", xxx);
btn.textContent = xxx;
overlay.style.backgroundColor = xxx;
