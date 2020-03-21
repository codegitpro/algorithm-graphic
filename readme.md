# Party Planning Pandemonium
In this project, your mission is to plan dinner parties for 144 people. This process is divided into two missions. The first one should take ~1-2 hours and the second should not take more than 30 minutes.

You will need to use node.js to complete this project. Intstructions for installation & execution are at the end of this file.

## Mission 1: Grouping

Plan to spend 3/4 of your time on this mission.

The goal of this mission is to suggest groups of enrich members who would make for a good dinner party if we group them together.

You should write a function to do this in `plan_parties.js`. Your output will be a CSV file with one line per dinner party.

### Member Information

Member information can be found in `members.json`. This is a JSON file with a list of members. Each member has the following form:

```javascript
{
    name: "Elizabeth Warren",
    level: 4, // Normalized level of their current position. 1-4, with 4 being the highest.
    department: "Operations", // Department that they work in
    numEmployees: 1000, // The number of employees in their current company
    company: "Rainbow Warrior Shipping", // Company name
    title: "COO",
    gender: "F",
    personality: "Extroverted", // "Very Introverted", "Introverted", "Average", "Extroverted", "Very Extroverted"
    interests: [
      {
        topic: "recruiting", // Topic namee
        interest: -1 // Interest level, i.e. howo much they want to discuss this topic. -2 to 2.
      },
      {
        topic: "company strategy",
        interest: 1
      },
      {
        topic: "difficult conversations",
        interest: 1
      }
    ]
}
```


### The ideal dinner party

 - Dinner parties are best with 6-8 people
 - Groups should have a theme so guests have context for the conversation. These themes can be level-based, department or interest-based, combinations, or anything else that you can suggest that participants would understand.
 - Guests want to meet new people
 - They want to learn from others
 - They want to contribute to conversations
 - They may want to discuss confidential topics

### Output format

When we run `npm run plan_parties`, your code should output a text file in markdown format to `suggested_dinners.md`:

```
# <Dinner theme (string)>
 - <Member Name>, <Title> @ <Company>. Interested in <list of interests>
 - <Member Name>, <Title> @ <Company>. Interested in <list of interests>
 - ...

# <Dinner theme>
 - <Member Name>, <Title> @ <Company>. Interested in <list of interests>
 - <Member Name>, <Title> @ <Company>. Interested in <list of interests>
 - ...

# ...
```

For example:

```
# CTOs
 - Elizabeth Warren, CTO @ Package.io. Interested in 1:1s and databases.
 - Pete Buttigieg, CTO @ Shadow Security. Interested in company strategy.
 - Andrew Yang, CTO @ Code for America. Interested in recruiting.
 - Mike Bloomberg, VP Eng @ Billionaire Tech. Interested in recruiting.
 - John Delaney, CTO @ ZenPolling. Interested in databases and company culture.
 - Tulsi Gabbard, CTO @ Rainbow Warrior Shipping. Interested in agile and difficult conversations.

# Recruiting
 - Bernie Sanders - Marketing Manager @ Code for America. Interested in recruiting.
 - Joe Biden - VP Sales @ Package.io. Interested in difficult conversations and recruiting.
 - Amy Klobuchar - CMO @ Code for America. Interested in recruiting and company culture.
 - Deval Patrick - VP Eng @ ZenPolling. Interested in recruiting.
 - Tom Steyer - COO @ Billionaire Tech. Interested in 1:1s and recruiting.
 - Michael Bennet - Managing Director @ Anschutz Investment Company. Interested in recruiting and 1:1s.
```

### Internal communication

After you're satisfied with your matching algorithm, write a human-readable description of how it works to explain to our non-engineer team members. This should be relatively short, e.g. 1-2 paragraphs. Write this in the file `algorithm_explanation.md`. During our interview, we will start our conversation here.

## Mission 2: Coordinating

Great job organizing groups! We now have a plan for the dinner parties next week. Now we need to make sure everyone knows where they are supposed to be an shows up on time.

Please write template emails for members for the following three scenarios:

 1. Inviting members to their dinners
 2. Reminding members about dinner
 3. Following-up after dinner to get member feedback

Put these in the three files in the `templates/` folder.

# Installing Node.js and running this project

If you don't already have Node.js installed on your computer, you can [download it here](https://nodejs.org/)

After installing node.js, open a terminal and navigate to where you you've cloned this repository.

To execute `plan_parties.js`, you can either run `npm run plan_parties` or `node ./plan_parties.js`
