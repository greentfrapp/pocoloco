<template>
  <v-card
    class="landing-ui hidden"
    elevation="24"
    raised
    >
    <p class="text-card-title-2 text-center text-body-1 font-weight-medium mb-2" style="cursor: pointer;" @click="options = !options">
      OPTIONS
      <v-icon class="arrow" color="#818181">{{ arrow }}</v-icon>
    </p>
    <v-row justify="center" class="pa-1">      
      <slot></slot>
    </v-row>    
  </v-card>
</template>

<script>
import * as d3 from "d3-selection";

export default {
  data() {
    return {
      opacity: 100,
      speed: 20000,
      curve: 100,    
      color: '#FFFF00',  
      arrow: 'mdi-chevron-double-up',
      options: true,
    };
  },
  watch: {
    options(newVal) {
      d3.select('.landing-ui').classed('hidden', newVal)
      this.arrow = newVal ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'
    } 
  },
}
</script>

<style lang="scss" scoped>
.landing-ui {
  //min-width: map-get($grid-breakpoints, 'md') * 1.15;
  //max-width: map-get($grid-breakpoints, 'lg') * 0.7;
  position: fixed;
  border-radius: 12px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) translateY(84px);
  background-color: #2C2C2C;
  color: #818181;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); 
  padding: 16px;
  padding-top: 2px;
  transition: 0.5s all;
  padding-bottom: 100px;

  p {
    cursor: pointer;
  }

  &.hidden {
    //bottom: -20%;
    transform: translate(-50%, 100%) translateY(-25px);

    .arrow {
      animation: bounceY 2s infinite;
    }

    @keyframes bounceY {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-4px);
      }
      60% {
        transform: translateY(-2px);
      }
    }      
  }
}
</style>
