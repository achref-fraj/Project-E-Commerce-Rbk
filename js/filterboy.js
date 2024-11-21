//////////////////////////////////////////////////////////////FILTER/////////////////////////////////////////////////////
const toggleButton = document.getElementById('toggle-filter');
const filterSection = document.getElementById('filter-section');

toggleButton.addEventListener('click', () => {
    if (filterSection.style.display === 'none') {
        filterSection.style.display = 'block';
    } else {
        filterSection.style.display = 'none';
    }
});

// Function to filter products by name and price
function filterProducts() {
    const filterName = document.getElementById('filter-name').value.toLowerCase();
    const filterPrice = document.getElementById('filter-price').value;


    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

        let priceInRange = true;

        if (filterPrice) {
            const [minPrice, maxPrice] = filterPrice.split('-').map(num => parseFloat(num));
            if (productPrice < minPrice || productPrice > maxPrice) {
                priceInRange = false;
            }
        }

 
        if (productName.includes(filterName) && priceInRange) {
            card.style.display = 'block'; // Show product
        } else {
            card.style.display = 'none'; // Hide product
        }
    });
}


document.getElementById('filter-button').addEventListener('click', filterProducts);
