<template>
  <div id="infoCard" ref="gesture">
    <div class="info" v-if="choiceItem">
      <h1 class="font-bold text-2xl title">{{ choiceItem.StopName.Zh_tw || "NULL" }}</h1>
      <p class="text-base text-gray-800 title">{{ choiceItem.StopAddress }}</p>
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
          <path
            d="M7.25 13.5V11C7.25 10.2625 7.7675 9.75 8.5 9.75H14.75"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.252 7.24405L14.7559 9.74801L12.252 12.252"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-sm">路線</p>
      </div>
      <hr class="pt-4 mt-4" />
      <h1 class="font-bold text-lg pb-3 inline-block">即將抵達本站公車</h1>
      <span class="float-right px-3">於{{ timer }}秒前更新</span>

      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="bus in realtime" :key="bus" v-on:click="busCardhandle(bus)">
          <div class="carousel__item rounded-2xl" v-if="realtime">
            <div class="p-3 text-left">
              <i class="fas fa-bus font-bold mr-1"></i>
              <span class="font-bold title">{{ bus.RouteName.Zh_tw || "NULL" }}</span>
              <p class="text-left text-gray-800 text-sm p-1">往{{ bus.endstop || "NULL" }}</p>
              <hr class="mt-2" />
              <div v-if="bus.StopStatus == 0">
                <p class="mt-4">再過</p>

                <p
                  class="text-left text-black text-2xl font-bold Sfpro"
                  v-if="parseInt(bus.EstimateTime) >= 10"
                >
                  {{ bus.EstimateTime }}<span class="text-base px-1"></span>
                </p>
                <p class="text-left text-red-500 text-2xl font-bold Sfpro" v-else>
                  {{ bus.EstimateTime }}<span class="text-base px-1"></span>
                </p>
                <p class="text-left">即抵達{{ choiceItem.StopName.Zh_tw || "NULL" }}</p>
              </div>

              <!-- 這邊快被API氣死，有時StopSatus有問題，有時EstimateTime有問題 -->
              <div v-if="bus.StopStatus != 0">
                <p class="text-left text-red-500 text-2xl font-bold Sfpro mt-8">
                  {{ bus.EstimateTime }}<span class="text-base px-1"></span>
                </p>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
      <h1 class="font-bold text-base text-center speech-bubble" id="snackbar">
        請點擊，立即獲得更多公車動態資訊！
      </h1>
      <Route
        :chooseBusCard="chooseBusCard"
        :routeSwitch="routeSwitch"
        :userStop="choiceItem.StopName.Zh_tw"
        :cardStartEnd="cardStartEnd"
        @update="selfUpdate"
      />
    </div>
    <div v-else>
      <h1 class="font-bold text-2xl title">點擊站牌</h1>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Route from "../components/Route.vue";
import Myapi from "@/models/Myapi";

