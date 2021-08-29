<template>
  <div class="landing-ui hidden">
    <p class="text-card-title-2 text-center mb-6" @click="options = !options">
      Options
      <v-icon class="arrow" color="#818181">{{ arrow }}</v-icon>
    </p>

    <v-row justify="start" >
      <v-col cols="3">
        <div class="panel">

          <div class="input mb-3">
            <v-icon color="#818181" style="`font-size: 14px`" class="mr-3">mdi-palette</v-icon>

            <v-text-field
              v-model="color"
              dense
              rounded
              class="my-0 py-0 input-color-field"
              type="string"
              :hide-details="false"
              :change="$emit('set-color', color)"
            >
            {{ color }}
            </v-text-field>   

            <div class="input-color-dot" :style="{ backgroundColor: color }" />       
          </div>

          <div class="input mb-3">
            <v-icon color="#818181" style="`font-size: 14px`" class="mr-3">mdi-sine-wave</v-icon>

            <v-slider
              v-model="curve"
              :max="1000000"
              class="align-center"              
            >
              <template v-slot:append>
                <v-text-field
                  v-model="curve"
                  class="my-0 py-0"
                  type="number"
                  style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </div>

          <div class="input mb-3">
            <v-icon color="#818181" style="`font-size: 14px`" class="mr-3">mdi-speedometer</v-icon>

            <v-slider
              v-model="speed"
              :max="20000"
              class="align-center"
              :change="$emit('set-speed', speed)"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="speed"
                  class="my-0 py-0"
                  type="number"
                  style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </div>          

          <div class="input mb-3">
            <v-icon color="#818181" style="`font-size: 14px`" class="mr-3">mdi-opacity</v-icon>

            <v-slider
              v-model="opacity"
              :max="100"
              class="align-center"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="opacity"
                  class="my-0 py-0"
                  type="number"
                  style="width: 45px"
                ></v-text-field>
              </template>
            </v-slider>
          </div>      
        </div>
      </v-col>                   
    </v-row>    
  </div>
</template>

<script>
// import LandingOptions from '@/components/ui/LandingOptions'
import * as d3 from "d3-selection";

export default {
  components: {
    // LandingOptions,
  },
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
  min-width: map-get($grid-breakpoints, 'md') * 1.15;
  max-width: map-get($grid-breakpoints, 'lg') * 0.7;
  position: absolute;
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
    bottom: -220px;

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

  .panel {
    padding: 16px;
    background: #444444;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: 11px;

    .input {
      display: flex;
      align-items: center;

      .input-color-field {
        border-radius: 32px;
        border: 2px solid #818181;
        margin-right: 12px;
        width: 48px;
      }

      .input-color-dot {
        height: 20px;
        width: 20px;
        display: inline-block;
        border-radius: 50%;
        border: 2px solid #2D2D2D;
        background-color: white;
      }
    }
  }
}
</style>
