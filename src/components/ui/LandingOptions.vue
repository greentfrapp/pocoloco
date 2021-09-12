<template>
  <div class="landing-ui hidden">
    <p class="text-reference text-center mb-4" @click="options = !options">
      Options
      <v-icon class="arrow" color="#818181">{{ arrow }}</v-icon>
    </p>

    <v-row justify="space-around" align="center">      
      <slot></slot>
    </v-row>

    <v-btn :ripple="false" :x-small="true" fab class="btn--copy" v-show="!options" @click="$emit('export-code')">
      <v-icon>mdi-code-tags</v-icon>
    </v-btn>        
  </div>
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
      d3.select('.landing-ui').classed('hidden', newVal);    
        
      this.arrow = newVal ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'
    } 
  },
}
</script>

<style lang="scss" scoped>
.landing-ui {
  min-width: 625px;
  // max-width: map-get($grid-breakpoints, 'lg') * 0.7;
  position: absolute;
  width:fit-content;
  border-radius: 12px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #2C2C2C;
  color: #818181;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); 
  padding: 16px;
  transition: 0.5s bottom;

  p {
    cursor: pointer;
  }

  &.hidden {
    bottom: -100px;

    .arrow {
      animation: bounceY 2s infinite;
    }

    @keyframes bounceY {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }      
  }

  .btn--copy {
    position: absolute;
    top: 12px;
    right: 24px;
  }
}
</style>
