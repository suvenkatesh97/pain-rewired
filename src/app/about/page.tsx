import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">About Me</h1>
      <p className="text-text-muted mb-8">Why I built Pain Rewired.</p>

      <div className="flex items-start gap-6 mb-8 flex-wrap">
        <div className="w-16 h-16 rounded-full bg-teal-light dark:bg-teal/20 border-2 border-teal flex items-center justify-center text-2xl font-bold text-teal flex-shrink-0">
          S
        </div>
        <div>
          <h2 className="text-xl font-bold">Sunny Venkatesh</h2>
          <p className="text-text-muted">Curator · Builder · Chronic pain advocate</p>
        </div>
      </div>

      <div className="prose prose-teal dark:prose-invert max-w-none space-y-6">
        <p>
          Hi, I'm Sunny. I built Pain Rewired because the research on
          neuroplastic pain fundamentally changed how I think about chronic pain —
          and I believe this knowledge should be accessible to everyone who needs it.
        </p>

        <p>
          When I first encountered the concept of neuroplastic pain — the idea
          that the brain can generate real physical pain even when there's no
          tissue damage — it was a paradigm shift. Like many people, I had always
          assumed that chronic pain meant ongoing physical damage. But the research
          tells a different, more hopeful story.
        </p>

        <p>
          The problem is that most of this research is buried in dense academic
          papers that are inaccessible to the people who need it most. Pain Rewired
          bridges that gap by curating the latest findings and translating them
          into plain language.
        </p>

        <h2 className="!mt-10">What I Do Here</h2>

        <ul>
          <li>
            <strong>Curate research</strong> — I scan PubMed and clinical journals
            for relevant papers on neuroplastic pain, central sensitization, PRT,
            and related topics
          </li>
          <li>
            <strong>Simplify the science</strong> — Each paper gets a plain-language
            summary that captures what they found, why it matters, and how it
            applies to people living with chronic pain
          </li>
          <li>
            <strong>Provide context</strong> — The intro guides, glossary, and FAQ
            build a foundation so you can understand the research in context
          </li>
          <li>
            <strong>Share resources</strong> — Books, courses, podcasts, and
            practitioners that I believe are helpful based on the evidence
          </li>
        </ul>

        <h2 className="!mt-10">Important Disclaimer</h2>

        <p>
          I'm not a doctor, and Pain Rewired is not a substitute for medical
          advice. This is an educational resource. If you're dealing with
          chronic pain, please consult a healthcare professional — ideally one
          familiar with neuroplastic pain and evidence-based treatment approaches
          like PRT, EAET, and pain reprocessing therapy.
        </p>

        <h2 className="!mt-10">Connect</h2>

        <p>
          I'd love to hear from you — feedback, suggestions for papers to
          cover, or just to connect. You can find me on{" "}
          <a
            href="https://in.linkedin.com/in/sunny-venkatesh-877896194"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}
