"use client";

import { useState } from "react";
import Link from "next/link";

const terms = [
  { term: "Allodynia", def: "Pain from something that shouldn't hurt — like light touch, clothing, or a gentle hug. A hallmark of central sensitization." },
  { term: "ATNS", def: "Association for the Treatment of Neuroplastic Symptoms. Professional organization training practitioners in neuroplastic recovery approaches." },
  { term: "Central Sensitization", def: "A process where the central nervous system (brain + spinal cord) becomes hypersensitive, amplifying pain signals and generating pain from normally non-painful stimuli. The core mechanism in neuroplastic pain." },
  { term: "Central Sensitization Syndromes", def: "A group of overlapping conditions (fibromyalgia, IBS, TMJ, chronic fatigue, migraine, etc.) that share central sensitization as their underlying mechanism." },
  { term: "Descending Modulation", def: "The brain's natural pain-control system — signals sent from the brain down to the spinal cord that turn pain signals down. Weakened in chronic pain." },
  { term: "EAET", def: "Emotional Awareness and Expression Therapy. A treatment that helps patients identify, experience, and express suppressed emotions (especially anger and grief) to reduce pain. Developed by Mark Lumley and Howard Schubiner." },
  { term: "fMRI", def: "Functional MRI — a brain scan that shows which brain regions are active. Used to demonstrate that neuroplastic pain activates the same regions as physical injury." },
  { term: "Glial Cells", def: "Immune cells in the brain and spinal cord. When activated by chronic stress or pain, they release inflammatory molecules that maintain the sensitized state." },
  { term: "Graded Exposure", def: "Gradually and safely reintroducing feared movements and activities to desensitize the nervous system. Key is pacing — staying within the window of tolerance while expanding it." },
  { term: "Graded Motor Imagery", def: "A step-by-step technique: first imagine a movement, then visualize performing it, then do a tiny version. Used for severe neuroplastic pain (e.g. CRPS)." },
  { term: "Hebbian Plasticity", def: "\"Neurons that fire together, wire together.\" The mechanism by which pain becomes a learned neural pathway — and the same mechanism that enables unlearning." },
  { term: "Hyperalgesia", def: "When things that should hurt a little hurt a lot — your pain volume is stuck on high. A key feature of central sensitization." },
  { term: "IASP", def: "International Association for the Study of Pain. The global authority on pain research and classification. Formally recognized nociplastic pain as the third pain category." },
  { term: "IFS", def: "Internal Family Systems. A therapy model that views the mind as composed of 'parts.' Some protective parts may generate pain to shield vulnerable exiled emotions. Being adapted for chronic pain treatment." },
  { term: "ISTDP", def: "Intensive Short-Term Dynamic Psychotherapy. A focused psychodynamic approach targeting emotional avoidance patterns. Meta-analysis shows effectiveness for somatic disorders." },
  { term: "MBS", def: "Mind Body Syndrome. Howard Schubiner's term for physical symptoms (pain, fatigue, gut issues) caused by learned neural pathways rather than structural disease. Same concept as TMS." },
  { term: "Neuroplastic Pain", def: "Chronic pain caused by learned neural pathways in the brain — not by ongoing tissue damage. Also called nociplastic pain, primary pain, MBS, or TMS. The brain generates real pain as a false alarm." },
  { term: "Neuroplasticity", def: "The brain's ability to change and reorganize itself throughout life by forming new neural connections. This is both how pain is learned AND how it can be unlearned." },
  { term: "Nociception", def: "The neural process of detecting actual or potential tissue damage. Nociception is NOT pain — pain is the brain's conscious interpretation of nociceptive signals (and can occur without them)." },
  { term: "Nociceptive Pain", def: "Normal protective pain from actual tissue damage — like a cut, burn, sprain, or broken bone. The alarm system working as designed." },
  { term: "Nociplastic Pain", def: "The formal IASP clinical term for pain from altered nociception without clear tissue or nerve damage. The third official pain category alongside nociceptive and neuropathic. Interchangeable with neuroplastic pain." },
  { term: "Nocebo Effect", def: "When negative expectations create real negative symptoms. Being told your spine is 'degenerating' or your MRI is 'abnormal' can generate genuine pain through fear-induced sensitization." },
  { term: "Neuropathic Pain", def: "Pain caused by damage or disease affecting the nerves themselves — like diabetic neuropathy, post-herpetic neuralgia, or sciatica from nerve compression." },
  { term: "Pain Catastrophizing", def: "A pattern of imagining the worst about pain — 'this will never end,' 'I'm permanently damaged.' It amplifies pain by activating fear circuits. Reducing catastrophizing is a key treatment target." },
  { term: "Pain Neuroscience Education (PNE)", def: "Teaching people the neuroscience of how pain works. Multiple studies show PNE alone reduces pain intensity, fear of movement, and disability. The act of learning is itself therapeutic." },
  { term: "Pain Reprocessing Therapy (PRT)", def: "A 5-component brain-retraining protocol developed by Alan Gordon. RCT in JAMA Psychiatry showed 66% pain-free after 4 weeks. Core technique: somatic tracking with safety reappraisal." },
  { term: "Phantom Limb Pain", def: "Pain felt in a limb that no longer exists. The most dramatic demonstration that the brain can generate pain entirely without body signals — clear evidence for neuroplastic pain mechanisms." },
  { term: "Placebo Effect", def: "When positive expectations create real positive physiological changes. The brain releases endogenous opioids and dopamine. Demonstrates that belief alone can alter pain processing." },
  { term: "Predictive Processing", def: "The neuroscience framework explaining how the brain actively constructs experience (including pain) based on predictions, not passive sensory input. Chronic pain = faulty predictions of danger." },
  { term: "Primary Pain", def: "The ICD-11 diagnostic term for chronic pain arising from altered nociception without clear biological cause. Equivalent to nociplastic / neuroplastic pain." },
  { term: "PSRT", def: "Psychophysiologic Symptom Relief Therapy. A mind-body approach similar to PRT, validated in a Harvard study (Donnino et al., 2021). Combines education with practical techniques." },
  { term: "Sensitization", def: "When the nervous system becomes more reactive over time — sensitivity goes up, threshold goes down. The opposite of habituation. Present in all forms of chronic pain." },
  { term: "Somatic Tracking", def: "The core PRT technique: attending to pain sensations with curiosity and safety rather than fear. Observing without reacting. Sending messages of safety to the brain. Repeated practice weakens the pain pathway." },
  { term: "Somatosensory Cortex", def: "The brain region that maps and represents the body. Can become distorted in chronic pain — body maps shrink or blur, contributing to confused pain signals." },
  { term: "TMS", def: "Tension Myoneural Syndrome (also Tension Myositis Syndrome). Dr. John Sarno's original term for brain-generated pain. The foundation of all modern neuroplastic pain approaches." },
  { term: "Window of Tolerance", def: "The zone where you can experience a sensation or activity without triggering a threat response. The goal of graded exposure is to gradually expand this window." },
].sort((a, b) => a.term.localeCompare(b.term));

