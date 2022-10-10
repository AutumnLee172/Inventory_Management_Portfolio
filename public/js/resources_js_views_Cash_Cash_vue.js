"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Cash_Cash_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
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
  name: "Cash",
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
      isBusy: false,
      search: '',
      items: [],
      displayimage: null,
      perPage: 10,
      currentPage: 1,
      fields: [{
        key: 'transaction_id',
        sortable: true
      }, {
        key: 'customer_name',
        sortable: true
      }, {
        key: 'total',
        sortable: true
      }, {
        key: 'deposit',
        sortable: true
      }, {
        key: 'created_date',
        sortable: true
      }, {
        key: 'status',
        sortable: true
      }, {
        key: 'Edit',
        sortable: false
      }]
    };
  },
  created: function created() {
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;

      this.isBusy = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/cash").then(function (r) {
        if (r.data && r.data.data) {
          _this.isBusy = false;
          _this.items = r.data.data;
        }
      })["catch"](function (err) {
        _this.isBusy = false;

        _this.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    editForm: function editForm() {},
    getClearFormObject: function getClearFormObject() {
      return {
        id: null,
        item_number: null,
        description: null,
        quantity: null,
        original_price: null,
        selling_price: null,
        file: null
      };
    },
    destroy: function destroy($id) {
      var _this2 = this;

      this.$swal.fire({
        title: 'Are you sure to delete this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("/cash/destroy/".concat($id)).then(function (r) {
            _this2.$swal('Successfully deleted');

            _this2.getData();
          })["catch"](function (e) {
            _this2.$swal('An error has ocured' + e);

            _this2.getData();
          });
        }
      });
    },
    clear: function clear() {
      this.id = null;
      this.form = this.getClearFormObject();
    },
    generatePDF: function generatePDF($id) {
      window.location.href = "/cash/createPDF/".concat($id);
    },
    searchBy: function searchBy() {
      var _this3 = this;

      this.isBusy = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/cash/search/".concat(this.search)).then(function (r) {
        if (r.data && r.data.data) {
          _this3.isBusy = false;
          _this3.items = r.data.data;
        }
      })["catch"](function (err) {
        _this3.isBusy = false;

        _this3.$bvToast.toast("Error: ", {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    }
  },
  watch: {
    search: function search(newValue) {
      if (newValue == "" || newValue == null) {
        this.getData();
      } else if (newValue) {
        this.searchBy();
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Cash/Cash.vue":
/*!******************************************!*\
  !*** ./resources/js/views/Cash/Cash.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cash.vue?vue&type=template&id=c15121c0& */ "./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0&");
/* harmony import */ var _Cash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cash.vue?vue&type=script&lang=js& */ "./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Cash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Cash/Cash.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Cash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Cash.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Cash_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cash_vue_vue_type_template_id_c15121c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Cash.vue?vue&type=template&id=c15121c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Cash/Cash.vue?vue&type=template&id=c15121c0& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "container-fluid py-4 px-4" },
    [
      _c(
        "b-row",
        { staticClass: "my-1" },
        [
          _c(
            "b-col",
            { attrs: { sm: "2" } },
            [
              _c(
                "router-link",
                { attrs: { to: "/Cash/new" } },
                [_c("b-button", [_vm._v("Add new")])],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c("b-col", { attrs: { sm: "7" } }),
          _vm._v(" "),
          _c(
            "b-col",
            { attrs: { sm: "3" } },
            [
              _c("b-form-input", {
                attrs: { placeholder: "Search" },
                model: {
                  value: _vm.search,
                  callback: function ($$v) {
                    _vm.search = $$v
                  },
                  expression: "search",
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
        "div",
        { staticClass: "card mb-4" },
        [
          _vm._m(0),
          _vm._v(" "),
          _c("b-table", {
            staticClass: "table align-items-center mb-0",
            attrs: {
              busy: _vm.isBusy,
              id: "sales-table",
              fields: _vm.fields,
              "head-variant": "light",
              items: _vm.items,
              "sort-by": "transaction_id",
              "sort-desc": true,
              responsive: "sm",
              "per-page": _vm.perPage,
              "current-page": _vm.currentPage,
            },
            scopedSlots: _vm._u([
              {
                key: "cell(Edit)",
                fn: function (row) {
                  return [
                    _c(
                      "b-button",
                      {
                        attrs: { variant: "info" },
                        on: {
                          click: function ($event) {
                            return _vm.generatePDF(row.item.id)
                          },
                        },
                      },
                      [
                        _c("b-icon", {
                          attrs: {
                            icon: "file-earmark-arrow-down",
                            "font-scale": "1",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      {
                        attrs: {
                          to: {
                            name: "cash.edit",
                            params: { id: row.item.id },
                          },
                        },
                      },
                      [
                        _c(
                          "b-button",
                          { attrs: { variant: "primary" } },
                          [
                            _c("b-icon", {
                              attrs: {
                                icon: "pencil-square",
                                "font-scale": "1",
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
                      "b-button",
                      {
                        attrs: { variant: "danger" },
                        on: {
                          click: function ($event) {
                            return _vm.destroy((_vm.id = row.item.id))
                          },
                        },
                      },
                      [
                        _c("b-icon", {
                          attrs: { icon: "trash", "font-scale": "1" },
                        }),
                      ],
                      1
                    ),
                  ]
                },
              },
              {
                key: "table-busy",
                fn: function () {
                  return [
                    _c(
                      "div",
                      { staticClass: "text-center text-danger my-2" },
                      [
                        _c("b-spinner", {
                          staticClass: "align-middle",
                          attrs: { variant: "primary" },
                        }),
                      ],
                      1
                    ),
                  ]
                },
                proxy: true,
              },
            ]),
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c("b-pagination", {
        attrs: {
          "total-rows": _vm.rows,
          "per-page": _vm.perPage,
          "aria-controls": "sales-table",
        },
        model: {
          value: _vm.currentPage,
          callback: function ($$v) {
            _vm.currentPage = $$v
          },
          expression: "currentPage",
        },
      }),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h2", [_vm._v("Cash Sales table")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);