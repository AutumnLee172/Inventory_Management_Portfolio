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
                      <span class="text-success text-sm font-weight-bolder" v-if="items.RevenueVs >= 0">+{{items.RevenueVs}}%</span>
                      <span class="text-danger text-sm font-weight-bolder" v-else-if="items.RevenueVs < 0">{{items.RevenueVs}}%</span>
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
                      <span class="text-success text-sm font-weight-bolder">+ {{ items.lastmonthuserstotal }} customers</span>
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
                      <span class="text-success text-sm font-weight-bolder" v-if="items.GrossVs >= 0">+{{ items.GrossVs }}%</span>
                      <span class="text-danger text-sm font-weight-bolder" v-else-if="items.GrossVs < 0">{{ items.GrossVs }}%</span>
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
    </div>
</template>
  
  <script>
  // @ is an alias to /src
  // import * as chartConfig from '@/components/Charts/chart.config'
  export default {
    name: 'home',
    components: {
      
    },
    data () {
      return {
        items: this.getStatisticObjects(), 

      }
    },
    computed: {
      
    },
    created() {
        this.getData();
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
  