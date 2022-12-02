<template>
    <div class="container-fluid py-4 px-4">
        <div class="card mb-4">
            <div class="card-header">
                <h2>New Receive Order</h2>
            </div>
            <div class="card-body">
                <form @submit.prevent="submit">
                    <p class="text-uppercase text-sm">Supplier Information</p>
                    <b-row class="px-1">
                        <b-col md="6">
                            <b-form-group label="Supplier Name" label-for="supplier_id">
                                <b-form-select id="supplier_id" v-model="selectedSupplier" name="supplier_id">
                                    <b-form-select-option v-for="(supplier, index) in suppliers" :value="supplier.id"
                                        id="Supplier_id" name="supplier_id" v-bind:key="index"
                                        class="mb-2 mr-sm-2 mb-sm-0">
                                        {{ supplier.name }} </b-form-select-option>
                                </b-form-select>
                                <b-form-input class="sr-only" id="supplier_name" v-model="form.supplier_name"
                                    name="supplier_name"></b-form-input>
                                    <b-form-input class="sr-only" id="supplier_id" v-model="form.supplier_id"
                                    name="supplier_id"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Phone Number" label-for="phone_number">
                                <b-form-input id="phone_number" v-model="form.phone_number" name="phone_number">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Address" label-for="address">
                                <b-form-input id="address" v-model="form.address" name="address"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Remark" label-for="remark">
                                <b-form-input id="remark" name="remark" v-model="form.remark"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hr class="horizontal dark">
                    <p class="text-uppercase text-sm">Items Information</p>
                    <b-row class="px-1" v-for="(item, index) in items" v-bind:key="index">
                        <b-col md="4">
                            <b-form-group label="Item Number" label-for="item_number" class="small-font">
                                <b-form-select id="item_number" v-model="item.item_number"
                                    @change="findItem(item.item_number, index)">
                                    <b-form-select-option v-for="(product, p) in products" :value="product.item_number"
                                        id="item_number" name="item_number" v-bind:key="p" class="mb-2 mr-sm-2 mb-sm-0">
                                        {{
                                        product.item_number }} </b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group label="Description" label-for="description" class="small-font">
                                <b-form-input id="description" readonly v-model="item.description"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Price" label-for="original_price" class="small-font">
                                <b-form-input id="original_price" v-model="item.original_price" @change="calculateSubtotal(index, item)"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <!-- <b-col md="1">
                            <b-form-group label="Selling $" label-for="selling_price" class="small-font">
                                <b-form-input id="selling_price" v-model="item.selling_price" type="number" step="0.01"
                                    @change="calculateSubtotal(index, item)"></b-form-input>
                            </b-form-group>
                        </b-col> -->
                        <b-col md="1">
                            <b-form-group label="Quantity" label-for="quantity" class="small-font">
                                <b-form-input id="quantity" v-model="item.quantity" type="number"
                                    @change="calculateSubtotal(index, item)"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Sub Total" label-for="sub_total" class="small-font">
                                <b-form-input id="sub_total" v-model="item.sub_total" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Remove" label-for="remove_button" class="text-center small-font">
                                <b-button id="remove_button" variant="danger" class="mx-auto" style="display: block;"
                                    @click="removeItem(index)">
                                    <b-icon icon="x-circle" font-scale="1"></b-icon>
                                </b-button>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="px-3">

                        <b-button variant="primary" @click="addItem">
                            <b-icon icon="plus-circle" font-scale="1"></b-icon>
                        </b-button>
                    </b-row>
                    <hr class="horizontal dark">
                    <p class="text-uppercase text-sm">Total</p>
                    <b-row class="px-1">
                        <b-col md="6">
                            <b-form-group label="Total" label-for="total">
                                <b-form-input id="total" v-model="form.total" name="total" readonly></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Discount" label-for="discount">
                                <b-form-input id="discount" v-model="form.discount" name="discount"
                                    @change="calculateTotal"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Net" label-for="net">
                                <b-form-input id="net" v-model="form.net" name="net" readonly @change="calculateTotal">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Deposit" label-for="deposit">
                                <b-form-input id="deposit" v-model="form.deposit" name="deposit"
                                    @change="calculateTotal"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Balance" label-for="balance">
                                <b-form-input id="balance" v-model="form.balance" name="balance" readonly
                                    @change="calculateTotal">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button type="is-primary" variant="primary" native-type="submit" class="float-right">
                        <div v-if="isLoading == true">
                            <b-spinner small type="grow"></b-spinner>
                            Loading...
                        </div>
                        <div v-if="isLoading == false">
                            Submit
                        </div>
                    </b-button>

                    <b-form-input id="cart" v-model="form.cart" name="cart" class="sr-only" readonly>
                    </b-form-input>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: "Receive_Form",
    props: {
        id: {
            default: null
        }
    },
    computed: {
    },
    data() {
        return {
            isLoading: false,
            suppliers: [],
            selectedSupplier: null,
            products: [],
            selectedProduct: null,
            form: this.getClearFormObject(),
            items: [{ item_number: '', description: '', original_price: '', quantity: '', sub_total: '' }],
            displayimage: null,
            perPage: 10,
            currentPage: 1,
            fields: [
                { key: 'item_number', sortable: true },
                { key: 'description', sortable: true },
                { key: 'quantity', sortable: true },
                { key: 'original_price', sortable: true },
                { key: 'Edit', sortable: false }
            ]
        }
    },
    created() {
        this.fetchCustomer()
        this.fetchProducts()
        this.getClearFormObject()
        if(this.id){
            this.getOrderData()
        }
    },
    methods: {
        fetchCustomer() {
            axios
                .get('/suppliers')
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.suppliers = r.data.data;
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
        findSupplier() {
            axios
                .get(`/suppliers/${this.selectedSupplier}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.form.supplier_id = this.selectedSupplier;
                        this.form.supplier_name = r.data.data.name;
                        this.form.phone_number = r.data.data.phone_number;
                        this.form.address = r.data.data.address;
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
        addItem() {
            this.items.push({
                item_number: '', description: '', original_price: '', quantity: '', sub_total: ''
            })
        },
        removeItem(index) {
            this.items.splice(index, 1)
            this.calculateTotal()
        },
        fetchProducts() {
            axios
                .get('/products')
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.products = r.data.data;
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
        findItem(itemNumber, index) {

            axios
                .get(`/products/find/${itemNumber}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.items.splice(index, 1, { item_number: itemNumber, description: r.data.data.description, original_price: r.data.data.original_price, quantity: 0, sub_total: 0 })
                        this.calculateTotal()
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
        calculateSubtotal(index, product) {            
            var price = parseFloat(product.original_price)
            var number = parseFloat(product.quantity)
            var subtotal = price * number
            this.items.splice(index, 1, { item_number: product.item_number, description: product.description, original_price: product.original_price, quantity: product.quantity, sub_total: subtotal })
            this.calculateTotal()
        },
        calculateTotal() {
            this.form.total = 0
            this.form.net = 0
            this.form.balance = 0
            const itemsclone = this.items
            var i = 0
            for (i = 0; i < itemsclone.length; i++) {
                this.form.total += parseFloat(itemsclone[i].sub_total)
            }
            this.form.net = parseFloat(this.form.total) - parseFloat(this.form.discount)
            this.form.balance = parseFloat(this.form.net) - parseFloat(this.form.deposit)
        },
        getClearFormObject() {
            return {
                supplier_id: null,
                supplier_name: null,
                phone_number: null,
                address: null,
                remark: null,
                cart: null,
                total: 0,
                discount: 0,
                net: 0,
                deposit: 0,
                balance: 0,
                remark: null,
            }
        },
        submit() {
            this.calculateTotal()
            this.isLoading = true
            let method = 'post'
            let url = '/receives/new'

            if(this.id){
                url = `/receives/edit/${this.id}`
            }
            axios({
                method,
                url,
                data: this.form
            }).then(r => {
                if (!this.id && r.data.data.id) {
                    this.$swal('Successfully Created');
                }else {
                    this.$swal('Successfully updated');
                }
                this.isLoading = false;
                this.$router.push('/receives') 
            }).catch(e => {
                this.$swal('An error has ocured' + e);
                this.isLoading = false;
            });

        },
        getOrderData(){
            axios
                .get(`/receives/get/${this.id}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.form = r.data.data;
                        this.selectedSupplier = this.form.supplier_id;
                        this.items = r.data.items;
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
    watch: {
        selectedProduct() {

        },
        selectedSupplier(newValue) {
            if (newValue) {
                this.findSupplier()
            }
        },
        items: {
            handler: function () {
                this.form.cart = this.items
            },
            deep: true
        }
    }
}

</script>
    
    