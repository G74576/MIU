// Kevin O'Toole
// MIU 1304
// Project 3

$('#homepage').on('pageinit', function(){
	//code needed for home page goes here
	function id(x){
		var elementId = document.getElementById(x);
		return elementId;
	}
	
	var search = id("searchbtn");
	search.addEventListener("click", getSearch);
	
	function getSearch(){
		var term = id("searchTerm").value;
		
		if(term != ""){
		var myUlTag = document.createElement("ul");
		var myDiv = id("searchContent");
		myDiv.appendChild(myUlTag);	
			for(var i=0, len=localStorage.length; i<len; i++){ 			
				//var myLi = document.createElement("li");
				//myUlTag.appendChild(myLi);
				var key = localStorage.key(i); 							
				var value = localStorage.getItem(key); 					
				var item = JSON.parse(value); 						    
				//var myNewUl = document.createElement("ul");
				//myLi.appendChild(myNewUl);
				//getImage(item.group[1], myUlTag);
				for(n in item){
					if(term === item[n][1]){
						for(q in item){
							var myNewLi = document.createElement("li");
							myNewLi.setAttribute("id", "searchLI");
							myUlTag.appendChild(myNewLi);
							var optNewSubText = item[q][0] + " " + item[q][1]; 
							myNewLi.innerHTML = optNewSubText;				
		//					console.log(item[q][0]+": "+item[q][1]);
						}
					}
				}
			}
		}
	}
	getSearch();
});	
		
