import Image from 'next/image'
import Link from 'next/link'

interface RelatedStoriesProps {
  stories: any[]
  basePath: string
}

export function RelatedStories({ stories, basePath }: RelatedStoriesProps) {
  if (stories.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`${basePath}/${story.slug}`}
            className="group block border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all"
          >
            {story.featuredImage && (
              <div className="mb-4 overflow-hidden rounded-md">
                <Image
                  src={story.featuredImage.url}
                  alt={story.featuredImage.alt || story.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}

            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {story.title}
            </h3>

            {story.excerpt && <p className="text-sm text-gray-600 line-clamp-2">{story.excerpt}</p>}

            {story.publishedDate && (
              <time className="block mt-3 text-xs text-gray-500">
                {new Date(story.publishedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
