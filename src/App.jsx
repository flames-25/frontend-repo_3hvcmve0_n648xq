import { useState } from 'react';
import Hero from './components/Hero';
import StoryScroll from './components/StoryScroll';
import ReportPreview from './components/ReportPreview';
import Footer from './components/Footer';
import EmailUnlockModal from './components/EmailUnlockModal';

export default function App() {
  const [modal, setModal] = useState(false);
  const [queuedUrl, setQueuedUrl] = useState('');

  const startAudit = (url) => {
    setQueuedUrl(url);
    setModal(true);
  };

  const unlock = (email) => {
    // For now just close and show a simple alert. In a real app we'd hit the backend.
    setModal(false);
    setTimeout(() => {
      alert(`Report unlocked for ${email} — auditing ${queuedUrl}`);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen w-full bg-black font-inter text-white">
      <Hero onStartAudit={startAudit} />
      <StoryScroll />
      <ReportPreview />
      <Footer />
      <EmailUnlockModal open={modal} onClose={() => setModal(false)} onUnlock={unlock} />
    </div>
  );
}
