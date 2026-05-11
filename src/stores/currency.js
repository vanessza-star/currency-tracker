import { defineStore } from 'pinia'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    rates: [],
    loading: false,
    error: null
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
    }
  }
})