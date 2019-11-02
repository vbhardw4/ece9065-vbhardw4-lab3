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
    if(timer !==null) {
        clearInterval(timer);
    }
    
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
                // getElementById("createSpanElementForCDCreated").innerHTML = `CD created successfully.`;
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
function handleAdminModifyItemQuanityPage(event) {
    event.preventDefault();
    let itemTypeToGet = event.target.value;
    flagToConsider = "Modify_Qty";
    getItemType(itemTypeToGet,flagToConsider);
    
    //call to DB to get everything based on Item Type
}
function getItemType(itemType,flagToConsider){
    console.log(`Getting ${itemType} from DB`);
   
   
    var request = new Request(`http://localhost:3000/item/itemType/${itemType}`, {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                    method: 'GET'
                    });
                    console.log(request);
                    fetch(request)
                    .then(response => {
                        if(response.ok){
                            response.json().then(data=>{
                                let allFetchedItems = data.item;
                                console.log(allFetchedItems);
                                if(flagToConsider === "Modify_Qty") {
                                    adminShowHandleQtyElementToChange(allFetchedItems);
                                }
                                else if(flagToConsider === "Modify_Loan_Period") {
                                    adminShowHandleLoanPeriodElementToChange(allFetchedItems);
                                }
                                else if(flagToConsider === "Delete_Item") {
                                    adminShowHandleDeleteItemElementToDelete(allFetchedItems);
                                }
                                else if(flagToConsider === "Fetch_Item_By_Name") {
                                    adminShowRetrieveItemElementToViewByName(allFetchedItems);
                                }
                
                                
                           })
                        }
                    })
                    .catch(err => {
                    // return response.json(err);
                    });   
}
function adminShowRetrieveItemElementToViewByName(allFetchedItems) {
    if(getElementById("labelForItemsFetchedByItemType")!==null && getElementById("divForFetchItemAttributesByName")) {
        getElementById("divForFetchItemAttributesByName").removeChild(getElementById("labelForItemsFetchedByItemType"));
       
    }
    if(getElementById("selectItemLabel")!== null && getElementById("labelForSelectItemToUpdate")!== null) {
        getElementById("divForFetchItemAttributesByName").removeChild(getElementById("selectItemLabel"));
    }

    // if(getElementById("divForFetchItemAttributesByName")!==null) {
    //     getElementById("divForFetchItemAttributesByName").removeChild(getElementById("divForFetchItemAttributesByName"));
    // }

    let [selectItemLabel,labelForItemsFetchedByItemType] = fetchItemsBasedOnItemTypeSelected(allFetchedItems);
    labelForItemsFetchedByItemType.addEventListener('change',handleAdminShowItemAttributesByName);
    divForFetchItemAttributesByName.appendChild(selectItemLabel);
    divForFetchItemAttributesByName.appendChild(labelForItemsFetchedByItemType);

}
function handleAdminShowItemAttributesByName() {
    event.preventDefault();
    console.log(event);
    let selectedItem = event.target.value;
    if(getElementById("divToShowAllItemAttributes")!==null) {
        getElementById("divForFetchItemAttributesByName").removeChild(getElementById("divToShowAllItemAttributes"));
    }
    let divToShowAllItemAttributes = createElement("div");
    let divForFetchItemAttributesByName = getElementById("divForFetchItemAttributesByName");

    divToShowAllItemAttributes.id = "divToShowAllItemAttributes";
    let nameOfItemLabel = createElement("label");
    nameOfItemLabel.id = "nameOfItemLabel";
    nameOfItemLabel.innerHTML = `Selected Item`; 
    

    let inputTextToShowItemName = createElement("input");
    inputTextToShowItemName.id = "inputTextToShowItemName";
    inputTextToShowItemName.value = `${selectedItem}`;
    inputTextToShowItemName.innerHTML = `${selectedItem}`;
    inputTextToShowItemName.disabled = true;


    let prevLoanPeriodOfItemLabel = createElement("label");
    prevLoanPeriodOfItemLabel.id = "prevLoanPeriodOfItemLabel";
    prevLoanPeriodOfItemLabel.innerHTML = "Old Loan Period";
    
    let [itemName,itemType,itemQty,itemLoanPeriod] = getItemsAttributes(selectedItem);

    let typeOfItemLabel = createElement("label");
    typeOfItemLabel.id = "typeOfItemLabel";
    typeOfItemLabel.innerHTML = `Selected Item Type`; 
    
    let itemTypeElement = createElement("input");
    itemTypeElement.id = "itemTypeElement";
    itemTypeElement.value = itemType;
    itemTypeElement.disabled = true;

    
    let qtyOfItemLabel = createElement("label");
    qtyOfItemLabel.id = "qtyOfItemLabel";
    qtyOfItemLabel.innerHTML = "Quantity of Item";
    
    let qtyOfItemText = createElement("input");
    qtyOfItemText.id = "qtyOfItemText";
    qtyOfItemText.type = "number";
    qtyOfItemText.value = itemQty;

    let loanPeriodOfItemLabel = createElement("label");
    loanPeriodOfItemLabel.id = "loanPeriodOfItemLabel";
    loanPeriodOfItemLabel.innerHTML = "Loan Period of Item";
    
    let loanPeriodOfItemText = createElement("input");
    loanPeriodOfItemText.id = "loanPeriodOfItemText";
    loanPeriodOfItemText.type = "number";
    loanPeriodOfItemText.value = itemLoanPeriod;

    divToShowAllItemAttributes.appendChild(nameOfItemLabel);
    divToShowAllItemAttributes.appendChild(inputTextToShowItemName);

    divToShowAllItemAttributes.appendChild(typeOfItemLabel);
    divToShowAllItemAttributes.appendChild(itemTypeElement);
    
    divToShowAllItemAttributes.appendChild(qtyOfItemLabel);
    divToShowAllItemAttributes.appendChild(qtyOfItemText);
    
    divToShowAllItemAttributes.appendChild(loanPeriodOfItemLabel);
    divToShowAllItemAttributes.appendChild(loanPeriodOfItemText);

    divForFetchItemAttributesByName.appendChild(divToShowAllItemAttributes);

}
function adminShowHandleDeleteItemElementToDelete(allFetchedItems) {
    let divForAdminRemoveItem = getElementById("divForAdminRemoveItem");
    if(getElementById("divToShowItemNameToDelete")!== null) {
        divForAdminRemoveItem.removeChild(getElementById("divToShowItemNameToDelete"));
    }
    if(getElementById("selectItemLabel")!== null) {
        divForAdminRemoveItem.removeChild(getElementById("selectItemLabel"));
    }
    if(getElementById("labelForItemsFetchedByItemType")!== null) {
        divForAdminRemoveItem.removeChild(getElementById("labelForItemsFetchedByItemType"));
    }
    
    
    let [selectItemLabel,labelForItemsFetchedByItemType] = fetchItemsBasedOnItemTypeSelected(allFetchedItems);



    labelForItemsFetchedByItemType.addEventListener('change',handleAdminDeleteItem);
    divForAdminRemoveItem.appendChild(selectItemLabel);
    divForAdminRemoveItem.appendChild(labelForItemsFetchedByItemType);
}

