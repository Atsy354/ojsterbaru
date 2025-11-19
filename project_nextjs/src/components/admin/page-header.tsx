import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  showBreadcrumbs?: boolean
  className?: string
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBreadcrumbs = true, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {showBreadcrumbs && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <span className="text-gray-500 text-sm">Home</span>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 ml-2 text-sm font-medium">
                  {title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

