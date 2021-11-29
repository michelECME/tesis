<script>
/**
 * Dropdowns component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Dropdowns",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "UI",
                    href: "/",
                },
                {
                    text: "Dropdowns",
                    active: true,
                },
            ],
        };
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Examples</h4>
                    <p class="sub-header">Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.</p>
                    <div class="row">
                        <div class="col-xl-6">
                            <h5>Single button dropdowns</h5>
                            <p class="text-muted font-13 mb-2">
                                Any single
                                <code class="highlighter-rouge">.btn</code> can be turned into a
                                dropdown toggle with some markup changes. Here’s how you can put
                                them to work with either
                                <code class="highlighter-rouge">&lt;button&gt;</code>
                                elements:
                            </p>

                            <div class="row">
                                <div class="col-sm-6">
                                    <b-dropdown variant="primary">
                                        <template v-slot:button-content>
                                            Dropdown button
                                            <i class="mdi mdi-chevron-down"></i>
                                        </template>
                                        <b-dropdown-item>Action</b-dropdown-item>
                                        <b-dropdown-item>Another Action</b-dropdown-item>
                                        <b-dropdown-item>Something else here</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                            <div class="mt-5">
                                <h5>Sizing</h5>
                                <p class="text-muted font-13 mb-2">
                                    Button dropdowns work with buttons of all sizes, including default
                                    and split dropdown buttons.
                                </p>

                                <div>
                                    <!-- Large button groups (default and split) -->
                                    <div class="mr-1 mt-2">
                                        <b-dropdown variant="primary" size="lg" class="m-2">
                                            <template v-slot:button-content>
                                                Large button
                                                <i class="mdi mdi-chevron-down"></i>
                                            </template>
                                            <b-dropdown-item-button>Action</b-dropdown-item-button>
                                            <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                            <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                        </b-dropdown>
                                        <b-dropdown variant="primary" size="sm" class="m-2">
                                            <template v-slot:button-content>
                                                Small button
                                                <i class="mdi mdi-chevron-down"></i>
                                            </template>
                                            <b-dropdown-item-button>Action</b-dropdown-item-button>
                                            <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                            <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                        </b-dropdown>
                                    </div>
                                </div>

                            </div>
                            <div class="mt-5">
                                <h5>Dropup</h5>
                                <p class="text-muted font-13 mb-2">
                                    Dropdown menus can be changed to expand upwards (instead of
                                    downwards) by adding
                                    <code>dropup</code> to the parent.
                                </p>

                                <div class="mt-1">
                                    <b-dropdown dropup variant="light" class="m-2">
                                        <template slot="button-content">
                                            Dropup
                                            <i class="mdi mdi-chevron-up"></i>
                                        </template>
                                        <b-dropdown-item-button>Action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                    </b-dropdown>
                                    <b-dropdown dropup variant="light" class="m-2">
                                        <template slot="button-content">
                                            Dropup
                                            <i class="mdi mdi-chevron-up"></i>
                                        </template>
                                        <b-dropdown-item-button>Action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                    </b-dropdown>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <h5>Variant</h5>
                            <p class="text-muted font-13 mb-2">The best part is you can do this with any button variant, too:</p>

                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="primary">
                                    <template v-slot:button-content>
                                        Primary
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->
                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="light">
                                    <template v-slot:button-content>
                                        Light
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->
                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="success">
                                    <template v-slot:button-content>
                                        Success
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->
                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="info">
                                    <template v-slot:button-content>
                                        Info
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->
                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="warning">
                                    <template v-slot:button-content>
                                        Warning
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->
                            <div class="btn-group mr-1 mt-2">
                                <b-dropdown variant="danger">
                                    <template v-slot:button-content>
                                        Danger
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
                                    <b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="javascript: void(0);">Separated link</b-dropdown-item>
                                </b-dropdown>
                            </div>
                            <!-- /btn-group -->

                            <div class="mt-5">
                                <h5>Drop variation</h5>
                                <p class="text-muted font-13 mb-2">
                                    Trigger dropdown menus at the right of the elements by adding
                                    <code>dropleft</code> and
                                    <code>dropright</code> to the parent
                                    element.
                                </p>

                                <div class="dropdown mt-1">
                                    <b-dropdown dropright variant="success" class="m-2">
                                        <template slot="button-content">
                                            Drop-right
                                            <i class="mdi mdi-chevron-right"></i>
                                        </template>
                                        <b-dropdown-item-button>Action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                    </b-dropdown>
                                    <b-dropdown dropleft variant="info" class="m-2">
                                        <template slot="button-content">
                                            <i class="mdi mdi-chevron-left"></i>
                                            Drop-left
                                        </template>
                                        <b-dropdown-item-button>Action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Another action</b-dropdown-item-button>
                                        <b-dropdown-item-button>Something else here</b-dropdown-item-button>
                                    </b-dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
