<script>
/**
 * Ribbons component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Ribbons',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Ribbons',
                    active: true,
                },
            ],
            ribbonsData: [{
                    title: 'Purple Header',
                    color: 'purple',
                    icon: 'mdi mdi-access-point',
                    textalign: 'left',
                    titlealign: 'right'
                },
                {
                    title: 'Primary Header',
                    color: 'primary',
                    icon: 'mdi mdi-access-point',
                    textalign: 'left',
                    titlealign: 'right'
                },
                {
                    title: 'Success Header',
                    color: 'success',
                    icon: 'mdi mdi-access-point',
                    textalign: 'left',
                    titlealign: 'right'
                },
                {
                    title: 'Info Header',
                    color: 'info',
                    icon: 'mdi mdi-access-point',
                    textalign: 'right',
                    titlealign: 'left'
                },
                {
                    title: 'Warning Header',
                    color: 'warning',
                    icon: 'mdi mdi-access-point',
                    textalign: 'right',
                    titlealign: 'left'
                },
                {
                    title: 'Danger Header',
                    color: 'danger',
                    icon: 'mdi mdi-access-point',
                    textalign: 'right',
                    titlealign: 'left'
                },
                {
                    title: 'Pink Header',
                    color: 'pink',
                    icon: 'mdi mdi-access-point',
                    textalign: 'left',
                    titlealign: 'right',
                    shape: true
                },
                {
                    title: 'Secondary Header',
                    color: 'secondary',
                    icon: 'mdi mdi-access-point',
                    textalign: 'right',
                    titlealign: 'left',
                    shape: true
                },
                {
                    title: 'Dark Header',
                    color: 'dark',
                    icon: 'mdi mdi-access-point',
                    textalign: 'right',
                    titlealign: 'left',
                    shape: true
                },
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
        <div v-for="ribbon in ribbonsData" :key="ribbon.title" class="col-lg-4">
            <div class="card ribbon-box">
                <div class="card-body">
                    <div :class="`ribbon ribbon-${ribbon.color} float-${ribbon.textalign}`">
                        <i :class="`${ribbon.icon} mr-1`"></i>
                        {{ribbon.color | titlecase}}
                    </div>
                    <h5 :class="`text-${ribbon.color} float-${ribbon.titlealign} mt-0`">{{ ribbon.title }}</h5>
                    <div class="ribbon-content">
                        <p class="mb-0">
                            Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at
                            volutpat. In egestas
                            mattis dui. Aliquam mattis dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
                            dapibus odio.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div v-for="ribbon in ribbonsData" :key="ribbon.title" class="col-lg-4">
            <div class="card ribbon-box">
                <div class="card-body">
                    <div :class="`ribbon-two ribbon-two-${ribbon.color}`">
                        <span>{{ribbon.color | titlecase}}</span>
                    </div>
                    <p class="mb-0">
                        Quisque nec turpis at urna dictum luctus. Suspendisse convallis dignissim eros at
                        volutpat. In egestas mattis dui. Aliquam mattis dictum aliquet. Nulla sapien mauris, eleifend et sem
                        ac, commodo dapibus odio. Vivamus pretium nec odio cursus elementum. Suspendisse molestie
                        ullamcorper ornare.
                    </p>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
</div>
</template>
