const speakBtn = document.querySelector('#speak-btn');
const resultDiv = document.querySelector('#result');
const spokenDiv = document.querySelector('#spoken-text');

speakBtn.addEventListener('click', () => {
    // obtain audio from the microphone
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
        const query = event.results[0][0].transcript;
        console.log('Speech recognition result:', query);

        spokenDiv.textContent = query;

        // calculate the answer locally
        const calculation = query.replace(/plus/gi, '+').replace(/minus/gi, '-').replace(/times|multiplied by/gi, '*').replace(/divided by/gi, '/');
        let result;
        try {
            result = eval(calculation);
            console.log('Local calculation result:', result);
        } catch (error) {
            console.error('Error in local calculation:', error);
        }

        // display the result on the webpage
        resultDiv.textContent = result ?? 'Sorry, I did not understand the calculation.';

        // convert the answer to speech using Google Text-to-Speech
        const outputUrl = 'https://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(resultDiv.textContent) + '&tl=en&client=tw-ob';
        const audio = new Audio(outputUrl);
        audio.play();
    };
    recognition.start();
});
