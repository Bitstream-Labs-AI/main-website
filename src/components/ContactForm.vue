<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  contactFormSchema,
  type ContactFormData,
  CONTACT_FORM_MAX_LENGTHS,
} from '../schemas/contact-form'

interface Props {
  onSubmit?: (data: ContactFormData) => Promise<void> | void
}

const props = withDefaults(defineProps<Props>(), {
  onSubmit: undefined,
})

// Utility function to shuffle an array randomly
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}

// Diverse placeholder names - rotated to avoid pinning down specific cultures
const placeholderNamesBase = [
  { name: 'Alex Chen', email: 'alex.chen@example.com' },
  { name: 'Sam Taylor', email: 'sam.taylor@example.com' },
  { name: 'Jordan Kim', email: 'jordan.kim@example.com' },
  { name: 'Morgan Patel', email: 'morgan.patel@example.com' },
  { name: 'Casey Martinez', email: 'casey.martinez@example.com' },
  { name: 'Riley Singh', email: 'riley.singh@example.com' },
  { name: 'Avery Johnson', email: 'avery.johnson@example.com' },
  { name: 'Quinn Williams', email: 'quinn.williams@example.com' },
]

// Organization types most likely to solicit AI benchmarking and hardware consulting services
const placeholderOrganizationsBase = [
  'Research Lab',
  'University',
  'Tech Company',
  'Startup',
  'Government Agency',
  'Hardware Manufacturer',
  'AI Company',
  'Consulting Firm',
]

// Referral types representing how people are likely to discover the service
const placeholderReferralsBase = [
  'Conference',
  'Colleague',
  'Research Partner',
  'Accelerator',
  'Investor',
  'University Partner',
  'Industry Friend',
  'Online Article',
]

// Shuffle all arrays randomly
const placeholderNames = shuffleArray(placeholderNamesBase)
const placeholderOrganizations = shuffleArray(placeholderOrganizationsBase)
const placeholderReferrals = shuffleArray(placeholderReferralsBase)

const placeholderName = ref(placeholderNames[0]?.name ?? '')
const placeholderEmail = ref(placeholderNames[0]?.email ?? '')
const placeholderOrganizationName = ref(placeholderOrganizations[0] ?? '')
const placeholderReferralSource = ref(placeholderReferrals[0] ?? '')

const isFadingOut = ref(false)
const isFadingIn = ref(false)
const isFadingOutOrg = ref(false)
const isFadingInOrg = ref(false)
const isFadingOutReferral = ref(false)
const isFadingInReferral = ref(false)

let currentIndex = 0
let currentOrgIndex = 0
let currentReferralIndex = 0
let rotationInterval: ReturnType<typeof setInterval> | null = null

// Rotate through placeholder names with fade transition
const rotatePlaceholder = (): void => {
  // Rotate name/email
  isFadingOut.value = true
  isFadingIn.value = false

  // Rotate organization name
  isFadingOutOrg.value = true
  isFadingInOrg.value = false

  // Rotate referral source
  isFadingOutReferral.value = true
  isFadingInReferral.value = false

  // After fade out completes, update text and fade in
  setTimeout(() => {
    // Update name/email
    currentIndex = (currentIndex + 1) % placeholderNames.length
    const currentPlaceholder = placeholderNames[currentIndex]
    if (currentPlaceholder) {
      placeholderName.value = currentPlaceholder.name
      placeholderEmail.value = currentPlaceholder.email
    }
    isFadingOut.value = false
    isFadingIn.value = true

    // Update organization name
    currentOrgIndex = (currentOrgIndex + 1) % placeholderOrganizations.length
    placeholderOrganizationName.value = placeholderOrganizations[currentOrgIndex] ?? ''
    isFadingOutOrg.value = false
    isFadingInOrg.value = true

    // Update referral source
    currentReferralIndex = (currentReferralIndex + 1) % placeholderReferrals.length
    placeholderReferralSource.value = placeholderReferrals[currentReferralIndex] ?? ''
    isFadingOutReferral.value = false
    isFadingInReferral.value = true
  }, 400) // Fade out duration

  // Remove fade-in class after animation completes
  setTimeout(() => {
    isFadingIn.value = false
    isFadingInOrg.value = false
    isFadingInReferral.value = false
  }, 800) // Fade out (400ms) + fade in (400ms)
}

