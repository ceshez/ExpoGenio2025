import { Button } from "@/components/ui/button"

export default function PricingHeader() {
  return (
    <header className="border-b border-border/40 bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xs font-black text-white">G</span>
            </div>
            <span className="text-lg font-black text-foreground">Genio</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Solutions
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-sm font-medium text-foreground hover:bg-muted"
            >
              Sign in
            </Button>
            <Button className="bg-gradient-to-r from-fuchsia-700 to-pink-500 hover:shadow-lg hover:shadow-primary/30 text-white font-semibold text-sm px-6">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
