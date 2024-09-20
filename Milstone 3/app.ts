// Select the form and output div
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;

// Function to generate the resume
function generateResume() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const country = (document.getElementById('country') as HTMLTextAreaElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    
    // Validate required fields
    if (!name || !email || !phone || !country || !education) {
        alert('Please fill in all the required fields.');
        return;
    }

// Generate the resume
    resumeOutput.innerHTML = `
        <h1>Dynamic Resume Builder</h1>
        <h2><strong>Name:</strong> ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <h3>Education</h3>
        <p>${education.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p>${skills.replace(/\n/g, '<br>')} No skills provided </p>
        <h3>Work Experience</h3>
        <p>${experience.replace(/\n/g, '<br>')} No Work Experience provided </p>
    `;

// Show the output section
    resumeOutput.style.display = 'block';

// Disable the button to prevent multiple submissions
    generateButton.disabled = true;
    generateButton.textContent = "Resume Generated";
}

// Event listener for button click
generateButton.addEventListener('click', generateResume);
