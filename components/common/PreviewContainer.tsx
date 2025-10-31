import type React from "react"
import type { ReactNode } from "react"
import { Card, CardTitle } from "@/components/ui/card"

interface PreviewContainerProps {
  title: string
  children: ReactNode
  actions?: ReactNode
  footer?: ReactNode
  className?: string
}

/**
 * Common Preview Container Component
 * Contains standard preview area layout: title, content area and footer action area
 */
const PreviewContainer: React.FC<PreviewContainerProps> = ({ title, children, actions, footer, className = "" }) => {
  return (
    <Card className={`pt-0 px-6 pb-6 ${className}`}>
      {/* Title area */}
      <div className="mt-4 mb-4 flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>

      {/* Content area */}
      <div className="flex justify-center p-2">{children}</div>

      {/* Footer area */}
      {footer && <div className="mt-6 px-2">{footer}</div>}
    </Card>
  )
}

export default PreviewContainer
