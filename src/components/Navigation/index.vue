<template>
   <div class="select-option">
            <div class="select-option-all">
                <div class="select-option-firstpage">
                    <router-link to="/home"  class="dlt_ white-color">首页</router-link>
                </div>
                <div class="select-option-compareprice"> 
                    <router-link to="/compare" class="dlt_ white-color"><span>比价</span></router-link>
                </div>
                <div class="select-option-oldprice">
                    <router-link to="/history" class="dlt_ white-color"><span>历史价格</span></router-link>
                </div>
            </div>
        </div>
</template>

<script>
export default {
}
</script>

<style>
.select-option{width: 100%;height: 40px;background: rgb(0, 0, 0);}
.select-option-all{margin-left: auto;margin-right: auto;width: 1200px;height: 40px;display: flex;}
.select-option-firstpage{background: rgba(19, 124, 173, 0.705);text-align: center;line-height: 40px;width: 80px;height: 40px;}
.select-option-compareprice{ background: none;text-align: center;line-height: 40px;width: 120px;height: 40px;}
.select-option-oldprice{background: none;text-align: center;line-height: 40px;width: 100px;height: 40px;}
.white-color{color: rgb(255, 255, 255);}
</style>