$('#addItem').on('pageinit', function(){

	/*	var myForm = $('#addForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var key = myForm.serializeArray();
			storeData(key);
		}
	});*/
	
	//any other code needed for addItem page goes here
	function id(x){
		var elementId = document.getElementById(x);
		return elementId;
	}

	//Get radio values
	function getSelectedRadio(){
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i < relatedRadios.length; i++){
			if(relatedRadios[i].checked){
				relatedValue = relatedRadios[i].value;
			}
		}
	}	
	
	//Get checkbox values
	function getCheckboxValues(){
		whenCookedValue = [];
		var checkboxes = document.forms[0].when;
		for(var i=0; i < checkboxes.lenght; i++){
			if(checkboxes[i].checked){
				whenCookedValue.push(checkboxes[i].value);
			}
		}
	}
	
	var storeData = function(key){
		if(!key){
			var uniqueId = Math.floor(Math.random()*1000001);
		}else{
			uniqueId = key;
		}
		getSelectedRadio();
		getCheckboxValues();
		var item				={};
			item.fname			= ["First Name:", id("fname").value];
			item.lname			= ["Last Name:", id("lname").value];
			item.todaysDate		= ["Date Added:", id("todaysDate").value];
			item.family			= ["Related:", relatedValue];
			item.email			= ["Email:", id("email").value];
			item.recName		= ["Recipe Name:", id("recName").value];
			item.group			= ["Type of Recipe:", id("type").value];
			item.range			= ["Difficulty Level:", id("range").value];
			item.whenCooked		= ["When You Cook This:", whenCookedValue];
			item.specify		= ["Other Time:", id("specify").value];
			item.time			= ["Cooking Time:", id("time").value];
			item.temperature	= ["Cooking Temperature:", id("temperature").value];
			item.ingredients	= ["Recipe Ingredients:", id("ingredients").value];
			item.directions		= ["Cooking Directions:", id("directions").value];
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert("Recipe Has Been Saved!");
	}
	
	function refreshWindow(){
		window.location.reload();
	}
	
	var getData = function(){
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage so default recipes were added.");
			autofillData();
		}
		//var myDiv = id("dispRecCont");
		//var makeNewList = document.createElement("ul");
		//myDiv.appendChild(makeNewList);
		var myUl = id("dispRecCont");
		id("dispRecCont").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeNewLi = document.createElement("li");
			var dataLinksLi = document.createElement("li");
			myUl.appendChild(makeNewLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var newObj = JSON.parse(value);
			var makeNewSubList = document.createElement("ul");
			makeNewSubList.setAttribute("id", "newSubList");
			makeNewLi.appendChild(makeNewSubList);
			getImage(newObj.group[1], makeNewSubList);
			for(var n in newObj){
				var makeNewSubLi = document.createElement("li");
				makeNewSubList.appendChild(makeNewSubLi);
				var optNewSubText = newObj[n][0] + " " + newObj[n][1];
				makeNewSubLi.innerHTML = optNewSubText;
				makeNewSubList.appendChild(dataLinksLi);
			}
			makeDisplayItemLinks(localStorage.key(i), dataLinksLi);
		}
	}
	
	function getImage(imageName, makeNewSubList){
		var imageLi = document.createElement("li");
		imageLi.setAttribute("id", "icons");
		makeNewSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSource = newImage.setAttribute("src", "images/"+ imageName +".png");
		imageLi.appendChild(newImage);
	}
	
	var autofillData = function (){
	 	for(var n in json){
	 		var id = Math.floor(Math.random()*1000001);
	 		localStorage.setItem(id, JSON.stringify(json[n]));
	 	}
	}
	
	function makeDisplayItemLinks(key, dataLinksLi){
		var editDataLink = document.createElement("a");
		editDataLink.setAttribute("id", "editLink");
		editDataLink.href = "#addItem";
		editDataLink.key = key;
		var editDataLinkText = "Edit Recipe Information";
		editDataLink.addEventListener("click", editRecipe);
		editDataLink.innerHTML = editDataLinkText;
		dataLinksLi.appendChild(editDataLink);
		
		var lineBreakTag = document.createElement("br");
		dataLinksLi.appendChild(lineBreakTag);
		
		var deleteDataLink = document.createElement("a");
		deleteDataLink.setAttribute("id", "deleteLink");
		deleteDataLink.href = "#dispRec";
		deleteDataLink.key = key;
		var deleteDataLinkText = "Delete Recipe";
		deleteDataLink.addEventListener("click", deleteItem);
		deleteDataLink.innerHTML = deleteDataLinkText;
		dataLinksLi.appendChild(deleteDataLink);
	}
	
	function editRecipe(){
		var getRecipeValue = localStorage.getItem(this.key);
		var item = JSON.parse(getRecipeValue);
		
		id("fname").value = item.fname[1];
		id("lname").value = item.lname[1];
		id("todaysDate").value = item.todaysDate[1];
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i<relatedRadios.length; i++){
			if(relatedRadios[i].value == "Yes" && item.family[1] == "Yes"){
				relatedRadios[i].setAttribute("checked", "checked");
			}else if(relatedRadios[i].value == "No" && item.family[1] == "No"){
				relatedRadios[i].setAttribute("checked", "checked");
			}
		}
		id("email").value = item.email[1];
		id("recName").value = item.recName[1];
		id("type").value = item.group[1];
		id("range").value = item.range[1];
		var cooked = item.whenCooked[1];
		for(var i=0; i<cooked.length; i++){
			if(cooked[i] == "Valentines"){
				id("valentines").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Easter"){
				id("easter").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Halloween"){
				id("halloween").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Thanksgiving"){
				id("thanksgiving").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Christmas"){
				id("christmas").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Birthdays"){
				id("birthdays").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Other"){
				id("other").setAttribute("checked", "checked")
			}
		}
		id("specify").value = item.specify[1];
		id("time").value = item.time[1];
		id("temperature").value = item.temperature[1];
		id("ingredients").value = item.ingredients[1];
		id("directions").value = item.directions[1];
		
		saveNewRecipe.removeEventListener("click", storeData);
		id("saveRecipe").value = "Edit Recipe Information";
		var editRecipeInfo = id("saveRecipe");
		editRecipeInfo.addEventListener("click", validate);
		editRecipeInfo.key = this.key;
	}
	
	var	deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this recipe?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("The recipe was deleted!");
			window.location.reload();
		}else{
			alert("The recipe was not deleted!");
		}
	}
	
	var clearLocal = function(){
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage.");
		}else{
			localStorage.clear();
			alert("Your recipes have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	
		function validate(e){
		//Define the elements we want to check
		var getFname = id("fname");
		var getLname = id("lname");
		var getEmail = id("email");
		var getRec 	 = id("recName");
		//var getGroup = id("type");
		var getIng	 = id("ingredients");
		var getDir	 = id("directions");
		
		// Reset Error Messages
		errMsg.innerHTML = "";
		getFname.removeAttribute("style", "border");
		getLname.removeAttribute("style", "border");
		getEmail.removeAttribute("style", "border");
		getRec.removeAttribute("style", "border");
		//getGroup.removeAttribute("style", "border");
		getIng.removeAttribute("style", "border");
		getDir.removeAttribute("style", "border");


		// Get error messages
		var errorMessages = [];
		//First Name validation
		if(getFname.value === ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			errorMessages.push(fNameError);
		}
		
		//Last Name Validation
		if(getLname.value === ""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			errorMessages.push(lNameError);
		}
		
		//Email Validation
		var emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(emailRe.exec(getEmail.value))){
			var eMailError = "Please enter your Email."
			getEmail.style.border = "1px solid red";
			errorMessages.push(eMailError);
		}
		
		//Recipe Name Validation
		if(getRec.value === ""){
			var recNameError = "Please enter a recipe name";
			getRec.style.border = "1px solid red";
			errorMessages.push(recNameError);
		}
		
		//group validation
		/*if(getGroup.value === " --Choose A Type Of Recipe-- "){
			var groupError = "Please select a type of recipe.";
			getGroup.style.border = "1px solid red";
			errorMessages.push(groupError);
		}*/
		
		if(getIng.value === ""){
			var ingredError = "Please enter your ingredients.";
			getIng.style.border = "1px solid red";
			errorMessages.push(ingredError);
		}
			
		if(getDir.value === ""){
			var dirError = "Please enter cooking directions.";
			getDir.style.border = "1px solid red";
			errorMessages.push(dirError);
		}
		
		//If there were errors, display them on the screen.
		if(errorMessages.length >= 1){
			for(var i=0, j=errorMessages.length; i < j; i++){
				var errorText = document.createElement("li");
				errorText.innerHTML = errorMessages[i];
				errMsg.appendChild(errorText);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is ok. save our data. Send the key value which came from the edit data function.
			//Remember this key value was passed through the edit submit eventListener as a property.
			storeData(this.key);
		}
	}
	
	//var relatedValue;
	//var whenCookedValue = "No specific time when you would cook this.";
	var errMsg = id("errors");
	
	var displayRecipes = id("display")
	displayRecipes.addEventListener("click", getData);
	var clearRecipes = id("clear");
	clearRecipes.addEventListener("click", clearLocal);
	var saveNewRecipe = id("saveRecipe");
	saveNewRecipe.addEventListener("click", validate);
	//saveNewRecipe.addEventListener("click", refreshWindow);
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.





 


					
