import { useTheme } from './ThemeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import ActivityTicker from './components/sections/ActivityTicker'
import Dashboard from './components/sections/Dashboard'
import AIInsights from './components/sections/AIInsights'
import WorkflowAutomation from './components/sections/WorkflowAutomation'
import TeamActivity from './components/sections/TeamActivity'
import CtaBanner from './components/sections/CtaBanner'

export default function App() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#080b0e]' : 'bg-stone-50'}`}>
      <Navbar />
      <main>
        <Hero />
        <ActivityTicker />
        <Dashboard />
        <AIInsights />
        <WorkflowAutomation />
        <TeamActivity />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
