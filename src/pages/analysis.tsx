import React, { useState, useRef } from 'react'
import {
  CloudUpload,
  Camera,
  FileVideo,
  X,
  ArrowRight,
  Radio,
  Link2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type AnalysisMode = 'upload' | 'live'

export default function AnalysisPage() {
  const [mode, setMode] = useState<AnalysisMode>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rtspUrl, setRtspUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeSelectedFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4 pt-1">
      {/* 2 Opsi Mode Switcher (Pill Tabs) */}
      <div className="grid grid-cols-2 p-1 bg-muted/60 border border-border/60 rounded-2xl">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 select-none',
            mode === 'upload'
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <CloudUpload className="size-4" />
          <span>Upload Video</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('live')}
          className={cn(
            'flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 select-none',
            mode === 'live'
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Radio className="size-4 text-emerald-500" />
          <span>Kamera Live</span>
        </button>
      </div>

      {/* OPSI 1: UPLOAD VIDEO */}
      {mode === 'upload' && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={handleFileChange}
          />

          <Card
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`rounded-3xl border-border/60 shadow-xs bg-card transition-all cursor-pointer min-h-[340px] flex flex-col justify-center ${
              isDragging ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-border'
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              {selectedFile ? (
                /* File Selected Preview */
                <div className="w-full flex flex-col items-center">
                  <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-3">
                    <FileVideo className="size-7 stroke-[1.75]" />
                  </div>

                  <Badge variant="secondary" className="mb-2 text-[10px] font-mono font-medium">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.split('/')[1]?.toUpperCase() || 'VIDEO'}
                  </Badge>

                  <h2 className="text-base font-bold text-foreground mb-1 max-w-[220px] truncate">
                    {selectedFile.name}
                  </h2>

                  <p className="text-xs text-muted-foreground mb-5">
                    Siap untuk dianalisis oleh sistem
                  </p>

                  <div className="flex items-center gap-2 w-full max-w-[240px]">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={removeSelectedFile}
                      className="rounded-full text-xs font-medium h-10 px-3 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                    >
                      <X className="size-3.5 mr-1" /> Ganti
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        alert(`Memulai pemrosesan video: ${selectedFile.name}`)
                      }}
                      className="rounded-full flex-1 text-xs font-semibold h-10 shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Proses</span>
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                /* Default Upload Card */
                <div className="flex flex-col items-center">
                  <div className="size-14 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center text-foreground mb-4 transition-transform group-hover:scale-105">
                    <CloudUpload className="size-8 stroke-[1.5]" />
                  </div>

                  <h2 className="text-base font-bold text-foreground mb-1.5">
                    Upload Video Tenis
                  </h2>

                  <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed mb-5">
                    Pilih file video rekaman untuk diproses.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs font-medium px-4 h-9 border-border/80 shadow-2xs pointer-events-none"
                  >
                    Pilih File Video
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-[11px] text-center text-muted-foreground leading-relaxed px-1">
            Mode video rekaman • Format file yang didukung: MP4, MOV, WEBM.
          </p>
        </>
      )}

      {/* OPSI 2: LIVE KAMERA */}
      {mode === 'live' && (
        <>
          <Card className="rounded-3xl border-border/60 shadow-xs bg-card min-h-[340px] flex flex-col justify-center">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-3 relative">
                <Camera className="size-7 stroke-[1.75]" />
                <span className="absolute -top-1 -right-1 size-3 bg-emerald-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 size-3 bg-emerald-500 rounded-full" />
              </div>

              <h2 className="text-base font-bold text-foreground mb-1.5">
                Kamera Live Streaming
              </h2>

              <p className="text-xs text-muted-foreground max-w-[250px] leading-relaxed mb-5">
                Gunakan kamera smartphone atau sambungkan feed stream IP Camera.
              </p>

              {/* RTSP Stream Input (Optional URL) */}
              <div className="w-full max-w-[280px] space-y-3">
                <div className="relative">
                  <Link2 className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="url"
                    placeholder="URL RTSP (contoh: rtsp://...)"
                    value={rtspUrl}
                    onChange={(e) => setRtspUrl(e.target.value)}
                    className="pl-9 h-10 text-xs rounded-xl bg-muted/40 border-border/70"
                  />
                </div>

                <Button
                  type="button"
                  onClick={() => alert(rtspUrl ? `Menghubungkan stream RTSP: ${rtspUrl}` : 'Membuka kamera live perangkat...')}
                  className="w-full rounded-full h-10 text-xs font-semibold shadow-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Camera className="size-4" />
                  <span>{rtspUrl ? 'Hubungkan RTSP Stream' : 'Buka Kamera Ponsel'}</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-[11px] text-center text-muted-foreground leading-relaxed px-1">
            Mode live streaming • Menganalisis kecepatan dan In/Out secara real-time.
          </p>
        </>
      )}
    </div>
  )
}
