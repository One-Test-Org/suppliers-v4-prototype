// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('selectData');
    
    // Load the data from data.js
    import('./data.js')
        .then(module => {
            const countries = module.countries;
            
            // Populate the select element
            countries.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('selectNationality');
    
    // Load the data from data.js
    import('./nations.js')
        .then(module => {
            const nationalities = module.nationalities;
            
            // Populate the select element
            nationalities.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                selectElement.appendChild(optionElement);
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});