function handleAdminDeleteItem(event) {
    event.preventDefault();
    let divForAdminRemoveItem = getElementById("divForAdminRemoveItem");
    if(getElementById("divToShowItemNameToDelete")!== null) {
        divForAdminRemoveItem.removeChild(getElementById("divToShowItemNameToDelete"));
    }
    // if(getElementById("selectItemLabel")!== null) {
    //     divForAdminRemoveItem.removeChild(getElementById("selectItemLabel"));
    // }
    // if(getElementById("labelForItemsFetchedByItemType")!== null) {
    //     divForAdminRemoveItem.removeChild(getElementById("labelForItemsFetchedByItemType"));
    // }
    let selectedItem = event.target.value;
    let inputTextToShowItemName = createElement("input");
    inputTextToShowItemName.id = "inputTextToShowItemName";
    inputTextToShowItemName.value = selectedItem;
    inputTextToShowItemName.innerHTML = selectedItem;
    inputTextToShowItemName.disabled = true;
    inputTextToShowItemName.hidden = true;

    let spanForDeleteItem = createElement("span");
    spanForDeleteItem.id = "spanForDeleteItem";

    let divToShowItemNameToDelete = createElement("div");
    divToShowItemNameToDelete.id = "divToShowItemNameToDelete";
    let submitButtonToDeleteItem = createElement("button");
    submitButtonToDeleteItem.id = "submitButtonToDeleteItem";
    submitButtonToDeleteItem.innerHTML = "Delete";
    
    submitButtonToDeleteItem.addEventListener('click',sendRequestToDelete);

    divToShowItemNameToDelete.appendChild(inputTextToShowItemName);
    divToShowItemNameToDelete.appendChild(submitButtonToDeleteItem);
    divToShowItemNameToDelete.appendChild(spanForDeleteItem);
    
    divForAdminRemoveItem.appendChild(divToShowItemNameToDelete);


}

