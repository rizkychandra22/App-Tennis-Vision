import { useState } from 'react'
import {
  Film,
  ChevronRight,
  Play,
  Zap,
  Target,
  ArrowLeft,
  CloudUpload,
  Radio,
  Camera,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface HistoryItem {
  id: string
  title: string
  subtitle: string
  source: 'upload' | 'live'
  date: string
  duration: string
  avgSpeed: number
  peakSpeed: number
  inPercentage: number
  totalBounces: number
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    title: 'Analisis Pertandingan 01',
    subtitle: 'Contoh hasil analisis #1',
    source: 'upload',
    date: '23 Nov 2026',
    duration: '02:45',
    avgSpeed: 142,
    peakSpeed: 188,
    inPercentage: 86,
    totalBounces: 24,
  },
  {
    id: '2',
    title: 'Analisis Pertandingan 02',
    subtitle: 'Contoh hasil analisis #2',
    source: 'upload',
    date: '22 Nov 2026',
    duration: '01:30',
    avgSpeed: 135,
    peakSpeed: 176,
    inPercentage: 92,
    totalBounces: 18,
  },
  {
    id: '3',
    title: 'Analisis Servis 03',
    subtitle: 'Contoh hasil analisis #3',
    source: 'upload',
    date: '20 Nov 2026',
    duration: '00:54',
    avgSpeed: 165,
    peakSpeed: 195,
    inPercentage: 78,
    totalBounces: 12,
  },
  {
    id: '4',
    title: 'Live Stream Lapangan Utama',
    subtitle: 'Sesi latihan servis pagi',
    source: 'live',
    date: '23 Nov 2026',
    duration: '15:20',
    avgSpeed: 148,
    peakSpeed: 192,
    inPercentage: 84,
    totalBounces: 62,
  },
  {
    id: '5',
    title: 'Live Stream Pertandingan 01',
    subtitle: 'RTSP Feed Lapangan B',
    source: 'live',
    date: '21 Nov 2026',
    duration: '08:45',
    avgSpeed: 138,
    peakSpeed: 180,
    inPercentage: 89,
    totalBounces: 44,
  },
]

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  const uploadHistory = MOCK_HISTORY.filter((item) => item.source === 'upload')
  const liveHistory = MOCK_HISTORY.filter((item) => item.source === 'live')

  const renderHistoryList = (items: HistoryItem[]) => {
    if (items.length === 0) {
      return (
        <Card className="rounded-2xl border-border/60 shadow-xs bg-card p-6 text-center text-muted-foreground text-xs">
          Belum ada riwayat analisis pada kategori ini.
        </Card>
      )
    }

    return (
      <div className="space-y-2.5">
        {items.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-2xl border-border/60 shadow-xs bg-card hover:border-border transition-all cursor-pointer active:scale-[0.99]"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                  {item.source === 'live' ? (
                    <Camera className="size-5 stroke-[1.75] text-emerald-600" />
                  ) : (
                    <Film className="size-5 stroke-[1.75]" />
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 pt-1">
      {/* Tampilan Detail jika salah satu item dipilih */}
      {selectedItem ? (
        <div className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSelectedItem(null)}
            className="text-xs -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 mr-1" /> Kembali ke Riwayat
          </Button>

          <Card className="rounded-3xl border-border/60 shadow-xs bg-card overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {selectedItem.date} • {selectedItem.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`font-mono text-[10px] ${
                        selectedItem.source === 'live'
                          ? 'border-emerald-500/40 text-emerald-600'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {selectedItem.source === 'live' ? '● Live Stream' : 'Video Upload'}
                    </Badge>
                  </div>

                  <h2 className="text-base font-bold text-foreground">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedItem.subtitle}
                  </p>
                </div>

                <div className="size-11 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground shrink-0">
                  {selectedItem.source === 'live' ? (
                    <Radio className="size-5 text-emerald-600" />
                  ) : (
                    <Film className="size-5" />
                  )}
                </div>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-muted/50 border border-border/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Zap className="size-3.5 text-amber-500" />
                    <span className="text-[10px] font-medium">Kecepatan Max</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-foreground">
                    {selectedItem.peakSpeed} <span className="text-xs font-normal text-muted-foreground">km/j</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-muted/50 border border-border/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Target className="size-3.5 text-emerald-500" />
                    <span className="text-[10px] font-medium">Akurasi IN</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-foreground">
                    {selectedItem.inPercentage}%
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/30 border border-border/40 p-3 text-xs flex justify-between items-center text-muted-foreground">
                <span>Total Pantulan Terdeteksi</span>
                <span className="font-bold text-foreground font-mono">{selectedItem.totalBounces} Titik</span>
              </div>

              <Button
                type="button"
                className="w-full rounded-full h-11 text-xs font-semibold shadow-xs flex items-center justify-center gap-2 mt-2"
                onClick={() => alert(`Memutar rekaman hasil analisis: ${selectedItem.title}`)}
              >
                <Play className="size-3.5" />
                <span>Putar Video Analisis</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Tabs Berdasarkan Upload dan Live */
        <Tabs defaultValue="upload" className="w-full space-y-3">
          <TabsList className="w-full grid grid-cols-2 p-1 h-11 bg-muted/60 border border-border/60 rounded-2xl">
            <TabsTrigger
              value="upload"
              className="rounded-xl text-xs font-semibold gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
            >
              <CloudUpload className="size-3.5" />
              <span>Upload Video</span>
            </TabsTrigger>

            <TabsTrigger
              value="live"
              className="rounded-xl text-xs font-semibold gap-1.5 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-xs transition-all"
            >
              <Radio className="size-3.5 text-emerald-500" />
              <span>Kamera Live</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-0 focus-visible:outline-none">
            {renderHistoryList(uploadHistory)}
          </TabsContent>

          <TabsContent value="live" className="mt-0 focus-visible:outline-none">
            {renderHistoryList(liveHistory)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
