// Get references to the buttons and containers
const indexContainer = document.getElementById("container-index");
const instructionsContainer = document.getElementById("container-instructions");
const showInstructionsButton = document.getElementById("show-instructions-button");
const showIndexButton = document.getElementById("show-index-button");

// Get references to the buttons and containers
const StatsContainer = document.getElementById("container-stats");
const showStatsButton = document.getElementById("show-stats-button");

// Add event listeners to the buttons
showInstructionsButton.addEventListener("click", function() {
    // Hide the index container
    indexContainer.style.display = "none";
    // Show the instructions container
    instructionsContainer.style.display = "block";
});

// Add event listeners to the buttons
showStatsButton.addEventListener("click", function() {
    // Hide the index container
    indexContainer.style.display = "none";
    // Show the instructions container
    StatsContainer.style.display = "block";
});

showIndexButton.addEventListener("click", function() {
    // Hide the instructions container
    instructionsContainer.style.display = "none";
    // Show the index container
    indexContainer.style.display = "block";
    console.log('Index: display')
});

const showIndexButton2 = document.getElementById("show-index-button2");
showIndexButton2.addEventListener("click", function() {
    // Hide the stats container
    StatsContainer.style.display = "none";
    // Show the index container
    indexContainer.style.display = "block";
    console.log('Index: display')
});