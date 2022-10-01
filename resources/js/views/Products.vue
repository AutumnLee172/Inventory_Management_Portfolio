<template>
    <div class="container-fluid py-4 px-4">

        <b-button @click="clear()" v-b-modal.modal-1>Add new</b-button>
        <div class="card mb-4">
            <div class="card-header">
                <h2>Products table</h2>
            </div>
            <b-table class="table align-items-center mb-0" id="merchant-table" :fields="fields" head-variant="light"
                :items="items" sort-by="id" responsive="sm" :per-page="perPage" :current-page="currentPage">
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
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="merchant-table">
        </b-pagination>
        <b-modal id="modal-1" title="Merchant Management" hide-footer size="lg">

            <form @submit.prevent="submit">

                <b-form-input class="sr-only" id="id" :value="id" type="text" v-model="form.id" readonly>
                </b-form-input>


                <b-input-group prepend="Item Number" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="item_number" name="item_number" v-model="form.item_number">
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Description" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="description" name="description" v-model="form.description">
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Stock Quantity" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="quantity" name="quantity" v-model="form.quantity">
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Original Price" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="original_price" name="original_price" v-model="form.original_price">
                    </b-form-input>
                </b-input-group>
                <br />
                <b-input-group prepend="Selling Price" class="mb-2 mr-sm-2 mb-sm-0">
                    <b-form-input type="text" id="selling_price" name="selling_price" v-model="form.selling_price">
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
    name: "Products",
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

            form: this.getClearFormObject(),
            items: [],
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'id', sortable: true },
                { key: 'item_number', sortable: true },
                { key: 'description', sortable: true },
                { key: 'quantity', sortable: true },
                { key: 'original_price', sortable: true },
                { key: 'selling_price', sortable: true },
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
                .get(`/products`)
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
            }
        },
        submit() {

            let method = 'post'
            let url = '/products/add'

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
        }
    },
    watch: {
        id(newValue) {
            this.form = this.getClearFormObject()
            if (newValue) {
                this.getEditData()
            }
        }
    }
}

</script>
    
    