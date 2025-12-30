import { config } from '../config'
import type {
  ContactFormBaseData,
  GoogleChatPayload,
  GoogleChatCard,
  GoogleChatWidget,
} from '@/schemas'

export async function sendGoogleChatMessage(payload: GoogleChatPayload): Promise<void> {
  const webhookUrl = config.GOOGLE_CHAT_WEBHOOK_URL

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Chat API error (${response.status}): ${errorText}`)
  }
}

export function buildContactFormCard(data: ContactFormBaseData): GoogleChatPayload {
  // 1. Prepare Widgets using 'decoratedText' (V2 standard)
  const contactWidgets: GoogleChatWidget[] = [
    {
      decoratedText: {
        topLabel: 'Name',
        text: data.name,
        startIcon: { knownIcon: 'PERSON' },
      },
    },
    {
      decoratedText: {
        topLabel: 'Email',
        text: data.email,
        startIcon: { knownIcon: 'EMAIL' },
      },
    },
  ]

  if (data.organizationName) {
    contactWidgets.push({
      decoratedText: {
        topLabel: 'Organization',
        text: data.organizationName,
        startIcon: { knownIcon: 'MEMBERSHIP' },
      },
    })
  }

  if (data.organizationDescription) {
    contactWidgets.push({
      decoratedText: {
        topLabel: 'About Organization',
        text: data.organizationDescription,
        wrapText: true, // Replaces contentMultiline
        startIcon: { knownIcon: 'DESCRIPTION' },
      },
    })
  }

  if (data.referralSource) {
    contactWidgets.push({
      decoratedText: {
        topLabel: 'Referral Source',
        text: data.referralSource,
        startIcon: { knownIcon: 'INVITE' },
      },
    })
  }

  // NEW: Add Marketing Consent Indicator
  contactWidgets.push({
    decoratedText: {
      topLabel: 'Marketing Opt-In',
      text: data.marketingConsent ? '✅ Yes, subscribed' : '❌ No',
      startIcon: { knownIcon: 'EMAIL' },
    },
  })

  // Format date
  const formattedDate = new Date().toLocaleString(config.LOCALE, {
    timeZone: config.TIME_ZONE,
    dateStyle: config.DATE_STYLE,
    timeStyle: config.TIME_STYLE,
  })

  const card: GoogleChatCard = {
    header: {
      title: 'New Form Submission',
      subtitle: 'Contact Form',
      imageUrl:
        'https://www.gstatic.com/images/icons/material/system/1x/description_black_24dp.png',
      imageType: 'CIRCLE',
    },
    sections: [
      {
        header: 'Message',
        widgets: [{ textParagraph: { text: data.message } }],
      },
      {
        header: 'Contact Details',
        widgets: contactWidgets,
      },
      {
        widgets: [
          {
            decoratedText: {
              topLabel: 'Received At',
              text: formattedDate,
              startIcon: { knownIcon: 'CLOCK' },
            },
          },
        ],
      },
    ],
  }

  return {
    cardsV2: [{ cardId: crypto.randomUUID(), card }],
  }
}
