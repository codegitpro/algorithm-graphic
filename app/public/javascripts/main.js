'use strict'
const fs = require('fs');
let members = require('./members');

const clusterByTheme = theme => members => {
    let clusters = {};
    members.forEach(m => {
        let key = m[theme];
        if (!key) {
            key = 'NAN';
        }

        if (!clusters[key]) {
            clusters[key] = [];
        }
        clusters[key].push(m);
    });

    return Object.values(clusters).flat();
}

const getThemeInGroup = theme => group => {
    const firstMemberTheme = group[0][theme];
    return !group.some(m => m[theme] != firstMemberTheme) && firstMemberTheme;
}

const getLevelInGroup = group => {
    const firstMemberLevel = group[0]['level'];
    return !group.some(m => m['level'] != firstMemberLevel) && `Level ${firstMemberLevel}`;
}

const getInterestsInGroup = group => {
    let interests = [];
    group.forEach(m => {
        m.interests.forEach(item => {
            if (item.interest > 0 && !interests.includes(item.topic)) {
                interests.push(item.topic);
            }
        })
        
    });

    interests = interests.filter(item => !group.some(m => {
        for (let memberInterest of m.interests) {
            if (memberInterest.topic == item && memberInterest.interest > 0) {
                return false;
            }
        }
        return true;
    }))
    interests.sort();
    return interests.join(', ');
}

const scoreForGroupByTheme = theme => group => {
    const groupLength = group.length;
    let counts = {};
    group.forEach(m => {
        counts[m[theme]] = (counts[m[theme]] || 0) + 1;
    });

    let score = 0;
    for (let k in counts) {
        if (counts[k] > 1) {
            score += 10 ** ((counts[k] - groupLength) + 8);
        }
        
    }
    return score;
}

const scoreForGroupByInterests = group => {
    const groupLength = group.length;
    let counts = {};
    group.forEach(m => {
        m.interests.forEach(item => {
            let interest =  counts[item.topic] || 0;
            if (item.interest > 0) {
                interest += 1;
            } else if (item.interest < 0) {
                interest -= 2;
            }
            counts[item.topic] = interest;
        });
    });

    

    let score = 0;
    for (let k in counts) {
        if (counts[k] > 1) {
            score += 10 ** ((counts[k] - groupLength) + 8);
        }
        
    }
    return score;
}

const getGroupScore = (group, themes) => {
    return themes.reduce((sum, t) => sum + t.score(group), 0);
}

const THEMES = [
    {
        name: 'department',
        cluster: clusterByTheme('department'),
        check: getThemeInGroup('department'),
        score: scoreForGroupByTheme('department'),
    },

    {
        name: 'level',
        cluster: clusterByTheme('level'),
        check: getLevelInGroup,
        score: scoreForGroupByTheme('level'),
    },

    {
        name: 'title',
        cluster: clusterByTheme('title'),
        check: getThemeInGroup('title'),
        score: scoreForGroupByTheme('title'),
    },

    {
        name: 'interests',
        check: getInterestsInGroup,
        score: scoreForGroupByInterests,
    }
    
];

const initializeGroups = () => {
    const length = members.length;
    let groups = [];
    for (let i = 0; i < (length / 6); i++) {
        let group = [];
        for (let j = 0; j < 6; j++) {
            members[i * 6 + j].group = group;
            group.push(members[i * 6 + j]);
        }
        
        groups.push(group);
        
    }
    let j = 0;
    for (let i = Math.floor(length / 6) * 6; i < length; i++) {
        members[i].group = groups[j];
        groups[j].push(members[i]);
        j++
    
    }
    
    return groups;
}

const arrangeForGroups = (members, themes) => {
    const length = members.length;
    const MINSCORE = 10 ** 8;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            if (members[i].group === members[j].group) {
                continue;
            }
            let originalScore1 = getGroupScore(members[i].group, themes);
            let originalScore2 = getGroupScore(members[j].group, themes);
            let originalMinCount = (originalScore1 >= MINSCORE ? 1 : 0) + (originalScore2 >= MINSCORE ? 1 : 0)

            let newScore1 = getGroupScore([...members[i].group.filter(m => m !== members[i]), members[j]], themes);
            let newScore2 = getGroupScore([...members[j].group.filter(m => m !== members[j]), members[i]], themes);
            let newMinCount = (newScore1 >= MINSCORE ? 1 : 0) + (newScore2 >= MINSCORE ? 1 : 0)

            
            
            if (newMinCount > originalMinCount || newScore1 + newScore2 > originalScore1 + originalScore2) {
                // replace;
                let group1 = members[i].group;
                let group2 = members[j].group;
                for (let index = 0; index < group1.length; index++) {
                    if (group1[index] == members[i]) {
                        members[j].group = group1;
                        group1[index] = members[j];
                    }
                }
                for (let index = 0; index < group2.length; index++) {
                    if (group2[index] == members[j]) {
                        members[i].group = group2;
                        group2[index] = members[i];
                    }
                }

            }
        }
    }
}

exports.plan_parties = async function () {
    let groups = initializeGroups();
    for (let i = 0; i < 10; i++) {
        arrangeForGroups(members, THEMES);
    }
    
    let lines = [];
    for (let group of groups) {
        let titles = [];
        for (let theme of THEMES) {
            
            let title = theme.check(group);
            if (title) {
                titles.push(title);
            }
        }
        let groupTitle = titles.join(', ');
        lines.push(`# ${groupTitle}`);
        for (let member of group) {
            let interests = member.interests.filter(item => item.interest > 0).map(item => item.topic);
            let interestText = false;
            let length = interests.length;
            if (length == 1) {
                interestText = interests[0];
            } else {
                interestText = interests.slice(0, -1).join(', ') + ' and ' + interests[length - 1];
            }
            if (interestText) {
                interestText += ` Interested in ${interestText}`;
            }
            let line = ` - ${member['name']}, ${member['title']} @ ${member['company']}${interestText}`;
            lines.push(line);
        }
        lines.push('');
    }

    
    fs.writeFile('suggested_dinners.md', lines.join("\n"), (err) => {
        if (err) console.log(err);
        console.log('Group info saved!');
    });
    
    
}

// These lines allow your function to be called from the command line.
if (require.main === module) {
  exports.plan_parties()
}
