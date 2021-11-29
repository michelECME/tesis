<script>
/**
 * Buttons component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Buttons',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Buttons',
                    active: true,
                },
            ],
            buttonData: [{
                    color: 'primary',
                },
                {
                    color: 'success',
                },
                {
                    color: 'info',
                },
                {
                    color: 'warning',
                },
                {
                    color: 'danger',
                },
                {
                    color: 'dark',
                },
                {
                    color: 'purple',
                },
                {
                    color: 'pink',
                },
                {
                    color: 'secondary',
                }
            ]
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
                    <h4 class="header-title">Default Buttons</h4>
                    <p class="sub-header">
                        Use the button classes on an
                        <code>&lt;a&gt;</code>,
                        <code>&lt;button&gt;</code>, or
                        <code>&lt;input&gt;</code> element.
                    </p>
                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" :variant="`${button.color}`" class="ml-1">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Button-Rounded</h4>
                    <p class="text-muted font-13">
                        Add
                        <code>.btn-rounded</code> to default button to get rounded corners.
                    </p>
                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" class="btn-rounded ml-1" :variant="`${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Outline Buttons</h4>
                    <p class="sub-header">
                        Use a classes <code>.btn-outline-**</code> to quickly create a bordered buttons.
                    </p>
                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" :variant="`outline-${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Outline Rounded Button</h4>
                    <p class="sub-header">
                        Add
                        <code>.btn-rounded</code> to default button to get rounded corners.
                    </p>

                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" class="btn-rounded" :variant="`outline-${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Soft Buttons</h4>
                    <p class="sub-header">
                        Use a classes <code>.btn-soft-**</code> to quickly create buttons with soft background.
                    </p>
                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" :class="`btn-soft-${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Soft Rounded Buttons</h4>
                    <p class="sub-header">
                        Add <code>.btn-rounded</code> to default button to get rounded corners.
                    </p>
                    <div class="button-list">
                        <b-button v-for="button in buttonData" pill :key="button.color" :class="`btn-soft-${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bordered Buttons</h4>
                    <p class="sub-header">Use a classes <code>.btn-bordered-*</code> to quickly create a bordered buttons.</p>

                    <div class="button-list">
                        <b-button v-for="button in buttonData" :key="button.color" :class="`btn-bordered-${button.color}`" :variant="`outline-${button.color}`">{{button.color | titlecase}}</b-button>
                    </div>
                </div>
            </div>
        </div> <!-- end col -->

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bordered Rounded Buttons</h4>
                    <p class="sub-header">Use a classes <code>.btn-bordered-*</code> to quickly create a bordered buttons.</p>

                    <div class="button-list">
                        <b-button pill v-for="button in buttonData" :key="button.color" :class="`btn-bordered-${button.color}`" :variant="`outline-${button.color}`">{{button.color | titlecase}}</b-button>

                    </div>
                </div>
            </div>
        </div> <!-- end col -->
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Buttons Labels</h4>
                    <p class="sub-header">
                        Put <code>&lt;span&gt;</code> with class <code>.btn-label</code> and any <code>icon</code> inside it. If you want to
                        put icon on right side then add class <code>.btn-label-right</code> in <code>&lt;span&gt;</code>
                    </p>

                    <div class="button-list">
                        <button type="button" class="btn btn-success">
                            <span class="btn-label"><i class="mdi mdi-check-all"></i></span>Success
                        </button>
                        <button type="button" class="btn btn-danger">
                            <span class="btn-label"><i class="mdi mdi-close-circle-outline"></i></span>Danger
                        </button>
                        <button type="button" class="btn btn-info">
                            <span class="btn-label"><i class="mdi mdi-alert-circle-outline"></i></span>Info
                        </button>
                        <button type="button" class="btn btn-warning">
                            <span class="btn-label"><i class="mdi mdi-alert"></i></span>Warning
                        </button>
                    </div>
                    <br>
                    <div class="button-list">
                        <button type="button" class="btn btn-success">
                            Success<span class="btn-label-right"><i class="mdi mdi-check-all"></i></span>
                        </button>
                        <button type="button" class="btn btn-danger">
                            Danger<span class="btn-label-right"><i class="mdi mdi-close-circle-outline"></i></span>
                        </button>
                        <button type="button" class="btn btn-info">
                            Info<span class="btn-label-right"><i class="mdi mdi-alert-circle-outline"></i></span>
                        </button>
                        <button type="button" class="btn btn-warning">
                            Warning<span class="btn-label-right"><i class="mdi mdi-alert"></i></span>
                        </button>
                    </div>
                </div><!-- end card-body -->
            </div> <!-- end card -->
        </div> <!-- end col -->

        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Rounded Buttons Lables</h4>
                    <p class="sub-header">
                        Put <code>&lt;span&gt;</code> with class <code>.btn-label</code> and any <code>icon</code> inside it. If you want to
                        put icon on right side then add class <code>.btn-label-right</code> in <code>&lt;span&gt;</code>
                    </p>

                    <div class="button-list">
                        <b-button variant="success">
                            <span class="btn-label"><i class="mdi mdi-check-all"></i></span>Success
                        </b-button>
                        <b-button variant="danger">
                            <span class="btn-label"><i class="mdi mdi-close-circle-outline"></i></span>Danger
                        </b-button>
                        <b-button variant="info">
                            <span class="btn-label"><i class="mdi mdi-alert-circle-outline"></i></span>Info
                        </b-button>
                        <b-button variant="warning">
                            <span class="btn-label"><i class="mdi mdi-alert"></i></span>Warning
                        </b-button>
                    </div>
                    <br>
                    <div class="button-list">
                        <b-button variant="success">
                            Success<span class="btn-label-right"><i class="mdi mdi-check-all"></i></span>
                        </b-button>
                        <b-button variant="danger">
                            Danger<span class="btn-label-right"><i class="mdi mdi-close-circle-outline"></i></span>
                        </b-button>
                        <b-button variant="info">
                            Info<span class="btn-label-right"><i class="mdi mdi-alert-circle-outline"></i></span>
                        </b-button>
                        <b-button variant="warning">
                            Warning<span class="btn-label-right"><i class="mdi mdi-alert"></i></span>
                        </b-button>
                    </div>
                </div><!-- end card-body -->
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Button Width</h4>
                    <p class="sub-header">
                        Create buttons with minimum width by adding add
                        <code>.width-xs</code>,
                        <code>.width-sm</code>,
                        <code>.width-md</code>,
                        <code>.width-lg</code> or
                        <code>.width-xl</code>.
                    </p>
                    <div class="button-list">
                        <b-button variant="primary" class="width-xs">Xs</b-button>
                        <b-button variant="success" class="width-sm ml-1">Small</b-button>
                        <b-button variant="info" class="width-md ml-1">Middle</b-button>
                        <b-button variant="warning" class="width-lg">Large</b-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Button Sizes</h4>
                    <p class="sub-header">
                        Add
                        <code>lg</code>,
                        <code>sm</code>, or
                        <code>xs</code> for additional sizes.
                    </p>
                    <div class="button-list">
                        <b-button size="lg" variant="info">Large buttom</b-button>
                        <b-button size="md" variant="danger">Normal button</b-button>
                        <b-button size="sm" variant="success">Small button</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Button Disabled</h4>
                    <p class="sub-header">
                        Add the
                        <code>disabled</code> attribute to
                        <code>&lt;button&gt;</code> buttons.
                    </p>

                    <div class="button-list">
                        <b-button disabled variant="info">Info</b-button>
                        <b-button disabled variant="dark">Dark</b-button>
                        <b-button disabled variant="pink">Pink</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Icons Buttons</h4>
                    <p class="sub-header">Icon only button.</p>
                    <div class="button-list">
                        <b-button variant="success">
                            <i class="mdi mdi-heart-half-full"></i>
                        </b-button>
                        <b-button variant="danger">
                            <i class="mdi mdi-close"></i>
                        </b-button>
                        <b-button variant="primary">
                            <i class="mdi mdi-music"></i>
                        </b-button>
                        <b-button variant="warning">
                            <i class="mdi mdi-star"></i>
                        </b-button>
                        <b-button variant="purple">
                            <i class="mdi mdi-cog"></i>
                        </b-button>
                    </div>
                    <br />
                    <div class="button-list">
                        <b-button variant="success">
                            <i class="fa fa-heart mr-1"></i> Like
                        </b-button>
                        <b-button variant="dark">
                            <i class="far fa-envelope mr-1"></i> Share
                        </b-button>
                        <b-button variant="info">
                            <i class="fa fa-cloud mr-1"></i> Cloud Hosting
                        </b-button>
                        <b-button variant="warning">
                            Donate
                            <i class="mdi mdi-currency-btc ml-1"></i>
                        </b-button>

                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Block Buttons</h4>
                    <p class="sub-header">
                        Create block level buttons,with by adding add
                        <code>block</code>.
                    </p>

                    <div class="button-list pr-xl-4">
                        <b-button block variant="primary" size="md">Block Button</b-button>
                        <b-button block variant="success" size="sm">Block Button</b-button>
                        <b-button block variant="info" size="xs">Block Button</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Button Group</h4>
                    <p class="sub-header">
                        Wrap a series of buttons with
                        <code>.btn</code> in
                        <code>.btn-group</code>.
                    </p>
                    <div class="btn-group mb-2">
                        <b-button-group>
                            <b-button variant="light">Left</b-button>
                            <b-button variant="light">Middle</b-button>
                            <b-button variant="light">Right</b-button>
                        </b-button-group>
                    </div>
                    <br />
                    <div class="btn-group mb-2">
                        <b-button-group>
                            <b-button variant="light">1</b-button>
                            <b-button variant="light">2</b-button>
                            <b-button variant="light">3</b-button>
                            <b-button variant="light">4</b-button>
                        </b-button-group>
                    </div>
                    <div class="btn-group mb-2 ml-1">
                        <b-button-group>
                            <b-button variant="light">5</b-button>
                            <b-button variant="light">6</b-button>
                            <b-button variant="light">7</b-button>
                        </b-button-group>
                    </div>
                    <div class="btn-group mb-2 ml-1">
                        <b-button-group>
                            <b-button variant="light">8</b-button>
                        </b-button-group>
                    </div>
                    <br />
                    <div class="btn-group">
                        <b-button-group>
                            <b-button variant="light">1</b-button>
                            <b-button variant="light">2</b-button>
                            <b-button variant="light">3</b-button>
                            <b-dropdown variant="light">
                                <template slot="button-content">
                                    Dropdown
                                    <i class="mdi mdi-chevron-down"></i>
                                </template>
                                <b-dropdown-item>Dropdown Link</b-dropdown-item>
                                <b-dropdown-item>Dropdown Link</b-dropdown-item>
                            </b-dropdown>
                        </b-button-group>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mt-2">
                                <b-button-group vertical>
                                    <b-button variant="light">Top</b-button>
                                    <b-button variant="light">Middle</b-button>
                                    <b-button variant="light">Bottom</b-button>
                                </b-button-group>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mt-2">
                                <b-button-group vertical>
                                    <b-button variant="light">Button 1</b-button>
                                    <b-button variant="light">Button 2</b-button>
                                    <b-dropdown variant="light">
                                        <template slot="button-content">
                                            Button 3
                                            <i class="mdi mdi-chevron-down"></i>
                                        </template>
                                        <b-dropdown-item>Dropdown Link</b-dropdown-item>
                                        <b-dropdown-item>Dropdown Link</b-dropdown-item>
                                    </b-dropdown>
                                </b-button-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">File upload buttons</h4>
                    <p class="text-muted font-13">
                        Use the button classes on an
                        <code>&lt;a&gt;</code>,
                        <code>&lt;button&gt;</code>, or
                        <code>&lt;input&gt;</code> element.
                    </p>

                    <div class="fileupload btn btn-primary mt-1">
                        <span>Upload</span>
                        <input type="file" class="upload" />
                    </div>
                    <div class="fileupload btn btn-secondary mt-1 ml-1">
                        <span>
                            <i class="mdi mdi-cloud-upload mr-1"></i>Upload
                        </span>
                        <input type="file" class="upload" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
