// Menu Data
const menuItems = [
    { 
        name: 'Mushroom Biriyani',
        category: 'veg',
        price: 240,
        image: 'https://cookingfromheart.com/wp-content/uploads/2017/05/Chettinad-Mushroom-Biryani-4.jpg'
    },
    {
        name: 'Veg Biryani',
        category: 'veg',
        price: 190,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtDiMiok2ektyhL9ZFNhPX3psPNJKIaVY3Ng&s'
    },
    {
        name: 'Paneer Fried Rice',
        category: 'veg',
        price: 200,
        image: 'https://www.indianveggiedelight.com/wp-content/uploads/2023/09/paneer-fried-rice-featured.jpg'
    },
    {
        name: 'Veg Fried Rice',
        category: 'veg',
        price: 160,
        image: 'https://shwetainthekitchen.com/wp-content/uploads/2023/06/veg-fried-rice.jpg'
    },
    {
        name: 'Aloo Paratha',
        category: 'veg',
        price: 120,
        image: 'https://static.toiimg.com/photo/53109843.cms'
    },
    {
        name: 'Chicken Biriyani',
        category: 'nonveg',
        price: 280,
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/chicken-biryani-recipe-500x500.jpg'
    },
    {
        name: 'Mutton Biryani',
        category: 'nonveg',
        price: 320,
        image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Best-Mutton-Biryani-Recipe.jpg'
    },
    {
        name: 'Chicken Tandoori',
        category: 'nonveg',
        price: 260,
        image: 'https://static01.nyt.com/images/2024/05/16/multimedia/fs-tandoori-chicken-hmjq/fs-tandoori-chicken-hmjq-videoSixteenByNineJumbo1600.jpg'
    },
    {
        name: 'Prawn Biriyani',
        category: 'nonveg',
        price: 340,
        image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Prawn-Biryani-Recipe.jpg'
    },
    {
        name: 'Chicken Fried Rice',
        category: 'nonveg',
        price: 200,
        image: 'https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2021/05/04111234/chicken-fried-rice-low-res-2.png'
    }
];

let cart = {};

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(sectionId).style.display = 'block';
    if(sectionId === 'menu') renderMenu();
}

// Render Menu
function renderMenu() {
    const container = document.getElementById('menu-container');
    let html = '';
    
    menuItems.forEach(item => {
        html += `
            <div class="dish-card">
                <div class="dish-image" style="background-image: url('${item.image}')"></div>
                <div class="dish-details">
                    <h3>${item.name}</h3>
                    <div class="veg-nonveg ${item.category === 'nonveg' ? 'nonveg' : ''}">
                        ${item.category.toUpperCase()}
                    </div>
                    <p class="price-tag">₹${item.price}</p>
                    <button onclick="addToCart('${item.name}', ${item.price})" 
                            style="width: 100%; padding: 0.8rem;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Cart Functions
function addToCart(itemName, price) {
    cart[itemName] = cart[itemName] || { price: price, quantity: 0 };
    cart[itemName].quantity++;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    let html = '';
    let total = 0;
    
    for(const [item, details] of Object.entries(cart)) {
        const itemTotal = details.price * details.quantity;
        total += itemTotal;
        html += `
            <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;">
                <span>${item} x${details.quantity}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    }
    
    cartContainer.innerHTML = html;
    document.getElementById('total-price').textContent = `Total: ₹${total}`;
    document.getElementById('cart-count').textContent = Object.keys(cart).length;
}

// Order Processing
function placeOrder(event) {
    event.preventDefault();
    const formInputs = event.target.elements;
    
    if(Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = document.getElementById('total-price').textContent.split('₹')[1];
    alert(`Order confirmed! Total: ₹${total}\nYour food will arrive in 30 minutes!`);
    
    cart = {};
    updateCartDisplay();
    event.target.reset();
    showSection('home');
}

// Feedback Submission
function submitFeedback() {
    const feedback = document.querySelector('textarea').value;
    if(feedback.trim()) {
        alert('Thank you for your valuable feedback!');
        document.querySelector('textarea').value = '';
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    showSection('home');
});
