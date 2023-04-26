<template>
    <div class="container-fluid py-4 px-4">

        <b-row class="my-1">
            <b-col sm="2">
                <b-button @click="clear()" v-b-modal.modal-1>Add new</b-button>
            </b-col>
            <b-col sm="7"></b-col>
            <b-col sm="3">
                <b-form-input v-model="search" placeholder="Search"></b-form-input>
            </b-col>
        </b-row>

        <div class="card mb-4">
            <div class="card-header">
                <h2>Suppliers table</h2>
            </div>
            <b-table :busy="isBusy" class="table align-items-center mb-0" id="merchant-table" :fields="fields" head-variant="light"
                :items="items" sort-by="name" responsive="sm" :per-page="perPage" :current-page="currentPage">
                <template #cell(Edit)="row">
                    <b-button variant="primary" v-b-modal.modal-1 @click="id=row.item.id">
                        <b-icon icon="pencil-square" font-scale="1"></b-icon>
                    </b-button>
                    <b-button variant="danger" @click="destroy(id=row.item.id)">
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
        <b-modal id="modal-1" title="Merchant Management" hide-footer size="lg">

            <form @submit.prevent="submit">

                <b-form-input class="sr-only" id="id" :value="id" type="text" v-model="form.id" readonly>
                </b-form-input>


                <b-input-group prepend="Customer Name" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="name" name="name" v-model="form.name" required>
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Phone Number" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="phone_number" name="phone_number" v-model="form.phone_number" required>
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Address" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="address" name="address" v-model="form.address" required>
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Remark" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="remark" name="remark" v-model="form.remark" required>
                    </b-form-input>
                </b-input-group>
                <br />
                <b-button type="is-primary" native-type="submit" variant="primary">Submit</b-button>
            </form>
        </b-modal>
    </div>

</template>

<script>
import axios from 'axios';


export default {
    name: "Suppliers",
    props: {
        id: {
            default: null
        },
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    data() {
        return {
            isBusy: false,
            form: this.getClearFormObject(),
            search: '',
            items: [],
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'id', sortable: true },
                { key: 'name', sortable: true },
                { key: 'phone_number', sortable: true },
                { key: 'address', sortable: true },
                { key: 'remark', sortable: true },
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
                .get(`/suppliers`)
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
        searchBy() {
            this.isBusy = true
            axios
                .get(`/suppliers/search/${this.search}`)
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
        getEditData() {
            // this.isLoading = true;
            if (this.id) {
                axios
                    .get(`/suppliers/${this.id}`)
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
                name: null,
                phone_number: null,
                address: null,
                remark: null,
            }
        },
        submit() {

            let method = 'post'
            let url = '/suppliers/add'

            if (this.id) {
                method = 'patch'
                url = `/suppliers/update/${this.id}`
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
        destroy() {
            this.$swal.fire({
                title: 'Are you sure to delete this?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`/suppliers/destroy/${this.id}`).then(r => {
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
        }
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
    
    