import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { MusingLayout } from 'components/layouts/MusingLayout'
import { JournalLayout } from 'components/layouts/JournalLayout'

interface StoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getStory(slug: string) {
  const payload = await getPayload({ config: configPromise })

  const musings = await payload.find({
    collection: 'musings',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (musings.docs[0]) {
    return { type: 'musing' as const, data: musings.docs[0] }
  }

  const journals = await payload.find({
    collection: 'journal',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (journals.docs[0]) {
    return { type: 'journal' as const, data: journals.docs[0] }
  }

  return null
}

async function getNavigationStories(currentId: string, collection: 'musings' | 'journal') {
  const payload = await getPayload({ config: configPromise })

  const stories = await payload.find({
    collection,
    sort: '-publishedDate',
    limit: 1000,
  })

  const currentIndex = stories.docs.findIndex((doc: { id: string }) => doc.id === currentId)

  return {
    previous: currentIndex > 0 ? stories.docs[currentIndex - 1] : null,
    next: currentIndex < stories.docs.length - 1 ? stories.docs[currentIndex + 1] : null,
  }
}

async function getRelatedStories(
  currentId: string,
  collection: 'musings' | 'journal',
  tags?: string[],
) {
  const payload = await getPayload({ config: configPromise })

  let relatedStories: string | any[] = []

  // Try to find stories with matching tags first
  if (tags && tags.length > 0) {
    const taggedStories = await payload.find({
      collection,
      where: {
        and: [{ id: { not_equals: currentId } }, { tags: { in: tags } }],
      },
      limit: 3,
      sort: '-publishedDate',
    })
    relatedStories = taggedStories.docs
  }

  // If we don't have enough, fill with recent stories
  if (relatedStories.length < 3) {
    const recentStories = await payload.find({
      collection,
      where: { id: { not_equals: currentId } },
      limit: 3 - relatedStories.length,
      sort: '-publishedDate',
    })

    relatedStories = [...relatedStories, ...recentStories.docs]
  }

  return relatedStories
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) {
    return { title: 'Story Not Found' }
  }

  return {
    title: story.data.title,
    description: story.data.excerpt || story.data.description,
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) {
    notFound()
  }

  const collection = story.type === 'musing' ? 'musings' : 'journal'
  const [navigation, related] = await Promise.all([
    getNavigationStories(story.data.id, collection),
    getRelatedStories(story.data.id, collection),
  ])

  if (story.type === 'musing') {
    return <MusingLayout musing={story.data} navigation={navigation} related={related} />
  }

  return <JournalLayout journal={story.data} navigation={navigation} related={related} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const [musings, journals] = await Promise.all([
    payload.find({ collection: 'musings', limit: 1000 }),
    payload.find({ collection: 'journal', limit: 1000 }),
  ])

  return [
    ...musings.docs.map((doc: { slug: any }) => ({ slug: doc.slug })),
    ...journals.docs.map((doc: { slug: any }) => ({ slug: doc.slug })),
  ]
}
