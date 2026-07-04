import Link from "next/link";

export default function Treatments() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Treatment Approaches</h1>
      <p className="text-lg text-text-muted max-w-[650px] mb-6 leading-relaxed">
        The treatment landscape for neuroplastic pain has transformed dramatically. Here are the evidence-based approaches — what they are, how they work, and what the research shows.
      </p>

      <div className="rounded-xl p-5 bg-teal-light/70 dark:bg-teal/10 border border-transparent mb-10">
        <p className="m-0 leading-relaxed text-sm">
          <strong>Core principle:</strong> All effective treatments for neuroplastic pain share one goal — <strong>teaching the brain that the pain signal is a false alarm</strong>. They differ in method but converge on the same mechanism: reducing the threat value of pain sensations so the brain stops generating them.
        </p>
      </div>

      {[
        {
          num: 1, title: "Pain Reprocessing Therapy (PRT)", byline: "Developed by Alan Gordon, LCSW — systematic brain retraining protocol",
          desc: "PRT is a system of psychological techniques that retrains the brain to interpret signals from the body correctly, breaking the chronic pain cycle. It is the most rigorously studied neuroplastic pain treatment, validated in a landmark JAMA Psychiatry trial.",
          extra: (
            <div className="space-y-4 mt-4">
              <div className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-teal shadow-sm">
                <h3 className="text-base font-bold mt-0 mb-2">The five components of PRT</h3>
                <ol className="list-decimal pl-5 m-0 space-y-1.5 text-sm text-text-muted">
                  <li><strong className="text-text dark:text-zinc-100">Education</strong> — learning why pain persists due to brain mechanisms, not tissue damage</li>
                  <li><strong className="text-text dark:text-zinc-100">Gathering personalized evidence</strong> — identifying evidence in your own life that your pain is neuroplastic</li>
                  <li><strong className="text-text dark:text-zinc-100">Somatic tracking</strong> — attending to pain sensations with curiosity and safety, not fear</li>
                  <li><strong className="text-text dark:text-zinc-100">Addressing emotional threats</strong> — processing underlying emotions that the pain may be protecting you from</li>
                  <li><strong className="text-text dark:text-zinc-100">Gravitating to positive feelings</strong> — cultivating joy, connection, and safety</li>
                </ol>
              </div>
              <div className="rounded-xl p-5 bg-teal-light/70 dark:bg-teal/10 border border-teal dark:border-teal/30">
                <h3 className="text-base font-bold mt-0 mb-1">The evidence</h3>
                <p className="text-sm text-text-muted m-0">
                  JAMA Psychiatry (2021): 66% pain-free after 8 sessions over 4 weeks. 98% improved. Results maintained at 5-year follow-up. <a href="https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2784694" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">Read the study &rarr;</a>
                </p>
              </div>
            </div>
          ),
        },
        {
          num: 2, title: "Emotional Awareness and Expression Therapy (EAET)", byline: "Developed by Mark Lumley, PhD and Howard Schubiner, MD",
          desc: "EAET targets the emotional roots of neuroplastic pain. When emotions are suppressed (especially anger, grief, and fear), the nervous system may express them through physical symptoms. EAET helps patients identify avoided emotions, express them directly, and process childhood adversity and trauma.",
          extra: (
            <p className="text-sm text-text-muted mt-2">
              <strong>Evidence:</strong> EAET outperformed CBT for fibromyalgia (Lumley & Schubiner, PAIN 2017) and for older veterans with chronic pain (Yarns et al., Pain Medicine 2020). A 2023 Swedish trial found internet-delivered EAET effective for somatic symptom disorder.
            </p>
          ),
        },
        {
          num: 3, title: "Schubiner's Unlearn Your Pain Program", byline: "Workbook-based self-directed program by Dr. Howard Schubiner",
          desc: "Schubiner's approach integrates neuroscience education with emotional processing and practical techniques. The program guides patients through three phases: Education, Evidence, and Experience. A key insight: most people can recover without extensive psychotherapy — understanding the mechanism and applying simple techniques with commitment is often sufficient.",
        },
        {
          num: 4, title: "Sarno's TMS Approach (the foundation)", byline: "The late John E. Sarno, MD — originator of mind-body pain theory",
          desc: "Sarno observed that most chronic pain patients shared personality characteristics: perfectionism, people-pleasing, and internalizing stress. His treatment was elegantly simple: learn about TMS, think psychologically when pain appears, recognize it as brain-generated. Thousands recovered. While modern approaches have refined and systematized Sarno's insights with rigorous trials, his foundational contribution cannot be overstated.",
        },
      ].map((section) => (
        <section key={section.num} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-bold text-lg flex-shrink-0">{section.num}</div>
            <div>
              <h2 className="text-xl font-bold m-0">{section.title}</h2>
              <p className="text-xs text-text-muted mt-0.5">{section.byline}</p>
            </div>
          </div>
          <p className="text-text-muted leading-relaxed">{section.desc}</p>
          {section.extra}
          {section.num === 1 && (
            <p className="mt-3">
              <Link href="/protocols/prt" className="text-teal font-semibold hover:underline">Full PRT protocol page &rarr;</Link>
            </p>
          )}
          {section.num === 3 && (
            <p className="mt-3">
              <Link href="/protocols/schubiner" className="text-teal font-semibold hover:underline">Full Schubiner protocol page &rarr;</Link>
            </p>
          )}
        </section>
      ))}

      <h2 className="text-2xl font-bold mt-12 mb-4">Other evidence-supported approaches</h2>
      <div className="space-y-4 mb-10">
        {[
          { title: "Pain Neuroscience Education (PNE)", desc: "Simply learning about central sensitization and neuroplastic pain reduces pain, fear, and disability. Reading this page is already therapeutic. Multiple RCTs confirm PNE as an effective standalone intervention." },
          { title: "Graded Exposure / Graded Motor Imagery", desc: "Gradually and safely re-introducing feared movements and sensations. Start with imagining the movement, progress to visualization, then tiny physical movements — always staying within your \"window of tolerance\" while expanding it." },
          { title: "Internal Family Systems (IFS) for Pain", desc: "IFS conceives of the mind as composed of \"parts\" — some of which may generate pain to protect vulnerable exiled emotions. By dialoguing with pain-generating parts with compassion, patients often experience rapid shifts." },
          { title: "Mindfulness-Based Stress Reduction (MBSR)", desc: "8-week program combining meditation, body scanning, and gentle yoga. Reduces pain catastrophizing and improves function. Teaches the skill of observing pain without fear." },
          { title: "Acceptance and Commitment Therapy (ACT)", desc: "Helps patients accept pain sensations while committing to valued actions. Reduces the struggle against pain while rebuilding a meaningful life." },
          { title: "ISTDP", desc: "Intensive Short-Term Dynamic Psychotherapy. A focused psychodynamic approach targeting emotional avoidance patterns driving physical symptoms. Meta-analysis shows significant effects for somatic disorders." },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-5 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-teal shadow-sm">
            <h3 className="text-base font-bold mt-0 mb-1">{item.title}</h3>
            <p className="text-sm text-text-muted m-0">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">What the evidence says</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { num: "66%", label: "Pain-free after 4 weeks of PRT (JAMA 2021)" },
          { num: "98%", label: "Improved after PRT treatment (JAMA 2021)" },
          { num: "5 yr", label: "PRT results maintained at 5-year follow-up" },
          { num: "3-4 wk", label: "Typical timeframe for results (Schubiner program)" },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-teal">{item.num}</div>
            <p className="text-xs text-text-muted mt-1 m-0">{item.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">What tends not to work</h2>
      <ul className="list-disc pl-5 mb-8 space-y-2">
        <li><strong>Opioids and pain medications</strong> — may provide temporary relief but don&apos;t address the learned neural pathway. Long-term use can worsen central sensitization.</li>
        <li><strong>Surgery</strong> — studies show back surgery outcomes are no better than conservative care for chronic pain without clear nerve compression.</li>
        <li><strong>Injections</strong> — epidural steroid injections show no long-term benefit over placebo in systematic reviews.</li>
        <li><strong>Passive physical therapy</strong> — massage, ultrasound, TENS can provide temporary comfort but don&apos;t retrain the brain.</li>
      </ul>

      <div className="rounded-xl p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-8">
        <p className="text-sm m-0">
          <strong>Disclaimer:</strong> This is educational information, not medical advice. Always work with a qualified healthcare professional. The best outcomes come from an integrative approach: medical evaluation to rule out structural causes, coupled with brain-based treatment for the neuroplastic component.
        </p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link href="/protocols/prt" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">PRT Protocol &rarr;</Link>
        <Link href="/protocols/schubiner" className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-teal text-teal font-semibold hover:bg-teal-light transition">Schubiner&apos;s Method</Link>
        <Link href="/resources" className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted font-semibold hover:bg-border-light dark:hover:bg-zinc-800 transition">All Resources</Link>
      </div>
    </div>
  );
}
