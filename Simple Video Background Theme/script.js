window.onload = enableSwitch();

let last = 0;
const messages = [ "a Developer", "a Musician", "an Explorer", "a Student", "a Motivator", "a Traveler", "an Adventurer", "a Creator", "a Coder", "an Innovator" ];

function enableSwitch() {
    setInterval( async () => {
        const element = document.getElementsByClassName('js-text')[0];
        element.classList.toggle('fade');
        await wait();

        if(last > messages.length - 2) {
            last = 0;
        } else {
            last = last + 1;
        }
        element.textContent = messages[last];
        element.classList.toggle('fade');
    }, 4000)
};

function wait() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, 1000);
    })
}
