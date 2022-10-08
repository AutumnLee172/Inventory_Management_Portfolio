<template>
    <div class="container-fluid py-4 px-4">


        <div class="card mb-4">
            <div class="card-header">
                <h2>Profile</h2>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-body">
                <form @submit.prevent="submit">
                    <p class="text-uppercase text-sm">Information</p>
                    <b-row class="px-1">
                        <b-col md="6">
                            <b-form-group label="Username" label-for="username">
                                <b-form-input id="username" v-model="form.username" name="username" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Email" label-for="email">
                                <b-form-input id="email" v-model="form.email" name="email" readonly>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Password" label-for="password">
                                <b-form-input type="password" id="password" v-model="form.password" name="password" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col md="6">
                            <b-form-group label="Confirm Password" label-for="confirm_password">
                                <b-form-input type="password" id="confirm_password" name="confirm_password" :state="PasswordMatching"
                                    aria-describedby="input-live-help input-live-feedback" v-model="confirmPassword" required></b-form-input>
                                <b-form-invalid-feedback id="input-live-feedback">
                                    Password does not match / Password requires at least 8 characters
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <hr class="horizontal dark">
                    <b-button type="is-primary" variant="primary" native-type="submit" class="float-right">
                        Save
                    </b-button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: "Profile",
    data() {
        return {
            form: this.getClearFormObject(),
            confirmPassword: "",
        }
    },
    computed: {
        PasswordMatching() {
        return this.confirmPassword.length > 7 && this.form.password == this.confirmPassword
      }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            axios
                .get(`/profile`)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.form = r.data.data;
                        this.confirmPassword = ""
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
        getClearFormObject() {
            return {
                username: null,
                email: null,
                password: null,
            }
        },
        submit() {
            if (this.validation == false) {
                return;
            }
            axios
                .post(`/profile/update`, this.form)
                .then((r) => {
                    if (r.data && r.data.data) {
                        this.$swal('Successfully Saved');
                        this.getData();
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
    }

}
</script>