import { Link } from 'react-router-dom'
import { Camera, Film, Zap, Target, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}

const METRIC_CARDS: MetricCardProps[] = [
  {
    icon: Camera,
    value: 'Siap',
    label: 'Kamera Live',
  },
  {
    icon: Film,
    value: '12',
    label: 'Video Analisis',
  },
  {
    icon: Zap,
    value: 'km/jam',
    label: 'Kecepatan Bola',
  },
  {
    icon: Target,
    value: 'In / Out',
    label: 'Bola In/Out',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-4 pt-1">
      {/* 4 Kolom Kartu Metrik (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-3.5">
        {METRIC_CARDS.map((card, index) => {
          const Icon = card.icon

          return (
            <Card key={index} className="rounded-2xl border-border/60 shadow-xs bg-card">
              <CardContent className="p-4">
                <div className="text-foreground mb-2.5">
                  <Icon className="size-6 stroke-[1.75]" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {card.label}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Kartu Aksi Utama: Mulai analisis baru */}
      <Card className="rounded-3xl border-border/60 shadow-xs bg-card">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="text-lg font-bold text-foreground">
            Mulai analisis baru
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
            Unggah video permainan untuk mendeteksi kecepatan dan titik jatuh bola.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-5">
          <Button
            asChild
            className="w-full rounded-full h-12 text-xs font-semibold shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Link to="/analysis">
              <span>Mulai Analisis</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
