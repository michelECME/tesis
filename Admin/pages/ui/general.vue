<script>
/**
 * General UI component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'General UI',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'General UI',
                    active: true,
                },
            ],
            currentpage: 3,
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
                    <h4 class="header-title">Default</h4>
                    <p class="sub-header">
                        A simple labeling component. Badges scale to match the size of the immediate parent element by using relative font sizing and <code>em</code> units.
                    </p>

                    <h1>h1.Example heading
                        <b-badge>New</b-badge>
                    </h1>
                    <h2>h2.Example heading
                        <b-badge class="badge-soft-success">New</b-badge>
                    </h2>
                    <h3>
                        h3.Example heading
                        <button type="button" class="btn btn-sm btn-primary">
                            Notifications
                            <b-badge variant="light">4</b-badge>
                        </button>
                    </h3>
                    <h4>h4.Example heading
                        <b-badge href="#" variant="dark" class="badge-soft-info">Info Link</b-badge>
                    </h4>
                    <h5>h5.Example heading <b-badge class="badge-outline-warning">New</b-badge>
                    </h5>
                    <h6>h6.Example heading <b-badge variant="danger">New</b-badge>
                    </h6>

                </div> <!-- end card-body -->
            </div> <!-- end card-->

            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Pill Badges</h4>
                    <p class="sub-header">
                        Use the <code>pill</code> modifier class to make badges more rounded.
                    </p>

                    <b-badge variant="primary" pill>Primary</b-badge>
                    <b-badge variant="secondary" pill>Secondary</b-badge>
                    <b-badge variant="success" pill>Success</b-badge>
                    <b-badge variant="danger" pill>Danger</b-badge>
                    <b-badge variant="warning" pill>Warning</b-badge>
                    <b-badge variant="info" pill>Info</b-badge>
                    <b-badge variant="pink" pill>Pink</b-badge>
                    <b-badge variant="blue" pill>Blue</b-badge>
                    <b-badge variant="light" pill>Light</b-badge>
                    <b-badge variant="dark" pill>Dark</b-badge>

                    <h5 class="mt-4">Soft Badges</h5>
                    <p class="sub-header">
                        Use the <code>.badge-soft-*</code> modifier class to make badges soft.
                    </p>

                    <b-badge class="badge-soft-primary" pill>Primary</b-badge>
                    <b-badge class="badge-soft-secondary" pill>Secondary</b-badge>
                    <b-badge class="badge-soft-success" pill>Success</b-badge>
                    <b-badge class="badge-soft-danger" pill>Danger</b-badge>
                    <b-badge class="badge-soft-warning" pill>Warning</b-badge>
                    <b-badge class="badge-soft-info" pill>Info</b-badge>
                    <b-badge class="badge-soft-pink" pill>Pink</b-badge>
                    <b-badge class="badge-soft-blue" pill>Blue</b-badge>
                    <b-badge class="badge-soft-light" pill>Light</b-badge>
                    <b-badge class="badge-soft-dark" pill>Dark</b-badge>

                    <h5 class="mt-4">Outline Badges</h5>
                    <p class="sub-header">
                        Using the <code>.badge-outline-*</code> to quickly create a bordered badges.
                    </p>

                    <b-badge class="badge-outline-primary" pill>Primary</b-badge>
                    <b-badge class="badge-outline-secondary" pill>Secondary</b-badge>
                    <b-badge class="badge-outline-success" pill>Success</b-badge>
                    <b-badge class="badge-outline-danger" pill>Danger</b-badge>
                    <b-badge class="badge-outline-warning" pill>Warning</b-badge>
                    <b-badge class="badge-outline-info" pill>Info</b-badge>
                    <b-badge class="badge-outline-pink" pill>Pink</b-badge>
                    <b-badge class="badge-outline-blue" pill>Blue</b-badge>
                    <b-badge class="badge-outline-light" pill>Light</b-badge>
                    <b-badge class="badge-outline-dark" pill>Dark</b-badge>

                </div> <!-- end card-body -->
            </div> <!-- end card -->
        </div> <!-- end col-->
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Contextual variations</h4>
                    <p class="sub-header">
                        Add any of the below mentioned modifier classes to change the appearance of a badge.
                        Badge can be more contextual as well. Just use regular convention e.g. <code>badge-*color</code>, <code>badge-primary</code>
                        to have badge with different background.
                    </p>

                    <b-badge variant="primary">Primary</b-badge>
                    <b-badge variant="secondary">Secondary</b-badge>
                    <b-badge variant="success">Success</b-badge>
                    <b-badge variant="danger">Danger</b-badge>
                    <b-badge variant="warning">Warning</b-badge>
                    <b-badge variant="info">Info</b-badge>
                    <b-badge variant="pink">Pink</b-badge>
                    <b-badge variant="blue">Blue</b-badge>
                    <b-badge variant="light">Light</b-badge>
                    <b-badge variant="dark">Dark</b-badge>

                    <h5 class="mt-4">Soft Badges</h5>
                    <p class="sub-header">
                        Using the <code>.badge-soft*</code> modifier class, you can have more soften variation.
                    </p>

                    <b-badge class="badge-soft-primary">Primary</b-badge>
                    <b-badge class="badge-soft-secondary">Secondary</b-badge>
                    <b-badge class="badge-soft-success">Success</b-badge>
                    <b-badge class="badge-soft-danger">Danger</b-badge>
                    <b-badge class="badge-soft-warning">Warning</b-badge>
                    <b-badge class="badge-soft-info">Info</b-badge>
                    <b-badge class="badge-soft-pink">Pink</b-badge>
                    <b-badge class="badge-soft-blue">Blue</b-badge>
                    <b-badge class="badge-soft-light">Light</b-badge>
                    <b-badge class="badge-soft-dark">Dark</b-badge>

                    <h5 class="mt-4">Outline Badges</h5>
                    <p class="sub-header">
                        Using the <code>.badge-outline-*</code> to quickly create a bordered badges.
                    </p>

                    <b-badge class="badge-outline-primary">Primary</b-badge>
                    <b-badge class="badge-outline-secondary">Secondary</b-badge>
                    <b-badge class="badge-outline-success">Success</b-badge>
                    <b-badge class="badge-outline-danger">Danger</b-badge>
                    <b-badge class="badge-outline-warning">Warning</b-badge>
                    <b-badge class="badge-outline-info">Info</b-badge>
                    <b-badge class="badge-outline-pink">Pink</b-badge>
                    <b-badge class="badge-outline-blue">Blue</b-badge>
                    <b-badge class="badge-outline-light">Light</b-badge>
                    <b-badge class="badge-outline-dark">Dark</b-badge>

                </div> <!-- end card-body -->
            </div> <!-- end card-->

            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Links Badges</h4>
                    <p class="sub-header">
                        Using the contextual <code>.badge-*</code> classes on an <code>&lt;a&gt;</code> element quickly provide <em>actionable</em> badges with hover and focus states.
                    </p>

                    <b-badge href="#" variant="primary">Primary</b-badge>
                    <b-badge href="#" variant="secondary">Secondary</b-badge>
                    <b-badge href="#" variant="success">Success</b-badge>
                    <b-badge href="#" variant="danger">Danger</b-badge>
                    <b-badge href="#" variant="warning">Warning</b-badge>
                    <b-badge href="#" variant="info">Info</b-badge>
                    <b-badge href="#" variant="pink">Pink</b-badge>
                    <b-badge href="#" variant="blue">Blue</b-badge>
                    <b-badge href="#" variant="light">Light</b-badge>
                    <b-badge href="#" variant="dark">Dark</b-badge>

                    <h5 class="mt-4">Soft Badges</h5>
                    <p class="sub-header">
                        Use the <code>.badge-soft-*</code> modifier class to make badges lighten.
                    </p>

                    <b-badge href="#" class="badge-soft-primary">Primary</b-badge>
                    <b-badge href="#" class="badge-soft-secondary">Secondary</b-badge>
                    <b-badge href="#" class="badge-soft-success">Success</b-badge>
                    <b-badge href="#" class="badge-soft-danger">Danger</b-badge>
                    <b-badge href="#" class="badge-soft-warning">Warning</b-badge>
                    <b-badge href="#" class="badge-soft-info">Info</b-badge>
                    <b-badge href="#" class="badge-soft-pink">Pink</b-badge>
                    <b-badge href="#" class="badge-soft-blue">Blue</b-badge>
                    <b-badge href="#" class="badge-soft-light">Light</b-badge>
                    <b-badge href="#" class="badge-soft-dark">Dark</b-badge>

                    <h5 class="mt-4">Outline Badges</h5>
                    <p class="sub-header">
                        Using the <code>.badge-outline-*</code> to quickly create a bordered badges.
                    </p>

                    <b-badge href="#" class="badge-outline-primary">Primary</b-badge>
                    <b-badge href="#" class="badge-outline-secondary">Secondary</b-badge>
                    <b-badge href="#" class="badge-outline-success">Success</b-badge>
                    <b-badge href="#" class="badge-outline-danger">Danger</b-badge>
                    <b-badge href="#" class="badge-outline-warning">Warning</b-badge>
                    <b-badge href="#" class="badge-outline-info">Info</b-badge>
                    <b-badge href="#" class="badge-outline-pink">Pink</b-badge>
                    <b-badge href="#" class="badge-outline-blue">Blue</b-badge>
                    <b-badge href="#" class="badge-outline-light">Light</b-badge>
                    <b-badge href="#" class="badge-outline-dark">Dark</b-badge>

                </div> <!-- end card-body -->
            </div> <!-- end card-->
        </div> <!-- end col -->
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="">
                                <h4 class="header-title">Pagination</h4>
                                <p class="text-muted font-14 mb-3">Provide pagination links for your site or app with the multi-page pagination component.</p>

                                <p class="mb-1 font-weight-bold">Default Pagination</p>
                                <p class="text-muted font-14">Simple pagination inspired by Rdio, great for apps and search results.</p>

                                <b-pagination v-model="currentpage" :total-rows="50" :per-page="10" aria-controls="my-table"></b-pagination>

                                <p class="mb-1 font-weight-bold mt-4">Rounded Pagination</p>
                                <p class="text-muted font-14">
                                    Add
                                    <code>.pagination-rounded</code> for rounded pagination.
                                </p>
                                <b-pagination v-model="currentpage" class="pagination-rounded" :total-rows="50" :per-page="10" aria-controls="my-table"></b-pagination>

                                <p class="mb-1 font-weight-bold mt-4">Sizing</p>
                                <p class="text-muted font-14">
                                    Add
                                    <code>.pagination-lg</code>
                                    or
                                    <code>.pagination-sm</code>
                                    for additional sizes.
                                </p>

                                <b-pagination size="lg" :total-rows="30" :per-page="10" aria-controls="my-table"></b-pagination>

                                <b-pagination size="sm" :total-rows="30" :per-page="10" aria-controls="my-table"></b-pagination>

                                <p class="mb-1 font-weight-bold mt-4">Alignment</p>
                                <p class="text-muted font-14">Change the alignment of pagination components with flexbox utilities.</p>

                                <b-pagination :total-rows="30" first-text="First" prev-text="Previous" next-text="Next" last-text="Last" align="center"></b-pagination>

                                <b-pagination :total-rows="30" first-text="First" prev-text="Previous" next-text="Next" last-text="Last" align="right"></b-pagination>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="">
                                <h4 class="header-title mt-3 mt-sm-0">Breadcrumb</h4>
                                <p class="text-muted font-14">Indicate the current page’s location within a navigational hierarchy.</p>

                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item active">Home</li>
                                </ol>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <a>Home</a>
                                    </li>
                                    <li class="breadcrumb-item active">Library</li>
                                </ol>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        <a>Home</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a>Library</a>
                                    </li>
                                    <li class="breadcrumb-item active">Data</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <!-- end card-body-->
                </div>
                <!-- end card -->
            </div>
            <!-- end col -->
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <b-jumbotron>
                <template slot="header">
                    <h1 class="display-4">Hello, world!</h1>
                </template>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <b-button variant="primary" size="lg">Learn more</b-button>
            </b-jumbotron>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

</div>
</template>
