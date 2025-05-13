// components/TextShowcase.tsx

import { Card, CardContent } from "@/components/ui/card"

export default function TextShowcase() {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl mx-4 mt-6 rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-white">Welcome Back, Tirth 👋</h2>
        <p className="text-white/80">
          Continue your journey. You’ve already completed 76% of your profile.
          Get closer to your goals with mock interviews and smart quizzes!
        </p>
      </CardContent>
    </Card>
  )
}
