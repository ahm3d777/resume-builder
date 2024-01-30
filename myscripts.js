document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners and implement functionality here
    // Form submission
    const form = document.getElementById('resume-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // AJAX or fetch API to send form data to the server
        // Implement saving or processing logic on the server
    });

    // Template selection
    const templateSelect = document.getElementById('template-select');
    templateSelect.addEventListener('change', function() {
        // Update preview based on the selected template
    });

    // Dynamic resume list
    const resumeList = document.querySelector('.resume-list');
    // Fetch saved resumes from the server
    // Dynamically generate HTML for each resume item and append it to resumeList

    // Resume editing
    resumeList.addEventListener('click', function(event) {
        // Handle edit, download, or delete actions
    });

    // Profile settings
    const profileSettingsLinks = document.querySelectorAll('.profile-settings a');
    profileSettingsLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Implement functionality for each profile setting link
        });
    });

    // Integration with third-party services
    const linkedInBtn = document.querySelector('.linkedin-btn');
    linkedInBtn.addEventListener('click', function() {
        // Implement LinkedIn authentication flow
    });
});

// Resume Editor section
const form = document.querySelector('form');
const preview = document.getElementById('resume-preview');

form.addEventListener('input', function(event) {
    updatePreview();
    autoSave(); // Call auto-save after form input changes
});

function updatePreview() {
    const formData = new FormData(form);
    let previewHTML = '<h3>Preview</h3>';
    formData.forEach((value, key) => {
        previewHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    });
    preview.innerHTML = previewHTML;
}

function autoSave() {
    const formData = new FormData(form);
    localStorage.setItem('resumeData', JSON.stringify(Object.fromEntries(formData)));
}

// Integration with Third-Party Services
function connectWithLinkedIn() {
    // Implement LinkedIn authentication flow
}

const linkedInBtn = document.querySelector('.linkedin-btn');
linkedInBtn.addEventListener('click', connectWithLinkedIn);

// jQuery AJAX Submission
$(document).ready(function() {
    $('#resume-form').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: 'save_resume.php',
            method: 'POST',
            data: formData,
            success: function(response) {
                console.log('Resume saved successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error saving resume:', error);
            }
        });
    });
});

// JavaScript code for generating HTML content based on selected template
document.addEventListener('DOMContentLoaded', function() {
    populateTemplateOptions();
    const form = document.getElementById('resume-form');
    const templateSelect = document.getElementById('template-select');
    const previewContent = document.getElementById('preview-content');

    form.addEventListener('input', updatePreview);
    templateSelect.addEventListener('change', updatePreview);

    function updatePreview() {
        const formData = new FormData(form);
        const selectedTemplate = templateSelect.value;
        let previewHTML = '';
        switch (selectedTemplate) {
            case 'template1':
                previewHTML = generateTemplate1HTML(formData);
                break;
            case 'template2':
                previewHTML = generateTemplate2HTML(formData);
                break;
            case 'template3': // Add case for template3
                previewHTML = generateTemplate3HTML(formData); // Call generateTemplate3HTML
                break;
        }
        previewContent.innerHTML = previewHTML;
    }

    // Function to generate HTML content for Template 3
    function generateTemplate3HTML(formData) {
        // Generate HTML content for Template 3 based on form data
        const fullName = formData.get('full_name');
        const education = formData.get('education');
        const experience = formData.get('work_experience');
        // Add more fields as needed
        return `
            <div class="template3">
                <h3>Template 3 Preview:</h3>
                <p>Full Name: ${fullName}</p>
                <p>Education: ${education}</p>
                <p>Experience: ${experience}</p>
                <!-- Add more fields -->
            </div>
        `;
    }
});


