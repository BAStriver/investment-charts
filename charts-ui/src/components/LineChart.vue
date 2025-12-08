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
  xAxisData: {
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
  }
})

const chartOption = computed(() => ({
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: props.xAxisData
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: props.data,
    type: 'line',
    smooth: true
  }]
}))
</script>