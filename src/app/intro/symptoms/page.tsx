"use client";

import { useState } from "react";
import Link from "next/link";

const checklist = [
  { q: "Are your symptoms inconsistent?", note: "Good days and bad days, or pain that comes and goes unpredictably." },
  { q: "Do symptoms move or spread around your body?", note: "Pain that migrates to new locations without new injuries." },
  { q: "Do you have multiple symptoms affecting different body systems?", note: "Pain, fatigue, digestive issues, sleep problems — the more systems involved, the more likely central sensitization." },
  { q: "Are symptoms triggered or worsened by stress and emotions?", note: "Work stress, conflict, anxiety, even positive excitement can spike symptoms." },
  { q: "Do you have triggers unrelated to your body?", note: "Weather changes, sounds, smells, certain times of day, particular environments." },
  { q: "Are your symptoms symmetrical?", note: "The same pain in both knees, both wrists, both sides of the body — structural issues rarely match perfectly." },
  { q: "Does pain have a delayed onset after activity?", note: "Structural pain hurts during/immediately after. Neuroplastic pain often arrives hours or a day later." },
  { q: "Have you experienced childhood adversity or trauma?", note: "ACEs (Adverse Childhood Experiences) are strongly linked to chronic pain in adulthood." },
  { q: "Would you describe yourself as perfectionistic, conscientious, a people-pleaser, or highly self-critical?", note: "These personality traits create sustained internal pressure that can manifest as physical symptoms." },
  { q: "Do medical tests come back normal or show only minor findings?", note: "MRI findings like bulging discs or \"degenerative changes\" are present in most pain-free adults too." },
];

const painConditions = [
  "Chronic back pain", "Chronic neck pain", "Fibromyalgia", "Tension headaches",
  "Migraine (chronic)", "TMJ / jaw pain", "Pelvic pain", "Interstitial cystitis",
  "Vulvodynia", "Plantar fasciitis", "Repetitive strain injury", "Carpal tunnel syndrome",
  "Whiplash syndrome", "Chronic tendonitis", "Shoulder pain", "Hip pain",
  "Knee pain (without structural cause)", "Neuropathy (idiopathic)", "CRPS / RSD",
  "Thoracic outlet syndrome", "Piriformis syndrome", "Myofascial pain syndrome",
];

const bodySystems = [
  "Irritable bowel syndrome (IBS)", "Chronic fatigue syndrome (ME/CFS)", "Long COVID",
  "POTS (postural orthostatic tachycardia)", "Tinnitus (ringing ears)",
  "Insomnia", "Chronic nausea", "Dizziness / vertigo", "Multiple chemical sensitivity",
  "Chronic itching", "Brain fog / cognitive issues", "Anxiety disorders",
  "Depression", "Restless leg syndrome", "Ehlers-Danlos hypermobility (pain component)",
];

