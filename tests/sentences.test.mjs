import test from 'node:test';
import assert from 'node:assert/strict';
import { sentenceQuestions, gradeSentences } from '../lib/sentences.mjs';
import { verbs } from '../lib/verbs.mjs';

test('worksheet has ten unique questions using verbs from the original list', () => {
  assert.equal(sentenceQuestions.length, 10);
  assert.equal(new Set(sentenceQuestions.map(q => q.id)).size, 10);
  assert.ok(sentenceQuestions.every(q => verbs.some(v => v.id === q.id) && q.before && q.after && q.explanation));
});
test('all full conjugations are correct, with case and whitespace normalization', () => {
  const input = [' IS   BEGINNING ', 'were catching', 'dreamed', 'are falling', 'hung', 'sleeps', 'stuck', 'were fighting', 'froze', 'will bring'];
  assert.deepEqual(gradeSentences(input), Array(10).fill(true));
  input[2] = 'dreamt';
  assert.ok(gradeSentences(input)[2]);
});
test('rejects missing or repeated auxiliaries, incorrect agreement, and partial guesses', () => {
  const input = ['beginning', 'was catching', 'dream', 'falling', 'hanged', 'sleep', 'has stuck', 'fighting', 'frozen', 'will brought'];
  assert.deepEqual(gradeSentences(input), Array(10).fill(false));
  assert.deepEqual(gradeSentences([]), Array(10).fill(false));
  input[2] = 'dreamt / wrong';
  assert.equal(gradeSentences(input)[2], false);
});
