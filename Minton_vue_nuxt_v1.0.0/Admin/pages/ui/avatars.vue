<script>
/**
 * Avatars component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Avatars',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Avatars',
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
                    <h4 class="header-title">Sizing - Images</h4>
                    <p class="sub-header">
                        Create and group avatars of different sizes and shapes with the css classes.
                        Using Bootstrap's naming convention, you can control size of avatar including standard avatar, or scale it up to different sizes.
                    </p>

                    <div class="row">
                        <div class="col-md-3">
                            <b-avatar rounded src="~/assets/images/users/avatar-2.jpg" size="sm"></b-avatar>
                            <p>
                                <code>size="sm" rounded</code>
                            </p>

                        </div>
                        <div class="col-md-3">
                            <b-avatar rounded src="~/assets/images/users/avatar-4.jpg" size="md"></b-avatar>
                            <p>
                                <code>size="md" rounded</code>
                            </p>
                        </div>

                        <div class="col-md-3">
                            <b-avatar rounded src="~/assets/images/users/avatar-5.jpg" size="lg"></b-avatar>
                            <p>
                                <code>size="lg" rounded</code>
                            </p>
                        </div>

                    </div> <!-- end row-->

                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Rounded Circle</h4>
                    <p class="sub-header">
                        Using an additional class <code>.rounded-circle</code> in <code>&lt;img&gt;</code> element creates the rounded avatar.
                    </p>

                    <div class="row">
                        <div class="col-md-4">
                            <b-avatar src="~/assets/images/users/avatar-7.jpg" alt="image" size="md"></b-avatar>
                            <p class="mt-1">
                                <code>size="md"</code>
                            </p>
                        </div>

                        <div class="col-md-4">
                            <b-avatar src="~/assets/images/users/avatar-8.jpg" alt="image" size="lg"></b-avatar>
                            <p>
                                <code>size="lg"</code>
                            </p>
                        </div>

                        <div class="col-md-4">
                            <b-avatar src="~/assets/images/users/avatar-9.jpg" alt="image" size="6em"></b-avatar>
                            <p class="mb-0">
                                <code> size="6em"</code>
                            </p>
                        </div>
                    </div> <!-- end row-->

                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Sizing - Background Color</h4>
                    <p class="sub-header">
                        Using utilities classes of background e.g. <code>bg-*</code> allows you to have any background color as well.
                    </p>

                    <div class="row">
                        <div class="col-md-3">
                            <b-avatar rounded size="sm" variant="primary">sm</b-avatar>

                            <p class="mb-2 font-14 mt-1">
                                Using <code>size="sm"</code>
                            </p>
                        </div>
                        <div class="col-md-3">
                            <b-avatar rounded size="md" class="bg-soft-info text-info"><span class="">MD</span></b-avatar>

                            <p class="mb-0 font-14 mt-1">
                                Using <code>size="md"</code>
                            </p>
                        </div>

                        <div class="col-md-3">
                            <b-avatar rounded size="lg" class="bg-danger font-22"><span class="">LG</span></b-avatar>
                            <p class="mb-0 font-14 mt-1">
                                Using <code>size="lg"</code>
                            </p>
                        </div>

                    </div> <!-- end row-->

                </div>
            </div>
        </div>
        <div class="col-xl-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Rounded Circle Background</h4>
                    <p class="sub-header">
                        Using an additional class <code>.rounded-circle</code> in <code>&lt;img&gt;</code> element creates the rounded avatar.
                    </p>

                    <div class="row">
                        <div class="col-md-4">
                            <b-avatar size="md" class="bg-soft-secondary text-secondary font-20"><span class="">MD</span></b-avatar>

                            <p class="mb-0 font-14 mt-1">
                                Using <code>size="md"</code>
                            </p>
                        </div>

                        <div class="col-md-4">
                            <b-avatar size="lg" variant="light" class="text-dark font-22"><span class="">LG</span></b-avatar>

                            <p class="mb-0 font-14 mt-1">
                                Using <code>size="lg"</code>
                            </p>
                        </div>

                    </div> <!-- end row-->

                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Images Shapes</h4>
                    <p class="sub-header">
                        Avatars with different sizes and shapes.
                    </p>

                    <div class="row">
                        <div class="col-sm-2">
                            <b-avatar rounded src="~/assets/images/small/img-2.jpg" alt="image" size="9em"></b-avatar>
                            <p class="mb-0">
                                <code>rounded</code>
                            </p>
                        </div>

                        <div class="col-sm-2 text-center">
                            <b-avatar rounded src="~/assets/images/users/avatar-5.jpg" alt="image" size="8em"></b-avatar>
                            <p class="mb-0">
                                <code>rounded</code>
                            </p>
                        </div>

                        <div class="col-sm-2 text-center">
                            <b-avatar square src="~/assets/images/users/avatar-7.jpg" alt="image" size="9em"></b-avatar>
                            <p class="mb-0">
                                <code>square</code>
                            </p>
                        </div>

                    </div> <!-- end row-->

                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
