`datasourceUrl`

获取后台数据源URL地址



`bpmnCollapseItems`

描述属性/元素所归属的，应配置为数组

大类排序索引号，越小越靠前显示
index: 1,
大类英文名，节点属性应配置在 `__config__`下，例如：$collapseItemName:"general"
name: 'general',
大类中文名
label: "常规配置"



`common`
公共字段，所有类型的节点都具备这些属性/元素



`bpmnComponents`
bpmn流程组件配置清单，包含 
bpmn:Process,bpmn:SubProcess,bpmn:StartEvent,bpmn:IntermediateThrowEvent,
bpmn:Task,bpmn:SendTask,bpmn:ReceiveTask,bpmn:UserTask,flowable:UserTask,
bpmn:ManualTask,bpmn:BusinessRuleTask,bpmn:ServiceTask,bpmn:ScriptTask,
bpmn:EndEvent,bpmn:SequenceFlow,bpmn:ExclusiveGateway,bpmn:ParallelGateway,
bpmn:InclusiveGateway,bpmn:ComplexGateway,bpmn:EventBasedGateway...等流程组件节点



`__bpmnConfig__`

当前节点属性组件类型，当配置了type且type!=badge，说明该属性是简单属性,
配置的类型清单如下：
input:单行文本,input-number:数值,textarea:多行文本,password:密码,
select:下拉选择,cascader:级联选择,radio:单选框,checkbox:多选框,
switch:开关,slider:滑块,time:时间选择,time-range:时间区间选择,
date:日期选择,date-range:日期区间选择,rate:评分,badge:一对多关系配置
type: "input",

当配置了$type说明该配置是复杂元素
表示元素在bpmn模型中的类型，该类型配置在描述文件*.json(例如：flowable.json,bpmn.json)中,
当只配置了$type，应继续配置 fields ，配置当前元素的属性或子元素
当配置了$type，且又配置了 type=badge，说明该元素是一对多关系的复杂元素，应继续配置showName,badgeConfig
$type: "bpmn:Documentation", 

内置的bpmn描述文件属性的isMany配置，若内置isMany=true,则从bpmnModeler拿到数据是数组
isMany: true, 

配合isMany，若内置属性配置为isMany=true，但实际属性是单节点，则配置$isMany=false
$isMany: false,

复杂属性在bpmn模型定义中，会有一个bodyProperty属性，若存在bodyProperty则配置$bodyPropertyName即可
像类型为bpmn:Documentation的bodyProperty=text，类型bpmn:Expression的bodyProperty=body，详见bpmn.json
您也可以自定义描述文件，用于描述自定义的属性/元素信息，可参考 [MiyueFE(Bpmn-js自定义文件说明)](https://juejin.cn/post/6912331982701592590)
$bodyPropertyName: "text",
复杂元素在某些条件下应设置成 undefined，例如多实例场景下isSequential-多实例标识未设置时，则自身元素应为undefined
$undefinedBy: "this.isSequential === undefined",
当前属性/元素相对父级的数据位置
$dataPath: "values",



`__config__`
简单属性详细配置，其余默认配置请见`form.js`，也可查看表单设计器配置 [form-generator](https://gitee.com/mrhj/form-generator) (本流程设计器设计思想来源于表单设计器)
label:属性中文名,required:属性必输,showBy:属性是否显示判断条件
$collapseItemName:属性归属大类名称,
type=select,radio,checkbox时，若涉及后台数据，应配置 dataType:dynamic-动态数据 static-静态数据,dynamicOptions:动态数据详细配置



`__slot__`
type=select,radio,checkbox，若涉及静态数据，应配置该项，配置为数组



`简单属性的其余配置`
与`__bpmnConfig__`,`__config__`,`__slot__ `同级的，是`__bpmnConfig__.type`对应的`elementUI`组件的其他属性的配置，
例如`dueDate`配置，`dueDate.__bpmnConfig__.type = date` 表示，日期组件，但 `dueDate.type = datetime`则将日期组件配置成日期时间组件

```js
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
}
```