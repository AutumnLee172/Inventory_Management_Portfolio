<template>
    <div class="container-fluid py-4 px-4">
        <b-row class="my-1">
            <b-col sm="2">
                <router-link to="/Sales/new">
                    <b-button>Add new</b-button>
                </router-link>
            </b-col>
            <b-col sm="7"></b-col>
            <b-col sm="3">
                <b-form-input v-model="search" placeholder="Search"></b-form-input>
            </b-col>
        </b-row>
        <div class="card mb-4">
            <div class="card-header">
                <h2>Sales Order table</h2>
            </div>
            <b-table :busy="isBusy" class="table align-items-center mb-0" id="sales-table" :fields="fields"
                head-variant="light" :items="items" sort-by="transaction_id" :sort-desc=true responsive="sm"
                :per-page="perPage" :current-page="currentPage">
                <template #cell(Edit)="row">
                    <router-link :to="{name:'sales.checkout', params: {id: row.item.id}}">
                        <b-button variant="success">
                            <b-icon icon="check2-circle" font-scale="1"></b-icon>
                        </b-button>
                    </router-link>
                    <b-button variant="info" @click="generatePDF(row.item.id)">
                        <b-icon icon="file-earmark-arrow-down" font-scale="1"></b-icon>
                    </b-button>
                    <router-link :to="{name:'sales.edit', params: {id: row.item.id}}">
                        <b-button variant="primary">
                            <b-icon icon="pencil-square" font-scale="1"></b-icon>
                        </b-button>
                    </router-link>
                    <b-button variant="danger" @click="destroy(id=row.item.id)" v-if="row.item.status == 'Pending'">
                        <b-icon icon="trash" font-scale="1"></b-icon>
                    </b-button>
                    <b-button variant="danger" @click="destroy(id=row.item.id)" v-if="row.item.status == 'Invoiced'"
                        disabled>
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
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="sales-table">
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
    name: "Sales",
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
            search: '',
            items: [],
            displayimage: null,
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'transaction_id', sortable: true },
                { key: 'customer_name', sortable: true },
                { key: 'total', sortable: true },
                { key: 'deposit', sortable: true },
                { key: 'created_date', sortable: true },
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
                .get(`/sales`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.isBusy = false
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
        editForm() {

        },
        getEditData() {
            // this.isLoading = true;
            if (this.id) {
                axios
                    .get(`/products/${this.id}`)
                    .then((r) => {
                        // this.isLoading = false;
                        if (r.data && r.data.data) {
                            this.form = r.data.data;
                        }
                    })
                    .catch((err) => {
                        // this.isLoading = false;
                        this.$bvToast.toast(err, {
                            title: 'Error',
                            autoHideDelay: 5000
                        });
                    });
            }

        },
        getClearFormObject() {
            return {
                id: null,
                item_number: null,
                description: null,
                quantity: null,
                original_price: null,
                selling_price: null,
                file: null,
            }
        },
        submit() {

            let method = 'post'
            let url = '/products/add'
            console.log(this.form)

            if (this.id) {
                method = 'patch'
                url = `/products/update/${this.id}`
            }
            axios({
                method,
                url,
                data: this.form
            }).then(r => {

                if (!this.id && r.data.data.id) {
                    this.$swal('Successfully Created');
                    this.$bvModal.hide("modal-1");
                    this.getData();
                } else {

                    this.$swal('Successfully updated');
                    this.$bvModal.hide("modal-1");
                    this.getData();
                }
            }).catch(e => {
                this.$swal('An error has ocured' + e);
                this.$bvModal.hide("modal-1");
                this.getData();
            });

        },
        destroy($id) {
            this.$swal.fire({
                title: 'Are you sure to delete this?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`/sales/destroy/${$id}`).then(r => {
                        this.$swal('Successfully deleted');
                        this.getData();

                    }).catch(e => {
                        this.$swal('An error has ocured' + e);
                        this.getData();
                    });
                }
            })
        },
        clear() {
            this.id = null
            this.form = this.getClearFormObject()
        },
        onChange(e) {
            this.file = e.target.file[0];
        },
        generatePDF($id) {
            window.location.href = `/sales/createPDF/${$id}`
        },
        convertInvoice($id) {
            this.$swal.fire({
                title: 'Are you sure to invoice this sales order?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.get(`/sales/toinvoice/${$id}`).then(r => {
                        this.$swal('Successfully invoiced');
                        this.getData();

                    }).catch(e => {
                        this.$swal('An error has ocured' + e);
                        this.getData();
                    });
                }
            })
        },
        searchBy() {
            this.isBusy = true
            axios
                .get(`/sales/search/${this.search}`)
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
            } else if (newValue) {
                this.searchBy();
            }
        }
    }
}

</script>

