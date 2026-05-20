import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Dashboard from './components/sections/Dashboard'
import AIInsights from './components/sections/AIInsights'
import WorkflowAutomation from './components/sections/WorkflowAutomation'
import TeamActivity from './components/sections/TeamActivity'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <AIInsights />
        <WorkflowAutomation />
        <TeamActivity />
      </main>
      <Footer />
    </div>
  )
}
