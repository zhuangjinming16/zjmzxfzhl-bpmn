<template>
    <el-container v-loading="isView" class="fm2-container" :class="{ 'view-mode': isView }">
        <el-header height="45px">
            <el-button-group style="margin: 5px;">
                <el-button size="mini" icon="el-icon-arrow-left" @click="handleUndo">撤回</el-button>
                <el-button size="mini" icon="el-icon-arrow-right" @click="handleRedo">重做</el-button>
                <el-button size="mini" icon="el-icon-circle-plus-outline" @click="handleZoom(0.2)">放大</el-button>
                <el-button size="mini" icon="el-icon-help" @click="handleZoom(0)">还原</el-button>
                <el-button size="mini" icon="el-icon-remove-outline" @click="handleZoom(-0.2)">缩小</el-button>
                <el-button size="mini" icon="el-icon-upload2" @click="importXml">导入</el-button>
                <el-upload action="" :before-upload="openBpmn" style="display: none">
                    <el-button ref="importBtn" size="mini" icon="el-icon-folder-opened"/>
                </el-upload>
                <el-button size="mini" icon="el-icon-download" @click="handleExportXmlAction">XML</el-button>
                <el-button size="mini" icon="el-icon-download" @click="handleExportSvgAction">SVG</el-button>
                <el-button size="mini" icon="el-icon-tickets" @click="handlePreviewXml">预览</el-button>
                <el-button size="mini" icon="el-icon-delete" @click="handleClear">清空</el-button>
                <el-button size="mini" icon="el-icon-tickets" @click="handleConfig">配置</el-button>
            </el-button-group>
        </el-header>
        <el-main class="fm2-main">
            <el-container class="center-container">
                <el-container class="containers">
                    <div class="canvas" ref="canvas"/>
                </el-container>
                <el-aside class="widget-config-container">
                    <bpmn-element ref="_bpmnElement" v-if="showModeler && modeler" :modeler="modeler" :bpmnConfig="bpmnConfig" :datasource="datasource"/>
                </el-aside>
            </el-container>
        </el-main>
        <el-footer height="30px" style="font-weight: 600;">
            Powered by <a target="_blank" href="https://gitee.com/zjm16/zjmzxfzhl">zjmzxfzhl</a>
        </el-footer>

        <el-dialog :visible.sync="xmlVisible" title="预览" fullscreen center>
            <vue-ace-editor v-model="process.xml"
                            @init="editorInit"
                            lang="xml"
                            theme="chrome"
                            width="100%"
                            height="calc(100vh - 214px)"
                            :options="{wrap: true, readOnly: true}">
            </vue-ace-editor>
            <span slot="footer">
                <el-button icon="el-icon-document" type="primary" v-clipboard:copy="process.xml"
                        v-clipboard:success="onCopy">复 制</el-button>
                <el-button icon="el-icon-close" @click="xmlVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="bpmnConfigVisible" title="配置" fullscreen center>
            <vue-ace-editor v-model="bpmnConfigJson"
                            @init="bpmnConfigEditorInit"
                            lang="json"
                            theme="chrome"
                            width="100%"
                            height="calc(100vh - 214px)"
                            :options="{ wrap: true}">
            </vue-ace-editor>
            <span slot="footer">
                <el-button icon="el-icon-document" type="primary" @click="saveBpmnConfig">确定</el-button>
                <el-button icon="el-icon-close" @click="closeBpmnConfig">关闭</el-button>
            </span>
        </el-dialog>
    </el-container>

</template>

