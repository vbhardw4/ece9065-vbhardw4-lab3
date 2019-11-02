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
function handleAdminAddMoreItemsClick(event) {
    
    
    removePreviousClickDivsFirst();
    let divsToDisable = [];
    // let library_items_list_id = getElementById("library_items_list_id");
    
    // let headerDiv = getElementById("headerDiv");
    // for(i=0;i<mainDiv.childElementCount;i++) {
    //     if(library_items_list_id !== null && mainDiv.children[i].id == library_items_list_id.id){
    //         mainDiv.removeChild(library_items_list_id);
    //     }
    // }
    // if(getElementById("adminPageMainDiv")!==null) {
    //     adminPageMainDiv.removeChild(getElementById("headerDiv"));
        
        
    //     let createHeader = createElement("h1");
        
    //     adminPageMainDiv.appendChild(headerDiv);
    // }
    divsToDisable.push(getElementById("paraDivElement"));
    turnDivOnOff(divsToDisable,true);
    // let adminAddContentDiv = createElement("div");
    // adminAddContentDiv.id = "adminAddContentDiv";
    // adminAddContentDiv.className = "adminAddContentDivClass";
    // selectItemLabel = createElement("label")
    // selectItemLabel.id = "selectItemLabel";
    // selectItemLabel.innerHTML = "Select An item you want to add";
    // let h1 = createTextNode("Select An item you want to add");
    // if(getElementById("selectWhichItemToAdd")!==null) {
    //     getElementById("adminAddContentDiv").removeChild(getElementById("selectWhichItemToAdd"));
    // }
    // let selectWhichItemToAdd = createElement("select");
    // selectWhichItemToAdd.id = "selectWhichItemToAdd";
    // let bookOption = createElement("option");
    // let defaultOption = createElement("option");
    // defaultOption.innerHTML = "Select";
    // defaultOption.value = "Select";
    // bookOption.innerHTML = "Book";
    // bookOption.value = "Book";
   
    // let cdOption = createElement("option");
    // cdOption.innerHTML = "CD";
    // cdOption.value = "CD";
   
    // selectWhichItemToAdd.add(defaultOption);
    // selectWhichItemToAdd.add(bookOption);
    // selectWhichItemToAdd.add(cdOption);
    // selectWhichItemToAdd.addEventListener("change",handleAdminAddItem);
   
    // adminAddContentDiv.appendChild(selectItemLabel);
    // adminAddContentDiv.appendChild(selectWhichItemToAdd);
    // adminAddContentDiv.appendChild(selectWhichItemToAdd);
    // // prepareTheModel("Add more items",adminAddContentDiv,"Press Enter to add !!! ");

    let [selectItemTypeLabel, labelForSelectItemToUpdate] =  getGenericShowItemTypeLabel();
    let adminAddContentDiv = createElement("adminAddContentDiv");
    adminAddContentDiv.id = "adminAddContentDiv";
    labelForSelectItemToUpdate.addEventListener("change",handleAdminAddAnItem);
    adminAddContentDiv.appendChild(selectItemTypeLabel);
    adminAddContentDiv.appendChild(labelForSelectItemToUpdate);
    getElementById("mainDiv").appendChild(adminAddContentDiv);
}
function handleAdminAddAnItem() {
    event.preventDefault();
    let itemTypeToAdd = event.target.value;
    handleAdminAddItem(itemTypeToAdd);
    // getItemType(itemTypeToAdd,flagToConsider);
}
function handleAdminAddItem(itemTypeToAdd) {
    let adminAddContentDiv = getElementById("adminAddContentDiv");
    
    if(itemTypeToAdd === "CD") {
        if(getElementById("divForAddBook")!==null) {
            getElementById("adminAddContentDiv").removeChild(getElementById("divForAddBook"));
        }
        if(getElementById("divForAddCD")!==null) {
            getElementById("adminAddContentDiv").removeChild(getElementById("divForAddCD"));
        }
        let divForAddCD = createElement("div")
        divForAddCD.id = "divForAddCD";
        let inputCDName = createElement("input");
        let inputCDQuantity = createElement("input");
        inputCDQuantity.id = "inputCDQuantity";
        let inputCDLoanDuration = createElement("input");
        inputCDLoanDuration.id = "inputCDLoanDuration";
        inputCDName.type = "text";
        inputCDLoanDuration.type = "number";
        inputCDQuantity.type = "number";
        inputCDName.id = "inputCDName";
        inputCDName.placeholder = "Enter name of the CD to add";
        inputCDQuantity.placeholder = `Enter quantity of ${itemTypeToAdd} in numbers to add`;
        inputCDLoanDuration.placeholder = `Enter ${itemTypeToAdd} loan duration`;
        inputCDName.addEventListener("keyup",submitAdminAddEvent);
        inputCDLoanDuration.addEventListener("keyup",submitAdminAddEvent);
        inputCDQuantity.addEventListener("keyup",submitAdminAddEvent);
        
        let createSpanElementForCDCreated = createElement("span");
        createSpanElementForCDCreated.id = "createSpanElementForCDCreated";

        let createSpanElementForCD = createElement("span");
        createSpanElementForCD.id = "createSpanElementForCD";
        divForAddCD.appendChild(inputCDName);
        divForAddCD.appendChild(inputCDQuantity);
        divForAddCD.appendChild(inputCDLoanDuration);
        adminAddContentDiv.appendChild(divForAddCD);
        adminAddContentDiv.appendChild(createSpanElementForCD);
        adminAddContentDiv.appendChild(createSpanElementForCDCreated);
    }
    if(itemTypeToAdd == "Book") {
        if(getElementById("divForAddBook")!==null) {
            getElementById("adminAddContentDiv").removeChild(getElementById("divForAddBook"));
        }
        if(getElementById("divForAddCD")!==null) {
            getElementById("adminAddContentDiv").removeChild(getElementById("divForAddCD"));
        }
        let divForAddBook = createElement("div");
        divForAddBook.id = "divForAddBook";
        let inputBookName = createElement("input");
        let inputBookQuantity = createElement("input");
        inputBookQuantity.id = "inputBookQuantity";
        let inputBookLoanDuration = createElement("input");
        inputBookLoanDuration.id = "inputBookLoanDuration";
        inputBookName.type = "text";
        inputBookQuantity.type = "number";
        inputBookLoanDuration.type = "number";
        inputBookName.id = "inputBookName";
        inputBookName.placeholder = "Enter name of the Book to add";
        inputBookQuantity.placeholder = `Enter ${itemTypeToAdd} quantity in numbers to add`;
        inputBookLoanDuration.placeholder = `Enter ${itemTypeToAdd} loan duration`;
        inputBookName.addEventListener("keyup",submitAdminAddEvent);
        inputBookQuantity.addEventListener("keyup",submitAdminAddEvent);
        inputBookLoanDuration.addEventListener("keyup",submitAdminAddEvent);
        let createSpanElementForBook = createElement("span");
        let createSpanElementForBookCreated = createElement("span");
        createSpanElementForBookCreated.id = "createSpanElementForBookCreated";
        // let createSpanElementForBook = createElement("span");
        createSpanElementForBook.id = "createSpanElementForBook";
        divForAddBook.appendChild(inputBookName);
        divForAddBook.appendChild(inputBookQuantity);
        divForAddBook.appendChild(inputBookLoanDuration);
        adminAddContentDiv.appendChild(divForAddBook);
        adminAddContentDiv.appendChild(createSpanElementForBook);
        adminAddContentDiv.appendChild(createSpanElementForBookCreated);
    }
}
function submitAdminAddEvent(event) {
    event.preventDefault();
    let itemType = "Book";
    if (event.keyCode === 13) {
        if (event.path[0].id.match("CD")) {
            let cdName = getElementById("inputCDName");
            let inputCDLoanDuration = getElementById("inputCDLoanDuration");
            let inputCDQuantity = getElementById("inputCDQuantity");

            if(cdName.value.length !== 0) {
                itemType = "CD";    
                handleCreateItemRequest(cdName,itemType,inputCDLoanDuration,inputCDQuantity); 
                // cds.push(cdName.value);
                // let myModal = getElementById("myModal")
                // myModal.style.display = "none";
                // getElementById("adminPageMainDiv").removeChild(myModal);
                getElementById("createSpanElementForCDCreated").innerHTML = `CD created successfully.`;
            }
            else {
                getElementById("createSpanElementForCD").innerHTML = "";
                getElementById("createSpanElementForCD").innerHTML = "Please enter valid cd name";
                
                // alert("Please enter valid cd name");
            }
            
        }
        else if(event.path[0].id.match("Book")) {
            if(inputBookName.value.length !== 0 ){
                let bookName = getElementById("inputBookName");
                let inputBookLoanDuration = getElementById("inputBookLoanDuration");
                let inputBookQuantity = getElementById("inputBookQuantity");

                // books.push(bookName.value);
                // let myModal = getElementById("myModal")
                // myModal.style.display = "none";
                // getElementById("adminPageMainDiv").removeChild(myModal);
                handleCreateItemRequest(bookName,itemType,inputBookLoanDuration,inputBookQuantity);
                
                // getElementById("createSpanElementForBookCreated").innerHTML = `Book  created successfully`;
            }
            else {
               //  getElementById("createSpanElementForBook").innerHTML = "Please enter valid book name";
            }
           
        }
        
    }
   
    
}
function handleCreateItemRequest(itemName,itemType,itemLoanDuration,itemQuantity) {
    console.log('Request reached to server');
    let saved_book_result;

    var request = new Request(`http://localhost:3000/item/${itemName.value}`, {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                    method: 'PUT',
                    
                    body:JSON.stringify({
                            "itemName": itemName.value,
                            "itemType": itemType,
                            "loanPeriod":itemLoanDuration.value,
                            "quantity":itemQuantity.value
                    })    
                    });
                    fetch(request)
                    .then(response => {
                        if(response.ok){
                            response.json().then(json=>{
                                console.log(`json data is ${json}`);
                                getElementById("createSpanElementForBook").innerHTML = "" ;
                                getElementById("createSpanElementForBook").innerHTML = `${json.item.itemName} saved successfully` ;
                            });
                        }
                        else if(response.status == 500){
                            console.log('got status as 500');
                            response.json().then(json=>{
                                getElementById("createSpanElementForBook").innerHTML = "";
                                getElementById("createSpanElementForBook").innerHTML = `${json.error.details[0].message}`;
                            });
                        }
                    })
                    .catch(err => {
                        getElementById("createSpanElementForBook").innerHTML = ``;
                    });   
}
function handleAdminRemoveExistingItemFromList(){
    if(timer !== null) {
        clearInterval(timer);
    }
    let divsToDisable = [];

    removePreviousClickDivsFirst();
    divsToDisable.push(getElementById("paraDivElement"));
    turnDivOnOff(divsToDisable,true);
    showToAdmin = true;

    let [selectItemTypeLabel, labelForSelectItemToUpdate] =  getGenericShowItemTypeLabel();
   
    labelForSelectItemToUpdate.addEventListener('change',handleAdminDeleteAnItem);
    let divForAdminRemoveItem = createElement("div");
    divForAdminRemoveItem.id = "divForAdminRemoveItem";
    divForAdminRemoveItem.appendChild(selectItemTypeLabel);
    divForAdminRemoveItem.appendChild(labelForSelectItemToUpdate);
    getElementById("mainDiv").appendChild(divForAdminRemoveItem);
    
    
}

