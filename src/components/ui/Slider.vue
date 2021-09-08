<template>
  <v-slider
    :value="value"
    @input="$emit('input', $event)"
    :append-icon="icon"
    :min="min"
    :max="max"
    :step="step"
    :color="color"
    :track-color="trackColor"
    :thumb-color="thumbColor"
    class="slider-option"
  ></v-slider>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    icon: {
      type: String
    },
    min: {},
    max: {},
    step: {},
  },
  components: {},
  data() {
    return {
      color: "#CFCFCF",
      trackColor: "#2D2D2D",
      thumbColor: "#FFFFFF",
    };
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.slider-option {
  max-width: 200px;
}

.slider-option::v-deep .v-slider__thumb,
.slider-option::v-deep .v-slider__track-background,
.slider-option::v-deep .v-slider__track-fill,
.slider-option::v-deep .v-slider {
  cursor: pointer;
}

.slider-option::v-deep .v-slider__thumb::before {
  transition-duration: 0s;
}

.slider-option::v-deep .v-slider__thumb-container--active .v-slider__thumb::before {
  transform: scale(1) !important;
}

.slider-option::v-deep .v-slider__thumb-container:hover .v-slider__thumb::before {
  transform: scale(1);
}

.slider-option::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 4px;
}
</style>
