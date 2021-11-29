<script>
import {
    FormWizard,
    TabContent
} from 'vue-form-wizard'

/**
 * Form Wizard component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    components: {
        FormWizard,
        TabContent
    },
    data() {
        return {
            title: 'Form Wizard',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'Forms',
                    href: '/',
                },
                {
                    text: 'Wizard',
                    active: true,
                },
            ],
        }
    },
    middleware: 'router-auth'
}
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Basic Wizard</h4>
                    <form-wizard color="#3bafda">
                        <tab-content icon="mdi mdi-account-circle">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="userName">User name</label>
                                        <div class="col-md-9">
                                            <input id="userName" type="text" class="form-control" name="userName" value="themesbrand" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="password">Password</label>
                                        <div class="col-md-9">
                                            <input id="password" type="password" name="password" class="form-control" value="123456789" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="confirmpass">Re Password</label>
                                        <div class="col-md-9">
                                            <input id="confirmpass" type="password" name="confirmpass" class="form-control" value="123456789" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-face-profile">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="name">First name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="name" class="form-control" value="Francis" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="surname">Last name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="surname" class="form-control" value="Brinkman" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="email">Email</label>
                                        <div class="col-md-9">
                                            <input type="email" name="email" class="form-control" value="cory1979@hotmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-center">
                                        <h2 class="mt-0">
                                            <i class="mdi mdi-check-all"></i>
                                        </h2>
                                        <h3 class="mt-0">Thank you !</h3>

                                        <p class="w-75 mb-2 mx-auto">
                                            Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat. In egestas mattis dui. Aliquam
                                            mattis dictum aliquet.
                                        </p>

                                        <div class="mb-3">
                                            <div class="custom-control custom-checkbox">
                                                <input id="customCheck1" type="checkbox" class="custom-control-input" />
                                                <label class="custom-control-label" for="customCheck1">I agree with the Terms and Conditions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                    </form-wizard>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Tab Wizard</h4>
                    <form-wizard shape="tab" color="#3bafda">
                        <tab-content icon="mdi mdi-account-circle">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="name">User name</label>
                                        <div class="col-md-9">
                                            <input id="name" type="text" class="form-control" value="themesbrand" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="pwd">Password</label>
                                        <div class="col-md-9">
                                            <input id="pwd" type="password" name="pwd" class="form-control" value="123456789" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="confirmpwd">Re Password</label>
                                        <div class="col-md-9">
                                            <input id="confirmpwd" type="password" class="form-control" value="123456789" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-face-profile">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="name">First name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="name" class="form-control" value="Francis" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="surname">Last name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="surname" class="form-control" value="Brinkman" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="email">Email</label>
                                        <div class="col-md-9">
                                            <input type="email" name="email" class="form-control" value="cory1979@hotmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-center">
                                        <h2 class="mt-0">
                                            <i class="mdi mdi-check-all"></i>
                                        </h2>
                                        <h3 class="mt-0">Thank you !</h3>

                                        <p class="w-75 mb-2 mx-auto">
                                            Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat. In egestas mattis dui. Aliquam
                                            mattis dictum aliquet.
                                        </p>

                                        <div class="mb-3">
                                            <div class="custom-control custom-checkbox">
                                                <input id="customCheck1" type="checkbox" class="custom-control-input" />
                                                <label class="custom-control-label" for="customCheck1">I agree with the Terms and Conditions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                    </form-wizard>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Square Wizard</h4>
                    <form-wizard shape="square" color="#3bafda">
                        <tab-content icon="mdi mdi-account-circle">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="user">User name</label>
                                        <div class="col-md-9">
                                            <input id="user" type="text" class="form-control" value="themesbrand" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label">Password</label>
                                        <div class="col-md-9">
                                            <input type="password" name="password" class="form-control" value="123456789" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label">Re Password</label>
                                        <div class="col-md-9">
                                            <input type="password" class="form-control" value="123456789" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-face-profile">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="name">First name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="name" class="form-control" value="Francis" />
                                        </div>
                                    </div>
                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="surname">Last name</label>
                                        <div class="col-md-9">
                                            <input type="text" name="surname" class="form-control" value="Brinkman" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-3">
                                        <label class="col-md-3 col-form-label" for="email">Email</label>
                                        <div class="col-md-9">
                                            <input type="email" name="email" class="form-control" value="cory1979@hotmail.com" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                        <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-center">
                                        <h2 class="mt-0">
                                            <i class="mdi mdi-check-all"></i>
                                        </h2>
                                        <h3 class="mt-0">Thank you !</h3>

                                        <p class="w-75 mb-2 mx-auto">
                                            Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at volutpat. In egestas mattis dui. Aliquam
                                            mattis dictum aliquet.
                                        </p>

                                        <div class="mb-3">
                                            <div class="custom-control custom-checkbox">
                                                <input id="customCheck1" type="checkbox" class="custom-control-input" />
                                                <label class="custom-control-label" for="customCheck1">I agree with the Terms and Conditions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </tab-content>
                    </form-wizard>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
