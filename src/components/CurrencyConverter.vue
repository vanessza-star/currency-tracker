<template>
  <div class="converter">
    <h2>Конвертер валют</h2>

    <input v-model.number="amount" type="number" min="0" />

    <select v-model="selectedRate">
      <option
        v-for="rate in store.rates"
        :key="rate.cc"
        :value="rate.rate"
      >
        {{ rate.cc }}
      </option>
    </select>

    <p>Результат: <strong>{{ converted.toFixed(2) }} грн</strong></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCurrencyStore } from '../stores/currency'

const store = useCurrencyStore()

const amount = ref(1)
const selectedRate = ref(1)

const converted = computed(() => amount.value * selectedRate.value)
</script>

<style scoped>
.converter {
  padding: 20px;
  margin: 20px 0;
  background: #f4f4f4;
  border-radius: 10px;
}
input, select {
  padding: 10px;
  margin-right: 10px;
}
</style>