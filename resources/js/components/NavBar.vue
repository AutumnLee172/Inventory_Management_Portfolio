<template>

    <aside
        class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main">
        <div class="sidenav-header">
            <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true" id="iconSidenav"></i>
            <a class="navbar-brand m-0" href="#" style="cursor:default;">
                <img src="..\resources\img\jacenterpriselogo.jpg"
                    class="navbar-brand-img h-100" alt="main_logo">
                <span class="ms-1 font-weight-bold">JAC Light Enterprise</span>
            </a>
        </div>
        <hr class="horizontal dark mt-0">
        <div class="w-auto " id="sidenav-collapse-main">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-primary text-sm opacity-10" icon="tv"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Dashboard</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/products" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-warning text-sm opacity-10" icon="lightbulb"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Products</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/customers" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-info text-sm opacity-10" icon="people"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Customers</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-danger text-sm opacity-10" icon="person"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Profile</span>
                    </router-link>
                </li>
                <li class="nav-item mt-3">
                    <h6 class="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Transaction</h6>
                </li>
                <li class="nav-item">
                    <router-link to="/invoices" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-danger text-sm opacity-10" icon="receipt-cutoff"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Invoices</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/sales" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-primary text-sm opacity-10" icon="receipt"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Sales Order</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/cash" class="nav-link" active-class="active" exact>
                        <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <b-icon class="ni ni-tv-2 text-success text-sm opacity-10" icon="cash-coin"></b-icon>
                        </div>
                        <span class="nav-link-text ms-1">Cash Sales</span>
                    </router-link>
                </li>
                <div style="position: fixed; bottom: 20px">
                    <li class="nav-item">
                        <a class="nav-link " @click="logout" style="cursor: pointer;">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <b-icon class="ni ni-tv-2 text-info text-sm opacity-10" icon="box-arrow-right"></b-icon>
                            </div>
                            <span class="nav-link-text ms-1">Logout</span>
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NavBar',
    props: {
        menu: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        logout() {
            document.getElementById('logout-form').submit()
        }
    },
    mounted: function () {

    }
}
</script>
