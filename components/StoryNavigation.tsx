// components/StoryNavigation.tsx
import Link from 'next/link'

interface StoryNavigationProps {
  previous: any
  next: any
  basePath: string
}

export function StoryNavigation({ previous, next, basePath }: StoryNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-2 gap-8">
        <div>
          {previous && (
            <Link href={`${basePath}/${previous.slug}`} className="group block">
              <p className="text-sm text-gray-500 mb-1">← Previous</p>
              <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {previous.title}
              </p>
            </Link>
          )}
        </div>

        <div className="text-right">
          {next && (
            <Link href={`${basePath}/${next.slug}`} className="group block">
              <p className="text-sm text-gray-500 mb-1">Next →</p>
              <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
