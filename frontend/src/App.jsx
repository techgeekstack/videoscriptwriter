import { useEffect, useRef } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ScriptForm from "./components/ScriptForm.jsx";
import OutputGrid from "./components/OutputGrid.jsx";
import LoadingState from "./components/LoadingState.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import Footer from "./components/Footer.jsx";
import { useGenerateScript } from "./hooks/useGenerateScript.js";

export default function App() {
  const { data, loading, error, generate, reset } = useGenerateScript();
  const outputRef = useRef(null);

  useEffect(() => {
    if (data || loading) {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data, loading]);

  const handleSubmit = async (payload) => {
    try {
      await generate(payload);
    } catch {
      // error is surfaced via the hook's `error` state
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-brand-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-40 -right-32 w-[36rem] h-[36rem] rounded-full bg-accent-500/15 blur-3xl"
      />

      <Header />
      <Hero />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pb-16">
        <ScriptForm onSubmit={handleSubmit} loading={loading} />

        <div ref={outputRef} className="mt-8 sm:mt-10 space-y-5">
          <ErrorBanner message={error} onDismiss={reset} />
          {loading ? <LoadingState /> : null}
          {!loading && data ? <OutputGrid data={data} /> : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
