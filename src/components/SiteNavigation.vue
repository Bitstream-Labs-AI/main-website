<script setup lang="ts">
import { computed } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useNavigationController } from './useNavigationController'
import { isContactFormEnabled } from '@/utils/featureFlags'

const { isMenuOpen, activeSection, toggleMenu, scrollToSection } = useNavigationController()

const navItems = computed(() => {
  const items = [
    { id: 'home', label: 'Home', sectionId: 'hero' },
    { id: 'about', label: 'About Us', sectionId: 'about' },
  ]
  if (isContactFormEnabled()) {
    items.push({ id: 'contact', label: 'Contact', sectionId: 'contact' })
  }
  return items
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 nav-backdrop shadow-lg',
    ]"
  >
    <div
      class="container-content py-4"
      :style="{
        paddingTop: `calc(1rem + env(safe-area-inset-top))`,
      }"
    >
      <div class="flex items-center justify-between">
        <div class="text-xl font-bold gradient-text-primary">Bitstream Labs.AI</div>
        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center gap-6 list-none m-0 p-0">
          <li v-for="item in navItems" :key="item.id">
            <button
              @click="scrollToSection(item.sectionId)"
              :class="[
                'px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer',
                activeSection === item.sectionId
                  ? 'text-futurist-cyan border-b-2 border-futurist-cyan'
                  : 'text-primary hover:text-futurist-cyan',
              ]"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
        <!-- Mobile Menu Toggle Button (Hamburger when closed, X when open) -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 text-primary hover:text-futurist-cyan bg-transparent border-none cursor-pointer relative w-6 h-6 flex items-center justify-center"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
        >
          <div class="relative w-6 h-6 flex items-center justify-center">
            <!-- Hamburger icon: rotates 90° clockwise out, enters from -90° counter-clockwise -->
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-500 ease-in-out"
              leave-active-class="transition-all duration-500 ease-in-out"
              enter-from-class="opacity-0 rotate-90 scale-75"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 rotate-90 scale-75"
            >
              <Bars3Icon v-if="!isMenuOpen" key="bars" class="w-6 h-6 absolute inset-0 m-auto" />
            </Transition>
            <!-- X icon: rotates -90° counter-clockwise out, enters from 90° clockwise -->
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-500 ease-in-out"
              leave-active-class="transition-all duration-500 ease-in-out"
              enter-from-class="opacity-0 -rotate-90 scale-75"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 -rotate-90 scale-75"
            >
              <XMarkIcon v-if="isMenuOpen" key="x" class="w-6 h-6 absolute inset-0 m-auto" />
            </Transition>
          </div>
        </button>
      </div>
    </div>
    <!-- Mobile Menu - Full Screen Overlay -->
    <ClientOnly
      ><Teleport to="body">
        <Transition
          enter-active-class="transition-transform duration-500 ease-out"
          leave-active-class="transition-transform duration-300 ease-in"
          enter-from-class="-translate-y-full"
          enter-to-class="translate-y-0"
          leave-from-class="translate-y-0"
          leave-to-class="-translate-y-full"
        >
          <div
            v-if="isMenuOpen"
            class="fixed inset-0 z-[9999] md:hidden isolate"
            :aria-hidden="!isMenuOpen"
          >
            <!-- Fully opaque background layer -->
            <div class="absolute inset-0 bg-industrial-dark"></div>
            <!-- Menu content with glass blur effect -->
            <div class="absolute inset-0 nav-backdrop flex flex-col overflow-hidden">
              <!-- Left-aligned Navigation Items - Scrollable -->
              <nav class="px-4 pt-20 relative flex-1 overflow-y-auto z-10 pointer-events-auto">
                <ul class="flex flex-col gap-3 list-none m-0 p-0 relative z-10 pb-4">
                  <TransitionGroup
                    enter-active-class="transition-all duration-500 ease-out"
                    leave-active-class="transition-all duration-200 ease-in"
                    enter-from-class="opacity-0 -translate-y-4"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-4"
                  >
                    <li
                      v-for="(item, index) in navItems"
                      :key="item.id"
                      :style="{ transitionDelay: `${index * 100}ms` }"
                    >
                      <button
                        @click="scrollToSection(item.sectionId)"
                        :class="[
                          'text-left px-4 py-2 text-xl font-medium transition-colors bg-transparent border-none cursor-pointer rounded',
                          activeSection === item.sectionId
                            ? 'text-futurist-cyan'
                            : 'text-primary hover:text-futurist-cyan',
                        ]"
                      >
                        {{ item.label }}
                      </button>
                    </li>
                  </TransitionGroup>
                </ul>
              </nav>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </nav>
</template>
