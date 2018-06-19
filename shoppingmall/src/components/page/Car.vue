<template>
  <div class="container">
    <div v-if="goods.length">
      <div class="editor-head" @click="isEditor = !isEditor">
        <van-icon :name="isEditor?'success':'editor'"></van-icon>
        <span>{{isEditor?"完成":"编辑"}}</span>
      </div>
      <div class="goos-list">
        <van-checkbox-group v-model="checkGoods">
          <div v-for="item in goods" class="goods-card">
            <van-checkbox :disabled="!item.status" :name="item"></van-checkbox>
            <van-card

              :title="item.title"
              :desc="item.desc"
              :num="item.num"
              :price="item.price"
              :thumb="item.thumb"
            >
              <div slot="footer" v-if="!isEditor">
                <p>{{item.data?item.data:'2018-06-14'}}</p>
              </div>
              <div slot="footer" v-if="isEditor">
                  <van-stepper v-model="item.num" disableInput></van-stepper>
              </div>
            </van-card>
            <div class="goods-delete" v-if="isEditor" @click="goodDelete(item.id)">删除</div>
          </div>
        </van-checkbox-group>

      </div>
      <div class="clear-goods" v-if="isClear" @click="clearGoods">
         <van-icon name="lajitong" v-if="isClear">清楚失效商品</van-icon>
      </div>
      <div>
        <van-submit-bar
          currency="￥"
          :disabled ='!checkGoods.length && !isEditor'
          :price="priceAll*100"
          :button-text="isEditor?'删除':'结算'"
          @submit="onSubmit"
        >
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <tabBar :active="2"></tabBar>
  </div>

</template>

<script>
  import tabBar from "../base/tabBar.vue"

  export default {
    name: "cart",
    data(){
      return{
        isEditor:false,
        checkGoods:[],
        goods: [
          {
            id: '1',
            title: '进口香蕉',
            desc: '约250g，2根',
            price: 200,
            status: 0,   // 0 是指失效商品
            num: 1,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
          }, {
            id: '2',
            title: '陕西蜜梨',
            desc: '约600g',
            price: 690,
            status: 1,
            num: 3,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
          }, {
            id: '3',
            title: '美国伽力果',
            desc: '约680g/3个',
            price: 2680,
            status: 1,
            num: 1,
            thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
          }]
      }
    },
    methods: {
      goodDelete(id) {
        // 如果只是使用dialog不需要use
        // 使用use后会在this实例上加上$dialog
        this.$dialog.confirm({
          title: '确定要删除商品吗？',
          // message: '弹窗内容'
        }).then(() => {
          // on confirm
          this.goods = this.goods.filter(i => i.id !=id)
        }).catch(() => {
          // on cancel
        });

      },
      clearGoods() {
        this.goods = this.goods.filter(item => item.status)
      },
      onSubmit() {
        // 删除，结算
        if(!this.isEdit){
          // 没选中的留下
          this.goods = this.goods.filter(item=>{
            let is = !this.checkGoods.includes(item);
            this.checkGoods = this.checkGoods.filter(val=>val!=item);
            return is
          });
        }else{
          // 结算
        }
      }
    },
    computed:{
      isClear() {
        return this.goods.some(item => item.status === 0)
      },
      // checkGoods
      priceAll() {
         return this.checkGoods.reduce((prev,item)=>{
           return prev+item.price*item.num
         },0)
      },
      checked: {
        get() {
          // checkGoods这个的长度等于没失效的数据的长度
          let count = this.goods.reduce((prev,item)=>{
            return prev+ Number(item)
          },0);
          return this.checkGoods.length === count
        },
        set(val) {
          if(val){
            this.checkGoods = this.goods.filter(item=>item.status);
          }else{
            this.checkGoods=[];
          }
        }
      }
    },
    components: {
      tabBar
    }
  }
</script>

<style scoped lang="less">
  .editor-head{
    background-color:#fff;
    padding:0.2rem;
    text-align:right;
    span{vertical-align:middle;font-size:14px}
    i{font-size:14px;vertical-align:middle}
  }
  .goods-card{
    display:flex;flex-direction:row;flex-wrap:wrap;justify-content: center;align-items: center;text-align:center;
    background: #fff;border-bottom:1px solid #EBEBEB;
    &:nth-of-type(1){border-top:1px solid #EBEBEB}
    .van-checkbox{width:50px}
    .van-card{flex:1;background-color:#fff;}
    .van-card:not(:first-child){margin-top:0}
  }
  .goods-delete{
    background-color:red;
    line-height: 1.8rem;
    width:40px;
    height:100%;color:#fff;
    font-size:14px;
  }
  .clear-goods{
    text-align:center;padding:12px 0;color:#999;
    .van-icon{font-size:14px}
  }
  .van-submit-bar{bottom:50px;.van-checkbox{padding-left:15px;}}

</style>
