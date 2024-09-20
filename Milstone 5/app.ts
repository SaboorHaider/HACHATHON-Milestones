// Select the form, output div, and buttons from the DOM
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
    if (!name || !email || !phone || !country || !education ) {
        alert('Please fill in all required fields.');
        return;
    }

    // Generate the resume content
    resumeOutput.innerHTML = `
        <h1>Resume</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <h3>Education</h3>
        <p>${education.replace(/\n/g, '<br>')}</p>      
        <h3>Skills</h3>
        <p>${skills ? skills.replace(/\n/g, '<br>') : "No skills provided"}</p>
        <h3>Work Experience</h3>
        <p>${experience ? experience.replace(/\n/g, '<br>'): "No work experience provided"}</p>
    `;

// Display the resume output
    resumeOutput.style.display = 'block';

// Add download button after resume is generated
    const downloadButton = document.createElement('button');
    downloadButton.textContent = "Download Resume";
    downloadButton.onclick = () => downloadResume(name, email, phone, country, education, skills, experience);
    resumeOutput.appendChild(downloadButton);

// Generate shareable link button
    const shareButton = document.createElement('button');
    shareButton.textContent = "Share Resume";
    shareButton.onclick = () => shareResume(name, email, phone, country ,education, skills, experience);
    resumeOutput.appendChild(shareButton);
}

// Function to download the resume
function downloadResume(name: string, email: string, phone: string, country: string, education: string, skills: string, experience: string) {
    const resumeContent = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Country: ${country}
        Education:
        ${education}
        Skills:
        ${skills || "No skills provided"}
        Work Experience:
        ${experience || "No work experience provided"}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_Resume.txt`;
    link.click();
}

// Function to generate a shareable link with encoded resume data in the URL
function shareResume(name: string, email: string, phone: string, country: string, education: string, skills: string, experience: string) {
    const encodedData = encodeURIComponent(JSON.stringify({ name, email, phone, country, education, skills, experience }));
    const shareableURL = `${window.location.origin}?resumeData=${encodedData}`;
    alert(`Share this link: ${shareableURL}`);
}

// Add event listener to the button to trigger resume generation
generateButton.addEventListener('click', generateResume);

// Check for shared data in the URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeData = urlParams.get('resumeData');
    
    if (resumeData) {
        const { name, email, phone, country, education, skills, experience } = JSON.parse(decodeURIComponent(resumeData));
        resumeOutput.innerHTML = `
            <h2>Resume</h2>
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Country:</strong> ${country}</p>
            <h3>Education</h3>
            <p>${education.replace(/\n/g, '<br>')}</p>
            <h3>Skills</h3>
            <p>${skills ? skills.replace(/\n/g, '<br>') : "No skills provided"}</p>
            <h3>Work Experience</h3>
            <p>${experience ? experience.replace(/\n/g, '<br>') : "No work experience provided"}</p>
        `;
    }
});
