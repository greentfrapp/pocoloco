<template>
  <section
    :class="['page-landing', 'background--custom']">

    <slot></slot>

    <LandingOptions>
      <v-col cols="3">
        <CardOptions>
          <!-- <Slider :value="speedValue" icon="mdi-run" @input="updateSpeed" min=1 max=50 step=1 /> -->
          <InputValue 
            icon="mdi-palette" 
            initialColor="yellow"
            @change-color="handleColor(0, $event)"
          />
        </CardOptions>
      </v-col>

      <v-col cols="3">        
        <CardOptions>
          <!-- <Slider :value="speedValue" icon="mdi-run" @input="updateSpeed" min=1 max=50 step=1 /> -->
          <InputValue 
            icon="mdi-palette" 
            initialColor="purple"
            @change-color="handleColor(1, $event)"            
          />
        </CardOptions>
      </v-col>   

      <v-col cols="3">
        <AddBtn v-if="!colors[2].state" @add-color="colors[2].state = true"/>

        <CardOptions v-else-if="colors[2].state">
          <!-- <Slider :value="speedValue" icon="mdi-run" @input="updateSpeed" min=1 max=50 step=1 /> -->
          <InputValue icon="mdi-palette" />
        </CardOptions>
      </v-col>  

      <v-col cols="3">
        <AddBtn v-if="!colors[3].state" @add-color="colors[3].state = true" />
        
        <CardOptions v-else-if="colors[3]">
          <!-- <Slider :value="speedValue" icon="mdi-run" @input="updateSpeed" min=1 max=50 step=1 /> -->
          <InputValue icon="mdi-palette" />
        </CardOptions>
      </v-col>                 
    </LandingOptions>
  </section>
</template>

<script>
import LandingOptions from '@/components/ui/LandingOptions'
// import * as d3 from "d3-selection";

import AddBtn from '@/components/ui/AddBtn'
// import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import InputValue from '@/components/ui/InputValue'

export default {
  components: {
    LandingOptions,
    // Slider,
    CardOptions,    
    InputValue,
    AddBtn
  },
  data() {
    return {
      colors: [
        { hex: '#3f51b1', state: true },
        { hex: '#f18271', state: true },
        { hex: '', state: false },
        { hex: '', state: false }
      ]
    };
  },
  mounted() {
    const selector = document.documentElement.style

    const gradient = `linear-gradient(-45deg, 
      ${this.colors[0].hex} 0%, 
      ${this.colors[1].hex} 100%
    )`;    

    const time = `10s`

    selector.setProperty('--time', time);
    selector.setProperty('--gradient', gradient);
  },
  methods: {
    handleColor(x, y) {
      this.colors[+x].hex = y

      const selector = document.documentElement.style

      const gradient = `linear-gradient(-45deg, 
        ${this.colors[0].hex} 0%, 
        ${this.colors[1].hex} 100%
      )`;    

      console.log(gradient)

      const time = `10s`

      selector.setProperty('--time', time);
      selector.setProperty('--gradient', gradient);      
      console.log(x,y)
    },
    handleSpeed(event) {
      const selector = document.documentElement.style
      const time = `${event}ms`

      selector.setProperty('--time', time);
    },    
  },
}
</script>

<style lang="scss" scoped>
:root {     
  --gradient: linear-gradient(-45deg, 
    --color1 0%, 
    --color2 75%, 
    --color3 87%, 
    --color4 100%
  ); 
  --time: 10s;
  --color1: '#3f51b1';
  --color2: '#f18271';
  --color3: '#f3a469';
  --color4: '#d6d2cc';
}

.page-landing {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  &.background--custom {
    background: var(--gradient);       
    background-size:  400% 400%;
    animation: gradient var(--time) ease infinite;

    @keyframes gradient {
      0% {
        background-position: 24%;
      }
      50% {
        background-position: 100%;
      }
      100% {
        background-position: 25%;
      }
    }
  }

  

  .landing-content {
    padding: 64px 0;
  }  
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .page-landing {
    padding: 48px 4px;
  }  
}
</style>