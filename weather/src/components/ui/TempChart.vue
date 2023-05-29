<template>
  <div class="chart">
    <Line :data="data" :options="options"/>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Line} from 'vue-chartjs'
import {ref} from "vue";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
  name: 'TempChart',
  components: {
    Line
  },
  props: {
    y: {
      required: true,
      type: Array,
    },
    x: {
      required: true,
      type: Array,
    }
  },
  setup(props) {
    const data = ref({
      labels: props.y,
      datasets: [
        {
          label: 'Temp',
          backgroundColor: 'blue',
          data: props.x
        }
      ]
    });

    const options = ref({
      responsive: true,
      maintainAspectRatio: false
    });

    return {
      data,
      options,
    }

  }
}
</script>

<style>
.chart {
  width: 500px;
  height: 200px;
}

@media (max-width: 1200px) {
  .chart {
    width: 350px;
  }
}

@media (max-width: 410px) {
  .chart {
    width: 200px;
  }
}
</style>