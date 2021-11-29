<script>
/**
 * Form Quill Editor component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Quill Editor",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "Forms",
                    href: "/",
                },
                {
                    text: "Quill Editor",
                    active: true,
                },
            ],
            editorOption: {
                // Some Quill options...
                theme: "snow",
                modules: {
                    toolbar: [
                        [{
                                font: [],
                            },
                            {
                                size: [],
                            },
                        ],
                        ["bold", "italic", "underline", "strike"],
                        [{
                                color: [],
                            },
                            {
                                background: [],
                            },
                        ],
                        [{
                                script: "super",
                            },
                            {
                                script: "sub",
                            },
                        ],
                        [{
                                header: [false, 1, 2, 3, 4, 5, 6],
                            },
                            "blockquote",
                            "code-block",
                        ],
                        [{
                                list: "ordered",
                            },
                            {
                                list: "bullet",
                            },
                            {
                                indent: "-1",
                            },
                            {
                                indent: "+1",
                            },
                        ],
                        [
                            "direction",
                            {
                                align: [],
                            },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                    ],
                },
            },
            option: {
                theme: "bubble",
                modules: {
                    toolbar: [
                        ["bold", "italic", "link"],
                        [{
                                header: 1,
                            },
                            {
                                header: 2,
                            },
                            "blockquote",
                        ],
                    ],
                },
            },
        };
    },
    middleware: 'router-auth'
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Snow Editor</h4>
                    <p class="sub-header">Snow is a clean, flat toolbar theme.</p>
                    <quill-editor style="min-height: 250px;" :options="editorOption" />
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bubble Editor</h4>
                    <p class="sub-header">Bubble is a simple tooltip based theme.</p>
                    <quill-editor style="min-height: 250px;" :options="option" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
