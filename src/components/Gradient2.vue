<template>
  <div class="main page-landing background--custom">
    <slot></slot>
    <LandingOptions>
      <CardOptions>
        <Slider :value="8" icon="mdi-run" @input="handleSpeed" min=1 :max=maxSpeed step=1 />
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
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import LandingOptions from '@/components/ui/LandingOptions2'
import ColorPicker from '@/components/ui/ColorPicker'
import ExportModal from '@/components/ui/ExportModal'

export default {
  name: 'Gradient',
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
        { hex: '#a4baf5', state: true },
        { hex: '#c8e74d', state: false },
        { hex: '#f5a2a1', state: false },
      ],
      angle: '90',
      showExport: false,
      time: '0',
      maxSpeed: 11,
      gradient: '',
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
      background: ${this.gradient};
      background-size: 300% 300%;
      animation: gradient ${this.time} alternate infinite;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    @keyframes gradient {
      0% {
        background-position: 0%;
      }
      100% {
        background-position: 100%;
      }
    }
    </style>
  </head>
  <body>
    <div class="background--custom"></div>
  </body>
</html>`
    },
  },
  mounted () {
    this.handleSpeed(8);
  },
  methods: {   
    export () {
      console.log('showing')
      this.$refs.exportModal.toggle()
    },
    handleColor(userColor, index) {
      this.colors[index].hex = userColor
      this.createGradient()
    },
    removeColor(index) {
      if (index < this.colors.filter(c => c.state).length - 1) {
        const removedColor = this.colors.splice(index, 1)[0]
        removedColor.state = false
        this.colors.push(removedColor)
      } else {
        this.colors[index].state = false
      }
      this.createGradient()
    },
    createGradient() {
      // Called whenever color is updated
      const count = this.colors.filter(c => c.state).length
      let gradientColors = []
      switch (count) {
        case 1: {
          const colorInput = this.hexToHSL(this.colors[0].hex);  
          const darkColor = this.HSLToHex(+colorInput.h, colorInput.s - 5, +colorInput.l - 15 < 0 ? 0 : +colorInput.l - 15)
          const lightColor = this.HSLToHex(+colorInput.h + 10, colorInput.s, +colorInput.l + 10 > 100 ? 100 : +colorInput.l + 10)
          gradientColors = [lightColor, this.colors[0].hex, darkColor]
          break
        }
        case 2: {
          gradientColors = this.colors.filter(c => c.state).map(c => c.hex)
          break
        }
        case 3: {
          gradientColors = this.colors.filter(c => c.state).map(c => c.hex)
          break
        }
        default: {
          gradientColors = ['#FFFFFF']
        }
      }

      this.gradient = `linear-gradient(${this.angle}deg, ${gradientColors.join(', ')})`   
      const selector = document.documentElement.style
      selector.setProperty('--gradient', this.gradient)
    },
    handleSpeed(event) {
      const selector = document.documentElement.style
      this.time = `${this.maxSpeed + 1 - event}s`
      selector.setProperty('--time', this.time);
    },
    // handleAngle(event) {
    //   this.angle = event;
    //   this.createGradient();
    // },
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

      // Then to HSL
      r /= 255;
      g /= 255;
      b /= 255;
        
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

      var HSL = new Object();
      HSL['h'] = h;
      HSL['s'] = s;
      HSL['l'] = l;

      return HSL;
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

  &.background--custom {
    background: var(--gradient);       
    background-size: 300% 300%;
    animation: gradient var(--time) alternate infinite;

    @keyframes gradient {
      0% {
        background-position: 0%;
      }
      100% {
        background-position: 100%;
      }
    }
  }

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
</style>
