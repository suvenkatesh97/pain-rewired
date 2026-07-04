import Link from "next/link";

export default function Schubiner() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Schubiner's Unlearn Your Pain Method</h1>
      <p className="text-text-muted text-lg max-w-[650px] mb-6">
        A three-phase self-directed program by Dr. Howard Schubiner, integrating neuroscience education, emotional awareness, and practical brain-retraining techniques.
      </p>

      <div className="rounded-xl p-5 bg-gradient-to-br from-teal-light to-teal-light/50 dark:from-teal/10 dark:to-teal/5 border border-teal dark:border-teal/30 mb-10">
        <p className="text-base m-0">
          <strong>Format:</strong> Available as a workbook (<em>Unlearn Your Pain</em>), an online program (<em>Freedom From Chronic Pain</em>), and a new 2026 Penguin/Random House book covering pain, fatigue, anxiety, and depression.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-8">The Three Phases</h2>

      {[
        {
          num: 1,
          title: "EDUCATION: Understanding Mind Body Syndrome",
          body: (
            <>
              <p>The first phase is cognitive — you need to truly understand that your brain can generate real physical pain. This isn't about positive thinking. It's about understanding the mechanism so your brain's threat response can begin to shift.</p>
              <h4 className="font-bold mt-4 mb-2">Key concepts to learn:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Predictive processing:</strong> Your brain constructs your experience based on expectations. If it expects pain, it can generate pain — even in healthy tissue.</li>
                <li><strong>Learned neural pathways:</strong> Pain can become a habit of the brain. Like any habit, it can be changed.</li>
                <li><strong>Mind Body Syndrome (MBS):</strong> Physical symptoms caused by neural circuits in the brain, not by tissue damage.</li>
                <li><strong>Normal MRI findings don't equal pain:</strong> Bulging discs, herniations, degeneration — present in most pain-free adults over 30.</li>
              </ul>
              <div className="rounded-lg p-4 bg-teal-light/50 dark:bg-teal/10 mt-4">
                <p className="text-sm m-0"><strong>Resources:</strong> Watch Schubiner's animated video series on YouTube. Read the articles on this site. Watch the documentary <em>This Might Hurt</em>. Build genuine intellectual conviction.</p>
              </div>
            </>
          ),
        },
        {
          num: 2,
          title: "EVIDENCE: Building personal conviction",
          body: (
            <>
              <p>Generic understanding isn't sufficient — you need to see how MBS applies to YOUR life.</p>
              {[
                { title: "1. The Stress-Pain Connection Log", desc: "Track pain and stress levels for one week. Rate each 1-10 three times daily. Look for correlations — does pain spike during stressful meetings or after conflicts?" },
                { title: "2. Life Story Review", desc: "Write a timeline of your life, noting significant stressful events, losses, traumas. Overlay your pain history. Look for patterns. Common triggers: childhood adversity, relationship breakups, work burnout, caregiving stress." },
                { title: "3. Personality Assessment", desc: "Schubiner identifies common MBS traits: perfectionism, people-pleasing, conscientiousness, high self-criticism, difficulty expressing anger. Write down which apply to you and how they've shaped your life." },
                { title: "4. Inconsistency Log", desc: "Note times when pain doesn't follow structural patterns: pain that moves, good and bad days with no trigger, pain when resting but better when distracted. Structural pain is consistent — neuroplastic pain shifts." },
              ].map((item, i) => (
                <div key={i} className="rounded-lg p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-teal shadow-sm my-3">
                  <h4 className="text-sm font-bold mt-0 mb-0.5">{item.title}</h4>
                  <p className="text-sm text-text-muted m-0">{item.desc}</p>
                </div>
              ))}
            </>
          ),
        },
        {
          num: 3,
          title: "EXPERIENCE: Rewiring the brain",
          body: (
            <>
              <p>Now you put the education and evidence into action. This is where the neural rewiring actually happens.</p>
              {[
                { label: "Technique A", title: "Somatic Tracking with Safety Messaging", desc: "When pain appears, observe it with curiosity and send safety messages: \"This is just a neural pathway firing. There is no danger. My body is safe.\" Don't try to make it go away. Do this multiple times daily." },
                { label: "Technique B", title: "Expressive Writing", desc: "Write for 20-30 minutes about stressful experiences, current conflicts, and emotions you've been avoiding. Don't edit. Research on expressive writing shows significant health benefits, including reduced pain." },
                { label: "Technique C", title: "Addressing Current Stressors", desc: "If there are active sources of stress, you may need to make changes: set boundaries, communicate needs, reduce overwork. Small changes can have large effects on a sensitized nervous system." },
                { label: "Technique D", title: "Self-Compassion Practice", desc: "The perfectionist, self-critical personality style maintains the threat state. Practice treating yourself with kindness. Self-compassion is a direct neural intervention that reduces threat activation." },
                { label: "Technique E", title: "Gradual Re-engagement", desc: "Don't wait until you're pain-free. Start small — bend slightly, walk for 2 minutes. Send safety messages throughout. The brain learns: \"We did that thing we were afraid of — and we're okay.\"" },
                { label: "Technique F", title: "Meditation and Mindfulness", desc: "Schubiner provides guided meditations for MBS recovery. Practice observing sensations without fear, calming the nervous system, and developing the inner observer." },
              ].map((t, i) => (
                <div key={i} className="rounded-lg p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-teal shadow-sm my-3">
                  <h4 className="text-sm font-bold mt-0 mb-0.5">{t.label}: {t.title}</h4>
                  <p className="text-sm text-text-muted m-0">{t.desc}</p>
                </div>
              ))}
            </>
          ),
        },
      ].map((phase) => (
        <section key={phase.num} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-teal text-white flex items-center justify-center font-bold flex-shrink-0">{phase.num}</div>
            <h3 className="text-lg font-bold m-0">{phase.title}</h3>
          </div>
          <div className="text-text-muted leading-relaxed space-y-2">{phase.body}</div>
        </section>
      ))}

      <h2 className="text-2xl font-bold mt-12 mb-4">What makes Schubiner's approach distinctive</h2>
      <ul className="list-disc pl-5 mb-8 space-y-2">
        <li><strong>Accessibility:</strong> The workbook and online program are designed to be self-directed. Most people can do this without a therapist.</li>
        <li><strong>Brevity:</strong> Three weeks of consistent practice often produces significant results. The brain can change quickly when the approach is correct.</li>
        <li><strong>Integration:</strong> Combines neuroscience education with emotional work. You don't have to choose between &ldquo;it's the brain&rdquo; and &ldquo;it's the emotions.&rdquo;</li>
        <li><strong>Broad scope:</strong> Addresses pain, chronic fatigue, anxiety, depression, IBS, and other MBS-related conditions.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4">Common pitfalls</h2>
      {[
        { title: "Intellectual understanding without experiential shift", desc: "Reading about MBS is not the same as doing the work. You cannot think your way out of pain — you have to experience safety." },
        { title: "Seeking a \"cure\" with the wrong mindset", desc: "If you approach techniques as tools to eliminate pain, you're still treating pain as a threat. The paradox: accepting the pain's presence (while knowing it's a false alarm) is what allows it to fade." },
        { title: "Prematurely dismissing emotional factors", desc: "Some people resist the emotional work. Remember: the connection is neural, not metaphorical. Emotions affect the autonomic nervous system, which directly influences pain processing." },
      ].map((item, i) => (
        <div key={i} className="rounded-lg p-4 bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 border-l-4 border-l-amber-500 dark:border-l-amber-600 shadow-sm my-3">
          <h4 className="text-sm font-bold mt-0 mb-0.5">{item.title}</h4>
          <p className="text-sm text-text-muted m-0">{item.desc}</p>
        </div>
      ))}

      <div className="flex gap-3 flex-wrap mt-8">
        <Link href="/protocols/prt" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-teal text-white font-semibold hover:bg-teal-dark transition">PRT Protocol &rarr;</Link>
        <Link href="/intro/treatments" className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-teal text-teal font-semibold hover:bg-teal-light transition">All Treatments</Link>
        <Link href="/resources" className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border dark:border-zinc-700 text-text-muted font-semibold hover:bg-border-light dark:hover:bg-zinc-800 transition">Books &amp; Resources</Link>
      </div>
    </div>
  );
}
