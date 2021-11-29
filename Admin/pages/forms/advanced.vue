<script>
import DatePicker from 'vue2-datepicker'
import Switches from 'vue-switches'
import Multiselect from 'vue-multiselect'
import NumberInputSpinner from "vue-number-input-spinner";

/**
 * Form Advanced component
 */
export default {
    head() {
        return {
            title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`
        }
    },
    components: {
        DatePicker,
        Switches,
        Multiselect,
        NumberInputSpinner
    },
    data() {
        return {
            title: 'Form Advanced',
            items: [{
                    text: 'Minton',
                    href: '/',
                },
                {
                    text: 'Forms',
                    href: '/',
                },
                {
                    text: 'Advanced',
                    active: true,
                },
            ],
            defaultdate: "",
            autoClose: "",
            daterange: "",
            demoMonth: "",
            demoYear: "",
            time: "",
            time1: '',
            time2: '',
            time3: '',
            enabled: false,
            enabled1: false,
            enabled2: false,
            enabled3: false,
            enabled4: false,
            enabled5: false,
            small: false,
            small1: false,
            small2: false,
            small3: false,
            danger: false,
            info: false,
            success: false,
            primary: false,
            value: null,
            value1: null,
            options: [
                'Alaska',
                'Hawaii',
                'California',
                'Nevada',
                'Oregon',
                'Washington',
                'Arizona',
                'Colorado',
                'Idaho',
                'Montana',
                'Nebraska',
                'New Mexico',
                'North Dakota',
                'Utah',
                'Wyoming',
                'Alabama',
                'Arkansas',
                'Illinois',
                'Iowa',
            ],
            maxlen: '',
            data: '',
            option: '',
            textarea: '',
            defaultspinval: 1,
            defaultNull: null

        }
    },
    middleware: 'router-auth'
}
</script>

<template lang="en">
<div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <!-- Date picker -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Date Picker</h4>
                    <p class="sub-header">Examples of bootstrap datepicker.</p>

                    <div>
                        <div class="form-group mb-3">
                            <label>Default Date Picker</label>
                            <br />
                            <date-picker v-model="defaultdate" :first-day-of-week="1" lang="en" confirm></date-picker>
                        </div>

                        <div class="form-group mb-3">
                            <label>Auto close</label>
                            <br />
                            <date-picker v-model="autoClose" :first-day-of-week="1" lang="en"></date-picker>
                        </div>

                        <div class="form-group mb-3">
                            <label>Date Range</label>
                            <br />
                            <date-picker v-model="daterange" range append-to-body lang="en" confirm></date-picker>
                        </div>

                        <div class="form-group mb-3">
                            <label>Month View</label>
                            <br />
                            <date-picker v-model="demoMonth" type="month" lang="en" confirm placeholder="Select Month"></date-picker>
                        </div>

                        <div class="form-group mb-3">
                            <label>Year View</label>
                            <br />
                            <date-picker v-model="demoYear" type="year" lang="en" confirm placeholder="Select Year"></date-picker>
                        </div>

                        <div class="form-group mb-3">
                            <label>Time View</label>
                            <br />
                            <date-picker v-model="time" format="hh:mm:ss a" value-type="format" type="time" placeholder="hh:mm:ss a"></date-picker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End datepicker -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="mb-3 header-title">Switchery</h4>
                    <h6>Basic</h6>
                    <p class="text-muted mb-3 font-13">
                        Add an attribute
                        <code>data-plugin="switchery" data-color="@colors"</code>
                        to your input element and it will be converted into switch.
                    </p>
                    <switches v-model="enabled" type-bold="true" class="mb-0"></switches>
                    <switches v-model="enabled1" type-bold="false" color="warning" class="ml-1 mb-0"></switches>
                    <switches v-model="enabled2" type-bold="false" color="danger" class="ml-1 mb-0"></switches>
                    <switches v-model="enabled3" type-bold="false" color="primary" class="ml-1 mb-0"></switches>
                    <switches v-model="enabled4" type-bold="false" color="success" class="ml-1 mb-0"></switches>
                    <switches v-model="enabled5" type-bold="false" color="info" class="ml-1 mb-0"></switches>
                    <h6>Sizes</h6>
                    <p class="text-muted mb-3 font-13">
                        Add an attribute
                        <code>data-size="small"</code>
                        to your input element and it will be converted into switch.
                    </p>
                    <div>
                        <switches v-model="small"></switches>
                        <switches v-model="small1" color="warning" class="ml-1"></switches>
                        <switches v-model="small2" color="danger" class="ml-1"></switches>
                        <switches v-model="small3" color="success" class="ml-1"></switches>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4 class="mb-4 header-title">Select2</h4>
                    <label>Single Select</label>

                    <multiselect v-model="value" :options="options"></multiselect>
                    <label class="mt-3">Multiple Select</label>

                    <multiselect v-model="value1" :options="options" :multiple="true"></multiselect>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bootstrap TouchSpin</h4>
                    <p class="sub-header">A mobile and touch friendly input spinner component for Bootstrap</p>
                    <div class="form-group">
                        <label>Using data attributes</label>
                        <NumberInputSpinner :min="0" :max="10" :integerOnly="true" v-model="defaultspinval" />
                    </div>

                    <div class="form-group">
                        <label class="mt-3">Example with postfix</label>
                        <NumberInputSpinner :min="0.5" :max="100.5" :step="0.5" :value="2.5" :integerOnly="false" />
                    </div>
                    <div class="form-group">
                        <label class="mt-3">Init with empty value:</label>
                        <NumberInputSpinner :min="1" :max="100" :step="1" :integerOnly="false" v-model="defaultNull" />
                    </div>
                    <div class="form-group">
                        <label class="mt-3">Custom step:</label>
                        <NumberInputSpinner :min="1" :max="100" :step="2" :integerOnly="true" :value="4" />
                    </div>
                    <div class="form-group">
                        <label class="mt-3">Custom Value:</label>
                        <NumberInputSpinner :min=" -90" :max="90" :step="1" :integerOnly="false" :value="-2" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">

            <div class="card">
                <div class="card-body">
                    <h4 class="header-title">Bootstrap MaxLength</h4>
                    <p class="sub-header">Uses the HTML5 attribute "maxlength" to work.</p>

                    <label class="mb-1 font-weight-medium text-muted">Default usage</label>
                    <p class="text-muted font-13">The badge will show up by default when the remaining chars are 10 or less:</p>
                    <input v-model="maxlen" type="text" class="form-control" :maxlength="10" />
                    <div v-if="maxlen" class="text-center">
                        <p class="badge position-absolute" :class="{ 'badge-success': maxlen.length !== 10,
                            'badge-danger': maxlen.length === 10 }">{{ maxlen.length }} / 10</p>
                    </div>

                    <div>
                        <label class="mb-1 mt-3 font-weight-medium text-muted">Threshold value</label>
                        <p class="text-muted font-13">
                            Do you want the badge to show up when there are 20 chars or less? Use the
                            <code>threshold</code>
                            option:
                        </p>
                        <input v-model="data" type="text" :maxlength="25" class="form-control" />
                        <div class="text-center">
                            <p v-if="data" class="badge position-absolute" :class="{ 'badge-success': data.length !== 25,
                            'badge-danger': data.length === 25 }">{{ data.length }} / 25</p>
                        </div>
                    </div>

                    <div>
                        <label class="mb-1 mt-3 font-weight-medium text-muted">All the options</label>
                        <p class="text-muted font-13">
                            Please note: if the
                            <code>alwaysShow</code> option is enabled, the
                            <code>threshold</code> option
                            is
                            ignored.
                        </p>
                        <input v-model="option" type="text" class="form-control" :maxlength="25" />
                        <div class="text-center">
                            <p v-if="option" class="badge position-absolute" :class="{ 'badge-success': option.length !== 25,
                            'badge-danger': option.length === 25 }">
                                You typed
                                {{ option.length }} out of 25 chars available.
                            </p>
                        </div>
                    </div>

                    <div>
                        <label class="mb-1 mt-3 font-weight-medium text-muted">Textareas</label>
                        <p class="text-muted font-13">Bootstrap maxlength supports textarea as well as inputs. Even on old IE.</p>
                        <textarea v-model="textarea" class="form-control" :maxlength="225" rows="3" placeholder="This textarea has a limit of 225 chars."></textarea>
                        <div class="text-center">
                            <p v-if="textarea" class="badge position-absolute" :class="{ 'badge-success': textarea.length !== 225,
                            'badge-danger': textarea.length === 225 }">
                                {{ textarea.length }} /
                                225
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
