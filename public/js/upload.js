document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-btn");
    const progressBar = document.getElementById("progress-bar");
    const statusMessage = document.getElementById("status-message");

    // Prevent default behavior for drag-and-drop events
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Highlight drop area on drag
    dropArea.addEventListener("dragover", () => {
        dropArea.classList.add("highlight");
    });
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("highlight");
    });

    // Handle file drop
    dropArea.addEventListener("drop", (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Handle file selection via input
    fileInput.addEventListener("change", () => {
        const files = fileInput.files;
        handleFiles(files);
    });

    // Handle file validation and upload
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];

            // Validate file size and type
            if (file.size > 10485760) { 
                showMessage("File is too large. Max size is 10MB.", "error");
                return;
            }
            if (!file.type.startsWith("application/pdf")) {
                showMessage("Only PDF files are allowed.", "error");
                return;
            }

            // Show file details and enable upload
            const fileName = file.name;
            showMessage(`Preparing to upload: ${fileName}`, "info");

            // Start the upload
            uploadFile(file);
        }
    }

    // Upload file via AJAX
    function uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload", true);

        // Update progress bar
        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                progressBar.style.width = `${percent}%`;
            }
        });

        // Handle success and error messages
        xhr.onload = function () {
            if (xhr.status === 200) {
                showMessage("File uploaded successfully!", "success");
            } else {
                showMessage("Error uploading file.", "error");
            }
        };

        xhr.onerror = function () {
            showMessage("Network error, please try again later.", "error");
        };

        xhr.send(formData);
    }

    // Display status messages
    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type; 
    }
});
