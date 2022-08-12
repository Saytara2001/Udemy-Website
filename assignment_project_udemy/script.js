const APIURL = "http://localhost:3000/courses";
const SEARCHAPI = "http://localhost:3000/courses?q=";

const CONTAINER_COURSES = document.querySelector("main .first-section .container-courses .container-cards");
const FORM = document.querySelector("nav .container-search form");
const INPUT_SEARCH = document.querySelector("nav .container-search form input");


//Get Courses
getCourses(APIURL);

async function getCourses(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showCourses(respData)
}

//Display Courses
function showCourses(courses) {
    CONTAINER_COURSES.innerHTML = ""; //clear courses
    courses.forEach(course => {
        CONTAINER_COURSES.innerHTML += `<article class='card'>
        <img src='${course.image}' alt='${course.title}'>
        <h5>${course.title}</h3>
        <p>${course.author}</p>
        <div class='rate'>
            <span class='num-rate'>${course.rate}</span>
            <span class='fa fa-star checked'></span>
            <span class='fa fa-star checked'></span>
            <span class='fa fa-star checked'></span>
            <span class='fa fa-star'></span>
            <span class='fa fa-star'></span>
            <span class='watch-rate'>(17.954)</span>
        </div>
        <div class='price'>
            <h5 class='price-after'>${course.price}</h5>
            <h5 class='price-before'>${course.beforeDiscount}</h5>
        </div>
    </article>`;
    });
}

//searcBar by filter data
function searchFunction()
{
	var searchInp = document.querySelector('.INPUT_SEARCH');
	var filter = searchInp.value.toUpperCase();
	var searchItems = document.querySelectorAll('.Searchitem a');
	var searchItemsTexts = document.querySelectorAll('.Searchitem p')

	for (i = 0; i < searchItems.length; i++) {
        
	    if (searchItemsTexts[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
	      searchItems[i].style.display = "";
	    } else {
	      searchItems[i].style.display = "none";
	    }
	}
}







//search bar by api
FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = INPUT_SEARCH.value;
    console.log(searchTerm);

    if (searchTerm) {
        getCourses(SEARCHAPI + searchTerm);
        INPUT_SEARCH.value = "";
    }
});