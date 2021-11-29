<script>
/**
 * Scrollspy component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Scrollspy",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "Extended UI",
                    href: "/",
                },
                {
                    text: "Scrollspy",
                    active: true,
                },
            ],
            text: `
          Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.
        `,
            text2: `Labore sit culpa commodo elit adipisicing sit aliquip elit proident voluptate minim mollit nostrud aute reprehenderit do. Mollit excepteur eu Lorem ipsum anim commodo sint labore Lorem in exercitation velit incididunt. Occaecat consectetur nisi in occaecat proident minim enim sunt reprehenderit exercitation cupidatat et do officia. Aliquip consequat ad labore labore mollit ut amet. Sit pariatur tempor proident in veniam culpa aliqua excepteur elit magna fugiat eiusmod amet officia.`,
        };
    },
    methods: {
        /**
         * Scrollspy
         */
        scrollIntoView(evt) {
            evt.preventDefault();
            const href = evt.target.getAttribute("href");
            const el = href ? document.querySelector(href) : null;
            if (el) {
                this.$refs.content.scrollTop = el.offsetTop;
            }
        },
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
                    <h4 class="header-title">Scrollspy</h4>
                    <p class="text-muted font-14 mb-3">Scroll the area below the navbar and watch the active class change. The dropdown items will be highlighted as well.</p>

                    <div>
                        <b-card no-body>
                            <b-nav slot="header" v-b-scrollspy:nav-scroller pills>
                                <b-nav-item href="#fat" @click="scrollIntoView">@fat</b-nav-item>
                                <b-nav-item href="#mdo" @click="scrollIntoView">@mdo</b-nav-item>
                                <b-nav-item-dropdown right-alignment>
                                    <template slot="button-content">
                                        Dropdown
                                        <i class="mdi mdi-chevron-down"></i>
                                    </template>
                                    <b-dropdown-item href="#one" @click="scrollIntoView">one</b-dropdown-item>
                                    <b-dropdown-item href="#two" @click="scrollIntoView">two</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item href="#three" @click="scrollIntoView">three</b-dropdown-item>
                                </b-nav-item-dropdown>
                            </b-nav>

                            <b-card-body id="nav-scroller" ref="content" style="position:relative; height:200px; overflow-y:scroll;">
                                <h4 id="fat">@fat</h4>
                                <p>{{ text }}</p>
                                <h4 id="mdo">@mdo</h4>
                                <p>{{ text }}</p>
                                <h4 id="one">one</h4>
                                <p>{{ text }}</p>
                                <h4 id="two">two</h4>
                                <p>{{ text }} {{ text}}</p>
                                <h4 id="three">three</h4>
                                <p>{{ text }} {{ text }} {{ text }}</p>
                            </b-card-body>
                        </b-card>
                    </div>
                </div>
            </div>
            <!-- end card-box-->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Example with nested nav</h4>
                    <p class="sub-header">
                        Scrollspy also works with nested
                        <code>.nav</code>s.
                        If a nested
                        <code>.nav</code> is
                        <code>.active</code>, its parents will also be
                        <code>.active</code>. Scroll the area next to the navbar and watch the active
                        class change.
                    </p>
                    <b-container fluid>
                        <b-row>
                            <b-col cols="4">
                                <b-navbar v-b-scrollspy:scrollspy-nested class="flex-column">
                                    <b-navbar-brand href="#">Navbar</b-navbar-brand>
                                    <b-nav pills vertical>
                                        <b-nav-item href="#item-1">Item 1</b-nav-item>
                                        <b-nav pills vertical>
                                            <b-nav-item class="ml-3 my-1" href="#item-1-1">Item 1-1</b-nav-item>
                                            <b-nav-item class="ml-3 my-1" href="#item-1-2">Item 1-2</b-nav-item>
                                        </b-nav>
                                        <b-nav-item href="#item-2">Item 2</b-nav-item>
                                        <b-nav-item href="#item-3">Item 3</b-nav-item>
                                        <b-nav pills vertical>
                                            <b-nav-item class="ml-3 my-1" href="#item-3-1">Item 3-1</b-nav-item>
                                            <b-nav-item class="ml-3 my-1" href="#item-3-2">Item 3-2</b-nav-item>
                                        </b-nav>
                                    </b-nav>
                                </b-navbar>
                            </b-col>

                            <b-col cols="8">
                                <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto">
                                    <h4 id="item-1" style>Item 1</h4>
                                    <p>{{ text2 }}</p>
                                    <h5 id="item-1-1" style>Item 1-1</h5>
                                    <p>{{ text2 }}</p>
                                    <h5 id="item-1-2" style>Item 2-2</h5>
                                    <p>{{ text2 }}</p>
                                    <h4 id="item-2" style>Item 2</h4>
                                    <p>{{ text2 }}</p>
                                    <h4 id="item-3" style>Item 3</h4>
                                    <p>{{ text2 }}</p>
                                    <h5 id="item-3-1" style>Item 3-1</h5>
                                    <p>{{ text2 }}</p>
                                    <h5 id="item-3-2" style>Item 3-2</h5>
                                    <p>{{ text2 }}</p>
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Example with list-group</h4>

                    <p class="sub-header">
                        Scrollspy also works with nested
                        <code>.nav</code>s.
                        If a nested
                        <code>.nav</code> is
                        <code>.active</code>, its parents will also be
                        <code>.active</code>. Scroll the area next to the navbar and watch the active
                        class change.
                    </p>
                    <b-row>
                        <b-col cols="4">
                            <b-list-group v-b-scrollspy:listgroup-ex>
                                <b-list-group-item href="#list-item-1">Item 1</b-list-group-item>
                                <b-list-group-item href="#list-item-2">Item2</b-list-group-item>
                                <b-list-group-item href="#list-item-3">Item 3</b-list-group-item>
                                <b-list-group-item href="#list-item-4">Item 4</b-list-group-item>
                                <b-list-group-item href="#list-item-5">Item 5</b-list-group-item>
                            </b-list-group>
                        </b-col>

                        <b-col cols="8">
                            <div id="listgroup-ex" style="position:relative; overflow-y:auto; height:300px">
                                <h4 id="list-item-1">Item 1</h4>
                                <p>{{ text }}</p>
                                <h4 id="list-item-2">Item 2</h4>
                                <p>{{ text }}</p>
                                <h4 id="list-item-3">Item 3</h4>
                                <p>{{ text }}</p>
                                <h4 id="list-item-4">Item 4</h4>
                                <p>{{ text }}</p>
                                <h4 id="list-item-5">Item 5</h4>
                                <p>{{ text }}</p>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
