<script>
/**
 * Modals component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Modals',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Modals',
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
                    <h4 class="header-title">Bootstrap Modals (default)</h4>
                    <p class="sub-header">A rendered modal with header, body, and set of actions in the footer.</p>
                    <div class="button-list">
                        <b-button v-b-modal.modal-1 variant="primary">Standard Modal</b-button>
                        <b-modal id="modal-1" title="Modal Heading" title-class="font-18">
                            <h6>Text in a modal</h6>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                            <hr>
                            <h6>Overflowing text to show scroll behavior</h6>
                            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        </b-modal>

                        <b-button v-b-modal.modal-lg variant="info">Large Modal</b-button>
                        <b-modal id="modal-lg" size="lg" title="Large modal" title-class="font-18" hide-footer>...</b-modal>
                        <b-button v-b-modal.modal-sm variant="success">Small Modal</b-button>
                        <b-modal id="modal-sm" size="sm" title="Small modal" title-class="font-18" hide-footer>...</b-modal>

                        <b-button v-b-modal.modal-fullWidth variant="primary">Full width Modal</b-button>
                        <b-modal id="modal-fullWidth" title="Modal Heading" title-class="font-18" dialog-class="modal-full-width">
                            <h6>Text in a modal</h6>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                            <hr>
                            <h6>Overflowing text to show scroll behavior</h6>
                            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        </b-modal>
                        <b-button v-b-modal.modal-center variant="purple">Center modal</b-button>
                        <b-modal id="modal-center" centered title="Center modal" title-class="font-18" hide-footer>...</b-modal>
                        <b-button v-b-modal.modal-scrollable variant="pink">Scrollable</b-button>
                        <b-modal id="modal-scrollable" scrollable title="Modal title" title-tag="h5">
                            <p v-for="i in 20" :key="i">
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </p>
                        </b-modal>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Modal with Pages</h4>
                    <p class="sub-header">Examples of custom modals.</p>

                    <div class="button-list">
                        <!-- Sign Up modal -->
                        <b-button variant="primary" v-b-modal.signup-modal data-toggle="modal" data-target="#signup-modal">Sign Up Modal</b-button>
                        <!-- Signup modal content -->
                        <b-modal id="signup-modal" hide-header hide-footer>
                            <div class="text-center mt-2 mb-4">
                                <nuxt-link to="/" class="text-success">
                                    <span><img src="~/assets/images/logo-dark.png" alt="" height="24"></span>
                                </nuxt-link>
                            </div>

                            <form class="px-3" action="#">

                                <div class="form-group">
                                    <label for="username">Name</label>
                                    <input class="form-control" type="email" id="username" required="" placeholder="Michael Zenaty">
                                </div>

                                <div class="form-group">
                                    <label for="emailaddress">Email address</label>
                                    <input class="form-control" type="email" id="emailaddress" required="" placeholder="john@deo.com">
                                </div>

                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control" type="password" required="" id="password" placeholder="Enter your password">
                                </div>

                                <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                        <label class="custom-control-label" for="customCheck1">I accept <a href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>

                                <div class="form-group text-center">
                                    <button class="btn btn-primary" type="submit">Sign Up Free</button>
                                </div>
                            </form>
                        </b-modal><!-- /.modal -->

                        <!-- Log In modal -->
                        <b-button variant="info" v-b-modal.login-modal data-toggle="modal" data-target="#login-modal">Log In Modal</b-button>

                        <!-- SignIn modal content -->
                        <b-modal id="login-modal" hide-header hide-footer>
                            <div class="text-center mt-2 mb-4">
                                <nuxt-link to="/" class="text-success">
                                    <span><img src="~/assets/images/logo-dark.png" alt="" height="24"></span>
                                </nuxt-link>
                            </div>
                            <form action="#" class="px-3">
                                <div class="form-group">
                                    <label for="emailaddress1">Email address</label>
                                    <input class="form-control" type="email" id="emailaddress1" required="" placeholder="john@deo.com">
                                </div>

                                <div class="form-group">
                                    <label for="password1">Password</label>
                                    <input class="form-control" type="password" required="" id="password1" placeholder="Enter your password">
                                </div>

                                <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck2">
                                        <label class="custom-control-label" for="customCheck2">Remember me</label>
                                    </div>
                                </div>

                                <div class="form-group text-center">
                                    <button class="btn btn-rounded btn-primary" type="submit">Sign In</button>
                                </div>
                            </form>

                        </b-modal><!-- /.modal -->
                    </div>

                </div> <!-- end card-body -->
            </div> <!-- end card-->
        </div> <!-- end col -->
    </div>

    <div class="row">

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Modal based Alerts</h4>
                    <p class="sub-header">Show different contexual alert messages using modal component</p>

                    <div class="button-list">
                        <!-- Success Alert modal -->
                        <button type="button" class="btn btn-success" v-b-modal.success-alert-modal>Success Alert</button>
                        <!-- Info Alert modal -->
                        <button type="button" class="btn btn-info" v-b-modal.info-alert-modal>Info Alert</button>
                        <!-- Warning Alert modal -->
                        <button type="button" class="btn btn-warning" v-b-modal.warning-alert-modal>Warning Alert</button>
                        <!-- Danger Alert modal -->
                        <button type="button" class="btn btn-danger" v-b-modal.danger-alert-modal>Danger Alert</button>
                    </div>
                    <!-- Success Alert Modal -->
                    <b-modal id="success-alert-modal" body-class="p-4" hide-header hide-footer content-class="bg-success" size="sm">
                        <div class="text-center">
                            <i class="bx bx-check-double h1 text-white"></i>
                            <h4 class="mt-2 text-white">Well Done!</h4>
                            <p class="mt-3 text-white">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <button type="button" class="btn btn-light my-2" data-dismiss="modal">Continue</button>
                        </div>
                    </b-modal><!-- /.modal -->

                    <!-- Info Alert Modal -->
                    <b-modal id="info-alert-modal" body-class="p-4" hide-header hide-footer size="sm">
                        <div class="text-center">
                            <i class="bx bxs-info-circle h1 text-info"></i>
                            <h4 class="mt-2">Heads up!</h4>
                            <p class="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <button type="button" class="btn btn-info my-2" data-dismiss="modal">Continue</button>
                        </div>
                    </b-modal>
                    <!-- /.modal -->

                    <!-- Warning Alert Modal -->
                    <b-modal id="warning-alert-modal" body-class="p-4" hide-header hide-footer size="sm">
                        <div class="text-center">
                            <i class="bx bxs-no-entry h1 text-warning"></i>
                            <h4 class="mt-2">Incorrect Information</h4>
                            <p class="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <button type="button" class="btn btn-warning my-2" data-dismiss="modal">Continue</button>
                        </div>
                    </b-modal><!-- /.modal -->

                    <!-- Danger Alert Modal -->
                    <b-modal id="danger-alert-modal" body-class="p-4" hide-header hide-footer content-class="bg-danger" size="sm">
                        <div class="text-center">
                            <i class="bx bx-aperture h1 text-white"></i>
                            <h4 class="mt-2 text-white">Oh snap!</h4>
                            <p class="mt-3 text-white">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                            <button type="button" class="btn btn-light my-2" data-dismiss="modal">Continue</button>
                        </div>
                    </b-modal><!-- /.modal -->
                </div> <!-- end card-body -->
            </div> <!-- end card-->
        </div> <!-- end col -->
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Custom Modals</h4>

                    <p class="sub-header">Examples of custom modals.</p>
                    <div class="button-list">

                        <b-button v-b-modal.modal-responsive variant="success">Responsive Modal</b-button>
                        <b-modal id="modal-responsive" title="Modal Content is Responsive" title-class="font-18" body-class="p-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="field-1" class="control-label">Name</label>
                                        <input type="text" class="form-control" placeholder="John" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="field-2" class="control-label">Surname</label>
                                        <input type="text" class="form-control" placeholder="Doe" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="field-3" class="control-label">Address</label>
                                        <input type="text" class="form-control" placeholder="Address" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="field-4" class="control-label">City</label>
                                        <input type="text" class="form-control" placeholder="Boston" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="field-5" class="control-label">Country</label>
                                        <input type="text" class="form-control" placeholder="United States" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="field-6" class="control-label">Zip</label>
                                        <input type="text" class="form-control" placeholder="123456" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group no-margin">
                                        <label for="field-7" class="control-label">Personal Info</label>
                                        <textarea class="form-control" placeholder="Write something about yourself"></textarea>
                                    </div>
                                </div>
                            </div>
                        </b-modal>

                        <!-- Accordion modal -->
                        <b-button v-b-modal.modal-accordion variant="secondary">Accordion in Modal</b-button>
                        <b-modal id="modal-accordion" hide-header hide-footer body-class="p-0">
                            <b-card no-body class="mb-0">
                                <b-card-header header-tag="header" role="tab">
                                    <h5 class="m-0">
                                        <a v-b-toggle.accordion-1 href="javascript: void(0);" class="text-dark">Collapsible Group Item #1</a>
                                    </h5>
                                </b-card-header>
                                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                    <b-card-body>
                                        <b-card-text>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</b-card-text>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>

                            <b-card no-body class="mb-0">
                                <b-card-header header-tag="header" role="tab">
                                    <h5 class="m-0">
                                        <a v-b-toggle.accordion-2 href="javascript: void(0);" class="text-dark">Collapsible Group Item #2</a>
                                    </h5>
                                </b-card-header>
                                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                                    <b-card-body>
                                        <b-card-text>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</b-card-text>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>

                            <b-card no-body class="mb-0">
                                <b-card-header header-tag="header" role="tab">
                                    <h5 class="m-0">
                                        <a v-b-toggle.accordion-3 href="javascript: void(0);" class="text-dark">Collapsible Group Item #3</a>
                                    </h5>
                                </b-card-header>
                                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                                    <b-card-body>
                                        <b-card-text>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</b-card-text>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </b-modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
