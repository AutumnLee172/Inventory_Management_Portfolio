<template>

    <div class="container-fluid py-4 px-4">
        <div class="row">
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3" style="height: 200px;">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Revenue of Today</p>
                                    <h5 class="font-weight-bolder">
                                        MYR {{ items.TodayRevenue }}
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-success text-sm font-weight-bolder"
                                            v-if="items.RevenueVs >= 0">+{{
                                                    items.RevenueVs
                                            }}%</span>
                                        <span class="text-danger text-sm font-weight-bolder"
                                            v-else-if="items.RevenueVs < 0">{{
                                                    items.RevenueVs
                                            }}%</span>
                                        since yesterday
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div
                                    class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                    <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3" style="height: 200px;">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Total Registered Customers
                                    </p>
                                    <h5 class="font-weight-bolder">
                                        {{ items.thismonthuserstotal }}
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-success text-sm font-weight-bolder">+ {{
                                                items.lastmonthuserstotal
                                        }}
                                            customers</span>
                                        since last month
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div
                                    class="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                    <i class="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3" style="height: 200px;">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Gross Profit Today</p>
                                    <h5 class="font-weight-bolder">
                                        MYR {{ items.grosstoday }}
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-success text-sm font-weight-bolder"
                                            v-if="items.GrossVs >= 0">+{{ items.GrossVs
                                            }}%</span>
                                        <span class="text-danger text-sm font-weight-bolder"
                                            v-else-if="items.GrossVs < 0">{{ items.GrossVs
                                            }}%</span>
                                        since yesterday
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div
                                    class="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                    <i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card">
                    <div class="card-body p-3" style="height: 200px;">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Uncollected Sales</p>
                                    <h5 class="font-weight-bolder">
                                        MYR {{ items.uncollectedMoney }}
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-success text-sm font-weight-bolder">Amount of uncollected
                                            balance</span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div
                                    class="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
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
                            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
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
                            <apexchart type="line" height="350" :options="chartOptions2" :series="series2"></apexchart>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Problem solved by removing a div class,for some reason of template, the div class stand some css in it so i terus hardcode the style into the div class :) -->
            <div class="col-lg-12 mb-lg-0 mb-4" style="margin-top: 1.5rem;">
                <div class="card ">
                    <div class="card-header pb-0 p-3">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-2">Recent Transactions</h6>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <b-table striped hover :busy="isBusy" class="align-items-center mb-0" :fields="fields"
                            head-variant="light" :items="Tableitems" responsive="sm">
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
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

// @ is an alias to /src
// import * as chartConfig from '@/components/Charts/chart.config'
export default {
    name: 'home',
    components: {
        apexchart: VueApexCharts,
    },
    props: {
    },
    data() {
        return {
            items: this.getStatisticObjects(),
            fields: [
                { key: 'transaction_id' },
                { key: 'customer_name' },
                { key: 'net' },
                { key: 'transaction_type' },
                { key: 'created_date' }
            ],
            isBusy: false,
            Tableitems: [],
            series: [],
            chartOptions: {},
            series2: [],
            chartOptions2: {},
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
                        this.series = [
                            {
                                name: "Invoice",
                                data: r.data.InvoiceData
                            },
                            {
                                name: "Cash Sales",
                                data: r.data.CashData
                            }
                        ];
                        this.chartOptions = {
                            chart: {
                                height: 350,
                                type: 'line',
                                dropShadow: {
                                    enabled: true,
                                    color: '#000',
                                    top: 18,
                                    left: 7,
                                    blur: 10,
                                    opacity: 0.2
                                },
                                zoom: {
                                    type: 'x',
                                    enabled: true,
                                    autoScaleYaxis: true
                                },
                                toolbar: {
                                    autoSelected: 'zoom'
                                }

                            },
                            colors: ['#5e72e4', '#fb8a40'],
                            dataLabels: {
                                enabled: true,
                            },
                            stroke: {
                                curve: 'smooth'
                            },
                            grid: {
                                borderColor: '#e7e7e7',
                                row: {
                                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                    opacity: 0.5
                                },
                            },
                            markers: {
                                size: 1
                            },
                            xaxis: {
                                categories: r.data.label,
                                title: {
                                    text: 'Month'
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Sum of Net (MYR)'
                                }
                            },
                            legend: {
                                position: 'top',
                                horizontalAlign: 'right',
                                floating: true,
                                offsetY: -25,
                                offsetX: -5
                            }
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
                        this.series2 = [
                            {
                                name: "Invoice",
                                data: r.data.InvoiceData
                            },
                            {
                                name: "Cash Sales",
                                data: r.data.CashData
                            }
                        ];
                        this.chartOptions2 = {
                            chart: {
                                height: 350,
                                type: 'line',
                                dropShadow: {
                                    enabled: true,
                                    color: '#000',
                                    top: 18,
                                    left: 7,
                                    blur: 10,
                                    opacity: 0.2
                                },
                                zoom: {
                                    type: 'x',
                                    enabled: true,
                                    autoScaleYaxis: true
                                },
                                toolbar: {
                                    autoSelected: 'zoom'
                                }

                            },
                            colors: ['#5e72e4', '#fb8a40'],
                            dataLabels: {
                                enabled: true,
                            },
                            stroke: {
                                curve: 'smooth'
                            },
                            grid: {
                                borderColor: '#e7e7e7',
                                row: {
                                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                    opacity: 0.5
                                },
                            },
                            markers: {
                                size: 1
                            },
                            xaxis: {
                                categories: r.data.label,
                                title: {
                                    text: 'Month'
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Number of Orders'
                                }
                            },
                            legend: {
                                position: 'top',
                                horizontalAlign: 'right',
                                floating: true,
                                offsetY: -25,
                                offsetX: -5
                            }
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
