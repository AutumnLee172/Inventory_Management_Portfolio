"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Invoices_Invoices_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Invoices",
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
      items: [],
      file: null,
      displayimage: null,
      perPage: 10,
      currentPage: 1,
      fields: [{
        key: 'item_number',
        sortable: true
      }, {
        key: 'description',
        sortable: true
      }, {
        key: 'quantity',
        sortable: true
      }, {
        key: 'original_price',
        sortable: true
      }, {
        key: 'selling_price',
        sortable: true
      }, {
        key: 'Edit',
        sortable: false
      }]
    };
  },
  created: function created() {//this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/products").then(function (r) {
        if (r.data && r.data.data) {
          _this.items = r.data.data;
        }
      })["catch"](function (err) {
        // this.isLoading = false;
        _this.$bvToast.toast(err, {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    editForm: function editForm() {},
    getEditData: function getEditData() {
      var _this2 = this;

      // this.isLoading = true;
      if (this.id) {
        axios__WEBPACK_IMPORTED_MODULE_0___default().get("/products/".concat(this.id)).then(function (r) {
          // this.isLoading = false;
          if (r.data && r.data.data) {
            _this2.form = r.data.data;
          }
        })["catch"](function (err) {
          // this.isLoading = false;
          _this2.$bvToast.toast(err, {
            title: 'Error',
            autoHideDelay: 5000
          });
        });
      }
    },
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
    submit: function submit() {
      var _this3 = this;

      var method = 'post';
      var url = '/products/add';
      console.log(this.form);

      if (this.id) {
        method = 'patch';
        url = "/products/update/".concat(this.id);
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: method,
        url: url,
        data: this.form
      }).then(function (r) {
        if (!_this3.id && r.data.data.id) {
          _this3.$swal('Successfully Created');

          _this3.$bvModal.hide("modal-1");

          _this3.getData();
        } else {
          _this3.$swal('Successfully updated');

          _this3.$bvModal.hide("modal-1");

          _this3.getData();
        }
      })["catch"](function (e) {
        _this3.$swal('An error has ocured' + e);

        _this3.$bvModal.hide("modal-1");

        _this3.getData();
      });
    },
    destroy: function destroy() {
      var _this4 = this;

      this.$swal.fire({
        title: 'Are you sure to delete this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("/products/destroy/".concat(_this4.id)).then(function (r) {
            _this4.$swal('Successfully deleted');

            _this4.getData();
          })["catch"](function (e) {
            _this4.$swal('An error has ocured' + e);

            _this4.getData();
          });
        }
      });
    },
    clear: function clear() {
      this.id = null;
      this.form = this.getClearFormObject();
    },
    onChange: function onChange(e) {
      this.file = e.target.file[0];
    },
    upload: function upload(file) {
      var _this5 = this;

      var formData = new FormData();
      formData.append('file', this.file);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/products/upload/".concat(this.id), formData, config).then(function (r) {
        _this5.$swal('Successfully uploaded');

        _this5.$bvModal.hide("modal-2");

        _this5.getData();
      })["catch"](function (err) {
        _this5.$swal('An error has ocured' + err);

        _this5.$bvModal.hide("modal-2");

        _this5.getData();
      });
    }
  },
  watch: {
    id: function id(newValue) {
      this.form = this.getClearFormObject();

      if (newValue) {
        this.getEditData();
      }
    },
    file: function file(newValue) {
      if (newValue) {}
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Invoices/Invoices.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Invoices/Invoices.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=57019d00& */ "./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00&");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js& */ "./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__.render,
  _Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Invoices/Invoices.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_57019d00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=template&id=57019d00& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Invoices/Invoices.vue?vue&type=template&id=57019d00& ***!
  \************************************************************************************************************************************************************************************************************************/
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
        "router-link",
        { attrs: { to: "/invoices/new" } },
        [_c("b-button", [_vm._v("Add new")])],
        1
      ),
      _vm._v(" "),
      _vm._m(0),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card mb-4" }, [
      _c("div", { staticClass: "card-header" }, [
        _c("h2", [_vm._v("Invoices table")]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);