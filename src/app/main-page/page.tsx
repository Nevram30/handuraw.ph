import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { PersonaButtons } from "./_components/persona-buttons";

// Icons as simple SVG components
const BusinessIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const InvestorIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const VentureIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CustomerIcon = () => (
  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  accentColor: string;
}

function PersonaCard({ icon, title, description, features, accentColor }: PersonaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
      <div className="relative z-10">
        <div className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${accentColor} p-3 text-white`}>
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-600">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700">
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <div className="text-center">
      <h4 className="mb-2 text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default async function MainPage() {
  const session = await auth();

  return (
    <HydrateClient>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600" />
              <span className="text-xl font-bold text-gray-900">Handuraw</span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#personas" className="text-gray-600 transition hover:text-gray-900">Personas</a>
              <a href="#features" className="text-gray-600 transition hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-600 transition hover:text-gray-900">About</a>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <span className="hidden text-sm text-gray-600 sm:inline">
                    {session.user?.name}
                  </span>
                  <Link
                    href="/api/auth/signout"
                    className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                  >
                    Sign out
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white transition hover:from-violet-700 hover:to-fuchsia-700"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-0 bg-gradient-to-b from-violet-50 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/50 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm text-violet-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
              Business Intelligence Platform
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
              Discover Insights.
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Drive Decisions.
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600">
              Unlock powerful business insights through real user personas. Make data-driven decisions
              for your business, investments, ventures, and customer strategies.
            </p>

            {/* Two Main Persona Buttons */}
            <PersonaButtons />

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#personas"
                className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-200/50 blur-[100px]" />
        </section>

        {/* Personas Section */}
        <section id="personas" className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Real User Personas</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Tailored insights for every stakeholder. Our platform adapts to your unique perspective
                and delivers relevant, actionable intelligence.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <PersonaCard
                icon={<BusinessIcon />}
                title="Business Owners"
                description="Gain comprehensive market insights and competitive intelligence to grow your business strategically."
                features={[
                  "Market trend analysis",
                  "Competitor benchmarking",
                  "Growth opportunity mapping",
                  "Risk assessment tools"
                ]}
                accentColor="from-blue-500 to-cyan-500"
              />

              <PersonaCard
                icon={<InvestorIcon />}
                title="Investors"
                description="Make informed investment decisions with deep market research and due diligence tools."
                features={[
                  "Portfolio analytics",
                  "Market sentiment tracking",
                  "Due diligence reports",
                  "ROI projections"
                ]}
                accentColor="from-emerald-500 to-teal-500"
              />

              <PersonaCard
                icon={<VentureIcon />}
                title="Business Ventures"
                description="Validate ideas, identify opportunities, and navigate the startup landscape with confidence."
                features={[
                  "Idea validation tools",
                  "Market sizing analysis",
                  "Funding landscape insights",
                  "Startup ecosystem mapping"
                ]}
                accentColor="from-orange-500 to-amber-500"
              />

              <PersonaCard
                icon={<CustomerIcon />}
                title="Customers"
                description="Understand market offerings, compare solutions, and make confident purchasing decisions."
                features={[
                  "Product comparisons",
                  "Review aggregation",
                  "Price tracking",
                  "Recommendation engine"
                ]}
                accentColor="from-pink-500 to-rose-500"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24 bg-white">
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">Powerful Features</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Everything you need to transform raw data into strategic decisions.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <Feature
                title="Real-time Analytics"
                description="Live data streams and instant insights keep you ahead of market movements."
              />
              <Feature
                title="AI-Powered Insights"
                description="Machine learning algorithms surface hidden patterns and opportunities."
              />
              <Feature
                title="Custom Dashboards"
                description="Build personalized views that match your unique decision-making process."
              />
              <Feature
                title="Collaborative Tools"
                description="Share insights, annotate findings, and make decisions as a team."
              />
              <Feature
                title="Secure & Compliant"
                description="Enterprise-grade security with full regulatory compliance."
              />
              <Feature
                title="API Integration"
                description="Connect your existing tools and data sources seamlessly."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-12 shadow-xl">
              <h2 className="mb-4 text-4xl font-bold text-white">Ready to Transform Your Decisions?</h2>
              <p className="mb-8 text-lg text-violet-100">
                Join thousands of businesses, investors, and entrepreneurs who trust our platform
                for their strategic insights.
              </p>
              <Link
                href={session ? "/dashboard" : "/api/auth/signin"}
                className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-violet-700 transition hover:bg-gray-100"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="border-t border-gray-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600" />
                <span className="text-xl font-bold text-gray-900">Handuraw</span>
              </div>
              <p className="text-gray-600">
                Business Insight Tools for Decision Discovery
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 transition hover:text-gray-900">Privacy</a>
                <a href="#" className="text-gray-600 transition hover:text-gray-900">Terms</a>
                <a href="#" className="text-gray-600 transition hover:text-gray-900">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HydrateClient>
  );
}
