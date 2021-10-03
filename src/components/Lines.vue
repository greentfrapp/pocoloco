<template>
  <div class="main">
    <svg class="background-blob" :style="{backgroundColor}" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path v-for="(p, i) in paths" :key="i" :id="`path${i}`" :fill="p.color" :fill-opacity="p.state ? p.opacity : 0" :d="p.d" />
    </svg>
    <slot></slot>
    <LandingOptions>
      <CardOptions>
        <ColorPicker
            icon="mdi-palette" 
            initialColor="#FFFFFF"
            @change-color="updateBackground($event)"
          />
      </CardOptions>
      <CardOptions v-for="(p, i) in paths" :key="i" :removable="p.state" @remove="removeColor(i)">
        <v-hover v-if="!p.state">
          <v-icon
            large
            slot-scope="{ hover }"
            :style="{color: hover ? '#fff':'#aaa'}"
            @click="p.state = true">
            mdi-plus
          </v-icon>
        </v-hover>
        <div v-else-if="p.state">
          <ColorPicker
            icon="mdi-palette" 
            :initialColor="p.color"
            @change-color="updateColor($event, i)"
          />
          <Slider :value="p.height" icon="mdi-arrow-up-down" @input="updateHeight($event, i)" min=10 max=90 step=10 />
          <Slider :value="parseInt(p.start.slice(0, -3))" icon="mdi-angle-acute" @input="updateAngle($event, i)" min=-60 max=60 step=10 />
          <Slider :value="500000 / p.duration" icon="mdi-run" @input="updateSpeed($event, i)" min=1 max=200 step=1 />
          <Slider :value="p.opacity * 10" icon="mdi-opacity" @input="updateOpacity($event, i)" min=0 max=10 step=1 />
        </div>
      </CardOptions>
    </LandingOptions>
    <ExportModal ref="exportModal" :code="code" />
  </div>
</template>

<script>
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import LandingOptions from '@/components/ui/LandingOptions2'
import ColorPicker from '@/components/ui/ColorPicker'
import ExportModal from '@/components/ui/ExportModal'

export default {
  name: 'Lines',
  props: {
    msg: String
  },
  components: {
    Slider,
    CardOptions,
    LandingOptions,
    ColorPicker,
    ExportModal,
  },
  data () {
    return {
      value: 0,
      paths: [
        {
          id: 'path0',
          d: 'M-100 -100L200 -100L200 50L-100 50Z',
          duration: 5000,
          color: '#FFFF00',
          opacity: 0.7,
          fill: 'rgba(255, 255, 0, 0.7)',
          start: '-10deg',
          end: '10deg',
          height: 50,
          state: true,
        }, {
          id: 'path1',
          d: 'M-100 -100L200 -100L200 50L-100 50Z',
          duration: 12500,
          color: '#00FFFF',
          opacity: 0.7,
          fill: 'rgba(0, 255, 255, 0.7)',
          start: '-30deg',
          end: '30deg',
          height: 50,
          state: true,
        }, {
          id: 'path2',
          d: 'M-100 -100L200 -100L200 20L-100 20Z',
          duration: 30000,
          color: '#FF00FF',
          opacity: 0.2,
          fill: 'rgba(255, 0, 255, 0.2)',
          start: '40deg',
          end: '-40deg',
          height: 20,
          state: true,
        }, {
          id: 'path3',
          d: 'M-100 -100L200 -100L200 20L-100 20Z',
          duration: 30000,
          color: '#FF00FF',
          opacity: 0.2,
          fill: 'rgba(255, 0, 255, 0.2)',
          start: '40deg',
          end: '-40deg',
          height: 20,
          state: false,
        },
      ],
      backgroundColor: '#FFFFFF',
    }
  },
  computed: {
    speedValue () {
      return 100000 / this.paths[2].duration
    },
    shownPaths () {
      return this.paths.filter(p => p.state)
    },
    code () {
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      path {
        transform-origin: 50% 0%;
      }
      .background--custom {
        background-color: ${this.backgroundColor};
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        top: 0;
        left: 0;
      }${this.shownPaths.map((p, i) => `
      @keyframes path${i} {
        0% {
          transform: rotate(${p.start});
        }
        100% {
          transform: rotate(${p.end});
        }
      }`).join('')}
    </style>
  </head>
  <body>
    <svg class="background--custom" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
      ${this.shownPaths.map((p, i) => `<path fill="${p.color}" fill-opacity="${p.opacity}" d="${p.d}" style="animation: path${i} ${p.duration/1000}s linear infinite alternate;" />`).join('')}
    </svg>
  </body>
</html>`
    },
  },
  mounted () {
    this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
  },
  methods: {
    export () {
      console.log('showing')
      this.$refs.exportModal.toggle()
    },
    initBg (pathId, duration, startDeg, endDeg) {
      const path = document.getElementById(pathId)
      if (!path) return
      document.getElementById(pathId).animate([
        // keyframes
        { transform: `rotate(${startDeg})` },
        { transform: `rotate(${endDeg})` },
      ], {
        // timing options
        duration,
        iterations: Infinity,
        direction: 'alternate',
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
    },
    updateHeight (event, pathId) {
      this.paths[pathId].height = event
      this.paths[pathId].d = `M-100 -100L200 -100L200 ${event}L-100 ${event}Z`
      this.paths.forEach(p => this.initBg(p.id, p.duration, p.start, p.end))
    },
    removeColor (pathId) {
      this.paths[pathId].state = false
    },
    updateBackground (event) {
      this.backgroundColor = event
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
  /* mix-blend-mode: screen; */
}

div.main {
  position: relative;
  height: 100%;
}

.background-blob {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
