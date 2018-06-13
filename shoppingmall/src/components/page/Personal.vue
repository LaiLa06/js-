<template>
  <div class="container">
    <div class="base-info">
      <div class="user-look">
        <img :src="useLook" alt="">
      </div>
      <div class="user-name">
        <p>我是快乐的小胡子</p>
        <p>普通用户</p>
      </div>
      <van-icon name="setting" class="icon-set"></van-icon>
    </div>
    <div class="my-order">
      <van-cell-group>
        <van-cell title="我的订单" is-link value="全部订单" to="/order/all" />
        <van-row class="my-list">
          <!--不可以给组件绑定真实的事件 用div套一下-->
          <!--编程式导航-->
          <div @click="$router.push({name:'order',params:{type:'daifukuan'}})"><van-col span="6">
            <div>
              <van-icon name="daifukuan"></van-icon>
            </div>
            <p>待付款</p>
          </van-col></div>
          <!--声明式导航-->
          <div @click="$router.push('/order/daifahuo')"><van-col span="6">
            <div>
              <van-icon name="daifahuo" info="3"></van-icon>
            </div>
            <p>待发货</p>
          </van-col></div>
          <div @click="$router.push('/order/wuliu')"><van-col span="6">
            <div>
              <van-icon name="wuliu"></van-icon>
            </div>
            <p>待收货</p>
          </van-col></div>
          <div @click="$router.push('/order/shouhouguanli')"><van-col span="6">
            <div>
              <van-icon name="shouhouguanli"></van-icon>
            </div>
            <p>退款售后</p>
          </van-col></div>
        </van-row>
      </van-cell-group>
    </div>
    <div class="my-card">
      <van-cell-group>
        <van-cell title="我的电子券" is-link value="全部电子券" />
        <van-row class="my-list">
          <van-col span="8">
            <div>
              <van-icon name="coupon"></van-icon>
            </div>
            <p>待使用</p>
          </van-col>
          <van-col span="8">
            <div>
              <van-icon name="coupon-used"></van-icon>
            </div>
            <p>已使用</p>
          </van-col>
          <van-col span="8">
            <div>
              <van-icon name="coupon-due"></van-icon>
            </div>
            <p>过期关闭</p>
          </van-col>
        </van-row>
      </van-cell-group>
    </div>
    <div class="my-module">
       <van-cell-group>
         <van-cell title="我的收藏" icon="shoucang" is-link />
         <van-cell title="我的团队" icon="team" is-link />
         <van-cell title="我的金豆" icon="gold-bean" is-link />
         <van-cell title="收货地址" icon="dingwei" is-link />
         <van-cell title="实名认证" icon="id-card" is-link />
       </van-cell-group>
    </div>
    <tabBar :active="3"></tabBar>
  </div>

</template>

<script>
  import tabBar from "../base/tabBar.vue"
  import useLook  from "../../assets/images/avatar_default.png"
  export default {
    name: "Personal",
    data(){
      return {
        useLook
      };
    },
    components: {
      tabBar
    }
  }
</script>

<style scoped lang="less">
  .van-col{
    text-align:center;
    div{
      .van-icon{font-size:.36rem}
    }
    p{font-size:0.24rem}
  }
  .van-cell:not(:last-child)::after{left:0}
  .van-cell__value{color:#2d353c}
  .my-list{
    padding:.2rem;
  }
  .container{
    background-color:#dddddd38;   // 前六位是样色，最后两位是背景色
    .base-info{
      position:relative;
      background-color:#efda24;
      padding:0.5rem 0.5rem;display:flex;flex-direction:row;flex-wrap: nowrap;
      .user-look{
        width:1.5rem;height:1.5rem;margin-right:.3rem;
        img{border-radius:50%;width:100%;height:100%}
      }
      .icon-set{
        position:absolute;top:.3rem;right:.3rem;color:#fff;
      }
    }
    .my-order{
      margin:.14rem 0;

    }
  }
</style>
