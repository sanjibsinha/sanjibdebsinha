/**
 * Dynamic Typing Effect Script
 * This script creates a typewriter-like animation for a designated element on the page,
 * cycling through a predefined list of texts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Array of strings to be typed out. These describe your roles and interests.
    const textsToType = [
        "Author",
        "AI Researcher",
        "Linux Programmer",
        "Technologist"
    ];

    // Configuration for the typing animation speed and delays.
    const typingSpeed = 100;        // Time in ms between each character being typed.
    const deletingSpeed = 50;         // Time in ms between each character being deleted.
    const delayBetweenTexts = 2000;   // Pause in ms after a text is fully typed before deleting.

    // Get the HTML element where the text will be displayed.
    const typingTextElement = document.getElementById('typing-text');
    
    // Safety check to ensure the element exists before running the script.
    if (!typingTextElement) {
        console.error("Error: The element with ID 'typing-text' was not found in the DOM.");
        return;
    }

    // State variables to track the animation's progress.
    let textArrayIndex = 0; // Current index for the 'textsToType' array.
    let charIndex = 0;      // Current character index in the current string.
    let isDeleting = false; // Flag to indicate if the animation is in a 'deleting' state.

    /**
     * The main function that drives the typing animation.
     * It is called recursively using setTimeout to create a continuous loop.
     */
    function animateTyping() {
        const currentText = textsToType[textArrayIndex];
        
        // Determine whether to type the next character or delete the previous one.
        if (isDeleting) {
            // Remove one character at a time.
            charIndex--;
            typingTextElement.textContent = currentText.substring(0, charIndex);
        } else {
            // Add one character at a time.
            charIndex++;
            typingTextElement.textContent = currentText.substring(0, charIndex);
        }

        // --- Logic to switch between typing, pausing, and deleting ---

        // Condition 1: If the current word is fully typed.
        if (!isDeleting && charIndex === currentText.length) {
            // Set a long pause, then switch to deleting mode.
            setTimeout(() => {
                isDeleting = true;
                animateTyping();
            }, delayBetweenTexts);
            return; // Exit the function to wait for the delay.
        } 
        
        // Condition 2: If the current word is fully deleted.
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to the next word in the array, looping back to the start if at the end.
            textArrayIndex = (textArrayIndex + 1) % textsToType.length;
        }

        // Determine the speed for the next character animation.
        const animationSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        // Call the function again after the calculated delay.
        setTimeout(animateTyping, animationSpeed);
    }

    // Start the animation process.
    animateTyping();
});

