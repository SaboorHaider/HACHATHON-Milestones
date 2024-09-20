// Select the form, output div, and button from the DOM
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;

// Function to generate the resume
function generateResume() {
    // Get input values from the form
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const country = (document.getElementById('country') as HTMLTextAreaElement).value
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    // Validate required fields
    if (!name || !email || !phone || !country || !education) {
        alert('Please fill in all required fields.');
        return;
    }

    // Generate the resume content
    resumeOutput.innerHTML = `
        <h2 contenteditable="true">Resume</h2>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
        <p><strong>Country:</strong> ${country}</p>
        <h3>Education</h3>
        <p contenteditable="true">${education.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skills ? skills.replace(/\n/g, '<br>') : "No skills provided"}</p>
        <h3>Work Experience</h3>
        <p contenteditable="true">${experience ? experience.replace(/\n/g, '<br>') : "No work experience provided"}</p>
    `;

    // Display the resume output
    resumeOutput.style.display = 'block';
}

// Add event listener to the button to trigger resume generation
generateButton.addEventListener('click', generateResume);
