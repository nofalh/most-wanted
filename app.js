"use strict";

function app(people){

	let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
	
	// if(searchType == "y" || searchType == "yes") {
	// 	searchByFullName(people);
	// }
	// else if (searchType == "n" || searchType == "no") {
	// 	searchByFullName(people);
	// } else {
	// 	alert("Wrong! Please try again, following the instructions dummy. :)");
	// 	app(people);
	// }
	switch(searchType){
		case 'yes':
			searchByFullName(people);
			break;
		case 'no': 
			searchByTraits(people);
			break;
		default:
			alert("Wrong! Please try again, following the instructions dummy. :)");
			app(people);
		break;
	}
}

function searchByFullName(people) {
	let userSearchChoice = prompt("Please enter in first and last name");
	let userSearchSplit = makeArray(userSearchChoice);
	if (userSearchSplit.length > 2) {
		restart("Error, please put in first and last name only");
	} else {
		for(let i = 0; i < people.length; i++) {
			if(matchTrait(userSearchSplit[0], people[i].firstName) && matchTrait(userSearchSplit[1], people[i].lastName)) {
				mainMenu(i, people);
			}
		}
	}	
}

function displayTraits(person) {
	let message = ""; 
	for (var key in person) {
		if (person.hasOwnProperty(key)) {
		  //console.log(key + " -> " + person[key]);
		  message += key + ": " + person[key] + "\r\n";
		}
	}
	alert(message);
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function restart(displayThisError) {
	alert(displayThisError);
	app(people);
}

function makeArray(inputString) {
	inputString.trim();
	return inputString.split(" ");
}

function matchTrait(word, trait) {
	if(lowerCase(word).includes(lowerCase(trait))) {
		return true;
	}else{
		return false;
	}
}

function echo(toEcho) {
	console.log(toEcho);
}

function lowerCase(word) {
	return word.toLowerCase();
}

function searchByTraits(people) {
	let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
	let filteredPeople;

	switch(userSearchChoice) {
	case "height":
		filteredPeople = searchByHeight(people);
		break;
	case "weight":
		filteredPeople = searchByWeight(people);
		break;
	case "age":
		filteredpeople = searchByAge(people);
		break;
	case "eyecolor":
		filteredpeople = searchByEyeColor(people);
		break;
	case "occupation":
		filteredpeople = searchByOccupation(people);
		break;
	case "gender":
		filteredPeople = searchByGender(people);
		displayPeople (filteredPeople);
		break;

	default:
		alert("You entered an invalid search type! Please try again.");
		searchByTraits(people);
		break;
	}  

	let foundPerson = filteredPeople[0];

	mainMenu(foundPerson, people);

}

function searchByWeight(people) {
	let userInputWeight = prompt("How much does the person weigh?");

	let newArray = people.filter(function (el) {
		if(el.weight == userInputWeight) {
		return true;
		}
	});

	return newArray;
}
function searchByHeight(people) {
	let userInputHeight = prompt("what is the persons height?");

	let newArray = people.filter(function (el) {
		if(el.height == userInputHeight) {
			return true;
		}
	});

	return newArray;
}
function searchByGender(people){
	let userInputGender = prompt("what is the persons gender?");

	let newArray = people.filter(function (el){
		if(el.gender == userInputGender){
			return el.gender;
		}
	});
	return newArray;
}

function buildDescendants(people, array, count, maxcount) {
	
	if(count >= maxcount) {
		return array;
	}	

	if(people[count].parents.length > 0) {
		for (let i = 0; i < parents.length; i++) {
			// push parent id to array here
			// include id, in this case i
			
		}

	}
	
	count++;
	buildDescendants(people, array, count, maxcount);
}

function instructorDesc(person, people) {

	let descendants = people.filter(function (el) {
		for(let i = 0; i < el.parents.length; i++){
			if(el.parents[i] === person.id) {
				return true;
			}
		}
	});

	// recursively build onto 'descendants'

	//instructorDesc(/* whom */, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

	if(!person){
		alert("Could not find that individual.");
		return app(people); // restart
	}

	var displayOption = prompt("Found " +person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

	switch(displayOption){
		case "info":
			displayTraits(person);
			break;
		case "family":
			// TODO: get person's family
			break;
		case "descendants":
			let descendants = [];
			descendants = buildDescendants(people, descendants, 0, people.length);
			//console.log(descendants);
			//getDescendants(person, people);
			break;
		case "restart":
			app(people);
			break;
		case "quit":
			return
		default:
			return mainMenu(person, people); // ask again
	}
}

function searchByName(people){
	var firstName = promptFor("What is the person's first name?", chars);
	var lastName = promptFor("What is the person's last name?", chars);

	// TODO: find the person using the name they entered

}

// alerts a list of people
function displayPeople(people){
	alert(people.map(function(person){
		return person.firstName + " " + person.lastName;
	}).join("\n"));
}

function displayPerson(person){
	// print all of the information about a person:
	// height, weight, age, name, occupation, eye color.
	var personInfo = "First Name: " + person.firstName + "\n";
	personInfo += "Last Name: " + person.lastName + "\n";
	// TODO: finish getting the rest of the information to display
	alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
	do{
		var response = prompt(question).trim();
	} while(!response || !valid(response));
	return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
	return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
	return true; // default validation only
}
