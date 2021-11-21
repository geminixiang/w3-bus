<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div id="map" class="h-full"></div>
    <Bus :busData="busData" />
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
      geo: [25.045, 121.536],
      mymap: null,
      gettingLocation: null,
      busData: null,
      busIcon: leaflet.icon({
        iconUrl: require("@/assets/busIcon.svg"),
        iconSize: [23, 23],
        iconAnchor: [13, 24],
        popupAnchor: [-3, -76]
      }),
      userIcon: leaflet.icon({
        iconUrl: require("@/assets/userIcon.svg"),
        iconSize: [48, 48],
        iconAnchor: [13, 24],
        popupAnchor: [-3, -76]
      })
    };
  },
  mounted() {
    this.init();
  },
  beforeCreate: function () {
    document.body.className = "home";
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      // this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.geo = [pos.coords.latitude, pos.coords.longitude];
        console.log(this.geo);
        this.getTourismData(this.geo[0], this.geo[1]);
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
  methods: {
    init() {
      this.mymap = leaflet.map("map", {
        center: this.geo,
        zoom: 12,
        zoomControl: false,
        tap: false
      });

      leaflet
        .tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb", {
          maxZoom: 20,
          zoom: 17,
          attribution: '&copy; <a href="https://2021.thef2e.com/works">我們就是要組隊</a> contributors'
        })
        .addTo(this.mymap);

      leaflet.control
        .locate({
          position: "bottomright",
          icon: "location",
          drawCircle: false,
          flyTo: true,
          locateOptions: {
            enableHighAccuracy: true
          },
          markerClass: leaflet.marker,
          markerStyle: {
            icon: this.userIcon
          }
        })
        .addTo(this.mymap)
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
    },
    getTourismData(latitude, longitude) {
      console.log(latitude, longitude);
      if (this.busData) {
        console.log("已有景點資料");
        // showTourismData();
      } else {
        console.log("取得景點API資料");

        this.axios({
          method: "get",
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$top=30&$spatialFilter=nearby(${latitude},${longitude},1000)&$format=JSON`,
          headers: this.GetAuthorizationHeader()
        })
          .then((response) => {
            // console.log("景點資料", response);
            this.busData = response.data;
            console.log(this.busData[0]);
            this.setMarker();

            // showTourismData();
            // setMarker(tourism, "tourism");

            // console.log(tourism);
            // getAvailableData(longitude, latitude);
          })
          .catch((error) => console.log("error", error));
      }
      return;
    },
    setMarker() {
      this.busData.forEach((item) => {
        this.mymap.addLayer(
          leaflet
            .marker([item.StopPosition.PositionLat, item.StopPosition.PositionLon], {
              icon: this.busIcon,
              title: item.StopName.Zh_tw
            })
            .bindTooltip(item.StopName.Zh_tw, {
              permanent: true,
              direction: "center",
              className: "mytooltip"
            })
        );
      });
    }
  }
};
</script>

<style>
body.home {
  font-family: "PingFang TC", "Noto Sans TC", sans-serif;
}
.leaflet-control-locate {
  width: 48px;
  height: 48px;
  border-radius: 999em !important;
  position: absolute;
  bottom: 340px;
  right: 30px;
  margin: 0;
  border: 2px solid white !important;
  background-color: #fff;
}

.leaflet-control-locate:hover {
  background: rgba(255, 168, 0, 0.6);
}

.following {
  background-color: #ffa800;
}

.leaflet-touch .leaflet-bar a {
  width: 100%;
  height: 100%;
  background: none;
}

.following {
  background-color: #ffa800;
}

.mytooltip {
  background-color: #fff;
  border: 0;
  border-radius: 100px;
  box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.25) !important;
  padding: 4px 8px;
  margin-top: 15px;
  opacity: 1 !important;
}
.location {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E %3Cpath d='M10 4C9 4 9 5 9 5L9 5.1A5 5 0 0 0 5.1 9L5 9C5 9 4 9 4 10 4 11 5 11 5 11L5.1 11A5 5 0 0 0 9 14.9L9 15C9 15 9 16 10 16 11 16 11 15 11 15L11 14.9A5 5 0 0 0 14.9 11L15 11C15 11 16 11 16 10 16 9 15 9 15 9L14.9 9A5 5 0 0 0 11 5.1L11 5C11 5 11 4 10 4zM10 6.5A3.5 3.5 0 0 1 13.5 10 3.5 3.5 0 0 1 10 13.5 3.5 3.5 0 0 1 6.5 10 3.5 3.5 0 0 1 10 6.5zM10 8.3A1.8 1.8 0 0 0 8.3 10 1.8 1.8 0 0 0 10 11.8 1.8 1.8 0 0 0 11.8 10 1.8 1.8 0 0 0 10 8.3z'/%3E %3C/svg%3E");
}
</style>
