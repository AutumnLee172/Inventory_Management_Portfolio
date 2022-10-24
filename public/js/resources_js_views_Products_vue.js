"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Products_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Products",
  props: {
    id: {
      "default": null
    },
    base_url: {
      "default": window.location.origin
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
        sortable: true,
        tdClass: 'numberColumn'
      }, {
        key: 'original_price',
        sortable: true,
        tdClass: 'numberColumn'
      }, {
        key: 'selling_price',
        sortable: true,
        tdClass: 'numberColumn'
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
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/products").then(function (r) {
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
    searchBy: function searchBy() {
      var _this3 = this;
      this.isBusy = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/products/search/".concat(this.search)).then(function (r) {
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
      var _this4 = this;
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
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("/products/destroy/".concat(_this5.id)).then(function (r) {
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
    },
    onChange: function onChange(e) {
      this.file = e.target.file[0];
    },
    upload: function upload(file) {
      var _this6 = this;
      var formData = new FormData();
      formData.append('file', this.file);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post("/products/upload/".concat(this.id), formData, config).then(function (r) {
        _this6.$swal('Successfully uploaded');
        _this6.$bvModal.hide("modal-2");
        _this6.getData();
      })["catch"](function (err) {
        _this6.$swal('An error has ocured' + err);
        _this6.$bvModal.hide("modal-2");
        _this6.getData();
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
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
            rawName: "v-b-modal.modal-2",
            modifiers: {
              "modal-2": true
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
            icon: "image",
            "font-scale": "1"
          }
        })], 1), _vm._v(" "), _c("b-button", {
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
      key: "cell(item_number)",
      fn: function fn(row) {
        return [_c("b-img", {
          directives: [{
            name: "b-modal",
            rawName: "v-b-modal.modal-3",
            modifiers: {
              "modal-3": true
            }
          }],
          staticClass: "avatar avatar-sm me-3",
          attrs: {
            src: "/images/" + row.item.image,
            alt: "user1"
          },
          on: {
            click: function click($event) {
              _vm.displayimage = row.item.image;
            }
          }
        }), _vm._v(" " + _vm._s(row.item.item_number) + "\n            ")];
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
      prepend: "Item Number"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "item_number",
      name: "item_number",
      required: ""
    },
    model: {
      value: _vm.form.item_number,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "item_number", $$v);
      },
      expression: "form.item_number"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Description"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "description",
      name: "description",
      required: ""
    },
    model: {
      value: _vm.form.description,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "description", $$v);
      },
      expression: "form.description"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Stock Quantity"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "quantity",
      name: "quantity",
      required: ""
    },
    model: {
      value: _vm.form.quantity,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "quantity", $$v);
      },
      expression: "form.quantity"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Original Price"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "original_price",
      name: "original_price",
      required: ""
    },
    model: {
      value: _vm.form.original_price,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "original_price", $$v);
      },
      expression: "form.original_price"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-input-group", {
    staticClass: "mb-2 mr-sm-2 mb-sm-0",
    attrs: {
      prepend: "Selling Price"
    }
  }, [_c("b-form-input", {
    attrs: {
      type: "text",
      id: "selling_price",
      name: "selling_price",
      required: ""
    },
    model: {
      value: _vm.form.selling_price,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "selling_price", $$v);
      },
      expression: "form.selling_price"
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("b-button", {
    attrs: {
      type: "is-primary",
      "native-type": "submit",
      variant: "primary"
    }
  }, [_vm._v("Submit")])], 1)]), _vm._v(" "), _c("b-modal", {
    attrs: {
      id: "modal-2",
      title: "Upload Image",
      "hide-footer": "",
      size: "lg"
    }
  }, [_c("form", {
    attrs: {
      enctype: "multipart/form-data"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.upload.apply(null, arguments);
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
  }), _vm._v(" "), _c("b-form-group", {
    attrs: {
      label: "Image  ",
      "label-cols-sm": "2"
    }
  }, [_c("b-form-file", {
    attrs: {
      id: "image",
      name: "image",
      placeholder: "Choose a file or drop it here..."
    },
    model: {
      value: _vm.file,
      callback: function callback($$v) {
        _vm.file = $$v;
      },
      expression: "file"
    }
  })], 1), _vm._v(" "), _c("b-button", {
    attrs: {
      type: "is-primary",
      "native-type": "submit",
      variant: "primary"
    }
  }, [_vm._v("Submit")])], 1)]), _vm._v(" "), _c("b-modal", {
    attrs: {
      id: "modal-3",
      "hide-footer": "",
      size: "lg"
    }
  }, [_c("b-img", {
    attrs: {
      src: "/images/" + _vm.displayimage,
      fluid: "",
      alt: "No image available"
    }
  })], 1)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-header"
  }, [_c("h2", [_vm._v("Products table")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/Products.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/Products.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Products.vue?vue&type=template&id=eec6f8fa& */ "./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa&");
/* harmony import */ var _Products_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Products.vue?vue&type=script&lang=js& */ "./resources/js/views/Products.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Products_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__.render,
  _Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Products.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Products.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/views/Products.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Products_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Products.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Products_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Products_vue_vue_type_template_id_eec6f8fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Products.vue?vue&type=template&id=eec6f8fa& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Products.vue?vue&type=template&id=eec6f8fa&");


/***/ })

}]);