import Hammer from "hammerjs";

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
    cardStartEnd: ["ENDSTOP", "STARTSTOP"],
    routeSwitch: false,
    timer: 0,
    // carousel settings
    settings: {
      itemsToShow: 2,
      snapAlign: "start",
      transition: 150
    },
    breakpoints: {
      // 700px and up
      600: {
        itemsToShow: 3,
        snapAlign: "start"
      },
      // 1024 and up
      800: {
        itemsToShow: 4,
        snapAlign: "start"
      },
      1024: {
        itemsToShow: 5,
        snapAlign: "start"
      },
      1200: {
        itemsToShow: 2,
        snapAlign: "start"
      }
    },
    realtime: [],
    chooseBusCard: "18"
  }),
  created() {
    this.timer = setInterval(this.countup, 1000);
  },
  mounted() {
    this.init();
  },
  methods: {
    countup() {
      this.timer++;
    },
    busCardhandle(bus) {
      this.chooseBusCard = bus.RouteName.Zh_tw;
      if (bus.Direction == 0) {
        this.cardStartEnd = [bus.endstop, bus.startstop];
      } else {
        this.cardStartEnd = [bus.startstop, bus.endstop];
      }
      this.routeSwitch = !this.routeSwitch;
    },
    init() {
      this.hammer = new Hammer(this.$refs.gesture);
      // 需識別事件
      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

      this.hammer.on("swipeup", () => {
        var card = document.getElementById("infoCard");
        card.style.bottom = "0";
      });

      this.hammer.on("swipedown", () => {
        var card = document.getElementById("infoCard");
        card.style.bottom = "-450px";
      });
    },
    getBusRealTime() {
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/PassThrough/Station/${this.choiceItem.StationID}?$format=JSON`,
        headers: Myapi.getAuthorizationHeader()
      })
        .then((response) => {
          this.realtime = response.data;
          this.getBusDestination();
          // 字卡剩餘時間時間排序
          this.realtime.sort(function (a, b) {
            return b.EstimateTime - a.EstimateTime;
          });
          this.realtime.forEach((item, i) => {
            if (item.name === "進站中") {
              this.realtime.splice(i, 1);
              this.realtime.unshift(item);
            }
          });
        })
        .catch((error) => console.log("error", error));
    },
    getBusDestination() {
      this.realtime.forEach((item) => {
        this.axios({
          method: "get",
          // 這邊用filter 確保取得正確路線
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taipei/${item.RouteName.Zh_tw}?$filter=RouteName%2FZh_tw%20eq%20'${item.RouteName.Zh_tw}'&$format=JSON`,
          headers: Myapi.getAuthorizationHeader()
        })
          .then((response) => {
            // Direction [0:'去程',1:'返程',2:'迴圈',255:'未知']
            if (item.Direction == 1) {
              item["startstop"] = response.data[0].DestinationStopNameZh;
              item["endstop"] = response.data[0].DepartureStopNameZh;
            } else if (item.Direction == 0) {
              item["startstop"] = response.data[0].DepartureStopNameZh;
              item["endstop"] = response.data[0].DestinationStopNameZh;
            }

            // StopStatus (Int32, optional): 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] ,

            if (item["EstimateTime"] > 60) {
              //分鐘
              let t = Math.floor(item["EstimateTime"] / 60).toString();
              if (t < 10) {
                t = "0" + t;
              }
              item["EstimateTime"] = t + "分鐘";
            } else if (item["EstimateTime"] < 60) item["EstimateTime"] = "進站中";
            else if (item.StopStatus == 1) item["EstimateTime"] = "尚未發車";
            else if (item.StopStatus == 2) item["EstimateTime"] = "交管不停靠";
            else if (item.StopStatus == 3) item["EstimateTime"] = "末班車已過";
            else if (item.StopStatus == 4) item["EstimateTime"] = "今日未營運";
          })
          .catch((error) => console.log("error", error));
      });
    },
    selfUpdate(val) {
      this.routeSwitch = val;
    },
    sortOrder(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    }
  },
  watch: {
    choiceItem: function () {
      this.getBusRealTime();
      this.routeSwitch = false;
      this.timer = 0;
      var card = document.getElementById("infoCard");
      card.style.bottom = "0px";
    },
    timer: function () {
      if (this.timer >= 30) {
        this.timer = 0;
        this.getBusRealTime();
      }
    }
  }
});
</script>

<style scoped>
@font-face {
  font-family: "SF Pro";
  src: url("~@/assets/SF-Pro.ttf");
}
.title {
  width: 70%;
  height: 32px;
}
#infoCard {
  position: absolute;
  bottom: -450px;
  z-index: 1001;
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
  height: 200px;
  width: 100%;
  box-shadow: 0px 0px 11.8048px rgba(0, 0, 0, 0.1);
}

.carousel__slide {
  height: 200px;
}

.Sfpro {
  font-family: "SF Pro", "PinfFang TC";
}

/* speech bubble */
.speech-bubble {
  position: relative;
  border-radius: 0 30px 30px 30px;
  padding: 9px;
  width: 63%;
  margin-top: 10px;
  margin-left: 45px;
  box-shadow: 2px 5px 18px -3px rgb(0 0 0 / 10%);
  border: 2px solid #e8e8e8;
  color: #535353;
}

.speech-bubble.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@media screen and (min-width: 1200px) {
  #infoCard {
    position: absolute;
    bottom: -450px;
    background: #fff;
    box-shadow: 0px 0px 14px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 18px 24px;
    width: 500px;
    height: 500px;
    margin: 0px 0 50px 50px;
    box-sizing: border-box;
    transition: bottom 0.5s, width 0.5s;
  }
}

/* @media (prefers-color-scheme: dark) {
  * {
    color: #bdc1c6;
  }
  #infoCard {
    background: #202124;
  }
  .carousel__item {
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  .text-red-500 {
    color: rgba(239, 68, 68, var(--tw-text-opacity));
  }
  .speech-bubble {
    background: #bdc1c6;
  }
} */
</style>
