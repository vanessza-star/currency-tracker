<template>
  <div class="home">
    <h1>Моніторинг курсів валют НБУ</h1>

    <CurrencyConverter />

    <input
      v-model="search"
      type="text"
      placeholder="Пошук валюти..."
      class="search-input"
    />

    <p v-if="store.rates.length">
      Останнє оновлення: {{ store.rates[0].exchangedate }} о {{ lastUpdatedTime }}
</p>
    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Код</th>
            <th>Курс (грн)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rate in filteredRates" :key="rate.cc">
            <td>{{ rate.txt }}</td>
            <td>{{ rate.cc }}</td>
            <td><strong>{{ rate.rate.toFixed(2) }}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCurrencyStore } from '../stores/currency'
import CurrencyConverter from '../components/CurrencyConverter.vue'

const store = useCurrencyStore()
const search = ref('')
const lastUpdatedTime = ref('--:--')

const filteredRates = computed(() => {
  return store.rates.filter(rate =>
    rate.cc.toLowerCase().includes(search.value.toLowerCase()) ||
    rate.txt.toLowerCase().includes(search.value.toLowerCase())
  )
})

const updateTime = () => {
  lastUpdatedTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  store.fetchRates()
  updateTime()

  setInterval(() => {
    store.fetchRates()
    updateTime()
  }, 60000)
})
</script>

<style scoped>
.home {
  max-width: 900px;
  width: 95%; /* Адаптивність: не ширше екрана */
  margin: 0 auto;
  padding: 20px; /* Менше відступів на мобільних */
  font-family: sans-serif;
  min-height: 100vh;
  background-color: #d4edda;
}

/* Контейнер для скролу таблиці */
.table-wrapper {
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
  min-width: 300px; /* Щоб таблиця не стискалася занадто сильно */
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px 8px; /* Менше padding на мобільних */
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #c3e6cb;
}

/* Медіа-запит для дуже маленьких екранів */
@media (max-width: 600px) {
  h1 { font-size: 1.5rem; }
  th, td { font-size: 0.85rem; padding: 8px 4px; }
  .home { padding: 10px; }
}

.status { text-align: center; margin-top: 20px; }
.error { color: red; text-align: center; }
.search-input {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box; /* щоб padding не виходив за межі */
}
</style>