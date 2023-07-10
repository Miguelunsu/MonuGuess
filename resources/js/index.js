// Get references to the image and the button
let PixelImage = document.querySelector('#PixelImage');
let button = document.querySelector('#SubmitButton');

// Define Correct ID
// let ID_Answer = 42;

// Define an array of image sources
let imageSources = [
    `./resources/PixelCode/ID-${ID_Answer}-Pixel10.png`,
    `./resources/PixelCode/ID-${ID_Answer}-Pixel20.png`,
    `./resources/PixelCode/ID-${ID_Answer}-Pixel30.png`,
    `./resources/PixelCode/ID-${ID_Answer}-Pixel50.png`,
    `./resources/PixelCode/ID-${ID_Answer}-Pixel85.png`,
    `./resources/PixelCode/ID-${ID_Answer}-Resuelta.png`
];
console.log(imageSources[0])

console.log('Landmark list:')
console.log(landmarkList)

// Function to get the name of the landmark given the ID
function getNameById(landmarks, id) {
  for (let i = 0; i < landmarks.length; i++) {
    if (landmarks[i].id === id) {
      return landmarks[i].name;
    }
  }
  return null; // if no matching id found
}

// Function to get the description of the landmark given the ID
function getDescriptionById(landmarks_description, id) {
  for (let i = 0; i < landmarks_description.length; i++) {
    if (landmarks_description[i].id === id) {
      return landmarks_description[i].description;
    }
  }
  return null; // if no matching id found
}

// Getting the correct answer
let CorrectAnswer_NoCountry = getNameById(landmarks, ID_Answer);

// Getting Description
let Correct_Description = getDescriptionById(landmarks_description, ID_Answer);
// Populating the description
let descriptionElement = document.getElementById("Description");
descriptionElement.innerHTML = "<p>" + Correct_Description + "</p>";

// Funcion para pillar el country y continent de una landmark
function Country_Conti_Picker(landmarks, input) {
  let country, continent;
  for (let i = 0; i < landmarks.length; i++) {
    if (landmarks[i].name === input) {
      country = landmarks[i].country;
      continent = landmarks[i].continent;
      break;
    }
  }
  console.log('FROM FUNCTION:')
  console.log(`The ${input} is located in ${country}, ${continent}.`);
  return {country, continent};
}

var boxesGuess = document.getElementById("boxes_guess");
// Funcion para ocultar lo de las guess box
function Hide_Guess_Boxes() {
  boxesGuess.style.display = "none"; // hide the div
}

// Añadiendo el country a la landmark
let CorrectAnswer = CorrectAnswer_NoCountry + ' (' + Country_Conti_Picker(landmarks, CorrectAnswer_NoCountry).country + ')'

// Flag to define the position of the array for the image
let flag = 0

// Define a function to change the image
function changeImage(flag) {
    // Set the image src to the corresponding value from the array
    PixelImage.src = imageSources[flag];
}

// Setting up the first image
PixelImage.src = imageSources[flag];

// For the change in the whitebox
const guessInput = document.getElementById('guessInput');
const guess1Box = document.getElementById('guess1Box');

// FOR THE CHANGE IN THE ROWS
// Get the element with id "GuessRow_1"
const GuessRow1 = document.getElementById('GuessRow_1');
const GuessRow2 = document.getElementById('GuessRow_2');
const GuessRow3 = document.getElementById('GuessRow_3');
const GuessRow4 = document.getElementById('GuessRow_4');
const GuessRow5 = document.getElementById('GuessRow_5');

// Funcion para comprobar si el contry es correcto
function Is_Country_True(ID_Answer, input_guess_no_country, landmarks) {
  // El input tiene que ser el monumento solo, tipo 'Coliseo'
  let CorrectAnswer_country;
  for (let i = 0; i < landmarks.length; i++) {
    if (landmarks[i].id === ID_Answer) {
      CorrectAnswer_country = landmarks[i].country;
      break;
    }
  }
  const dummy = Country_Conti_Picker(landmarks, input_guess_no_country)
  Input_country = dummy.country

  if (Input_country == CorrectAnswer_country){
    return true
  } else {
    return false
  }
}

