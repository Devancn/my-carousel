### 简介
一个支持手势鼠标滑动的轮播组件，通过自定义loader解析类似Vue的SFC(Single File Components)组件模板解析成js组件代码

#### 对象
- Properties 属性
- Methods 方法
- Inherit 继承关系

### 组件
- Properties 属性
- Methods 方法
- Inherit 继承关系
- Attribute
- Config 构造组件时的一些设置
- State 组件内部state
- Event 组件的事件
- Lifecycle 组件的生命周期
- Children 使用Children机制来描述组件树对应的界面

#### State & Children
State只会受到用户的输入（交互）来改变，它Children与属于组件内一部分

#### Attribute & Method & Property & Event
属于组件的使用者与组件的作者交互的一种方式

#### Attribute vs Property
这两个表示同一个概念的时候有一样也有不一样，比如id两个所表达的概念是一致的，但是表示class概念的时候，Attribute是名字class，而js名字是className,(class在js中属于关键字，在es3时不能用关键词作为property)。html a元素作为property获取href的值url是resolve过得结果，而作为attribute时获取href的url值是(getAttribute)与HTML中的代码完全一直，因这两者关系所以jQuery与这两个对应的API分别叫做attr与prop ^_^，在对input的property value进行修改并不会影响input的 attribute value
- Attribute
强调描述属性,在html这种标记语言中能改的只有attribute，在js中只能通过getAttribute与setAttribute修改
- Property
强调从属关系，属于面向对象的一种语法，只能在js中修改，property又分为数据属性，与访问器属性


