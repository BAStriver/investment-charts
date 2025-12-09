<template>
  <BaseChart 
    :option="chartOption" 
    :width="width" 
    :height="height"
    :loading="loading"
  />
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  yAxisData: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
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
  },
  color: {
    type: String,
    default: '#5470c6'
  },
  showLabels: {
    type: Boolean,
    default: true
  }
})

const chartOption = computed(() => ({
  title: {
    text: props.title,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: props.yAxisData
  },
  series: [{
    name: props.title,
    type: 'bar',
    data: props.data,
    itemStyle: {
      color: props.color
    },
    emphasis: {
      itemStyle: {
        color: '#a5c231'
      }
    },
    label: {
      show: props.showLabels,
      position: 'right',
      fontSize: 12,
      color: '#333',
      formatter: '{c}%'
    },
    lineStyle: {
      width: 2
    }
  }]
}))
</script>