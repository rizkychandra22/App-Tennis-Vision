import { useState } from 'react'
import {
  Camera,
  Sliders,
  Info,
  ChevronRight,
  ArrowLeft,
  Check,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type ActiveSubView = 'main' | 'kalibrasi' | 'parameter' | 'tentang'

export default function SettingsPage() {
  const [activeView, setActiveView] = useState<ActiveSubView>('main')

  // Parameter State
  const [courtType, setCourtType] = useState<'single' | 'double'>('single')
  const [sensitivity, setSensitivity] = useState<'normal' | 'high'>('high')
  const [showTrajectory, setShowTrajectory] = useState(true)

  return (
    <div className="space-y-3 pt-1">
      {/* 1. SUBVIEW: KALIBRASI KAMERA */}
      {activeView === 'kalibrasi' && (
        <div className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setActiveView('main')}
            className="text-xs -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 mr-1" /> Kembali ke Pengaturan
          </Button>

          <Card className="rounded-3xl border-border/60 shadow-xs bg-card">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Camera className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Kalibrasi Kamera
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Penyesuaian matriks homografi lapangan tenis
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/50 border border-border/50 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status Kalibrasi Garis</span>
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 font-mono text-[10px]">
                    ✓ Terkalibrasi (ITF 2D)
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sudut Kemiringan Kamera</span>
                  <span className="font-mono font-medium text-foreground">~35° Elevated</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rekomendasi Penempatan</span>
                  <span className="font-medium text-foreground">Belakang Baseline (Pusat)</span>
                </div>
              </div>

              <Button
                type="button"
                className="w-full rounded-full h-11 text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
                onClick={() => alert('Fitur kalibrasi ulang sudut kamera via feed kamera aktif.')}
              >
                <Camera className="size-3.5" />
                <span>Mulai Ulang Kalibrasi Garis</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2. SUBVIEW: PARAMETER DETEKSI */}
      {activeView === 'parameter' && (
        <div className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setActiveView('main')}
            className="text-xs -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 mr-1" /> Kembali ke Pengaturan
          </Button>

          <Card className="rounded-3xl border-border/60 shadow-xs bg-card">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Sliders className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Parameter Deteksi
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Pengaturan model pelacakan bola & garis
                  </p>
                </div>
              </div>

              {/* Tipe Lapangan */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Format Lapangan Tenis
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={courtType === 'single' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCourtType('single')}
                    className="rounded-xl text-xs h-9"
                  >
                    {courtType === 'single' && <Check className="size-3.5 mr-1" />}
                    Tunggal (Single)
                  </Button>
                  <Button
                    type="button"
                    variant={courtType === 'double' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCourtType('double')}
                    className="rounded-xl text-xs h-9"
                  >
                    {courtType === 'double' && <Check className="size-3.5 mr-1" />}
                    Ganda (Double)
                  </Button>
                </div>
              </div>

              {/* Sensitivitas Pelacak Bola */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-foreground">
                  Sensitivitas Pelacakan Bola
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={sensitivity === 'normal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSensitivity('normal')}
                    className="rounded-xl text-xs h-9"
                  >
                    Standar (30 FPS)
                  </Button>
                  <Button
                    type="button"
                    variant={sensitivity === 'high' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSensitivity('high')}
                    className="rounded-xl text-xs h-9"
                  >
                    Tinggi (60 FPS+)
                  </Button>
                </div>
              </div>

              {/* Toggle Lintasan */}
              <div className="rounded-2xl bg-muted/40 border border-border/50 p-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-foreground block">Tampilkan Lintasan Bola</span>
                  <span className="text-[11px] text-muted-foreground">Garis neon jejak pantulan di layar</span>
                </div>
                <Button
                  type="button"
                  variant={showTrajectory ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowTrajectory(!showTrajectory)}
                  className="rounded-xl text-xs h-8 px-3"
                >
                  {showTrajectory ? 'Aktif' : 'Mati'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 3. SUBVIEW: TENTANG APLIKASI */}
      {activeView === 'tentang' && (
        <div className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setActiveView('main')}
            className="text-xs -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 mr-1" /> Kembali ke Pengaturan
          </Button>

          <Card className="rounded-3xl border-border/60 shadow-xs bg-card">
            <CardContent className="p-6 text-center space-y-4">
              <div className="size-16 rounded-3xl bg-muted/60 border border-border/60 mx-auto flex items-center justify-center text-foreground shadow-xs">
                <Sparkles className="size-8 stroke-[1.75]" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Tennis Vision
                </h2>
                <Badge variant="secondary" className="mt-1 font-mono text-[10px]">
                  Versi 1.0.0 (Mobile)
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Sistem analisis tenis mutakhir untuk estimasi kecepatan bola, deteksi pantulan garis In/Out presisi tinggi, dan live report pertandingan.
              </p>

              <div className="rounded-2xl bg-muted/40 border border-border/50 p-3.5 text-xs text-muted-foreground space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Antarmuka Klien</span>
                  <span className="font-semibold text-foreground">React + shadcn/ui</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Target Perangkat</span>
                  <span className="font-semibold text-foreground">Smartphone Mobile</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAMPILAN UTAMA (Sesuai dist/design/pengaturan.jpeg) */}
      {activeView === 'main' && (
        <div className="space-y-2.5">
          {/* Menu 1: Kalibrasi Kamera */}
          <Card
            onClick={() => setActiveView('kalibrasi')}
            className="rounded-2xl border-border/60 shadow-xs bg-card hover:border-border transition-all cursor-pointer active:scale-[0.99]"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                  <Camera className="size-5 stroke-[1.75]" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  Kalibrasi Kamera
                </span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>

          {/* Menu 2: Parameter Deteksi */}
          <Card
            onClick={() => setActiveView('parameter')}
            className="rounded-2xl border-border/60 shadow-xs bg-card hover:border-border transition-all cursor-pointer active:scale-[0.99]"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                  <Sliders className="size-5 stroke-[1.75]" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  Parameter Deteksi
                </span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>

          {/* Menu 3: Tentang Aplikasi */}
          <Card
            onClick={() => setActiveView('tentang')}
            className="rounded-2xl border-border/60 shadow-xs bg-card hover:border-border transition-all cursor-pointer active:scale-[0.99]"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                  <Info className="size-5 stroke-[1.75]" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  Tentang Aplikasi
                </span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
