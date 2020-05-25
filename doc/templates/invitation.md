Write a template invitation email here. Use any templating language you like. If you don't have a preference, handlebars works fine.

```js
// handlebars.js template

let source = `
    <p>Dear {{guestName}},</p>
    <p>
        We are pleased and honored to invite you to join our dinner party on {{date}} at the {{place}}.
    </p>
    <p>
        Kindly give us a confirmation of your attendance by {{confirmDate}}.
    </p>
    <p>Looking forward to seeing you,</p>
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
    date: 'March 25, 2020',
    place: 'Hotel California',
    senderName: 'Beck',
    senderEmail: 'beck@gmail.com',
    senderPhoneNo: '123456789'
};
let result = template(data);
```