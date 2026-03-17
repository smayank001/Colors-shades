import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import { getAchievements } from '@/mock-api/db';

export default function AchievementsPage() {
  const achievements = getAchievements();

  return (
    <>
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">Achievements</h1>
          <p className="text-lg text-muted-foreground">Celebrating our students' success and recognition in competitions.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-5 h-5 rounded-full gradient-primary hidden md:flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-hover transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-brand-yellow/10 shrink-0">
                      <Trophy className="h-6 w-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold mb-1">{a.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(a.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
