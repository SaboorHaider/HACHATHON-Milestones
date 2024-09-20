// Select the form, output div, and button from the DOM
var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var generateButton = document.getElementById('generate-resume');
// Function to generate the resume
function generateResume() {
    // Get input values from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    // Validate required fields
    if (!name || !email || !phone || !education) {
        alert('Please fill in all required fields.');
        return;
    }
    // Generate the resume content
    resumeOutput.innerHTML = "\n        <h2 contenteditable=\"true\">Resume</h2>\n        <h3>Personal Information</h3>\n        <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        \n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education.replace(/\n/g, '<br>'), "</p>\n        \n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills ? skills.replace(/\n/g, '<br>') : "No skills provided", "</p>\n        \n        <h3>Work Experience</h3>\n        <p contenteditable=\"true\">").concat(experience ? experience.replace(/\n/g, '<br>') : "No work experience provided", "</p>\n    ");
    // Display the resume output
    resumeOutput.style.display = 'block';
}
// Add event listener to the button to trigger resume generation
generateButton.addEventListener('click', generateResume);
