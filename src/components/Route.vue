<template>
  <div id="router" ref="routerCard">
    <div>
      <nav class="navbar">
        <i class="fas fa-arrow-left" @click="close"></i>
        <p class="navbar-brand" href="#">{{ chooseBusCard }}</p>
        <p class="navbar-update"><img src="@/assets/update.svg" />更新{{ timer }}</p>
      </nav>

      <div class="tab" v-if="goEstimatedTime[0]">
        <button class="tablink goTab activate" v-on:click="changeTab('goTab', 'go')">
          往{{ cardStartEnd[0] }}
        </button>
        <button class="tablink backTab" v-on:click="changeTab('backTab', 'back')">
          往{{ cardStartEnd[1] }}
        </button>
      </div>

      <div class="row" id="go">
        <div class="BusData">
          <div
            class="busroute"
            v-for="ett in goEstimatedTime"
            :key="ett"
            :id="[ett.StopName.Zh_tw === userStop ? 'userHere' : '']"
          >
            <p class="time" v-if="ett.EstimateTime">
              <span
                :class="[
                  ett.EstimateTime === '進站中' ? 'busArrive' : '',
                  parseInt(ett.EstimateTime) < 3 ? 'busComing' : ''
                ]"
              >
                {{ ett.EstimateTime }}</span
              >
            </p>
            <p class="time" v-else>尚未發車</p>
            <p class="stopname">
              {{ ett.StopName.Zh_tw }}
            </p>
          </div>
        </div>
        <div class="line"></div>
      </div>

      <div class="row" id="back" style="display: none">
        <div class="BusData" v-if="backEstimatedTime">
          <div class="busroute" v-for="ett in backEstimatedTime" :key="ett">
            <p class="time" v-if="ett.EstimateTime">{{ ett.EstimateTime }}</p>
            <p class="time" v-else>尚未發車</p>
            <p class="stopname">{{ ett.StopName.Zh_tw }}</p>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Myapi from "@/models/Myapi";
import Hammer from "hammerjs";

export default {
  props: ["chooseBusCard", "routeSwitch", "userStop", "cardStartEnd"],
  data() {
    return {
      hammer: null,
      timer: 0,
      goEstimatedTime: [],
      backEstimatedTime: [],
      stopSequence: [],
      routeHeadsign: []
    };
  },
  mounted() {
    this.init();
    this.getStopSequence();
    this.getEstimatedTimeOfArrival();
    this.timer = setInterval(this.countup, 1000);
  },
  methods: {
    countup() {
      this.timer++;
    },
    close() {
      var card = document.getElementById("router");
      card.style.display = "none";
      this.$emit("update", false);
    },
    init() {
      this.hammer = new Hammer(this.$refs.routerCard);

      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });

      this.hammer.on("swiperight", () => {
        var card = document.getElementById("router");
        card.style.display = "none";
        this.$emit("update", false);
      });
    },
    getStopSequence() {
      this.stopSequence = [];
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taipei/${this.chooseBusCard}?$filter=RouteName%2FZh_tw%20eq%20'${this.chooseBusCard}'&$format=JSON`,
        headers: Myapi.getAuthorizationHeader()
      })
        .then((response) => {
          response.data.forEach((item) => {
            let stopUID = [],
              stopName = [];

            item["Stops"].forEach((item2) => {
              stopUID.push(item2["StopUID"]);
              stopName.push(item2["StopName"]["Zh_tw"]);
            });
            let stopData = [stopUID, stopName];
            this.stopSequence.push(stopData);
          });
        })
        .catch((error) => console.log("error", error));
    },
    getEstimatedTimeOfArrival() {
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${this.chooseBusCard}?$filter=RouteName%2FZh_tw%20eq%20'${this.chooseBusCard}'&$format=JSON`,
        headers: Myapi.getAuthorizationHeader()
      })
        .then((response) => {
          let data = this.fixTime(response.data);

          this.goEstimatedTime = [];
          this.backEstimatedTime = [];
          data.forEach((item) => {
            if (item.Direction == 0) {
              this.goEstimatedTime.push(item);
            } else if (item.Direction == 1) {
              this.backEstimatedTime.push(item);
            }
          });

          if (this.goEstimatedTime) this.sortJSONData(this.goEstimatedTime, 0);
          if (this.backEstimatedTime) this.sortJSONData(this.backEstimatedTime, 1);
        })
        .catch((error) => console.log("error", error));
    },
    sortJSONData(prop, i) {
      let x, y;
      var that = this;

      return prop.sort(function (a, b) {
        x = that.stopSequence[i][0].indexOf(a["StopUID"]);
        y = that.stopSequence[i][0].indexOf(b["StopUID"]);

        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    fixTime(data) {
      data.forEach((item) => {
        if (item["EstimateTime"] < 3600 && item["EstimateTime"] > 60) {
          let t = Math.floor(item["EstimateTime"] / 60);
          if (t < 10) {
            t = "0" + t.toString();
          }
          item["EstimateTime"] = t + "分";
        } else if (item["EstimateTime"] < 60) item["EstimateTime"] = "進站中";
        else if (item.StopStatus == 1) item["EstimateTime"] = "尚未發車";
        else if (item.StopStatus == 2) item["EstimateTime"] = "交管不停靠";
        else if (item.StopStatus == 3) item["EstimateTime"] = "末班車已過";
        else if (item.StopStatus == 4) item["EstimateTime"] = "今日未營運";
      });
      return data;
    },
    changeTab(clicked, cityName) {
      var i, x, tablinks;
      x = document.getElementsByClassName("row");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablink");
      for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activate", "");
      }
      document.getElementById(cityName).style.display = "block";

      document.getElementsByClassName(clicked)[0].className += " activate";
    }
  },
  watch: {
    routeSwitch: function () {
      var card = document.getElementById("router");
      if (this.routeSwitch == true) {
        this.getStopSequence();
        this.getEstimatedTimeOfArrival();
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    },
    timer: function () {
      if (this.timer >= 30) {
        this.timer = 0;
        this.getEstimatedTimeOfArrival();
      }
    }
  }
};
</script>

<style scoped>
#router {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1001; /* Sit on top */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(255, 255, 255, 1); /* Black w/ opacity */
}
/* hide scroll bar */
#router::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#router {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.row {
  padding-top: 35px;
}
.busroute {
  position: relative;
  width: 100%;
  margin-left: 5%;
  height: 54px;
  line-height: 54px;
  font-size: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
    to right,
    rgba(156, 156, 156, 0.2) 0%,
    rgba(90, 90, 90, 0.2) 10%,
    rgba(90, 90, 90, 0.2) 80%,
    rgba(255, 255, 255, 0) 90%
  );
  border-image-slice: 1;
}
.time {
  width: 30%;
  text-align: center;
  display: inline-block;
  font-weight: 600;
}
.stopname {
  width: 64%;
  display: inline-block;
}
/* 路線圖與公車互動 */
.busArrive {
  border: 1px solid #ff4a55;
  border-radius: 10px;
  padding: 8px 12px;
  color: #ff4a55;
}
.busComing {
  color: #ff4a55;
}
#userHere {
  background: linear-gradient(to right, #fff8ec30, #fff8ec, #fff8ec00);
}

