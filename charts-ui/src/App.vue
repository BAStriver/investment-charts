<script setup>
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import HalfPieChart from './components/HalfPieChart.vue'

const chartData = ref([])
const xAxisData = ref([])
const pieData = ref([])
const halfPieData = ref([])
const loading = ref(true)

// Simulate data loading
onMounted(() => {
  setTimeout(() => {
    chartData.value = [120, 200, 150, 80, 70, 110, 130]
    xAxisData.value = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    pieData.value = [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]
    
    halfPieData.value = [
      { value: 35, name: 'Desktop' },
      { value: 45, name: 'Mobile' },
      { value: 20, name: 'Tablet' }
    ]
    
    loading.value = false
  }, 1000)
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="Charts Dashboard" />
    </div>
  </header>

  <main>
    <el-row :gutter="20" class="charts-container">
      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>Line Chart</span>
              <el-tag type="success" v-if="!loading">Live Data</el-tag>
            </div>
          </template>
          <LineChart 
            :data="chartData"
            :x-axis-data="xAxisData"
            :loading="loading"
            title="Weekly Sales"
            height="300px"
          />
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>Traffic Sources</span>
            </div>
          </template>
          <PieChart 
            :data="pieData"
            :loading="loading"
            title="Traffic Sources"
            height="350px"
          />
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>Device Usage</span>
            </div>
          </template>
          <HalfPieChart 
            :data="halfPieData"
            :loading="loading"
            title="Device Usage Distribution"
            height="350px"
            :colors="['#409EFF', '#67C23A', '#E6A23C']"
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
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
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
</style>
