<script setup>
import { computed, onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import GaugeChart from './components/GaugeChart.vue'
import HorizontalLineChart from './components/HorizontalLineChart.vue'

const gaugeValue = ref(0)
const indicatorValue = ref(0)
const loading = ref(true)

// Horizontal chart data
const horizontalData = ref([])
const yAxisData = ref([])

// Computed property to get current status
const currentStatus = computed(() => {
  const value = gaugeValue.value
  if (value <= 20) return { text: '极度恐慌', type: 'danger' }
  if (value <= 40) return { text: '恐慌', type: 'warning' }
  if (value <= 60) return { text: '中性', type: 'info' }
  if (value <= 80) return { text: '乐观', type: 'primary' }
  return { text: '极度乐观', type: 'success' }
})

// Simulate data loading
onMounted(() => {
  setTimeout(() => {

    // GaugeChart
    gaugeValue.value = 31
    indicatorValue.value = 65

    // Horizontal chart data
    horizontalData.value = [84.8, 15.2]
    yAxisData.value = ['3.50 - 3.75', '3.75 - 4.00 ']

    loading.value = false
  }, 1000)
})
</script>

<template>
  <header>
    <div class="header-content">
      <div class="logo-section">
        <div class="financial-icon">📈</div>
        <div class="title-section">
          <h1>Financial Markets Dashboard</h1>
          <p>Nasdaq Index & Federal Funds Rate Analysis</p>
        </div>
      </div>
      <div class="market-status">
        <el-tag type="success" size="large">Market Open</el-tag>
      </div>
    </div>
  </header>

  <main>
    <el-row :gutter="20" class="charts-container">
      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>恐慌贪婪指数</span>
              <div>
                <el-tag :type="currentStatus.type" size="large">
                  {{ gaugeValue }} - {{ currentStatus.text }}
                </el-tag>
              </div>
            </div>
          </template>
          <GaugeChart
            :value="gaugeValue"
            :loading="loading"
            title="最近更新于 Dec 9 9:37:07 AM"
            height="300px"
          />
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>美联储加息降息概率预测</span>
            </div>
          </template>
          <HorizontalLineChart
            :data="horizontalData"
            :y-axis-data="yAxisData"
            :loading="loading"
            title="2025年12月11日"
            height="300px"
            color="#91cc75"
          />
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<style scoped>
.charts-container {
  margin-top: 2rem;
  padding: 1rem;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  line-height: 1.5;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.financial-icon {
  font-size: 3rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.title-section h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.title-section p {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

.market-status {
  display: flex;
  align-items: center;
}

@media (min-width: 1024px) {
  header {
    display: block;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .title-section h1 {
    font-size: 2rem;
  }
}
</style>
