// Initialize AOS
AOS.init();

updateAosAnimation();
// Function to update AOS animation direction based on screen width
function updateAosAnimation() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        if (window.innerWidth < 600) {
            if (element.getAttribute('data-aos') === 'fade-right') {
                element.setAttribute('data-aos', 'fade-left');
            }
        } else {
            if (element.getAttribute('data-aos') === 'fade-left') {
                element.setAttribute('data-aos', 'fade-right');
            } else if (element.getAttribute('data-aos') === 'fade-right') {
                element.setAttribute('data-aos', 'fade-left');
            }
        }
    });

    // Reinitialize AOS to apply the changes
    AOS.refresh();
}


// Update AOS animation on page load and window resize
window.addEventListener('resize', updateAosAnimation);
window.addEventListener('load', updateAosAnimation);


// document.querySelectorAll('.cover').forEach((cover)=>{
//     cover.addEventListener('click',()=>{
//         cover.style.display = "none"
        
//     })
// })


const firstCover = document.querySelector('.cover');
const secondCover = document.querySelector('.time-line .cover');
    
if (firstCover) {
    // Add click event listener to the first cover
    firstCover.addEventListener('click', () => {
        console.log('clicked')
        // Use a fade-out transition before hiding the cover
        firstCover.style.transition = 'opacity 0.5s ease-out';
        firstCover.style.opacity = '0';
        secondCover.style.transition = 'opacity 0.5s ease-out';
        secondCover.style.opacity = '0';
       
        // Remove the cover after the transition
        setTimeout(() => {
            firstCover.style.display = 'none';
            secondCover.style.display = 'none';
            
        }, 500); // Match the duration of the transition
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.querySelector('.typeMain');
    const paragraphT = document.querySelector('.typeSecond');   
    const courtSection = document.querySelector('.court');
    const text = `The year 2029-2020 was the year we have met, since then my life has been brighter and better. It wasn't apparent for me if what would happen to my life if we have not met but I'm guessing that it  would be probably lonely as hell. That is why I am so thankful that I met you because if not then I would be a loner guy. 

	We've been together for almost for years now and to tell you honestly that you have brought so much happiness and love into my life, that is something that I have felt for the first time in my life. Knowing you in that time span was enough. Your laughter, your kindness, your soft heart, your pretty face, and of course you love have made me a better person and I can tell myself that I am changing for the better.
`;
    const text2 = `
I admit that I have been a bad boyfriend  in the early phase of our relationship and I really feel sorry for not treating you in the right way. I have learned and I'm still learning to be a better man for you and for us. A lot of things have happened to us lately that led us to split, it was my fault. Now, you will know the purpose of this website that I created.

Today, I want to do something but it is more like a redo. I've created this website for you to express how I feel towards you and to ask you something that I have been thinking in my mind and in my heart. 

(Scroll down to view)

`
    let speed = 30; // Speed of typing effect

    function typeWriter(element, text, index, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(element, text, index + 1, callback), speed);
        } else if (callback) {
            callback();
        }
    }

    function typeWriterSecond(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriterSecond(element, text, index + 1), speed);
        }
    }

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start typewriter effect when court section is in view
                typeWriter(paragraph, text, 0, () => {
                    // After the first typewriter effect completes, start the second one
                    typeWriterSecond(paragraphT, text2, 0);
                });

                // Stop observing after the effect starts
                observer.unobserve(courtSection);
            }
        });
    }, {
        threshold: 0.5 // Adjust this value as needed
    });

    // Start observing the court section
    observer.observe(courtSection);
});

document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noBtn');
    const container = document.querySelector('.court-container');

    function randomizeButtonPosition() {
        // Get container dimensions
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Get button dimensions
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        // Calculate max x and y positions
        const maxX = containerWidth - buttonWidth;
        const maxY = containerHeight - buttonHeight;

        // Generate random positions
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Set new position
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    // Initialize button position
    noButton.style.position = 'absolute';

    // Randomize position on page load
    randomizeButtonPosition();

    // Randomize position on button click
    noButton.addEventListener('mouseover', randomizeButtonPosition);
    noButton.addEventListener('click', randomizeButtonPosition);
});


const modal = document.getElementById('modal');
const filter = document.querySelector('.filter')

document.getElementById('yesBtn').addEventListener('click', function() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    modal.style.display = 'block'
    filter.style.display = 'block'

    filter.addEventListener('click', ()=>{
        modal.style.display = 'none'
        filter.style.display = 'none'
    })
    
    // Append the canvas to the container
    const container = document.getElementById('canvas-container');
    container.innerHTML = ''; // Clear any existing content
    container.appendChild(canvas);

    // Set canvas size to match the container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Create confetti effect
    const confetti = window.confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    confetti({
        particleCount: 1400,
        spread: 5100,
        origin: { y: 0.4 }
    });
});

