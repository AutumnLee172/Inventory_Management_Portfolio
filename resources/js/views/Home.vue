<template>

  <div class="container-fluid py-4 px-4">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Revenue of Today</p>
                  <h5 class="font-weight-bolder">
                    MYR {{ items.TodayRevenue }}
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder"
                      v-if="items.RevenueVs >= 0">+{{items.RevenueVs}}%</span>
                    <span class="text-danger text-sm font-weight-bolder"
                      v-else-if="items.RevenueVs < 0">{{items.RevenueVs}}%</span>
                    since yesterday
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                  <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Total Registered Customers</p>
                  <h5 class="font-weight-bolder">
                    {{ items.thismonthuserstotal }}
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">+ {{ items.lastmonthuserstotal }}
                      customers</span>
                    since last month
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                  <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Gross Profit Today</p>
                  <h5 class="font-weight-bolder">
                    MYR {{ items.grosstoday }}
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder" v-if="items.GrossVs >= 0">+{{ items.GrossVs
                    }}%</span>
                    <span class="text-danger text-sm font-weight-bolder" v-else-if="items.GrossVs < 0">{{ items.GrossVs
                    }}%</span>
                    since yesterday
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                  <i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Uncollected Sales</p>
                  <h5 class="font-weight-bolder">
                    MYR {{ items.uncollectedMoney }}
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">Amount of uncollected balance</span>
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                  <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-6 mb-lg-0 mb-4">
        <div class="card z-index-2 h-100">
          <div class="card-header pb-0 pt-3 bg-transparent">
            <h6 class="text-capitalize">Revenue overview</h6>
            <p class="text-sm mb-0">
              <i class="fa fa-arrow-up text-success"></i>
              Sum of net in invoices and cash sales
            </p>
          </div>
          <div class="card-body p-3">
            <div class="chart">
              <LineChart :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                :width="width" :height="height" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card z-index-2 h-100">
          <div class="card-header pb-0 pt-3 bg-transparent">
            <h6 class="text-capitalize">Order overview</h6>
            <p class="text-sm mb-0">
              <i class="fa fa-arrow-up text-success"></i>
              Number of orders in invoices and cash sales
            </p>
          </div>
          <div class="card-body p-3">
            <div class="chart">
              <LineChart :chart-options="chartOptions" :chart-data="chartData2" :chart-id="chartId"
                :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                :width="width" :height="height" />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-lg-12 mb-lg-0 mb-4">
          <div class="card ">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Recent Transactions</h6>
              </div>
            </div>
            <div class="table-responsive">
              <b-table striped hover :busy="isBusy" class="align-items-center mb-0" :fields="fields"
                head-variant="light" :items="Tableitems" responsive="sm"
                >
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner variant="primary" class="align-middle"></b-spinner>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
  
<script>
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

// @ is an alias to /src
// import * as chartConfig from '@/components/Charts/chart.config'
export default {
  name: 'home',
  components: {
    LineChart
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      items: this.getStatisticObjects(),
      chartData: {
        labels: ['January', 'February'],
        datasets: [{ data: this.monthData }]
      },
      chartData2: {
        labels: ['January', 'February'],
        datasets: [{ data: this.monthData }]
      },
      chartOptions: {
        responsive: true
      },
      fields: [
        { key: 'transaction_id' },
        { key: 'customer_name' },
        { key: 'net' },
        { key: 'transaction_type' },
        { key: 'created_date' }
      ],
      isBusy: false,
      Tableitems: [],
    }
  },
  computed: {

  },
  created() {
    this.getData();
    this.getChartData();
    this.getChartData2();
  },
  methods: {
    getStatisticObjects() {
      return {
        TodayRevenue: 0,
        RevenueVs: 0,
        thismonthuserstotal: 0,
        lastmonthuserstotal: 0,
        grosstoday: 0,
        GrossVs: 0,
        uncollectedMoney: 0,
      }
    },
    getData() {
      axios
        .get(`/getStats`)
        .then((r) => {
          if (r.data) {
            this.items.TodayRevenue = r.data.RevenueToday;
            this.items.RevenueVs = r.data.RevenueVs;
            this.items.thismonthuserstotal = r.data.thismonthuserstotal;
            this.items.lastmonthuserstotal = r.data.lastmonthuserstotal;
            this.items.grosstoday = r.data.grosstoday;
            this.items.GrossVs = r.data.GrossVs;
            this.items.uncollectedMoney = r.data.uncollectedMoney;
            this.Tableitems = r.data.TableData;
          }
        })
        .catch((err) => {
          this.$bvToast.toast(err, {
            title: 'Error',
            autoHideDelay: 5000
          });
        });
    },
    getChartData() {
      axios
        .get(`/getChartData`)
        .then((r) => {
          if (r.data) {
            this.chartData = {
              labels: r.data.label,
              datasets: [{ data: r.data.data }]
            }
          }
        })
        .catch((err) => {
          this.$bvToast.toast(err, {
            title: 'Error',
            autoHideDelay: 5000
          });
        });
    },
    getChartData2() {
      axios
        .get(`/getChartData2`)
        .then((r) => {
          if (r.data) {
            this.chartData2 = {
              labels: r.data.label,
              datasets: [{ data: r.data.data }]
            }
          }
        })
        .catch((err) => {
          this.$bvToast.toast(err, {
            title: 'Error',
            autoHideDelay: 5000
          });
        });
    },

  }
}
</script>
  