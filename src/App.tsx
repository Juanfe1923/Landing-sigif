import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Workflow from './components/Workflow';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';

function App() {
  const { toasts, showToast, closeToast } = useToast();

  return (
    <div className="relative min-h-screen bg-ink-950">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <CTA onToast={showToast} />
      <ScrollToTop />

      <div className="fixed bottom-6 left-6 z-[70] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={closeToast} />
        ))}
      </div>
    </div>
  );
}

export default App;