// Start rotation on mount
onMounted(() => {
  // Randomly select initial placeholders
  currentIndex = Math.floor(Math.random() * placeholderNames.length)
  const currentPlaceholder = placeholderNames[currentIndex]
  if (currentPlaceholder) {
    placeholderName.value = currentPlaceholder.name
    placeholderEmail.value = currentPlaceholder.email
  }

  currentOrgIndex = Math.floor(Math.random() * placeholderOrganizations.length)
  placeholderOrganizationName.value = placeholderOrganizations[currentOrgIndex] ?? ''

  currentReferralIndex = Math.floor(Math.random() * placeholderReferrals.length)
  placeholderReferralSource.value = placeholderReferrals[currentReferralIndex] ?? ''

  // Start rotating every 5 seconds
  rotationInterval = setInterval(rotatePlaceholder, 5000)
})

// Clean up interval on unmount
onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
})

const name = ref('')
const email = ref('')
const organizationName = ref('')
const organizationDescription = ref('')
const referralSource = ref('')
const message = ref('')
const marketingConsent = ref(false)

const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

// Schema is imported from shared location for consistency with backend

const validate = (formData: Partial<ContactFormData>): boolean => {
  errors.value = {}

  const result = contactFormSchema.safeParse(formData)

  if (!result.success) {
    // Map ZOD errors to the existing error format
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ContactFormData
      if (field) {
        errors.value[field] = issue.message
      }
    })
    return false
  }

  return true
}

