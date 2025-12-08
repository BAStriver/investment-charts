import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

export function useECharts(chartRef) {
  const chart = ref(null)
  const isLoading = ref(false)

  const initChart = async () => {
    if (!chartRef.value) return
    
    await nextTick()
    chart.value = echarts.init(chartRef.value)
    
    // Handle resize
    const handleResize = () => chart.value?.resize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }

  const setOption = (option, notMerge = false) => {
    if (chart.value) {
      chart.value.setOption(option, notMerge)
    }
  }

  const showLoading = () => {
    isLoading.value = true
    chart.value?.showLoading()
  }

  const hideLoading = () => {
    isLoading.value = false
    chart.value?.hideLoading()
  }

  onUnmounted(() => {
    chart.value?.dispose()
  })

  return {
    chart,
    isLoading,
    initChart,
    setOption,
    showLoading,
    hideLoading
  }
}