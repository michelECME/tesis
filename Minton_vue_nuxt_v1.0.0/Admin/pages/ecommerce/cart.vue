<script>
import NumberInputSpinner from 'vue-number-input-spinner'

/**
 * Cart component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    components: {
        NumberInputSpinner,
    },
    data() {
        return {
            title: "Shopping Cart",
            items: [{
                    text: "Minton"
                },
                {
                    text: "eCommerce"
                },
                {
                    text: "Shopping Cart",
                    active: true
                }
            ],
            products: [{
                image: require('~/assets/images/products/product-1.png'),
                name: 'Blue color T-shirt',
                size: 'Large',
                price: 41,
                quantity: 2,
                total: 92
            }, {
                image: require('~/assets/images/products/product-2.png'),
                name: 'Half sleeve maroon T-shirt',
                size: 'Medium',
                price: 37,
                quantity: 2,
                total: 37
            }, {
                image: require('~/assets/images/products/product-6.png'),
                name: 'Blue Hoodie for men',
                size: 'Large',
                price: 45,
                quantity: 3,
                total: 90
            }, {
                image: require('~/assets/images/products/product-8.png'),
                name: 'Full sleeve Pink T-shirt',
                size: 'medium',
                price: 45,
                quantity: 2,
                total: 45
            }]
        };
    },
    middleware: 'router-auth',
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-8">
                            <div>
                                <div class="table-responsive">
                                    <table class="table table-centered mb-0 table-nowrap">
                                        <thead class="thead-light">
                                            <tr>
                                                <th style="width: 80px;">Product</th>
                                                <th>Product Desc</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th colspan="2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in products" :key="index">
                                                <td>
                                                    <img :src="item.image" alt="product-img" title="product-img" class="avatar-lg" />
                                                </td>
                                                <td>
                                                    <h5 class="mt-0 mb-1 text-truncate">
                                                        <nuxt-link to="/ecommerce/product-detail/1" class="text-body">{{item.name}}</nuxt-link>
                                                    </h5>
                                                    <p class="mb-0">
                                                        Size :
                                                        <span class="font-weight-medium">{{item.size}}</span>
                                                    </p>
                                                </td>
                                                <td>
                                                    $ {{item.price}}
                                                </td>
                                                <td>
                                                    <div style="width: 120px;" class="product-cart-touchspin">
                                                        <NumberInputSpinner :min="0" :max="10" :value="item.quantity" :integerOnly="true" />
                                                    </div>

                                                </td>
                                                <td>
                                                    $ {{item.total}}
                                                </td>
                                                <td>
                                                    <a href="javascript:void(0);" class="action-icon text-danger">
                                                        <i class="mdi mdi-trash-can"></i></a>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <!-- end table-responsive-->

                                <!-- Add note input-->
                                <div class="mt-3">
                                    <label for="example-textarea">Add a Note:</label>
                                    <textarea class="form-control" id="example-textarea" rows="3" placeholder="Write some note.."></textarea>
                                </div>

                                <!-- action buttons-->
                                <div class="row mt-4">
                                    <div class="col-sm-6">
                                        <nuxt-link to="/ecommerce/products" class="btn text-muted d-none d-sm-inline-block btn-link font-weight-semibold">
                                            <i class="mdi mdi-arrow-left"></i> Continue Shopping
                                        </nuxt-link>
                                    </div>
                                    <!-- end col -->
                                    <div class="col-sm-6">
                                        <div class="text-sm-right">
                                            <nuxt-link to="/ecommerce/checkout" class="btn btn-danger"><i class="mdi mdi-cart-plus mr-1"></i> Checkout
                                            </nuxt-link>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row-->
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="border p-3 mt-4 mt-lg-0 rounded">
                                <h4 class="header-title mb-3">Order Summary</h4>

                                <div class="table-responsive">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td>Grand Total :</td>
                                                <td>$ 264</td>
                                            </tr>
                                            <tr>
                                                <td>Discount :</td>
                                                <td>-$ 26</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping Charge :</td>
                                                <td>$ 24</td>
                                            </tr>
                                            <tr>
                                                <td>Estimated Tax :</td>
                                                <td>$ 18.22</td>
                                            </tr>
                                            <tr>
                                                <th>Total :</th>
                                                <th>$ 280.22</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- end table-responsive -->
                            </div>

                            <div class="alert alert-warning mt-3" role="alert">
                                Use coupon code <strong>MNTF25</strong> and get 25% discount !
                            </div>

                            <div class="input-group mt-3">
                                <input type="text" class="form-control form-control-light" placeholder="Coupon code" aria-label="Recipient's username" />
                                <div class="input-group-append">
                                    <button class="btn btn-light" type="button">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