function sendRequestToDelete(event) {
    event.preventDefault();
    let selectedItemToDelete = getElementById("inputTextToShowItemName").value;
    var request = new Request(`http://localhost:3000/item/${selectedItemToDelete}`, {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                    method: 'DELETE'
                    });
                    fetch(request)
                    .then(response => {
                        if(response.ok){
                            response.json().then(json=>{
                                console.log(`json data is ${json}`);
                                if(flagToConsider === "Modify_Qty") {
                                    getElementById("spanForUpdateQuantity").innerHTML = "Succesfully Updated Quantity of an Item";
                                }
                                else if(flagToConsider === "Modify_Loan_Period") {
                                    getElementById("spanForUpdateLoanPeriod").innerHTML = "Succesfully Updated Loan Period";
                                }
                                else if (flagToConsider === "Delete_Item") {
                                    getElementById("spanForDeleteItem").innerHTML = "Succesfully Deleted Item";
                                }
                                
                            });
                        }
                    })
                    .catch(err => {
                    // return response.json(err);
                    });  
 
}
function adminShowHandleQtyElementToChange(allFetchedItems) {
    let divForAdminUpdateQuantityOfItem = getElementById("divForAdminUpdateQuantityOfItem");
    if(getElementById("labelForItemsFetchedByItemType")!== null)
    {
        divForAdminUpdateQuantityOfItem.removeChild(getElementById(("labelForItemsFetchedByItemType")));
    }
    if(getElementById("selectItemLabel")!==null){
        getElementById("divForAdminUpdateQuantityOfItem").removeChild(getElementById("selectItemLabel"));
    }
    if(getElementById("divToShowItemNameAndQtyToUpdate")!== null){
        getElementById("divForAdminUpdateQuantityOfItem").removeChild((getElementById("divToShowItemNameAndQtyToUpdate")));
    }
    // let selectItemLabel = createElement("label");
    // selectItemLabel.id = "selectItemLabel";
    // selectItemLabel.innerHTML = "Select item";
    

    // let labelForItemsFetchedByItemType = createElement("select");
    // labelForItemsFetchedByItemType.id = "labelForItemsFetchedByItemType";
    // let option_default = createElement("option");
    // option_default.value = "Select";
    // option_default.innerHTML = "Select";
    // labelForItemsFetchedByItemType.add(option_default);
    // let counter = 0;
    // itemsInCache = allFetchedItems;
    // allFetchedItems.map(function(allFetchedItems) {
    //     console.log(allFetchedItems.itemName);
    //     let option = createElement("option");
    //     option.value = allFetchedItems.itemName;
    //     option.innerHTML = allFetchedItems.itemName;
    //     labelForItemsFetchedByItemType.add(option);
    //     counter = counter+1;
    //     });
    let [selectItemLabel,labelForItemsFetchedByItemType] = fetchItemsBasedOnItemTypeSelected(allFetchedItems);
    labelForItemsFetchedByItemType.addEventListener('change',handleAdminUpdateQty);
    divForAdminUpdateQuantityOfItem.appendChild(selectItemLabel);
    divForAdminUpdateQuantityOfItem.appendChild(labelForItemsFetchedByItemType);
    
}
function fetchItemsBasedOnItemTypeSelected(allFetchedItems) {
    let selectItemLabel = createElement("label");
    selectItemLabel.id = "selectItemLabel";
    selectItemLabel.innerHTML = "Select an item";
    

    let labelForItemsFetchedByItemType = createElement("select");
    labelForItemsFetchedByItemType.id = "labelForItemsFetchedByItemType";
    let option_default = createElement("option");
    option_default.value = "Select";
    option_default.innerHTML = "Select";
    labelForItemsFetchedByItemType.add(option_default);
    let counter = 0;
    itemsInCache = allFetchedItems;
    allFetchedItems.map(function(allFetchedItems) {
        console.log(allFetchedItems.itemName);
        let option = createElement("option");
        option.value = allFetchedItems.itemName;
        option.innerHTML = allFetchedItems.itemName;
        labelForItemsFetchedByItemType.add(option);
        counter = counter+1;
        });
    return [selectItemLabel,labelForItemsFetchedByItemType];
}
function adminShowHandleLoanPeriodElementToChange(allFetchedItems) {
    let divForAdminUpdateLoanPeriodOfItem = getElementById("divForAdminUpdateLoanPeriodOfItem");
    
    if(getElementById("labelForItemsFetchedByItemType")!==null && getElementById("divForAdminUpdateLoanPeriodOfItem")) {
        getElementById("divForAdminUpdateLoanPeriodOfItem").removeChild(getElementById("labelForItemsFetchedByItemType"));
       
    }
    if(getElementById("selectItemLabel")!== null && getElementById("labelForSelectItemToUpdate")!== null) {
        getElementById("divForAdminUpdateLoanPeriodOfItem").removeChild(getElementById("selectItemLabel"));
    }

    if(getElementById("divToShowItemNameAndLoanPeriodToUpdate")!==null) {
        getElementById("divForAdminUpdateLoanPeriodOfItem").removeChild(getElementById("divToShowItemNameAndLoanPeriodToUpdate"));
    }

    // let selectItemLabel = createElement("label");
    // selectItemLabel.id = "selectItemLabel";
    // selectItemLabel.innerHTML = "Select an item";
    // let labelForItemsFetchedByItemType = createElement("select");
    // labelForItemsFetchedByItemType.id = "labelForItemsFetchedByItemType";

    // let option_default = createElement("option");
    // option_default.value = "Select";
    // option_default.innerHTML = "Select";
    // labelForItemsFetchedByItemType.add(option_default);

    // let counter = 0;
    // itemsInCache = allFetchedItems;
    // allFetchedItems.map(function(allFetchedItems) {
    //     console.log(allFetchedItems.itemName);
    //     let option = createElement("option");
    //     option.value = allFetchedItems.itemName;
    //     option.innerHTML = allFetchedItems.itemName;
    //     labelForItemsFetchedByItemType.add(option);
    //     counter = counter+1;
    //     });
    let [selectItemLabel,labelForItemsFetchedByItemType] = fetchItemsBasedOnItemTypeSelected(allFetchedItems);
    labelForItemsFetchedByItemType.addEventListener('change',handleAdminUpdateLoanPeriod);
    divForAdminUpdateLoanPeriodOfItem.appendChild(selectItemLabel);
    divForAdminUpdateLoanPeriodOfItem.appendChild(labelForItemsFetchedByItemType);

}
function handleAdminUpdateQty(event) {
    event.preventDefault();
    console.log(event);
    let selectedItem = event.target.value;
    if(getElementById("divToShowItemNameAndQtyToUpdate")!==null) {
        getElementById("divForAdminUpdateQuantityOfItem").removeChild(getElementById("divToShowItemNameAndQtyToUpdate"));
    }
    let divToShowItemNameAndQtyToUpdate = createElement("div");
    let divForAdminUpdateQuantityOfItem = getElementById("divForAdminUpdateQuantityOfItem");

    divToShowItemNameAndQtyToUpdate.id = "divToShowItemNameAndQtyToUpdate";
    let nameOfItemLabel = createElement("label");
    nameOfItemLabel.id = "nameOfItemLabel";
    nameOfItemLabel.innerHTML = `Selected Item`; 
    

    let inputTextToShowItemName = createElement("input");
    inputTextToShowItemName.id = "inputTextToShowItemName";
    inputTextToShowItemName.value = `${selectedItem}`;
    inputTextToShowItemName.innerHTML = `${selectedItem}`;
    inputTextToShowItemName.disabled = true;


    let prevQtyOfItemLabel = createElement("label");
    prevQtyOfItemLabel.id = "prevQtyOfItemLabel";
    prevQtyOfItemLabel.innerHTML = "Old Quantity";
    let [itemName,itemType,ItemQty,ItemLoanPeriod] = getItemsAttributes(selectedItem);

    let inputTextToShowPrevQty = createElement("input");
    inputTextToShowPrevQty.id = "inputTextToShowPrevQty";
    inputTextToShowPrevQty.value = ItemQty;
    inputTextToShowPrevQty.disabled = true;

    let newQtyOfItemLabel = createElement("label");
    newQtyOfItemLabel.id = "newQtyOfItemLabel";
    newQtyOfItemLabel.innerHTML = "New Quantity";
    
    let inputTextToEnterNewQty = createElement("input");
    inputTextToEnterNewQty.id = "inputTextToEnterNewQty";
    inputTextToEnterNewQty.type = "number";

    let spanForUpdateQuantity = createElement("span");
    spanForUpdateQuantity.id = "spanForUpdateQuantity";

    let submitButtonToUpdateNewQty = createElement("button");
    submitButtonToUpdateNewQty.id = "submitButtonToUpdateNewQty";
    submitButtonToUpdateNewQty.innerHTML = "Submit";
    
    submitButtonToUpdateNewQty.addEventListener('click',sendRequestToUpdate);


    divToShowItemNameAndQtyToUpdate.appendChild(nameOfItemLabel);
    divToShowItemNameAndQtyToUpdate.appendChild(inputTextToShowItemName);

    divToShowItemNameAndQtyToUpdate.appendChild(prevQtyOfItemLabel);
    divToShowItemNameAndQtyToUpdate.appendChild(inputTextToShowPrevQty);
    
    divToShowItemNameAndQtyToUpdate.appendChild(newQtyOfItemLabel);
    divToShowItemNameAndQtyToUpdate.appendChild(inputTextToEnterNewQty);
    
    divToShowItemNameAndQtyToUpdate.appendChild(submitButtonToUpdateNewQty);
    divToShowItemNameAndQtyToUpdate.appendChild(spanForUpdateQuantity);
    divForAdminUpdateQuantityOfItem.appendChild(divToShowItemNameAndQtyToUpdate);
    
}
function handleAdminUpdateLoanPeriod() {
    event.preventDefault();
    console.log(event);
    let selectedItem = event.target.value;
    if(getElementById("divToShowItemNameAndLoanPeriodToUpdate")!==null) {
        getElementById("divForAdminUpdateLoanPeriodOfItem").removeChild(getElementById("divToShowItemNameAndLoanPeriodToUpdate"));
    }
    let divToShowItemNameAndLoanPeriodToUpdate = createElement("div");
    let divForAdminUpdateLoanPeriodOfItem = getElementById("divForAdminUpdateLoanPeriodOfItem");

    divToShowItemNameAndLoanPeriodToUpdate.id = "divToShowItemNameAndLoanPeriodToUpdate";
    let nameOfItemLabel = createElement("label");
    nameOfItemLabel.id = "nameOfItemLabel";
    nameOfItemLabel.innerHTML = `Selected Item`; 
    

    let inputTextToShowItemName = createElement("input");
    inputTextToShowItemName.id = "inputTextToShowItemName";
    inputTextToShowItemName.value = `${selectedItem}`;
    inputTextToShowItemName.innerHTML = `${selectedItem}`;
    inputTextToShowItemName.disabled = true;


    let prevLoanPeriodOfItemLabel = createElement("label");
    prevLoanPeriodOfItemLabel.id = "prevLoanPeriodOfItemLabel";
    prevLoanPeriodOfItemLabel.innerHTML = "Old Loan Period";
    
    let [itemName,itemType,ItemQty,ItemLoanPeriod] = getItemsAttributes(selectedItem);


    let inputTextToShowPrevLoanPeriod = createElement("input");
    inputTextToShowPrevLoanPeriod.id = "inputTextToShowPrevLoanPeriod";
    inputTextToShowPrevLoanPeriod.value = ItemLoanPeriod;
    inputTextToShowPrevLoanPeriod.disabled = true;

    let newLoanPeriodOfItemLabel = createElement("label");
    newLoanPeriodOfItemLabel.id = "newLoanPeriodOfItemLabel";
    newLoanPeriodOfItemLabel.innerHTML = "New Loan Period";
    
    let inputTextToEnterNewLoanPeriod = createElement("input");
    inputTextToEnterNewLoanPeriod.id = "inputTextToEnterNewLoanPeriod";
    inputTextToEnterNewLoanPeriod.type = "number";

    let spanForUpdateLoanPeriod = createElement("span");
    spanForUpdateLoanPeriod.id = "spanForUpdateLoanPeriod";

    let submitButtonToUpdateNewLoanPeriod = createElement("button");
    submitButtonToUpdateNewLoanPeriod.id = "submitButtonToUpdateNewLoanPeriod";
    submitButtonToUpdateNewLoanPeriod.innerHTML = "Submit";
    submitButtonToUpdateNewLoanPeriod.addEventListener('click',sendRequestToUpdate);

    divToShowItemNameAndLoanPeriodToUpdate.appendChild(nameOfItemLabel);
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(inputTextToShowItemName);

    divToShowItemNameAndLoanPeriodToUpdate.appendChild(prevLoanPeriodOfItemLabel);
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(inputTextToShowPrevLoanPeriod);
    
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(newLoanPeriodOfItemLabel);
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(inputTextToEnterNewLoanPeriod);
    
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(submitButtonToUpdateNewLoanPeriod);
    divToShowItemNameAndLoanPeriodToUpdate.appendChild(spanForUpdateLoanPeriod);

    divForAdminUpdateLoanPeriodOfItem.appendChild(divToShowItemNameAndLoanPeriodToUpdate);

}

function getItemsAttributes(itemToGet) {

    itemsInCache.map(item=>{
        if(item.itemName == itemToGet) {
            itemName = item.itemName;
            itemType = item.itemType;
            itemQuantity = item.quantity;
            itemLoanDuration = item.loanPeriod;
        }
    });
    return  [itemName,itemType,itemQuantity,itemLoanDuration];
}

