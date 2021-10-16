<template>
  <v-card
    class="landing-ui hidden"
    elevation="24"
    raised
    style="overflow: hidden"
    >
    <span class="logo">pocoloco</span>
    <p class="text-card-title-2 text-center text-body-1 font-weight-medium mt-2 mb-4" style="cursor: pointer;" @click="options = !options">
      OPTIONS
      <v-icon class="arrow" color="#818181">{{ arrow }}</v-icon>
    </p>
    <v-row justify="center" class="pa-1 flex-nowrap">      
      <slot></slot>
    </v-row>    
  </v-card>
</template>

<script>
import * as d3 from "d3-selection";

export default {
  data() {
    return {
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

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    display: none;
  }

  p {
    cursor: pointer;
  }

  &.hidden {
    //bottom: -20%;
    transform: translate(-50%, 100%) translateY(-40px);

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

span.logo {
  pointer-events: none;
  position: absolute;
  top: -22px;
  left: -3px;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.25rem;
  font-family: "Raleway", sans-serif;
  color: #353535;
  -webkit-text-fill-color: #353535;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #353535;
}
</style>
