import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';

// set your API endpoint and API key
Amplify.configure({
    "API": {
        "Events": {
            "endpoint": "https://<YOUR_APPSYNC_ENDPOINT>/event",
            "region": "us-east-1",
            "defaultAuthMode": "apiKey",
            "apiKey": "<YOUR_API_KEY>"
        }
    }
});

const channel = await events.connect('/default/test');
channel.subscribe({
    next: (data) => {
        document.getElementById("eventsLog").insertAdjacentText("beforeend", data.event.message + '\n');
    },
    error: (err) => console.error('error', err),
});

window.publishEvent = () => {
    const message = document.getElementById('messageId');
    events.post('/default/test', { message: message.value });
    message.value = "";
}