import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useNavigationController() {
  const isScrolled = ref(false)
  const isMenuOpen = ref(false)
  const activeSection = ref('hero')

  const isBrowser = typeof window !== 'undefined'

  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
  const closeMenu = () => (isMenuOpen.value = false)

  const scrollToSection = (sectionId: string) => {
    if (!isBrowser) return
    closeMenu()

    setTimeout(() => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const element = document.getElementById(sectionId)
      if (element) {
        const navHeight = 80
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const targetY = rect.top + scrollTop - navHeight
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
      }
    }, 100)
  }

  // Handle Scroll side-effects
  const handleScroll = () => {
    if (!isBrowser) return
    isScrolled.value = window.scrollY > 50

    // Update active section
    const sections = ['hero', 'about', 'contact']
    const scrollPosition = window.scrollY + 180
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
        activeSection.value = id
      }
    }
  }

  // Handle Body Scroll Locking
  watch(isMenuOpen, (open) => {
    if (!isBrowser) return
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
      main?.classList.add('blur-sm')
      footer?.classList.add('blur-sm')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
      main?.classList.remove('blur-sm')
      footer?.classList.remove('blur-sm')
    }
  })

  onMounted(() => {
    if (isBrowser) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }
  })

  onUnmounted(() => {
    if (isBrowser) {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return { isScrolled, isMenuOpen, activeSection, toggleMenu, scrollToSection }
}
