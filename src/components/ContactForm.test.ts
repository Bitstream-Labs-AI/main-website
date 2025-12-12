import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactForm from './ContactForm.vue'
import { createMockContactFormData } from '@/test-utils/factories'

describe('ContactForm', () => {
  it('renders form fields', () => {
    const wrapper = mount(ContactForm)

    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="message"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('displays validation error when name is empty', async () => {
    const wrapper = mount(ContactForm)
    const form = wrapper.find('form')

    await form.trigger('submit')

    expect(wrapper.text()).toContain('Name is required')
  })

  it('displays validation error when email is empty', async () => {
    const wrapper = mount(ContactForm)
    const formData = createMockContactFormData()

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')

    await nameInput.setValue(formData.name)

    // Clear email by setting the input element's value directly and triggering input event
    const emailElement = emailInput.element as HTMLInputElement
    emailElement.value = ''
    await emailInput.trigger('input')
    await wrapper.vm.$nextTick()

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Email is required')
  })

  it('displays validation error when email format is invalid', async () => {
    const wrapper = mount(ContactForm)
    const formData = createMockContactFormData({ email: 'invalid-email' })

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')

    await nameInput.setValue(formData.name)
    await emailInput.setValue(formData.email)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Please enter a valid email address')
  })

  it('displays validation error when message is empty', async () => {
    const wrapper = mount(ContactForm)
    const formData = createMockContactFormData({ message: '' })

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')

    await nameInput.setValue(formData.name)
    await emailInput.setValue(formData.email)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Message is required')
  })

  it('calls onSubmit handler with form data when form is valid', async () => {
    const onSubmit = vi.fn()
    const wrapper = mount(ContactForm, {
      props: {
        onSubmit,
      },
    })

    const formData = createMockContactFormData()

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    const messageInput = wrapper.find('textarea[name="message"]')

    await nameInput.setValue(formData.name)
    await emailInput.setValue(formData.email)
    await messageInput.setValue(formData.message)

    await wrapper.find('form').trigger('submit')

    expect(onSubmit).toHaveBeenCalledWith(formData)
  })

  it('displays success message after successful submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(ContactForm, {
      props: {
        onSubmit,
      },
    })

    const formData = createMockContactFormData()

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    const messageInput = wrapper.find('textarea[name="message"]')

    await nameInput.setValue(formData.name)
    await emailInput.setValue(formData.email)
    await messageInput.setValue(formData.message)

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Thank you')
  })

  it('displays error message when submission fails', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Submission failed'))
    const wrapper = mount(ContactForm, {
      props: {
        onSubmit,
      },
    })

    const formData = createMockContactFormData()

    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    const messageInput = wrapper.find('textarea[name="message"]')

    await nameInput.setValue(formData.name)
    await emailInput.setValue(formData.email)
    await messageInput.setValue(formData.message)

    await wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('error')
  })
})
