<script>
/**
 * Contacts-list component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Contacts",
            items: [{
                    text: "Minton",
                    href: "/"
                },
                {
                    text: "Apps",
                    href: "/"
                },
                {
                    text: "Contacts",
                    active: true
                }
            ],
            contacts: [{
                    profile: require("~/assets/images/users/avatar-3.jpg"),
                    name: "Denver Barker",
                    designation: "@Founder ",
                    site: "websitename.com"
                },
                {
                    name: "Robert McBride",
                    designation: "@Webdesigner",
                    site: "abcweb.com"
                },
                {
                    profile: require("~/assets/images/users/avatar-4.jpg"),
                    name: "Peter White",
                    designation: "@Webdesigner",
                    site: "mywebs.com"
                },
                {
                    profile: require("~/assets/images/users/avatar-5.jpg"),
                    name: "Ronald Myrick",
                    designation: "@Director",
                    site: "profileq.com"
                },
                {
                    profile: require("~/assets/images/users/avatar-6.jpg"),
                    name: "Paul Halpern",
                    designation: "@Manager",
                    site: "coolweb.com"
                },
                {
                    profile: require("~/assets/images/users/avatar-7.jpg"),
                    name: "Ricky Atwell",
                    designation: "@Programmer",
                    site: "supported.com"
                },
                {
                    name: "James Richards",
                    designation: "@Webdeveloper",
                    site: "website.com"
                },
                {
                    profile: require("~/assets/images/users/avatar-8.jpg"),
                    name: "Charles Martinez",
                    designation: "@Webdesigner",
                    site: "demosite.com.com"
                }
            ]
        };
    },
    middleware: 'router-auth'
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row mb-2">
        <div class="col-sm-4">
            <a href="javascript:void(0);" class="btn btn-danger mb-2"><i class="mdi mdi-plus-circle mr-2"></i> Add New</a>
        </div>
        <div class="col-sm-8">
            <div class="float-sm-right">
                <form class="form-inline">
                    <div class="form-group mr-2">
                        <label for="membersearch-input" class="sr-only">Search</label>
                        <input type="search" class="form-control" id="membersearch-input" placeholder="Search...">
                    </div>
                    <button type="button" class="btn btn-success mb-2 mb-sm-0"><i class="mdi mdi-cog"></i></button>
                </form>

            </div>
        </div><!-- end col-->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-xl-3 col-sm-6" v-for="(item, index) in contacts" :key="index">
            <div class="text-center card">
                <div class="card-body">

                    <b-dropdown class="float-right" variant="black" toggle-class="text-body p-0" right>
                        <template v-slot:button-content>
                            <i class="mdi mdi-dots-vertical font-20"></i>
                        </template>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else here</b-dropdown-item>
                    </b-dropdown>
                    <img v-if="item.profile" :src="item.profile" class="rounded-circle img-thumbnail avatar-xl mt-1" alt="profile-image">
                    <div class="avatar-xl mx-auto mt-1" v-if="!item.profile">
                        <div class="avatar-title bg-light rounded-circle">
                            <i class="mdi mdi-account h1 m-0 text-body"></i>
                        </div>
                    </div>
                    <h4 class="mt-3 mb-1">
                        <nuxt-link to="/contacts/profile" class="text-dark">{{item.name}}</nuxt-link>
                    </h4>
                    <p class="text-muted">{{item.designation}} <span> | </span> <span> <a href="#" class="text-pink">{{item.site}}</a> </span></p>

                    <ul class="social-list list-inline mt-4 mb-2">
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-purple text-purple"><i class="mdi mdi-facebook"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="mdi mdi-google"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="mdi mdi-github"></i></a>
                        </li>
                    </ul>

                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row mb-4">
        <div class="col-sm-6">
            <div>
                <h5 class="font-14 text-body">Showing Page 2 Of 12</h5>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="float-sm-right">
                <ul class="pagination pagination-rounded mb-sm-0">
                    <li class="page-item disabled">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">1</a>
                    </li>
                    <li class="page-item active">
                        <a href="#" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">4</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link">5</a>
                    </li>
                    <li class="page-item">
                        <a href="#" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
