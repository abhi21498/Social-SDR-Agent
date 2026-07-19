import type { NextPage } from 'next';
import { useEffect } from 'react';
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
      url: 'https://linkedin.com/posts/demo`,
      timestamp: new Date().toISOString(),
      content: 'Demo LinkedIn post showing a company milestone – perfect for ICP match: Technology, 200‑500 employees, recent funding.',
      relevanceScore: 0.85,
      sentiment: 'positive',
      tags: ['funding', 'technology', 'growth'],
    })
  },
  { label: 'Prospect enriched', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.ProspectScored,
    payload: () => ({
      prospectId: Date.now() - 5000,
      score: 85,
      stage: 'RESEARCH_COMPLETE',
    })
  },
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
    })
  },
  { label: 'Message generated', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.OutreachGenerated,
    payload: () => ({
      draftId: Date.now() - 15000,
      prospectId: Date.now() - 15000,
      subject: `Hey {{firstName}}, saw your Demo Series B funding – let’s talk`,
      body: `Hi {{firstName}},\n\nCongrats on the funding! I’d love to discuss how we can help you scale further.\n\nBest,\n[Your Name]`,
      channel: 'EMAIL',
      variant: 'A',
    })
  },
  { label: 'Approved', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.OutreachApproved,
    payload: () => ({
      draftId: Date.now() - 20000,
      comment: 'Looks good – approved',
    })
  },
  { label: 'Sent', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: null,
    payload: () => ({})
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
    })
  },
  { label: 'Knowledge updated', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.KnowledgeUpdated,
    payload: () => ({
      articleId: Date.now() - 30000,
      title: `Lesson: Demo Series B funding`,
      type: 'NOTE',
      tags: ['lesson', 'linkedin'],
      contentSummary: 'Captured key insight from the signal for future reference.',
    })
  },
  { label: 'Dashboard refreshed', icon: <Activity className="mr-2 h-4 w-4" />, delay: 5000,
    emit: PipelineEventType.AnalyticsUpdated,
    payload: () => ({})
  },
];

const DemoModePage: NextPage = () => {
  useEffect(() => {
    const start = async () => {
      for (let i = 0; i < DEMO_STEPS.length; i++) {
        await new Promise(res => setTimeout(res, DEMO_STEPS[i].delay));
        if (DEMO_STEPS[i].emit && DEMO_STEPS[i].payload) {
          eventBus.emit(DEMO_STEPS[i].emit, DEMO_STEPS[i].payload());
        }
      }
      // Demo finished – redirect to dashboard
      setTimeout(() => { window.location.href = '/dashboard'; }, 800);
    };
    start();
  }, []);

  return (
    <>
      <Toaster />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Running Demo…</h2>
          <p className="text-lg">
            The AI SDR Agent is executing the full pipeline automatically.
          </p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Cancel & Return to Landing
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default DemoModePage;