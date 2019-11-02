var name = "";
var email= "";
var birth_year = "";
var addedItemToTheCart = [];
var removedItemsFromCart = [];
var bookDueDate = "30 days";
var cdDueDate = "10 days";
var books = ["Around the World","A Walk to Remember","Chemistry","Introduction to CSS","Best Friends","Game Of Thrones","Mahatma Gandhi","Harry Potter: All Series","Introduction To HTML","Mein Kamph","Introduction To Physics","Theory of Political Science"];
var cds = ["Pursuit of Happyness","Big Bang Theory","Fast And Furious","Friends Series","Gravity","Harry Potter: 1-8 Series","Heroes","Adolf Hitler","Lucy","Magic CD","Twilight","A Walk to Remember"];

var books_french = ["Autour du monde", "Une promenade mémorable", "Chimie", "Introduction à CSS", "Meilleurs amis", "Le Trône de Fer", "Mahatma Gandhi", "Harry Potter: Toutes les séries", "Introduction à HTML "," Mein Kamph "," Introduction à la physique "," Théorie de la science politique "];
var books_espaneol = ["La vuelta al mundo", "Un paseo para recordar", "Química", "Introducción a CSS", "Mejores amigos", "Juego de tronos", "Mahatma Gandhi", "Harry Potter: todas las series", "Introducción a HTML "," Mein Kamph "," Introducción a la física "," Teoría de la ciencia política "];

var cds_french = ["Poursuite du bonheur","La théorie du Big Bang","Rapide et furieux","Série d'amis","La gravité","Harry Potter: Série 1-8","Héros","Adolf Hitler","Lucy","CD magique","crépuscule","Une marche à retenir"];
var cds_spanish = ["Busqueda de la felicidad","Teoria del Big Bang", "Rápido y Furioso", "Serie de amigos","Gravedad","Harry Potter: serie 1-8","Héroes","Adolf Hitler","Lucy","CD mágico","Crepúsculo","Un paseo para recordar"];

var showToAdmin = false;
var admin_flag = false;
var name_validated = false;
var email_validated = false;
var year_validated = false;

var itemsInCache = [];
var flagToConsider = null;
var timer = null;
// Function used to Validate name
function validateName() {
    name = document.getElementById("name").value;
    var valid_name_regex = /^[A-z0-9]+([_-\s]*[A-z0-9])*$/;
    if(name=="admin") {
        name_validated = true;
        return true;
    }
    else if(!valid_name_regex.test(name)){
        document.getElementById("validate_name").innerHTML='Please Enter valid name';
        document.getElementById("name").blur();
        name_validated = false;
        return false;
    }
    else {
       
        name_validated = true;
        document.getElementById("validate_name").innerHTML='';
    }
    return true;
}
// Function used to Validate email
function validateEmail() {
    email = document.getElementById("email").value;
    let valid_email_regex = /^[a-zA-Z]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/;
    if(!valid_email_regex.test(email)){
        document.getElementById("validate_email").innerHTML='Please enter valid email';
        email_validated = false;
        return false;
    }
    else{
        email_validated = true;
       document.getElementById("validate_email").innerHTML='';
       return true;
    }

}
// Function used to Validate birth year
function validateBirthYear() {
    birth_year = document.getElementById("birth_year").value;
    var birth_year_regex = /^[0-9]{4}$/;
    if(birth_year==1867 && name !== undefined && name === "admin") {
        year_validated = true;
        return true;
    }
    else if(!birth_year_regex.test(birth_year)) {
        document.getElementById("validate_birth_year").innerHTML='Enter numbers only..';
        year_validated = false;
        return false;
    }
    
    else if(birth_year<1900 || birth_year>2019){
        document.getElementById("validate_birth_year").innerHTML='Year of birth must be between 1900 and the current year';
        year_validated = false;
        return false;
    }
    else {
        document.getElementById("validate_birth_year").innerHTML='';
        year_validated = true;
        return true;
    }
    
}
// Function which takes the user credentials and show the landing page accordingly
function handleSubmit(){
    let displayable_name = "";
    let person_age = "";
    if(validateName() && validateEmail() && validateBirthYear()) {
        // getElementById("submit_button") = "none";
        if(name === "admin" && birth_year == "1867") {
            admin_flag = true;
        }
        
        if(admin_flag) {
            displayable_name = "Librarian";
            showAdminLandingPage(displayable_name);
            admin_flag = false;
        }
        else {
            person_age = calculateIfAdultOrChild();
            displayable_name = (name + ' ('+email+")"+ " ["+person_age+"]");
            createWelcomePageHeading(displayable_name);    
            showLandingPage();
        }
        getElementById("validate_name").innerHTML = "";
        getElementById("validate_email").innerHTML = "";
        getElementById("validate_birth_year").innerHTML = "";
    }
    
    
}
// function which displays Admin Landing Page
function showAdminLandingPage(displayable_name) {
    disableMainFormDivs();
    createAdminPageMainDiv();
    createAdminWelcomePageHeading(displayable_name);
    createAdminRightsDescription();
    createAdminMenuSidebarPage();
}
// function used to create Admin Welcome Page Heading
function createAdminWelcomePageHeading(displayable_name) {
    let adminPageMainDiv = document.getElementById("adminPageMainDiv");
    let headerDiv = document.createElement("div");
    headerDiv.id = "headerDiv"
    let header = document.createElement("h2");
    let name = document.createTextNode(displayable_name);
    header.appendChild(name);
    let paraDivElement = createElement("div");
    paraDivElement.id = "paraDivElement";

    let adminPageDescription = createElement("p");
    let paragraphHeadingText = createTextNode("Being an admin you are authorized to do following operations");
    adminPageDescription.appendChild(paragraphHeadingText);
    let listOfAdminFunctionalities1 = createElement("li");
    let listOfAdminFunctionalities2 = createElement("li");
    let listOfAdminFunctionalities3 = createElement("li");
    
    
    let addFunctionality = createTextNode("You can add the item");
    listOfAdminFunctionalities1.appendChild(addFunctionality);
    let removeFunctionality = createTextNode("You can remove the item");
    listOfAdminFunctionalities2.appendChild(removeFunctionality);
    let modifyDueDateFunctionality = createTextNode("You can modify the due date of item");
    listOfAdminFunctionalities3.appendChild(modifyDueDateFunctionality);

    headerDiv.appendChild(header);
    paraDivElement.appendChild(adminPageDescription);
    paraDivElement.appendChild(listOfAdminFunctionalities1);
    paraDivElement.appendChild(listOfAdminFunctionalities2);
    paraDivElement.appendChild(listOfAdminFunctionalities3);
    adminPageMainDiv.appendChild(headerDiv);
    adminPageMainDiv.appendChild(paraDivElement);
}

