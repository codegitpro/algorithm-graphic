Write a template follow-up email here. Use any templating language you like. If you don't have a preference, handlebars works fine.

```js
// handlebars.js template

let source = `
    <p>Dear {{guestName}},</p>
    <p>
        It was great meeting you at the dinner party in {{place}} last night.
        We enjoyed hearing your story and learning about how your business is growing.
    </p>
    <p>We want to follow up with you regarding our previous dinner party.</p>
    <p>
        To help you, we've prepared a quick survey that'll take you less than 60 seconds to answer.
    </p>
    <p>{{surveyLink}}
    <p>We appreciate your time and we value your feedback.</p>
    <p>Kind Regards,
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
    place: 'Hotel California',
    surveyLink: 'https://docs.google.com/123',
    senderName: 'Beck',
    senderEmail: 'beck@gmail.com',
    senderPhoneNo: '123456789'
};
let result = template(data);
```