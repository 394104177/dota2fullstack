import Vue from 'vue';
import maskLoading from "./mask.vue";
const Mask = Vue.extend(maskLoading)

const maskDirective = () => {
    Vue.directive("dhtLoading", {
      //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      bind(el, binding) {
        let background = binding.value.background,
        text = binding.value.text,
        iconSrc = binding.value.iconSrc,
        iconWidth = binding.value.iconWidth,
        iconHeight = binding.value.iconHeight,
        color = binding.value.color,
        fontSize = binding.value.fontSize;


        const mask = new Mask({
            el: document.createElement("div"),
            data: {
                fullscreen: !!binding.modifiers.fullscreen,
                background: background ? background : "0, 0, 0, 0.6",
                text: text ? text : "加载中…",
                iconSrc: iconSrc ? iconSrc : require("@/assets/Loading.png"),
                iconWidth: iconWidth ? iconWidth : null,
                iconHeight: iconHeight ? iconHeight : null,
                color: color ? color : null,
                fontSize: fontSize ? fontSize : null

            }
          });
        el.instance = mask; //将Vnode mask存入
        el.mask = mask.$el; //dom存入，方便获取
        toggleLoading(el, binding);
     
        
      },
      // 当被绑定的元素插入到 DOM 中时……
      //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      inserted: function() {
        console.log("元素插入的时候");
      },
      //所在组件的 VNode 更新时调用
      update(el, binding) {
         //console.log("更新了", binding);
        if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding);
        }
      },
      //指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated() {
        console.log("渲染完成了");
      },
      //只调用一次，指令与元素解绑时调用
     
    });
    const toggleLoading = function(el, binding) {
        //console.log(binding);
        if (binding.value) {
          Vue.nextTick(() => {
            if (binding.modifiers.fullscreen) {
              //全屏情况下
              //el.instance.fullscreen = true;
              //document.body.style.overflow = "hidden";
              document.body.appendChild(el.mask);
            } else {
              //el.instance.fullscreen = false;
              //非全屏情况下
              let height = el.clientHeight; //当前元素高度
              let width = el.clientWidth; //当前元素宽度
              let offsetTop = el.offsetTop; //当前元素距离顶部距离
              //给蒙版赋值
              el.mask.style.top = offsetTop + "px";
              el.mask.style.height = height + "px";
              el.mask.style.width = width + "px";
              //console.log(offsetTop);
              el.appendChild(el.mask);
            }
          });
        } else {
          //移除节点
          el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
          el.instance && el.instance.$destroy();
        }
    } 
  };
  

  export default maskDirective;
