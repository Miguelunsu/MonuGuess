// Related to the landmark json list:
// Sorting by name
landmarks.sort((a, b) => a.name.localeCompare(b.name));

// Populating the list
const landmarkList = document.getElementById("LandmarkList");

// Adding the name to the list (what is seen in the website)
landmarks.forEach(landmark => {
    const option = document.createElement("option");
    option.value = landmark.name + ' (' + landmark.country + ')';
    landmarkList.appendChild(option);
	});

// Obtaining today's day
const today = new Date();
const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

console.log('Current day: formattedToday');
console.log(formattedToday);

// Creating list of landmarks
const landmark_list = [64, 33, 41, 57, 70, 57, 140, 171, 82, 16, 173, 95, 67, 132]

// Creating diccionary day-landmark
const dates = [];
const startDate = new Date(2023, 4, 1); // The month in the middle needs to be added 1 (0 is January)
console.log('Start day: startDate');
console.log(startDate);
const dictionary = {};
for (let i = 0; i < 14; i++) {
	const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
	const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
	const value = landmark_list[i % landmark_list.length];
	dictionary[formattedDate] = value;
  }

console.log('dictionary landmarkdates');
console.log(dictionary);

// Today's landmark:
let ID_Answer = dictionary[formattedToday]
console.log('Todays ID_Answer');
console.log(ID_Answer);

// Define Correct ID
ID_Answer = 132;