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
  value: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 100
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
  colors: {
    type: Array,
    default: () => [
      [0.2, '#fd666d'],  // 极度恐慌 - Red
      [0.4, '#ff9f43'],  // 恐慌 - Orange
      [0.6, '#feca57'],  // 中性 - Yellow
      [0.8, '#48dbfb'],  // 乐观 - Light Blue
      [1, '#0be881']      // 极度乐观 - Green
    ]
  }
})

// Function to get label based on value
const getLabel = (value) => {
  if (value <= 25) return '极度恐慌'
  if (value <= 45) return '恐慌'
  if (value <= 55) return '中性'
  if (value <= 75) return '乐观'
  return '极度乐观'
}

const chartOption = computed(() => ({
  title: {
    text: props.title,
    left: 'center',
    top: '80%'
  },
  series: [{
    name: 'Gauge',
    type: 'gauge',
    startAngle: 180,
    endAngle: 0,
    center: ['50%', '75%'],
    radius: '90%',
    min: 0,
    max: props.max,
    splitNumber: 8,
    axisLine: {
      lineStyle: {
        width: 6,
        color: props.colors
      }
    },
    pointer: {
      icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
      length: '12%',
      width: 20,
      offsetCenter: [0, '-60%'],
      itemStyle: {
        color: 'auto'
      }
    },
    axisTick: {
      length: 12,
      lineStyle: {
        color: 'auto',
        width: 2
      }
    },
    splitLine: {
      length: 20,
      lineStyle: {
        color: 'auto',
        width: 5
      }
    },
    axisLabel: {
      color: '#464646',
      fontSize: 16,
      distance: -60,
      rotate: 'tangential',
      formatter: function (value) {
        if (value === 12.5) return '极度恐慌'
        if (value === 35) return '恐慌'
        if (value === 50) return '中性'
        if (value === 65) return '乐观'
        if (value === 87.5) return '极度乐观'
        return ''
      }
    },
    title: {
      offsetCenter: [0, '-10%'],
      fontSize: 20,
      color: '#333'
    },
    detail: {
      fontSize: 30,
      offsetCenter: [0, '-35%'],
      valueAnimation: true,
      formatter: function (value) {
        return Math.round(value * 100) / 100
      },
      color: 'inherit'
    },
    data: [{
      value: props.value,
      name: getLabel(props.value)
    }]
  }]
}))
</script>