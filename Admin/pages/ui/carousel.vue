<script>
/**
 * Carousel component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Carousel',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Carousel',
                    active: true,
                },
            ],
            slide: 0,
            slide1: 0,
            sliding: null,
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
                    <h4 class="header-title">Slides only</h4>
                    <p class="sub-header">
                        Here’s a carousel with slides only.
                        Note the presence of the
                        <code>.d-block</code>
                        and
                        <code>.img-fluid</code> on carousel images
                        to prevent browser default image alignment.
                    </p>
                    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000">
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-1.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-2.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-3.jpg')"></b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">With controls</h4>
                    <p class="sub-header">Adding in the previous and next controls:</p>
                    <b-carousel style="text-shadow: 0px 0px 2px #000" controls>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-4.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-5.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-1.jpg')"></b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">With indicators</h4>
                    <p class="sub-header">
                        You can also add the indicators to the
                        carousel, alongside the controls, too.
                    </p>
                    <b-carousel style="text-shadow: 0px 0px 2px #000" controls indicators>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-3.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-2.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-1.jpg')"></b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">With captions</h4>
                    <p class="sub-header">
                        Add captions to your slides easily with the
                        <code>.carousel-caption</code> element within any
                        <code>.carousel-item</code>.
                    </p>
                    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab" style="text-shadow: 1px 1px 2px #333;">
                        <!-- Text slides with image -->
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-5.jpg')">
                            <h3 class="text-white">First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </b-carousel-slide>

                        <!-- Slides with custom text -->
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-3.jpg')">
                            <h3 class="text-white">Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </b-carousel-slide>

                        <!-- Slides with image only -->
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-2.jpg')">
                            <h3 class="text-white">Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Crossfade</h4>
                    <p class="sub-header">
                        Add
                        <code>.carousel-fade</code> to your carousel to animate slides with a fade transition instead of a slide.
                    </p>
                    <b-carousel style="text-shadow: 0px 0px 2px #000" controls fade>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-1.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-2.jpg')"></b-carousel-slide>
                        <b-carousel-slide :img-src="require('~/assets/images/small/img-3.jpg')"></b-carousel-slide>
                    </b-carousel>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