const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function groupByLetter(items: typeof terms) {
  const groups: Record<string, typeof terms> = {};
  items.forEach((t) => {
    const letter = t.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(t);
  });
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function Glossary() {
  const [query, setQuery] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.def.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Glossary</h1>
      <p className="text-text-muted mb-6 max-w-[600px]">
        {terms.length}+ plain-language definitions of terms used in neuroplastic pain research and treatment.
        Understanding these concepts is itself therapeutic — it reduces fear and builds conviction.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search glossary..."
        className="w-full max-w-md px-4 py-2.5 rounded-lg border border-border dark:border-zinc-700 bg-white dark:bg-zinc-900 text-text dark:text-zinc-100 placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition mb-6"
      />

      {!query && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => {
                const el = document.getElementById(`sec-${letter}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-8 h-8 rounded-md text-xs font-bold bg-teal-light dark:bg-teal/20 text-teal dark:text-teal-light hover:bg-teal hover:text-white dark:hover:bg-teal transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {query ? (
        filtered.length === 0 ? (
          <p className="text-text-muted">No terms found.</p>
        ) : (
          <div className="space-y-5">
            {filtered.map((t, i) => (
              <div key={i}>
                <dt className="font-bold text-teal dark:text-teal-light text-lg">{t.term}</dt>
                <dd className="mt-1 text-text-muted dark:text-zinc-400 leading-relaxed">{t.def}</dd>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-8">
          {groupByLetter(terms).map(([letter, group]) => (
            <div key={letter}>
              <h2 id={`sec-${letter}`} className="text-xl font-bold text-teal dark:text-teal-light border-b-2 border-teal-light dark:border-teal/20 pb-1.5 mb-3">
                {letter}
              </h2>
              <div className="space-y-3">
                {group.map((t, i) => (
                  <div key={i} className="rounded-lg p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800">
                    <dt className="font-bold text-teal-dark dark:text-teal-light text-sm">{t.term}</dt>
                    <dd className="mt-0.5 text-sm text-text-muted dark:text-zinc-400 leading-relaxed m-0">{t.def}</dd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
