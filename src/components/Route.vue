<template>
  <div class="router">
    <div class="row">
      <div id="BusData" class="list-group padding" v-if="estimatedTime">
        <div class="flex" v-for="ett in estimatedTime" :key="ett">
          <p class="time" v-if="ett.EstimateTime">{{ ett.EstimateTime }}</p>
          <p class="time" v-else>尚未發車</p>
          <p class="flex-grow">{{ ett.StopName.Zh_tw }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsSHA from "jssha";

export default {
  props: ["chooseBusCard"],
  data() {
    return {
      estimatedTime: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
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
    init() {
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${this.chooseBusCard}?$filter=RouteName%2FZh_tw%20eq%20'${this.chooseBusCard}'&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then((response) => {
          console.log("站點預估到達資訊", response.data);
          response.data.forEach((item) => {
            if (item.Direction == 0) {
              this.estimatedTime.push(item);
            }
          });
          this.estimatedTime.sort(this.sortJSONData("StopID"));

          this.estimatedTime.forEach((item) => {
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
              item["EstimateTime"] = t + "分";
            }
          });
          console.log("路線圖", this.estimatedTime);
        })
        .catch((error) => console.log("error", error));

      console.log("印");
      this.printBusData();
    },
    printBusData() {
      console.log("啦");
    },
    sortJSONData(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    }
  }
};
</script>

<style scoped>
.router {
  display: block; /* Hidden by default */
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
.time {
  width: 30%;
  text-align: center;
}
.flex {
  width: 70vw;
  margin-left: 24px;
  height: 54px;
  line-height: 54px;
  font-size: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, rgba(156, 156, 156, 0.2) 0%, rgba(90, 90, 90, 0.2) 10%, rgba(90, 90, 90, 0.2) 90%, rgba(156, 156, 156, 0.2) 100%);
  border-image-slice: 1;
}
</style>
