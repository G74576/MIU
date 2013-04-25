$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
	var search = document.getElementById("searchbtn");
	search.addEventListener("click", getSearch);
	
	function getSearch(){
		//var category = id("types").value;
		var term = document.getElementById("searchTerm").value;
		
		//search by category only
		/*if(category != " --Choose A Type Of Recipe-- "){
			for(var i=0, len=localStorage.length; i<len; i++){ 			// Creates loop of local storage
				var key = localStorage.key(i); 							// Sets the key value from local storage
				var value = localStorage.getItem(key); 					// Sets the value from the key from the local storage
				var item = JSON.parse(value); 						    //Convert the string from local storage value back to an object by using JSON.parse
				if(category === item.group[1]){
					for(n in item){
						console.log(item[n][0]+": "+item[n][1]);
					}
				}
			}
		}*/
		
		//search by term only
		if(term != ""){
		var myUlTag = document.createElement("ul");
		var myDiv = document.getElementById("searchContent");
		myDiv.appendChild(myUlTag);	
			for(var i=0, len=localStorage.length; i<len; i++){ 			// Creates loop of local storage
				//var myLi = document.createElement("li");
				//myUlTag.appendChild(myLi);
				var key = localStorage.key(i); 							// Sets the key value from local storage
				var value = localStorage.getItem(key); 					// Sets the value from the key from the local storage
				var item = JSON.parse(value); 						    //Convert the string from local storage value back to an object by using JSON.parse
				//var myNewUl = document.createElement("ul");
				//myLi.appendChild(myNewUl);
				//getImage(item.group[1], myUlTag);
				for(n in item){
					if(term === item[n][1]){
						for(q in item){
							var myNewLi = document.createElement("li");
							myNewLi.setAttribute("id", "searchLI");
							myUlTag.appendChild(myNewLi);
							var optNewSubText = item[q][0] + " " + item[q][1]; // 
							myNewLi.innerHTML = optNewSubText;				
							//console.log(item[q][0]+": "+item[q][1]);
						}
					}
				}
			}
		}
	}
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $("#addForm");
		var errorsLink = $("#errorsLink");
		    myForm.validate({
			invalidHandler: function(form, validator) {
				errorsLink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldname = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldname +'</li>';
				}
				$("#errors ul").html(html);
			},
			submitHandler: function() {
		var key = myForm.serializeArray();
			storeData(key);
		}
	})
	
	//any other code needed for addItem page goes here
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i < relatedRadios.length; i++){
			if(relatedRadios[i].checked){
				relatedValue = relatedRadios[i].value;
			}
		}
	}

	//Get checkbox values.
	function getCheckBoxValues(){
		whenCookedValue = [];
		var checkboxes = document.forms[0].when;
		for(var i=0; i < checkboxes.length; i++){
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
		getCheckBoxValues();
		var item				={};
			item.fname			= ["First Name:", document.getElementById("fname").value];
			item.lname			= ["Last Name:", document.getElementById("lname").value];
			item.todaysDate		= ["Date Added:", document.getElementById("todaysDate").value];
			item.family			= ["Related:", relatedValue];
			item.email			= ["Email:", document.getElementById("email").value];
			item.recname		= ["Recipe Name:", document.getElementById("recName").value];
			item.group			= ["Type of Recipe:", document.getElementById("type").value];
			item.range			= ["Difficulty Level:", document.getElementById("range").value];
			item.whenCooked		= ["When You Cook This:", whenCookedValue];
			item.specify		= ["Other Time:", document.getElementById("specify").value];
			item.time			= ["Cooking Time:", document.getElementById("time").value];
			item.temperature	= ["Cooking Temperature:", document.getElementById("temperature").value];
			item.ingredients	= ["Recipe Ingredients:", document.getElementById("ingredients").value];
			item.directions		= ["Cooking Directions:", document.getElementById("directions").value];
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
		var myDiv = document.getElementById("dispRecCont");
		var makeNewList = document.createElement("ul");
		myDiv.appendChild(makeNewList);
		document.getElementById("dispRecCont").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeNewLi = document.createElement("li");
			var dataLinksLi = document.createElement("li");
			makeNewList.appendChild(makeNewLi);
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
	
	//Set image to display recipes
	function getImage(imageName, makeNewSubList){
		var imageLi = document.createElement("li");
		imageLi.setAttribute("id", "icons");
		makeNewSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSource = newImage.setAttribute("src", "images/"+ imageName + ".png");
		imageLi.appendChild(newImage);
	}

	var autofillData = function (){
		 for(var n in json){
			var id = Math.floor(Math.random()*1000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		 }
	}
	
	//Make Item Links for edit and delete
	function makeDisplayItemLinks(key, dataLinksLi){
		// add edit single item link
		var editDataLink = document.createElement("a");
		editDataLink.setAttribute("id", "editLink");
		editDataLink.href = "#addItem";
		editDataLink.key = key;
		var editDataLinkText = "Edit Recipe Information";
		editDataLink.addEventListener("click", editRecipe);
		editDataLink.innerHTML = editDataLinkText;
		dataLinksLi.appendChild(editDataLink);
	
		// add line break
		var lineBreakTag = document.createElement("br");
		dataLinksLi.appendChild(lineBreakTag);
	
		// add delete single item link
		var deleteDataLink = document.createElement("a");
		deleteDataLink.setAttribute("id", "deleteLink");
		deleteDataLink.href = "#";
		deleteDataLink.key = key;
		var deleteDataLinkText = "Delete Recipe";
		deleteDataLink.addEventListener("click", deleteItem);
		deleteDataLink.innerHTML = deleteDataLinkText;
		dataLinksLi.appendChild(deleteDataLink);
	}
	
	function editRecipe(){
		//Grab the data from our item from local storage.
		var getRecipeValue = localStorage.getItem(this.key);
		var item = JSON.parse(getRecipeValue);
	
		// populates the form fields with current local storage values.
		document.getElementById("fname").value = item.fname[1];
		document.getElementById("lname").value = item.lname[1];
		document.getElementById("todaysDate").value = item.todaysDate[1];
		var relatedRadios = document.forms[0].relative;
		for(var i=0; i<relatedRadios.length; i++){
			if(relatedRadios[i].value == "Yes" && item.family[1] == "Yes"){
				relatedRadios[i].setAttribute("checked", "checked");
			}else if(relatedRadios[i].value == "No" && item.family[1] == "No"){
				relatedRadios[i].setAttribute("checked", "checked");
			}
		}
		document.getElementById("email").value = item.email[1];
		document.getElementById("recName").value = item.recname[1];
		document.getElementById("type").value = item.group[1];
		document.getElementById("range").value = item.range[1];
		var cooked = item.whenCooked[1];
		for(var i=0; i<cooked.length; i++){
			if(cooked[i] == "Valentines"){
				document.getElementById("valentines").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Easter"){
				document.getElementById("easter").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Halloween"){
				document.getElementById("halloween").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Thanksgiving"){
				document.getElementById("thanksgiving").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Christmas"){
				document.getElementById("christmas").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Birthdays"){
				document.getElementById("birthdays").setAttribute("checked", "checked")
			}
			if(cooked[i] == "Other"){
				document.getElementById("other").setAttribute("checked", "checked")
			}
		}
		document.getElementById("specify").value = item.specify[1];
		document.getElementById("time").value = item.time[1];
		document.getElementById("temperature").value = item.temperature[1];
		document.getElementById("ingredients").value = item.ingredients[1];
		document.getElementById("directions").value = item.directions[1];
	
		// Remove the initial listener from the input 'save contact' button.
		saveNewRecipe.removeEventListener("click", storeData);
		// Change submit button value to say edit recipe
		document.getElementById("saveRecipe").value = "Edit Recipe Information";
		var editRecipeInfo = document.getElementById("saveRecipe");
		//Save the key value established in this function as a property of the editRecipe event
		//so we can use that value when we save the data we edited.
		editRecipeInfo.addEventListener("click", validate);
		editRecipeInfo.key = this.key;
	}
	
	//Delete Item
	var	deleteItem = function (){
		var ask = confirm("Are you sure you want to delete this recipe?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("This recipe was deleted!");
			window.location.reload();
		}else{
			alert("The recipe was not deleted!");
		}
	}

	//Clear Local Storage					
	var clearLocal = function(){
		if(localStorage.length === 0){
			alert("There are no recipes in your local storage.");
		}else{
			localStorage.clear()
			alert("Your recipes have been deleted.")
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//Define the elements we want to check
		var getFname = document.getElementById("fname");
		var getLname = document.getElementById("lname");
		var getEmail = document.getElementById("email");
		var getGroup = document.getElementById("type");
		var getIng	 = document.getElementById("ingredients");
		var getDir	 = document.getElementById("directions");
		
		// Reset Error Messages
		errMsg.innerHTML = "";
		getFname.removeAttribute("style", "border");
		getLname.removeAttribute("style", "border");
		getEmail.removeAttribute("style", "border");
		getGroup.removeAttribute("style", "border");

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
		
		//group validation
		if(getGroup.value === " --Choose A Type Of Recipe-- "){
			var groupError = "Please select a type of recipe.";
			getGroup.style.border = "1px solid red";
			errorMessages.push(groupError);
		}
		
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

	var errMsg = document.getElementById("errMsgs");
	var displayRecipes = document.getElementById("display");
	displayRecipes.addEventListener("click", getData);
	var clearRecipes = document.getElementById("clear");
	clearRecipes.addEventListener("click", clearLocal);
	var saveNewRecipe = document.getElementById("saveRecipe");
	saveNewRecipe.addEventListener("click", validate);
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.