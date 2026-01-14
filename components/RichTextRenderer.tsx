// components/RichTextRenderer.tsx
import React from 'react'
import Image from 'next/image'

interface RichTextRendererProps {
  content: any
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !content.root) {
    return null
  }

  const renderNode = (node: any): React.ReactNode => {
    if (!node) return null

    if (node.type === 'text') {
      let text = node.text

      if (node.format) {
        if (node.format & 1) text = <strong key={node.key}>{text}</strong>
        if (node.format & 2) text = <em key={node.key}>{text}</em>
        if (node.format & 4) text = <u key={node.key}>{text}</u>
        if (node.format & 8) text = <code key={node.key}>{text}</code>
      }

      return text
    }

    const children = node.children?.map((child: any) => renderNode(child))

    switch (node.type) {
      case 'paragraph':
        return <p key={node.key}>{children}</p>

      case 'heading':
        const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements
        return <HeadingTag key={node.key}>{children}</HeadingTag>

      case 'quote':
        return <blockquote key={node.key}>{children}</blockquote>

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return <ListTag key={node.key}>{children}</ListTag>

      case 'listitem':
        return <li key={node.key}>{children}</li>

      case 'link':
        return (
          <a
            key={node.key}
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        )

      case 'upload':
        return (
          <Image
            key={node.key}
            src={node.value?.url}
            alt={node.value?.alt || ''}
            className="w-full h-auto rounded-lg my-4"
          />
        )

      case 'code':
        return (
          <pre key={node.key}>
            <code>{node.children?.[0]?.text}</code>
          </pre>
        )

      default:
        return <div key={node.key}>{children}</div>
    }
  }

  return <>{content.root.children.map((child: any) => renderNode(child))}</>
}
