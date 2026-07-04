"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  { text: "Do you have pain in multiple areas of your body that shifts location?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Do things that shouldn't hurt cause pain — like light touch, clothing, or being hugged?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Do you feel exhausted even after a full night's sleep?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Are you sensitive to bright lights, loud noises, or strong smells?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Does stress or emotional upset make your pain significantly worse?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Do you experience brain fog — trouble concentrating, remembering, or thinking clearly?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Have medical tests (X-rays, MRIs, blood work) come back normal despite your pain?", options: [{ label: "Not applicable / haven't tested", value: 0 }, { label: "Yes, but I still have pain", value: 3 }, { label: "Minor findings that don't explain the pain", value: 2 }, { label: "Tests found a clear cause", value: 0 }] },
  { text: "Do you have multiple conditions from this list? (fibromyalgia, IBS, migraines, TMJ, chronic back pain, pelvic pain, restless legs, interstitial cystitis, chronic fatigue)", options: [{ label: "None", value: 0 }, { label: "1 condition", value: 1 }, { label: "2 conditions", value: 2 }, { label: "3 conditions", value: 3 }, { label: "4 or more", value: 4 }] },
  { text: "Does physical activity trigger pain flare-ups that last for hours or days?", options: [{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }] },
  { text: "Have treatments targeting the body (surgery, injections, physical therapy, chiropractic) failed to help or made pain worse?", options: [{ label: "Never tried them", value: 0 }, { label: "They helped significantly", value: 0 }, { label: "Helped a little but pain returned", value: 2 }, { label: "No improvement", value: 3 }, { label: "Made things worse", value: 4 }] },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [done, setDone] = useState(false);

  const select = (i: number) => {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 200);
    }
  };

  const total = answers.reduce((sum: number, a, i) => a !== null ? sum + questions[i].options[a].value : sum, 0);

  const getInterpretation = () => {
    if (total <= 10) return { range: "Low (0–10) — Minimal indicators", html: <><p>Your responses suggest fewer indicators of central sensitization. This doesn't mean your pain isn't real — it may have a different mechanism, or it may simply not fit the neuroplastic pattern strongly.</p><p>If you're in pain, it's still worth discussing with a healthcare provider.</p></> };
    if (total <= 20) return { range: "Mild (11–20) — Some indicators", html: <><p>Some features consistent with central sensitization. Moderate signal — worth exploring.</p><p>Start with the <Link href="/intro/what-is" className="text-blue-600 hover:underline">intro guides</Link> and <Link href="/intro/science" className="text-blue-600 hover:underline">science page</Link>. If the evidence resonates, explore <Link href="/protocols/prt" className="text-blue-600 hover:underline">PRT techniques</Link>.</p></> };
    if (total <= 30) return { range: "Moderate (21–30) — Significant indicators", html: <><p>Significant pattern of central sensitization. Neuroplastic mechanisms are likely playing an important role.</p><p>Dive into the <Link href="/protocols/prt" className="text-blue-600 hover:underline font-semibold">PRT protocol</Link> or <Link href="/protocols/schubiner" className="text-blue-600 hover:underline font-semibold">Schubiner's method</Link>. The landmark PRT trial showed 66% pain-free rates.</p></> };
    return { range: "High (31–40) — Strong indicators", html: <><p>Strongly suggests central sensitization — common in fibromyalgia, chronic widespread pain, and related syndromes. Well-studied and highly treatable.</p><p><strong>You're in the right place.</strong> Start with the <Link href="/intro/what-is" className="text-blue-600 hover:underline">intro guide</Link>, then work through the <Link href="/protocols/prt" className="text-blue-600 hover:underline">PRT protocol</Link>. Consider finding a <Link href="/resources" className="text-blue-600 hover:underline">PRT-trained practitioner</Link>. The JAMA trial showed 66% recovery in 4 weeks.</p></> };
  };

  const restart = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrent(0);
    setDone(false);
  };

  const pct = Math.round(((current + 1) / questions.length) * 100);

  if (done) {
    const { range, html } = getInterpretation();
    return (
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-2">Your Results</h1>

        <div className="rounded-xl p-6 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 mb-4 shadow-sm">
          <p className="text-lg m-0">Score: <strong>{total}</strong>/40</p>
          <p className="text-lg m-0 mt-1">Range: <strong>{range}</strong></p>
        </div>

        <div className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 mb-6 shadow-sm text-text-muted dark:text-zinc-400 space-y-3">
          {html}
        </div>

        <div className="rounded-xl p-5 bg-blue-50/70 dark:bg-blue-600/10 border border-transparent mb-6">
          <p className="text-sm font-semibold m-0 mb-2">Recommended next steps:</p>
          <ul className="list-disc pl-5 m-0 text-sm text-text-muted space-y-1.5">
            <li>Read the <Link href="/intro/what-is" className="text-blue-600 font-semibold hover:underline">intro guides</Link></li>
            <li>Explore <Link href="/protocols/prt" className="text-blue-600 font-semibold hover:underline">Pain Reprocessing Therapy</Link></li>
            <li>Dive into <Link href="/protocols/schubiner" className="text-blue-600 font-semibold hover:underline">Schubiner's method</Link></li>
            <li>Check the <Link href="/faq" className="text-blue-600 font-semibold hover:underline">FAQ</Link></li>
            <li>Browse <Link href="/resources" className="text-blue-600 font-semibold hover:underline">books, courses, and practitioners</Link></li>
            <li>Discuss central sensitization with a PRT-trained healthcare provider</li>
          </ul>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button onClick={restart} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition">Restart quiz</button>
          <Link href="/intro/what-is" className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">Start the intro guides</Link>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Self-Assessment Quiz</h1>

      <div className="rounded-xl p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 border-l-4 border-l-amber-500 mb-8">
        <p className="text-sm m-0">
          <strong>Important:</strong> This is <em>not</em> a medical diagnosis. It is an educational tool based on common patterns in central sensitization. Only a healthcare professional can diagnose your condition.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-muted mb-1">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{pct}%</span>
        </div>
        <div className="bg-border dark:bg-zinc-700 h-1.5 rounded-full">
          <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="rounded-xl p-6 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 mb-6 shadow-sm">
        <h3 className="text-lg font-bold mt-0 mb-5">{q.text}</h3>
        <div className="flex flex-col gap-2">
          {q.options.map((opt, i) => (
            <label
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all text-text dark:text-zinc-100 ${
                answers[current] === i
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-600/20"
                  : "border-border dark:border-zinc-700 hover:border-blue-600-light hover:bg-blue-50/30 dark:hover:bg-blue-600/10"
              }`}
            >
              <input
                type="radio"
                name="q"
                checked={answers[current] === i}
                onChange={() => select(i)}
                className="accent-blue-600 w-4 h-4"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {current > 0 && (
          <button
            onClick={() => setCurrent(current - 1)}
            className="inline-flex items-center px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            &larr; Back
          </button>
        )}
        {answers[current] !== null && current === questions.length - 1 && (
          <button
            onClick={() => setDone(true)}
            className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition"
          >
            See results &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