const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  event.stopPropagation()

  // Clear previous errors
  errors.value = {}

  // Build form data object with trimmed and clamped values
  // Clamp to max lengths to prevent oversized data from reaching the backend
  const formData: Partial<ContactFormData> = {
    name: name.value.trim().slice(0, CONTACT_FORM_MAX_LENGTHS.name),
    email: email.value.trim().slice(0, CONTACT_FORM_MAX_LENGTHS.email),
    message: message.value.trim().slice(0, CONTACT_FORM_MAX_LENGTHS.message),
    marketingConsent: marketingConsent.value,
  }

  if (organizationName.value.trim()) {
    formData.organizationName = organizationName.value
      .trim()
      .slice(0, CONTACT_FORM_MAX_LENGTHS.organizationName)
  }

  if (organizationDescription.value.trim()) {
    formData.organizationDescription = organizationDescription.value
      .trim()
      .slice(0, CONTACT_FORM_MAX_LENGTHS.organizationDescription)
  }

  if (referralSource.value.trim()) {
    formData.referralSource = referralSource.value
      .trim()
      .slice(0, CONTACT_FORM_MAX_LENGTHS.referralSource)
  }

  // Validate using ZOD schema
  if (!validate(formData)) {
    // Ensure errors are visible by forcing a re-render
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Use validated form data (ZOD ensures it matches ContactFormData type)
    const validatedData = contactFormSchema.parse(formData) as ContactFormData

    if (props.onSubmit) {
      await props.onSubmit(validatedData)
    }

    submitStatus.value = 'success'

    // Reset form
    name.value = ''
    email.value = ''
    organizationName.value = ''
    organizationDescription.value = ''
    referralSource.value = ''
    message.value = ''
    marketingConsent.value = false

    errors.value = {}
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto">
    <!-- Header Section -->
    <div class="mb-12 text-center pb-6">
      <h3 class="text-h3 heading-cyan mb-6">Let's Talk</h3>
      <p class="text-body-large text-secondary mb-8 mx-auto">
        We're here to help with your AI benchmarking and hardware consulting needs. Fill out the
        form below and someone from our team will be in touch with you shortly.
      </p>
    </div>

    <form
      name="contact"
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
      class="card"
      data-netlify-recaptcha="true"
    >
      <input type="hidden" name="form-name" value="contact" />

      <p class="hidden">
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
      </p>

      <!-- Name Field -->
      <div class="pb-4">
        <label for="name" class="block text-body font-black text-primary pb-2"> Your Name </label>
        <div class="relative">
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            :maxlength="CONTACT_FORM_MAX_LENGTHS.name"
            :placeholder="placeholderName"
            class="input-base overlay-placeholder"
            :class="{ error: errors.name }"
          />
          <!-- Placeholder overlay for smooth transitions -->
          <div
            v-if="!name"
            class="absolute inset-0 pointer-events-none flex items-center px-4 overflow-hidden"
          >
            <span
              class="text-body text-placeholder placeholder-overlay-text"
              :class="{
                'animate-[var(--animate-fade-out)]': isFadingOut,
                'animate-[var(--animate-fade-in)]': isFadingIn,
              }"
            >
              {{ placeholderName }}
            </span>
          </div>
        </div>
        <p v-if="errors.name" class="pt-2 text-body-small text-red-400" role="alert">
          {{ errors.name }}
        </p>
      </div>

      <!-- Email Field -->
      <div class="pb-4">
        <label for="email" class="block text-body font-black text-primary pb-2"> Your Email </label>
        <div class="relative">
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            :maxlength="CONTACT_FORM_MAX_LENGTHS.email"
            :placeholder="placeholderEmail"
            class="input-base overlay-placeholder"
            :class="{ error: errors.email }"
          />
          <!-- Placeholder overlay for smooth transitions -->
          <div
            v-if="!email"
            class="absolute inset-0 pointer-events-none flex items-center px-4 overflow-hidden"
          >
            <span
              class="text-body text-placeholder placeholder-overlay-text"
              :class="{
                'animate-[var(--animate-fade-out)]': isFadingOut,
                'animate-[var(--animate-fade-in)]': isFadingIn,
              }"
            >
              {{ placeholderEmail }}
            </span>
          </div>
        </div>
        <p v-if="errors.email" class="pt-2 text-body-small text-red-400" role="alert">
          {{ errors.email }}
        </p>
      </div>

      <!-- Organization Name Field (Optional) -->
      <div class="pb-4">
        <label for="organizationName" class="block text-body font-black text-primary pb-2">
          Organization Name
          <span class="text-body-small font-normal text-muted ml-1">(Optional)</span>
        </label>
        <div class="relative">
          <input
            id="organizationName"
            v-model="organizationName"
            name="organizationName"
            type="text"
            :maxlength="CONTACT_FORM_MAX_LENGTHS.organizationName"
            :placeholder="placeholderOrganizationName"
            class="input-base overlay-placeholder"
          />
          <!-- Placeholder overlay for smooth transitions -->
          <div
            v-if="!organizationName"
            class="absolute inset-0 pointer-events-none flex items-center px-4 overflow-hidden"
          >
            <span
              class="text-body text-placeholder placeholder-overlay-text"
              :class="{
                'animate-[var(--animate-fade-out)]': isFadingOutOrg,
                'animate-[var(--animate-fade-in)]': isFadingInOrg,
              }"
            >
              {{ placeholderOrganizationName }}
            </span>
          </div>
        </div>
        <p class="pt-2 text-body-small text-muted">
          If you don't have one, that's OK! We'll work with you regardless.
        </p>
      </div>

      <!-- Organization Description Field (Optional) -->
      <div class="pb-4">
        <label for="organizationDescription" class="block text-body font-black text-primary pb-2">
          What does your organization do or intend to do?
          <span class="text-body-small font-normal text-muted ml-1">(Optional)</span>
        </label>
        <textarea
          id="organizationDescription"
          v-model="organizationDescription"
          name="organizationDescription"
          rows="4"
          :maxlength="CONTACT_FORM_MAX_LENGTHS.organizationDescription"
          placeholder="Briefly describe your organization, research focus, or services..."
          class="input-base resize-vertical"
        ></textarea>
        <p class="pt-2 text-body-small text-muted">
          This helps us better understand how we can assist you.
        </p>
      </div>

      <!-- Referral Source Field (Optional) -->
      <div class="pb-4">
        <label for="referralSource" class="block text-body font-black text-primary pb-2">
          Who can we thank?
          <span class="text-body-small font-normal text-muted ml-1">(Optional)</span>
        </label>
        <div class="relative">
          <input
            id="referralSource"
            v-model="referralSource"
            name="referralSource"
            type="text"
            :maxlength="CONTACT_FORM_MAX_LENGTHS.referralSource"
            :placeholder="placeholderReferralSource"
            class="input-base overlay-placeholder"
          />
          <!-- Placeholder overlay for smooth transitions -->
          <div
            v-if="!referralSource"
            class="absolute inset-0 pointer-events-none flex items-center px-4 overflow-hidden"
          >
            <span
              class="text-body text-placeholder placeholder-overlay-text"
              :class="{
                'animate-[var(--animate-fade-out)]': isFadingOutReferral,
                'animate-[var(--animate-fade-in)]': isFadingInReferral,
              }"
            >
              {{ placeholderReferralSource }}
            </span>
          </div>
        </div>
        <p class="pt-2 text-body-small text-muted">
          If you found us through an organization, accelerator, university, investor, or friend of
          the startup community, please let us know!
        </p>
      </div>

      <!-- Message Field (Required) -->
      <div class="pb-4">
        <label for="message" class="block text-body font-black text-primary pb-2">
          How can we help?
        </label>
        <textarea
          id="message"
          v-model="message"
          name="message"
          rows="6"
          :maxlength="CONTACT_FORM_MAX_LENGTHS.message"
          placeholder="Tell us about your AI benchmarking or hardware consulting needs..."
          class="input-base resize-vertical"
          :class="{ error: errors.message }"
        ></textarea>
        <p v-if="errors.message" class="pt-2 text-body-small text-red-400" role="alert">
          {{ errors.message }}
        </p>
        <p v-else class="pt-2 text-body-small text-muted">
          Please provide details about what you're looking for so we can respond appropriately.
        </p>
      </div>

      <div class="pb-4">
        <div class="flex items-start gap-3">
          <div class="flex h-6 items-center">
            <input
              id="marketingConsent"
              v-model="marketingConsent"
              name="marketingConsent"
              type="checkbox"
              class="h-5 w-5 rounded border-industrial-steel bg-industrial-slate text-futurist-cyan focus:ring-futurist-cyan/50 focus:ring-offset-0 transition duration-150 ease-in-out cursor-pointer"
            />
          </div>
          <div class="text-sm leading-6">
            <label
              for="marketingConsent"
              class="block text-body font-black text-primary pb-2 cursor-pointer"
            >
              Stay Updated
            </label>
            <p class="text-muted"></p>
          </div>
        </div>

        <p class="pt-2 text-body-small text-muted">
          Get occasional updates and news about AI benchmarking and R&D insights.
        </p>
      </div>

      <div class="pt-2"></div>

      <!-- Status Messages -->
      <div v-if="submitStatus === 'success'" class="pt-2 message-success">
        <p>Thank you for your message! We'll get back to you soon.</p>
      </div>

      <div v-if="submitStatus === 'error'" class="pt-2 message-error">
        <p>An error occurred while submitting your message. Please try again.</p>
      </div>

      <div data-netlify-recaptcha="true"></div>

      <!-- Submit Button -->
      <div class="pt-6">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <span v-if="!isSubmitting">Submit Inquiry</span>
          <span v-else>Sending...</span>
        </button>
      </div>
    </form>
  </div>
</template>
