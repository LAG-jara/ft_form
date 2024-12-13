const darkModeIcon = document.getElementById('darkModeIcon');
const lightModeIcon = document.getElementById('lightModeIcon');
const userForms = document.querySelector('user-forms');

const reloadUserForms = (theme) => {
    const userForms = document.querySelector('user-forms');
    const newUserForms = document.createElement('user-forms'); // Create a new instance
    newUserForms.setAttribute('theme', theme); // Set the updated theme attribute
    userForms.replaceWith(newUserForms); // Replace the old element with the new one
};

const switchTheme = () => {
    const body = document.body;

    if (body.classList.contains('dark-theme')) {
        // Switch to light theme
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        lightModeIcon.classList.remove('d-none');
        darkModeIcon.classList.add('d-none');
        reloadUserForms('light');
        console.log('switched to light theme');
    } else {
        // Switch to dark theme
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        darkModeIcon.classList.remove('d-none');
        lightModeIcon.classList.add('d-none');
        reloadUserForms('dark');
        console.log('switched to dark theme');
    }
};

// Event listeners for theme icons
darkModeIcon.addEventListener('click', switchTheme);
lightModeIcon.addEventListener('click', switchTheme);

document.addEventListener('DOMContentLoaded', () => {
    const userPrefersDark = localStorage.getItem('theme') === 'dark';
    const userForms = document.querySelector('user-forms');

    if (userPrefersDark) {
        document.body.classList.add('dark-theme');
        darkModeIcon.classList.remove('d-none');
        lightModeIcon.classList.add('d-none');
        reloadUserForms('dark');
    } else {
        document.body.classList.add('light-theme');
        lightModeIcon.classList.remove('d-none');
        darkModeIcon.classList.add('d-none');
        reloadUserForms('light');
    }
});