// Selecting elements
var resumeForm = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var generateButton = document.getElementById('generate-resume');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkInput = document.getElementById('shareable-link');
var copyLinkButton = document.getElementById('copy-link-button');
var downloadLinkContainer = document.getElementById('downloadable-link-container');
var downloadButton = document.getElementById('download-resume-button');
// Function to generate the resume
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var country = document.getElementById('country').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    // Required fields
    if (!name || !email || !phone || !country || !education) {
        alert('Please fill in all required fields.');
        return;
    }
    // Display the generated resume
    resumeOutput.innerHTML = "\n        <h1>Resume</h1>\n        <p><strong>Name:</strong> ".concat(name, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Country:</strong> ").concat(country, "</p>\n        <h3>Education</h3>\n        <p>").concat(education.replace(/\n/g, '<br>'), "</p>\n        <h3>Skills</h3>\n        <p>").concat(skills ? skills.replace(/\n/g, '<br>') : 'No skills provided', "</p>\n        <h3>Work Experience</h3>\n        <p>").concat(experience ? experience.replace(/\n/g, '<br>') : 'No work experience provided', "</p>\n    ");
    // Show the download and shareable link options
    downloadLinkContainer.style.display = 'block';
    shareableLinkContainer.style.display = 'block';
    var shareableURL = generateShareableURL(name, email, phone, country, education, skills, experience);
    shareableLinkInput.value = shareableURL;
}
// Function to generate a shareable URL
function generateShareableURL(name, email, phone, country, education, skills, experience) {
    var resumeData = { name: name, email: email, phone: phone, country: country, education: education, skills: skills, experience: experience };
    var encodedResumeData = encodeURIComponent(JSON.stringify(resumeData));
    return "".concat(window.location.origin).concat(window.location.pathname, "?resumeData=").concat(encodedResumeData);
}
// Function to download the resume
function downloadResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var country = document.getElementById('country').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value;
    var experience = document.getElementById('experience').value;
    var resumeContent = "\n        Name: ".concat(name, "\n        Email: ").concat(email, "\n        Phone: ").concat(phone, "\n        Country: ").concat(country, "\n        Education:\n        ").concat(education, "\n        Skills:\n        ").concat(skills || 'No skills provided', "\n        Work Experience:\n        ").concat(experience || 'No work experience provided', "\n    ");
    var blob = new Blob([resumeContent], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "".concat(name, "_Resume.txt");
    link.click();
}
// Function to handle copying the link
copyLinkButton.addEventListener('click', function () {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Shareable link copied to clipboard!');
});
// Event listener for generating resume
generateButton.addEventListener('click', generateResume);
// Event listener for downloading resume
downloadButton.addEventListener('click', downloadResume);
// Check for shared data in the URL 
window.addEventListener('load', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeData = urlParams.get('resumeData');
    if (resumeData) {
        var decodedResumeData = JSON.parse(decodeURIComponent(resumeData));
        document.getElementById('name').value = decodedResumeData.name;
        document.getElementById('email').value = decodedResumeData.email;
        document.getElementById('phone').value = decodedResumeData.phone;
        document.getElementById('country').value = decodedResumeData.country;
        document.getElementById('education').value = decodedResumeData.education;
        document.getElementById('skills').value = decodedResumeData.skills;
        document.getElementById('experience').value = decodedResumeData.experience;
    }
});
