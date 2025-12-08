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
    default: () => ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
  }
})

const chartOption = computed(() => ({
  title: {
    text: props.title,
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: '10%',
    left: 'center'
  },
  color: props.colors,
  series: [{
    name: props.title,
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '60%'],
    startAngle: 180,
    endAngle: 360,
    data: props.data,
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b}: {d}%'
    },
    labelLine: {
      show: true
    }
  }]
}))
</script>