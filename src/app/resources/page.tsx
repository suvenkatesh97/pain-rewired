import Link from "next/link";

export default function Resources() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Resources</h1>
      <p className="text-text-muted mb-10">
        Books, courses, practitioners, and tools for understanding and healing neuroplastic pain.
      </p>

      <div className="prose prose-teal dark:prose-invert max-w-none space-y-12">
        <section>
          <h2>Books</h2>
          <div className="space-y-4">
            <div>
              <h3 className="!mt-0 !mb-1">The Way Out — Alan Gordon, LCSW</h3>
              <p className="!mt-0">
                The definitive guide to Pain Reprocessing Therapy. Gordon explains
                how neuroplastic pain works and provides a step-by-step approach to
                retraining your brain. Essential reading.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">Unlearn Your Pain — Howard Schubiner, MD</h3>
              <p className="!mt-0">
                A comprehensive 28-day program with workbook exercises. Schubiner,
                an internist and researcher, explains the mind-body connection with
                scientific rigor and practical guidance.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">
                Healing Back Pain — John Sarno, MD
              </h3>
              <p className="!mt-0">
                The book that started the modern mind-body pain movement. Sarno
                introduced the concept of Tension Myositis Syndrome (TMS), showing
                how repressed emotions can cause physical pain. A classic.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">
                Hidden From View — Allan Abbass, MD &amp; Howard Schubiner, MD
              </h3>
              <p className="!mt-0">
                A clinician&apos;s guide to psychophysiologic disorders. More
                technical but valuable for understanding the mechanisms connecting
                emotions and physical symptoms.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Courses &amp; Programs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="!mt-0 !mb-1">
                <a href="https://www.curablehealth.com" target="_blank" rel="noopener noreferrer">
                  Curable
                </a>
              </h3>
              <p className="!mt-0">
                An app-based program with guided exercises, pain science education,
                and brain retraining techniques. Research-backed and user-friendly.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">
                <a href="https://www.lin.health" target="_blank" rel="noopener noreferrer">
                  Lin Health
                </a>
              </h3>
              <p className="!mt-0">
                One-on-one pain recovery coaching combining pain neuroscience
                education with personalized support from trained coaches.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Finding Practitioners</h2>
          <div className="space-y-4">
            <div>
              <h3 className="!mt-0 !mb-1">
                Pain Psychology Center (painpsychologycenter.com)
              </h3>
              <p className="!mt-0">
                Founded by Alan Gordon. Offers PRT therapy with trained clinicians
                via telehealth. Accepts clients worldwide.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">
                PPDA Practitioner Directory (ppdassociation.org)
              </h3>
              <p className="!mt-0">
                The Psychophysiologic Disorders Association lists clinicians
                trained in mind-body approaches, including therapists, physicians,
                and coaches.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Podcasts</h2>
          <div className="space-y-4">
            <div>
              <h3 className="!mt-0 !mb-1">Tell Me About Your Pain</h3>
              <p className="!mt-0">
                Alan Gordon and Alon Ziv&apos;s podcast exploring personal stories
                of chronic pain recovery through PRT.
              </p>
            </div>
            <div>
              <h3 className="!mt-0 !mb-1">Like Mind, Like Body</h3>
              <p className="!mt-0">
                Conversations about psychophysiologic disorders with clinicians,
                researchers, and people who have recovered.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Key Research Papers</h2>
          <div className="space-y-4">
            <div>
              <p className="!mt-0 !mb-0">
                <a href="https://pubmed.ncbi.nlm.nih.gov/34748326/" target="_blank" rel="noopener noreferrer">
                  Ashar et al. (2022) — JAMA Psychiatry
                </a>
              </p>
              <p className="!mt-0">
                The landmark PRT randomized controlled trial: 66% pain-free or
                nearly pain-free after 4 weeks.
              </p>
            </div>
            <div>
              <p className="!mt-0 !mb-0">
                <a href="https://pubmed.ncbi.nlm.nih.gov/28087789/" target="_blank" rel="noopener noreferrer">
                  Lumley et al. (2017) — Pain
                </a>
              </p>
              <p className="!mt-0">
                Review of Emotional Awareness and Expression Therapy for chronic
                pain conditions.
              </p>
            </div>
            <div>
              <p className="!mt-0 !mb-0">
                <a href="https://pubmed.ncbi.nlm.nih.gov/21682915/" target="_blank" rel="noopener noreferrer">
                  Nijs et al. (2011) — Manual Therapy
                </a>
              </p>
              <p className="!mt-0">
                Foundational paper on central sensitization and how pain
                neuroscience education can help.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
