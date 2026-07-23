import { useEffect, useState } from 'react';
import { Button, Toaster } from '@/components/ui';
import { Activity } from 'lucide-react';
import { eventBus, PipelineEventType } from '@/utils/eventBus';

const DEMO_STEPS = [
  { label: 'Signal detected',   icon: <Activity className="mr-2 h-4 w-4" />, delay: 0,
    emit: PipelineEventType.SignalAdded,
    payload: () => ({
      id: Date.now(),
      source: 'linkedin',
      title: `LinkedIn post: Demo Series B funding`,
      url: 'https://linkedin.com/posts/demo',
      timestamp: new Date().toISOString(),
      content: 'Demo LinkedIn post showing a company milestone – perfect for ICP match: Technology, 200‑500 employees, recent funding.',
      relevanceScore: 0.85,
      sentiment: 'positive',
      tags: ['funding', 'technology', 'growth'],
    }) },
  { label: 'Prospect enriched', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.ProspectScored,
    payload: () => ({
      prospectId: Date.now() - 5000,
      score: 85,
      stage: 'RESEARCH_COMPLETE',
    }) },
  { label: 'Research complete', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.ResearchCompleted,
    payload: () => ({
      researchId: Date.now() - 10000,
      prospectId: Date.now() - 10000,
      data: {
        technographics: 'Cloud‑first, uses AWS & Kubernetes',
        recentNews: 'Launched AI platform 2026-07-01',
        newsSentiment: 'positive',
      },
    }) },
  { label: 'Message generated', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.OutreachGenerated,
    payload: () => ({
      draftId: Date.now() - 15000,
      prospectId: Date.now() - 15000,
      subject: `Hey {{firstName}}, saw your Demo Series B funding – let’s talk`,
      body: `Hi {{firstName}},\n\nCongrats on the funding! I’d love to discuss how we can help you scale further.\n\nBest,\n[Your Name]`,
      channel: 'EMAIL',
      variant: 'A',
    }) },
  { label: 'Approved', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.OutreachApproved,
    payload: () => ({
      draftId: Date.now() - 20000,
      comment: 'Looks good – approved',
    }) },
  { label: 'Sent', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: null,
    payload: () => ({}),
  },
  { label: 'Prospect replied', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.ConversationStarted,
    payload: () => ({
      conversationId: Date.now() - 25000,
      prospectId: Date.now() - 25000,
      messages: [
        { id:1, direction:'OUTBOUND', timestamp:new Date(Date.now()-25000).toISOString(),
          content:`Hey {{firstName}}, saw your Demo Series B funding – let’s talk`, channel:'EMAIL', sentiment:'neutral' },
        { id:2, direction:'INBOUND', timestamp:new Date(Date.now()-20000).toISOString(),
          content:'Thanks for reaching out! I’m interested in learning more.', channel:'EMAIL', sentiment:'positive' },
      ],
    }) },
  { label: 'Knowledge updated', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.KnowledgeUpdated,
    payload: () => ({
      articleId: Date.now() - 30000,
      title: `Lesson: Demo Series B funding`,
      type: 'NOTE',
      tags: ['lesson', 'linkedin'],
      contentSummary: 'Captured key insight from the signal for future reference.',
    }) },
  { label: 'Dashboard refreshed', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.AnalyticsUpdated,
    payload: () => ({}),
  },
];

export const DemoModeButton: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState<number>(-1);
  const [status, setStatus] = useState<Array<'pending'|'running'|'success'|'error'>>(DEMO_STEPS.map(()=>'pending'));

  const startDemo = async () => {
    setRunning(true);
    setStep(-1);
    setStatus(DEMO_STEPS.map(()=>'pending'));
    (window as any).demoStartTime = Date.now();

    // 1️⃣ Call the backend to start a real poll
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.warn('NEXT_PUBLIC_API_URL not set; skipping backend call');
      } else {
        const resp = await fetch(`${apiUrl}/trigger/poll`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!resp.ok) {
          throw new Error(`Backend responded ${resp.status}: ${await resp.text()}`);
        }
        const data = await resp.json();
        console.log('Backend poll triggered:', data);
      }
    } catch (e) {
      console.error('Failed to trigger backend poll:', e);
      // Continue with demo UI even if backend call fails
    }

    // 2️⃣ Run the client‑side simulation for UI feedback
    for (let i = 0; i < DEMO_STEPS.length; i++) {
      await new Promise(res => setTimeout(res, DEMO_STEPS[i].delay));
      setStep(i);
      setStatus(prev => {
        const copy = [...prev];
        copy[i] = 'running';
        return copy;
      });

      const emitType = DEMO_STEPS[i].emit;
      if (emitType) {
        try {
          eventBus.publish(emitType, DEMO_STEPS[i].payload());
        } catch (err) {
          console.error(`Demo step ${DEMO_STEPS[i].label} failed`, err);
          setStatus(prev => {
            const copy = [...prev];
            copy[i] = 'error';
            return copy;
          });
        }
      }

      await new Promise(res => setTimeout(res, 300));
      setStatus(prev => {
        const copy = [...prev];
        copy[i] = 'success';
        return copy;
      });
    }

    // Demo finished – redirect to home after a short pause
    await new Promise(res => setTimeout(res, 800));
    window.location.href = '/';
    setRunning(false);
  };

  if (!running) {
    return (
      <Button variant="default" onClick={startDemo} className="flex items-center gap-2">
        <Activity className="mr-2 h-4 w-4" />
        Run Demo Mode
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Demo running… <span className="font-medium">{step+1}/{DEMO_STEPS.length}</span>
      </p>
      <div className="space-y-2">
        {DEMO_STEPS.map((s,i)=>(
          <div key={i} className={`flex flex-col gap-2 p-3 rounded-lg ${()=>{
            if(status[i]==='running') return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500';
            if(status[i]==='success') return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500';
            if(status[i]==='error') return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500';
            return 'bg-gray-50 dark:bg-gray-800/20';
          }}`}>
            <div className="flex items-center gap-3">
              {s.icon && <div className="flex-shrink-0">{s.icon}</div>}
              <div className="flex-1">
                <div className="font-medium">{s.label}</div>
                {status[i]==='running' && <span className="ml-2 text-xs text-blue-600 animate-pulse">Running…</span>}
                {status[i]==='success' && <span className="ml-2 text-xs text-green-600">✔️ Completed</span>}
                {status[i]==='error' && <span className="ml-2 text-xs text-red-600">❌ Failed</span>}
              </div>
              <div className={`w-full h-1 mt-1 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden`}>
                <div className={`h-full transition-all duration-500
                  ${status[i]==='pending'?'w-0':''}
                  ${status[i]==='running'?'w-1/3':''}
                  ${status[i]==='success'?'w-full':''}
                  ${status[i]==='error'?'w-full bg-red-500':''}`}></div>
              </div>
            </div>
            {(status[i] === 'success' || status[i] === 'running') && s.payload && (
              <details className="group ml-10 w-full">
                <summary className="cursor-pointer text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground">
                  <span>Show payload</span>
                  <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
                  {JSON.stringify(s.payload(), null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};