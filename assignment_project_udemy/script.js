const APIURL = "http://localhost:3000/courses";
const SEARCHAPI = "http://localhost:3000/courses?q=";

const CONTAINER_COURSES = document.querySelector("main .first-section .container-courses .carousel-inner");
const FORM = document.querySelector("nav .container-search form");
const INPUT_SEARCH = document.querySelector("nav .container-search form input");
const CLICK_SEARCH = document.querySelector("nav .container-search form button");
const CAROUSEL_CONTAINER = document.querySelector("#carousel-box");

const tags = ['programming'];
//Get Courses
getCourses(APIURL);

async function getCourses(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    showCourses(respData);
}

//Display Courses
function showCourses(courses) {
    // courses = courses.filter((course) => selected_tags.includes(course.category));
    CAROUSEL_CONTAINER.innerHTML = "";
    let counter=0;
    let carouselItem = ``;

    for(let i = 0; i < courses.length; i++) {
        counter ++;
        if(i % 4 === 0) {
            if(i !== 0) {
                counter = 0;
                carouselItem += `</div></div>`;
                CAROUSEL_CONTAINER.innerHTML += carouselItem;
            }
            carouselItem = `
            <div class='carousel-item ${i === 0 ? 'active' : ''}'>
                <div id='First-Carousel' class='row'>
            `;
        }

        const course = courses[i];
        carouselItem += `
        <article class='card-box col-lg-3 col-md-4 col-sm-12'>
            <img src='${course.image}' class='img-fluid' alt='${course.title}'>
            <h5 class='mb-1'>${course.title}</h5>
            <p class='mb-1'>${course.author}</p>
            <div class='rate'>
                <span class='num-rate'>${course.rate}</span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star checked'></span>
                <span class='fa fa-star'></span>
                <span class='fa fa-star'></span>
                <span class='watch-rate'>(17.954)</span>
            </div>
            <div class='price mb-1'>
                <h4 class='price-after' id='testH'>${course.price}</h4>
                <h4 class='price-before'>${course.beforeDiscount}</h4>
            </div>
        </article>`;
    }
    if(counter) {
        carouselItem += `</div></div>`;
        CAROUSEL_CONTAINER.innerHTML += carouselItem;
    }
}

//filter when click button
function filterSelection(x){
    console.log(x);
    x=x.toLowerCase();
    console.log(x);
    getCourses(SEARCHAPI+x);
}

//search by filter data
CLICK_SEARCH.addEventListener('click', function (e){

    e.preventDefault();

	var filter = INPUT_SEARCH.value.toUpperCase();
	var searchItems = document.querySelectorAll('.card');
	var searchItemsTexts = document.querySelectorAll('.card h5')
    console.log(searchItems.length);
	for (i = 0; i < searchItems.length; i++) {
	    if (searchItemsTexts[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
	      searchItems[i].style.display = "";
	    } else {
	      searchItems[i].style.display = "none";
	    }
	}
})