function sendRequestToUpdate(event) {
    event.preventDefault();
    let itemType = null;
    let itemName = null;
    let itemQuantity = null;
    let itemLoanDuration = null;
    let inputTextToEnterNewQty = null;
    let inputTextToEnterNewLoanPeriod = null;

    //Find an element in the array first
    let itemToUpdate = getElementById("inputTextToShowItemName").value;
    if(flagToConsider=== "Modify_Loan_Period") {
        inputTextToEnterNewLoanPeriod = getElementById("inputTextToEnterNewLoanPeriod").value;

        itemsInCache.map(item=>{
            if(item.itemName == itemToUpdate) {
                itemName = item.itemName;
                itemType = item.itemType;
                itemQuantity = item.quantity;
                itemLoanDuration = inputTextToEnterNewLoanPeriod;
            }
        });
    }
    else if(flagToConsider === "Modify_Qty") {
        inputTextToEnterNewQty = getElementById("inputTextToEnterNewQty").value;
        itemsInCache.map(item=>{
            if(item.itemName == `${itemToUpdate}`) {
                itemName = item.itemName;
                itemType = item.itemType;
                itemQuantity = inputTextToEnterNewQty;
                itemLoanDuration = item.loanPeriod;
            }
        });
    }
    

    
    console.log(event.target.value);
    if(flagToConsider === "Modify_Qty" && itemQuantity !==null) {
        var request = new Request(`http://localhost:3000/item/${itemToUpdate}`, {
                    headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                    method: 'POST',
                    
                    body:JSON.stringify({
                            "itemName": itemToUpdate,
                            "itemType": itemType,
                            "loanPeriod":itemLoanDuration,
                            "quantity":itemQuantity
                    })    
                    });
                    fetch(request)
                    .then(response => {
                        if(response.ok){
                            response.json().then(json=>{
                                console.log(`json data is ${json}`);
                                if(flagToConsider === "Modify_Qty") {
                                    getElementById("spanForUpdateQuantity").innerHTML = "Succesfully Updated";
                                }
                                else if(flagToConsider === "Modify_Loan_Period") {
                                    getElementById("spanForUpdateLoanPeriod").innerHTML = "Succesfully Updated";
                                }
                                
                            });
                        }
                        else if(response.status == 500) {
                            if(flagToConsider === "Modify_Qty") {
                                getElementById("spanForUpdateQuantity").innerHTML = `${response.error.details[0].message}`;
                            }
                            else if(flagToConsider === "Modify_Loan_Period") {
                                getElementById("spanForUpdateLoanPeriod").innerHTML = `${response.error.details[0].message}`;
                            }
                        }
                    })
                    .catch(err => {
                    
                    });  
    }
    else if(flagToConsider === "Modify_Loan_Period" && itemLoanDuration !==null) {
        var request = new Request(`http://localhost:3000/item/${itemToUpdate}`, {
            headers: new Headers({
                'Content-Type': 'application/json'
                }),
            method: 'POST',
            
            body:JSON.stringify({
                    "itemName": itemToUpdate,
                    "itemType": itemType,
                    "loanPeriod":itemLoanDuration,
                    "quantity":itemQuantity
            })    
            });
            fetch(request)
            .then(response => {
                if(response.ok){
                    response.json().then(json=>{
                        console.log(`json data is ${json}`);
                        if(flagToConsider === "Modify_Qty") {
                            getElementById("spanForUpdateQuantity").innerHTML = "Succesfully Updated";
                        }
                        else if(flagToConsider === "Modify_Loan_Period") {
                            getElementById("spanForUpdateLoanPeriod").innerHTML = "Succesfully Updated";
                        }
                        
                    });
                }
                else if(response.status==500) {
                    console.log('got status as 500');
                    if(flagToConsider === "Modify_Qty") {
                        response.json().then(json=>{
                            getElementById("spanForUpdateQuantity").innerHTML = "";
                            getElementById("spanForUpdateQuantity").innerHTML = `${json.error.details[0].message}`;
                            });
                    }
                    else if(flagToConsider === "Modify_Loan_Period") {
                        response.json().then(json=>{
                            getElementById("spanForUpdateLoanPeriod").innerHTML = "";
                            getElementById("spanForUpdateLoanPeriod").innerHTML = `${json.error.details[0].message}`;
                            });
                        
                    }
                    
                    
                }
                
            })
            .catch(err => {
            
            });  
    }
    else {
        if(flagToConsider === "Modify_Qty") {
            getElementById("spanForUpdateQuantity").innerHTML = "";
            getElementById("spanForUpdateQuantity").innerHTML = "Please enter a valid Qty number";
        }
        else if(flagToConsider === "Modify_Loan_Period") {
            getElementById("spanForUpdateLoanPeriod").innerHTML = "";
            getElementById("spanForUpdateLoanPeriod").innerHTML = "Please enter valid Loan Period";
        }
    }
    
}
function showAdminModifyLoanPeriodPage(event) {
    if(timer !== null) {
        clearInterval(timer);
    }
    event.preventDefault();
    removePreviousClickDivsFirst();
    let divsToDisable = [];
    divsToDisable.push(getElementById("paraDivElement"));
    turnDivOnOff(divsToDisable,true);
    
    let divForAdminUpdateLoanPeriodOfItem = createElement("div");
    divForAdminUpdateLoanPeriodOfItem.id = "divForAdminUpdateLoanPeriodOfItem";
    let library_items_list_id = getElementById("library_items_list_id");
    for(i=0;i<mainDiv.childElementCount;i++) {
        if(library_items_list_id !== null && mainDiv.children[i].id == library_items_list_id.id){
            mainDiv.removeChild(library_items_list_id);
        }
    }
    
    // let labelForSelectItemToUpdate = createElement("select");
    // labelForSelectItemToUpdate.id = "labelForSelectItemToUpdate";
    let [selectItemTypeLabel, labelForSelectItemToUpdate] =  getGenericShowItemTypeLabel();
    labelForSelectItemToUpdate.addEventListener('change',handleAdminModifyLoanPeriodPage);

    // let selectItemTypeLabel = createElement("label");
    // selectItemTypeLabel.id = "selectItemTypeLabel";
    // selectItemTypeLabel.innerHTML = "Select an item type to update";

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
    divForAdminUpdateLoanPeriodOfItem.appendChild(selectItemTypeLabel);
    divForAdminUpdateLoanPeriodOfItem.appendChild(labelForSelectItemToUpdate);
    mainDiv.appendChild(divForAdminUpdateLoanPeriodOfItem);

}
function handleAdminModifyLoanPeriodPage() {
    event.preventDefault();
    let itemTypeToGet = event.target.value;
    flagToConsider = "Modify_Loan_Period";
    getItemType(itemTypeToGet,flagToConsider);

}
function hanldeAdminSubmitModifiedDueDates(event) {
    
    let cdDueDateInput = getElementById("newCdDueDateInput");
    let bookDueDateInput =  getElementById("newbookDueDateInput");
    if(cdDueDateInput.value!==null && bookDueDateInput.value !==null) {
        bookDueDate = cdDueDateInput.value +" days";
        cdDueDate = bookDueDateInput.value+ " days";
    }
    let myModal = getElementById("myModal");
    myModal.style.display = "none";
    getElementById("adminPageMainDiv").removeChild(myModal);
}
function prepareTheModel(modalHeader,adminAddContentDiv,modalFooter) {
    let adminPageMainDiv = getElementById("adminPageMainDiv");
    if(getElementById("myModal")==null) {
        let myModal = createElement("div");
        myModal.className = "modal";
        myModal.id = "myModal";
        myModal.style.display = "block";
        
        adminPageMainDiv.appendChild(myModal);
        getModalHeader(modalHeader);
        getModalBody(adminAddContentDiv);
        getModalFooter(modalFooter);
    }
    else{
        myModal.style.display = "block";
    }

    
}
function getModalHeader(modalHeading1) {
    let myModal = getElementById("myModal");
    let modalContent = createElement("div");
    modalContent.id = "modalContent";
    modalContent.className = "modal-content";
    let modalHeader = createElement("div");
    modalHeader.id = "modalHeader";
    modalHeader.className = "modal-header";
    let modalSpan = createElement("span");
    modalSpan.className = "close";
    modalSpan.id = "modalSpan";
    modalSpan.innerHTML = "&times;";
    modalSpan.addEventListener("click",closeTheModal);
    let modalHeading = createElement("h2");
    modalHeading.innerHTML = modalHeading1;
    modalHeader.appendChild(modalSpan);
    modalHeader.appendChild(modalHeading);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalSpan);
    myModal.appendChild(modalContent);

}
function closeTheModal() {
    let myModal = getElementById("myModal")
    myModal.style.display = "none";
    getElementById("adminPageMainDiv").removeChild(myModal);
}
window.onclick = function(event) {
    event.preventDefault();
    if (event.target == this.getElementById("myModal")) {
        let myModal = getElementById("myModal")
        myModal.style.display = "none";
      getElementById("adminPageMainDiv").removeChild(myModal);
    }
  }
