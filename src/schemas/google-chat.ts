// src/schemas/google-chat.ts

export interface GoogleChatPayload {
  text?: string
  cardsV2?: Array<{
    cardId: string
    card: GoogleChatCard
  }>
}

export interface GoogleChatCard {
  header?: {
    title: string
    subtitle?: string
    imageUrl?: string
    imageType?: 'SQUARE' | 'CIRCLE'
  }
  sections: Array<{
    header?: string
    collapsible?: boolean
    uncollapsibleWidgetsCount?: number
    widgets: GoogleChatWidget[]
  }>
}

// Union type for V2 widgets
// CHANGED: 'keyValue' is now 'decoratedText'
export type GoogleChatWidget =
  | { textParagraph: { text: string } }
  | {
      decoratedText: {
        topLabel?: string
        text: string
        bottomLabel?: string
        startIcon?: Icon // V2 uses 'startIcon' object
        wrapText?: boolean
        onClick?: OnClick
      }
    }
  | { buttonList: { buttons: Button[] } }

// V2 Icon definition
interface Icon {
  knownIcon?: string // e.g., "PERSON", "EMAIL"
  iconUrl?: string
  altText?: string
}

interface Button {
  text?: string
  icon?: Icon
  color?: { red: number; green: number; blue: number; alpha?: number }
  onClick: OnClick
  disabled?: boolean
}

interface OnClick {
  openLink: { url: string }
}
