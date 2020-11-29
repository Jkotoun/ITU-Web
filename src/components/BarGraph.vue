<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Bar } from "vue-chartjs";
@Component
export default class BarGraph extends Mixins(Bar) {
  @Prop({ required: true }) data: any;
  mounted() {
    this.drawChart();
  }
  @Watch("data")
  drawChart() {
    const options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1,
            },
          },
        ],
      },
    };
    this.renderChart(this.data, options);
  }
}
</script>

