import React, { JSX } from 'react'
import Link from 'next/link'
import styles from './style/packageslist.module.css'
import ScrollFade from './TextScrollFade'

// Payload API response type
interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// Package outcome type
interface PackageOutcomes {
  'outcome-one': string
  'outcome-two': string
  'outcome-three': string
}

// Main Package type based on your Payload collection
interface Package {
  id: string
  'package-name': string
  byline: string
  'elevator-pitch': string
  'package-link': string
  'package-description': string
  'package-outcomes': PackageOutcomes
  createdAt: string
  updatedAt: string
}

// Component props (if you want to make it configurable)
interface PackagesListProps {
  limit?: number
  showDescription?: boolean
  className?: string
}

// Error boundary component props
interface ErrorDisplayProps {
  error: Error
}

// Error display component
function ErrorDisplay({ error }: ErrorDisplayProps): JSX.Element {
  return (
    <div className="error-container" role="alert">
      <h2>Failed to load packages</h2>
      <p>{error.message}</p>
    </div>
  )
}

// Empty state component
function EmptyState(): JSX.Element {
  return (
    <div className="empty-state">
      <p>No packages available at the moment.</p>
    </div>
  )
}

// Fetch packages with proper error handling
async function fetchPackages(limit?: number): Promise<Package[]> {
  const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL

  if (!payloadUrl) {
    throw new Error('NEXT_PUBLIC_PAYLOAD_URL environment variable is not set')
  }

  const url = new URL(`${payloadUrl}/api/packages`)
  if (limit) {
    url.searchParams.set('limit', limit.toString())
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch packages: ${response.status} ${response.statusText}`)
  }

  const data: PayloadResponse<Package> = await response.json()
  return data.docs
}

// Main server component
export default async function PackagesList({
  limit,
}: PackagesListProps = {}): Promise<JSX.Element> {
  try {
    const packages = await fetchPackages(limit)

    if (packages.length === 0) {
      return <EmptyState />
    }
    return (
      <section data-section="dark" data-background="light" className={styles.different}>
        <main className={styles.Bigmain}>
          <div className={styles.listWrapper}>
            <ScrollFade>
              <div className={styles.packagesList}>
                {packages.map((pkg: Package) => (
                  <article key={pkg.id} className={styles.packagesCard}>
                    <div>
                      <p className={styles.byline}>{pkg.byline}</p>
                      <h3>{pkg['package-name']}</h3>
                    </div>
                    <p className={styles.elevatorPitch}>{pkg['elevator-pitch']}</p>
                    <div className={styles.outcomes}>
                      <ul>
                        <li>{pkg['package-outcomes']['outcome-one']}</li>
                        <li>{pkg['package-outcomes']['outcome-two']}</li>
                        <li>{pkg['package-outcomes']['outcome-three']}</li>
                      </ul>
                    </div>

                    <Link
                      href={'/packages' + pkg['package-link']}
                      className={styles.ctaButton}
                      aria-label={`Learn more about ${pkg['package-name']}`}
                    >
                      Learn More
                    </Link>
                  </article>
                ))}
              </div>
            </ScrollFade>
          </div>
        </main>
      </section>
    )
  } catch (error) {
    // Type guard for error
    const err = error instanceof Error ? error : new Error('An unknown error occurred')
    return <ErrorDisplay error={err} />
  }
}

// Export types for reuse in other components
export type { Package, PackageOutcomes, PackagesListProps }
