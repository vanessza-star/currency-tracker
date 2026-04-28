import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    rates: [],
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),

  actions: {
    async fetchRates() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
        )

        this.rates = response.data
      } catch (err) {
        this.error = 'Не вдалося завантажити курси валют.'
      } finally {
        this.loading = false
      }
    },

    toggleFavorite(rate) {
      const index = this.favorites.findIndex(f => f.cc === rate.cc)

      if (index === -1) {
        this.favorites.push(rate)
      } else {
        this.favorites.splice(index, 1)
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    isFavorite(code) {
      return this.favorites.some(f => f.cc === code)
    }
  }
})