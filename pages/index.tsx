import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Card, CardHeader, CardContent, Separator, Badge, Toaster } from '@/components/ui';
import { Activity, Shield, Users, Code, Server, Lightbulb, Rocket, Zap, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import { DemoModeButton } from '@/components/demo-mode-button';
import clsx from 'clsx';

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Social SDR Agent – AI-Powered Sales Development</title>
        <meta name="description" content="Enterprise-grade AI SDR platform built with the Harness Engineering Methodology." />
      </Head>

      <Toaster />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Social SDR Agent</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Autonomous AI-driven Sales Development Representative that turns signals into meetings – guaranteed.
          </p>
          <DemoModeButton />
        </section>

        {/* Executive Summary */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
          <p className="text-lg">
            The Social SDR Agent automates the entire outbound sales development lifecycle – from signal detection to meeting booking – while enforcing human-in-the-loop governance, full traceability, and continuous learning. Built on the Harness Engineering Methodology, it delivers a measurable increase in SDR productivity and pipeline predictability.
          </p>
        </section>

        {/* Business Problem */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Business Problem</h2>
          <p className="text-lg">
            SDRs spend &gt;60 % of their time on manual, low-value tasks (signal monitoring, prospect research, drafting outreach, logging outcomes). This leads to inconsistent messaging, missed opportunities, and difficulty scaling while staying compliant.
          </p>
        </section>

        {/* Solution Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Solution Overview</h2>
          <p className="text-lg">
            An AI-powered microservice architecture that ingests public signals, scores and enriches prospects, generates personalized outreach, forces human approval, manages conversations, captures outcomes, and feeds learning back into the model – all governed by a transparent, auditable kernel.
          </p>
        </section>

        {/* Architecture Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Architecture Highlights</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Engineering Kernel</h3>
              <p className="text-sm">Intent, Assumptions, Evidence, Reasoning, Decision Maker, Knowledge Updater, Registry.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Eight Loosely-Coupled Harnesses</h3>
              <p className="text-sm">Signal → Prospect → Research → Outreach → Review → Conversation → Feedback/Learning → Governance.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Event-Bus & Immutable Logs</h3>
              <p className="text-sm">All harnesses publish domain events; Knowledge & Evidence logs provide immutable audit trails.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">REST API + Demo Mode</h3>
              <p className="text-sm">Thin HTTP façade (`/status`, `/signals/poll`, …) plus a one-click deterministic demo that walks the full pipeline.</p>
            </div>
          </div>
        </section>

        {/* Harness Engineering Methodology */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Harness Engineering Methodology</h2>
          <ol className="list-decimal list-inset space-y-2 text-lg">
            <li>Intent → Requirements → Architecture → Engineering Kernel → Harnesses → Verification → Knowledge Capture → Continuous Learning</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            Each phase produces verifiable artefacts (DONE.html, PLAN.md, CURRENT.md, ADRs, unit tests) that are kept in the repository for traceability.
          </p>
        </section>

        {/* Engineering Kernel Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Engineering Kernel Overview</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Intent</h3>
              <p className="text-sm">Captures the business goal and success criteria.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Assumptions</h3>
              <p className="text-sm">Explicit, revisitable assumptions that bound the solution.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Evidence Log</h3>
              <p className="text-sm">Append-only store of all observations supporting decisions.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Reasoning Engine</h3>
              <p className="text-sm">Logic-based inference that ties evidence to decisions.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Decision Maker</h3>
              <p className="text-sm">Selects the best action based on kernel state.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Knowledge Updater</h3>
              <p className="text-sm">Persists learned patterns for reuse.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold">Registry</h3>
              <p className="text-sm">Dependency-injection container for kernel services.</p>
            </div>
          </div>
        </section>

        {/* System Components */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">System Components</h2>
          <div className="space-y-4">
            {[
              {icon: <Activity className="mr-2 h-4 w-4" />, title: 'Signal Monitoring', desc: 'Scrapes news, social, intent data → publishes `signal_detected`.'},
              {icon: <Users className="mr-2 h-4 w-4" />, title: 'Prospect Identification', desc: 'Scores signals against ICP → creates/updates prospect records.'},
              {icon: <Shield className="mr-2 h-4 w-4" />, title: 'Research', desc: 'Enriches prospect with technographics, news, patents → publishes `prospect_enriched`.'},
              {icon: <Code className="mr-2 h-4 w-4" />, title: 'Outreach Generation', desc: 'Creates personalized email/LinkedIn sequences → publishes `outreach_drafted`.'},
              {icon: <CheckCircle className="mr-2 h-4 w-4" />, title: 'Human Review', desc: 'Mandatory approval queue before any outreach is sent.'},
              {icon: <Zap className="mr-2 h-4 w-4" />, title: 'Conversation Management', desc: 'Tracks inbound/outbound messages, sentiment, intent → triggers feedback.'},
              {icon: <TrendingUp className="mr-2 h-4 w-4" />, title: 'Feedback & Learning', desc: 'Records outcomes (meeting booked, response) → updates kernel knowledge.'},
              {icon: <Server className="mr-2 h-4 w-4" />, title: 'Governance', desc: 'PII detection, consent checks, policy enforcement → publishes audit events.'},
            ].map(({icon, title, desc}, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Badge variant="secondary" className="flex-shrink-0">{icon}</Badge>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Python 3.11 (stdlib)</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Next.js 13 (React 18)</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Tailwind CSS</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">shadcn/ui</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Lucide Icons</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Event-Bus (in-process)</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">JSON-Lines Knowledge/Evidence Logs</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded">Docker-ready</span>
          </div>
        </section>

        {/* Demo Workflow */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Demo Workflow (one-click)</h2>
          <ol className="list-decimal list-inset space-y-2 text-lg">
            <li>Signal detected (LinkedIn-style post)</li>
            <li>Prospect qualified (ICP score)</li>
            <li>Research completed (enrichment data)</li>
            <li>AI reasoning (outreach generation)</li>
            <li>Human approval (review queue)</li>
            <li>Message sent (outreach marked SENT)</li>
            <li>Prospect replied (inbound conversation)</li>
            <li>Knowledge captured (lesson note)</li>
            <li>Analytics refreshed (KPIs update)</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-2">
            Total runtime ≈ 60-90 seconds, fully deterministic, no external APIs required.
          </p>
        </section>

        {/* Current Prototype Scope */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Current Prototype Scope</h2>
          <ul className="list-disc list-inset space-y-1 text-lg">
            <li>End-to-end pipeline with synthetic data.</li>
            <li>All eight harnesses implemented and unit-tested.</li>
            <li>Engineering Kernel (Intent, Assumptions, Evidence, Reasoning, Decision, Knowledge Updater, Registry).</li>
            <li>REST API exposing every harness (see API_REFERENCE.md).</li>
            <li>Full ADR suite, engineering lifecycle documents, and test suite.</li>
            <li>Deploy-ready Dockerfile, Procfile, Railway config, health endpoint.</li>
          </ul>
        </section>

        {/* Future Roadmap */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Future Roadmap</h2>
          <ol className="list-decimal list-inset space-y-2 text-lg">
            <li>Plug-in real data sources (LinkedIn Sales Navigator, Crunchbase, GDELT).</li>
            <li>Swap the in-process event bus for a durable broker (Redis/Kafka).</li>
            <li>Add model-retraining pipeline with feedback loops.</li>
            <li>Introduce role-based RBAC and SSO.</li>
            <li>Export to Kubernetes-native Helm chart.</li>
            <li>Add multilingual outreach templates.</li>
            <li>Build a dedicated Streamlit front-end for business users.</li>
          </ol>
        </section>

        {/* Engineering Lifecycle Visual */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Engineering Lifecycle</h2>
          <div className="flex flex-col items-center gap-4">
            {[
              {label: 'Intent',   num: 1},
              {label: 'Requirements', num: 2},
              {label: 'Architecture', num: 3},
              {label: 'Engineering Kernel', num: 4},
              {label: 'Harnesses', num: 5},
              {label: 'Verification', num: 6},
              {label: 'Knowledge Capture', num: 7},
              {label: 'Continuous Learning', num: 8},
            ].map(({label, num}, i) => (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                    {num}
                  </div>
                  <span className="text-lg font-medium">{label}</span>
                </div>
                {i < 7 && <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>}
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;