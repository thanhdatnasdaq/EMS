// script.js

// Function to fetch language options from languages.txt file
function fetchLanguages() {
    console.log('Fetching languages...');
    fetch('languages.txt') // Fetch the languages.txt file
        .then(response => response.text()) // Convert the response to text
        .then(data => {
            console.log('Data:', data);
            const selectElement = document.querySelector('select'); // Get the select element

            // Split the data into lines and iterate over each line
            data.trim().split('\n').forEach(line => {
                console.log('Line:', line);
                const [value, text] = line.split(' '); // Split each line into value and text
                console.log('Value:', value, 'Text:', text);
                const option = document.createElement('option'); // Create a new option element
                option.value = value; // Set the value attribute
                option.textContent = text; // Set the text content
                selectElement.appendChild(option); // Append the option to the select element
            });
        })
        .catch(error => console.error('Error fetching languages:', error));
}

// Call the fetchLanguages function when the page loads
window.addEventListener('DOMContentLoaded', fetchLanguages);

document.addEventListener("DOMContentLoaded", function() {
    const uploadBtn = document.querySelector('button');
    const fileInput = document.getElementById('fileInput');
    const languageSelect = document.querySelector('select');

    uploadBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        const language = languageSelect.value;

        if (file && language) {
            const formData = new FormData();
            formData.append('fileInput', file);
            formData.append('language', language);
            console.log("Send data")
            fetch('http://127.0.0.1:5000/api', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                // Do something with the response if needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('File or language not selected');
        }
    });
});