function getModalBody(adminAddContentDiv) {
    let modalContent = getElementById("modalContent");
    let modalBody = createElement("div");
    modalBody.className = "modal-body";
    modalBody.id = "modalBody";
    modalBody.appendChild(adminAddContentDiv);
    modalContent.appendChild(modalBody);
}
function getModalFooter(modalFooter1) {
    let modalFooter = createElement("div");
    let modalContent = getElementById("modalContent");
    let footerHeading = createElement("h3");
    footerHeading.innerHTML = modalFooter1;
    modalFooter.className = "modal-footer";
    modalFooter.appendChild(footerHeading);
    modalContent.appendChild(modalFooter);
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

    linkToshowItemByName = createElement("a");
    linkToshowItemByName.id = "linkToshowAllItems";
    linkToshowItemByName.innerHTML = "View Item Attributes by Name";
    linkToshowItemByName.addEventListener("click",retrieveItemByName);

    
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
    menuDiv.appendChild(linkToshowItemByName);
    menuDiv.appendChild(linkToLogOut);
    menuDiv.appendChild(linkToCloseSideBarNav);
    adminPageMainDiv.appendChild(menuDiv);
}

function retrieveItemByName(event) {
    event.preventDefault();
    if(undefined !== timer) {
        clearInterval(timer);
    }
    removePreviousClickDivsFirst();
    let divsToDisable = [];
    divsToDisable.push(getElementById("paraDivElement"));
    turnDivOnOff(divsToDisable,true);
    showToAdmin = true;

    let [selectItemTypeLabel, labelForSelectItemToUpdate] =  getGenericShowItemTypeLabel();
   
    labelForSelectItemToUpdate.addEventListener('change',handleAdminFetchItemByNamePage);
    let divForFetchItemAttributesByName = createElement("div");
    divForFetchItemAttributesByName.id = "divForFetchItemAttributesByName";
    divForFetchItemAttributesByName.appendChild(selectItemTypeLabel);
    divForFetchItemAttributesByName.appendChild(labelForSelectItemToUpdate);
    getElementById("mainDiv").appendChild(divForFetchItemAttributesByName);      
}
function handleAdminFetchItemByNamePage(event) {
    console.log(event);
    let itemTypeToGet = event.target.value;
    flagToConsider = "Fetch_Item_By_Name";
    getItemType(itemTypeToGet,flagToConsider);

}
function retrieveAllItems(event) {
    // if(event.target.innerText === "View All Items") {
    //     pollingFlag = false;
    // }
    if(undefined !== event) {
        event.preventDefault();
        timer = setInterval(retrieveAllItems,2000);
    }
    
    
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
function addLogOutPageForRegularUsers() {
    let mainDiv = getElementById("mainDiv");
    
    let logOutForRegularUsersDiv =  createElement("div");
    logOutForRegularUsersDiv.id = "logOutForRegularUsersDiv";
    let logOutLink = createElement("a");
    logOutLink.addEventListener("click",handleLogOutForRegularUsers);
    logOutLink.innerHTML = "Sign Out";
    logOutForRegularUsersDiv.appendChild(logOutLink);
    mainDiv.appendChild(logOutForRegularUsersDiv);
}
function handleLogOutForRegularUsers(event) {
    event.preventDefault();
    if(event.target.text === "Sign Out") {
    // let divsToDisable = [];
    // let divsToEnable = [];
    // let divsToRemove = [];

    // let mainDiv = getElementById("mainDiv");
    // for(i=0;i<mainDiv.children.length;i++) {
    //     if(mainDiv.children[i].id == "form") {
    //         divsToEnable.push(mainDiv.children[i]);
    //     }
    //     else if(mainDiv.children[i].id == "library_items_list_id") {
        
    //     divsToDisable.push(mainDiv.children[i]);
    //     }
    //     else if(mainDiv.children[i].id !== ""){
    //         divsToRemove.push(mainDiv.children[i].id);
    //     }
    // if(getElementById("divToViewAllItems")!==null) {
    //     mainDiv.removeChild(getElementById("divToViewAllItems"));    
    // }
    
    // }
    // for(j=0;j<divsToRemove.length;j++) {
    //     let remove = getElementById(divsToRemove[j]);
    //     mainDiv.removeChild(remove);
    // }
    // document.body.removeChild(getElementById("translate_element"));
    // turnDivOnOff(divsToEnable,false);
    // turnDivOnOff(divsToDisable,true);
    // getElementById("user_registeration").reset();
    // }
    
        removePreviousClickDivsFirstForRegularUsers();
        
        //getElementById("user_registeration").removeAttribute("style");
        getElementById("form").removeAttribute("style");
        getElementById("mainDiv").removeAttribute("style");
        let divtoResetMainForm = getElementById("user_registeration");
        clearInterval(timer);
        divtoResetMainForm.reset(); 
    }
}
function removePreviousClickDivsFirstForRegularUsers() {
    let mainDiv = getElementById("mainDiv");
    if(getElementById("headerDiv") !== null) {
        mainDiv.removeChild(getElementById("headerDiv"));
    }
    if(getElementById("logOutForRegularUsersDiv") !== null) {
        mainDiv.removeChild(getElementById("logOutForRegularUsersDiv"));
    }
    if(getElementById("shoppingCart") !== null) {
        mainDiv.removeChild(getElementById("shoppingCart"));
    }
    if(getElementById("divToViewAllItems") !== null) {
        mainDiv.removeChild(getElementById("divToViewAllItems"));
    }
    
    
}
function showTranslatorElement() {
    
    translatorDiv = createElement("div");
    translatorDiv.id = "translate_element";
    selectLanguageHeader = createElement("h3")
    selectLanguageHeader.id = "selectLanguageHeader";
    selectLanguageTextNode = createTextNode("Switch to another language");
    selectLanguageHeader.appendChild(selectLanguageTextNode);
    
    dropDownToSelectLanguage = createElement("select");
    dropDownToSelectLanguage.id = "dropDownToSelectLanguage";
    
    let languageOption3 = createElement("option");
    let languageOption1 = createElement("option");
    let languageOption2 = createElement("option");
    languageOption3.innerHTML = "English";
    languageOption1.innerHTML = "Espaneol";
    languageOption2.innerHTML = "French";
    
    languageOption1.value = "Espaneol";
    languageOption2.value = "French";
    languageOption3.value = "English";
    dropDownToSelectLanguage.appendChild(languageOption3);
    dropDownToSelectLanguage.appendChild(languageOption1);
    dropDownToSelectLanguage.appendChild(languageOption2);
    dropDownToSelectLanguage.addEventListener("change",handleLanguageSwitch);
    translatorDiv.appendChild(dropDownToSelectLanguage);
    translatorDiv.appendChild(selectLanguageHeader);
    document.body.appendChild(translatorDiv);
}

function showDueDateForBooksAndCDS() {
    let headerDiv = document.getElementById("headerDiv");
    if(getElementById("headerforBooksAndCDsDueDate") == null) {
        let headerforBooksAndCDsDueDate = document.createElement("h3");
        headerforBooksAndCDsDueDate.id = "headerforBooksAndCDsDueDate";
        headerforBooksAndCDsDueDate.appendChild(document.createTextNode("Books are due in "+bookDueDate+" and CDS are due in "+cdDueDate));
        headerDiv.appendChild(headerforBooksAndCDsDueDate);
    }
    

}
function createWelcomePageHeading(displayable_name) {
    
    
    let main_div = document.getElementById("mainDiv");
    let headerDiv = document.createElement("div");
    headerDiv.id = "headerDiv"
    let header = document.createElement("h3");
    let name = document.createTextNode(displayable_name);
    header.appendChild(name);
    headerDiv.appendChild(header);
    main_div.appendChild(headerDiv);
   
}

function calculateIfAdultOrChild() {
    if(new Date().getFullYear() - birth_year<=18) {
        return 'Child';
    } 
    return 'Adult';
}
function handleBooksAndCDsDisplay() {
    // if(getElementById("library_items_list_id")!==null) {
    //     getElementById("library_items_list_id").style = "block";
    // }else {
    //     showBookAndCDList(showToAdmin);
    // }
    timer = setInterval(retrieveAllItems,2000);
    
}

function showBookAndCDList(showToAdmin) {
    if(showToAdmin && getElementById("library_items_list_id")!== null) {
       getElementById("mainDiv").removeChild(getElementById("library_items_list_id")); 
    }
    let booksAndCDsDiv = document.createElement("div");
    booksAndCDsDiv.className = "library_items_list";
    booksAndCDsDiv.id = "library_items_list_id";
    document.getElementById("mainDiv").appendChild(booksAndCDsDiv);
    
    let flag = "book_flag";
    let imgSource="";
    let separateDivPerOneList = "";
    for(i=0;i<books.length;i++) {
        
        separateDivPerOneList = document.createElement("div");
        let nameofDiv = "book"+[i]+"element";
        separateDivPerOneList.id=nameofDiv;
        let bookNameDivElement = document.createElement("div");
        let bookButtonDivElement = document.createElement("div");
        let bookImageDivElement = document.createElement("div");
        if(i>11) {
            imgSource = "images/Books/"+"BookDefault.jpg";
        }
        else {
            imgSource = "images/Books/Book"+[i]+".jpg";
        }
        
        bookNameDivElement.id= "name_"+flag+"_"+i;
        bookNameDivElement.className = "box";
        
        bookButtonDivElement.id= "button_"+flag+"_"+i;
        bookButtonDivElement.className = "box";
        createImageElement(nameofDiv,bookImageDivElement,imgSource);
        bookImageDivElement.id= "image_"+flag+"_"+i;
        bookImageDivElement.className = "box";
        
        
        let book_list = document.createElement("LI");
        book_list.appendChild(document.createTextNode(books[i]));
        if(!showToAdmin) {
            displayAddButtonAgainstItem(i,flag,bookButtonDivElement,separateDivPerOneList);
        }
        else {
            displayRemoveButtonForAdminAgainstItem(i,flag,bookButtonDivElement,separateDivPerOneList);
        }
        
        bookNameDivElement.appendChild(book_list);
        booksAndCDsDiv.appendChild(separateDivPerOneList);
        separateDivPerOneList.appendChild(bookNameDivElement);
            
        separateDivPerOneList.appendChild(bookImageDivElement);
        separateDivPerOneList.appendChild(bookButtonDivElement);    
    }

    for(j=0;j<cds.length;j++) {
        
        let nameofCdDiv = "cd"+[j]+"element";
        let separateCdDivPerOneList = createElement("div");
        separateCdDivPerOneList.id = nameofCdDiv;

        let cdNameDivElement = document.createElement("div");
        let cdButtonDivElement = document.createElement("div");
        let cdImageDivElement = document.createElement("div");
        if(j>11) {
            imgSource = "images/CDS/"+"CDDefault.jpg";
        }
        else {
            imgSource = "images/CDS/CD"+[j]+".jpg";
        }
        
        flag = "cd_flag";
        cdNameDivElement.id= "name_"+flag+"_"+j;
        cdNameDivElement.className = "box";
        
        cdButtonDivElement.id= "button_"+flag+"_"+j;
        cdButtonDivElement.className = "box";
        createImageElement(nameofCdDiv,cdImageDivElement,imgSource);
        cdImageDivElement.id= "image_"+flag+"_"+j;
        cdImageDivElement.className = "box";
        
        let cd_list = document.createElement("LI");
        cd_list.appendChild(document.createTextNode(cds[j]));
        
        if(!showToAdmin) {
            displayAddButtonAgainstItem(j,flag,cdButtonDivElement,separateCdDivPerOneList);
        }
        else {
            displayRemoveButtonForAdminAgainstItem(j,flag,cdButtonDivElement,separateCdDivPerOneList);
        }
        
        cdNameDivElement.appendChild(cd_list);
        separateCdDivPerOneList.appendChild(cdNameDivElement);
        separateCdDivPerOneList.appendChild(cdImageDivElement);
        separateCdDivPerOneList.appendChild(cdButtonDivElement);   
        booksAndCDsDiv.appendChild(separateCdDivPerOneList);

    }
    
    
}

function displayAddButtonAgainstItem(itemId,flag,innerBooksAndCDsDiv){
    let createdButtonID = "button_"+flag+"_"+itemId;
    
    let addButton = document.createElement("button");
    addButton.setAttribute("value","Add");
    addButton.setAttribute("id",createdButtonID);
    addButton.innerHTML="Add";
    innerBooksAndCDsDiv.appendChild(addButton);

    
    addButton.addEventListener("click",handleAddItem);
}
function displayRemoveButtonForAdminAgainstItem(itemId,flag,innerBooksAndCDsDiv){
    
    let createdButtonID = "button_"+flag+"_"+itemId;
    let removeButton = document.createElement("button");
    removeButton.setAttribute("value","Remove");
    removeButton.setAttribute("id",createdButtonID);
    removeButton.innerHTML="Remove";
    innerBooksAndCDsDiv.appendChild(removeButton);

    
    removeButton.addEventListener("click",handleAdminRemoveItem);
}
function handleAdminRemoveItem(event) {
    
    let divToRemove = event.path[2];
    let parentDivElement = event.path[2].parentElement;
    parentDivElement.removeChild(divToRemove);
    if((divToRemove.id).startsWith("book")) {
        books = books.filter(item => item!==divToRemove.firstElementChild.innerText) 
    }
    else {
        cds = cds.filter(item => item!==divToRemove.firstElementChild.innerText) 
    }
}
function handleAddItem(e) {
    removeItemFromList(e);
}
function addItemToCart(e) {
    let shoppingCartDiv = document.getElementById("shoppingCart");
    shoppingCartDiv.appendChild(document.getElementById(e.path[2].id));
}
function removeItemFromList(e) {
    let divToRemove = document.getElementById(e.path[2].id);
    addedItemToTheCart.push(divToRemove);
    let parentDivElement = document.getElementById("library_items_list_id");
    parentDivElement.removeChild(divToRemove);
    
}
function createAndDisplayShoppingCart() {
    shopping_cart_div = document.createElement("div");
    shopping_cart_div.id = "shoppingCart";
    let shoppingCartImageDiv = document.createElement("div");
    shoppingCartImageDiv.id = "shoppingCartImage";
    

    let shoppingCartImage = document.createElement("img");
    shoppingCartImage.setAttribute("src", "images/Cart.png");
    shoppingCartImage.setAttribute("height", "65");
    shoppingCartImage.setAttribute("width", "65");
    shoppingCartImage.setAttribute("alt", "Shopping Cart");
    shoppingCartImage.addEventListener("click",handleCartClick);
    shopping_cart_div.appendChild(shoppingCartImage);
    shoppingCartImageDiv.appendChild(shoppingCartImage);
    shopping_cart_div.appendChild(shoppingCartImageDiv);
    document.getElementById("mainDiv").appendChild(shopping_cart_div);
}



function handleLanguageSwitch(event) {
    var selectedLanguage = event.target.value;
    let library_items_list = getElementById("library_items_list_id").childNodes;
    let lengthOfLibraryList = library_items_list.length;
    
    if(selectedLanguage === "French") {
        switchLanguage(library_items_list,"French");
    }
    else if(selectedLanguage === "Espaneol"){
        switchLanguage(library_items_list,"Espaneol");
    }
    else {
        switchLanguage(library_items_list,"English");
    }    
}
function switchLanguage(library_items_list,language) {
    let lengthOfLibraryList = library_items_list.length;
    let counter_books =0;
    let counter_cds = 0;

    if(language === "French"){    
        for(i=0;i<lengthOfLibraryList;i++) {
            if(library_items_list[i].firstChild.id.startsWith("name_book")) {
                library_items_list[counter_books].firstChild.innerText = books_french[counter_books];
                counter_books++;
            }
        }
        for(j=counter_books;j<lengthOfLibraryList;j++) {
            if(library_items_list[j].firstChild.id.startsWith("name_cd")) {
                library_items_list[j].firstChild.innerText = cds_french[counter_cds];        
                counter_cds++;
            }
        }
        i,j,counter_books,counter_cds = 0;
    }
        
    else if(language === "Espaneol") {
        for(i=0;i<lengthOfLibraryList;i++) {
            if(library_items_list[i].firstChild.id.startsWith("name_book")) {
                library_items_list[counter_books].firstChild.innerText = books_espaneol[counter_books];
                counter_books++;
            }
        }
        for(j=counter_books;j<lengthOfLibraryList;j++) {
            if(library_items_list[j].firstChild.id.startsWith("name_cd")) {
                library_items_list[j].firstChild.innerText = cds_spanish[counter_cds];        
                counter_cds++;
            }
        }
        i,j,counter_books,counter_cds = 0;
    }
    else if(language === "English") {
        for(i=0;i<lengthOfLibraryList;i++) {
            if(library_items_list[i].firstChild.id.startsWith("name_book")) {
                library_items_list[counter_books].firstChild.innerText = books[counter_books];
                counter_books++;
            }
        }
        for(j=counter_books;j<lengthOfLibraryList;j++) {
            if(library_items_list[j].firstChild.id.startsWith("name_cd")) {
                library_items_list[j].firstChild.innerText = cds[counter_cds];        
                counter_cds++;
            }
        }
        i,j,counter_books,counter_cds = 0;
    }
    
}

function googleTranslateElementInit() {
    alert();
    new google.translate.TranslateElement({pageLanguage: 'en',includedLanguages: 'zh-CN,cs,da,nl,en,et,fr'}, "google_translate_element");
  }
function createImageElement(nameofDiv,divToAppend,src) {
    let image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("height", "90");
    image.setAttribute("width", "90");
    if(nameofDiv.startsWith("book")) {
        image.setAttribute("alt", "Book");
    }
    else {
        image.setAttribute("alt", "CD");
    }
    
    divToAppend.appendChild(image);
}
function handleCartClick(e) {
    let mainDiv = document.getElementById("mainDiv");
    let divIdsToDisable = [];
    let divAlreadyPresent = false;
    for(i=0;i<mainDiv.children.length;i++) {
        if(mainDiv.children[i].id ==="shoppingCartPageMainDiv") {
            mainDiv.children[i].style.display="block";
            divAlreadyPresent = true;
        }
        else {
            divIdsToDisable.push(mainDiv.children[i]);
        }
        
    }
    divIdsToDisable.push(getElementById("translate_element"));
    let disabling_flag = true;
    turnDivOnOff(divIdsToDisable,disabling_flag);
    
    if(!divAlreadyPresent) {
        
        createCartLandingPage();
    }
    
}
function turnDivOnOff(divIdsToDisable,disabling_flag) {
    for(i = 0; i < divIdsToDisable.length; i++){
        if(disabling_flag == true) {
            divIdsToDisable[i].style.display = "none";
        }
        else {
            divIdsToDisable[i].style.display = "block";
        }
        
    }
}
function createCartLandingPage() {
    createShoppingCartMainPageHeader();
    createShoppingCartListToShowAddedElements();
    let show_checkout_button = true;
    for(let i=0;i<shoppingCartPageMainDiv.children.length;i++) {
        if(shoppingCartPageMainDiv.children[i].id == "noElementsInCartDiv") {
            show_checkout_button = false;
            break;
        }
    }
    if(show_checkout_button) {
        showCheckoutButton();
    }
    
}
function showCheckoutButton() {
    let checkoutButton = document.createElement("button");
    let cartCheckoutButtonDiv = createElement("div");
    cartCheckoutButtonDiv.id = "cartCheckoutButtonDiv";
    checkoutButton.id = "cartCheckoutButton";
    checkoutButton.innerHTML = "Proceed To Checkout";
    checkoutButton.addEventListener("click",handleCheckoutButtonClick);
    let shoppingCartPageMainDiv = getElementById("shoppingCartPageMainDiv");
    cartCheckoutButtonDiv.appendChild(checkoutButton);
    shoppingCartPageMainDiv.appendChild(cartCheckoutButtonDiv);
}
function createShoppingCartMainPageHeader() {
    let shoppingCartPageMainDiv = createElement("div");
    shoppingCartPageMainDiv.id = "shoppingCartPageMainDiv";
    let shoppingCartMainPageHeader = createElement("h1");
    let textNode = createTextNode("Your Orders");
    shoppingCartMainPageHeader.appendChild(textNode);
    shoppingCartPageMainDiv.appendChild(shoppingCartMainPageHeader);
    mainDiv.appendChild(shoppingCartPageMainDiv);
}
function handleEmptyCartPage() {
    let noElementsInCartDiv =createElement("div");
    noElementsInCartDiv.id = "noElementsInCartDiv";
    showEmptyCartPage(noElementsInCartDiv);
    showBackIconToReturnToPreviousScreen(noElementsInCartDiv);
    
}
function createShoppingCartListToShowAddedElements() {
    let shoppingCartPageMainDiv = getElementById("shoppingCartPageMainDiv");
    if(addedItemToTheCart.length===0) {
        handleEmptyCartPage();
    }
    else {
        for(i=0;i<addedItemToTheCart.length;i++) {
            let nameOfTheItem = extractBookNameFromAddedItemsList(addedItemToTheCart[i]);
            let typeofTheItem = extractItemTypeFromAddedItemsList(addedItemToTheCart[i]);
            let dueDate = 10;
            if(typeofTheItem === "book") {
                dueDate = 30;
            }
            
            let nameofTheItemDivTag = typeofTheItem+i+"element"; 
            let createdDivTagForElement = createElement("div");
            createdDivTagForElement.id = nameofTheItemDivTag;
            let cartList = createElement("li");
            let shoppingCartPageAddedElementsNameDiv = createElement("div");
            shoppingCartPageAddedElementsNameDiv.id = "shoppingCartPageAddedElementsNameDiv";
            shoppingCartPageAddedElementsNameDiv.className = "box";
            cartList.appendChild(createTextNode(nameOfTheItem));
            shoppingCartPageAddedElementsNameDiv.appendChild(cartList);

            createdDivTagForElement.appendChild(shoppingCartPageAddedElementsNameDiv);

            
            showDueDateForitemAgainstItInShoppingCart(createdDivTagForElement,dueDate);
            addRemoveButtonAgainstEachItemInShoppingCart(createdDivTagForElement);
            shoppingCartPageMainDiv.appendChild(createdDivTagForElement);
            
        }
    
    }
}
function extractItemTypeFromAddedItemsList(item) {
    if (item.id.startsWith("book")) {
        return "book";
    }
    return "cd";

}
function addRemoveButtonAgainstEachItemInShoppingCart(createdDivTagForElement) {
    let shoppingCartPageAddedElementsButtonDiv = createElement("div");
    shoppingCartPageAddedElementsButtonDiv.id = "shoppingCartPageAddedElementsButtonDiv";
    shoppingCartPageAddedElementsButtonDiv.className = "box";
    let removeButtonToRemoveItemFromCart = createElement("button");
    removeButtonToRemoveItemFromCart.id = "removeButtonToRemoveItemFromCart";
    removeButtonToRemoveItemFromCart.innerHTML = "Remove Item";
    removeButtonToRemoveItemFromCart.addEventListener("click",handleRemoveItemFromCart);
    createdDivTagForElement.appendChild(shoppingCartPageAddedElementsButtonDiv);
    shoppingCartPageAddedElementsButtonDiv.appendChild(removeButtonToRemoveItemFromCart);
}
function showDueDateForitemAgainstItInShoppingCart(createdDivTagForElement,dueDate) {
    let dueDateForEachItemShoppingCartDiv = createElement("div");
    dueDateForEachItemShoppingCartDiv.id = "dueDateForEachItemShoppingCartDiv";
    dueDateForEachItemShoppingCartDiv.className = "box";
    createdDivTagForElement.appendChild(dueDateForEachItemShoppingCartDiv);
    dueDateForEachItemShoppingCartDiv.appendChild(createTextNode("Due in "+dueDate+" Days"));

}
function handleRemoveItemFromCart(event) {
    removeItemFromShoppingCartList(event);
    
    addItemBackToTheLibraryMainList(event);
    removedItemsFromCart = [];
}
function removeItemFromShoppingCartList(event) {
    let shoppingCartPageMainDiv = getElementById("shoppingCartPageMainDiv");
    removedItemsFromCart.push(event.path[2]);
    shoppingCartPageMainDiv.removeChild(event.path[2]);
    if(!(shoppingCartPageMainDiv.childElementCount>2)) {
        handleEmptyCartPage();
        let divIdsToDisable = []
        divIdsToDisable.push(document.getElementById("cartCheckoutButton"));
        
        turnDivOnOff(divIdsToDisable,true);
    }
}
function addItemBackToTheLibraryMainList(event) {
    let divToAddBackToLibraryList = event.path[2];
    let nameOfTheElementToRemove = divToAddBackToLibraryList.childNodes[0].childNodes[0].innerText;
    let library_items_list_id = getElementById("library_items_list_id");
    for(i=0;i<addedItemToTheCart.length;i++) {
        if(addedItemToTheCart[i].childNodes[0].innerText === nameOfTheElementToRemove) {
            library_items_list_id.insertBefore(addedItemToTheCart[i],library_items_list_id.firstChild);
            addedItemToTheCart.splice(addedItemToTheCart.indexOf(addedItemToTheCart[i]),1);

        }
    }
    
}

function extractBookNameFromAddedItemsList(addedItemList) {
    
    let nameOfTheItem = addedItemList.firstElementChild.textContent;
    return nameOfTheItem;
}
function showBackIconToReturnToPreviousScreen(noElementsInCartDiv) {
    let linkToMainScreen =  createElement("a");
    linkToMainScreen.id = "linkToMainScreen";
    linkToMainScreen.href = "#";
    linkToMainScreen.innerHTML = "Click to Add Items";
    linkToMainScreen.addEventListener("click",showMainLibraryScreen);
    noElementsInCartDiv.appendChild(linkToMainScreen);
}
function createElement(elementName) {
    return document.createElement(elementName);
}
function getElementById(elementId) {
    return document.getElementById(elementId);
}
function createTextNode(textNode) {
    return document.createTextNode(textNode);
}
function showEmptyCartPage(noElementsInCartDiv) {
    noElementsInCartDiv.appendChild(createTextNode("Currently cart is empty. Please Add the items to the cart first"));
    getElementById("shoppingCartPageMainDiv").appendChild(noElementsInCartDiv);
}
function showMainLibraryScreen(event) {
    let divsToDisable = [];
    divsToDisable.push(event.path[1].parentElement);
    let divIdsToEnable = [];
    getElementById("mainDiv").removeChild(divsToDisable[0]);
    
    let mainDivElement = getElementById("mainDiv");
    
    for(i=0;i<mainDivElement.children.length;i++) {
        if(mainDiv.children[i].id == "form") {
            divsToDisable.push(mainDiv.children[i]);
        }
        else if(mainDivElement.children[i] !==divsToDisable) {
            divIdsToEnable.push(mainDivElement.children[i]);
        }
    }
    getElementById("translate_element").style = "block";

    turnDivOnOff(divIdsToEnable,false);
    turnDivOnOff(divsToDisable,true);
   
}
function handleCheckoutButtonClick(event) {
    var value = confirm("Do you wish to continue checking out "+addedItemToTheCart.length+" items");
    if(value==true) {
        let shoppingCartMainDiv = getElementById("shoppingCartPageMainDiv");
        shoppingCartMainDiv.innerHTML = "";        
        let itemBoughtSuccessfullyDiv = createElement("div");
        itemBoughtSuccessfullyDiv.appendChild(createElement("h1").appendChild(createTextNode("Items bought succesfully.")));
        
        let linkToMainScreen =  createElement("a");
        linkToMainScreen.id = "linkToMainScreen";
        linkToMainScreen.href = "#";
        linkToMainScreen.innerHTML = "Interseted in more items!!! Click here";
        
        linkToMainScreen.addEventListener("click",showMainLibraryScreen);
        itemBoughtSuccessfullyDiv.appendChild(linkToMainScreen);
        shoppingCartMainDiv.appendChild(itemBoughtSuccessfullyDiv);
    }
    else {
        addTheItemsBackToLibraryAvailableList(event);
    }
    addedItemToTheCart = [];
    removedItemsFromCart = [];
}
function addTheItemsBackToLibraryAvailableList(event) {
    let divsToDisable = [event.path[2]];
    let divIdsToEnable = [];
    let mainDivElement = getElementById("mainDiv");
    removedItemsFromCart = addedItemToTheCart.slice();
    for(i=0;i<addedItemToTheCart.length;i++) {
        library_items_list_id.insertBefore(addedItemToTheCart[i],library_items_list_id.firstChild);
        
        addedItemToTheCart[i] = null;
    }
    
    turnDivOnOff(divsToDisable,true);
    let shoppingCartPageMainDiv = getElementById("shoppingCartPageMainDiv");
    let noOfElementsToRemove = removedItemsFromCart.length;
    for(i=0;i<noOfElementsToRemove;i++) {
    
       shoppingCartPageMainDiv.remove(removedItemsFromCart[i]);
    }
    
    for(i=0;i<mainDivElement.children.length;i++) {
        if(mainDivElement.children[i] !==divsToDisable[0]) {
            divIdsToEnable.push(mainDivElement.children[i]);
        }
        if(mainDivElement.children[i].id == "form"){
            divsToDisable.push(mainDivElement.children[i]);
        }
    }
    turnDivOnOff(divIdsToEnable,false);    
    turnDivOnOff(divsToDisable,true);
}
