<script setup>
import {computed, onMounted, ref} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import GaugeChart from './components/GaugeChart.vue'

const gaugeValue = ref(0)
const indicatorValue = ref(0)
const loading = ref(true)

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
    gaugeValue.value = 31
    indicatorValue.value = 65
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
