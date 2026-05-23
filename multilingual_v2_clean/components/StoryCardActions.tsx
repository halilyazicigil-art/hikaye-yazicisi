'use client'

import dynamic from 'next/dynamic'

// AudioPlayerContext'e bağımlı bileşenleri yalnızca client'ta yükle.
// Bu sayede Server Component'lardan güvenle çağrılabilir.
const AddToQueueButton = dynamic(() => import('@/components/AddToQueueButton'), {
  ssr: false,
  loading: () => null,
})

interface StoryCardActionsProps {
  story: {
    id: string
    title: string
    audio_url: string
    image_url: string
  }
  iconOnly?: boolean
  className?: string
  source?: string
}

export default function StoryCardActions({ story, iconOnly, className, source }: StoryCardActionsProps) {
  if (!story.audio_url) return null

  return (
    <AddToQueueButton
      story={story}
      iconOnly={iconOnly}
      className={className}
      source={source}
    />
  )
}
