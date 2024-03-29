<template>
  <img class="absolute w-32 mt-2 ml-2" style="z-index: 999" src="@/assets/Logo-full.svg" />
  <div class="flex flex-col h-screen max-h-screen">
    <div id="map" class="h-full"></div>
    <Bus
      :choiceStop="choiceStop"
      :toggleStopCard="toggleStopCard"
      @toggleStopCardUpdate="toggleStopCardUpdate"
    />
  </div>
</template>

<script>
import leaflet from "leaflet";
import "leaflet.locatecontrol";
import Bus from "@/components/Bus.vue";
import Myapi from "@/models/Myapi";

export default {
  name: "Home",
  components: { Bus },
  data() {
    return {
      choiceStop: "",
      toggleStopCard: false,
      geo: [25.045, 121.536],
      mymap: null,
      gettingLocation: null,
      busData: null,
      busIcon: leaflet.icon({
        iconUrl: require("@/assets/busIcon.svg"),
        iconSize: [32, 32],
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
    if (!("geolocation" in navigator)) {
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.geo = [pos.coords.latitude, pos.coords.longitude];
        this.getBusStopData(this.geo[0], this.geo[1]);
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
        .tileLayer(
          // "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb",
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb",
          {
            maxZoom: 20,
            zoom: 17,
            attribution:
              '&copy; <a href="https://2021.thef2e.com/works">我們就是要組隊</a> contributors'
          }
        )
        .addTo(this.mymap);

      try {
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
      } catch (e) {
        console.log("定位失敗", e);
      }
    },
    getBusStopData(latitude, longitude) {
      if (this.busData) {
        console.log("已有站牌資料");
        // showTourismData();
      } else {
        console.log("取得站牌API資料");

        this.axios({
          method: "get",
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(${latitude},${longitude},800)&$format=JSON`,
          headers: Myapi.getAuthorizationHeader()
        })
          .then((response) => {
            this.busData = response.data;
            this.setMarker();
          })
          .catch((error) => console.log("error", error));
      }
      return;
    },
    setMarker() {
      // this指向問題
      var that = this;

      this.busData.forEach((item) => {
        leaflet
          .marker([item.StopPosition.PositionLat, item.StopPosition.PositionLon], {
            icon: this.busIcon,
            title: item.StopName.Zh_tw
          })
          .addTo(this.mymap)
          .on("click", function () {
            that.choiceStop = item;
            that.toggleStopCard = !that.toggleStopCard;
          });
      });
    },
    toggleStopCardUpdate(val) {
      this.toggleStopCard = val;
    }
  }
};
</script>

<style>
body.home {
  font-family: "PingFang TC", "Noto Sans TC", sans-serif;
  max-height: 100vh;
  overflow: hidden;
}
.leaflet-control-locate {
  width: 48px;
  height: 48px;
  border-radius: 999em !important;
  position: fixed;
  bottom: 48px;
  right: 30px;
  margin: 0 !important;
  border: 2px solid white !important;
  background: rgba(255, 168, 0, 1);
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
.leaflet-container .leaflet-marker-pane img {
  z-index: 1500;
}
</style>
