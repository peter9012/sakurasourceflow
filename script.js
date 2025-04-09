// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Hero Slider
const slider = () => {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    const slideCount = slides.length;

    // Create dots
    const createDots = () => {
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dot" data-slide="${i}"></button>`
            );
        });
    };

    // Activate dot
    const activateDot = (slide) => {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('active');
    };

    // Go to slide
    const goToSlide = (slide) => {
        slides.forEach((s, i) => {
            s.style.opacity = 0;
            s.style.zIndex = 0;
        });
        slides[slide].style.opacity = 1;
        slides[slide].style.zIndex = 1;
        currentSlide = slide;
        activateDot(currentSlide);
    };

    // Next slide
    const nextSlide = () => {
        if (currentSlide === slideCount - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
    };

    // Previous slide
    const prevSlide = () => {
        if (currentSlide === 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
    };

    // Initialize slider
    const init = () => {
        createDots();
        goToSlide(0);
    };

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            const { slide } = e.target.dataset;
            goToSlide(parseInt(slide));
        }
    });

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    init();
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', slider);

// Product Detail Page Functionality
if (window.location.pathname.includes('product-detail.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Get product from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const product = urlParams.get('product');
        
        // Product data (in a real app, this would come from an API)
        const products = {
            cutlery: {
                title: "Wooden Cutlery Set",
                price: "$24.99",
                description: "Our premium wooden cutlery set is perfect for picnics, parties, and everyday use. Each piece is handcrafted from sustainable bamboo, providing an eco-friendly alternative to plastic utensils.",
                features: [
                    "Set includes: knife, fork, spoon, and teaspoon",
                    "Made from 100% sustainable bamboo",
                    "Lightweight yet durable",
                    "Naturally antibacterial",
                    "Biodegradable and compostable"
                ],
                materials: "Sustainable bamboo",
                dimensions: "Knife: 7.5in, Fork: 6.8in, Spoon: 6.5in",
                care: "Hand wash with mild soap, dry immediately"
            },
            plate: {
                title: "Artisan Wooden Plate",
                price: "$32.99",
                description: "Handcrafted from reclaimed teak wood, this beautiful plate adds natural elegance to your dining experience. The unique grain patterns ensure no two plates are exactly alike.",
                features: [
                    "Made from reclaimed teak wood",
                    "Food-safe natural oil finish",
                    "Diameter: 10 inches",
                    "Dishwasher safe (hand wash recommended)",
                    "Naturally resistant to warping"
                ],
                materials: "Reclaimed teak wood",
                dimensions: "10 inch diameter, 0.75 inch height",
                care: "Hand wash with mild soap, occasionally treat with food-grade mineral oil"
            },
            // Add data for other products similarly
            chopsticks: {
                title: "Artisan Chopsticks",
                price: "$18.99",
                description: "These beautifully crafted chopsticks are made from sustainable birch wood, featuring a comfortable grip and smooth finish for the perfect dining experience.",
                features: [
                    "Set of 4 pairs",
                    "Made from sustainable birch wood",
                    "Lightweight and balanced",
                    "Naturally splinter-free",
                    "Hand-polished finish"
                ],
                materials: "Sustainable birch wood",
                dimensions: "9 inches long",
                care: "Hand wash and dry immediately"
            }
        };

        // Display product information
        if (product && products[product]) {
            const productData = products[product];
            document.querySelector('.product-title').textContent = productData.title;
            document.querySelector('.product-price').textContent = productData.price;
            document.querySelector('.product-description').textContent = productData.description;
            
            const featuresList = document.querySelector('.product-features');
            featuresList.innerHTML = '';
            productData.features.forEach(feature => {
                featuresList.innerHTML += `<li>${feature}</li>`;
            });
            
            document.querySelector('.materials .meta-value').textContent = productData.materials;
            document.querySelector('.dimensions .meta-value').textContent = productData.dimensions;
            document.querySelector('.care .meta-value').textContent = productData.care;
            
            // Set product images (in a real app, these would come from the database)
            document.querySelector('.main-image').src = `images/${product}.avif`;
            document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.src = `images/${product}-${index + 1}.avif`;
            });
        } else {
            // Product not found
            document.querySelector('.product-detail').innerHTML = `
                <div class="container" style="text-align: center; padding: 100px 0;">
                    <h2>Product Not Found</h2>
                    <p>Sorry, the product you're looking for doesn't exist.</p>
                    <a href="products.html" class="btn">Back to Products</a>
                </div>
            `;
        }

        // Thumbnail click event
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                document.querySelector('.main-image').src = this.src;
            });
        });

        // Quantity selector
        const quantityInput = document.querySelector('.quantity-selector input');
        document.querySelector('.quantity-selector .decrease').addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        document.querySelector('.quantity-selector .increase').addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    });
}