// Funcion para comprobar si el continent es correcto
function Is_Continent_True(ID_Answer, input_guess_no_country, landmarks) {
  // El input tiene que ser el monumento solo, tipo 'Coliseo'
  let CorrectAnswer_continent;
  for (let i = 0; i < landmarks.length; i++) {
    if (landmarks[i].id === ID_Answer) {
      CorrectAnswer_continent = landmarks[i].continent;
      break;
    }
  }
  const dummy = Country_Conti_Picker(landmarks, input_guess_no_country)
  Input_continent = dummy.continent

  if (Input_continent == CorrectAnswer_continent){
    return true
  } else {
    return false
  }
}

// Function to create the html to be pasted in the guess boxes
function newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) {
  console.log('Creating New HTML')
  var first_line_newHTML = `
  <div class = 'answer-rows col-span-3 h-8 bg-gray-200 dark:bg-slate-600 rounded justify-content-left id=Landmark_Row${flag+1}'>${input_guess_no_country}</div>
  `
  // Country assessment
  if (is_country == true) {
    // Correct country
    console.log('Inside newHTML_creator - Country true')
    var second_line_newHTML = `
    <div class = 'answer-rows col-span-2 h-8 bg-gray-200 dark:bg-slate-600 rounded id=Country_Row${flag+1}'>${country_conti.country} &#x2705</div>
    `
  } else {
    // Not correct country
    console.log('Inside newHTML_creator - Country false')
    var second_line_newHTML = `
    <div class = 'answer-rows col-span-2 h-8 bg-gray-200 dark:bg-slate-600 rounded id=Country_Row${flag+1}'>${country_conti.country} &#10060</div>
    `
  }
  // Continent assessment
  if (is_continent == true) {
    // Correct continent
    console.log('Inside newHTML_creator - Country true')
    var third_line_newHTML = `
    <div class = 'answer-rows col-span-2 h-8 bg-gray-200 dark:bg-slate-600 rounded id=Continent_Row${flag+1}'>${country_conti.continent} &#x2705</div>
    `
  } else {
    // Not correct continent
    console.log('Inside newHTML_creator - Country false')
    var third_line_newHTML = `
    <div class = 'answer-rows col-span-2 h-8 bg-gray-200 dark:bg-slate-600 rounded id=Continent_Row${flag+1}'>${country_conti.continent} &#10060</div>
    `
  }
  newHTML_Adapted = first_line_newHTML+second_line_newHTML+third_line_newHTML
  return newHTML_Adapted
}


// FINAL ANSWER CORRECT DISPLAY AT THE END
const Correct_Answer_Display_const = document.getElementById("Correct_Answer_Display");

// set the element's innerHTML property to the value of the variable
Correct_Answer_Display_const.innerHTML = CorrectAnswer;

const Correct_Ans_Disp_Exclam_const = document.getElementById("Correct_Answer_Display_Exclamation");

// set the element's innerHTML property to the value of the variable
Correct_Ans_Disp_Exclam_const.innerHTML = 'You got it!';

// Sqaures
const Squares_const = document.getElementById("squares");

// Get the input element of the input box and the button
const input_and_button_Element = document.getElementById('input_and_button');
// Get the input element of the boxes with the guesses
const boxes_Element = document.getElementById('boxes_guess');

// Function to storage the guesses of the user
let Guess_Store_List = [
];

const Show_Hide_Button = document.getElementById("Show_Hide_Guess_Button");
const guessesContainer = document.getElementById("guessesContainer");

// Function to call the guess-hide thing
guessesContainer.style.display = "none"
function Guess_Hide_Part() {
  console.log('Function: Guess_Hide_Part')
		// once the user has finished guessing, show the guessesContainer and button
		// guessesContainer.style.display = "block";
		Show_Hide_Button.style.display = "block";
		
		for (let i = 0; i < Guess_Store_List.length; i++) {
      const guessDiv = document.createElement("p");
      guessDiv.innerHTML = Guess_Store_List[i];
      guessesContainer.appendChild(guessDiv);
		}
		// Working with the guess display
		Show_Hide_Button.addEventListener("click", function() {
		  if (guessesContainer.style.display === "none") {
			guessesContainer.style.display = "block";
			Show_Hide_Button.textContent = "Hide Guesses";
		  } else {
			guessesContainer.style.display = "none";
			Show_Hide_Button.textContent = "Show Guesses";
		  }
		});
}