function disableMainFormDivs() {
    
    let divsToDisable = [];
    let form = getElementById("form");
    divsToDisable.push(form);
    turnDivOnOff(divsToDisable,true);
}

function createAdminPageMainDiv() {
    let adminPageMainDiv = createElement("div");
    adminPageMainDiv.id = "adminPageMainDiv";
    adminPageMainDiv.className = "adminPageMainDivClass";
    let mainDiv = getElementById("mainDiv");
    mainDiv.appendChild(adminPageMainDiv);
}
function createAdminMenuSidebarPage() {
    let menuDiv = createElement("div");
    menuDiv.id = "menuDiv";
    menuDiv.className = "menuDiv";
    linkToAddMoreItem = createElement("a");
    linkToAddMoreItem.addEventListener("click",handleAdminAddMoreItemsClick);

    linkToAddMoreItem.innerHTML = "Add More Item";
    linkToAddMoreItem.id = "linkToAddMoreItem";

    linkToRemoveExistingItem = createElement("a");
    linkToRemoveExistingItem.innerHTML = "Remove an existing item";
    linkToRemoveExistingItem.id = "linkToRemoveExistingItem";
    linkToRemoveExistingItem.addEventListener("click",handleAdminRemoveExistingItemFromList);

    linkToModifyItemLoanPeriod = createElement("a");
    linkToModifyItemLoanPeriod.id = "linkToModifyItemLoanPeriod";
    linkToModifyItemLoanPeriod.innerHTML = "Modify loan period of an Item";
    linkToModifyItemLoanPeriod.addEventListener("click",showAdminModifyLoanPeriodPage);


    linkToModifyItemQuanity = createElement("a");
    linkToModifyItemQuanity.id = "linkToModifyItemQuanity";
    linkToModifyItemQuanity.innerHTML = "Modify quantity of an Item";
    linkToModifyItemQuanity.addEventListener("click",showAdminModifyItemQuanityPage);

    linkToshowAllItems = createElement("a");
    linkToshowAllItems.id = "linkToshowAllItems";
    linkToshowAllItems.innerHTML = "View All Items";
    linkToshowAllItems.addEventListener("click",retrieveAllItems);

    
    linkToLogOut = createElement("a");
    linkToLogOut.id = "linkToLogOut";
    linkToLogOut.innerHTML = "Log Out";
    linkToLogOut.addEventListener("click",handleAdminLogOut);
    linkToCloseSideBarNav = createElement("a");
    linkToCloseSideBarNav.href = "javascript:void(0)"
    linkToCloseSideBarNav.className = "closebtn";
    linkToCloseSideBarNav.addEventListener("click",closeSideBarNavigation);
    linkToCloseSideBarNav.innerHTML = "&times;"
    menuDiv.appendChild(linkToAddMoreItem);
    menuDiv.appendChild(linkToModifyItemLoanPeriod);
    menuDiv.appendChild(linkToModifyItemQuanity);
    menuDiv.appendChild(linkToRemoveExistingItem);
    menuDiv.appendChild(linkToshowAllItems);
    menuDiv.appendChild(linkToLogOut);
    menuDiv.appendChild(linkToCloseSideBarNav);
    adminPageMainDiv.appendChild(menuDiv);
}
function handleAdminAddMoreItemsClick() {}
function handleAdminRemoveExistingItemFromList(){}
function showAdminModifyLoanPeriodPage() {}
function showAdminModifyItemQuanityPage() {}
function retrieveAllItems() {}
function handleAdminLogOut() {}
function closeSideBarNavigation() {}