"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Suppliers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Suppliers",
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
      form: this.getClearFormObject(),
      search: '',
      items: [],
      perPage: 10,
      currentPage: 1,
      fields: [{
        key: 'id',
        sortable: true
      }, {
        key: 'name',
        sortable: true
      }, {
        key: 'phone_number',
        sortable: true
      }, {
        key: 'address',
        sortable: true
      }, {
        key: 'remark',
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
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/suppliers").then(function (r) {
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
    searchBy: function searchBy() {
      var _this2 = this;
      this.isBusy = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/suppliers/search/".concat(this.search)).then(function (r) {
        if (r.data && r.data.data) {
          _this2.isBusy = false;
          _this2.items = r.data.data;
        }
      })["catch"](function (err) {
        _this2.isBusy = false;
        _this2.$bvToast.toast("Error: ", {
          title: 'Error',
          autoHideDelay: 5000
        });
      });
    },
    getEditData: function getEditData() {
      var _this3 = this;
      // this.isLoading = true;
      if (this.id) {
        axios__WEBPACK_IMPORTED_MODULE_0___default().get("/suppliers/".concat(this.id)).then(function (r) {
          // this.isLoading = false;
          if (r.data && r.data.data) {
            _this3.form = r.data.data;
          }
        })["catch"](function (err) {
          // this.isLoading = false;
          _this3.$bvToast.toast(err, {
            title: 'Error',
            autoHideDelay: 5000
          });
        });
      }
    },
    getClearFormObject: function getClearFormObject() {
      return {
        id: null,
        name: null,
        phone_number: null,
        address: null,
        remark: null
      };
    },
    submit: function submit() {
      var _this4 = this;
      var method = 'post';
      var url = '/suppliers/add';
      if (this.id) {
        method = 'patch';
        url = "/suppliers/update/".concat(this.id);
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: method,
        url: url,
        data: this.form
      }).then(function (r) {
        if (!_this4.id && r.data.data.id) {
          _this4.$swal('Successfully Created');
          _this4.$bvModal.hide("modal-1");
          _this4.getData();
        } else {
          _this4.$swal('Successfully updated');
          _this4.$bvModal.hide("modal-1");
          _this4.getData();
        }
      })["catch"](function (e) {
        _this4.$swal('An error has ocured' + e);
        _this4.$bvModal.hide("modal-1");
        _this4.getData();
      });
    },
    destroy: function destroy() {
      var _this5 = this;
      this.$swal.fire({
        title: 'Are you sure to delete this?',
        showCancelButton: true,
        confirmButtonText: 'Confirm'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("/suppliers/destroy/".concat(_this5.id)).then(function (r) {
            _this5.$swal('Successfully deleted');
            _this5.getData();
          })["catch"](function (e) {
            _this5.$swal('An error has ocured' + e);
            _this5.getData();
          });
        }
      });
    },
    clear: function clear() {
      this.id = null;
      this.form = this.getClearFormObject();
    }
  },
  watch: {
    id: function id(newValue) {
      this.form = this.getClearFormObject();
      if (newValue) {
        this.getEditData();
      }
    },
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "container-fluid py-4 px-4"
  }, [_c("b-row", {
    staticClass: "my-1"
  }, [_c("b-col", {
    attrs: {
      sm: "2"
    }
  }, [_c("b-button", {
    directives: [{
      name: "b-modal",
      rawName: "v-b-modal.modal-1",
      modifiers: {
        "modal-1": true
      }
    }],
    on: {
      click: function click($event) {
        return _vm.clear();
      }
    }
  }, [_vm._v("Add new")])], 1), _vm._v(" "), _c("b-col", {
    attrs: {
      sm: "7"
    }
  }), _vm._v(" "), _c("b-col", {
    attrs: {
      sm: "3"
    }
  }, [_c("b-form-input", {
    attrs: {
      placeholder: "Search"
    },
    model: {
      value: _vm.search,
      callback: function callback($$v) {
        _vm.search = $$v;
      },
      expression: "search"
    }
  })], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "card mb-4"
  }, [_vm._m(0), _vm._v(" "), _c("b-table", {
    staticClass: "table align-items-center mb-0",
    attrs: {
      busy: _vm.isBusy,
      id: "merchant-table",
      fields: _vm.fields,
      "head-variant": "light",
      items: _vm.items,
      "sort-by": "id",
      responsive: "sm",
      "per-page": _vm.perPage,
      "current-page": _vm.currentPage
    },
    scopedSlots: _vm._u([{
      key: "cell(Edit)",
      fn: function fn(row) {
        return [_c("b-button", {
          directives: [{
            name: "b-modal",
            rawName: "v-b-modal.modal-1",
            modifiers: {
              "modal-1": true
            }
          }],
          attrs: {
            variant: "primary"
          },
          on: {
            click: function click($event) {
              _vm.id = row.item.id;
            }
          }
        }, [_c("b-icon", {
          attrs: {
            icon: "pencil-square",
            "font-scale": "1"
          }
        })], 1), _vm._v(" "), _c("b-button", {
          attrs: {
            variant: "danger"
          },
          on: {
            click: function click($event) {
              return _vm.destroy(_vm.id = row.item.id);
            }
          }
        }, [_c("b-icon", {
          attrs: {
            icon: "trash",
            "font-scale": "1"
          }
        })], 1)];
      }
    }, {
      key: "table-busy",
      fn: function fn() {
        return [_c("div", {
          staticClass: "text-center text-danger my-2"
        }, [_c("b-spinner", {
          staticClass: "align-middle",
          attrs: {
            variant: "primary"
          }
        })], 1)];
      },
      proxy: true
    }])
  })], 1), _vm._v(" "), _c("b-pagination", {
    attrs: {
      "total-rows": _vm.rows,
      "per-page": _vm.perPage,
      "aria-controls": "merchant-table"
    },
    model: {
      value: _vm.currentPage,
      callback: function callback($$v) {
        _vm.currentPage = $$v;
      },
      expression: "currentPage"
    }
  }), _vm._v(" "), _c("b-modal", {
    attrs: {
      id: "modal-1",
      title: "Merchant Management",
      "hide-footer": "",
      size: "lg"
    }
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submit.apply(null, arguments);
      }
    }
  }, [_c("b-form-input", {
    staticClass: "sr-only",
    attrs: {
      id: "id",
      value: _vm.id,
      type: "text",
      readonly: ""
    },
    model: {
      value: _vm.form.id,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "id", $$v);
      },
      expression: "form.id"
    }
  }), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Customer Name"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "name",
      name: "name",
      required: ""
    },
    model: {
      value: _vm.form.name,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "name", $$v);
      },
      expression: "form.name"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Phone Number"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "phone_number",
      name: "phone_number",
      required: ""
    },
    model: {
      value: _vm.form.phone_number,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "phone_number", $$v);
      },
      expression: "form.phone_number"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Address"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "address",
      name: "address",
      required: ""
    },
    model: {
      value: _vm.form.address,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "address", $$v);
      },
      expression: "form.address"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Remark"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "remark",
      name: "remark",
      required: ""
    },
    model: {
      value: _vm.form.remark,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "remark", $$v);
      },
      expression: "form.remark"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-button", {
    attrs: {
      type: "is-primary",
      "native-type": "submit",
      variant: "primary"
    }
  }, [_vm._v("Submit")])], 1)])], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-header"
  }, [_c("h2", [_vm._v("Suppliers table")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/Suppliers.vue":
/*!******************************************!*\
  !*** ./resources/js/views/Suppliers.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Suppliers.vue?vue&type=template&id=d17f32d0& */ "./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0&");
/* harmony import */ var _Suppliers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Suppliers.vue?vue&type=script&lang=js& */ "./resources/js/views/Suppliers.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Suppliers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Suppliers.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Suppliers.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/views/Suppliers.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Suppliers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Suppliers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Suppliers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Suppliers_vue_vue_type_template_id_d17f32d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Suppliers.vue?vue&type=template&id=d17f32d0& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Suppliers.vue?vue&type=template&id=d17f32d0&");


/***/ })

}]);