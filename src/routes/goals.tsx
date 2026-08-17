import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { useProfile } from '@/hooks/useProfile'
import { Target, TrendingUp, Clock, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/goals')({
  component: GoalsPage,
})

function GoalsPage() {
  const { profile } = useProfile()

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 shadow-glow">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-semibold text-gradient-brand">Reading Goals</h1>
            <p className="text-muted-foreground mt-2">Track your reading progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-8 flex flex-col items-center text-center">
            <BookOpen className="h-10 w-10 text-brand mb-4" />
            <h2 className="text-xl font-bold mb-2">Book Goal</h2>
            <p className="text-muted-foreground mb-4">Your target books to read</p>
            <div className="text-4xl font-display font-bold text-white mb-2">{profile?.reading_goal || "0"}</div>
            <div className="text-sm text-brand-3">Books per year</div>
          </div>

          <div className="glass rounded-3xl p-8 flex flex-col items-center text-center">
            <Clock className="h-10 w-10 text-brand-2 mb-4" />
            <h2 className="text-xl font-bold mb-2">Daily Time Goal</h2>
            <p className="text-muted-foreground mb-4">Target minutes per day</p>
            <div className="text-4xl font-display font-bold text-white mb-2">{profile?.daily_goal_time || "0"}</div>
            <div className="text-sm text-brand-3">Minutes per day</div>
          </div>
          
          <div className="glass rounded-3xl p-8 flex flex-col items-center text-center md:col-span-2">
             <TrendingUp className="h-10 w-10 text-green-500 mb-4" />
             <h2 className="text-xl font-bold mb-2">Pace & Progress</h2>
             <p className="text-muted-foreground mb-6">You are doing great! Keep reading to reach your goals.</p>
             <div className="w-full bg-white/5 rounded-2xl h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-brand to-brand-3 w-1/3 h-full rounded-full" />
             </div>
             <div className="w-full flex justify-between text-xs text-muted-foreground mt-2 px-2">
                <span>0</span>
                <span>{profile?.reading_goal || "50"}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
