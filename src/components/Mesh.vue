<template>
  <div class="main" style="position: relative">
    <div id="canvas-container" :style="{backgroundColor, width: '100vw', height: '100vh', position: 'absolute', zIndex: -1, overflow: 'hidden'}">
      <canvas id="canvas" :style="{transform: `rotate(${angle}deg) scale(2) translateY(${height-100}%)`}" />
    </div>
    <slot></slot>
    <LandingOptions>
      <CardOptions>
        <div>
        <Slider :value="height" icon="mdi-arrow-up-down" @input="updateHeight($event)" min=10 max=100 step=2 />
        <Slider :value="parseInt(angle)" icon="mdi-angle-acute" @input="updateAngle($event)" min=-60 max=60 step=2 />
        <Slider :value="scaledSpeed" icon="mdi-run" @input="updateSpeed($event)" min=1 max=15 step=1 />
        <ColorPicker
            icon="mdi-palette" 
            initialColor="#FFFFFF"
            @change-color="updateBackground($event)"
          />
        </div>
      </CardOptions>
      <CardOptions v-for="(color, i) in colors" :key="i" :removable="false">
        <v-hover v-if="!color.state">
          <v-icon
            large
            slot-scope="{ hover }"
            :style="{color: hover ? '#fff':'#aaa'}"
            @click="color.state = true">
            mdi-plus
          </v-icon>
        </v-hover>
        <ColorPicker 
          v-else-if="color.state"
          icon="mdi-palette" 
          :initialColor="color.hex"
          @change-color="handleColor($event, i)"
        />
      </CardOptions>
    </LandingOptions>
    <ExportModal ref="exportModal" :code="code" />
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import * as minigl from '@/components/minigl'
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import LandingOptions from '@/components/ui/LandingOptions3'
import ColorPicker from '@/components/ui/ColorPicker'
import ExportModal from '@/components/ui/ExportModal'

export default {
  name: 'Canvas',
  props: {},
  components: {
    Slider,
    CardOptions,
    LandingOptions,
    ColorPicker,
    ExportModal,
  },
  data() {
    return {
      colors: [
        { hex: '#ef008f', state: true },
        { hex: '#6ec3f4', state: true },
        { hex: '#7038ff', state: true },
        { hex: '#ffba27', state: true },
      ],
      showExport: false,
      maxSpeed: 11,
      backgroundColor: '#FFFFFF',
      height: 44,
      angle: -12,
      scaledSpeed: 3,
      gradient: null,
    };
  },
  computed: {
    speedValue () {
      return 100000 / this.paths[2].duration
    },
    speed () {
      return this.scaledSpeed * 2e-6
    },
    code () {
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      .background--custom {
        background-color: ${this.backgroundColor};
        width: 100vw;
        height: 100vh;
        position: absolute;
        overflow: hidden;
        z-index: -2;
        top: 0;
        left: 0;
      }
      canvas#canvas {
        z-index: -1;
        position: absolute;
        width: 100%;
        height: 60%;
        transform: rotate(${this.angle}deg) scale(2) translateY(${this.height-100}%);
        --gradient-color-1: ${this.colors[0].hex}; 
        --gradient-color-2: ${this.colors[1].hex}; 
        --gradient-color-3: ${this.colors[2].hex};  
        --gradient-color-4: ${this.colors[3].hex};
        --gradient-speed: ${this.speed};
      }
    </style>
  </head>
  <body>
    <div class="background--custom">
      <canvas id="canvas" />
    </div>
    <script src="https://cdn.jsdelivr.net/gh/greentfrapp/pocoloco@minigl/minigl.js"><\/script>
    <script>
    var gradient = new Gradient();
    gradient.initGradient("#canvas");
    <\/script>
  </body>
</html>`
    }
  },
  mounted () {
    this.colors = [
      { hex: '#ef008f', state: true },
      { hex: '#6ec3f4', state: true },
      { hex: '#7038ff', state: true },
      { hex: '#ffba27', state: true },
    ]
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      this.scaledSpeed = 10
    }
    this.gradient = new minigl.Gradient();
    this.gradient.initColors(['#ef008f', '#6ec3f4', '#7038ff', '#ffba27'])
    // this.gradient.initColors(this.colors.map(c => c.hex))
    this.gradient.speed = this.speed
    this.gradient.initGradient("#canvas");
  },
  methods: {
    export () {
      this.$refs.exportModal.toggle()
    },
    randomize () {
      this.colors = this.colors.map(() => {
        let hex = Math.floor(Math.random()*16777215).toString(16)
        while (hex.length < 6) {
          hex = '0' + hex
        }
        hex = '#' + hex
        return {
          hex,
          state: true,
        }
      })
      this.updateGradient()
    },
    handleColor(userColor, index) {
      if (this.colors[index].hex !== userColor) {
        this.colors[index].hex = userColor
        this.updateGradient()
      }
    },
    updateBackground (event) {
      this.backgroundColor = event
    },
    updateHeight (event) {
      this.height = event
      const selectorNew = document.getElementById('canvas').style
      selectorNew.setProperty('transform', `rotate(${this.angle}deg) scale(2) translateY(${this.height-100}%)`)
    },
    updateAngle (event) {
      this.angle = event
      const selectorNew = document.getElementById('canvas').style
      selectorNew.setProperty('transform', `rotate(${this.angle}deg) scale(2) translateY(${this.height-100}%)`)
    },
    updateSpeed (event) {
      if (this.scaledSpeed !== event) {
        this.scaledSpeed = event
        this.updateGradient()
      }
    },
    updateGradient () {
      if (this.gradient) {
        this.gradient.pause()
        this.gradient.updateSpeed(this.speed)
        this.gradient.initColors(this.colors.map(c => c.hex))
        this.gradient.minigl.clear()
        this.gradient.connect()
        // this.gradient.play()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page-landing {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  .landing-content {
    padding: 64px 0;
  }  
}

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

canvas#canvas {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 80%;
  --gradient-color-1: #ef008f; 
  --gradient-color-2: #6ec3f4; 
  --gradient-color-3: #7038ff;  
  --gradient-color-4: #ffba27;
  --gradient-speed: 5e-6;
}
</style>
