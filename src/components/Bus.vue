<template>
  <div id="infoCard">
    <h1 class="font-bold text-2xl">民權松江路口</h1>
    <p class="text-sm text-gray-800">台北市中山區</p>
    <div class="absolute right-10 top-4 text-center">
      <i class="fas fa-heart text-2xl text-red-500"></i>
      <p class="text-sm">收藏</p>
    </div>
    <div class="absolute right-24 top-4 text-center">
      <i class="fas fa-road text-2xl"></i>
      <p class="text-sm">路線</p>
    </div>
    <hr class="pt-4 mt-4" />
    <h1 class="font-bold text-base pb-3">即將抵達本站公車</h1>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item rounded-2xl">
          <div class="p-3 text-left">
            <i class="fas fa-bus font-bold mr-1"></i>
            <span class="font-bold">{{ dataset[slide - 1].name }}</span>
            <hr class="mt-2" />
            <p class="mt-4">再過</p>
            <p class="text-left text-red-500 text-3xl font-bold">{{ dataset[slide - 1].time }}</p>
            <p class="text-left">即抵達{{ dataset[slide - 1].arrival }}</p>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Breakpoints",
  components: {
    Carousel,
    Slide
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: "1.8",
      snapAlign: "start",
      transition: 150,
      wrapAround: true
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.2,
        snapAlign: "center"
      },
      // 1024 and up
      1024: {
        itemsToShow: 7,
        snapAlign: "center"
      }
    },
    dataset: [
      {
        name: "松江新生幹線",
        time: "01分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "02分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "03分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "04分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "05分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "06分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "07分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "08分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "09分鐘",
        arrival: "台北世貿站"
      },
      {
        name: "松江新生幹線",
        time: "10分鐘",
        arrival: "台北世貿站"
      }
    ]
  })
});
</script>

<style scoped>
#infoCard {
  position: absolute;
  bottom: 0;
  z-index: 400;
  background-color: #fff;
  height: 320px;
  box-shadow: 0px 0px 14px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0px 0px;
  padding: 18px 0px 18px 24px;
  width: 100vw;
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

.carousel__slide--visible {
  transform: rotateY(0);
}

/* .carousel__item p {
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
} */
</style>
