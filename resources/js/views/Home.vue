<template>
    <div>
      <p>Home Testing</p>
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
        // defaultChart: {
        //   chartData: null,
        //   extraOptions: chartConfig.chartOptionsMain
        // }
      }
    },
    computed: {
      titleStack () {
        return [
          'Admin',
          'Dashboard'
        ]
      }
    },
    methods: {
     
    }
  }
  </script>
  