// Function to call the guess-hide thing (for the fial showcase)
function Guess_Hide_Part_Showcase() {
  console.log('Function: Guess_Hide_Part Showcase')
		// once the user has finished guessing, show the guessesContainer
		// = "block";
		Final_Showcase.style.display = "block";
}

var Squares_text; // Declare the shared variable
// Añado al boton la funcion de leer (y logear para debugear) la opcion que ha querido el guesseador
button.addEventListener('click', function(){
  
  let input_guess = document.getElementById('guess_input').value;
  console.log(input_guess);

  // Valid function
  let valid = false;
  for (var i = 0; i < landmarkList.options.length; i++) {
    if (input_guess === landmarkList.options[i].value) {
      valid = true;
      break;
    }
  }
  if (valid) {
    console.log('Valid input: ' + input_guess);
    // continue with your code for valid input here
  } else {
    console.log('Invalid input: ' + input_guess);
    // display error message for invalid input here
    alert('Unknown landmark!');
    return; // add this line to prevent any invalid input from being submitted
  }


  console.log('Variable input_guess:')
  console.log(input_guess)
  
  // Here I am substracting the country from the input
  const input_guess_no_country = input_guess.replace(/\s*\(.*?\)\s*/g, '').trim();
  
  console.log('Variable input_guess_no_country:')
  console.log(input_guess_no_country)
  
  console.log('Current Guess_Store_List:')
  console.log(Guess_Store_List)
  
  // Getting the country and continent form the input
  const country_conti = Country_Conti_Picker(landmarks, input_guess_no_country)
  console.log(`The ${input_guess_no_country} is located in ${country_conti.country}, ${country_conti.continent}.`);

  console.log('FLAG (just after submitting):')
  console.log(flag)
  if (input_guess == CorrectAnswer){
      // alert('ACERTASTE!');
      
	  // Adding to the storage list (but with the tic correct)
    Guess_Store_List = Guess_Store_List.concat([input_guess_no_country + " &#x2705;"]);

      // Removing the input and guess button:
      input_and_button_Element.remove();

	  // For the hiding and showing guesses part
	  Guess_Hide_Part();
    Guess_Hide_Part_Showcase()

    // To hide the guess_boxes
    Hide_Guess_Boxes()
	  
      // BUCLE PARA RELLENAR LAS BOXES
      if (flag == 0){
        // Primera box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        GuessRow1.outerHTML  = newHTML_Adapted_function;

        // Creating the squares
        Squares_text = "🟩⬛⬛⬛⬛"
	console.log('Squares_text:')
	console.log(Squares_text)
        Squares_const.innerHTML = `&#129001; &#11035; &#11035; &#11035; &#11035;`

        // Call the function to generate the button (for the whatsap)
        generateButton();
	
      } else if (flag == 1){
        // Segunda box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        GuessRow2.outerHTML  = newHTML_Adapted_function;

        // Creating the squares
        Squares_text = "🟥🟩⬛⬛⬛"
        Squares_const.innerHTML = `&#128997; &#129001; &#11035; &#11035; &#11035;`

        // Call the function to generate the button (for the whatsap)
        generateButton();
	
      } else if (flag == 2){
        // Tercera box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        GuessRow3.outerHTML  = newHTML_Adapted_function;

        // Creating the squares
        Squares_text = "🟥🟥🟩⬛⬛"
        Squares_const.innerHTML = `&#128997; &#128997; &#129001; &#11035; &#11035;`

        // Call the function to generate the button (for the whatsap)
        generateButton();
	
      } else if (flag == 3){
        // Cuarta box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        GuessRow4.outerHTML  = newHTML_Adapted_function;

        // Creating the squares
        Squares_text = "🟥🟥🟥🟩⬛"
        Squares_const.innerHTML = `&#128997; &#128997; &#128997; &#129001; &#11035;`

        // Call the function to generate the button (for the whatsap)
        generateButton();
	
      } else if (flag == 4){
        // Quinta box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        GuessRow5.outerHTML  = newHTML_Adapted_function;

        // Creating the squares
        Squares_text = "🟥🟥🟥🟥🟩"
        Squares_const.innerHTML = `&#128997; &#128997; &#128997; &#128997; &#129001;`

        // Call the function to generate the button (for the whatsap)
        generateButton();
	
      }

      // Update the flag to switch to the other image source
      flag = imageSources.length;
      PixelImage.src = imageSources[imageSources.length - 1];
  } else {       
	  // Adding to the storage list (but with the cross incorrect)
    Guess_Store_List = Guess_Store_List.concat([input_guess_no_country + " &#10060;"]);
	  
      // BUCLE PARA RELLENAR LAS BOXES
      if (flag == 0){
        // Primera box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')
        
        // Set the HTML of the element with the new HTML
        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        // Set the HTML of the element with the new HTML
        GuessRow1.outerHTML  = newHTML_Adapted_function;

        // Clear input box (If the landmark is incorrect)
        document.getElementById('guess_input').value = '';
      } else if (flag == 1){
        // Segunda box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent)  
        // Set the HTML of the element with the new HTML
        GuessRow2.outerHTML  = newHTML_Adapted_function;

        // Clear input box (If the landmark is incorrect)
        document.getElementById('guess_input').value = '';
      } else if (flag == 2){
        // Tercera box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        // Set the HTML of the element with the new HTML
        GuessRow3.outerHTML  = newHTML_Adapted_function;

        // Clear input box (If the landmark is incorrect)
        document.getElementById('guess_input').value = '';
      } else if (flag == 3){
        // Cuarta box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        // Set the HTML of the element with the new HTML
        GuessRow4.outerHTML  = newHTML_Adapted_function;

        // Clear input box (If the landmark is incorrect)
        document.getElementById('guess_input').value = '';
      } else if (flag == 4){
        // Quinta box

        // Assesing Country
        is_country = Is_Country_True(ID_Answer, input_guess_no_country, landmarks)
        // Assessing Continent
        is_continent = Is_Continent_True(ID_Answer, input_guess_no_country, landmarks)

        console.log('Guessing country:')
        console.log(is_country)
        console.log('-------------')

        newHTML_Adapted_function = newHTML_creator(flag, input_guess_no_country, country_conti, is_country, is_continent) 
        // Set the HTML of the element with the new HTML
        GuessRow5.outerHTML  = newHTML_Adapted_function;

        // Clear input box (If the landmark is incorrect)
        document.getElementById('guess_input').value = '';

        // set the element's innerHTML property to the value of the variable
        Correct_Ans_Disp_Exclam_const.innerHTML = '';

        // Creating the squares
        Squares_text = "🟥🟥🟥🟥🟥"
        Squares_const.innerHTML = `&#128997; &#128997; &#128997; &#128997; &#128997;`

        // Call the function to generate the button (for the whatsap)
        generateButton();

        // Removing the input and guess button:
        input_and_button_Element.remove();
		
        // Removing boxes:
        boxes_Element.remove();
		

	  // For the hiding and showing guesses part
	  Guess_Hide_Part();
    Guess_Hide_Part_Showcase()


    // To hide the guess_boxes
    Hide_Guess_Boxes()
      }
      // Update the flag to switch to the other image source
      flag = (flag + 1) % imageSources.length;
      PixelImage.src = imageSources[flag];
  }

});

