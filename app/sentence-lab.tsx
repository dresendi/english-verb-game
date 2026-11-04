'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { gradeSentences, sentenceQuestions } from '../lib/sentences.mjs';

export default function SentenceLab({ onBack, onComplete, ready }: { onBack: () => void; onComplete: (score: number) => void; ready: boolean }) {
  const [answers, setAnswers] = useState<string[]>(() => sentenceQuestions.map(() => ''));
  const [results, setResults] = useState<boolean[] | null>(null);
  const submitted = useRef(false);
  const summary = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const completed = answers.filter(a => a.trim()).length;
  const score = results?.filter(Boolean).length ?? 0;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitted.current || !ready || completed !== sentenceQuestions.length) return;
    submitted.current = true;
    const graded = gradeSentences(answers);
    setResults(graded);
    onComplete(graded.filter(Boolean).length);
    requestAnimationFrame(() => { summary.current?.focus(); summary.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); });
  }

  function retry() {
    submitted.current = false;
    setResults(null);
    setAnswers(sentenceQuestions.map(() => ''));
    requestAnimationFrame(() => firstInput.current?.focus());
  }

  return <section className="sentence-lab" aria-labelledby="sentence-title">
    <button className="text-button" onClick={onBack}><ArrowLeft size={18} /> Back to adventure</button>
    <div className="sentence-banner"><span className="sentence-mascot" aria-hidden="true">🎃</span><div><span className="eyebrow">10 SENTENCES · A LITTLE GRAMMAR MAGIC</span><h1 id="sentence-title">Spooky Sentence Lab</h1><p>Complete each sentence with the correct form of the verb in parentheses.</p></div></div>
    <div className="sentence-instructions"><BookOpen size={20} /><p>Use the tense shown for each sentence. Include helping words such as <strong>is, are, was, were, or will</strong> when they belong in the blank. If a helping word is already printed, do not repeat it. Write full forms, without contractions.</p></div>
    <div className="sentence-meter"><span>{completed} of 10 completed</span><span>10 XP per correct answer</span><progress value={completed} max={10} aria-label="Sentences completed" /></div>
    <div ref={summary} tabIndex={-1} className={results ? 'sentence-summary' : ''} role="status" aria-live="polite">{results && <><Sparkles size={26} /><h2>{score === 10 ? 'Ten out of ten. Spellbinding!' : 'Every sentence is a new discovery!'}</h2><p><strong>{score} / 10 correct · +{score * 10} XP</strong></p><p>Read the explanations below, then try again when you’re ready.</p></>}</div>
    <form onSubmit={submit}>
      <ol className="sentence-list">{sentenceQuestions.map((q, index) => <li key={q.id} className={results ? results[index] ? 'sentence-correct' : 'sentence-incorrect' : ''}>
        <div className="sentence-row-heading"><span className="sentence-number">{index + 1}</span><span className="sentence-tense">{q.tense}</span>{results && <span className="sentence-verdict">{results[index] ? '✓ Correct' : 'Let’s learn this one'}</span>}</div>
        <label htmlFor={`sentence-${q.id}`} className="sentence-text"><span>{q.before} </span><input id={`sentence-${q.id}`} ref={index === 0 ? firstInput : undefined} aria-label={`Question ${index + 1}: ${q.id}, ${q.tense}`} aria-describedby={`sentence-context-${q.id}${results ? ` sentence-feedback-${q.id}` : ''}`} required maxLength={60} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="Complete the verb…" value={answers[index]} disabled={!!results} aria-invalid={results ? !results[index] : undefined} onChange={e => setAnswers(previous => previous.map((value, i) => i === index ? e.target.value : value))} /><span> {q.after} <strong className="sentence-base">({q.id})</strong></span></label>
        <span className="sr-only" id={`sentence-context-${q.id}`}>{q.before} blank {q.after} Use {q.tense}.</span>
        {results && <div id={`sentence-feedback-${q.id}`} className="sentence-explanation"><strong>{results[index] ? 'Well done!' : `Answer: ${q.answers.join(' / ')}`}</strong><p>{q.explanation}</p></div>}
      </li>)}</ol>
      {results ? <div className="result-buttons"><button className="primary" type="button" onClick={retry}><RotateCcw size={17} /> Try all 10 again</button><button className="secondary" type="button" onClick={onBack}>Back to adventure <ArrowRight size={16} /></button></div> : <div className="sentence-submit"><p>Take your time. You can change any answer before checking.</p><button className="primary" type="submit" disabled={!ready}><CheckCircle2 size={18} /> Check my 10 answers</button></div>}
    </form>
  </section>;
}
