import React from 'react';

interface WelcomePageProps {
  onSelectNeedDesigner: () => void;
  onSelectAmDesigner: () => void;
  onSelectDiscoverDesigners: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
  onSelectNeedDesigner,
  onSelectAmDesigner,
  onSelectDiscoverDesigners,
}) => {
  return (
    <div className="bg-white text-[#0c1d18]">
      <Hero
        onSelectNeedDesigner={onSelectNeedDesigner}
        onSelectAmDesigner={onSelectAmDesigner}
      />
      <HowItWorks onSelectDiscoverDesigners={onSelectDiscoverDesigners} />
      <PersonasSection />
      <Testimonials />
      <FinalCta
        onSelectNeedDesigner={onSelectNeedDesigner}
        onSelectAmDesigner={onSelectAmDesigner}
      />
      <Footer />
    </div>
  );
};

const Hero = ({
  onSelectNeedDesigner,
  onSelectAmDesigner,
}: {
  onSelectNeedDesigner: () => void;
  onSelectAmDesigner: () => void;
}) => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#f5fff9] via-white to-white" />
    <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#00b67f]/20 blur-3xl" aria-hidden />
    <div className="absolute -right-10 bottom-8 h-64 w-64 rounded-full bg-[#00b67f]/10 blur-3xl" aria-hidden />

    <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center">
      <div className="max-w-xl space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#00b67f]">
          <span className="material-symbols-outlined text-base">sparkles</span>
          Custom fashion, human warmth
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Your vision, guided by <span className="text-[#00b67f]">independent designers</span>
        </h1>
        <p className="text-base text-black/70 sm:text-lg">
          SEWNA connects you with designers who translate inspiration into bespoke pieces. Share an idea, receive a thoughtful brief, and co-create garments that feel like you.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={onSelectNeedDesigner}
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            I need a designer
            <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
          </button>
          <button
            onClick={onSelectAmDesigner}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#0c1d18] transition hover:border-black/40"
          >
            I am a designer
          </button>
        </div>

        <dl className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3">
          {[
            { label: 'Projects in beta', value: '320+' },
            { label: 'Match satisfaction', value: '94%' },
            { label: 'Avg. designer response', value: '< 24h' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1 rounded-lg border border-black/5 p-4">
              <dt className="text-xs uppercase tracking-wide text-black/50">{stat.label}</dt>
              <dd className="text-xl font-semibold text-[#0c1d18]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative flex-1 rounded-3xl border border-[#00b67f]/10 bg-white/80 p-6 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.35)] backdrop-blur lg:p-10">
        <div className="grid gap-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">A day inside SEWNA</h2>
            <p className="text-2xl font-semibold leading-8 tracking-tight">
              “Inspired by a vintage corset, ready for a modern city wedding.”
            </p>
          </div>
          <div className="rounded-2xl bg-[#00b67f]/10 p-6">
            <p className="text-sm font-medium text-[#00b67f]">Live brief snapshot</p>
            <p className="mt-3 text-sm text-black/70">
              Structured silk bodice with hand-stitched detailing, detachable skirt, soft ivory palette.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Minimal structure', 'Tailored fit', 'Sustainable fabric'].map((pill) => (
                <span key={pill} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0c1d18] shadow-sm">
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-black/10 p-4">
            <div>
              <p className="text-sm font-semibold">Maria Álvarez</p>
              <p className="text-xs text-black/60">Bridal | Madrid</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f5fff9] px-3 py-1 text-xs font-semibold text-[#00b67f]">
              <span className="material-symbols-outlined text-base">verified</span>
              Matched designer
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = ({
  onSelectDiscoverDesigners,
}: {
  onSelectDiscoverDesigners: () => void;
}) => (
  <section className="border-y border-black/5 bg-[#f9fbfa] py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-col gap-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00b67f]">How SEWNA flows</span>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Clarity from idea to garment</h2>
        <p className="mx-auto max-w-2xl text-sm text-black/60 sm:text-base">
          We designed every touchpoint to feel intentional. No dashboards that overwhelm, no cold handoffs—just a clear path to your piece.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Start with inspiration',
            description: 'Upload a reference image or describe the idea in your own words. SEWNA turns it into a thoughtful design brief.',
            icon: 'photo_camera',
          },
          {
            title: 'Refine your brief',
            description: 'Choose fabrics, features, and budget expectations. Our guidance keeps decisions simple and transparent.',
            icon: 'stylus',
          },
          {
            title: 'Meet the right designer',
            description: 'We surface designers whose specialties and ethics align with your brief—so every conversation starts warm.',
            icon: 'handshake',
          },
        ].map((item) => (
          <article key={item.title} className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00b67f]/10 text-[#00b67f]">
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </span>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-black/60">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onSelectDiscoverDesigners}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#0c1d18] transition hover:border-black/40"
        >
          Explore the designer gallery
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
);

const PersonasSection = () => (
  <section className="py-24">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
      <article className="space-y-6 rounded-3xl border border-black/10 bg-[#f5fff9] p-10">
        <div className="flex items-center gap-3 text-sm font-semibold text-[#00b67f]">
          <span className="material-symbols-outlined text-base">style</span>
          For people commissioning garments
        </div>
        <h3 className="text-3xl font-bold">Create with a designer who speaks your language</h3>
        <ul className="space-y-4 text-sm text-black/70">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">psychiatry</span>
            Thoughtful intake that captures how you want to feel in the piece, not just how it should look.
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">payments</span>
            Transparent pricing guidance and timeline expectations before you say yes.
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">forum</span>
            A shared project space where updates, sketches, and fittings stay in one place.
          </li>
        </ul>
      </article>

      <article className="space-y-6 rounded-3xl border border-black/10 bg-white p-10">
        <div className="flex items-center gap-3 text-sm font-semibold text-[#00b67f]">
          <span className="material-symbols-outlined text-base">palette</span>
          For independent designers
        </div>
        <h3 className="text-3xl font-bold">Bring your craft to a global audience</h3>
        <ul className="space-y-4 text-sm text-black/70">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">cloud_upload</span>
            Curate a living portfolio with sketches, work-in-progress moments, and finished garments.
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">schedule</span>
            Accept requests that fit your calendar with availability controls and automatic follow-ups.
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5 text-base text-[#00b67f]">workspace_premium</span>
            Earn trust with verified reviews, style tags, and sustainability badges that reflect your practice.
          </li>
        </ul>
      </article>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="border-y border-black/5 bg-white py-24">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-col gap-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00b67f]">Community voices</span>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Soft, confident, and considered</h2>
        <p className="mx-auto max-w-2xl text-sm text-black/60 sm:text-base">
          SEWNA is already home to designers and clients across 12 countries. Here’s what they’re saying.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            quote: 'The brief process felt like therapy for my closet—suddenly I understood what I wanted my clothes to say.',
            name: 'Ivy Chen',
            role: 'Product designer, Singapore',
          },
          {
            quote: 'I thought bespoke meant endless back-and-forth. SEWNA gave me a clear roadmap and designers who cared.',
            name: 'Leo Park',
            role: 'Creative director, New York',
          },
          {
            quote: 'Clients arrive aligned and excited. The platform elevates independent craftsmanship with so much respect.',
            name: 'Amaka Eze',
            role: 'Atelier founder, Lagos',
          },
        ].map((item) => (
          <figure key={item.name} className="flex h-full flex-col gap-6 rounded-3xl border border-black/10 bg-[#f9fbfa] p-8 text-left">
            <span className="material-symbols-outlined text-4xl text-[#00b67f]">format_quote</span>
            <blockquote className="text-base leading-relaxed text-black/70">{item.quote}</blockquote>
            <figcaption className="space-y-1 text-sm">
              <p className="font-semibold text-[#0c1d18]">{item.name}</p>
              <p className="text-black/50">{item.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = ({
  onSelectNeedDesigner,
  onSelectAmDesigner,
}: {
  onSelectNeedDesigner: () => void;
  onSelectAmDesigner: () => void;
}) => (
  <section className="relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-[#0c1d18]" />
    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} aria-hidden />
    <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center text-white">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#00b67f]">
        Built for quiet confidence
      </span>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
        Bring your next piece to life with a designer who just gets it
      </h2>
      <p className="max-w-xl text-sm text-white/70 sm:text-base">
        Whether you&apos;re commissioning a single garment or building a collection, SEWNA keeps the process clear, considered, and rooted in collaboration.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={onSelectNeedDesigner}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0c1d18] transition hover:bg-white/90"
        >
          Start a custom request
        </button>
        <button
          onClick={onSelectAmDesigner}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Join as a designer
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-black/5 bg-white py-12">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xl font-semibold text-[#0c1d18]">SEWNA</p>
        <p className="text-sm text-black/50">Crafted with independent designers around the world.</p>
      </div>
      <div className="flex gap-6 text-sm text-black/60">
        <a href="#" className="transition hover:text-[#00b67f]">About</a>
        <a href="#" className="transition hover:text-[#00b67f]">Support</a>
        <a href="#" className="transition hover:text-[#00b67f]">Privacy</a>
      </div>
    </div>
  </footer>
);

export default WelcomePage;
