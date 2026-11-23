import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Tennis Vision AI</CardTitle>
          <CardDescription>
            React + Vite + TypeScript + Tailwind CSS + shadcn/ui
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">
            Setup Berhasil
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export default App
