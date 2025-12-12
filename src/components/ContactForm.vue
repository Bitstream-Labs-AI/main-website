<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface ContactFormData {
  name: string
  email: string
  organizationName?: string
  organizationDescription?: string
  referralSource?: string
  message: string
}

interface Props {
  onSubmit?: (data: ContactFormData) => Promise<void> | void
}

const props = withDefaults(defineProps<Props>(), {
  onSubmit: undefined,
})

// Diverse placeholder names - rotated to avoid pinning down specific cultures
const placeholderNames = [
  { name: 'Alex Chen', email: 'alex.chen@example.com' },
  { name: 'Sam Taylor', email: 'sam.taylor@example.com' },
  { name: 'Jordan Kim', email: 'jordan.kim@example.com' },
  { name: 'Morgan Patel', email: 'morgan.patel@example.com' },
  { name: 'Casey Martinez', email: 'casey.martinez@example.com' },
  { name: 'Riley Singh', email: 'riley.singh@example.com' },
  { name: 'Avery Johnson', email: 'avery.johnson@example.com' },
  { name: 'Quinn Williams', email: 'quinn.williams@example.com' },
]

const placeholderName = ref(placeholderNames[0]?.name ?? '')
const placeholderEmail = ref(placeholderNames[0]?.email ?? '')
const isFadingOut = ref(false)
const isFadingIn = ref(false)
let currentIndex = 0
let rotationInterval: ReturnType<typeof setInterval> | null = null

// Rotate through placeholder names with fade transition
const rotatePlaceholder = (): void => {
  isFadingOut.value = true
  isFadingIn.value = false

  // After fade out completes, update text and fade in
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % placeholderNames.length
    const currentPlaceholder = placeholderNames[currentIndex]
    if (currentPlaceholder) {
      placeholderName.value = currentPlaceholder.name
      placeholderEmail.value = currentPlaceholder.email
    }
    isFadingOut.value = false
    isFadingIn.value = true
  }, 400) // Fade out duration

  // Remove fade-in class after animation completes
  setTimeout(() => {
    isFadingIn.value = false
  }, 800) // Fade out (400ms) + fade in (400ms)
}

// Start rotation on mount
onMounted(() => {
  // Randomly select initial placeholder
  currentIndex = Math.floor(Math.random() * placeholderNames.length)
  const currentPlaceholder = placeholderNames[currentIndex]
  if (currentPlaceholder) {
    placeholderName.value = currentPlaceholder.name
    placeholderEmail.value = currentPlaceholder.email
  }

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

const errors = ref<Partial<Record<keyof ContactFormData, string>>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const validateEmail = (emailValue: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(emailValue)
}

const validate = (): boolean => {
  errors.value = {}

  if (!name.value.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
  } else if (!validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }

  if (!message.value.trim()) {
    errors.value.message = 'Message is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault()
  event.stopPropagation()

  // Clear previous errors
  errors.value = {}

  if (!validate()) {
    // Ensure errors are visible by forcing a re-render
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    const formData: ContactFormData = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    }

    if (organizationName.value.trim()) {
      formData.organizationName = organizationName.value.trim()
    }

    if (organizationDescription.value.trim()) {
      formData.organizationDescription = organizationDescription.value.trim()
    }

    if (referralSource.value.trim()) {
      formData.referralSource = referralSource.value.trim()
    }

    if (props.onSubmit) {
      await props.onSubmit(formData)
    }

    submitStatus.value = 'success'

    // Reset form
    name.value = ''
    email.value = ''
    organizationName.value = ''
    organizationDescription.value = ''
    referralSource.value = ''
    message.value = ''
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

    <form @submit="handleSubmit" class="card">
      <!-- Name Field -->
      <div class="pb-4">
        <label for="name" class="block text-body font-black text-primary pb-2"> Your Name </label>
        <div class="relative">
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
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
        <input
          id="organizationName"
          v-model="organizationName"
          name="organizationName"
          type="text"
          placeholder="University, Research Lab, Government Agency, or Company"
          class="input-base"
        />
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
        <input
          id="referralSource"
          v-model="referralSource"
          name="referralSource"
          type="text"
          placeholder="Organization, person, or referral source"
          class="input-base"
        />
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

      <!-- Status Messages -->
      <div v-if="submitStatus === 'success'" class="pt-2 message-success">
        <p>Thank you for your message! We'll get back to you soon.</p>
      </div>

      <div v-if="submitStatus === 'error'" class="pt-2 message-error">
        <p>An error occurred while submitting your message. Please try again.</p>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <span v-if="!isSubmitting">Let's Go!</span>
          <span v-else>Sending...</span>
        </button>
      </div>
    </form>
  </div>
</template>
