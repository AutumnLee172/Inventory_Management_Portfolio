<template>
    <div class="container-fluid py-4 px-4">
        <b-row class="my-3">
            <b-col sm="3">
            <router-link to="/receives/new"><b-button>Add new</b-button></router-link>
        </b-col>
            <b-col sm="6"></b-col>
            <b-col sm="3">
                <b-form-input v-model="search" placeholder="Search"></b-form-input>
            </b-col>
        </b-row>


        <div class="card mb-4">
            <div class="card-header">
                <h2>Supplies table</h2>
            </div>
            <b-table :busy="isBusy" class="table align-items-center mb-0" id="sales-table" :fields="fields" head-variant="light"
                :items="items" sort-by="transaction_id" :sort-desc=true responsive="sm" :per-page="perPage" :current-page="currentPage">
                <template #cell(Edit)="row">
                    <!-- <b-button variant="success" @click="complete(row.item.id)" v-if="row.item.status == 'Pending'">
                        <b-icon icon="check2-circle" font-scale="1"></b-icon>
                    </b-button>
                    <b-button variant="success" v-if="row.item.status == 'Completed'" disabled>
                        <b-icon icon="check2-circle" font-scale="1"></b-icon>
                    </b-button> -->
                    <b-button variant="info" @click="generatePDF(row.item.id)">
                        <b-icon icon="file-earmark-arrow-down" font-scale="1"></b-icon>
                    </b-button>
                    <router-link :to="{name:'receives.edit', params: {id: row.item.id}}">
                    <b-button variant="primary" >
                        <b-icon icon="pencil-square" font-scale="1"></b-icon>
                    </b-button>
                    </router-link>
                    <b-button variant="danger" @click="destroy(id=row.item.id)" >
                        <b-icon icon="trash" font-scale="1"></b-icon>
                    </b-button>
                </template>
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner variant="primary" class="align-middle"></b-spinner>
                    </div>
                </template>
            </b-table>
        </div>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="merchant-table">
        </b-pagination>

    </div>

</template>

<style>
.card-header {
    background-color: #fff;
    border-bottom: none;
}
</style>

<script>
import axios from 'axios';


export default {
    name: "Receives",
    props: {
        id: {
            default: null
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    data() {
        return {
            //form: this.getClearFormObject(),
            isBusy: false,
            items: [],
            search: '',
            file: null,
            displayimage: null,
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'transaction_id', sortable: true },
                { key: 'supplier_name', sortable: true },
                { key: 'total', sortable: true },
                { key: 'balance', sortable: true },
                { key: 'created_date', sortable: true },
                { key: 'status', sortable: true },
                { key: 'Edit', sortable: false }
            ]
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.isBusy = true
            axios
                .get('/receives')
                .then((r) => {
                    this.isBusy = false
                    if (r.data && r.data.data) {
                        this.items = r.data.data;
                    }
                })
                .catch((err) => {
                    this.isBusy = false
                    this.$bvToast.toast(err, {
                        title: 'Error',
                        autoHideDelay: 5000
                    });
                });
        },
        generatePDF($id){
            window.location.href = `/receives/createPDF/${$id}`
        },
        // complete($id){
        //     this.$swal.fire({
        //         title: 'Are you sure to complete this?',
        //         showCancelButton: true,
        //         confirmButtonText: 'Confirm',
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             axios.post(`/invoices/complete/${$id}`).then(r => {
        //                 this.$swal('Order is completed');
        //                 this.getData();

        //             }).catch(e => {
        //                 this.$swal('An error has ocured' + e);
        //                 this.getData();
        //             });
        //         }
        //     })
        // },
        searchBy() {
            this.isBusy = true
            axios
                .get(`/receives/search/${this.search}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.isBusy = false
                        this.items = r.data.data;
                    }
                })
                .catch((err) => {
                    this.isBusy = false
                    this.$bvToast.toast(`Error: `, {
                        title: 'Error',
                        autoHideDelay: 5000
                    });
                });
        },
        destroy($id) {
            this.$swal.fire({
                title: 'Are you sure to delete this?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`/receives/destroy/${$id}`).then(r => {
                        this.$swal('Successfully deleted');
                        this.getData();

                    }).catch(e => {
                        this.$swal('An error has ocured' + e);
                        this.getData();
                    });
                }
            })
        },
    },
    watch: {
        id(newValue) {
            this.form = this.getClearFormObject()
            if (newValue) {
                this.getEditData()
            }
        },
        search(newValue) {
            if (newValue == "" || newValue == null) {
                this.getData();
            }else if (newValue){
                this.searchBy();
            }
        }
    }
}

</script>