export default function Symptoms() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(checked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setChecked(next);
  };

  const count = checked.size;

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Symptoms &amp; Conditions</h1>
      <p className="text-text-muted mb-8 leading-relaxed max-w-[600px]">
        Neuroplastic pain can show up in nearly every part of the body. This page catalogs
        the conditions, symptoms, and patterns that suggest central sensitization.
      </p>

      <h2 className="text-2xl font-bold mb-4">12-question neuroplastic pain checklist</h2>
      <p className="text-text-muted mb-4">Check all that apply to you:</p>

      <div className="mb-6">
        {checklist.map((item, i) => (
          <label key={i} className="flex items-start gap-2 py-2 border-b border-border dark:border-zinc-800 cursor-pointer text-text dark:text-zinc-100">
            <input
              type="checkbox"
              checked={checked.has(i)}
              onChange={() => toggle(i)}
              className="mt-0.5 flex-shrink-0 accent-teal"
            />
            <div>
              <strong className="text-[15px]">{item.q}</strong>
              <p className="text-xs text-text-muted mt-0.5 m-0">{item.note}</p>
            </div>
          </label>
        ))}
      </div>

      {count > 0 && (
        <div className="rounded-lg p-4 bg-teal-light/70 dark:bg-teal/10 text-center mb-10">
          {count >= 8 ? (
            <p className="text-sm font-semibold m-0">You checked {count}/12 — strongly suggests neuroplastic pain. Explore the treatment protocols below.</p>
          ) : count >= 5 ? (
            <p className="text-sm font-semibold m-0">You checked {count}/12 — moderate likelihood. Worth investigating with a PRT-trained practitioner.</p>
          ) : count >= 2 ? (
            <p className="text-sm font-semibold m-0">You checked {count}/12 — some indicators present. Read the science page for more context.</p>
          ) : (
            <p className="text-sm font-semibold m-0">You checked {count}/12 — if you're still in pain without clear structural cause, consider seeing a PRT physician.</p>
          )}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">The three hallmarks of central sensitization</h2>

      {[
        { title: "Hyperalgesia (amplified pain)", desc: "Things that should hurt a little hurt a LOT. Your pain volume is stuck on high. A mild bump feels severe. Normal muscle soreness after exercise becomes disabling pain." },
        { title: "Allodynia (pain from non-painful stimuli)", desc: "Things that shouldn't hurt at all now cause pain. Light touch, the pressure of clothing, a gentle hug, a breeze on your skin — these trigger genuine pain responses." },
        { title: "Sensory hypersensitivity", desc: "Your nervous system overreacts to sensory input. Bright lights feel blinding. Moderate noise is overwhelming. Strong smells trigger headaches or nausea. Your brain can't filter out background stimuli." },
      ].map((item, i) => (
        <div key={i} className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-teal shadow-sm mb-4">
          <h3 className="text-lg font-bold mt-0 mb-1">{item.title}</h3>
          <p className="text-sm text-text-muted m-0">{item.desc}</p>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-10 mb-4">Conditions linked to neuroplastic mechanisms</h2>
      <p className="text-text-muted mb-4">
        Research shows these conditions frequently involve central sensitization and respond to brain-based treatments. Many people have several simultaneously.
      </p>

      <h3 className="text-lg font-bold mb-3">Pain conditions</h3>
      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {painConditions.map((c, i) => (
          <div key={i} className="rounded-lg p-3 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 text-sm">{c}</div>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-3">Other body systems</h3>
      <div className="grid sm:grid-cols-2 gap-2 mb-8">
        {bodySystems.map((c, i) => (
          <div key={i} className="rounded-lg p-3 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 text-sm">{c}</div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Why you have multiple conditions</h2>
      <p className="mb-4">If you checked off several conditions above, that's not unusual — it's expected. The central nervous system can generate symptoms in any system it regulates:</p>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>75% of fibromyalgia patients also have IBS</li>
        <li>Migraine commonly co-occurs with chronic fatigue, IBS, and pelvic pain</li>
        <li>TMJ relates to widespread body pain and headaches</li>
        <li>People with one "functional" disorder often have 3-5</li>
      </ul>
      <p className="mb-8">This isn't bad luck. It's the same underlying mechanism expressing in different parts of the body — which means the same brain-based approaches can help across the board.</p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Other common symptoms</h2>
      <ul className="list-disc pl-5 mb-8 space-y-1">
        <li><strong>Unrefreshing sleep</strong> — you sleep 8-10 hours but wake up exhausted</li>
        <li><strong>Post-exertional malaise</strong> — activity triggers a crash that lasts days</li>
        <li><strong>Temperature dysregulation</strong> — feeling too hot or cold</li>
        <li><strong>Exercise intolerance</strong> — what used to be easy now causes flare-ups</li>
        <li><strong>Emotional lability</strong> — crying easily, irritability, mood swings</li>
        <li><strong>Concentration problems</strong> — difficulty reading, following conversations</li>
        <li><strong>Sound and light sensitivity</strong> — normal environments feel overwhelming</li>
      </ul>

      <div className="rounded-xl p-5 bg-teal-light/70 dark:bg-teal/10 border border-transparent mb-8">
        <p className="text-sm m-0">
          <strong>Important:</strong> Always rule out structural causes with a medical professional first.
          MRIs showing bulging discs or arthritis are common in pain-free people. Don't let normal
          age-related findings convince you that recovery is impossible.
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/intro/science" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">Next: The Science &rarr;</Link>
        <Link href="/quiz" className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-teal text-teal font-semibold hover:bg-teal-light transition">Take the Quiz</Link>
        <Link href="/protocols/prt" className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted font-semibold hover:bg-border-light dark:hover:bg-zinc-800 transition">PRT Protocol</Link>
      </div>
    </div>
  );
}
