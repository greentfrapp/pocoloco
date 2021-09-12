<template>
  <div class="main">
    <svg class="background-blob" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path v-for="(p, i) in paths" :key="i" :id="`path${i}`" :fill="p.color" :fill-opacity="p.opacity" :d="p.d"></path>
    </svg>
    <slot></slot>
    <!-- <v-container>
      <input type="text" :value="paths[0].fill" @change="update"/>
    </v-container> -->
    <LandingOptions>
      <CardOptions v-for="(p, i) in paths" :key="i">
        <ColorPicker 
          icon="mdi-palette" 
          :initialColor="p.color"
          @change-color="updateColor($event, i)"
        />
        <Slider :value="parseInt(p.start.slice(0, -3))" icon="mdi-sine-wave" @input="updateAngle($event, i)" min=-90 max=90 step=10 />
        <Slider :value="500000 / p.duration" icon="mdi-run" @input="updateSpeed($event, i)" min=1 max=200 step=1 />
        <Slider :value="p.opacity * 10" icon="mdi-opacity" @input="updateOpacity($event, i)" min=0 max=10 step=1 />
      </CardOptions>
    </LandingOptions>
  </div>
</template>

<script>
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import LandingOptions from '@/components/ui/LandingOptions2'
import ColorPicker from '@/components/ui/ColorPicker'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    Slider,
    CardOptions,
    LandingOptions,
    ColorPicker,
  },
  data () {
    return {
      value: 0,
      paths: [
        {
          id: 'path0',
          d: 'M-50 -50L150 -50L150 50L-50 50Z',
          duration: 10000,
          color: '#FFFF00',
          opacity: 0.7,
          fill: 'rgba(255, 255, 0, 0.7)',
          start: '-10deg',
          end: '10deg',
        }, {
          id: 'path1',
          d: 'M-50 -50L150 -50L150 50L-50 50Z',
          duration: 25000,
          color: '#00FFFF',
          opacity: 0.7,
          fill: 'rgba(0, 255, 255, 0.7)',
          start: '-30deg',
          end: '30deg',
        }, {
          id: 'path2',
          d: 'M-50 -50L150 -50L150 20L-50 20Z',
          duration: 60000,
          color: '#FF00FF',
          opacity: 0.2,
          fill: 'rgba(255, 0, 255, 0.2)',
          start: '40deg',
          end: '-40deg',
        },
      ]
    }
  },
  computed: {
    speedValue () {
      return 100000 / this.paths[2].duration
    }
  },
  mounted () {
    this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
  },
  methods: {
    initBg (pathId, duration, startDeg, endDeg) {
      document.getElementById(pathId).animate([
        // keyframes
        { transform: `rotate(${startDeg})` },
        { transform: `rotate(${endDeg})` },
        { transform: `rotate(${startDeg})` },
      ], {
        // timing options
        duration,
        iterations: Infinity
      });
    },
    update (event) {
      this.paths[0].fill = event.target.value
    },
    updateColor (event, pathId) {
      this.paths[pathId].color = event
      this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
    },
    updateAngle (event, pathId) {
      this.paths[pathId].start = event + 'deg'
      this.paths[pathId].end = -event + 'deg'
      this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
    },
    updateSpeed (event, pathId) {
      this.paths[pathId].duration = 500000 / event
      this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
    },
    updateOpacity (event, pathId) {
      this.paths[pathId].opacity = event / 10
      this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border:  1px solid black;
}

path {
  transform-origin: 50% 0%;
}

div.main {
  position: relative;
  height: 100%;
}

.background-blob {
  position: absolute;
  width: 100vw;
  height: 99vh;
  z-index: -1;
}
</style>
