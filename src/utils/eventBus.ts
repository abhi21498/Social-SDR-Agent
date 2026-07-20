type EventCallback = (data: any) => void;

interface Subscription {
  id: number;
  callback: EventCallback;
}

class EventBus {
  private topics: Map<string, Subscription[]> = new Map();
  private idCounter = 1;

  publish(topic: string, data: any): void {
    const subs = this.topics.get(topic);
    if (subs) {
      subs.forEach(sub => {
        try {
          sub.callback(data);
        } catch (e) {
          console.error(`Error in event handler for ${topic}:`, e);
        }
      });
    }
  }

  subscribe(topic: string, callback: EventCallback): () => void {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, []);
    }
    const sub: Subscription = { id: this.idCounter++, callback };
    this.topics.get(topic)!.push(sub);
    return () => {
      const subs = this.topics.get(topic);
      if (subs) {
        const idx = subs.findIndex(s => s.id === sub.id);
        if (idx !== -1) {
          subs.splice(idx, 1);
        }
      }
    };
  }
}

export const eventBus = new EventBus();

// Define event types for the pipeline
export const PipelineEventType = {
  SignalAdded: 'SignalAdded',
  ProspectScored: 'ProspectScored',
  ResearchCompleted: 'ResearchCompleted',
  OutreachGenerated: 'OutreachGenerated',
  OutreachApproved: 'OutreachApproved',
  ConversationStarted: 'ConversationStarted',
  KnowledgeUpdated: 'KnowledgeUpdated',
  AnalyticsUpdated: 'AnalyticsUpdated',
} as const;
