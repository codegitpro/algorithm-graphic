Write a template reminder email here. Use any templating language you like. If you don't have a preference, handlebars works fine.

```js
// handlebars.js template

let source = `
    <p>Dear {{guestName}},</p>
    <p>
        This is a reminder to confirm your attendance at our dinner party.
    </p>
    <p>
        The dinner party will take place at {{date}}.
        The address of the hall where the dinner party will be held is {{place}}.
    </p>
    <p>Thank you for your attendance,</p>
    <p>Sincerely,</p>
    <p>
        {{senderName}}
        <br/>
        {{senderEmail}}
        <br/>
        {{senderPhoneNo}}
    </p>
`;
let template = Handlebars.compile(source);

let data = {
    guestName: 'Alan',
    date: '4pm in the afternoon on the 25th of March on Wednesday',
    place: 'Hotel California',
    senderName: 'Beck',
    senderEmail: 'beck@gmail.com',
    senderPhoneNo: '123456789'
};
let result = template(data);
```