const rows = `awake|awoke|awaken|Wake up after sleeping
be|was/were|been|Exist, or describe who or how someone is
beat|beat|beaten|Defeat someone in a game
begin|began|begun|Start something
bite|bit|bitten|Use your teeth on an apple
blow|blew|blown|Push air out of your mouth
break|broke|broken|Damage something so it falls into pieces
bring|brought|brought|Carry something toward another person
build|built|built|Construct something with blocks
buy|bought|bought|Get something in exchange for money
catch|caught|caught|Grab a moving ball before it falls
choose|chose|chosen|Pick one of two or more options
come|came|come|Move toward the person calling you
cost|cost|cost|Have a particular price
cut|cut|cut|Divide paper using scissors
do|did|done|Perform a task or activity
deal|dealt|dealt|Distribute playing cards to players
dig|dug|dug|Make a hole in the ground
dream|dreamt/dreamed|dreamt/dreamed|Experience imaginary adventures while asleep
draw|drew|drawn|Create a picture with a pencil
drink|drank|drunk|Swallow water from a glass
drive|drove|driven|Control a car on the road
eat|ate|eaten|Have food for a meal
fall|fell|fallen|Drop down toward the ground
feed|fed|fed|Give food to an animal
feel|felt|felt|Experience a sensation, such as softness
fight|fought|fought|Battle against an opponent
find|found|found|Discover something that was missing
fly|flew|flown|Move through the air like a bird
forget|forgot|forgotten|Fail to remember something
forgive|forgave|forgiven|Stop being angry with someone for a mistake
freeze|froze|frozen|Turn water into ice
get|got|gotten/got|Receive something
give|gave|given|Hand a gift to someone
go|went|gone|Travel away to another place
grow|grew|grown|Become bigger or taller
hang|hung|hung|Suspend a coat from a hook
have|had|had|Own or possess something
hear|heard|heard|Notice a sound with your ears
hide|hid|hidden|Stay where others cannot see you
hit|hit|hit|Make contact with a ball using a bat
hold|held|held|Keep something gently in your arms
hurt|hurt|hurt|Cause or experience pain
keep|kept|kept|Save something and not give it away
know|knew|known|Have information or understand an answer
lay|laid|laid|Place something down flat
lead|led|led|Guide other people along a path
leave|left|left|Depart from a place
lend|lent|lent|Give something temporarily, expecting it back
let|let|let|Allow someone to do something
lie|lay|lain|Rest your body flat on a blanket
lose|lost|lost|Be unable to locate something you had
make|made|made|Create something, such as a clay pot
mean|meant|meant|Have a particular meaning or represent an idea
meet|met|met|Come together with another person
pay|paid|paid|Give money to settle a bill
put|put|put|Move something into a particular place
quit|quit/quitted|quit/quitted|Stop doing an activity
read|read|read|Look at written words and understand them
ride|rode|ridden|Travel on a bicycle
ring|rang|rung|Make a bell sound
rise|rose|risen|Move upward, like the morning sun
run|ran|run|Move quickly on your feet
say|said|said|Express words aloud
see|saw|seen|Notice something with your eyes
seek|sought|sought|Try to discover something by searching
sell|sold|sold|Offer something in exchange for money
send|sent|sent|Arrange for a letter to travel to someone
set|set|set|Arrange plates and cutlery on a table
sew|sewed|sewn/sewed|Join cloth using a needle and thread
shake|shook|shaken|Move something quickly back and forth
shine|shone/shined|shone/shined|Give out a bright light
shoot|shot|shot|Throw a basketball toward the hoop
show|showed|shown/showed|Display a picture so others can look at it
sing|sang|sung|Make music with your voice
sink|sank/sunk|sunk|Go down below the surface of water
sit|sat|sat|Rest on a chair
sleep|slept|slept|Rest with your eyes closed at night
slide|slid|slid|Move smoothly down a playground ramp
speak|spoke|spoken|Talk or give a speech
spend|spent|spent|Use money to purchase things
spread|spread|spread|Cover bread with a layer of jam
stand|stood|stood|Be upright on your feet
steal|stole|stolen|Take something without permission
stick|stuck|stuck|Attach a sticker to a notebook
strike|struck|stricken/struck|Hit suddenly, as lightning does
swear|swore|sworn|Make a serious promise
sweep|swept|swept|Clean the floor with a broom
swell|swelled|swollen/swelled|Become larger or puff up
swim|swam|swum|Move through water using your arms and legs
swing|swung|swung|Move back and forth on a playground seat
take|took|taken|Pick up an apple from a bowl
teach|taught|taught|Help someone learn something
tear|tore|torn|Rip a sheet of paper into pieces
tell|told|told|Share a story or information with someone
think|thought|thought|Use your mind to consider an idea
wear|wore|worn|Have clothes on your body
weep|wept|wept|Cry with tears
win|won|won|Finish first or earn a victory
write|wrote|written|Form words on paper with a pencil`;
export const verbs = rows.split('\n').map((row, index) => {
  const [base, past, participle, clue] = row.split('|');
  return { id: base, base, past, participle, clue, index, world: Math.floor(index / 10), sheet: Math.floor(index / 25), cell: index % 25 };
});
// The worksheet prints 'awaken'; 'awoken' is the participle of awake.
verbs[0].participle = 'awoken/awaked';
verbs[0].past = 'awoke/awaked';
export const worlds = ['First steps', 'Creative sparks', 'Everyday magic', 'Little adventures', 'Bright ideas', 'New connections', 'Out & about', 'Make some magic', 'Brave moves', 'Dream big'];
export const normalize = value => value.trim().toLowerCase().replace(/\s+/g, ' ');
export const accepts = (value, expected) => {
  const candidates = normalize(value).split(/\s*[/,]\s*/);
  const valid = expected.split('/');
  return candidates.length > 0 && candidates.every(x => x && valid.includes(x));
};
export function makeRound(pool, mode, tense = 'mixed', random = Math.random) {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  return shuffled.slice(0, 10).map(verb => ({ verb, form: mode === 'trio' ? 'past' : tense === 'mixed' ? ['base', 'past', 'participle'][Math.floor(random() * 3)] : tense }));
}
