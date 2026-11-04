import { normalize } from './verbs.mjs';

export const sentenceQuestions = [
  { id: 'begin', before: 'Look! The spooky parade', after: 'at the creaky front door right now.', tense: 'Present continuous', answers: ['is beginning'], explanation: 'Use is + verb-ing for an action happening now. Begin doubles its final n: beginning.' },
  { id: 'catch', before: 'At eight last night, the sticky spiderwebs', after: 'glowing green beetles.', tense: 'Past continuous', answers: ['were catching'], explanation: 'Use were + verb-ing for an action in progress at a past time. Spiderwebs is plural.' },
  { id: 'dream', before: 'Last night, the friendly mummy', after: 'about a castle made of candy.', tense: 'Past simple', answers: ['dreamt', 'dreamed'], explanation: 'Last night marks a finished past time. Dreamt and dreamed are both correct.' },
  { id: 'fall', before: 'Watch out! The apples', after: 'from the spooky tree right now.', tense: 'Present continuous', answers: ['are falling'], explanation: 'Use are + verb-ing for an action happening now with a plural subject: the apples.' },
  { id: 'hang', before: 'Yesterday, the decorators', after: 'paper bats across the porch.', tense: 'Past simple', answers: ['hung'], explanation: 'Yesterday calls for the past simple. The past of hang, meaning suspend decorations, is hung.' },
  { id: 'sleep', before: 'The little dragon', after: 'in its cozy cave every night.', tense: 'Present simple', answers: ['sleeps'], explanation: 'Every night describes a habit. Add -s with a singular third-person subject: the dragon sleeps.' },
  { id: 'stick', before: 'The brave explorer has already', after: 'a shiny star onto her cape.', tense: 'Present perfect', answers: ['stuck'], explanation: 'Has is already in the sentence. Complete has + past participle with stuck.' },
  { id: 'fight', before: 'When the bell rang, the playful monsters', after: 'over the last piece of candy.', tense: 'Past continuous', answers: ['were fighting'], explanation: 'Use were fighting for the action that was already in progress when the bell rang.' },
  { id: 'freeze', before: 'The children', after: 'in surprise when the plastic skeleton jumped out yesterday.', tense: 'Past simple', answers: ['froze'], explanation: 'This is a completed past event. Freeze changes to froze in the past simple.' },
  { id: 'bring', before: 'I promise I', after: 'a pumpkin to the school party tomorrow.', tense: 'Future simple (will)', answers: ['will bring'], explanation: 'Use will + the base form for a promise about the future: will bring.' },
];

// Grade a single complete phrase, not a list of guesses or an answer substring.
export function gradeSentences(answers) {
  return sentenceQuestions.map((question, index) => question.answers.includes(normalize(answers[index] || '')));
}
