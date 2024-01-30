// Function to generate suggestions
function generateSuggestions(inputElement, suggestionsElement, suggestionsArray) {
    inputElement.addEventListener('input', function() {
        const inputValue = this.value.trim();
        if (inputValue.length === 0) {
            suggestionsElement.innerHTML = '';
            return;
        }
        
        const filteredSuggestions = suggestionsArray.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );

        const suggestionHTML = filteredSuggestions.map(suggestion => {
            const highlightedText = suggestion.replace(new RegExp(`(${inputValue})`, 'gi'), '<strong>$1</strong>');
            return `<div class="suggestion">${highlightedText}</div>`;
        }).join('');

        suggestionsElement.innerHTML = suggestionHTML;
    });

    // Add click event listener to suggestions
    suggestionsElement.addEventListener('click', function(event) {
        if (event.target.classList.contains('suggestion')) {
            inputElement.value = event.target.textContent;
            suggestionsElement.innerHTML = '';
        }
    });
}
// Suggestions for education degree
const educationDegreeInput = document.getElementById('education_degree');
const educationDegreeSuggestions = document.getElementById('education-degree-suggestions');
const educationDegreeSuggestionsArray = ['Bachelor of Science', 'Master of Arts', 'Doctor of Philosophy', 'Associate Degree', 'Professional Certificate'];
generateSuggestions(educationDegreeInput, educationDegreeSuggestions, educationDegreeSuggestionsArray);

// Suggestions for education major
const educationMajorInput = document.getElementById('education_major');
const educationMajorSuggestions = document.getElementById('education-major-suggestions');
const educationMajorSuggestionsArray = ['Computer Science', 'Psychology', 'Business Administration', 'Engineering', 'English Literature'];
generateSuggestions(educationMajorInput, educationMajorSuggestions, educationMajorSuggestionsArray);

// Suggestions for education school/university
const educationSchoolInput = document.getElementById('education_school');
const educationSchoolSuggestions = document.getElementById('education-school-suggestions');
const educationSchoolSuggestionsArray = ['Harvard University', 'Stanford University', 'Massachusetts Institute of Technology', 'University of California, Berkeley', 'Yale University'];
generateSuggestions(educationSchoolInput, educationSchoolSuggestions, educationSchoolSuggestionsArray);
// Suggestions for education year of graduation
const educationYearInput = document.getElementById('education_year');
const educationYearSuggestions = document.getElementById('education-year-suggestions');
const educationYearSuggestionsArray = ['2022', '2023', '2024', '2025', '2026']; // Example graduation years
generateSuggestions(educationYearInput, educationYearSuggestions, educationYearSuggestionsArray);

// Suggestions for work position
const workPositionInput = document.getElementById('work_position');
const workPositionSuggestions = document.getElementById('work-position-suggestions');
const workPositionSuggestionsArray = ['Software Engineer', 'Web Developer', 'Data Analyst', 'Project Manager', 'UI/UX Designer'];
generateSuggestions(workPositionInput, workPositionSuggestions, workPositionSuggestionsArray);

// Suggestions for work company
const workCompanyInput = document.getElementById('work_company');
const workCompanySuggestions = document.getElementById('work-company-suggestions');
const workCompanySuggestionsArray = ['Company A', 'Company B', 'Company C', 'Company D', 'Company E'];
generateSuggestions(workCompanyInput, workCompanySuggestions, workCompanySuggestionsArray);

// Suggestions for work duration
const workDurationInput = document.getElementById('work_duration');
const workDurationSuggestions = document.getElementById('work-duration-suggestions');
const workDurationSuggestionsArray = ['1 year', '2 years', '3 years', '4 years', '5 years'];
generateSuggestions(workDurationInput, workDurationSuggestions, workDurationSuggestionsArray);
// Suggestions for skill1
const skillInput1 = document.getElementById('skill1');
const skillSuggestions1 = document.getElementById('skill-suggestions-1');
const skillSuggestionsArray1 = ['JavaScript', 'HTML', 'CSS', 'Python', 'Java', 'React']; // Example skill suggestions
generateSuggestions(skillInput1, skillSuggestions1, skillSuggestionsArray1);

// Suggestions for skill2
const skillInput2 = document.getElementById('skill2');
const skillSuggestions2 = document.getElementById('skill-suggestions-2');
const skillSuggestionsArray2 = ['JavaScript', 'HTML', 'CSS', 'Python', 'Java', 'React']; // Example skill suggestions
generateSuggestions(skillInput2, skillSuggestions2, skillSuggestionsArray2);

// Suggestions for skill3
const skillInput3 = document.getElementById('skill3');
const skillSuggestions3 = document.getElementById('skill-suggestions-3');
const skillSuggestionsArray3 = ['JavaScript', 'HTML', 'CSS', 'Python', 'Java', 'React']; // Example skill suggestions
generateSuggestions(skillInput3, skillSuggestions3, skillSuggestionsArray3);



// Function to handle click on suggestions
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
        const inputField = event.target.closest('.form-group').querySelector('input[type="text"], textarea');
        const suggestionsContainer = event.target.closest('.suggestions');
        if (inputField && suggestionsContainer.contains(event.target)) {
            inputField.value = event.target.textContent;
            suggestionsContainer.innerHTML = '';
        }
    }
});
