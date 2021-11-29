<script>
/**
 * Embed Video component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Embed Video',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Embed Video',
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
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Responsive embed video 21:9</h4>
                    <p class="sub-header font-13">Use class <code>.embed-responsive-21by9</code></p>

                    <!-- 21:9 aspect ratio -->
                    <div class="embed-responsive embed-responsive-21by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&amp;showinfo=0&amp;controls=0"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Responsive embed video 16:9</h4>
                    <p class="sub-header font-13">Use class <code>.embed-responsive-16by9</code></p>

                    <!-- 16:9 aspect ratio -->
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Responsive embed video 4:3</h4>
                    <p class="sub-header font-13">Use class <code>.embed-responsive-4by3</code></p>

                    <!-- 4:3 aspect ratio -->
                    <div class="embed-responsive embed-responsive-4by3">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Responsive embed video 1:1</h4>
                    <p class="sub-header font-13">Use class <code>.embed-responsive-1by1</code></p>

                    <!-- 1:1 aspect ratio -->
                    <div class="embed-responsive embed-responsive-1by1">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/PrUxWZiQfy4?ecver=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->
</div>
</template>
