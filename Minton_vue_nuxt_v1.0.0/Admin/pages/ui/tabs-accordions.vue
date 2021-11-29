<script>
/**
 * Tabs & Accordions component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Tabs & Accordions",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "UI",
                    href: "/",
                },
                {
                    text: "Tabs & Accordions",
                    active: true,
                },
            ],
            text: `
         Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
        `,
            content: `Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.`,
        };
    },
    middleware: "router-auth",
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">Default Tabs</h4>
                    <b-tabs content-class>
                        <b-tab title="Home" active>
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Profile">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                        <b-tab title="Messages">
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Settings">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">Tabs Justified</h4>
                    <b-tabs justified pills class="navtab-bg">
                        <b-tab title="Home" active>
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Profile">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                        <b-tab title="Messages">
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Settings">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body pb-1">
                    <h4 class="header-title mb-3">Tabs Vertical Left</h4>
                    <b-card no-body class="shadow-none border-0">
                        <b-tabs pills card vertical nav-class="bg-white p-0" active-tab-class="pt-1" nav-wrapper-class="col-sm-3" content-class="pt-0">
                            <b-tab title="Home" active title-item-class="mb-2">
                                <b-card-text>
                                    <p>{{ text }}</p>
                                </b-card-text>
                            </b-tab>
                            <b-tab title="Profile" title-item-class="mb-2">
                                <b-card-text>{{ content }}</b-card-text>
                            </b-tab>
                            <b-tab title="Messages" title-item-class="mb-2">
                                <b-card-text>{{ text }}</b-card-text>
                            </b-tab>
                            <b-tab title="Settings">
                                <b-card-text>{{ content }}</b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body pb-1">
                    <h4 class="header-title mb-3">Tabs Vertical Right</h4>
                    <b-card no-body class="shadow-none border-0">
                        <b-tabs pills card vertical end nav-class="bg-white p-0" active-tab-class="pt-1" nav-wrapper-class="col-sm-3" content-class="pt-0">
                            <b-tab title="Home" active title-item-class="mb-2">
                                <b-card-text>
                                    <p>{{ text }}</p>
                                </b-card-text>
                            </b-tab>
                            <b-tab title="Profile" title-item-class="mb-2">
                                <b-card-text>{{ content }}</b-card-text>
                            </b-tab>
                            <b-tab title="Messages" title-item-class="mb-2">
                                <b-card-text>{{ text }}</b-card-text>
                            </b-tab>
                            <b-tab title="Settings">
                                <b-card-text>{{ content }}</b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">Tabs Bordered</h4>
                    <b-tabs nav-class="nav-tabs nav-bordered">
                        <b-tab title="Home" active>
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Profile">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                        <b-tab title="Messages">
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Settings">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">Tabs Bordered Justified</h4>
                    <b-tabs justified nav-class="nav-tabs nav-bordered">
                        <b-tab title="Home" active>
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Profile">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                        <b-tab title="Messages">
                            <p>{{ text }}</p>
                            <p class="mb-0">{{ content }}</p>
                        </b-tab>
                        <b-tab title="Settings">
                            <p>{{ content }}</p>
                            <p class="mb-0">{{ text }}</p>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-xl-6">
            <div role="tablist" class="mb-3">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0">
                            <a v-b-toggle.customaccordion-1 class="text-dark" href="javascript: void(0);">
                                <i class="mdi mdi-help-circle mr-1 text-primary"></i>What is Vakal text here?
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="customaccordion-1" visible accordion="accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0">
                            <a v-b-toggle.customaccordion-2 class="text-dark" href="javascript: void(0);">
                                <i class="mdi mdi-help-circle mr-1 text-primary"></i>Why use Vakal text here?
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="customaccordion-2" accordion="accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0">
                            <a v-b-toggle.customaccordion-3 class="text-dark" href="javascript: void(0);">
                                <i class="mdi mdi-help-circle mr-1 text-primary"></i>How many variations exist?
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="customaccordion-3" accordion="accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0">
                            <a v-b-toggle.customaccordion-4 class="text-dark" href="javascript: void(0);">
                                <i class="mdi mdi-help-circle mr-1 text-primary"></i>What is Vakal text here?
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="customaccordion-4" accordion="accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>{{ text }}</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>

            <b-button v-b-toggle.collapse-2 class="m-1" variant="primary">Link with href</b-button>

            <!-- Using value -->
            <b-button v-b-toggle="'collapse-2'" class="m-1" variant="primary">Button with data-target</b-button>

            <!-- Element to collapse -->
            <b-collapse id="collapse-2" visible class="mt-1">
                <b-card>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</b-card>
            </b-collapse>
        </div>
        <div class="col-xl-6">
            <div role="tablist">
                <b-card no-body class="mb-0 custom-accordion">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0 position-relative">
                            <a v-b-toggle.accordion-1 class="text-reset" href="javascript: void(0);">
                                Q. Can I use this template for my client?
                                <i class="mdi mdi-chevron-down accordion-arrow"></i>
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>
                                Yup, the marketplace license allows you to use this theme
                                in any end products.
                                For more information on licenses, please refere
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-0 custom-accordion">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0 position-relative">
                            <a v-b-toggle.accordion-2 class="text-reset" href="javascript: void(0);">
                                Q. Can this theme work with WordPress?
                                <i class="mdi mdi-chevron-down accordion-arrow"></i>
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>
                                No. This is a HTML template. It won't directly with
                                WordPress, though you can convert this into WordPress
                                compatible theme
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body class="mb-0 custom-accordion">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0 position-relative">
                            <a v-b-toggle.accordion-3 class="text-reset" href="javascript: void(0);">
                                Q. How do I get help with the theme?
                                <i class="mdi mdi-chevron-down accordion-arrow"></i>
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>Use our dedicated support email (support@themesbrand.com) to send your issues or feedback. We are here to help anytime</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-0 custom-accordion">
                    <b-card-header header-tag="header" role="tab">
                        <h5 class="m-0 position-relative">
                            <a v-b-toggle.accordion-4 class="text-reset" href="javascript: void(0);">
                                Q. Will you regularly give updates of Minton ?
                                <i class="mdi mdi-chevron-down accordion-arrow"></i>
                            </a>
                        </h5>
                    </b-card-header>
                    <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>Yes, We will update the Minton regularly. All the future updates would be available without any cost</b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
        </div>
    </div>
</div>
</template>
