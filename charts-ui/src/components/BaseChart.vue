<template>
  <div 
    ref="chartRef" 
    :style="{ width, height }"
    class="chart-container"
  />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useECharts } from '@/composables/useECharts'

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const chartRef = ref(null)
const { initChart, setOption, showLoading, hideLoading } = useECharts(chartRef)

onMounted(async () => {
  await initChart()
  setOption(props.option)
})

watch(() => props.option, (newOption) => {
  setOption(newOption)
}, { deep: true })

watch(() => props.loading, (loading) => {
  loading ? showLoading() : hideLoading()
})
</script>

<style scoped>
.chart-container {
  min-height: 200px;
}
</style>