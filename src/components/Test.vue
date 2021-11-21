<template>
  <div class="Hammer">
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
import Hammer from "hammerjs";
export default {
  data() {
    return {
      hammer: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.hammer = new Hammer(this.$refs.box);
      // 需識別事件
      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

      this.hammer.on("swipeup", (evt) => {
        // deltaTime
        // deltaX deltaY distance
        // angle
        console.log(evt.type, evt);
      });
      this.hammer.on("swipedown", (evt) => {
        // deltaTime
        // deltaX deltaY distance
        // angle
        console.log(evt.type, evt);
      });
    }
  }
};
</script>

<style scoped>
.Hammer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
}
.Hammer .box {
  width: 200px;
  height: 200px;
  background: brown;
  z-index: 500;
}
</style>
