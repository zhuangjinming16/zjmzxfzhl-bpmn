<template>
    <div id="app">
        <vue-bpmn  @save="btnSave" :modelData="modelData"/>
    </div>
</template>

<script>
    import VueBpmn from "@/components/VueBpmn"

    export default {
        name: 'App',
        components: {VueBpmn},
        data() {
            return {
                id: undefined,
                modelData: {
                    id: undefined,
                    editor: undefined,
                    key: 'processId_1',
                    name: 'processName_1',
                    category: '',
                    description: 'description_1'
                },
            }
        },

        methods: {
            btnSave(modelData) {

            }
        }
    }
</script>
