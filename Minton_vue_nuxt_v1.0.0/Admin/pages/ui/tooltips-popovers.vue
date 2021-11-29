<script>
/**
 * Tooltips & Popovers component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: 'Tooltips & Popovers',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'UI',
                    href: '/',
                },
                {
                    text: 'Tooltips & Popovers',
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
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Popovers</h4>
                    <p class="sub-header font-13">Add small overlay content, like those found in iOS, to any element for housing light information.</p>

                    <div class="button-list">
                        <b-button v-b-popover.top="'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'" variant="light">Popover on top</b-button>
                        <b-button v-b-popover.bottom="'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'" variant="light">Popover on bottom</b-button>
                        <b-button v-b-popover.right="'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'" variant="light">Popover on right</b-button>
                        <b-button v-b-popover.left="'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'" variant="light">Popover on left</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Tooltips</h4>
                    <p class="sub-header font-13">Hover over the links below to see tooltips:</p>

                    <div class="button-list">
                        <b-button id="tooltip-top" variant="light">Tooltip on top</b-button>
                        <b-tooltip target="tooltip-top">Tooltip on top</b-tooltip>
                        <b-button id="tooltip-button" variant="light">Tooltip on bottom</b-button>
                        <b-tooltip target="tooltip-button" placement="bottom">Tooltip on bottom</b-tooltip>
                        <b-button id="tooltip-left-button" variant="light">Tooltip on left</b-button>
                        <b-tooltip target="tooltip-left-button" placement="left">Tooltip on left</b-tooltip>
                        <b-button id="tooltip-right-button" variant="light">Tooltip on right</b-button>
                        <b-tooltip target="tooltip-right-button" placement="right">Tooltip on right</b-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
