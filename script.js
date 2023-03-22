/*_______________________________________________________________________OLD_COUNTRY_FETCH
fetch("https://raw.githubusercontent.com/uglykidmat/wf3-weatherapp/main/countries.json")
    .then(response => response.json())
    .then(data => {
        let options = "";
        for (let country of data){
            options += "<option value=\""+country.code+"\">"+country.code+"</option>";
            console.log(country);
        }
        document.querySelector("#countriesselect").innerHTML = options;
    })

let countriesList = [];
let countrySelection = document.getElementById("countriesselect");
let countrySelected = countrySelection.options[countrySelection.selectedIndex].value;
let countrySelectedText = countrySelection.options[countrySelection.selectedIndex].text;

console.log(countrySelection);
console.log(countrySelected);
console.log(countrySelectedText);
*/

/*let newArray = []
tableau.filter(function(element){
    let isTrue = element.includes('ma recherche);
    if(isTrue === true){
         newArray.push(element)
    }
}) */

let universitiesList = [];
let universitiesListClean = [];
//let filterrequest = "";
let resultsDiv = document.getElementById("results");
let countryInput = document.getElementById('countryinput');
let searchBtn = document.getElementById("searchbtn");

let filterBlock = document.getElementById("filterblock");
let filterInput = document.getElementById('filterinput');

filterInput.addEventListener("input",filterList);
filterBlock.style.display = "none";

searchBtn.addEventListener("click", () => {
    let reqURL = "http://universities.hipolabs.com/search?country=" +countryInput.value ;
    console.log(countryInput.value + " / " + reqURL);
    fetch(reqURL)
    .then(response => {return response.json();
        })
    .then((data) => {
        data.forEach (item => universitiesList.push(item));
        console.log("=_=_=_=_=_=_=_=_=_=_=");
        console.log(universitiesList);

        /*________________________Dédoublonnage du tableau de valeurs*/
        let i = 0;
        while(i < (universitiesList.length/2)){
            universitiesListClean[i] = universitiesList[i];
            i++;
        }
        console.log("=_=_=_=_=_=_=_=_=_=_=");
        console.log(universitiesListClean);

        if(data.length < 50){
            filterBlock.style.display = "none";
            let affichage = "";
            for(let universite of data){
                affichage += "<div class=\"countryUniv\"><h2 class=\"countryUnivName\">"+universite.name+"</h2><br/><p class=\"countryUnivInfo\">"+universite.web_pages+"</p></div>"
                }
                resultsDiv.innerHTML = affichage;
        }
        else {
            filterBlock.style.display = "block";
            let affichage = "";
            for(let universite of data){
                affichage += "<div class=\"countryUniv\"><h2 class=\"countryUnivName\">"+universite.name+"</h2><br/><p class=\"countryUnivInfo\">"+universite.web_pages+"</p></div>"
                }
                resultsDiv.innerHTML = affichage;
        }
    })
    .catch(function(err){
        console.error(err);
    })
    /*
    setTimeout(() => {
        console.log(universitiesList)
    }, 1000);*/
});

function filterList () {
    let filterPattern = filterInput.value.toLowerCase();
    console.log("____________________");
    console.log("Filter pattern : "+ filterPattern);
    /*let universitiesToFilter = document.querySelectorAll("h2.countryUnivName");
    console.log(typeof(universitiesToFilter));
    console.log(universitiesToFilter);*/
    console.log("====================");
    console.log("UniversitiesListClean :");
    console.log(universitiesListClean);
    console.log("====================");

    /*______________BIEN TENTÉ MAIS NON !
    let filterRegex = new RegExp ("/\w+"+filterPattern+"\w+/g");
    */

    let universitiesFiltered = [];
    universitiesListClean.forEach(item => {
        //console.log(item.name);
        if(item.name.toLowerCase().match(filterPattern)){
            universitiesFiltered.push(item)
        }
    });
    let affichage = "";
    for(let universite of universitiesFiltered){
        affichage += "<div class=\"countryUniv\"><h2 class=\"countryUnivName\">"+universite.name+"</h2><br/><p class=\"countryUnivInfo\">"+universite.web_pages+"</p></div>"
        }
    resultsDiv.innerHTML = affichage;

    console.log("UniversitiesFiltered :");
    console.log(universitiesFiltered);
    console.log("____________________");
}