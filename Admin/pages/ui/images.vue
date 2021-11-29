<script>
/**
 * Images component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Images',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Images',
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
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-6">
                            <h4 class="header-title">Images shapes</h4>
                            <p class="sub-header">
                                Add classes to an <code>&lt;img&gt;</code> element to easily style
                                images in any project.
                            </p>

                            <div class="row">
                                <div class="col-sm-4">
                                    <b-img src="~/assets/images/small/img-1.jpg" width="170" rounded alt="image"></b-img>
                                    <p class="mb-0">
                                        <code>rounded</code>
                                    </p>
                                </div>

                                <div class="col-sm-4 text-center">
                                    <b-img src="~/assets/images/users/avatar-6.jpg" width="120" rounded="circle" alt="image"></b-img>
                                    <p class="mb-0">
                                        <code>rounded="circle"</code>
                                    </p>
                                </div>

                                <div class="col-sm-4">
                                    <b-img thumbnail src="~/assets/images/small/img-3.jpg" width="200" alt="image"></b-img>
                                    <p class="mb-0">
                                        <code>thumbnail</code>
                                    </p>
                                </div>
                            </div>
                        </div> <!-- end col-->

                        <div class="col-xl-6 mt-3 mt-xl-0">
                            <h4 class="header-title">Image sizes</h4>
                            <p class="sub-header">
                                Add classes to an <code>&lt;img&gt;</code> element to easily style
                                images in any project.
                            </p>

                            <div class="row">
                                <div class="col-sm-3">
                                    <img src="~/assets/images/users/avatar-2.jpg" alt="image" class="img-fluid avatar-xs rounded">
                                    <p class="mb-0">
                                        <code>.avatar-xs</code>
                                    </p>
                                    <img src="~/assets/images/users/avatar-2.jpg" alt="image" class="img-fluid avatar-sm rounded mt-2">
                                    <p class="mb-0">
                                        <code>.avatar-sm</code>
                                    </p>
                                </div>

                                <div class="col-sm-3">
                                    <img src="~/assets/images/users/avatar-2.jpg" alt="image" class="img-fluid avatar-md rounded">
                                    <p class="mb-0">
                                        <code>.avatar-md</code>
                                    </p>
                                </div>

                                <div class="col-sm-3">
                                    <img src="~/assets/images/users/avatar-2.jpg" alt="image" class="img-fluid avatar-lg rounded">
                                    <p class="mb-0">
                                        <code>.avatar-lg</code>
                                    </p>
                                </div>

                                <div class="col-sm-3">
                                    <img src="~/assets/images/users/avatar-2.jpg" alt="image" class="img-fluid avatar-xl rounded">
                                    <p class="mb-0">
                                        <code>.avatar-xl</code>
                                    </p>
                                </div>
                            </div>

                        </div> <!-- end col -->
                    </div> <!-- end row -->
                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Default media object</h4>
                    <p class="sub-header">The default media displays a media object
                        (images, video, audio) to the left or right of a content block.</p>

                    <b-media class="mb-3">
                        <template v-slot:aside>
                            <b-img rounded="circle" src="~/assets/images/users/avatar-10.jpg" alt="Generic placeholder image" height="48"></b-img>
                        </template>
                        <h5 class="mt-0">Media heading</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </b-media>

                    <b-media class="mb-3">
                        <template v-slot:aside>
                            <b-img class="d-flex" rounded="circle" src="~/assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height="48"></b-img>
                        </template>
                        <h5 class="mt-0">Media heading</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        <b-media class="mt-3">
                            <template v-slot:aside>
                                <b-img src="~/assets/images/users/avatar-3.jpg" rounded="circle" alt="Generic placeholder image" height="48"></b-img>

                            </template>
                            <h5 class="mt-0">Media heading</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

                        </b-media>

                    </b-media>
                    <b-media right-align vertical-align="center">
                        <template v-slot:aside>
                            <b-img class="d-flex ml-3" rounded="circle" src="~/assets/images/users/avatar-4.jpg" alt="Generic placeholder image" height="48"></b-img>
                        </template>
                        <h5 class="mt-0 mb-1">Media object</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </b-media>

                </div>
            </div> <!-- end card -->
        </div> <!-- end col -->
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Media alignment</h4>
                    <p class="sub-header">The images or other media can be aligned top,
                        middle, or bottom. The default is top aligned.</p>

                    <div class="media mb-3">

                        <img class="d-flex align-self-start rounded mr-3" src="~/assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="48">
                        <div class="media-body">
                            <h5 class="mt-0">Top-aligned media</h5>
                            <p class="mb-1">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                            <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>

                    <div class="media mb-3">
                        <img class="d-flex align-self-center rounded mr-3" src="~/assets/images/users/avatar-6.jpg" alt="Generic placeholder image" height="48">
                        <div class="media-body">
                            <h5 class="mt-0">Center-aligned media</h5>
                            <p class="mb-1">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                            <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>

                    <div class="media">
                        <img class="d-flex align-self-end rounded mr-3" src="~/assets/images/users/avatar-7.jpg" alt="Generic placeholder image" height="48">
                        <div class="media-body">
                            <h5 class="mt-0">Bottom-aligned media</h5>
                            <p class="mb-1">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                            <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        </div>
                    </div>
                </div>
            </div> <!-- end card -->
        </div> <!-- end col  -->
    </div>
    <!--  end row -->
</div>
</template>
