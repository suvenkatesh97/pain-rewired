import Link from "next/link";

export default function Science() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-4">The Science of Neuroplastic Pain</h1>
      <p className="text-lg text-text-muted max-w-[650px] mb-10 leading-relaxed">
        Understanding the neuroscience behind neuroplastic pain is itself therapeutic. Studies show
        that <strong>Pain Neuroscience Education</strong> — simply learning how pain works — reduces
        pain intensity, fear, and disability. Here's the evidence.
      </p>

      <h2 className="text-2xl font-bold mb-6">The Three Types of Pain</h2>
      <p className="mb-4">The medical community now recognizes three distinct pain mechanisms:</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { title: "Nociceptive", color: "#E53E3E", desc: "Pain from actual tissue damage. Your body detects an injury and sends danger signals. Example: a broken bone, a burn, a sprain. This is \"normal\" pain — it serves a protective function." },
          { title: "Neuropathic", color: "#DD6B20", desc: "Pain from nerve damage. The nerves themselves are injured and fire abnormally. Examples: diabetic neuropathy, sciatica from a compressed nerve, post-herpetic neuralgia." },
          { title: "Nociplastic", color: "#2563EB", desc: "Pain from altered pain processing in the nervous system — no tissue or nerve damage needed. This is neuroplastic pain. The wiring is the problem, not the hardware. It's the most common chronic pain type." },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 shadow-sm" style={{ borderTopColor: item.color, borderTopWidth: "3px" }}>
            <h3 className="text-lg font-bold mt-0 mb-1">{item.title}</h3>
            <p className="text-sm text-text-muted m-0">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Central Sensitization: the core mechanism</h2>
      <p className="mb-4">
        <strong>Central sensitization</strong> is the scientific term for what happens when your
        central nervous system (brain + spinal cord) becomes hyper-reactive. Think of it as the
        volume knob on your pain system getting stuck at maximum.
      </p>

      <div className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-blue-600 shadow-sm mb-10">
        <h3 className="text-lg font-bold mt-0 mb-3">What changes in a sensitized nervous system:</h3>
        <ul className="list-disc pl-5 mb-0 space-y-1">
          <li><strong>Amplified signaling:</strong> Pain neurons fire more easily and more intensely</li>
          <li><strong>Expanded receptive fields:</strong> Pain spreads beyond the original injury area</li>
          <li><strong>Reduced inhibition:</strong> The brain's natural pain-control system weakens</li>
          <li><strong>Cross-system activation:</strong> Pain circuits connect to fear, anxiety, and memory circuits</li>
          <li><strong>Glial activation:</strong> Immune cells release inflammatory molecules that maintain the sensitized state</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Brain imaging evidence</h2>
      <ul className="list-disc pl-5 mb-8 space-y-2">
        <li><strong>fMRI studies</strong> (Derbyshire et al., 2004) show that hypnotically-induced pain activates the same brain regions (thalamus, anterior cingulate, insula, somatosensory cortex) as physically-induced pain. The brain can generate the full pain experience without any physical stimulus.</li>
        <li><strong>Structural changes:</strong> Chronic pain patients show decreased gray matter in pain-processing regions — changes that can reverse with effective treatment (Rodriguez-Raecke et al., 2009).</li>
        <li><strong>Connectivity changes:</strong> The transition from acute to chronic pain involves a shift in brain activity from nociceptive circuits to emotional and self-referential circuits (Hashmi et al., 2013). Pain literally moves from the body to the mind.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Key studies</h2>
      <div className="space-y-4 mb-8">
        {[
          { title: "Boulder Back Pain Study (Ashar et al., 2021)", desc: "Published in JAMA Psychiatry. 151 chronic back pain patients randomized. After 4 weeks: 66% of PRT patients pain-free or nearly pain-free vs. 20% placebo and 10% usual care. 98% improved. Results maintained at 5-year follow-up." },
          { title: "Harvard Study (Donnino et al., 2021)", desc: "PSRT — a similar mind-body approach — showed significant and sustained pain reduction in chronic back pain patients. 64% reported clinically meaningful improvement." },
          { title: "EAET for Fibromyalgia (Lumley & Schubiner, 2017)", desc: "Published in PAIN. Emotional Awareness and Expression Therapy outperformed CBT for fibromyalgia patients, with greater pain reduction and better function." },
          { title: "Veterans Study (Yarns et al., 2020)", desc: "Published in Pain Medicine. EAET produced significantly greater pain reduction than CBT in older veterans with chronic pain. Study targeted emotional processing of trauma and conflict." },
          { title: "No Whiplash, No Symptoms (Castro et al., 2011)", desc: "Participants led to believe they'd been rear-ended in a car (they hadn't). 20% subsequently developed 'whiplash' symptoms. The brain produced real pain based entirely on expectation." },
        ].map((study, i) => (
          <div key={i} className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 shadow-sm">
            <h3 className="text-base font-bold mt-0 mb-1">{study.title}</h3>
            <p className="text-sm text-text-muted m-0">{study.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">The brain can learn — and unlearn</h2>
      <p className="mb-4">Neuroplasticity — the brain's ability to rewire itself — is both the problem and the solution:</p>

      <div className="space-y-4 mb-8">
        <div className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-blue-600 shadow-sm">
          <p className="m-0 leading-relaxed">
            <strong>Pain can become a learned neural pathway.</strong> When neurons fire together repeatedly,
            they wire together (Hebb's law). The pain response becomes automatic — like muscle memory.
          </p>
        </div>
        <div className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-blue-600 shadow-sm">
          <p className="m-0 leading-relaxed">
            <strong>Pain can be unlearned through the same mechanism.</strong> By repeatedly experiencing
            sensations without fear — through techniques like somatic tracking, graded exposure, and
            emotional processing — the brain updates its predictions. The pain pathway weakens.
          </p>
        </div>
      </div>

      <p className="mb-8">
        The 5-year follow-up to the Boulder PRT study confirms this: once the brain updates its
        pain predictions, the changes tend to stick. Recovery is not symptom management —
        it's genuine neural reconfiguration.
      </p>

      <div className="flex gap-3 flex-wrap">
        <Link href="/intro/treatments" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800 transition">Next: Treatments &rarr;</Link>
        <Link href="/intro/what-is" className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">What Is Neuroplastic Pain?</Link>
        <Link href="/protocols/prt" className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted font-semibold hover:bg-border-light dark:hover:bg-zinc-800 transition">PRT Protocol</Link>
      </div>
    </div>
  );
}
