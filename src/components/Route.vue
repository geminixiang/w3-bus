<template>
  <div id="router">
    <div class="row">
      <div id="BusData" class="list-group padding" v-if="goEstimatedTime">
        <div class="busroute" v-for="ett in goEstimatedTime" :key="ett">
          <p class="time" v-if="ett.EstimateTime">{{ ett.EstimateTime }}</p>
          <p class="time" v-else>尚未發車</p>
          <p class="stopname">{{ ett.StopName.Zh_tw }}</p>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import Myapi from "@/models/Myapi";

export default {
  props: ["chooseBusCard", "ss"],
  data() {
    return {
      goEstimatedTime: [],
      backEstimatedTime: [],
      stopSequence: [],
      routeHeadsign: []
    };
  },
  mounted() {
    this.getStopSequence();
    this.axios({
      method: "get",
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${this.chooseBusCard}?$filter=RouteName%2FZh_tw%20eq%20'${this.chooseBusCard}'&$format=JSON`,
      headers: Myapi.getAuthorizationHeader()
    })
      .then((response) => {
        // console.log("站點預估到達資訊", response.data);
        this.goEstimatedTime = [];
        response.data.forEach((item) => {
          if (item.Direction == 0) {
            this.goEstimatedTime.push(item);
          } else {
            this.backEstimatedTime.push(item);
          }
        });
        // this.estimatedTime.sort(this.sortJSONData("StopID"));

        this.goEstimatedTime = this.fixTime(this.goEstimatedTime);
        this.sortJSONData(this.goEstimatedTime, 0);
        // console.log("路線圖", this.goEstimatedTime);
      })
      .catch((error) => console.log("error", error));
  },
  methods: {
    getStopSequence() {
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taipei/${this.chooseBusCard}?$filter=RouteName%2FZh_tw%20eq%20'${this.chooseBusCard}'&$format=JSON`,
        headers: Myapi.getAuthorizationHeader()
      })
        .then((response) => {
          this.stopSequence = [];
          // console.log("所有停靠站", response.data);

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
    sortJSONData(prop, i) {
      let x, y;
      var that = this;
      // console.log("車站排序", that.stopSequence[i]);

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
      console.log("校正時間", data);
      return data;
    }
  },
  watch: {
    ss: function () {
      console.log("我是SS");
      var card = document.getElementById("router");
      if (this.ss) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
      console.log(this.ss);
    }
  }
};
</script>

<style scoped>
#router {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1001; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(255, 255, 255, 1); /* Black w/ opacity */
}
.busroute {
  width: 100%;
  margin-left: 5%;
  height: 54px;
  line-height: 54px;
  font-size: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, rgba(156, 156, 156, 0.2) 0%, rgba(90, 90, 90, 0.2) 10%, rgba(90, 90, 90, 0.2) 80%, rgba(255, 255, 255, 0) 90%);
  border-image-slice: 1;
}
.time {
  width: 30%;
  text-align: center;
  display: inline-block;
}
.stopname {
  width: 64%;
  display: inline-block;
}

#BusData {
  width: 90%;
  max-width: 500px;
  border-right: 1px solid rgba(0, 0, 0, 0.6);
}

.busroute:after {
  content: "";
  background: #ffa800;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
</style>
