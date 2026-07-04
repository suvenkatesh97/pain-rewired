export default function FAQ() {
  const faqs = [
    {
      q: "What is neuroplastic pain?",
      a: "Neuroplastic pain is real physical pain caused by learned neural pathways in the brain rather than ongoing tissue damage. The brain's pain processing system becomes over-sensitized, creating pain even after the original injury has healed. Brain scans show the same pain-processing regions light up whether pain comes from a physical injury or neuroplastic changes — the pain is identical, only the cause differs.",
    },
    {
      q: "How do I know if my pain is neuroplastic?",
      a: "Key indicators include: pain that moves around or changes location, pain that spreads beyond the original injury site, pain triggered by stress or emotions, pain that began during a stressful period, pain that doesn't follow anatomical patterns, multiple symptoms across different body systems, and inconsistent pain (good days and bad days with no clear physical explanation). Taking our self-assessment quiz can help identify these patterns.",
    },
    {
      q: "Is neuroplastic pain 'all in my head'?",
      a: "No — neuroplastic pain is real, measurable, and visible on brain imaging. The phrase 'in your head' wrongly implies it's imaginary. Think of it this way: the pain circuits in your brain have been strengthened through repetition, just like a pianist strengthens musical circuits. The pain is absolutely real — the source is neural learning, not ongoing tissue damage.",
    },
    {
      q: "What is Pain Reprocessing Therapy (PRT)?",
      a: "PRT is a psychological treatment developed by Alan Gordon at the Pain Psychology Center. It helps people reinterpret pain signals through the lens of neuroplasticity, using techniques like somatic tracking, cognitive reappraisal, and graded exposure. A landmark randomized controlled trial published in JAMA Psychiatry (2021) found 66% of chronic back pain patients were pain-free or nearly pain-free after 4 weeks of PRT, and results were maintained at 1-year follow-up.",
    },
    {
      q: "What is the difference between acute and chronic pain?",
      a: "Acute pain is a warning signal — it tells you tissue damage is occurring and you need to protect the area. It resolves as tissues heal. Chronic pain persists beyond normal healing time (3-6 months) and the pain signals continue even after tissues have recovered. In neuroplastic pain, the brain has learned to generate pain as a 'false alarm' — a protective mechanism that's become maladaptive.",
    },
    {
      q: "What treatments work for neuroplastic pain?",
      a: "Evidence-based approaches include: Pain Reprocessing Therapy (PRT), Emotional Awareness and Expression Therapy (EAET), cognitive behavioral therapy (CBT), mindfulness-based stress reduction (MBSR), graded motor imagery, and pain neuroscience education. Many people find a combination works best. The common thread is teaching the brain that the pain signal is a false alarm, not a sign of danger.",
    },
    {
      q: "Do I need to stop all other treatments?",
      a: "No. Neuroplastic pain treatments can complement your existing care. The key insight is that if structural treatments (physical therapy, injections, surgery) haven't resolved your pain, it may be worth exploring the neuroplastic component. Always work with your healthcare provider to coordinate your treatment approach.",
    },
    {
      q: "Can medications help with neuroplastic pain?",
      a: "Traditional pain medications often have limited effectiveness for neuroplastic pain because they target tissue-level processes rather than brain-level processes. Some medications that affect the central nervous system (like certain antidepressants) may help modulate pain processing. However, the most effective approach is typically retraining the brain's pain circuits through psychological and behavioral methods.",
    },
    {
      q: "How long does it take to rewire pain?",
      a: "It varies significantly by person. Some people experience dramatic improvement within weeks (the PRT trial showed 66% pain-free in 4 weeks), while others need months of consistent practice. The brain is plastic — it can change at any age — but rewiring established neural pathways takes time and repetition, similar to learning any complex skill.",
    },
    {
      q: "What role do emotions play in pain?",
      a: "A significant one. Research by Howard Schubiner, Mark Lumley, and others has shown that unprocessed or suppressed emotions — particularly anger, fear, and grief — can activate the brain's threat-response system, which can generate or amplify pain. Emotional Awareness and Expression Therapy (EAET) specifically targets this connection, with clinical trials showing meaningful pain reduction. This is not about 'causing' your pain — it's about the brain's natural protective mechanisms.",
    },
    {
      q: "Is there scientific evidence for neuroplastic pain treatments?",
      a: "Yes, a growing body of rigorous evidence supports these approaches. The 2021 JAMA Psychiatry PRT trial was a milestone. Neuroimaging studies consistently show brain changes when patients recover. Meta-analyses of pain neuroscience education show significant reductions in pain and disability. Central sensitization has been demonstrated in fibromyalgia, IBS, TMJ, chronic low back pain, migraines, and pelvic pain.",
    },
    {
      q: "Can children have neuroplastic pain?",
      a: "Yes. Conditions like amplified musculoskeletal pain syndrome (AMPS), complex regional pain syndrome (CRPS), and functional abdominal pain in children often involve central sensitization. PRT and related approaches can work very well with children and adolescents, whose brains are especially plastic.",
    },
    {
      q: "What's the difference between neuroplastic pain and fibromyalgia?",
      a: "They're closely related concepts. Fibromyalgia is a specific diagnosis characterized by widespread pain, fatigue, and tender points. Neuroplastic pain is a broader framework for understanding how the brain generates or amplifies pain. Most researchers believe fibromyalgia involves central sensitization — a key mechanism of neuroplastic pain. The treatment approaches overlap significantly.",
    },
    {
      q: "Where can I find a practitioner?",
      a: "Start with the resources page on this site, which lists directories for finding PRT, EAET, and pain psychology practitioners. Look for providers experienced in pain reprocessing therapy, somatic tracking, and neuroplastic pain treatment. Many practitioners offer telehealth sessions. The Pain Psychology Center, Curable app, and Lin Health are good starting points.",
    },
  ];

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Frequently Asked Questions</h1>
      <p className="text-text-muted mb-10">
        Common questions about neuroplastic pain — answered in plain language.
      </p>

      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-teal dark:text-teal-light">
              {faq.q}
            </h2>
            <p className="text-text-muted dark:text-zinc-400 leading-relaxed mt-1">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
