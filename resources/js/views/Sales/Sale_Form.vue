<template>
    <div class="container-fluid py-4 px-4">
        <div class="card mb-4">
            <div class="card-header">
                <h2>New Sales Order</h2>
            </div>
            <div class="card-body">
                <form @submit.prevent="submit">
                    <p class="text-uppercase text-sm">Customer Information</p>
                    <b-row class="px-1">
                        <b-col md="6">
                            <b-form-group label="Customer Name" label-for="customer_id">
                                <b-form-select id="customer_id" v-model="selectedCustomer" name="customer_id">
                                    <b-form-select-option v-for="(customer, index) in customers" :value="customer.id"
                                        id="Customer_id" name="customer_id" v-bind:key="index"
                                        class="mb-2 mr-sm-2 mb-sm-0">
                                        {{ customer.name }} </b-form-select-option>
                                </b-form-select>
                                <b-form-input class="sr-only" id="customer_name" v-model="form.customer_name"
                                    name="customer_name"></b-form-input>
                                    <b-form-input class="sr-only" id="customer_id" v-model="form.customer_id"
                                    name="customer_id"></b-form-input>
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
                        <b-col md="6">
                            <b-form-group label="Date" label-for="date">
                                <b-form-datepicker id="date" name="date" v-model="form.date" style="height:calc(1.5em + 0.75rem + 2px);" ></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hr class="horizontal dark">
                    <p class="text-uppercase text-sm">Items Information</p>
                    <b-row class="px-1" v-for="(item, index) in items" v-bind:key="index">
                        <b-col md="3">
                            <b-form-group label="Item Number" label-for="item_number" class="small-font">
                                <!-- <b-form-select id="item_number" v-model="item.item_number" :disabled="item.checked == '1'"
                                    @change="findItem(item.item_number, index)">
                                    <b-form-select-option v-for="(product, p) in products" :value="product.item_number"
                                        id="item_number" name="item_number" v-bind:key="p" class="mb-2 mr-sm-2 mb-sm-0">
                                        {{
                                        product.item_number }} </b-form-select-option>
                                </b-form-select> -->
                                <v-select style="font-size: 1rem;" @input="findItem(item.item_number, index)" id="item_number" name="item_number" v-model="item.item_number" label="item_number" :options="products"></v-select>
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group label="Description" label-for="description" class="small-font">
                                <b-form-input id="description" readonly v-model="item.description"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Original $" label-for="original_price" class="small-font">
                                <b-form-input id="original_price" readonly v-model="item.original_price"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Selling $" label-for="selling_price" class="small-font">
                                <b-form-input id="selling_price" v-model="item.selling_price" type="number" step="0.01" :disabled="item.checked == '1'"
                                    @change="calculateSubtotal(index, item)"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="1">
                            <b-form-group label="Quantity" label-for="quantity" class="small-font">
                                <b-form-input id="quantity" v-model="item.quantity" type="number" :disabled="item.checked == '1'"
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
                                <b-button id="remove_button" variant="danger" class="mx-auto" style="display: block;" :disabled="item.checked == '1'"
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
    name: "Sale_Form",
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
            isLoading: false,
            customers: [],
            selectedCustomer: null,
            products: [],
            selectedProduct: null,
            form: this.getClearFormObject(),
            items: [{ item_number: '', description: '', original_price: '', selling_price: '', quantity: '', sub_total: '', checked: '' }],
            displayimage: null,
            perPage: 10,
            currentPage: 1
        }
    },
    created() {
        this.fetchCustomer()
        this.fetchProducts()
        this.getClearFormObject()
        if(this.id){
            this.getinvoiceData()
        }
    },
    methods: {
        fetchCustomer() {
            axios
                .get('/customers')
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.customers = r.data.data;
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
        findCustomer() {
            axios
                .get(`/customers/${this.selectedCustomer}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.form.customer_id = this.selectedCustomer;
                        this.form.customer_name = r.data.data.name;
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
                item_number: '', description: '', original_price: '', selling_price: '', quantity: '', sub_total: '', checked: '0'
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
            this.items.splice(index, 1, { item_number: itemNumber.item_number, description: itemNumber.description, original_price: itemNumber.original_price, selling_price: itemNumber.selling_price, quantity: 0, sub_total: 0 })
            this.calculateTotal()
            // axios
            //     .get(`/products/find/${itemNumber}`)
            //     .then((r) => {
            //         if (r.data && r.data.data) {
            //             this.items.splice(index, 1, { item_number: itemNumber, description: r.data.data.description, original_price: r.data.data.original_price, selling_price: r.data.data.selling_price, quantity: 0, sub_total: 0, checked: '0' })
            //             this.calculateTotal()
            //         }
            //     })
            //     .catch((err) => {
            //         // this.isLoading = false;
            //         this.$bvToast.toast(err, {
            //             title: 'Error',
            //             autoHideDelay: 5000
            //         });
            //     });
        },
        calculateSubtotal(index, product) {
            var sellingPrice = parseFloat(product.selling_price)
            var number = parseFloat(product.quantity)
            var subtotal = sellingPrice * number
            var subtotal = subtotal.toFixed(2)
            this.items.splice(index, 1, { item_number: product.item_number, description: product.description, original_price: product.original_price, selling_price: product.selling_price, quantity: product.quantity, sub_total: subtotal, checked: '0' })
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
                customer_id: null,
                customer_name: null,
                phone_number: null,
                address: null,
                remark: null,
                date: null,
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
            let url = '/sales/new'

            if(this.id){
                url = `/sales/edit/${this.id}`
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
                this.$router.push('/sales') 
            }).catch(e => {
                this.$swal('An error has ocured' + e);
                this.isLoading = false;
            });
        },
        getinvoiceData(){
            axios
                .get(`/sales/get/${this.id}`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.form = r.data.data;
                        this.selectedCustomer = this.form.customer_id;
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
        selectedCustomer(newValue) {
            if (newValue) {
                this.findCustomer()
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
    
    