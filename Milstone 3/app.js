// Select the form and output div
var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var generateButton = document.getElementById('generate-resume');
// Function to generate the resume
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var country = document.getElementById('country').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    // Validate required fields
    if (!name || !email || !phone || !country || !education) {
        alert('Please fill in all the required fields.');
        return;
    }
    // Generate the resume
    resumeOutput.innerHTML = "\n        <h1>Dynamic Resume Builder</h1>\n        <h2><strong>Name:</strong> ".concat(name, "</h2>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Country:</strong> ").concat(country, "</p>\n        <h3>Education</h3>\n        <p>").concat(education.replace(/\n/g, '<br>'), "</p>\n        <h3>Skills</h3>\n        <p>").concat(skills.replace(/\n/g, '<br>'), " No skills provided </p>\n        <h3>Work Experience</h3>\n        <p>").concat(experience.replace(/\n/g, '<br>'), " No Work Experience provided </p>\n    ");
    // Show the output section
    resumeOutput.style.display = 'block';
    // Disable the button to prevent multiple submissions
    generateButton.disabled = true;
    generateButton.textContent = "Resume Generated";
}
// Event listener for button click
generateButton.addEventListener('click', generateResume);
