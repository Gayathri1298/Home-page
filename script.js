const sectionsWrapper = document.querySelector('.sections-wrapper');

// Variables to track dragging state
let isDragging = false;
let startX;
let initialTranslateX = 0;
let currentTranslateX = 0;

// Get the width of a single section
const sectionWidth = sectionsWrapper.querySelector('.section').offsetWidth;
const maxTranslateX = -(sectionWidth * (sectionsWrapper.children.length - 3)); // Limit dragging to last section

// Mouse down event to initiate dragging
sectionsWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    initialTranslateX = currentTranslateX;
    sectionsWrapper.classList.add('grabbing');
});

// Mouse move event to handle drag movement
sectionsWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Only run if dragging
    e.preventDefault();
    
    // Calculate drag distance
    const dragDistance = e.pageX - startX;
    
    // Calculate the new translate value
    let newTranslateX = initialTranslateX + dragDistance;
    
    // Prevent dragging beyond the first or last section
    if (newTranslateX > 0) {
        newTranslateX = 0; // Stop at section 1
    } else if (newTranslateX < maxTranslateX) {
        newTranslateX = maxTranslateX; // Stop at the last section
    }
    
    // Apply the transform
    sectionsWrapper.style.transform = `translateX(${newTranslateX}px)`;
    
    // Store the current translate value
    currentTranslateX = newTranslateX;
});

// Mouse up event to stop dragging
sectionsWrapper.addEventListener('mouseup', () => {
    isDragging = false;
    sectionsWrapper.classList.remove('grabbing');
});

// Mouse leave event to stop dragging when cursor leaves the wrapper
sectionsWrapper.addEventListener('mouseleave', () => {
    isDragging = false;
    sectionsWrapper.classList.remove('grabbing');
});


