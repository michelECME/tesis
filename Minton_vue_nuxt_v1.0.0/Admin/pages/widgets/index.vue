<script>
import VueApexCharts from 'vue-apexcharts'

import countTo from 'vue-count-to'
import {
    widgetData,
    widgetuser,
    widget,
    revenueAreaChart,
    revenueBarChart,
    revenueLineColumnChart,
    revenueLineChart,
    revenueRealTimeChart,
    revenuePieChart,
    getNewRealTimeSeries,
} from './data'

/**
 * Widgets component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    components: {
        apexchart: () => import('vue-apexcharts'),
        countTo
    },
    data() {
        return {
            widgetData: widgetData,
            widgetuser: widgetuser,
            widget: widget,
            revenueLineColumnChart: revenueLineColumnChart,
            revenueRealTimeChart: revenueRealTimeChart,
            revenueLineChart: revenueLineChart,
            revenueAreaChart: revenueAreaChart,
            revenueBarChart: revenueBarChart,
            revenuePieChart: revenuePieChart,
            title: 'Widgets',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'Admin UI',
                    href: '/',
                },
                {
                    text: 'Widgets',
                    active: true,
                },
            ],
            colors: [{
                    number: '268',
                    text: 'New Customers',
                    chartColor: '#1abc9c',
                },
                {
                    number: '8715',
                    text: 'Online Orders',
                    chartColor: '#3bafda',
                },
                {
                    number: '$925.78',
                    text: 'Revenue',
                    chartColor: '#f672a7',
                },
                {
                    number: '$78.58',
                    text: 'Daily Average',
                    chartColor: '#6c757d',
                },
            ],
        }
    },
    mounted() {
        window.setInterval(() => {
            this.revenueRealTimeChart['series'] = [{
                name: 'Data',
                data: getNewRealTimeSeries({
                    min: 10,
                    max: 90,
                }),
            }, ]
        }, 1000)
    },
    middleware: 'router-auth'
}
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-xl-3 col-md-6">
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <h3 class="text-success counter mt-0">2562</h3>
                    <p class="text-muted mb-0">Total Sales today</p>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <h3 class="text-primary counter mt-0">5685</h3>
                    <p class="text-muted mb-0">Daily visitors</p>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <h3 class="text-pink mt-0">
                        $
                        <span class="counter">12480</span>
                    </h3>
                    <p class="text-muted mb-0">Total Earning</p>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="widget-simple text-center card">
                <div class="card-body">
                    <h3 class="text-purple counter mt-0">62</h3>
                    <p class="text-muted mb-0">Pending Orders</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div v-for="data in widgetData" :key="data.number" class="col-md-6 col-xl-3">
            <div class="widget-rounded-circle card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div :class=" `avatar-lg rounded-circle bg-icon-${data.color} `">
                                <i :class="`${data.icon} font-24 avatar-title text-white`"></i>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-right">
                                <h3 class="text-dark mt-1">
                                    <span>
                                        <countTo :end-val="data.number" :duration="3000"></countTo>
                                    </span>
                                </h3>
                                <p class="text-muted mb-1 text-truncate">{{data.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end card-box -->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
    <div class="row">
        <div v-for="color in colors" :key="color.text" class="col-xl-3 col-md-6">
            <WidgetChart :number="color.number" :text="color.text" :chart-color="color.chartColor" />
        </div>
    </div>
    <div class="row">
        <div v-for="user in widgetuser" :key="user.name" class="col-md-6 col-xl-3">
            <div class="widget-rounded-circle card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <div class="avatar-lg">
                                <img :src="`${user.image}`" class="img-fluid rounded-circle" alt="user-img" />
                            </div>
                        </div>
                        <div class="col">
                            <h5 class="mt-0">{{user.name}}</h5>
                            <p class="text-muted mb-1 font-13">themesbrand@gmail.com</p>
                            <small :class="`text-${user.color}`">
                                <b>{{user.type}}</b>
                            </small>
                        </div>
                    </div>
                </div>
                <!-- end row-->
            </div>
            <!-- end widget-rounded-circle-->
        </div>
        <!-- end col-->
    </div>
    <!-- end row -->

    <div class="row">
        <div v-for="widgetdata in widget" :key="widgetdata.icon" class="col-xl-3 col-md-6">
            <div class="card widget-icon">
                <div class="card-body">
                    <div class="avatar-lg float-left">
                        <i :class="`${widgetdata.icon} text-${widgetdata.iconcolor} avatar-title display-4 m-0`"></i>
                    </div>
                    <div class="wid-icon-info text-right">
                        <p class="text-muted mb-1 font-13 text-uppercase">{{widgetdata.title}}</p>
                        <h4 class="mb-1 counter">
                            <countTo :end-val="widgetdata.number" :duration="3000"></countTo>
                        </h4>
                        <small :class="`text-${widgetdata.textcolor}`">
                            <b>{{widgetdata.text}}</b>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Row -->

    <div class="row">
        <div class="col-xl-6">
            <!-- BEGIN WEATHER WIDGET 1 -->
            <div class="card bg-info border-info">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row align-items-center">
                                <div class="col-6 text-center">
                                    <h1 class="display-4">
                                        <i class="wi wi-day-sleet text-white"></i>
                                    </h1>
                                </div>
                                <div class="col-6">
                                    <div class="text-white">
                                        <h2 class="text-white">
                                            <b>32°</b>
                                        </h2>
                                        <p>Partly cloudy</p>
                                        <p class="mb-0">15km/h - 37%</p>
                                    </div>
                                </div>
                            </div>
                            <!-- End row -->
                        </div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">SAT</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-night-alt-cloudy text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        30
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">SUN</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-day-sprinkle text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        28
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">MON</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-hot text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        33
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                            </div>
                            <!-- end row -->
                        </div>
                    </div>
                </div>
                <!-- end row -->
            </div>
            <!-- cardbox -->
            <!-- END Weather WIDGET 1 -->
        </div>
        <!-- End col-xl-6 -->

        <div class="col-xl-6">
            <!-- WEATHER WIDGET 2 -->
            <div class="card bg-success border-success">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="row align-items-center">
                                <div class="col-6 text-center">
                                    <h1 class="display-4">
                                        <i class="wi wi-night-sprinkle text-white"></i>
                                    </h1>
                                </div>
                                <div class="col-6">
                                    <div class="text-white">
                                        <h2 class="text-white">
                                            <b>18°</b>
                                        </h2>
                                        <p>Partly cloudy</p>
                                        <p class="mb-0">15km/h - 37%</p>
                                    </div>
                                </div>
                            </div>
                            <!-- End row -->
                        </div>
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">SAT</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-day-sprinkle text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        30
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">SUN</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-storm-showers text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        28
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                                <div class="col-4 text-center">
                                    <h4 class="text-white mt-0">MON</h4>
                                    <h3 class="my-3">
                                        <i class="wi wi-night-alt-cloudy text-white"></i>
                                    </h3>
                                    <h4 class="text-white mb-0">
                                        33
                                        <i class="wi wi-degrees"></i>
                                    </h4>
                                </div>
                            </div>
                            <!-- end row -->
                        </div>
                    </div>
                    <!-- end row -->
                </div>
            </div>
            <!-- card-box -->
            <!-- END WEATHER WIDGET 2 -->
        </div>
        <!-- /.col-xl-6 -->
    </div>
    <div class="row">
        <div class="col-12">
            <h4 class="mb-3">Chart Widgets</h4>
            <div class="row">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">Total Revenue</h4>

                            <div class="widget-chart text-center">
                                <!-- Total Revenue area chart-->
                                <apexchart height="200" type="area" :series="revenueAreaChart.series" :options="revenueAreaChart.chartOptions"></apexchart>
                                <!-- end Total Revenue-->
                                <div class="row mt-3">
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                        <h4>$1000</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                        <h4>$523</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                        <h4>$965</h4>
                                    </div>
                                </div>
                                <!-- end row -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">Sales Status</h4>
                            <div class="widget-chart text-center">
                                <!-- Income Amounts chart-->
                                <apexchart height="200" type="bar" :series="revenueBarChart.series" :options="revenueBarChart.chartOptions"></apexchart>
                                <!-- Income Amounts bar chart-->
                                <div class="row mt-3">
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                        <h4>$825</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                        <h4>$423</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                        <h4>$806</h4>
                                    </div>
                                </div>
                                <!-- end row -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title mb-3">Recent Users</h4>

                            <div class="widget-chart text-center">
                                <!-- Total Users pie chart -->
                                <apexchart height="210" type="pie" :series="revenuePieChart.series" :options="revenuePieChart.chartOptions"></apexchart>
                                <!-- end Total Users pie chart -->
                                <div class="row mt-3">
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                        <h4>$982</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                        <h4>$525</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                        <h4>$937</h4>
                                    </div>
                                </div>
                                <!-- end row -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
            <div class="row">
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">Total Revenue</h4>
                            <apexchart height="200" type="line" :series="revenueLineChart.series" :options="revenueLineChart.chartOptions"></apexchart>
                            <div class="row text-center mt-3">
                                <div class="col-4">
                                    <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                    <h4>$943</h4>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                    <h4>$624</h4>
                                </div>
                                <div class="col-4">
                                    <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                    <h4>$904</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">Total Revenue</h4>
                            <div class="widget-chart text-center">
                                <apexchart height="200" type="line" :series="revenueRealTimeChart.series" :options="revenueRealTimeChart.chartOptions"></apexchart>
                                <div class="row mt-3">
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                        <h4>$1022</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                        <h4>$538</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                        <h4>$988</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="header-title">Total Revenue</h4>
                            <div class="widget-chart text-center">
                                <apexchart height="200" type="bar" :series="revenueLineColumnChart.series" :options="revenueLineColumnChart.chartOptions"></apexchart>
                                <div class="row mt-3">
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                        <h4>$1022</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                        <h4>$538</h4>
                                    </div>
                                    <div class="col-4">
                                        <p class="text-muted font-15 mb-1 text-truncate">Last Month</p>
                                        <h4>$988</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <h4 class="mb-3">Other Widgets</h4>
            <div class="row">
                <div class="col-xl-4">
                    <Inbox />
                </div>
                <div class="col-xl-4">
                    <Chat />
                </div>
                <div class="col-xl-4">
                    <Todo />
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
