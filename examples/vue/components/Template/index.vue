<template>
  <div :class="$style.wrap">
        <div classname="classname" class="jsx123" :class1="{test: true}" :class2="['test']" :class3="'test'">test</div>
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="left">
            <div class="title">
              {{item.realtimeTitle}}
            </div>
            <div class="context">
              <div class="middle">
                <span class="source">第三方资讯</span>
                <span>{{item.sendTime}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <img :src="item.coverUri" />
          </div>
        </div>
      </div>
</template>
<script>
import data from './data';
// import './styles.css';
// import './styles1.css';

export default {
  data () {
    return {
      name: 'list',
      list: data.data.content
    }
  },
}
</script>
<style module>
.jsx {
  border: 1px solid;
}
.wrap {
  padding: 0 0.3rem;
  font-size: 0.14rem;
}

.item {
  padding: 0.28rem 0;
  display: flex;
}

.left {
  flex: 1;
  padding-right: 0.3rem;
  width: 4.6rem;
}

.title {
  font-size: 0.3rem;
  font-family: PingFangSC, PingFangSC-Regular, sans-serif;
  font-weight: 400;
  color: #333;
  line-height: 0.44rem;
  height: 0.88rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.context {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  height: 0.96rem;
}

.middle {
  height: 0.22rem;
  font-size: 0;
  font-family: PingFangSC, PingFangSC-Regular, sans-serif;
  font-weight: 400;
  color: #666;
  line-height: 0.22rem;
}

.source {
  margin-right: 0.38rem;
}

.left .context .middle span {
  display: inline;
  font-size: 0.22rem;
}

.right {
  flex: 0 0 2.3rem;
  height: 1.84rem;
  font-size: 0;
}

.right img {
  width: 2.3rem;
  height: 1.84rem;
  border-radius: 0.08rem;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>