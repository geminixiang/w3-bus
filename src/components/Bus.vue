<template>
  <div id="infoCard" ref="gesture">
    <div class="info" v-if="choiceItem">
      <h1 class="font-bold text-2xl">{{ choiceItem.StopName.Zh_tw || "NULL" }}</h1>
      <p class="text-sm text-gray-800">{{ choiceItem.StopAddress }}</p>
      <div class="absolute right-10 top-6 text-center">
        <svg class="text-2xl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5455 4C14.6364 4 12.9545 4.93333 12 6.4C11.0455 4.93333 9.36364 4 7.45455 4C4.45455 4 2 6.4 2 9.33333C2 14.6222 12 20 12 20C12 20 22 14.6667 22 9.33333C22 6.4 19.5455 4 16.5455 4Z"
            fill="#FF4A55"
            stroke="#FF4A55"
          />
        </svg>
        <p class="text-sm">收藏</p>
      </div>
      <div class="absolute right-24 top-6 text-center">
        <svg class="text-2xl" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.33069 20.3481L1.65187 12.6693C0.782711 11.8002 0.782711 10.1998 1.65187 9.33069L9.33069 1.65187C10.1998 0.782711 11.8002 0.782711 12.6693 1.65187L20.3481 9.33069C21.2173 10.1998 21.2173 11.8002 20.3481 12.6693L12.6693 20.3481C11.8002 21.2173 10.1998 21.2173 9.33069 20.3481Z"
            fill="#377BFF"
            stroke="#377BFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M7.25 13.5V11C7.25 10.2625 7.7675 9.75 8.5 9.75H14.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.252 7.24405L14.7559 9.74801L12.252 12.252" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="text-sm">路線</p>
      </div>
      <hr class="pt-4 mt-4" />
      <h1 class="font-bold text-base pb-3">即將抵達本站公車</h1>

      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="bus in realtime" :key="bus" v-on:click="busCardhandle(bus)">
          <div class="carousel__item rounded-2xl" v-if="realtime">
            <div class="p-3 text-left">
              <i class="fas fa-bus font-bold mr-1"></i>
              <span class="font-bold rr">{{ bus.RouteName.Zh_tw || "NULL" }}</span>
              <span class="text-right bg-gray-900 text-white p-1">往{{ bus.endstop || "NULL" }}</span>
              <hr class="mt-2" />
              <div v-if="bus.StopStatus == 0">
                <p class="mt-4">再過</p>
                <p class="text-left text-red-500 text-2xl font-bold Sfpro" v-if="bus.EstimateTime < 10">{{ bus.EstimateTime }}<span class="text-base px-1">分鐘</span></p>
                <p class="text-left text-black text-2xl font-bold Sfpro" v-else>{{ bus.EstimateTime }}<span class="text-base px-1">分鐘</span></p>
                <p class="text-left">即抵達{{ choiceItem.StopName.Zh_tw || "NULL" }}</p>
              </div>
              <div v-if="bus.StopStatus != 0">
                <p class="text-left text-red-500 text-2xl font-bold Sfpro mt-8">{{ bus.EstimateTime }}<span class="text-base px-1"></span></p>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
      <Route :chooseBusCard="chooseBusCard" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Route from "../components/Route.vue";

import Hammer from "hammerjs";
import jsSHA from "jssha";

export default defineComponent({
  name: "Bus",
  props: ["choiceItem"],
  components: {
    Carousel,
    Slide,
    Route
  },
  data: () => ({
    hammer: null,
    timer: "",
    // carousel settings
    settings: {
      itemsToShow: 2,
      snapAlign: "start",
      transition: 150
    },
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 4,
        snapAlign: "center"
      },
      // 1024 and up
      1024: {
        itemsToShow: 6,
        snapAlign: "center"
      }
    },
    realtime: [],
    chooseBusCard: "0南"
  }),
  created() {
    this.getBusRealTime();
    this.timer = setInterval(this.getBusRealTime(), 30000);
  },
  mounted() {
    this.init();
  },
  methods: {
    busCardhandle(bus) {
      this.chooseBusCard = bus.RouteName.Zh_tw;
      console.log("巴士卡", this.chooseBusCard);
    },
    init() {
      this.hammer = new Hammer(this.$refs.gesture);
      // 需識別事件
      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

      this.hammer.on("swipedown", () => {
        var card = document.getElementById("infoCard");
        card.style.bottom = "-350px";
      });
    },
    getAuthorizationHeader() {
      let AppID = "69121a1d8f714a5faa4f54c512bb459e";
      let AppKey = "nYALaDjx1Au-PYCnZOnL-InFIZI";

      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      let HMAC = ShaObj.getHMAC("B64");
      let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
      return { Authorization: Authorization, "X-Date": GMTString };
    },
    getBusRealTime() {
      console.log("選擇站點ID", this.choiceItem.StationID);
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/PassThrough/Station/${this.choiceItem.StationID}?$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then((response) => {
          this.realtime = response.data;
          this.getBusDestination();
          console.log("站點預估到達資訊", this.realtime);
        })
        .catch((error) => console.log("error", error));
      return;
    },
    getBusDestination() {
      var that = this;
      this.realtime.forEach((item) => {
        this.axios({
          method: "get",
          // 這邊用filter 確保取得正確路線
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taipei/${item.RouteName.Zh_tw}?$filter=RouteName%2FZh_tw%20eq%20'${item.RouteName.Zh_tw}'&$format=JSON`,
          headers: that.getAuthorizationHeader()
        })
          .then((response) => {
            console.log("取得路線資訊", response.data);
            if (item.Direction == 1) item["endstop"] = response.data[0].DepartureStopNameZh;
            else if (item.Direction == 0) item["endstop"] = response.data[0].DestinationStopNameZh;
            // StopStatus (Int32, optional): 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] ,

            if (item.StopStatus == 1) item["EstimateTime"] = "尚未發車";
            else if (item.StopStatus == 2) item["EstimateTime"] = "交管不停靠";
            else if (item.StopStatus == 3) item["EstimateTime"] = "末班車已過";
            else if (item.StopStatus == 4) item["EstimateTime"] = "今日未營運";
            else {
              if (item["EstimateTime"] < 60) return;
              let t = Math.floor(item["EstimateTime"] / 60);
              if (t < 10) {
                t = "0" + t.toString();
              }
              item["EstimateTime"] = t;
            }
          })
          .catch((error) => console.log("error", error));
      });
    }
  },
  watch: {
    choiceItem: function () {
      this.getBusRealTime();
      var card = document.getElementById("infoCard");
      card.style.bottom = "0px";
    }
  }
});
</script>

<style scoped>
@font-face {
  font-family: "SF Pro";
  src: url("~@/assets/SF-Pro.ttf");
}
#infoCard {
  position: absolute;
  bottom: -350px;
  z-index: 400;
  background: #fff;
  box-shadow: 0px 0px 14px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  padding: 18px 24px;
  width: 100vw;
  box-sizing: border-box;
  transition: bottom 0.5s, width 0.5s;
}

.carousel__item {
  margin: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 156px;
  width: 100%;
  box-shadow: 0px 0px 11.8048px rgba(0, 0, 0, 0.1);
}

.carousel__slide {
  background: #fff;
  height: 156px;
}

.Sfpro {
  font-family: "SF Pro", "PinfFang TC";
}
</style>
