// components/layouts/MusingLayout.tsx
import { RichTextRenderer } from 'components/RichTextRenderer'
import { StoryNavigation } from 'components/StoryNavigation'
import { RelatedStories } from 'components/RelatedStories'
import Image from 'next/image'

export function MusingLayout({
  musing,
  navigation,
  related,
}: {
  musing: any
  navigation: { previous: any; next: any }
  related: any[]
}) {
  return (
    <>
      <article className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">{musing.title}</h1>

          {musing.publishedDate && (
            <time className="text-sm text-gray-500 uppercase tracking-wider">
              {new Date(musing.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        {musing.featuredImage && (
          <div className="mb-12 -mx-4 sm:mx-0">
            <Image
              src={musing.featuredImage.url}
              alt={musing.featuredImage.alt || musing.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg prose-gray max-w-none">
          <RichTextRenderer content={musing.content} />
        </div>

        {musing.tags && musing.tags.length > 0 && (
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {musing.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <StoryNavigation
          previous={navigation.previous}
          next={navigation.next}
          basePath="/stories"
        />

        {related.length > 0 && <RelatedStories stories={related} basePath="/stories" />}
      </div>
    </>
  )
}
