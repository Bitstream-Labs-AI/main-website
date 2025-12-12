<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ContactForm from '@/components/ContactForm.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'

useHead({
  title: 'Bitstream Labs.AI - AI Benchmarking Experts',
  meta: [
    {
      name: 'description',
      content:
        'We set the standard in AI benchmarking by providing expert consulting to teams pushing the boundaries of intelligent hardware.',
    },
  ],
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleContactSubmit = async (_data: {
  name: string
  email: string
  organizationName?: string
  organizationDescription?: string
  referralSource?: string
  message: string
}): Promise<void> => {
  // Placeholder for contact form submission
  // In production, this would send data to an API or email service

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
}
</script>

<template>
  <div class="bg-page flex flex-col">
    <SiteNavigation />
    <main class="flex-1 relative">
      <!-- Decorative floating orbs - positioned outside hero section to avoid clipping -->
      <div class="orb-layer" aria-hidden="true">
        <div class="orb-layer-inner">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>

      <!-- Hero Section - Full width -->
      <section id="hero" class="hero-section">
        <div class="container-content relative z-10">
          <div class="w-full mx-auto">
            <h1 class="text-display gradient-text-primary">Bitstream Labs.AI</h1>
            <p class="text-h2 text-secondary mx-auto">
              Expert AI Benchmarking & Hardware Consulting
            </p>
            <p class="text-body-large text-muted mx-auto">
              We set the standard in AI benchmarking by providing expert consulting to teams pushing
              the boundaries of intelligent hardware.
            </p>
          </div>
        </div>
      </section>

      <div class="container-content">
        <!-- About Us Section - Mission and Vision -->
        <section id="about" class="section">
          <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <!-- Mission Statement -->
              <div>
                <h2 class="text-h2 heading-cyan mb-8 text-center md:text-left pb-2">Our Mission</h2>
                <div class="card">
                  <p class="text-body-large text-primary leading-relaxed text-center md:text-left">
                    <strong class="heading-cyan">We set the standard in AI benchmarking</strong> by
                    providing expert consulting to R&D teams pushing the boundaries of intelligent
                    hardware.
                  </p>
                </div>
              </div>

              <!-- Vision Statement -->
              <div>
                <h2 class="text-h2 heading-blue mb-8 text-center md:text-left pb-2">Our Vision</h2>
                <div class="card">
                  <p class="text-body-large text-primary leading-relaxed text-center md:text-left">
                    <strong class="heading-blue">To unite AI and hardware engineering</strong> into
                    a single, unified workflow, turning AI models into simple components for
                    seamless deployment targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Form -->
        <div class="container-content">
          <section id="contact" class="section">
            <div class="mx-auto w-full">
              <ContactForm :on-submit="handleContactSubmit" />
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-footer py-12">
      <div class="container-content">
        <div class="flex flex-col items-center gap-6">
          <p class="text-body-xs text-muted">
            &copy; {{ new Date().getFullYear() }} Bitstream Labs.AI. All rights reserved.
          </p>
          <a
            href="https://github.com/Bitstream-Labs-AI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our GitHub organization"
            class="btn-secondary inline-flex items-center gap-2"
          >
            <svg class="icon-md" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
