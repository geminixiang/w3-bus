<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div id="map" class="h-full"></div>
    <Bus />
  </div>
</template>

<script>
import leaflet from "leaflet";
import "leaflet.locatecontrol";
import jsSHA from "jssha";
import Bus from "../components/Bus.vue";

// import { onMounted } from "vue";

export default {
  name: "Home",
  components: { Bus },
  data() {
    return {
      geo: [25.045, 121.536]
    };
  },
  mounted() {
    this.init();
  },
  beforeCreate: function () {
    document.body.className = "home";
  },
  methods: {
    init() {
      let mymap;

      mymap = leaflet.map("map", {
        center: this.geo,
        zoom: 12,
        zoomControl: false,
        tap: false
      });

      leaflet
        .tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb", {
          maxZoom: 20,
          zoom: 19,
          attribution: '&copy; <a href="https://2021.thef2e.com/works">我們就是要組隊</a> contributors'
        })
        .addTo(mymap);

      leaflet.control
        .locate({
          position: "bottomright",
          icon: "fas fa-location",
          drawCircle: false,
          flyTo: true,
          locateOptions: {
            enableHighAccuracy: true
          }
        })
        .addTo(mymap)
        .start();

      // mymap.locate({
      //   setView: true, // 是否讓地圖跟著移動中心點
      //   watch: true, // 是否要一直監測使用者位置
      //   maxZoom: 18, // 最大的縮放值
      //   initialZoomLevel: 17,
      //   enableHighAccuracy: true, // 是否要高精準度的抓位置
      //   timeout: 10000 // 觸發locationerror事件之前等待的毫秒數
      // });
    },
    GetAuthorizationHeader() {
      let AppID = "69121a1d8f714a5faa4f54c512bb459e";
      let AppKey = "nYALaDjx1Au-PYCnZOnL-InFIZI";

      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      let HMAC = ShaObj.getHMAC("B64");
      let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
      return { Authorization: Authorization, "X-Date": GMTString };
    }
    // getTourismData(longitude, latitude) {
    //   if (tourism.length > 0) {
    //     console.log("已有景點資料");
    //     showTourismData();
    //   } else {
    //     console.log("取得景點API資料");

    //     axios({
    //       method: "get",
    //       url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON",
    //       // url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${latitude},${longitude},1000)`,
    //       headers: GetAuthorizationHeader()
    //     })
    //       .then((response) => {
    //         // console.log("景點資料", response);
    //         tourism = response.data;
    //         showTourismData();
    //         setMarker(tourism, "tourism");

    //         // console.log(tourism);
    //         // getAvailableData(longitude, latitude);
    //       })
    //       .catch((error) => console.log("error", error));
    //   }
    // }
  }
};
</script>

<style>
body.home {
  font-family: "PingFang TC", "Noto Sans TC", sans-serif;
}
.leaflet-touch .leaflet-bar a:last-child {
  border-bottom-left-radius: 999em !important;
  border-bottom-right-radius: 999em !important;
}
</style>
