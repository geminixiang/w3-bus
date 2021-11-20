<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div id="map" class="h-full"></div>
    <Bus v-if="cc" />
  </div>
</template>

<script>
import leaflet from "leaflet";
import "leaflet.locatecontrol";
import Bus from "../components/Bus.vue";
import { onMounted } from "vue";

export default {
  name: "Home",
  components: { Bus },
  data() {
    return {
      cc: true
    };
  },
  setup() {
    let mymap;

    onMounted(() => {
      mymap = leaflet.map("map", {
        center: [25.045, 121.536],
        zoom: 12,
        zoomControl: false,
        tap: false
      });

      leaflet
        .tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=2ebbece2-a602-41ff-96c6-745a4f4b46bb", {
          maxZoom: 20,
          attribution: '&copy; <a href="https://2021.thef2e.com/works">我們就是要組隊</a> contributors'
        })
        .addTo(mymap);

      leaflet.control
        .locate({
          position: "bottomright",
          icon: "fas fa-location",
          drawCircle: false
        })
        .addTo(mymap);

      // mymap.locate({
      //   setView: true, // 是否讓地圖跟著移動中心點
      //   watch: true, // 是否要一直監測使用者位置
      //   maxZoom: 18, // 最大的縮放值
      //   initialZoomLevel: 17,
      //   enableHighAccuracy: true, // 是否要高精準度的抓位置
      //   timeout: 10000 // 觸發locationerror事件之前等待的毫秒數
      // });

      // L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      //   maxZoom: 18,
      //   id: "mapbox/streets-v11",
      //   tileSize: 512,
      //   zoomOffset: -1,
      //   accessToken: "your.mapbox.access.token"
      // }).addTo(mymap);
    });
  },
  beforeCreate: function () {
    document.body.className = "home";
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
