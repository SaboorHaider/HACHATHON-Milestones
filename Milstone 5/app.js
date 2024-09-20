// Select the form, output div, and buttons from the DOM
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
        alert('Please fill in all required fields.');
        return;
    }
    // Generate the resume content
    resumeOutput.innerHTML = "\n        <h1>Resume</h1>\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Country:</strong> ").concat(country, "</p>\n        <h3>Education</h3>\n        <p>").concat(education.replace(/\n/g, '<br>'), "</p>      \n        <h3>Skills</h3>\n        <p>").concat(skills ? skills.replace(/\n/g, '<br>') : "No skills provided", "</p>\n        <h3>Work Experience</h3>\n        <p>").concat(experience ? experience.replace(/\n/g, '<br>') : "No work experience provided", "</p>\n    ");
    // Display the resume output
    resumeOutput.style.display = 'block';
    // Add download button after resume is generated
    var downloadButton = document.createElement('button');
    downloadButton.textContent = "Download Resume";
    downloadButton.onclick = function () { return downloadResume(name, email, phone, country, education, skills, experience); };
    resumeOutput.appendChild(downloadButton);
    // Generate shareable link button
    var shareButton = document.createElement('button');
    shareButton.textContent = "Share Resume";
    shareButton.onclick = function () { return shareResume(name, email, phone, country, education, skills, experience); };
    resumeOutput.appendChild(shareButton);
}
// Function to download the resume
function downloadResume(name, email, phone, country, education, skills, experience) {
    var resumeContent = "\n        Name: ".concat(name, "\n        Email: ").concat(email, "\n        Phone: ").concat(phone, "\n        Country: ").concat(country, "\n        Education:\n        ").concat(education, "\n        Skills:\n        ").concat(skills || "No skills provided", "\n        Work Experience:\n        ").concat(experience || "No work experience provided", "\n    ");
    var blob = new Blob([resumeContent], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "".concat(name, "_Resume.txt");
    link.click();
}
// Function to generate a shareable link with encoded resume data in the URL
function shareResume(name, email, phone, country, education, skills, experience) {
    var encodedData = encodeURIComponent(JSON.stringify({ name: name, email: email, phone: phone, country: country, education: education, skills: skills, experience: experience }));
    var shareableURL = "".concat(window.location.origin, "?resumeData=").concat(encodedData);
    alert("Share this link: ".concat(shareableURL));
}
// Add event listener to the button to trigger resume generation
generateButton.addEventListener('click', generateResume);
// Check for shared data in the URL
window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeData = urlParams.get('resumeData');
    if (resumeData) {
        var _a = JSON.parse(decodeURIComponent(resumeData)), name_1 = _a.name, email = _a.email, phone = _a.phone, country = _a.country, education = _a.education, skills = _a.skills, experience = _a.experience;
        resumeOutput.innerHTML = "\n            <h2>Resume</h2>\n            <h3>Personal Information</h3>\n            <p><strong>Name:</strong> ".concat(name_1, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Country:</strong> ").concat(country, "</p>\n            <h3>Education</h3>\n            <p>").concat(education.replace(/\n/g, '<br>'), "</p>\n            <h3>Skills</h3>\n            <p>").concat(skills ? skills.replace(/\n/g, '<br>') : "No skills provided", "</p>\n            <h3>Work Experience</h3>\n            <p>").concat(experience ? experience.replace(/\n/g, '<br>') : "No work experience provided", "</p>\n        ");
    }
});
