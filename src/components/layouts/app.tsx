import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, Outlet } from 'react-router-dom'
import {
  Home,
  Scan,
  History,
  Settings,
  Info,
} from 'lucide-react'
import { TennisBall } from '@/components/icons/tennis-ball'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    icon: Home,
  },
  {
    path: '/analysis',
    label: 'Analysis',
    icon: Scan,
  },
  {
    path: '/history',
    label: 'History',
    icon: History,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 640
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Resolve current title dynamically based on active path
  const currentNav = NAV_ITEMS.find((item) => {
    if (item.path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(item.path)
  })

  const currentTitle = currentNav?.label || 'Tennis Vision'

  // Desktop Mode: Tampilan pemberitahuan elegan menggunakan komponen shadcn/ui
  if (isDesktop) {
    return (
      <div className="min-h-screen w-full bg-slate-100/70 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none">
        <Card className="max-w-md w-full border-border/80 shadow-xl rounded-3xl overflow-hidden bg-card text-card-foreground">
          {/* Header Visual */}
          <div className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pt-8 pb-3 flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center text-primary mb-3">
              <TennisBall className="size-8 stroke-[1.75]" />
            </div>
            <Badge variant="outline" className="font-mono text-[11px] tracking-wider uppercase px-2.5 py-0.5">
              TENNIS VISION
            </Badge>
          </div>

          <CardHeader className="text-center px-6 pt-2 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Khusus Perangkat Mobile
            </CardTitle>
            <CardDescription className="text-xs mt-1.5 leading-relaxed text-muted-foreground">
              Aplikasi ini dirancang khusus untuk kenyamanan interaksi pada layar perangkat mobile / smartphone.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-4 space-y-4">
            {/* Resolution specs card */}
            <div className="rounded-2xl bg-muted/60 border border-border/60 p-4 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Resolusi Layar Saat Ini</span>
                <Badge variant="secondary" className="font-mono font-medium">
                  {typeof window !== 'undefined' ? `${window.innerWidth}px` : 'Desktop'}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Batas Ukuran Mobile</span>
                <Badge
                  variant="outline"
                  className="font-mono font-medium border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                >
                  ≤ 640px (Mobile Viewport)
                </Badge>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/15 text-left text-xs text-muted-foreground flex gap-3 items-start">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground block mb-0.5">
                  Tips Akses di Desktop:
                </span>
                Tekan <kbd className="px-1 py-0.5 bg-background border border-border rounded text-[10px] font-mono">F12</kbd> pada browser Anda untuk beralih ke layar ponsel.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mobile Mode: Layout utama aplikasi
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-background flex flex-col justify-between font-sans max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      {/* Top Header */}
      <header className="px-5 pt-8 pb-4 bg-[#f8f9fa]/95 dark:bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              TENNIS VISION
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
              {currentTitle}
            </h1>
          </div>

          {/* Right Header Action Button: Ikon Bola Tenis */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 rounded-2xl shadow-xs active:scale-95 transition-all bg-card border-border"
            aria-label="Tennis Ball"
          >
            <TennisBall className="size-5 text-foreground" />
          </Button>
        </div>
      </header>

      {/* Main Content Area (Outlet for child routes) */}
      <main className="flex-1 px-5 pb-28 pt-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation Dock */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 z-30">
        <div className="grid grid-cols-4 items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 select-none',
                  isActive
                    ? 'bg-muted text-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className={cn('size-5 transition-transform', isActive && 'scale-105')} />
                <span className="text-[11px] mt-1 tracking-tight">
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default AppLayout
