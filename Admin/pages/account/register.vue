<script>
import {
    required,
    email
} from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
    name: "account-register",
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: ""
            },
            submitted: false,
            regError: null,
            tryingToRegister: false,
            isRegisterError: false,
            registerSuccess: false,
        };
    },
    layout: "auth",
    computed: {
        notification() {
            return this.$store ? this.$store.state.notification : null;
        },
        notificationAutoCloseDuration() {
            return this.$store && this.$store.state.notification ? 5 : 0;
        },
    },
    validations: {
        user: {
            username: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required
            },
        },
    },
    created() {},
    methods: {
        // Try to register the user in with the email, username
        // and password they provided.
        tryToRegisterIn() {
            this.submitted = true;
            // stop here if form is invalid
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            } else {
                if (process.env.auth === "firebase") {
                    this.tryingToRegister = true;
                    // Reset the regError if it existed.
                    this.regError = null;
                    return (
                        this.$store
                        .dispatch("auth/register", {
                            email: this.user.email,
                            password: this.user.password,
                        })
                        // eslint-disable-next-line no-unused-vars
                        .then((token) => {
                            this.tryingToRegister = false;
                            this.isRegisterError = false;
                            this.registerSuccess = true;
                            if (this.registerSuccess) {
                                this.$router.push(
                                    this.$route.query.redirectFrom || {
                                        path: "/"
                                    }
                                );
                            }
                        })
                        .catch((error) => {
                            this.tryingToRegister = false;
                            this.regError = error ? error : "";
                            this.isRegisterError = true;
                        })
                    );
                } else if (process.env.auth === "fakebackend") {
                    const {
                        email,
                        username,
                        password
                    } = this.user;
                    if (email && username && password) {
                        this.$store.dispatch("authfack/registeruser", this.user);
                        this.$store.dispatch('notification/clear')
                    }
                }
            }
        },
    },
};
</script>

<template>
<div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
            <div class="card-body p-4">
                <div class="text-center w-75 m-auto">
                    <div class="auth-logo">
                        <nuxt-link to="/" class="logo logo-dark text-center">
                            <span class="logo-lg">
                                <img src="~/assets/images/logo-dark.png" alt height="22" />
                            </span>
                        </nuxt-link>

                        <nuxt-link to="/" class="logo logo-light text-center">
                            <span class="logo-lg">
                                <img src="~/assets/images/logo-light.png" alt height="22" />
                            </span>
                        </nuxt-link>
                    </div>
                    <p class="text-muted mb-4 mt-3">Don't have an account? Create your own account, it takes less than a minute</p>
                </div>

                <form action="#" @submit.prevent="tryToRegisterIn">
                    <b-alert v-model="registerSuccess" class="mt-3" variant="success" dismissible>Registration successfull.</b-alert>

                    <b-alert v-model="isRegisterError" class="mt-3" variant="danger" dismissible :show="notificationAutoCloseDuration">{{regError}}</b-alert>

                    <b-alert :variant="notification.type" class="mt-3" v-if="notification.message" :show="notificationAutoCloseDuration" dismissible>{{notification.message}}</b-alert>

                    <div class="form-group">
                        <label for="fullname">Username</label>
                        <input class="form-control" v-model="user.username" type="text" id="fullname" placeholder="Enter your name" :class="{ 'is-invalid': submitted && $v.user.username.$error }" />
                        <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">Username is required.</div>
                    </div>
                    <div class="form-group">
                        <label for="emailaddress">Email address</label>
                        <input class="form-control" v-model="user.email" type="email" id="emailaddress" :class="{ 'is-invalid': submitted && $v.user.email.$error }" placeholder="Enter your email" />
                        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                            <span v-if="!$v.user.email.required">Email is required.</span>
                            <span v-if="!$v.user.email.email">Please enter valid email.</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-group input-group-merge">
                            <input type="password" v-model="user.password" id="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" placeholder="Enter your password" />
                            <div class="input-group-append" data-password="false">
                                <div class="input-group-text">
                                    <span class="password-eye"></span>
                                </div>
                            </div>
                            <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Password is required.</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="checkbox-signup" />
                            <label class="custom-control-label" for="checkbox-signup">
                                I accept
                                <a href="javascript: void(0);" class="text-dark">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>
                    <div class="form-group mb-0 text-center">
                        <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
                    </div>
                </form>

                <div class="text-center">
                    <h5 class="mt-3 text-muted">Sign Up using</h5>
                    <ul class="social-list list-inline mt-3 mb-0">
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-purple text-purple">
                                <i class="mdi mdi-facebook"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-danger text-danger">
                                <i class="mdi mdi-google"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-info text-info">
                                <i class="mdi mdi-twitter"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary">
                                <i class="mdi mdi-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
            <div class="col-12 text-center">
                <p class="text-muted">
                    Already have account?
                    <nuxt-link to="/account/login" class="text-primary font-weight-medium ml-1">Sign In</nuxt-link>
                </p>
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </div>
    <!-- end col -->
</div>
<!-- end row -->
</template>
