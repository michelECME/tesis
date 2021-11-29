<script>
/**
 * Form elements component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
        };
    },
    data() {
        return {
            title: "Form Elements",
            items: [{
                    text: "Minton",
                    href: "/",
                },
                {
                    text: "Forms",
                    href: "/",
                },
                {
                    text: "Form Elements",
                    active: true,
                },
            ],
            checked: true,
            checked2: false,
            status: 'accepted',
            status2: 'not_accepted',
            selected: 'A'
        };
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
                    <h4 class="header-title">Input Types</h4>
                    <p class="sub-header">
                        Most common form control, text-based input fields. Includes support for all HTML5 types:
                        <code>text</code>,
                        <code>password</code>,
                        <code>datetime</code>,
                        <code>datetime-local</code>,
                        <code>date</code>,
                        <code>month</code>,
                        <code>time</code>,
                        <code>week</code>,
                        <code>number</code>,
                        <code>email</code>,
                        <code>url</code>,
                        <code>search</code>,
                        <code>tel</code>, and
                        <code>color</code>.
                    </p>

                    <div class="row">
                        <div class="col-12">
                            <div class="p-2">
                                <form class="form-horizontal" role="form">
                                    <b-form-group id="example text" label-cols-sm="2" label-cols-lg="2" label="Text" label-for="text">
                                        <b-form-input for="text" value="Some text value..."></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-email" label-cols-sm="2" label-cols-lg="2" label="Email" label-for="email">
                                        <b-form-input id="email" placeholder="Email"></b-form-input>
                                    </b-form-group>
                                    <b-form-group id="example-password" label-cols-sm="2" label-cols-lg="2" label="Password" label-for="pwd">
                                        <b-form-input id="pwd" type="password" value="password"></b-form-input>
                                    </b-form-group>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="password">Show/Hide Password</label>
                                        <div class="col-sm-10">
                                            <div class="input-group input-group-merge">
                                                <input type="password" id="password" class="form-control" placeholder="Enter your password" />
                                                <div class="input-group-append" data-password="false">
                                                    <div class="input-group-text">
                                                        <span class="password-eye"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <b-form-group id="example-placeholder" label-cols-sm="2" label-cols-lg="2" label="Placeholder" label-for="placeholder">
                                        <b-form-input id="placeholder" type="password" placeholder="placeholder"></b-form-input>
                                    </b-form-group>
                                    <b-form-group id="example-textarea" label-cols-sm="2" label-cols-lg="2" label="textarea" label-for="textarea">
                                        <b-form-textarea id="textarea" rows="4"></b-form-textarea>
                                    </b-form-group>
                                    <b-form-group id="example-number" label-cols-sm="2" label-cols-lg="2" label="Number" label-for="number">
                                        <b-form-input id="number" value="42" type="number" name="number"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-date-time" label-cols-sm="2" label-cols-lg="2" label="Date and time" label-for="date-time">
                                        <b-form-input id="date-time" value="2019-08-19T13:45:00" type="datetime-local"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-date" label-cols-sm="2" label-cols-lg="2" label="Date" label-for="date">
                                        <b-form-input id="date" value="2019-08-19" type="date"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-month" label-cols-sm="2" label-cols-lg="2" label="Month" label-for="month">
                                        <b-form-input id="month" value="2019-08" type="month"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-week" label-cols-sm="2" label-cols-lg="2" label="Week" label-for="week">
                                        <b-form-input id="week" value="2019-W33" type="week"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-time" label-cols-sm="2" label-cols-lg="2" label="Time" label-for="time">
                                        <b-form-input id="time" value="13:45:00" type="time"></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="example-color" label-cols-sm="2" label-cols-lg="2" label="Color" label-for="color">
                                        <b-form-input id="color" type="color" name="color" value="#556ee6"></b-form-input>
                                    </b-form-group>

                                    <div class="form-group row">
                                        <label class="col-md-2 col-form-label">Select</label>
                                        <div class="col-md-10">
                                            <select class="form-control">
                                                <option>Select</option>
                                                <option>Large select</option>
                                                <option>Small select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-0">
                                        <label class="col-md-2 col-form-label">Custom Select</label>
                                        <div class="col-md-10">
                                            <select class="custom-select">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->
                </div>
            </div>
            <!-- end card -->
        </div>
        <!-- end col -->
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Input Types</h4>
                    <p class="sub-header">
                        Most common form control, text-based input fields. Includes support for all HTML5 types:
                        <code>text</code>,
                        <code>password</code>,
                        <code>datetime</code>,
                        <code>datetime-local</code>,
                        <code>date</code>,
                        <code>month</code>,
                        <code>time</code>,
                        <code>week</code>,
                        <code>number</code>,
                        <code>email</code>,
                        <code>url</code>,
                        <code>search</code>,
                        <code>tel</code>, and
                        <code>color</code>.
                    </p>

                    <div class="row">
                        <div class="col-12">
                            <div class="p-2">
                                <form class="form-horizontal" role="form">
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="simpleinput">Text</label>
                                        <div class="col-sm-10">
                                            <input id="simpleinput" type="text" class="form-control" value="Some text value..." />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-email">Email</label>
                                        <div class="col-sm-10">
                                            <input id="example-email" type="email" name="example-email" class="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-password">Password</label>
                                        <div class="col-sm-10">
                                            <input id="example-password" type="password" class="form-control" value="password" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-placeholder">Placeholder</label>
                                        <div class="col-sm-10">
                                            <input id="example-placeholder" type="text" class="form-control" placeholder="placeholder" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-textarea">Text area</label>
                                        <div class="col-sm-10">
                                            <textarea id="example-textarea" class="form-control" rows="5"></textarea>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Readonly</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" readonly value="Readonly value" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Disabled</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled value="Disabled value" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-static">Static control</label>
                                        <div class="col-sm-10">
                                            <input id="example-static" type="text" readonly class="form-control-plaintext" value="email@example.com" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-helping">Helping text</label>
                                        <div class="col-sm-10">
                                            <input id="example-helping" type="text" class="form-control" placeholder="Helping text" />
                                            <span class="help-block">
                                                <small>A block of help text that breaks onto a new line and may extend beyond one line.</small>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Input Select</label>
                                        <div class="col-sm-10">
                                            <select class="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                            <h6>Multiple select</h6>
                                            <select multiple class="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-fileinput">Default file input</label>
                                        <div class="col-sm-10">
                                            <input id="example-fileinput" type="file" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-date">Date</label>
                                        <div class="col-sm-10">
                                            <input id="example-date" class="form-control" type="date" name="date" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-month">Month</label>
                                        <div class="col-md-10">
                                            <input id="example-month" class="form-control" type="month" name="month" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-time">Time</label>
                                        <div class="col-md-10">
                                            <input id="example-time" class="form-control" type="time" name="time" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-week">Week</label>
                                        <div class="col-md-10">
                                            <input id="example-week" class="form-control" type="week" name="week" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-number">Number</label>
                                        <div class="col-md-10">
                                            <input id="example-number" class="form-control" type="number" name="number" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">URL</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="url" name="url" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Search</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="search" name="search" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Tel</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="tel" name="tel" />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label" for="example-color">Color</label>
                                        <div class="col-md-10">
                                            <input id="example-color" class="form-control" type="color" name="color" value="#3bafda" />
                                        </div>
                                    </div>

                                    <div class="form-group row mb-0">
                                        <label class="col-sm-2 col-form-label" for="example-range">Range</label>
                                        <div class="col-md-10">
                                            <b-form-input id="example-range" :v-model="5" type="range" min="0" max="20" step="2"></b-form-input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- end row -->
                </div>
                <!-- end card-body -->
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="header-title">Select menu</h4>
                            <p class="sub-header">
                                Custom
                                <code>&lt;select&gt;</code> menus need only a custom class,
                                <code>.custom-select</code> to trigger the custom styles.
                            </p>

                            <select class="custom-select mt-3">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                            <h4 class="header-title mt-4">Switches</h4>
                            <p class="sub-header">
                                A switch has the markup of a custom checkbox but uses the
                                <code>.custom-switch</code> class to render a toggle switch. Switches also support the
                                <code>disabled</code> attribute.
                            </p>
                            <b-form-checkbox v-model="checked" name="check-button" switch>
                                Toggle this switch element
                            </b-form-checkbox>
                            <b-form-checkbox v-model="checked2" name="check-button" switch class="mt-1" disabled>
                                Disabled switch element
                            </b-form-checkbox>
                        </div>

                        <div class="col-md-6">
                            <h4 class="header-title">Checkboxes and radios</h4>
                            <div class="mt-3">
                                <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                                    Check this custom checkbox
                                </b-form-checkbox>
                                <b-form-checkbox id="checkbox-2" v-model="status2" name="checkbox-2" value="accepted" unchecked-value="not_accepted">
                                    Check this custom checkbox
                                </b-form-checkbox>

                            </div>
                            <div class="mt-3">
                                <b-form-group>
                                    <b-form-radio v-model="selected" name="some-radios" value="A">Toggle this custom radio</b-form-radio>
                                    <b-form-radio v-model="selected" name="some-radios" value="B">Or toggle this other custom radio</b-form-radio>
                                </b-form-group>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card-body -->
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Input Sizes & Group</h4>
                    <p class="sub-header">
                        Set heights using classes like
                        <code>.input-lg</code>, and set widths using grid column classes like
                        <code>.col-lg-*</code>.
                    </p>

                    <div class="p-2">
                        <form role="form" class="form-horizontal">
                            <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Small" label-for="input-small">
                                <b-form-input type="text" id="input-small" size="sm" placeholder="sm"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols="4" label-cols-lg="2" label="Default" label-for="input-default">
                                <b-form-input type="text" id="input-default" placeholder="Normal"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Large" label-for="input-lg">
                                <b-form-input type="text" id="input-lg" size="lg" placeholder="lg"></b-form-input>
                            </b-form-group>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Grid Sizes</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" placeholder=".col-sm-4" />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Static</label>
                                <div class="col-sm-10">
                                    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                                        <b-input id="inline-form-input-username" placeholder="Username"></b-input>
                                    </b-input-group>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Dropdowns</label>
                                <div class="col-sm-10">
                                    <div class="input-group mb-3">
                                        <b-dropdown class="input-group-prepend" variant="primary">
                                            <template v-slot:button-content>
                                                Dropdown
                                                <i class="mdi mdi-chevron-down"></i>
                                            </template>
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                            <div role="separator" class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Separated link</a>
                                        </b-dropdown>
                                        <input type="text" class="form-control" placeholder aria-label aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <label class="col-sm-2 col-form-label">Buttons</label>
                                <div class="col-sm-10">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <button class="btn btn-dark waves-effect waves-light" type="button">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- end card-body -->
            </div>
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Basic Example</h4>

                    <form role="form">
                        <b-form-group id="fieldset-1" description="We'll never share your email with anyone else." label="Email address" label-for="exampleInputEmail1">
                            <b-form-input id="exampleInputEmail1" type="email" placeholder="Enter email"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Password" label-for="exampleInputPassword1">
                            <b-form-input id="exampleInputPassword1" type="password" placeholder="Password"></b-form-input>
                        </b-form-group>
                        <div class="form-group">
                            <div class="checkbox">
                                <input id="checkbox0" type="checkbox" />
                                <label for="checkbox0">Check me out</label>
                            </div>
                        </div>
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </form>
                </div>
            </div>
        </div>
        <!-- end col -->

        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-3">Horizontal form</h4>

                    <form class="form-horizontal" role="form">
                        <b-form-group label-cols-sm="4" label-cols-lg="3" label="Email" label-for="inputEmail3">
                            <b-form-input type="email" id="inputEmail3" placeholder="Email"></b-form-input>
                        </b-form-group>
                        <b-form-group label-cols-sm="4" label-cols-lg="3" label="Password" label-for="inputPassword3">
                            <b-form-input type="password" id="inputPassword3" placeholder="Password"></b-form-input>
                        </b-form-group>
                        <b-form-group label-cols-sm="4" label-cols-lg="3" label="Re Password" label-for="inputPassword5">
                            <b-form-input type="password" id="inputPassword5" placeholder="Retype Password"></b-form-input>
                        </b-form-group>

                        <div class="form-group row justify-content-end">
                            <div class="col-sm-9">
                                <div class="checkbox checkbox-primary">
                                    <input id="checkbox2" type="checkbox" />
                                    <label for="checkbox2">Check me out !</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-0 justify-content-end row">
                            <div class="col-sm-9">
                                <b-button variant="info" type="submit">Sign in</b-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

    <!-- Inline Form -->
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Inline Form</h4>
                    <p class="sub-header">
                        Add
                        <code>.form-inline</code> to your form (which doesn't have to be a
                        <code>&lt;form&gt;</code>)
                        for left-aligned and inline-block controls.
                        <strong>
                            This only applies to forms within viewports
                            that are at least 768px wide.
                        </strong>
                    </p>
                    <div class="row">
                        <div class="col-sm-12">
                            <b-form inline>
                                <b-form-group label-for="staticEmail2">
                                    <b-form-input readonly value="email@example.com" type="text" id="staticEmail2"></b-form-input>
                                </b-form-group>
                                <b-form-group label-for="inputPassword2" class="mx-sm-3">
                                    <b-form-input type="password" id="inputPassword2" placeholder="Password"></b-form-input>
                                </b-form-group>
                                <b-button variant="primary">Confirm identity</b-button>
                            </b-form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <h6 class="font-13 mt-4">Auto-sizing</h6>

                            <b-form inline>
                                <label class="sr-only" for="inline-form-input-name">Name</label>
                                <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-input>

                                <label class="sr-only" for="inline-form-input-username2">Username</label>
                                <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                                    <b-input id="inline-form-input-username2" placeholder="Username"></b-input>
                                </b-input-group>

                                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

                                <b-button variant="primary">Save</b-button>
                            </b-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->

    <!-- Form row -->
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Form row</h4>
                    <p class="sub-header">
                        You may also swap
                        <code class="highlighter-rouge">.row</code> for
                        <code class="highlighter-rouge">.form-row</code>, a variation of our standard grid row that overrides the default column gutters for tighter and more compact layouts.
                    </p>

                    <form>
                        <div class="form-row">
                            <b-form-group class="col-md-6" label="Email" label-for="input-sm">
                                <b-form-input type="email" id="input-sm" placeholder="Email"></b-form-input>
                            </b-form-group>
                            <b-form-group class="col-md-6" label="Password" label-for="password2">
                                <b-form-input type="password" id="password2" placeholder="password"></b-form-input>
                            </b-form-group>
                        </div>
                        <b-form-group label="Address" label-for="inputAddress">
                            <b-form-input type="text" id="inputAddress" placeholder="1234 Main St"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Address 2" label-for="inputAddress2">
                            <b-form-input type="text" id="inputAddress2" placeholder="Apartment, studio, or floor"></b-form-input>
                        </b-form-group>

                        <div class="form-row">
                            <b-form-group class="col-md-6" label="City" label-for="inputCity">
                                <b-form-input type="text" id="inputCity"></b-form-input>
                            </b-form-group>
                            <b-form-group class="col-md-4" label="State" label-for="inputState">
                                <select id="inputState" class="form-control">
                                    <option>Choose</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </b-form-group>
                            <b-form-group class="col-md-2" label-for="inputZip" label="Zip">
                                <b-form-input type="text" id="inputZip"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input id="customCheck11" type="checkbox" class="custom-control-input" />
                                <label class="custom-control-label" for="customCheck11">Check this custom checkbox</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
