// Selecting elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;
const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkInput = document.getElementById('shareable-link') as HTMLInputElement;
const copyLinkButton = document.getElementById('copy-link-button') as HTMLButtonElement;
const downloadLinkContainer = document.getElementById('downloadable-link-container') as HTMLDivElement;
const downloadButton = document.getElementById('download-resume-button') as HTMLButtonElement;

// Function to generate the resume
function generateResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const country = (document.getElementById('country') as HTMLSelectElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

// Required fields
    if (!name || !email || !phone || !country || !education) {
        alert('Please fill in all required fields.');
        return;
    }

// Display the generated resume
    resumeOutput.innerHTML = `
        <h1>Resume</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <h3>Education</h3>
        <p>${education.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p>${skills ? skills.replace(/\n/g, '<br>') : 'No skills provided'}</p>
        <h3>Work Experience</h3>
        <p>${experience ? experience.replace(/\n/g, '<br>') : 'No work experience provided'}</p>
    `;

// Show the download and shareable link options
    downloadLinkContainer.style.display = 'block';
    shareableLinkContainer.style.display = 'block';

    const shareableURL = generateShareableURL(name, email, phone, country, education, skills, experience);
    shareableLinkInput.value = shareableURL;
}

// Function to generate a shareable URL
function generateShareableURL(name: string, email: string, phone: string, country: string, education: string, skills: string, experience: string): string {
    const resumeData = { name, email, phone, country, education, skills, experience };
    const encodedResumeData = encodeURIComponent(JSON.stringify(resumeData));
    return `${window.location.origin}${window.location.pathname}?resumeData=${encodedResumeData}`;
}

// Function to download the resume
function downloadResume(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const country = (document.getElementById('country') as HTMLSelectElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    const resumeContent = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Country: ${country}
        Education:
        ${education}
        Skills:
        ${skills || 'No skills provided'}
        Work Experience:
        ${experience || 'No work experience provided'}
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_Resume.txt`;
    link.click();
}

// Function to handle copying the link
copyLinkButton.addEventListener('click', () => {
    shareableLinkInput.select();
    document.execCommand('copy');
    alert('Shareable link copied to clipboard!');
});

// Event listener for generating resume
generateButton.addEventListener('click', generateResume);

// Event listener for downloading resume
downloadButton.addEventListener('click', downloadResume);

// Check for shared data in the URL 
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeData = urlParams.get('resumeData');
    
    if (resumeData) {
        const decodedResumeData = JSON.parse(decodeURIComponent(resumeData));
        (document.getElementById('name') as HTMLInputElement).value = decodedResumeData.name;
        (document.getElementById('email') as HTMLInputElement).value = decodedResumeData.email;
        (document.getElementById('phone') as HTMLInputElement).value = decodedResumeData.phone;
        (document.getElementById('country') as HTMLSelectElement).value = decodedResumeData.country;
        (document.getElementById('education') as HTMLTextAreaElement).value = decodedResumeData.education;
        (document.getElementById('skills') as HTMLTextAreaElement).value = decodedResumeData.skills;
        (document.getElementById('experience') as HTMLTextAreaElement).value = decodedResumeData.experience;
    }
});