<script>
    // 汉化
    import translate from './translate/index'
    import Modeler from 'bpmn-js/lib/Modeler'
    import {BpmnElement} from './BpmnElement/lib/BpmnElement.umd.min.js'
    // 引入flowable的节点文件
    import flowableModdle from './descriptors/flowable.json'
    import VueAceEditor from 'vue2-ace-editor'
    import {config} from './config/config.js'
    import newXml from './resources/newDiagram.js'
    // import {Message} from 'element-ui'
    // 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
    import CustomContentPadProvider from "./plugins/content-pad"
    // 自定义左侧菜单（修改 默认任务 为 用户任务）
    import CustomPaletteProvider from "./plugins/palette"
    import axios from 'axios'

    export default {
        name: 'Bpmn',
        props: {
            isView: {
                type: Boolean,
                default: false
            },
            modelData: {
                type: Object,
                default: {
                    id: undefined,
                    key: 'processId_1',
                    name: 'processName_1',
                    category: 'demo',
                    description: 'description_1'
                }
            }
        },
        components: {VueAceEditor, BpmnElement},
        data() {
            return {
                scale: 1,  //流程图比例（用于放大缩小）
                showModeler: true,
                modeler: null,
                process: {
                    xml: '',
                    svg: ''
                },
                xmlVisible: false,
                bpmnConfigVisible: false,
                bpmnConfig: config,
                bpmnConfigJson: '',
                datasource: undefined,
                idTest: /^[a-z_][\w-.]*$/i,
            }
        },
        // watch: {
        //     bpmnConfigJson: {
        //         handler(newVal){
        //             this.bpmnConfig = JSON.parse(newVal)
        //         },
        //         immediate: true
        //     }
        // },
        mounted() {
            if(this.bpmnConfig.datasourceUrl){
                axios({
                    method: 'get',
                    url: this.bpmnConfig.datasourceUrl
                }).then(resp => {
                    this.datasource = resp.data
                    this.initModeler()
                }).catch((error) => {
                    this.$message.error('获取数据源数据失败，可尝试访问：http://zjm16.gitee.io/zjmzxfzhl-doc/zjmzxfzhl-bpmn/')
                })
            } else {
                this.initModeler()
            }
        },
        methods: {
            initModeler(){
                const canvas = this.$refs.canvas
                // 生成实例
                this.modeler = new Modeler({
                    container: this.$refs.canvas,
                    additionalModules: [
                        {translate: ['value', translate]},
                        CustomContentPadProvider,
                        CustomPaletteProvider
                    ],
                    moddleExtensions: {
                        flowable: flowableModdle
                    }
                })
                // 新增流程定义
                this.createNewDiagram(this.modelData?.editor)
            },
            // init ace editor
            editorInit: function () {
                require('brace/ext/language_tools')
                require('brace/mode/xml')
                require('brace/theme/chrome')
            },
            bpmnConfigEditorInit: function () {
                require('brace/ext/language_tools')
                require('brace/mode/json')
                require('brace/theme/chrome')
            },
            saveBpmnConfig(){
                this.showModeler = false
                this.$nextTick().then(() => {
                    this.bpmnConfig = JSON.parse(this.bpmnConfigJson)
                    if(this.bpmnConfig.datasourceUrl){
                        axios({
                            method: 'get',
                            url: this.bpmnConfig.datasourceUrl
                        }).then(resp => {
                            this.datasource = resp.data
                            this.showModeler = true
                            this.bpmnConfigVisible = false
                        }).catch((error) => {
                            this.$message.error('获取数据源数据失败，可尝试访问：http://zjm16.gitee.io/zjmzxfzhl-doc/zjmzxfzhl-bpmn/')
                        })
                    }else{
                        this.datasource = undefined
                        this.showModeler = true
                        this.bpmnConfigVisible = false
                    }
                })
            },
            closeBpmnConfig(){
                this.bpmnConfigVisible = false
            },
            getProcessElement() {
                return this.modeler.getDefinitions().rootElements[0]
            },
            getProcess() {
                const element = this.getProcessElement()
                return {
                    id: element.id,
                    name: element.name,
                    category: element.$parent.targetNamespace ?? ''
                }
            },
            // 初始化流程图
            createNewDiagram(xml) {
                if (!xml) {
                    // 初始化XML文本
                    this.process.xml = newXml(this.modelData.key, this.modelData.name, this.modelData.category, this.modelData.description)
                } else {
                    this.process.xml = xml
                }
                // 将字符串转换成图显示出来
                this.modeler.importXML(this.process.xml, err => {
                    if (err) {
                        console.error(err)
                    } else {
                        // this.adjustPalette()
                    }
                })
            },
            // 导入
            importXml() {
                this.$refs.importBtn.$el.click()
            },
            // 导入文件选择完成
            openBpmn(file) {
                const reader = new FileReader()
                reader.readAsText(file, 'utf-8')
                reader.onload = () => {
                    this.createNewDiagram(reader.result)
                }
                return false
            },
            /**
             * 下载xml/svg
             *  @param  type  类型  svg / xml
             *  @param  data  数据
             *  @param  name  文件名称
             */
            download(type, data, name) {
                let dataTrack = ''
                const a = document.createElement('a')
                switch (type) {
                    case 'xml':
                        dataTrack = 'bpmn'
                        break
                    case 'svg':
                        dataTrack = 'svg'
                        break
                    default:
                        break
                }
                name = name || `diagram.${dataTrack}`
                a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`)
                a.setAttribute('target', '_blank')
                a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
                a.setAttribute('download', name)
                document.body.appendChild(a)
                a.click()
                URL.revokeObjectURL(a.href) // 释放URL 对象
                document.body.removeChild(a)
            },
            // 导出XML文件
            handleExportXmlAction() {
                const _this = this
                this.modeler.saveXML({format: true}, function (err, xml) {
                    xml = _this.replaceLtAndGt(xml)
                    _this.download('xml', xml, _this.getProcess().name + '.bpmn20.xml')
                })
            },
            // 导出SVG文件
            handleExportSvgAction() {
                const _this = this
                this.modeler.saveSVG({format: true}, function (err, svg) {
                    _this.download('svg', svg, _this.getProcess().name + '.bpmn20.svg')
                })
            },
            // 预览
            handlePreviewXml() {
                this.modeler.saveXML({format: true}, (err, xml) => {
                    this.process.xml = this.replaceLtAndGt(xml)
                    this.xmlVisible = true
                })
            },
            // 配置
            handleConfig() {
                this.bpmnConfigJson = JSON.stringify(this.bpmnConfig, null, 2)
                this.bpmnConfigVisible = true
            },
            // 清空
            handleClear() {
                this.createNewDiagram()
            },
            // 复制成功
            onCopy() {
                this.$message.success('内容复制成功')
            },
            // 前进
            handleRedo() {
                this.modeler.get('commandStack').redo()
            },
            // 后退
            handleUndo() {
                this.modeler.get('commandStack').undo()
            },
            // 流程图放大缩小
            handleZoom(radio) {
                const newScale = !radio
                    ? 1.0 // 不输入radio则还原
                    : this.scale + radio <= 0.2 // 最小缩小倍数
                        ? 0.2
                        : this.scale + radio
                this.modeler.get('canvas').zoom(newScale)
                this.scale = newScale
            },
            replaceLtAndGt(xml){
                xml = xml.replace(/&lt;/g, '<')
                xml = xml.replace(/&gt;/g, '>')
                return xml
            }
        }
    }
</script>

<style src="bpmn-js/dist/assets/diagram-js.css"/>
<style src="bpmn-js/dist/assets/bpmn-font/css/bpmn.css"/>
<style src="bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css"/>
<style src="bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"/>

<style lang="scss">
    $primary-color: #409EFF;
    $primary-background-color: #ecf5ff;

    .view-mode {
        .el-header, .el-aside, .djs-palette {
            display: none;
        }
        .el-loading-mask {
            background-color: initial;
        }
        .el-loading-spinner {
            display: none;
        }
    }

    .fm2-container {
        background: #fff;
        /*height: calc(100vh - 84px);*/
        height: calc(100vh - 16px);
        border: 1px solid #e0e0e0;

        .el-container {
            height: 100% !important;
        }

        & > .el-container {
            background: #fff;
        }
        .fm2-main {
            position: relative;
            border-top: solid 1px #e4e7ed;

            & > .el-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
        footer {
            height: 30px;
            line-height: 30px;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            text-align: right;
            color: $primary-color;
            background: #fafafa;
            a {
                color: $primary-color;
            }
        }
    }

    .center-container {
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
    }

    .widget-config-container {
        /* margin-bottom: 0px !important; */
        width: 350px !important;
        position: relative;
        border-left: solid 1px #e4e7ed;
        overflow: hidden;
        .el-form-item__label {
            font-size: 13px;
        }
    }

    .containers {
        background-color: #ffffff;
        width: 100%;
        height: 100%;

        .canvas {
            width: 100%;
            height: 100%;
        }
        .bjs-powered-by {
            display: none;
        }
    }
</style>
