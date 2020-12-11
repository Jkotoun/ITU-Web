<!--Autor: Jiří Vlasák -->
<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Doughnut } from "vue-chartjs";
@Component
export default class BarGraph extends Mixins(Doughnut) {
  @Prop({ required: true }) data: any;
  mounted() {
    this.drawChart();
  }
  @Watch("data")
  drawChart() {
    const options = {
      maintainAspectRatio: false,
    };
    this.renderChart(this.data, options);
  }
}
</script>