// Generate button for the button
function generateButton() {
  var button_wha = document.createElement("button");
  button_wha.textContent = "Share (WhatsApp)";
  button_wha.onclick = shareViaWhatsApp;

  // Append the button to a specific HTML element or container
  var container = document.getElementById("Whatsap_Button_Id");
  container.appendChild(button_wha);

  var button_copy = document.createElement("button");
  button_copy.textContent = "Share (Copy)";
  button_copy.onclick = shareViaCopy;

  // Append the button to a specific HTML element or container
  var container = document.getElementById("Copy_Button_Id");
  container.appendChild(button_copy);
}

// Generate the text to send via whatsap
function shareViaWhatsApp() {
  const WhatsAppToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  var message = "MonuGuess (" + WhatsAppToday + ")\n"  + '🏛️' + Squares_text + '\n\n' + 'https://monuguess.com';

  var url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

function shareViaCopy() {
  const WhatsAppToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  var message = "MonuGuess (" + WhatsAppToday + ")\n"  + '🏛️' + Squares_text + '\n\n' + 'https://monuguess.com';

  // Create a temporary textarea element
  var textarea = document.createElement("textarea");
  textarea.value = message;

  // Append the textarea to the body
  document.body.appendChild(textarea);

  // Copy the text from the textarea
  textarea.select();
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Notify the user that the text has been copied
  alert("Text copied to clipboard!");
}