#userHere::before {
  content: "";
  width: 26px;
  height: 26px;
  background: #ffa80033;
  position: absolute;
  right: 12px;
  margin-top: 16px;
  border-radius: 50%;
}

.BusData {
  width: 90%;
  max-width: 500px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.busroute:after {
  content: "";
  /* background: #ffa800; */
  background: #d9d5cc;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

/* navbar */
.navbar {
  box-shadow: 0px 0px 14px 4px rgb(0 0 0 / 10%);
  height: 85px;
  line-height: 85px;
  padding: 0 35px;
  max-width: 500px;
}
.navbar-brand {
  font-size: 35px;
  font-weight: 700;
  width: 70%;
  display: inline-block;
  vertical-align: middle;
}
.navbar-update,
.navbar-update img {
  margin-right: 5px;
  display: inline-block;
  font-size: 18px;
}
.fa-arrow-left {
  vertical-align: middle;
  font-size: 25px;
  margin-right: 15px;
  cursor: pointer;
}
/* bar */
.tab {
  width: 100vw;
  max-width: 500px;
}
.tab button {
  width: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 100px;
}
.tab button:hover {
  background: #fff8ec;
}

.tab button.activate {
  border-bottom: 4px solid #ffa800;
  border-radius: 100px;
  transition: transform 500ms ease-out;
}

@media screen and (min-width: 1200px) {
  #router {
    position: absolute;
    top: 0px;
    z-index: 1001;
    background: #fff;
    box-shadow: 0px 0px 14px 4px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: 500px;
    margin: 0;
    box-sizing: border-box;
  }
  #userHere::before {
    right: 9px;
  }
}

@media screen and (max-width: 500px) {
  .navbar-brand {
    width: 57%;
  }
  .tab button {
    font-size: 16px;
  }
}
@media (prefers-color-scheme: dark) {
  #router {
    background: #202124;
  }
  .carousel__item {
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  .text-red-500 {
    color: rgba(239, 68, 68, var(--tw-text-opacity));
  }
  .BusData {
    border-right: 1px solid rgba(255, 255, 255, 0.7);
  }
  .navbar-update img {
    filter: contrast(0);
  }
  #userHere {
    background: linear-gradient(to right, #00000000, #fff8ec36, #00000000);
  }
}
</style>
