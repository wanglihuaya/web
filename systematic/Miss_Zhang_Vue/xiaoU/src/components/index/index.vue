<template>
  <div>
    <div class="body">
      <header>
        <div class="arrow"></div>
        <div class="shRight">
        </div>
        <p class="shCenter">小U商城</p>
      </header>
      <div class="headerList">
        <div class="headerListTop">
          <div class="map"></div>
          <div class="logo"></div>
          <div class="search">
            <span></span>
            <input type="text" placeholder="按内容搜索">
          </div>
          <div class="shopLogo"></div>
        </div>
        <div class="headerListBottom">
          <ul>
            <li v-for='item in headerListBottom' :key="item.id">
            {{ item.header }}</li>
          </ul>
          <div class="classify">
            <div class="hamburg"></div>
            <span>分类</span>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="bannerCon">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrapper">
              <swiper-slide :key="banner.id" v-for="banner in banners">
                <img :src="banner.img">
              </swiper-slide>
          </swiper>
          <div div class="swiper-pagination" slot="pagination"></div>
        </div>
        <div class="bannerList">
          <ul>
            <li v-for="item in bannerList" :key="item.id">
              <img :src="item.img" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="conLeft">
          <div class="kill">
            <div class="left">{{container[0].main}}</div>
            <div class="right">{{container[0].sec}}</div>
          </div>
          <div class="time">
            <p>{{container[0].word}}</p>
            <br>
            <br>
            <!-- 倒计时 -->
            <div class="count">
              <countdown :end-time="new Date().getTime() + 60000">
              <template v-slot:process="anyYouWantedScopName">
                <i>{{anyYouWantedScopName.timeObj.ceil.h }}</i>
                <a> :</a>
                <i>{{anyYouWantedScopName.timeObj.ceil.m }}</i>
                <a> :</a>
                <i>{{anyYouWantedScopName.timeObj.ceil.s}}</i>
              </template>
            </countdown>
            </div>
          </div>
        </div>
        <div class="conRight">
          <div class="conRT">
            <p>{{container[1].main}}</p>
            <i>{{container[1].word}}</i>
            <span>{{container[1].sec}}</span>
          </div>
          <div class="conRB">
            <p>{{container[2].main}}</p>
            <i>{{container[2].word}}</i>
            <span>{{container[2].sec}}</span>
          </div>
        </div>
      </div>
      <div class="shopList">
        <ul>
          <li class="left active">{{shopList[0].class}}</li>
          <li class="right">畅购全球</li>
        </ul>
        <div class="shopImg">
          <img v-for="item in shopList" :key="item.id" :src="item.img" alt="">
        </div>
      </div>
    </div>
    <footer>
      <ul>
        <li @click="active(index)" v-for="(item,index) in footer" :key="index+1">
          <img ref='aaa' :src="[index==footerflag?require('../../assets/img/icon/nav/home/selected.png'):require('../../assets/img/icon/nav/home/unselected.png')]" alt="">
          <p :style="{'color':index==footerflag?'#ff6040':''}">{{item.name}}</p>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props: {
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      footerflag: 0,
      headerListBottom: [
        {
          id: '1',
          header: '推荐'
        },
        {
          id: '2',
          header: '女装'
        },
        {
          id: '3',
          header: '鞋包'
        },
        {
          id: '4',
          header: '居家'
        },
        {
          id: '5',
          header: '母婴'
        },
        {
          id: '6',
          header: '美妆'
        }
      ],
      banners: [
        {
          id: '1',
          img: require('../../assets/img/banner/index/mid.png')
        },
        {
          id: '2',
          img: require('../../assets/img/banner/index/beside.png')
        },
        {
          id: '3',
          img: require('../../assets/img/banner/index/mid.png')
        },
        {
          id: '4',
          img: require('../../assets/img/banner/index/beside.png')
        },
        {
          id: '5',
          img: require('../../assets/img/banner/index/mid.png')
        },
        {
          id: '6',
          img: require('../../assets/img/banner/index/beside.png')
        }
      ],
      bannerList: [
        {
          id: '1',
          img: require('../../assets/img/icon/index/kingkong/seckill.png'),
          name: '限时秒杀'
        },
        {
          id: '2',
          img: require('../../assets/img/icon/index/kingkong/top.png'),
          name: '畅销商品'
        },
        {
          id: '3',
          img: require('../../assets/img/icon/index/kingkong/brand.png'),
          name: '品质大牌'
        },
        {
          id: '4',
          img: require('../../assets/img/icon/index/kingkong/selfsupport.png'),
          name: '小U自营'
        },
        {
          id: '5',
          img: require('../../assets/img/icon/index/kingkong/integral.png'),
          name: '积分商城'
        }
      ],
      container: [
        {
          id: '1',
          main: '限时秒杀',
          sec: '查看更多 >',
          word: '每天0点场，好货秒不停'
        },
        {
          id: '2',
          main: '品牌上新',
          sec: '疯抢红包 >',
          word: '0点整，抢大牌'
        },
        {
          id: '3',
          main: '日用好物',
          sec: '塞满奖券 >',
          word: '愿君多采撷'
        }
      ],
      shopList: [
        {
          id: '1',
          class: '双11尖货预购',
          img: require('../../assets/img/pic/commodity/01.png')
        },
        {
          id: '2',
          class: '双11尖货预购',
          img: require('../../assets/img/pic/commodity/02.png')
        },
        {
          id: '3',
          class: '双11尖货预购',
          img: require('../../assets/img/pic/commodity/03.png')
        },
        {
          id: '4',
          class: '双11尖货预购',
          img: require('../../assets/img/pic/commodity/04.png')
        }
      ],
      footer: [
        {
          name: '商城'
        },
        {
          name: '分类'
        },
        {
          name: '购物车'
        },
        {
          name: '我'
        }
      ],
      // swiper 初始化
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true,
          disableOnInteraction: true
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 1.05,
        centeredSlides: true,
        spaceBetween: -10
      }
    }
  },
  methods: {
    active (i) {
      console.log('i::', i)
      console.log('footerflag::', i)
      this.footerflag = i
    }
  },
  computed: {
  }
}
</script>
<style scoped>
@import url('../../assets/css/index.css');
</style>