function handleAdminDeleteAnItem() {
    event.preventDefault();
    let itemTypeToGet = event.target.value;
    flagToConsider = "Delete_Item";
    getItemType(itemTypeToGet,flagToConsider);
}
function showAdminModifyItemQuanityPage(event) {
    event.preventDefault();
    if(timer !== null) {
        clearInterval(timer);
    }
    let divsToDisable = [];
    removePreviousClickDivsFirst();
    divsToDisable.push(getElementById("paraDivElement"));
    turnDivOnOff(divsToDisable,true);
    
    let divForAdminUpdateQuantityOfItem = createElement("div");
    divForAdminUpdateQuantityOfItem.id = "divForAdminUpdateQuantityOfItem";
    let library_items_list_id = getElementById("library_items_list_id");
    for(i=0;i<mainDiv.childElementCount;i++) {
        if(library_items_list_id !== null && mainDiv.children[i].id == library_items_list_id.id){
            mainDiv.removeChild(library_items_list_id);
        }
    }
    let [selectItemTypeLabel, labelForSelectItemToUpdate] =  getGenericShowItemTypeLabel();
    // let selectItemTypeLabel = createElement("label");
    // selectItemTypeLabel.id = "selectItemTypeLabel";
    // selectItemTypeLabel.innerHTML = "Select an item type to update";

    // let labelForSelectItemToUpdate = createElement("select");
    // labelForSelectItemToUpdate.id = "labelForSelectItemToUpdate";
    // labelForSelectItemToUpdate.innerHTML = "Select an item Type to update quantity";
    labelForSelectItemToUpdate.addEventListener('change',handleAdminModifyItemQuanityPage);
    // let defaultOption = createElement("option");
    // defaultOption.id = "defaultOption";
    // defaultOption.value = "default";
    // defaultOption.innerHTML = "select"
    // let itemTypeBookOption = createElement("option");
    // itemTypeBookOption.innerHTML=  "Book";
    // itemTypeBookOption.id = "itemTypeBookOption";
    // itemTypeBookOption.value = "Book";
    // let itemTypeCDOption = createElement("option");
    // itemTypeCDOption.id = "itemTypeCDOption";
    // itemTypeCDOption.value = "CD";
    // itemTypeCDOption.innerHTML = "CD";
    // labelForSelectItemToUpdate.add(defaultOption);
    // labelForSelectItemToUpdate.add(itemTypeBookOption);
    // labelForSelectItemToUpdate.add(itemTypeCDOption);
    divForAdminUpdateQuantityOfItem.appendChild(selectItemTypeLabel);
    divForAdminUpdateQuantityOfItem.appendChild(labelForSelectItemToUpdate);
    mainDiv.appendChild(divForAdminUpdateQuantityOfItem);

}
function getGenericShowItemTypeLabel() {
    let labelForSelectItemToUpdate = createElement("select");
    labelForSelectItemToUpdate.id = "labelForSelectItemToUpdate";
    // labelForSelectItemToUpdate.innerHTML = "Select an item Type to update quantity";
    let selectItemTypeLabel = createElement("label");
    selectItemTypeLabel.id = "selectItemTypeLabel";
    selectItemTypeLabel.innerHTML = "Select an item type to update";

    let defaultOption = createElement("option");
    defaultOption.id = "defaultOption";
    defaultOption.value = "default";
    defaultOption.innerHTML = "select"
    let itemTypeBookOption = createElement("option");
    itemTypeBookOption.innerHTML=  "Book";
    itemTypeBookOption.id = "itemTypeBookOption";
    itemTypeBookOption.value = "Book";
    let itemTypeCDOption = createElement("option");
    itemTypeCDOption.id = "itemTypeCDOption";
    itemTypeCDOption.value = "CD";
    itemTypeCDOption.innerHTML = "CD";
    labelForSelectItemToUpdate.add(defaultOption);
    labelForSelectItemToUpdate.add(itemTypeBookOption);
    labelForSelectItemToUpdate.add(itemTypeCDOption);
    return [selectItemTypeLabel,labelForSelectItemToUpdate];
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
function retrieveAllItems(event) {
    
    
    
    var request = new Request(`http://localhost:3000/items`, {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                    method: 'GET',
                    });
                    fetch(request)
                    .then(response => {
                        try {
                            if(response.ok){
                                response.json().then(data=>{
                                    showAllItems(data.result);
                                });
                            }
                        }
                        catch(error) {
                            console.log("");
                        }
                    })
                    .catch(err => {
                    // return response.json(err);
                    });   
}

function removePreviousClickDivsFirst() {
    let mainDiv = getElementById("mainDiv");

    if(getElementById("adminAddContentDiv")!== null) {
        mainDiv.removeChild(getElementById("adminAddContentDiv"));
    }
    if(getElementById("divToViewAllItems")!== null) {
        mainDiv.removeChild(getElementById("divToViewAllItems"));
    }
    if(getElementById("divForAdminUpdateLoanPeriodOfItem")!==null){
        mainDiv.removeChild(getElementById("divForAdminUpdateLoanPeriodOfItem"));
    }
    if(getElementById("divForAdminUpdateQuantityOfItem")!==null){
        mainDiv.removeChild(getElementById("divForAdminUpdateQuantityOfItem"));
    }
    if(getElementById("divForAdminRemoveItem")!==null) {
        mainDiv.removeChild(getElementById("divForAdminRemoveItem"));    
    }

}

function showAllItems(data) {
    removePreviousClickDivsFirst();
    let divToViewAllItems = createElement("div");
    divToViewAllItems.id = "divToViewAllItems";
    let divsToDisable = [];
    if(getElementById("paraDivElement")!== null) {
        divsToDisable.push(getElementById("paraDivElement"));
        turnDivOnOff(divsToDisable,true);
    }
    let itemNameHeadingDiv = createElement("div");
    itemNameHeadingDiv.id = "itemNameHeadingDiv";
    itemNameHeadingDiv.className = "box";
    let itemNameHeadingLabel = createElement("label");
    itemNameHeadingLabel.innerHTML = "Item Name";
    itemNameHeadingDiv.appendChild(itemNameHeadingLabel);
    
    let itemTypeHeadingDiv = createElement("div");
    itemTypeHeadingDiv.id = "itemTypeHeadingDiv" ;
    itemTypeHeadingDiv.className = "box";
    let itemTypeHeadingLabel = createElement("label");
    itemTypeHeadingLabel.innerHTML = "Item Type";
    itemTypeHeadingDiv.appendChild(itemTypeHeadingLabel)
    
    let itemQtyHeadingDiv = createElement("div");
    itemQtyHeadingDiv.id = "itemQtyHeadingDiv";
    itemQtyHeadingDiv.className = "box";
    let itemQtyHeadingLabel = createElement("label");
    itemQtyHeadingLabel.innerHTML = "Item Quantity";
    itemQtyHeadingDiv.appendChild(itemQtyHeadingLabel);

    let itemLoanPeriodHeadingDiv = createElement("div");
    itemLoanPeriodHeadingDiv.id = "itemLoanPeriodHeadingDiv";
    itemLoanPeriodHeadingDiv.className = "box";
    let itemLoanPeriodHeadingLabel = createElement("label");
    itemLoanPeriodHeadingLabel.innerHTML = "Item Loan Period";
    itemLoanPeriodHeadingDiv.appendChild(itemLoanPeriodHeadingLabel);

    let itemDateCreatedHeadingDiv = createElement("div");
    itemDateCreatedHeadingDiv.id = "itemDateCreatedHeadingDiv";
    itemDateCreatedHeadingDiv.className = "box";
    let itemDateCreatedHeadingLabel = createElement("label");
    itemDateCreatedHeadingLabel.innerHTML = "Creation Date";
    itemDateCreatedHeadingDiv.appendChild(itemDateCreatedHeadingLabel);

    divToViewAllItems.appendChild(itemNameHeadingDiv);
    divToViewAllItems.appendChild(itemTypeHeadingDiv);
    divToViewAllItems.appendChild(itemQtyHeadingDiv);
    divToViewAllItems.appendChild(itemLoanPeriodHeadingDiv);
    divToViewAllItems.appendChild(itemDateCreatedHeadingDiv);

    data.map(item=>{
        let itemNameDiv = createElement("div");
        itemNameDiv.className = "box";
        let itemNameLabel = createElement("label");
        itemNameLabel.innerHTML = item.itemName;
        itemNameDiv.appendChild(itemNameLabel);
        
        let itemTypeDiv = createElement("div");
        itemTypeDiv.className = "box";
        let itemTypeLabel = createElement("label");
        itemTypeLabel.innerHTML = item.itemType;
        itemTypeDiv.appendChild(itemTypeLabel)
        
        let itemQtyDiv = createElement("div");
        itemQtyDiv.className = "box";
        let itemQtyLabel = createElement("label");
        itemQtyLabel.innerHTML = item.quantity;
        itemQtyDiv.appendChild(itemQtyLabel);

        let itemLoanPeriodDiv = createElement("div");
        itemLoanPeriodDiv.className = "box";
        let itemLoanPeriodLabel = createElement("label");
        itemLoanPeriodLabel.innerHTML = item.loanPeriod;
        itemLoanPeriodDiv.appendChild(itemLoanPeriodLabel);

        let itemDateCreatedDiv = createElement("div");
        itemDateCreatedDiv.className = "box";
        let itemDateCreatedLabel = createElement("label");
        itemDateCreatedLabel.innerHTML = item.created_date;
        itemDateCreatedDiv.appendChild(itemDateCreatedLabel);

        divToViewAllItems.appendChild(itemNameDiv);
        divToViewAllItems.appendChild(itemTypeDiv);
        divToViewAllItems.appendChild(itemQtyDiv);
        divToViewAllItems.appendChild(itemLoanPeriodDiv);
        divToViewAllItems.appendChild(itemDateCreatedDiv);
    });
    getElementById("mainDiv").appendChild(divToViewAllItems);
}
function handleAdminLogOut(event) {
    event.preventDefault();
    removePreviousClickDivsFirst();
    getElementById("mainDiv").removeChild(getElementById("adminPageMainDiv"));
    //getElementById("user_registeration").removeAttribute("style");
    getElementById("form").removeAttribute("style");
    getElementById("mainDiv").removeAttribute("style");
    if(timer!== null) {
        clearInterval(timer);
    }
    // if(event.target.text === "Log Out") {
    //     let mainDiv = getElementById("mainDiv");
    //     let library_items_list = getElementById("library_items_list_id")
    //     if(library_items_list!==null) {
            
    //         mainDiv.removeChild(library_items_list);
    //     }
    //     if(getElementById("labelForSelectItemToUpdate")!==null){
    //         mainDiv.removeChild(getElementById("labelForSelectItemToUpdate"));
    //     }
    //     mainDiv.removeAttribute("style");
    //     let adminPageMainDiv = getElementById("adminPageMainDiv");
    //     let form = getElementById("form");
    //     mainDiv.removeChild(adminPageMainDiv);
    //     form.removeAttribute("style");
    //     form.style.textAlign = "center";
        let divtoResetMainForm = getElementById("user_registeration");
        divtoResetMainForm.reset();

    
}
function openSideBarNavigation() {
    document.getElementById("menuDiv").style.width = "250px";
    document.getElementById("mainDiv").style.marginLeft = "250px";
  }
  
  function closeSideBarNavigation() {
    document.getElementById("menuDiv").style.width = "0";
    document.getElementById("mainDiv").style.marginLeft= "0";
  }
function createAdminRightsDescription() {
    let adminPageMainDiv = getElementById("adminPageMainDiv");
    let spanToOpenSideBar = createElement("span");
    spanToOpenSideBar.id = "spanToOpenSideBar";
    spanToOpenSideBar.innerHTML = "&#9776;";
    spanToOpenSideBar.addEventListener("click",openSideBarNavigation);
    adminPageMainDiv.appendChild(spanToOpenSideBar);
}
function showLandingPage() {
    showToAdmin = false;
    disableMainFormDivs();
    // showTranslatorElement();
    addLogOutPageForRegularUsers();
    // showDueDateForBooksAndCDS();
    createAndDisplayShoppingCart();
    handleBooksAndCDsDisplay();
    
}
