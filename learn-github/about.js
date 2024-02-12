document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const languageSelect = document.querySelector('select[name="language"]');
    const uploadButton = document.querySelector('button');
    const textBoard = document.getElementById('textBoard');

    uploadButton.addEventListener('click', function () {
        const file = fileInput.files[0];
        const language = languageSelect.value;

        if (file && language) {
            const formData = new FormData();
            formData.append('fileInput', file);
            formData.append('language', language);

            fetch('http://127.0.0.1:5000/api', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                textBoard.textContent = data.rawText[language];
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('Please select a file and language.');
        }
    });
});
