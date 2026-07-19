import type { NextPage } from 'next';
import Head from 'next/head';
import { Card, CardHeader, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Separator, Badge, Toaster, Button } from '@/components/ui';
import { Activity, Users, Shield, Code, CheckCircle, Zap, TrendingUp, Server } from 'lucide-react';
import clsx from 'clsx';

const HarnessEngineeringPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Harness Engineering – Social SDR Agent</title>
        <meta name="description" content="Detailed view of each of the eight harnesses in the AI SDR Agent." />
      </Head>

      <Toaster />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6">Harness Engineering Details</h1>
        <p className="text-muted-foreground mb-6">
          Each harness is an independent, testable module with a well‑defined event contract.
        </p>

        <Tabs defaultValue="signal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2 mb-4">
            {[['signal','Signal Monitoring'],['prospect','Prospect Identification'],['research','Research'],['outreach','Outreach Generation'],['review','Human Review'],['conversation','Conversation Management'],['feedback','Feedback & Learning'],['governance','Governance']].map(([value,label])=>(
              <TabsTrigger key={value} value={value} className={`${()=>clsx('w-full h-12 rounded-md text-sm font-medium','border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800')}`}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Signal Monitoring */}
          <TabsContent value="signal" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Signal Monitoring</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Ingest raw public signals (news, social media, regulatory filings, intent data) and publish normalized events.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Public feeds (RSS/Twitter/LinkedIn/NewsAPI/Webhooks), configuration (keywords, sources, rate limits).</p>
                <p className="text-sm"><strong>Outputs:</strong> Event `signal_detected` with schema: {id, source, title, url, timestamp, content, relevanceScore, sentiment, tags[]}.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Fetch & deduplicate signals.</li>
                  <li>Relevance scoring against ICP heuristics.</li>
                  <li>Sentiment & language detection.</li>
                  <li>Publish to event bus.</li>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> None (only emits).</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Unit test suite validates parsing, scoring, dedup, event shape.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Signal source reliability, temporal patterns, keyword efficacy.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Network timeout, malformed feed, rate‑limit → circuit breaker + dead‑letter queue.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> No signal dropped without being scored; enrichment never mutates original signal; all timestamps ISO‑8601 UTC.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing raw signal detector logs…')}>
                  View Logs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prospect Identification */}
          <TabsContent value="prospect" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Prospect Identification</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Score incoming signals against the Ideal Customer Profile (ICP) and create or enrich prospect records.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Event `signal_detected`; ICP definition (firmographics, technographics, behavior).</p>
                <p className="text-sm"><strong>Outputs:</strong> Event `prospect_scored` with schema: {prospectId, score (0‑100), stage, timestamp}.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Match signal to existing prospect or create new.</li>
                  <li>Apply weighted scoring model (firmographic 40 %, technographic 30 %, behavioral 30 %).</li>
                  <li>Update prospect attributes (lastSeen, source, tags).</li>
                  <li>Publish score event.</li>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `signal_detected`; emits `prospect_scored`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Property‑based test for score bounds; integration test with mock signal bus.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> ICP weight effectiveness, source‑to‑conversion ratios.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Missing prospect storage → fallback to in‑mem store with warning.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> Score always 0‑100; stage progression monotonic; prospect ID immutable after creation.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing prospect store snapshot…')}>
                  Peek Store
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research */}
          <TabsContent value="research" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Research</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Enrich prospects with deep context (technographics, recent news, patents, financials) to enable personalized outreach.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Event `prospect_scored` (score ≥ threshold).</p>
                <p className="text-sm"><strong>Outputs:</strong> Event `research_completed` with schema: {researchId, prospectId, data: {technographics:string, recentNews:string, newsSentiment:string}}.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Call enrichment APIs (Crunchbase, LinkedIn, BuiltWith, etc.) or use cached data.</li>
                  <li>Summarize findings into structured fields.</li>
                  <li>Publish enriched data event.</li>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `prospect_scored`; emits `research_completed`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Mocked enrichment service; validates output schema and fallback behavior.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Enrichment source reliability, data freshness thresholds.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> API rate‑limit → exponential backoff + stale‑data allowed flag.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> Enrichment never reduces prospect score; timestamp always newer than prospect.lastSeen.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing latest enrichment call…')}>
                  Last Call
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outreach Generation */}
          <TabsContent value="outreach" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Code className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Outreach Generation</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Create personalized email or LinkedIn outreach sequences based on prospect research.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Event `research_completed`.</p>
                <p className="text-sm"><strong>Outputs:</strong> Event `outreach_generated` with schema: {draftId, prospectId, subject:string, body:string, channel:'EMAIL'|'LINKEDIN_MESSAGE', variant:string}.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Select template based on industry, persona, score.</li>
                  <li>Merge fields (firstName, company, pain point, recent news).</li>
                  <li>Apply tone & length constraints.</li>
                  <li>Log generation for explainability.</li>
                  <li>Publish draft event.</li>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `research_completed`; emits `outreach_generated`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Unit test checks personalization fidelity, token limits, variant branching.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Template performance metrics (open/response rates by segment).</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Template rendering error → fallback to generic template + alert.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> No PII in output without consent; subject length < 78 chars; body contains unsubscribe link for email.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing generated draft preview…')}>
                  Preview Draft
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Human Review */}
          <TabsContent value="review" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Human Review</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Mandatory approval step before any outreach is transmitted – ensures compliance and quality.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Event `outreach_generated`.</p>
                <p className="text-sm"><strong>Outputs:</strong> Either `outreach_approved` (with optional comment) or `outreach_rejected` (with reason).</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Persist draft to review queue (in‑memory or durable).</li>
                  <li>Notify reviewer via UI/email.</li>
                  <li>On approval → emit `outreach_approved`; on rejection → emit `outreach_rejected` with feedback.</li>
                  <li>Retain rejected drafts for learning.</li>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `outreach_generated`; emits `outreach_approved` or `outreach_rejected`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Integration test simulates reviewer action; validates state transition and event emission.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Reviewer comment patterns, common rejection reasons, approval latency.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Queue overflow → back‑pressure signal to upstream harness.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> No outreach proceeds without an explicit approval event; all actions audited.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing pending review queue…')}>
                  View Queue
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversation Management */}
          <TabsContent value="conversation" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Conversation Management</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Track inbound/outbound messages, compute sentiment & intent, trigger downstream learning.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Event `outreach_approved` (triggers send) + inbound messages from channels.</p>
                <p className="text-sm"><strong>Outputs:</strong> Events `conversation_started` (when first inbound arrives) and `conversation_reply` (each subsequent inbound).</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Log outbound message when `outreach_approved` received.</p>
                  <li>Listen for inbound messages via channel adapters (SMTP IMAP, LinkedIn API).</p>
                  <li>On first inbound → emit `conversation_started` with full thread.</p>
                  <li>On subsequent inbound → emit `conversation_reply` with the new message.</p>
                  <li>Compute sentiment (simple lexicon) and intent (meeting request, question, objection).</p>
                  <li>Forward outcome to Feedback & Learning harness.</p>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `outreach_approved`; emits `conversation_started` & `conversation_reply`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Mock channel adapters; validates event emission and sentiment accuracy.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Response latency, sentiment trends, intent classification accuracy.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Channel credential error → fallback to simulated inbound for demo.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> No duplicate conversation IDs; timestamps monotonic; inbound message stored immutable.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing active conversations…')}>
                  Active Chats
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback & Learning */}
          <TabsContent value="feedback" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Feedback & Learning</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Record outcomes (meeting booked, reply, no response) and feed signals back into the kernel for model updates.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> Events `conversation_reply` (positive outcome) or timeout (no response), plus `knowledge_updated` from governance.</p>
                <p className="text-sm"><strong>Outputs:</strong> `knowledge_updated` event (if new insight), plus optional `model_retrain_trigger`.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Determine outcome: meeting booked (explicit intent), positive response, neutral, negative, or timeout.</p>
                  <li>Append outcome to `evidence.log` and, if informative, to `knowledge.log`.</p>
                  <li>Compute simple metrics (reply rate, meeting rate) for internal dashboards.</p>
                  <li>If confidence threshold crossed, emit `model_retrain_trigger` (future hook).</p>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes `conversation_reply` and `knowledge_updated`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Integration test simulates conversation flow; validates logging and metric updates.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Outcome‑to‑signal mapping, optimal follow‑up timing, objection handling.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Log write error → fallback to in‑mem buffer with alert.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> Logs are append‑only; each outcome entry references a unique prospect/conversation ID; no PII stored unless consented.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing latest feedback entry…')}>
                  Latest Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance" className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <Card className="space-y-4">
              <CardHeader className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <Server className="h-4 w-4" />
                </div>
                <h2 className="text-xl font-medium">Governance</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Purpose:</strong> Enforce policies (PII detection, consent, compliance) and emit audit events for traceability.
                </p>
                <Separator />
                <p className="text-sm"><strong>Inputs:</strong> All upstream events (signal_detected, prospect_scouted, outreach_generated, conversation_reply, etc.).</p>
                <p className="text-sm"><strong>Outputs:</strong> Event `governance_audit` with schema: {auditId, eventType, details, timestamp, policyViolations[]}.</p>
                <p className="text-sm"><strong>Responsibilities:</strong></p>
                <ul className="list-disc list-inset space-y-1 text-xs pl-4">
                  <li>Scan all incoming data for PII (email, phone, SSN) using regex/NER.</li>
                  <li>Check consent flags against prospect record.</li>
                  <li>Validate message content against allowed templates and language.</p>
                  <li>If violation → enrich event with `policyViolations` and optionally block downstream transmission.</p>
                  <li>Publish audit event regardless (even if clean).</p>
                </p>
                <p className="text-sm"><strong>Dependencies:</strong> Consumes every upstream event; emits `governance_audit`.</p>
                <p className="text-sm"><strong>Current Status:</strong> Implemented & unit‑tested.</p>
                <p className="text-sm"><strong>Verification:</strong> Property‑based test for PII detection; integration test ensures no prohibited data leaks.</p>
                <p className="text-sm"><strong>Knowledge Produced:</strong> Policy violation trends, false‑positive/negative rates of scanners.</p>
                <p className="text-sm"><strong>Failure Modes:</strong> Scanner crash → fallback to permissive mode + alert.</p>
                <p className="text-sm"><strong>Protected Invariants:</strong> No outbound message leaves the system without a successful governance audit; audit ID is monotonic.</p>
                <Button variant="outline" size="sm" onClick={() => alert('Showing recent governance audit…')}>
                  View Audit Log
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default HarnessEngineeringPage;