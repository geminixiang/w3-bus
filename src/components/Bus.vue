<template>
  <div id="infoCard" ref="gesture">
    <h1 class="font-bold text-2xl">民權松江路口</h1>
    <p class="text-sm text-gray-800">台北市中山區</p>
    <div class="absolute right-10 top-6 text-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import Hammer from "hammerjs";

export default defineComponent({
  name: "Breakpoints",
  props: {
    busData: Array
  },
  components: {
    Carousel,
    Slide
  },
  data: () => ({
    hammer: null,
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
        itemsToShow: 6,
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
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.hammer = new Hammer(this.$refs.gesture);
      // 需識別事件
      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

      this.hammer.on("swipeup", (evt) => {
        console.log(evt.type, evt);
      });
      this.hammer.on("swipedown", (evt) => {
        var card = document.getElementById("infoCard");
        card.style.display = "none";
        console.log(evt.type, evt);
      });
      console.log(this.busData);
    }
  }
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
