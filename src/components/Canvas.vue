<template>
  <div class="main" style="position: relative">
    <div :style="{backgroundColor, width: '100vw', height: '100vh', position: 'absolute', zIndex: -1, overflow: 'hidden'}">
      <canvas id="canvas" :style="{transform: `skewY(${angle}deg) scale(2) translateY(${height-100}%)`}" />
    </div>
    <slot></slot>
    <LandingOptions>
      <CardOptions>
        <div>
        <Slider :value="height" icon="mdi-arrow-up-down" @input="updateHeight($event)" min=10 max=100 step=2 />
        <Slider :value="parseInt(angle)" icon="mdi-angle-acute" @input="updateAngle($event)" min=-60 max=60 step=2 />
        <Slider :value="speed" icon="mdi-run" @input="updateSpeed($event)" min=-10 max=5 step=1 />
        <ColorPicker
            icon="mdi-palette" 
            initialColor="#FFFFFF"
            @change-color="updateBackground($event)"
          />
        </div>
      </CardOptions>
      <CardOptions v-for="(color, i) in colors" :key="i" :removable="color.state" @remove="removeColor(i)">
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
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import LandingOptions from '@/components/ui/LandingOptions2'
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
        { hex: '#ff9aba', state: true },
        { hex: '#91d1ff', state: true },
        { hex: '#ffebf6', state: true },
        { hex: '#FFFFFF', state: false },
      ],
      showExport: false,
      time: '0',
      maxSpeed: 11,
      gradient: '',
      imgSize: 512,
      mapSize: 1024,
      dx1: 0,
      dy1: 0,
      dx2: 0,
      dy2: 0,
      backgroundColor: '#FFFFFF',
      wave: 5,
      height: 46,
      angle: -12,
      speed: -3,
      palettes: [],
      heightMap1: [],
      heightMap2: [],
    };
  },
  computed: {
    speedValue () {
      return 100000 / this.paths[2].duration
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
        height: 100%;
        transform: skewY(${this.angle}deg) scale(2) translateY(${this.height-100}%);
      }
    </style>
  </head>
  <body>
    <div class="background--custom">
      <canvas id="canvas" />
    </div>
    <script>
      const imgSize = 512
      const mapSize = 1024
      const ctx = document.getElementById('canvas').getContext('2d')
      const image = ctx.createImageData(imgSize, imgSize)
      for (let i = 0; i < image.data.length; i += 4) {
        image.data[i + 3] = 255
      }
      const distance = (x, y) => {
        return Math.sqrt(x * x + y * y)
      }
      const heightMap1 = []
      const heightMap2 = []
      for (let u=0; u<mapSize; u++) {
        for (let v=0; v<mapSize; v++) {
          const i = u * mapSize + v
          const cx = u - mapSize / 2
          const cy = v - mapSize / 2
          const d = distance(cx, cy)
          const stretch = (3 * Math.PI) / (mapSize / 2)
          const ripple = Math.sin(d * stretch)
          heightMap1[i] = Math.floor((ripple + 1) / 2 * 128)
          const d1 = distance(0.8 * cx, 1.3 * cy) * 0.05
          const d2 = distance(1.35 * cx, 0.45 * cy) * 0.05
          const h = Math.sin(d1) + Math.cos(d2)
          heightMap2[i] = Math.floor((h + 2) / 4 * 127);
        }
      }
      const HSLToRGB = (hsl) => {
        let h = hsl.h, s = hsl.s / 100, l = hsl.l / 100,
            c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0, g = 0, b = 0
        if (0 <= h && h < 60) {
          r = c; g = x;
        } else if (60 <= h && h < 120) {
          r = x; g = c;
        } else if (120 <= h && h < 180) {
          g = c; b = x
        } else if (180 <= h && h < 240) {
          g = x; b = c
        } else if (240 <= h && h < 300) {
          r = x; b = c
        } else if (300 <= h && h < 360) {
          r = c; b = x
        }
        r = Math.round((r + m) * 255)
        g = Math.round((g + m) * 255)
        b = Math.round((b + m) * 255)
        return {r, g, b}
      }
      const interpolateHSL = (c1, c2, f) => {
        return {
          h: c1.h + (c2.h - c1.h) * f,
          s: c1.s + (c2.s - c1.s) * f,
          l: c1.l + (c2.l - c1.l) * f,
        }
      }
      const makeColorGradient = (steps) => {
        const g = []
        if (steps.length > 1) {
          steps.slice(0, -1).forEach((c, i) => {
            const inc = Math.round(256 / (steps.length - 1))
            for (let j = i * inc; j < i * inc + inc; j++) {
              const f = (j - i * inc) / inc
              g.push(interpolateHSL(c, steps[i+1], f))
            } 
          })
        }
        while (g.length < 256) {
          g.push(steps[steps.length-1])
        }
        return g
      }

      const colors = ${JSON.stringify(this.colors.map(c => this.RGBToHSL(this.hexToRGB(c.hex))))}
      const paletteInit = makeColorGradient(colors)
      const palettes = [paletteInit, [...paletteInit].reverse()]
      const palette = []

      const moveHeightMaps = (t) => {
        t *= ${10**(this.speed/10)}
        dx1 = Math.floor((((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * mapSize) / 2)
        dy1 = Math.floor((((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * mapSize) / 2)
        dx2 = Math.floor((((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * mapSize) / 2)
        dy2 = Math.floor((((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * mapSize) / 2)
      }

      const updatePalette = (t) => {
        const timeScale = 0.0005
        const x = t * timeScale
        const inter = (Math.cos(x) + 1) / 2
        for (let i = 0; i < 256; i++) {
          palette[i] = interpolateHSL(palettes[0][i], palettes[1][i], inter);
        }
      }

      const updateImageData = () => {
        for (let u=0; u<imgSize; u++) {
          for (let v=0; v<imgSize; v++) {
            const i = (u + dy1) * mapSize + (v + dx1)
            const k = (u + dy2) * mapSize + (v + dx2)
            const j = u * imgSize * 4 + v * 4
            let h = heightMap1[i] + heightMap2[k]
            let c = HSLToRGB(palette[h])
            image.data[j] = c.r;
            image.data[j + 1] = c.g;
            image.data[j + 2] = c.b;
          }
        }
      }

      const tick = (time) => {
        moveHeightMaps(time)
        updatePalette(time)
        updateImageData()
        ctx.putImageData(image, 0, 0)
        window.requestAnimationFrame(tick)
      }
      window.requestAnimationFrame(tick)
    <\/script>
  </body>
</html>`
    }
  },
  mounted () {
    const canvas = document.getElementById('canvas')
    this.c = canvas.getContext('2d')

    this.image = this.c.createImageData(this.imgSize, this.imgSize);
    for (let i = 0; i < this.image.data.length; i += 4) {
      this.image.data[i + 3] = 255
    }
    this.initHeightMaps()

    const palette1 = this.makeRandomPalette()
    this.palettes = [palette1, palette1]
    this.palette = [];

    window.requestAnimationFrame(this.tick)
  },
  methods: {
    export () {
      console.log('showing')
      this.$refs.exportModal.toggle()
    },
    distance (x, y) {
      return Math.sqrt(x * x + y * y)
    },
    initHeightMaps () {
      const heightMap1 = []
      const heightMap2 = []
      for (let u=0; u<this.mapSize; u++) {
        for (let v=0; v<this.mapSize; v++) {
          const i = u * this.mapSize + v
          const cx = u - this.mapSize / 2
          const cy = v - this.mapSize / 2
          const d = this.distance(cx, cy)
          const stretch = (this.wave * Math.PI) / (this.mapSize / 2)
          const ripple = Math.sin(d * stretch)
          heightMap1[i] = Math.floor((ripple + 1) / 2 * 128)
          const d1 = this.distance(0.8 * cx, 1.3 * cy) * 0.05
          const d2 = this.distance(1.35 * cx, 0.45 * cy) * 0.05
          const h = Math.sin(d1) + Math.cos(d2)
          heightMap2[i] = Math.floor((h + 2) / 4 * 127);
        }
      }
      this.heightMap1 = heightMap1
      this.heightMap2 = heightMap2
    },
    interpolate (c1, c2, f) {
      return {
        r: Math.floor(c1.r + (c2.r - c1.r) * f),
        g: Math.floor(c1.g + (c2.g - c1.g) * f),
        b: Math.floor(c1.b + (c2.b - c1.b) * f)
      }
    },
    interpolateHSL (c1, c2, f) {
      let c1HSL = this.RGBToHSL(c1)
      let c2HSL = this.RGBToHSL(c2)
      let output = {
        h: c1HSL.h + (c2HSL.h - c1HSL.h) * f,
        s: c1HSL.s + (c2HSL.s - c1HSL.s) * f,
        l: c1HSL.l + (c2HSL.l - c1HSL.l) * f,
      }
      return this.HSLToRGB(output)
    },
    randomColor () {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return { r, g, b };
    },
    makeRandomPalette () {
      const palette = []
      for (let i=0; i<5; i++) {
        palette.push(this.randomColor())
      }
      return this.makeColorGradient(palette)
    },
    makeColorGradient (steps) {
      const g = []
      if (steps.length > 1) {
        steps.slice(0, -1).forEach((c, i) => {
          const inc = Math.round(256 / (steps.length - 1))
          for (let j = i * inc; j < i * inc + inc; j++) {
            const f = (j - i * inc) / inc
            g.push(this.interpolateHSL(c, steps[i+1], f))
          } 
        })
      }
      while (g.length < 256) {
        g.push(steps[steps.length-1])
      }
      return g
    },
    moveHeightMaps (t) {
      const scale = 10 ** (this.speed / 10)
      t *= scale
      this.dx1 = Math.floor(
        (((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * this.mapSize) / 2
      )
      this.dy1 = Math.floor((((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * this.mapSize) / 2)
      this.dx2 = Math.floor((((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * this.mapSize) / 2)
      this.dy2 = Math.floor(
        (((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * this.mapSize) / 2
      )
    },
    updatePalette (t) {
      const timeScale = 0.0005
      const x = t * timeScale;

      // normalized value 0..1 used to interpolate palette colors
      const inter = (Math.cos(x) + 1) / 2;

      // create interpolated palette for current frame
      for (let i = 0; i < 256; i++) {
        this.palette[i] = this.interpolateHSL(this.palettes[0][i], this.palettes[1][i], inter);
      }
    },
    updateImageData () {
      for (let u = 0; u < this.imgSize; u++) {
        for (let v = 0; v < this.imgSize; v++) {
          // indexes into height maps for pixel
          const i = (u + this.dy1) * this.mapSize + (v + this.dx1);
          const k = (u + this.dy2) * this.mapSize + (v + this.dx2);

          // index for pixel in image data
          // remember it's 4 bytes per pixel
          const j = u * this.imgSize * 4 + v * 4;

          // height value of 0..255
          let h = this.heightMap1[i] + this.heightMap2[k];
          // get color value from current palette
          let c = this.palette[h];

          // h = heightMap2[i];
          // c = { r: h, g: h, b: h };

          // set pixel data
          this.image.data[j] = c.r;
          this.image.data[j + 1] = c.g;
          this.image.data[j + 2] = c.b;
        }
      }
    },
    tick (time) {
      this.moveHeightMaps(time)
      this.updatePalette(time)
      this.updateImageData()
      this.c.putImageData(this.image, 0, 0)
      window.requestAnimationFrame(this.tick)
    },
    handleColor(userColor, index) {
      this.colors[index].hex = userColor
      const palette1 = this.makeColorGradient(this.colors.filter(c => c.state).map(c => this.hexToRGB(c.hex)))
      this.palettes = [palette1, [...palette1].reverse()]
    },
    removeColor(index) {
      if (this.colors.filter(c => c.state).length == 1) return
      this.colors[index].state = false
      const palette1 = this.makeColorGradient(this.colors.filter(c => c.state).map(c => this.hexToRGB(c.hex)))
      this.palettes = [palette1, [...palette1].reverse()]
    },
    hexToRGB(H) {
      let r = 0, g = 0, b = 0;
      if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      r *= 1
      g *= 1
      b *= 1
      return {r, g, b}
    },
    RGBToHSL (rgb) {
      let r = rgb.r / 255
      let g = rgb.g / 255
      let b = rgb.b / 255
      let cmin = Math.min(r,g,b),
          cmax = Math.max(r,g,b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;

      if (delta == 0)
        h = 0;
      else if (cmax == r)
        h = ((g - b) / delta) % 6;
      else if (cmax == g)
        h = (b - r) / delta + 2;
      else
        h = (r - g) / delta + 4;

      h = Math.round(h * 60);

      if (h < 0)
        h += 360;

      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);

      return {h, s, l};
    },
    hexToHSL(H) {
      // Convert hex to RGB first
      let r = 0, g = 0, b = 0;
        if (H.length == 4) {
          r = "0x" + H[1] + H[1];
          g = "0x" + H[2] + H[2];
          b = "0x" + H[3] + H[3];
        } else if (H.length == 7) {
          r = "0x" + H[1] + H[2];
          g = "0x" + H[3] + H[4];
          b = "0x" + H[5] + H[6];
        }
      return this.RGBToHSL({r, g, b})
    },
    HSLToRGB (hsl) {
      let h = hsl.h
      let s = hsl.s / 100
      let l = hsl.l / 100
      let c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs((h / 60) % 2 - 1)),
          m = l - c/2,
          r = 0,
          g = 0, 
          b = 0; 

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      // Having obtained RGB, convert channels to hex
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)
      return {r, g, b}
    },
    HSLToHex(h,s,l) {
      s /= 100;
      l /= 100;

      let c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs((h / 60) % 2 - 1)),
          m = l - c/2,
          r = 0,
          g = 0, 
          b = 0; 

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      // Having obtained RGB, convert channels to hex
      r = Math.round((r + m) * 255).toString(16);
      g = Math.round((g + m) * 255).toString(16);
      b = Math.round((b + m) * 255).toString(16);

      // Prepend 0s, if necessary
      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;

      return "#" + r + g + b;
    },
    updateBackground (event) {
      this.backgroundColor = event
    },
    updateHeight (event) {
      this.height = event
    },
    updateAngle (event) {
      this.angle = event
    },
    updateSpeed (event) {
      this.speed = event
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  // transform: skewY(-12deg) translateY(-60%);
}
</style>
