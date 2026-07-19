import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@/components/ui';

const OperationsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Operations & Observability – Social SDR Agent</title>
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-4">Operations & Observability</h1>
        <p className="text-muted-foreground">
          Placeholder for logs, metrics, alerts, health checks, and audit trails.
        </p>
      </main>
    </>
  );
};

export default OperationsPage;