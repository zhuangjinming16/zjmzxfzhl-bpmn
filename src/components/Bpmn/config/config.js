export const config = {
    datasourceUrl: "http://118.190.100.3:8080/zjmzxfzhl/sys/config/getBpmnDatasource",
    // 节点属性所归属的大类
    bpmnCollapseItems: [{
        index: 1,
        name: 'general',
        label: "常规配置"
    }, {
        index: 2,
        name: 'process',
        label: "流程配置"
    }, {
        index: 3,
        name: 'task',
        label: "任务配置"
    }, {
        index: 4,
        name: 'form',
        label: "表单配置"
    }, {
        index: 5,
        name: 'listener',
        label: "监听器配置"
    }, {
        index: 6,
        name: 'multipleInstances',
        label: "多实例配置"
    }, {
        index: 999,
        name: "other",
        label: "其他配置"
    }],
    // 公共字段，所有类型的节点都具备这些属性
    common: {
        id: {
            __bpmnConfig__: {
                type: "input"
            },
            __config__: {
                $collapseItemName: "general",
                label: "节点ID",
                required: true
            }
        },
        name: {
            __bpmnConfig__: {
                type: "input"
            },
            __config__: {
                $collapseItemName: "general",
                label: "节点名称",
                required: true
            }
        }
    },
    bpmnComponents: {
        "bpmn:Process": {
            documentation: {
                __bpmnConfig__: {
                    $type: "bpmn:Documentation", // 当前节点类型
                    isMany: true, //流程属性
                    $isMany: false, // 实际属性
                    $bodyPropertyName: "text"
                },
                fields: {
                    text: {
                        __bpmnConfig__: {
                            type: "textarea"
                        },
                        __config__: {
                            $collapseItemName: "general",
                            label: "流程描述"
                        }
                    }
                }
            },
            processCategory: {
                __bpmnConfig__: {
                    type: "select",
                    $dataPath: "$parent.targetNamespace",
                },
                __config__: {
                    $collapseItemName: "process",
                    label: "流程分类",
                    required: true,
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.processCategory',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "示例流程",
                        value: "demo"
                    }, {
                        label: "HR流程",
                        value: "hr"
                    }, {
                        label: "财务流程",
                        value: "finance"
                    }]
                }
            },
            isExecutable: {
                __bpmnConfig__: {
                    type: "switch",
                },
                __config__: {
                    $collapseItemName: "process",
                    label: "可执行",
                    required: true
                }
            },
            candidateStarterUsers: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "process",
                    label: "候选用户",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.userList',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "张三",
                        value: "zhangsan"
                    }, {
                        label: "李四",
                        value: "lisi"
                    }, {
                        label: "王五",
                        value: "wangwu"
                    }]
                },
                multiple: true
            },
            candidateStarterGroups: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "process",
                    label: "候选组",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.postList',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "招聘岗",
                        value: "recruit"
                    }, {
                        label: "福利管理岗",
                        value: "welfare"
                    }, {
                        label: "部门经理",
                        value: "manager"
                    }]
                },
                multiple: true
            },
            extensionElements: {
                __bpmnConfig__: {
                    $type: "bpmn:ExtensionElements",
                    $isMany: false,
                    // $undefinedBy: "!(this.values&&this.values.length)"
                },
                fields: [{
                    __bpmnConfig__: {
                        type: "badge",
                        $type: "flowable:Properties",
                        $dataPath: "values",
                        $isMany: true
                    },
                    __config__: {
                        $collapseItemName: "other",
                        label: "附加属性"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:Property", //表示badge属于这个类型
                            $dataPath: "values"
                        },
                        fields: {
                            name: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "名称",
                                    required: true
                                }
                            },
                            value: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "值",
                                    required: true
                                }
                            }
                        }
                    }
                }, {
                    __bpmnConfig__: {
                        $isMany: true,
                        $dataPath: "values",
                        type: "badge"
                    },
                    __config__: {
                        $collapseItemName: "listener",
                        label: "执行监听"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:TaskListener"
                        },
                        fields: {
                            event: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "事件",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "start",
                                        value: "start"
                                    }, {
                                        label: "take",
                                        value: "take"
                                    }, {
                                        label: "end",
                                        value: "end"
                                    }]
                                }
                            },
                            type: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "监听类型",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "表达式",
                                        value: 1
                                    }, {
                                        label: "代理表达式",
                                        value: 2
                                    }, {
                                        label: "类",
                                        value: 3
                                    }]
                                }
                            },
                            expression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "表达式",
                                    showBy: "this.type===1"
                                }
                            },
                            delegateExpression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "代理表达式",
                                    showBy: "this.type===2"
                                }
                            },
                            class: {
                                __bpmnConfig__: {
                                        type: "input"
                                    },
                                    __config__: {
                                        label: "类",
                                        showBy: "this.type===3"
                                    }
                            },
                            fields: {
                                __bpmnConfig__: {
                                    type: "badge"
                                },
                                __config__: {
                                    label: "参数"
                                },
                                showName: "编辑",
                                badgeConfig: {
                                    __bpmnConfig__: {
                                        $type: "flowable:Field"
                                    },
                                    fields: {
                                        name: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "参数名称",
                                                required: true
                                            }
                                        },
                                        type: {
                                            __bpmnConfig__: {
                                                type: "select"
                                            },
                                            __config__: {
                                                label: "参数类型",
                                                required: true
                                            },
                                            __slot__: {
                                                options: [{
                                                    label: "字符串",
                                                    value: 1
                                                }, {
                                                    label: "表达式",
                                                    value: 2
                                                }]
                                            }
                                        },
                                        string: {
                                            __bpmnConfig__: {
                                                $type: "flowable:string",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "字符串",
                                                        showBy: "this.type===1"
                                                    }
                                                }
                                            }
                                        },
                                        expression: {
                                            __bpmnConfig__: {
                                                $type: "bpmn:Expression",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "表达式",
                                                        showBy: "this.type===2"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }]
            }
        },
        "bpmn:SequenceFlow": {
            conditionExpression: {
                __bpmnConfig__: {
                    $type: "bpmn:FormalExpression",
                    $isMany: false, // 用于返显数据
                    $bodyPropertyName: "body"
                },
                fields: {
                    body: {
                        __bpmnConfig__: {
                            type: "input"
                        },
                        __config__: {
                            $collapseItemName: "general",
                            label: "流转条件"
                        }
                    }
                }
            }
        },
        "bpmn:UserTask": {
            category: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "任务分类",
                    required: true,
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.taskCategory',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "待办",
                        value: "todo"
                    }, {
                        label: "待阅",
                        value: "toRead"
                    }]
                }
            },
            asyncBefore: {
                __bpmnConfig__: {
                    type: "radio",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "异步前"
                },
                __slot__: {
                    options: [{
                        label: "是",
                        value: true
                    },{
                        label: "否",
                        value: false
                    }]
                }
            },
            asyncAfter: {
                __bpmnConfig__: {
                    type: "radio",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "异步后"
                },
                __slot__: {
                    options: [{
                        label: "是",
                        value: true
                    },{
                        label: "否",
                        value: false
                    }]
                }
            },
            exclusive: {
                __bpmnConfig__: {
                    type: "radio",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "排除",
                    required: true,
                    showBy: "this.asyncBefore===true||this.asyncAfter===true"
                },
                __slot__: {
                    options: [{
                        label: "是",
                        value: true
                    },{
                        label: "否",
                        value: false
                    }]
                }
            },
            assignee: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "执行人",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.userList',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "张三",
                        value: "zhangsan"
                    }, {
                        label: "李四",
                        value: "lisi"
                    }, {
                        label: "王五",
                        value: "wangwu"
                    }]
                }
            },
            candidateUsers: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "候选用户",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.userList',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "张三",
                        value: "zhangsan"
                    }, {
                        label: "李四",
                        value: "lisi"
                    }, {
                        label: "王五",
                        value: "wangwu"
                    }]
                },
                multiple: true
            },
            candidateGroups: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "候选组",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.postList',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                __slot__: {
                    options: [{
                        label: "招聘岗",
                        value: "recruit"
                    }, {
                        label: "福利管理岗",
                        value: "welfare"
                    }, {
                        label: "部门经理",
                        value: "manager"
                    }]
                },
                multiple: true
            },
            dueDate: {
                __bpmnConfig__: {
                    type: "date",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "到期时间"
                },
                format: 'yyyy-MM-dd HH:mm:ss',
                type: "datetime",
                'value-format': "yyyy-MM-dd HH:mm:ss"
            },
            followUpDate: {
                __bpmnConfig__: {
                    type: "date",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "跟踪时间"
                },
                format: 'yyyy-MM-dd HH:mm:ss',
                type: "datetime",
                'value-format': "yyyy-MM-dd HH:mm:ss"
            },
            priority: {
                __bpmnConfig__: {
                    type: "input-number",
                },
                __config__: {
                    $collapseItemName: "task",
                    label: "优先级"
                }
            },
            formKey: {
                __bpmnConfig__: {
                    type: "input",
                },
                __config__: {
                    $collapseItemName: "form",
                    label: "表单KEY"
                }
            },
            buttons: {
                __bpmnConfig__: {
                    type: "select",
                },
                __config__: {
                    $collapseItemName: "form",
                    label: "审批按钮",
                    dataType: 'dynamic',
                    dynamicOptions:{
                        dataPath: 'data.approvalButtons',
                        dataConsumer: '__slot__.options',
                        label: 'label',
                        value: 'value',
                        children: 'children'
                    }
                },
                multiple: true,
                __slot__: {
                    options: [{
                        label: "提交",
                        value: "COMPLETE"
                    }, {
                        label: "终止",
                        value: "STOP"
                    }, {
                        label: "转派",
                        value: "ASSIGN"
                    }, {
                        label: "委派",
                        value: "DELEGATE"
                    }, {
                        label: "退回",
                        value: "BACK"
                    }, {
                        label: "撤回",
                        value: "TAKE_BACK"
                    }]
                }
            },
            extensionElements: {
                __bpmnConfig__: {
                    $type: "bpmn:ExtensionElements",
                    $isMany: false,
                    // $undefinedBy: "!(this.values&&this.values.length)"
                },
                fields: [{
                    __bpmnConfig__: {
                        type: "badge",
                        $type: "flowable:Properties",
                        $dataPath: "values",
                        $isMany: true
                    },
                    __config__: {
                        $collapseItemName: "other",
                        label: "附加属性"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:Property", //表示badge属于这个类型
                            $dataPath: "values"
                        },
                        fields: {
                            name: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "名称",
                                    required: true
                                }
                            },
                            value: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "值",
                                    required: true
                                }
                            }
                        }
                    }
                }, {
                    __bpmnConfig__: {
                        $isMany: true,
                        $dataPath: "values",
                        type: "badge"
                    },
                    __config__: {
                        $collapseItemName: "listener",
                        label: "执行监听"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:ExecutionListener"
                        },
                        fields: {
                            event: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "事件",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "start",
                                        value: "start"
                                    }, {
                                        label: "take",
                                        value: "take"
                                    }, {
                                        label: "end",
                                        value: "end"
                                    }]
                                }
                            },
                            type: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "监听类型",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "表达式",
                                        value: 1
                                    }, {
                                        label: "代理表达式",
                                        value: 2
                                    }, {
                                        label: "类",
                                        value: 3
                                    }]
                                }
                            },
                            expression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "表达式",
                                    showBy: "this.type===1"
                                }
                            },
                            delegateExpression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "代理表达式",
                                    showBy: "this.type===2"
                                }
                            },
                            class: {
                                __bpmnConfig__: {
                                        type: "input"
                                    },
                                    __config__: {
                                        label: "类",
                                        showBy: "this.type===3"
                                    }
                            },
                            fields: {
                                __bpmnConfig__: {
                                    type: "badge"
                                },
                                __config__: {
                                    label: "参数"
                                },
                                showName: "编辑",
                                badgeConfig: {
                                    __bpmnConfig__: {
                                        $type: "flowable:Field"
                                    },
                                    fields: {
                                        name: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "名称",
                                                required: true
                                            }
                                        },
                                        type: {
                                            __bpmnConfig__: {
                                                type: "select"
                                            },
                                            __config__: {
                                                label: "参数类型",
                                                required: true
                                            },
                                            __slot__: {
                                                options: [{
                                                    label: "字符串",
                                                    value: 1
                                                }, {
                                                    label: "表达式",
                                                    value: 2
                                                }]
                                            }
                                        },
                                        string: {
                                            __bpmnConfig__: {
                                                $type: "flowable:string",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "字符串",
                                                        showBy: "this.type===1"
                                                    }
                                                }
                                            }
                                        },
                                        expression: {
                                            __bpmnConfig__: {
                                                $type: "bpmn:Expression",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "表达式",
                                                        showBy: "this.type===2"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, {
                    __bpmnConfig__: {
                        $isMany: true,
                        $dataPath: "values",
                        type: "badge"
                    },
                    __config__: {
                        $collapseItemName: "listener",
                        label: "任务监听"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:TaskListener"
                        },
                        fields: {
                            event: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "事件",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "create",
                                        value: "create"
                                    }, {
                                        label: "assignment",
                                        value: "assignment"
                                    }, {
                                        label: "complete",
                                        value: "complete"
                                    }, {
                                        label: "delete",
                                        value: "delete"
                                    }]
                                }
                            },
                            type: {
                                __bpmnConfig__: {
                                    type: "select"
                                },
                                __config__: {
                                    label: "监听类型",
                                    required: true
                                },
                                __slot__: {
                                    options: [{
                                        label: "表达式",
                                        value: 1
                                    }, {
                                        label: "代理表达式",
                                        value: 2
                                    }, {
                                        label: "类",
                                        value: 3
                                    }]
                                }
                            },
                            expression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "表达式",
                                    showBy: "this.type===1"
                                }
                            },
                            delegateExpression: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "代理表达式",
                                    showBy: "this.type===2"
                                }
                            },
                            class: {
                                __bpmnConfig__: {
                                        type: "input"
                                    },
                                    __config__: {
                                        label: "类",
                                        showBy: "this.type===3"
                                    }
                            },
                            fields: {
                                __bpmnConfig__: {
                                    type: "badge"
                                },
                                __config__: {
                                    label: "参数"
                                },
                                showName: "编辑",
                                badgeConfig: {
                                    __bpmnConfig__: {
                                        $type: "flowable:Field"
                                    },
                                    fields: {
                                        name: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "名称",
                                                required: true
                                            }
                                        },
                                        type: {
                                            __bpmnConfig__: {
                                                type: "select"
                                            },
                                            __config__: {
                                                label: "参数类型",
                                                required: true
                                            },
                                            __slot__: {
                                                options: [{
                                                    label: "字符串",
                                                    value: 1
                                                }, {
                                                    label: "表达式",
                                                    value: 2
                                                }]
                                            }
                                        },
                                        string: {
                                            __bpmnConfig__: {
                                                $type: "flowable:string",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "字符串",
                                                        showBy: "this.type===1"
                                                    }
                                                }
                                            }
                                        },
                                        expression: {
                                            __bpmnConfig__: {
                                                $type: "bpmn:Expression",
                                                $isMany: false, // 用于返显数据
                                                $bodyPropertyName: "body"
                                            },
                                            fields: {
                                                body: {
                                                    __bpmnConfig__: {
                                                        type: "input"
                                                    },
                                                    __config__: {
                                                        label: "表达式",
                                                        showBy: "this.type===2"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }, {
                    __bpmnConfig__: {
                        $isMany: true,
                        $dataPath: "values",
                        type: "badge"
                    },
                    __config__: {
                        $collapseItemName: "form",
                        label: "表单配置"
                    },
                    showName: "编辑",
                    badgeConfig: {
                        __bpmnConfig__: {
                            $type: "flowable:FormData"
                        },
                        fields: {
                            businessKey: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    label: "表单标识",
                                    required: true
                                }
                            },
                            fields: {
                                __bpmnConfig__: {
                                    type: "badge",
                                    $isMany: true
                                },
                                __config__: {
                                    label: "表单字段"
                                },
                                showName: "编辑",
                                badgeConfig: {
                                    __bpmnConfig__: {
                                        $type: "flowable:FormField",
                                    },
                                    fields: {
                                        id: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "字段ID",
                                                required: true
                                            }
                                        },
                                        type: {
                                            __bpmnConfig__: {
                                                type: "select"
                                            },
                                            __config__: {
                                                label: "字段类型",
                                                required: true
                                            },
                                            __slot__: {
                                                options: [{
                                                    label: "长整型",
                                                    value: "long"
                                                }, {
                                                    label: "字符串",
                                                    value: "string"
                                                }]
                                            }
                                        },
                                        name: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "字段名称",
                                                required: true
                                            }
                                        },
                                        defaultValue: {
                                            __bpmnConfig__: {
                                                type: "input"
                                            },
                                            __config__: {
                                                label: "默认值",
                                                required: true
                                            }
                                        },
                                        properties: {
                                            __bpmnConfig__: {
                                                type: "badge",
                                                $type: "flowable:Properties",
                                                $isMany: false
                                            },
                                            __config__: {
                                                label: "属性列表"
                                            },
                                            showName: "编辑",
                                            badgeConfig: {
                                                __bpmnConfig__: {
                                                    $type: "flowable:Property", //表示badge属于这个类型
                                                    $dataPath: "values"
                                                },
                                                fields: {
                                                    name: {
                                                        __bpmnConfig__: {
                                                            type: "input"
                                                        },
                                                        __config__: {
                                                            label: "名称",
                                                            required: true
                                                        }
                                                    },
                                                    value: {
                                                        __bpmnConfig__: {
                                                            type: "input"
                                                        },
                                                        __config__: {
                                                            label: "值",
                                                            required: true
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        validation: {
                                            __bpmnConfig__: {
                                                type: "badge",
                                                $type: "flowable:Validation",
                                                $isMany: false
                                            },
                                            __config__: {
                                                label: "约束条件"
                                            },
                                            showName: "编辑",
                                            badgeConfig: {
                                                __bpmnConfig__: {
                                                    $type: "flowable:Constraint", //表示badge属于这个类型
                                                    $dataPath: "constraints"
                                                },
                                                fields: {
                                                    name: {
                                                        __bpmnConfig__: {
                                                            type: "input"
                                                        },
                                                        __config__: {
                                                            label: "名称",
                                                            required: true
                                                        }
                                                    },
                                                    config: {
                                                        __bpmnConfig__: {
                                                            type: "input"
                                                        },
                                                        __config__: {
                                                            label: "配置",
                                                            required: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }]
            },
            loopCharacteristics: {
                __bpmnConfig__: {
                    $undefinedBy: "this.isSequential === undefined",
                    $type: "bpmn:MultiInstanceLoopCharacteristics"
                },
                fields: {
                    isSequential: {
                        __bpmnConfig__: {
                            type: "select"
                        },
                        __config__: {
                            $collapseItemName: "multipleInstances",
                            label: "多实例"
                        },
                        __slot__: {
                            options: [{
                                    label: "串行",
                                    value: true
                                },
                                {
                                    label: "并行",
                                    value: false
                                }
                            ]
                        }
                    },
                    collection: {
                        __bpmnConfig__: {
                            type: "input"
                        },
                        __config__: {
                            $collapseItemName: "multipleInstances",
                            label: "集合"
                        }
                    },
                    elementVariable: {
                        __bpmnConfig__: {
                            type: "input"
                        },
                        __config__: {
                            $collapseItemName: "multipleInstances",
                            label: "元素变量"
                        }
                    },
                    loopCardinality: {
                        __bpmnConfig__: {
                            $type: "bpmn:FormalExpression",
                            $isMany: false, // 用于返显数据
                            $bodyPropertyName: "body"
                        },
                        fields: {
                            body: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    $collapseItemName: "multipleInstances",
                                    label: "循环基数"
                                }
                            }
                        }
                    },
                    completionCondition: {
                        __bpmnConfig__: {
                            $type: "bpmn:FormalExpression",
                            $isMany: false, // 用于返显数据
                            $bodyPropertyName: "body"
                        },
                        fields: {
                            body: {
                                __bpmnConfig__: {
                                    type: "input"
                                },
                                __config__: {
                                    $collapseItemName: "multipleInstances",
                                    label: "完成条件"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}