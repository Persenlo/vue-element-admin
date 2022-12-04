<template>
    <div class="expand-button">
        <img :src="getSrc()" class="expand-button-icon"/>
        <span class="expand-button-text">
            {{text}}
        </span>
    </div>
</template>

<script>

export default{

    props: ['text','iconurl'],

    methods:{
        getSrc(){
            return new URL(this.iconurl,import.meta.url).href
        }
    },

}

</script>

<style>
/* 卡片设计 */
.expand-button{
    /* 布局 */
    width: 60px;
    height: 60px;
    padding: 0 20px 0 20px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 2px 2px 2px rgb(201, 201, 201);
    /* flex布局 */
    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.2s;
}
.expand-button:hover{
    width: 125px;
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.2s;
}
/* 图标 */
.expand-button-icon{
    user-select: none;
    width: 25px;
    height: 25px;
}
/* 文本 */
.expand-button-text{
    width: 0;
    user-select: none;
    margin: 0 0 0 10px;
    display: none;
    transition: 0.3s;
    /*强制单行显示*/
    white-space: nowrap;
    /*超出部分省略号表示*/
    text-overflow: ellipsis;
    /*超出部分隐藏*/
    overflow: hidden;
    /*设置显示的最大宽度*/
    max-width: 150px;
}
.expand-button:hover .expand-button-text{
    width: auto;
    display: block;
    transition: 0.3s;
}

</style>