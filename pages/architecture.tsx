import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@/components/ui';

const ArchitecturePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>System Architecture – Social SDR Agent</title>
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-4">System Architecture</h1>
        <p className="text-muted-foreground">
          Placeholder for architecture diagrams, component interactions, data flow, and deployment view.
        </p>
      </main>
    </>
  );
};

export default ArchitecturePage;