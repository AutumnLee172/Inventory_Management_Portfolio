<template>
    <div class="container-fluid py-4 px-4">
        <router-link to="/Sales/new"><b-button>Add new</b-button></router-link>
        
        <div class="card mb-4">
            <div class="card-header">
                <h2>Sales Order table</h2>
            </div>
            <b-table class="table align-items-center mb-0" id="sales-table" :fields="fields" head-variant="light"
                :items="items" sort-by="id" sort-desc="true" responsive="sm" :per-page="perPage" :current-page="currentPage">
                <template #cell(Edit)="row">
                    <b-button variant="primary" v-b-modal.modal-1 @click="id=row.item.id">
                        <b-icon icon="pencil-square" font-scale="1"></b-icon>
                    </b-button>
                    <b-button variant="danger" @click="destroy(id=row.item.id)">
                        <b-icon icon="trash" font-scale="1"></b-icon>
                    </b-button>
                </template>
            </b-table>
        </div>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="sales-table">
        </b-pagination>
        
    </div>

</template>

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
            items: [],
            file: null,
            displayimage: null,
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'id', sortable: true },
                { key: 'customer_name', sortable: true },
                { key: 'total', sortable: true },
                { key: 'deposit', sortable: true },
                { key: 'transaction_id', sortable: true },                
                { key: 'created_at', sortable: true },
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
            axios
                .get(`/sales`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.items = r.data.data;
                    }
                })
                .catch((err) => {
                    // this.isLoading = false;
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
        destroy() {
            this.$swal.fire({
                title: 'Are you sure to delete this?',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`/products/destroy/${this.id}`).then(r => {
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
        onChange(e){
            this.file = e.target.file[0];
        },
        upload(file) {
            let formData = new FormData()
            formData.append('file', this.file)
            const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
            axios.post(`/products/upload/${this.id}`, formData, config).then(r => {
                this.$swal('Successfully uploaded');
                this.$bvModal.hide("modal-2");
                this.getData();
            }).catch(err => {
                    this.$swal('An error has ocured' + err);
                    this.$bvModal.hide("modal-2");
                    this.getData();
                })
        }
    },
    watch: {
        id(newValue) {
            this.form = this.getClearFormObject()
            if (newValue) {
                this.getEditData()
            }
        },
        file(newValue){
            if (newValue) {
              
            }
        }
    }
}

</script>
    
    