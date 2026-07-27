import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Theme & Language
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Auth
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      // Active Appointment Booking Draft
      bookingDraft: {
        department: '',
        doctor: null,
        date: '',
        timeSlot: '',
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        notes: '',
        type: 'in-person', // or 'online'
      },
      updateBookingDraft: (data) =>
        set((state) => ({
          bookingDraft: { ...state.bookingDraft, ...data }
        })),
      resetBookingDraft: () =>
        set({
          bookingDraft: {
            department: '',
            doctor: null,
            date: '',
            timeSlot: '',
            patientName: '',
            patientPhone: '',
            patientEmail: '',
            notes: '',
            type: 'in-person',
          }
        }),

      // UI States
      isSymptomCheckerOpen: false,
      toggleSymptomChecker: () => set((state) => ({ isSymptomCheckerOpen: !state.isSymptomCheckerOpen })),
      isEmergencyModalOpen: false,
      toggleEmergencyModal: () => set((state) => ({ isEmergencyModalOpen: !state.isEmergencyModalOpen })),
      isVirtualAssistantOpen: false,
      toggleVirtualAssistant: () => set((state) => ({ isVirtualAssistantOpen: !state.isVirtualAssistantOpen })),
      
      // Notifications
      notifications: [],
      addNotification: (message, type = 'info') =>
        set((state) => ({
          notifications: [...state.notifications, { id: Date.now(), message, type }]
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }))
    }),
    {
      name: 'apex-health-store',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        language: state.language,
        user: state.user,
        token: state.token
      })
    }
  )
)
