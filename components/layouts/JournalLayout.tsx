import { RichTextRenderer } from 'components/RichTextRenderer'
import { StoryNavigation } from 'components/StoryNavigation'
import { RelatedStories } from 'components/RelatedStories'

export function JournalLayout({
  journal,
  navigation,
  related,
}: {
  journal: any
  navigation: { previous: any; next: any }
  related: any[]
}) {
  return (
    <>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8 border-l-4 border-blue-500 pl-6">
          {journal.publishedDate && (
            <time className="block text-sm font-medium text-blue-600 mb-2">
              {new Date(journal.publishedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}

          <h1 className="text-4xl font-bold text-gray-900">{journal.title}</h1>

          {journal.mood && <p className="mt-2 text-gray-600 italic">Mood: {journal.mood}</p>}
        </header>

        <div className="prose prose-lg max-w-none">
          <RichTextRenderer content={journal.content} />
        </div>

        {journal.location && (
          <footer className="mt-8 pt-6 border-t border-gray-200 text-gray-600">
            <p>📍 {journal.location}</p>
          </footer>
        )}
      </article>

      <div className="max-w-4xl mx-auto px-4 pb-12">
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
