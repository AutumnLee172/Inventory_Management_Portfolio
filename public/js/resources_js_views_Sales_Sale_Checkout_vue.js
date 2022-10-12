"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sales_Sale_Checkout_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Sale_Checkout",
  props: {
    id: {
      "default": null
    }
  },
  computed: {
    rows: function rows() {
      return this.items.length;
    }
  },
  data: function data() {
    return {
      //form: this.getClearFormObject(),
      isLoading: false,
      customers: [],
      selectedCustomer: null,
      products: [],
      selectedProduct: null,
      form: this.getClearFormObject(),
      items: [{
        item_number: '',
        description: '',
        original_price: '',
        selling_price: '',
        quantity: '',
        sub_total: '',
        checked: '0'
      }],
      displayimage: null,
      perPage: 10,
      currentPage: 1
    };
  },
  created: function created() {
    this.fetchCustomer();
    this.fetchProducts();
    this.getClearFormObject();

    if (this.id) {
      this.getinvoiceData();
    }
  },
  methods: {
    fetchCustomer: function fetchCustomer() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/customers').then(function (r) {
        if (r.data && r.data.data) {
          _this.customers = r.data.data;
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    findCustomer: function findCustomer() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/customers/".concat(this.selectedCustomer)).then(function (r) {
        if (r.data && r.data.data) {
          _this2.form.customer_id = _this2.selectedCustomer;
          _this2.form.customer_name = r.data.data.name;
          _this2.form.phone_number = r.data.data.phone_number;
          _this2.form.address = r.data.data.address;
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this2.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    fetchProducts: function fetchProducts() {
      var _this3 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/products').then(function (r) {
        if (r.data && r.data.data) {
          _this3.products = r.data.data;
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this3.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    findItem: function findItem(itemNumber, index) {
      var _this4 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/products/find/".concat(itemNumber)).then(function (r) {
        if (r.data && r.data.data) {
          _this4.items.splice(index, 1, {
            item_number: itemNumber,
            description: r.data.data.description,
            original_price: r.data.data.original_price,
            selling_price: r.data.data.selling_price,
            quantity: 0,
            sub_total: 0,
            checked: product.checked
          });

          _this4.calculateTotal();
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this4.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    calculateSubtotal: function calculateSubtotal(index, product) {
      var sellingPrice = parseFloat(product.selling_price);
      var number = parseFloat(product.quantity);
      var subtotal = sellingPrice * number;
      this.items.splice(index, 1, {
        item_number: product.item_number,
        description: product.description,
        original_price: product.original_price,
        selling_price: product.selling_price,
        quantity: product.quantity,
        sub_total: subtotal,
        checked: product.checked
      });
      this.calculateTotal();
    },
    calculateTotal: function calculateTotal() {
      this.form.total = 0;
      this.form.net = 0;
      this.form.balance = 0;
      var itemsclone = this.items;
      var i = 0;

      for (i = 0; i < itemsclone.length; i++) {
        if (itemsclone[i].checked == "1") {
          this.form.total += parseFloat(itemsclone[i].sub_total);
        }
      }

      this.form.net = parseFloat(this.form.total) - parseFloat(this.form.discount);
      this.form.balance = parseFloat(this.form.net) - parseFloat(this.form.deposit);
    },
    getClearFormObject: function getClearFormObject() {
      return _defineProperty({
        customer_id: null,
        customer_name: null,
        phone_number: null,
        address: null,
        remark: null,
        cart: null,
        total: 0,
        discount: 0,
        net: 0,
        deposit: 0,
        balance: 0
      }, "remark", null);
    },
    submit: function submit() {
      var _this5 = this;

      this.calculateTotal();
      this.isLoading = true;
      var method = 'post';
      var url = '/sales/new';

      if (this.id) {
        url = "/sales/edit/".concat(this.id);
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: method,
        url: url,
        data: this.form
      }).then(function (r) {
        if (!_this5.id && r.data.data.id) {
          _this5.$swal('Successfully Created');
        } else {
          _this5.$swal('Successfully updated');
        }

        _this5.isLoading = false;

        _this5.$router.push('/sales');
      })["catch"](function (e) {
        _this5.$swal('An error has ocured' + e);

        _this5.isLoading = false;
      });
    },
    getinvoiceData: function getinvoiceData() {
      var _this6 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/sales/get/".concat(this.id)).then(function (r) {
        if (r.data && r.data.data) {
          _this6.form = r.data.data;
          _this6.selectedCustomer = _this6.form.customer_id;
          _this6.items = r.data.items;
          _this6.form.total = 0;
          _this6.form.discount = 0;
          _this6.form.net = 0;
          _this6.form.deposit = 0;
          _this6.form.balance = 0;
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this6.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    addtoCart: function addtoCart(index, product) {
      if (this.items[index].checked == 0) {
        this.items.splice(index, 1, {
          item_number: product.item_number,
          description: product.description,
          original_price: product.original_price,
          selling_price: product.selling_price,
          quantity: product.quantity,
          sub_total: product.subtotal,
          checked: 1
        });
      } else {
        this.items.splice(index, 1, {
          item_number: product.item_number,
          description: product.description,
          original_price: product.original_price,
          selling_price: product.selling_price,
          quantity: product.quantity,
          sub_total: product.subtotal,
          checked: 0
        });
      }
    }
  },
  watch: {
    selectedProduct: function selectedProduct() {},
    selectedCustomer: function selectedCustomer(newValue) {
      if (newValue) {
        this.findCustomer();
      }
    },
    items: {
      handler: function handler() {
        console.log(this.items);
        this.form.cart = this.items;
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Sales/Sale_Checkout.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Sales/Sale_Checkout.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sale_Checkout.vue?vue&type=template&id=d05d08a8& */ "./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8&");
/* harmony import */ var _Sale_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sale_Checkout.vue?vue&type=script&lang=js& */ "./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sale_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__.render,
  _Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sales/Sale_Checkout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sale_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sale_Checkout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sale_Checkout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sale_Checkout_vue_vue_type_template_id_d05d08a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Sale_Checkout.vue?vue&type=template&id=d05d08a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sales/Sale_Checkout.vue?vue&type=template&id=d05d08a8& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid py-4 px-4" }, [
    _c("div", { staticClass: "card mb-4" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c(
          "form",
          {
            on: {
              submit: function ($event) {
                $event.preventDefault()
                return _vm.submit.apply(null, arguments)
              },
            },
          },
          [
            _c("p", { staticClass: "text-uppercase text-sm" }, [
              _vm._v("Customer Information"),
            ]),
            _vm._v(" "),
            _c(
              "b-row",
              { staticClass: "px-1" },
              [
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Customer Name",
                          "label-for": "customer_id",
                        },
                      },
                      [
                        _c(
                          "b-form-select",
                          {
                            attrs: {
                              id: "customer_id",
                              name: "customer_id",
                              disabled: "",
                            },
                            model: {
                              value: _vm.selectedCustomer,
                              callback: function ($$v) {
                                _vm.selectedCustomer = $$v
                              },
                              expression: "selectedCustomer",
                            },
                          },
                          _vm._l(_vm.customers, function (customer, index) {
                            return _c(
                              "b-form-select-option",
                              {
                                key: index,
                                staticClass: "mb-2 mr-sm-2 mb-sm-0",
                                attrs: {
                                  value: customer.id,
                                  id: "Customer_id",
                                  name: "customer_id",
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(customer.name) +
                                    " "
                                ),
                              ]
                            )
                          }),
                          1
                        ),
                        _vm._v(" "),
                        _c("b-form-input", {
                          staticClass: "sr-only",
                          attrs: { id: "customer_name", name: "customer_name" },
                          model: {
                            value: _vm.form.customer_name,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "customer_name", $$v)
                            },
                            expression: "form.customer_name",
                          },
                        }),
                        _vm._v(" "),
                        _c("b-form-input", {
                          staticClass: "sr-only",
                          attrs: { id: "customer_id", name: "customer_id" },
                          model: {
                            value: _vm.form.customer_id,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "customer_id", $$v)
                            },
                            expression: "form.customer_id",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Phone Number",
                          "label-for": "phone_number",
                        },
                      },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "phone_number",
                            name: "phone_number",
                            readonly: "",
                          },
                          model: {
                            value: _vm.form.phone_number,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "phone_number", $$v)
                            },
                            expression: "form.phone_number",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Address", "label-for": "address" } },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "address",
                            name: "address",
                            readonly: "",
                          },
                          model: {
                            value: _vm.form.address,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "address", $$v)
                            },
                            expression: "form.address",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Remark", "label-for": "remark" } },
                      [
                        _c("b-form-input", {
                          attrs: { id: "remark", name: "remark" },
                          model: {
                            value: _vm.form.remark,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "remark", $$v)
                            },
                            expression: "form.remark",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c("hr", { staticClass: "horizontal dark" }),
            _vm._v(" "),
            _c("p", { staticClass: "text-uppercase text-sm" }, [
              _vm._v("Items Information"),
            ]),
            _vm._v(" "),
            _vm._l(_vm.items, function (item, index) {
              return _c(
                "b-row",
                { key: index, staticClass: "px-1" },
                [
                  _c(
                    "b-col",
                    { attrs: { md: "4" } },
                    [
                      _c(
                        "b-row",
                        { staticClass: "px-1" },
                        [
                          _c(
                            "b-col",
                            { attrs: { md: "1" } },
                            [
                              _c("b-form-checkbox", {
                                attrs: {
                                  type: "checkbox",
                                  size: "lg",
                                  value: "1",
                                  "unchecked-value": "0",
                                },
                                on: {
                                  change: function ($event) {
                                    return _vm.calculateSubtotal(index, item)
                                  },
                                },
                                model: {
                                  value: item.checked,
                                  callback: function ($$v) {
                                    _vm.$set(item, "checked", $$v)
                                  },
                                  expression: "item.checked",
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                {
                                  staticClass: "small-font",
                                  attrs: {
                                    label: "Item Number",
                                    "label-for": "item_number",
                                  },
                                },
                                [
                                  _c(
                                    "b-form-select",
                                    {
                                      attrs: {
                                        id: "item_number",
                                        disabled: "",
                                      },
                                      on: {
                                        change: function ($event) {
                                          return _vm.findItem(
                                            item.item_number,
                                            index
                                          )
                                        },
                                      },
                                      model: {
                                        value: item.item_number,
                                        callback: function ($$v) {
                                          _vm.$set(item, "item_number", $$v)
                                        },
                                        expression: "item.item_number",
                                      },
                                    },
                                    _vm._l(_vm.products, function (product, p) {
                                      return _c(
                                        "b-form-select-option",
                                        {
                                          key: p,
                                          staticClass: "mb-2 mr-sm-2 mb-sm-0",
                                          attrs: {
                                            value: product.item_number,
                                            id: "item_number",
                                            name: "item_number",
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                    " +
                                              _vm._s(product.item_number) +
                                              " "
                                          ),
                                        ]
                                      )
                                    }),
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "4" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "small-font",
                          attrs: {
                            label: "Description",
                            "label-for": "description",
                          },
                        },
                        [
                          _c("b-form-input", {
                            attrs: { id: "description", readonly: "" },
                            model: {
                              value: item.description,
                              callback: function ($$v) {
                                _vm.$set(item, "description", $$v)
                              },
                              expression: "item.description",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "1" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "small-font",
                          attrs: {
                            label: "Original $",
                            "label-for": "original_price",
                          },
                        },
                        [
                          _c("b-form-input", {
                            attrs: { id: "original_price", readonly: "" },
                            model: {
                              value: item.original_price,
                              callback: function ($$v) {
                                _vm.$set(item, "original_price", $$v)
                              },
                              expression: "item.original_price",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "1" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "small-font",
                          attrs: {
                            label: "Selling $",
                            "label-for": "selling_price",
                          },
                        },
                        [
                          _c("b-form-input", {
                            attrs: {
                              id: "selling_price",
                              type: "number",
                              step: "0.01",
                              readonly: "",
                            },
                            on: {
                              change: function ($event) {
                                return _vm.calculateSubtotal(index, item)
                              },
                            },
                            model: {
                              value: item.selling_price,
                              callback: function ($$v) {
                                _vm.$set(item, "selling_price", $$v)
                              },
                              expression: "item.selling_price",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "1" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "small-font",
                          attrs: { label: "Quantity", "label-for": "quantity" },
                        },
                        [
                          _c("b-form-input", {
                            attrs: {
                              id: "quantity",
                              type: "number",
                              readonly: "",
                            },
                            on: {
                              change: function ($event) {
                                return _vm.calculateSubtotal(index, item)
                              },
                            },
                            model: {
                              value: item.quantity,
                              callback: function ($$v) {
                                _vm.$set(item, "quantity", $$v)
                              },
                              expression: "item.quantity",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "1" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "small-font",
                          attrs: {
                            label: "Sub Total",
                            "label-for": "sub_total",
                          },
                        },
                        [
                          _c("b-form-input", {
                            attrs: { id: "sub_total", readonly: "" },
                            model: {
                              value: item.sub_total,
                              callback: function ($$v) {
                                _vm.$set(item, "sub_total", $$v)
                              },
                              expression: "item.sub_total",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              )
            }),
            _vm._v(" "),
            _c("hr", { staticClass: "horizontal dark" }),
            _vm._v(" "),
            _c("p", { staticClass: "text-uppercase text-sm" }, [
              _vm._v("Total"),
            ]),
            _vm._v(" "),
            _c(
              "b-row",
              { staticClass: "px-1" },
              [
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Total", "label-for": "total" } },
                      [
                        _c("b-form-input", {
                          attrs: { id: "total", name: "total", readonly: "" },
                          model: {
                            value: _vm.form.total,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "total", $$v)
                            },
                            expression: "form.total",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Discount", "label-for": "discount" } },
                      [
                        _c("b-form-input", {
                          attrs: { id: "discount", name: "discount" },
                          on: { change: _vm.calculateTotal },
                          model: {
                            value: _vm.form.discount,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "discount", $$v)
                            },
                            expression: "form.discount",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Net", "label-for": "net" } },
                      [
                        _c("b-form-input", {
                          attrs: { id: "net", name: "net", readonly: "" },
                          on: { change: _vm.calculateTotal },
                          model: {
                            value: _vm.form.net,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "net", $$v)
                            },
                            expression: "form.net",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Deposit", "label-for": "deposit" } },
                      [
                        _c("b-form-input", {
                          attrs: { id: "deposit", name: "deposit" },
                          on: { change: _vm.calculateTotal },
                          model: {
                            value: _vm.form.deposit,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "deposit", $$v)
                            },
                            expression: "form.deposit",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-col",
                  { attrs: { md: "6" } },
                  [
                    _c(
                      "b-form-group",
                      { attrs: { label: "Balance", "label-for": "balance" } },
                      [
                        _c("b-form-input", {
                          attrs: {
                            id: "balance",
                            name: "balance",
                            readonly: "",
                          },
                          on: { change: _vm.calculateTotal },
                          model: {
                            value: _vm.form.balance,
                            callback: function ($$v) {
                              _vm.$set(_vm.form, "balance", $$v)
                            },
                            expression: "form.balance",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "b-button",
              {
                staticClass: "float-right",
                attrs: {
                  type: "is-primary",
                  variant: "primary",
                  "native-type": "submit",
                },
              },
              [
                _vm.isLoading == true
                  ? _c(
                      "div",
                      [
                        _c("b-spinner", { attrs: { small: "", type: "grow" } }),
                        _vm._v(
                          "\n                        Loading...\n                    "
                        ),
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isLoading == false
                  ? _c("div", [
                      _vm._v(
                        "\n                        Submit\n                    "
                      ),
                    ])
                  : _vm._e(),
              ]
            ),
            _vm._v(" "),
            _c("b-form-input", {
              attrs: { id: "cart", name: "cart", readonly: "" },
              model: {
                value: _vm.form.cart,
                callback: function ($$v) {
                  _vm.$set(_vm.form, "cart", $$v)
                },
                expression: "form.cart",
              },
            }),
          ],
          2
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h2", [_vm._v("Check Out Sale")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);