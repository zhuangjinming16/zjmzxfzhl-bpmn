<template>
    <div id="app">
        <bpmn :modelData="modelData"/>
    </div>
</template>

<script>
    import Bpmn from "@/components/Bpmn/index.vue"

    export default {
        name: 'App',
        components: {Bpmn},
        data() {
            return {
                id: undefined,
                modelData: {
                    id: undefined,
                    editor: undefined,
                    key: 'processId_1',
                    name: 'processName_1',
                    category: 'demo',
                    description: 'description_1'
                },
            }
        }
    }
</script>
