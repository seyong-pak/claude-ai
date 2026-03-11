import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'app_banners'

const defaultBanners = () => ({
  mainPopup: [],
  mainBottom: [],
  loginBanner: []
})

export const useBannerStore = defineStore('banner', () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const banners = ref(stored ? JSON.parse(stored) : defaultBanners())

  function getActiveBanners(type) {
    const now = new Date()
    return (banners.value[type] || []).filter(b => {
      if (!b.image || !b.startDate || !b.endDate) return false
      const start = new Date(b.startDate)
      const end = new Date(b.endDate)
      end.setHours(23, 59, 59, 999)
      return now >= start && now <= end
    })
  }

  function getBannerStatus(b) {
    if (!b.image) return 'no-image'
    if (!b.startDate || !b.endDate) return 'no-date'
    const now = new Date()
    const start = new Date(b.startDate)
    const end = new Date(b.endDate)
    end.setHours(23, 59, 59, 999)
    if (now < start) return 'pending'
    if (now > end) return 'ended'
    return 'active'
  }

  function addBanner(type, item) {
    banners.value[type].push({ id: Date.now(), ...item })
    save()
  }

  function updateBanner(type, id, data) {
    const idx = banners.value[type].findIndex(b => b.id === id)
    if (idx !== -1) {
      banners.value[type][idx] = { ...banners.value[type][idx], ...data }
      save()
    }
  }

  function removeBanner(type, id) {
    banners.value[type] = banners.value[type].filter(b => b.id !== id)
    save()
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banners.value))
  }

  return { banners, getActiveBanners, getBannerStatus, addBanner, updateBanner, removeBanner }
})
