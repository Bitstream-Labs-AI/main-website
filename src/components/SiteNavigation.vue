<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollToSection = (sectionId: string) => {
  // Special case: scroll to top for 'hero'
  if (sectionId === 'hero') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const isScrolled = ref(false)
const activeSection = ref<string>('hero')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Scroll-based section detection
const updateActiveSection = () => {
  const sections = ['hero', 'about', 'contact']
  const navHeight = 80
  const scrollPosition = window.scrollY + navHeight + 100 // Add offset for better detection

  let currentSection = 'hero'

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      // Check if scroll position is within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId
      }
    }
  })

  activeSection.value = currentSection
}

const setupSectionTracking = () => {
  // Use scroll event for reliable detection
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  // Initial check
  updateActiveSection()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Wait for DOM to be ready before setting up section tracking
  setTimeout(() => {
    setupSectionTracking()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'nav-backdrop border-b border-industrial-steel shadow-lg' : 'bg-transparent',
    ]"
  >
    <div class="container-content py-4">
      <div class="flex items-center justify-between">
        <div
          class="text-xl font-bold gradient-text-primary cursor-pointer"
          @click="scrollToSection('hero')"
        >
          Bitstream Labs.AI
        </div>
        <ul class="flex items-center gap-6 list-none m-0 p-0">
          <li>
            <button
              @click="scrollToSection('hero')"
              :class="[
                'px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer',
                activeSection === 'hero'
                  ? 'text-futurist-cyan border-b-2 border-futurist-cyan'
                  : 'text-primary hover:text-futurist-cyan',
              ]"
            >
              Home
            </button>
          </li>
          <li>
            <button
              @click="scrollToSection('about')"
              :class="[
                'px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer',
                activeSection === 'about'
                  ? 'text-futurist-cyan border-b-2 border-futurist-cyan'
                  : 'text-primary hover:text-futurist-cyan',
              ]"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              @click="scrollToSection('contact')"
              :class="[
                'px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer',
                activeSection === 'contact'
                  ? 'text-futurist-cyan border-b-2 border-futurist-cyan'
                  : 'text-primary hover:text-futurist-cyan',
              ]"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
