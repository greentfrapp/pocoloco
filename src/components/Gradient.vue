<template>
  <section
    :class="['page-landing', 'background--custom']">
    <div class="custom-div" />
    <slot></slot>

    <LandingOptions @export-code="dialog = true">
      <v-col cols="3">
        <CardOptions>
          <Slider :value="8" icon="mdi-run" @input="handleSpeed" min=1 max=12 step=1 />
          <!-- <Slider :value="90" icon="mdi-angle-acute" @input="handleAngle" min=0 max=360 step=45 /> -->
        </CardOptions>
      </v-col>

      <v-col cols="3" v-for="(color, i) in colors" :key="i">
        <CardOptions class="text-center">
          <v-hover v-if="!color.state">
            <v-icon
              large
              slot-scope="{ hover }"
              :style="{color: hover ? '#fff':'#aaa'}"
              @click="color.state = true, color.hex= initialColors[i]">
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
      </v-col>           
    </LandingOptions>

    <v-dialog
      v-model="dialog" 
      flat
      transition="dialog-bottom-transition"
      max-width="600">
      <v-card class="pa-5">
        <div class="code-header mb-4">
          <p class="text-body mb-0" style="display: inline-block">Copy this style to your CSS and add  <code>class="background--custom"</code> to your div
          </p>
          <v-btn :ripple="false" fab class="btn--copy" @click="handleCode">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn> 
        </div>

        <div class="pa-4 code-wrapper">
          <pre>
            <code class="gradient-css-code">
.background--custom {
  background: {{ gradient }};       
  background-size: 300% 300%;
  animation: gradient {{ time }} alternate infinite;

  @keyframes gradient {
    0% {
      background-position: 0%;
    }  
    50% {
      background-position: 50%;
    }   
    100% {
      background-position: 100%;
    }
  }
}</code>
          </pre>
        </div>           
      </v-card>
    </v-dialog>    
  </section>
</template>

<script>
import LandingOptions from '@/components/ui/LandingOptions2'
// import * as d3 from "d3-selection";

// import AddBtn from '@/components/ui/AddBtn'
import Slider from '@/components/ui/Slider'
import CardOptions from '@/components/ui/CardOptions'
import ColorPicker from '@/components/ui/ColorPicker'

export default {
  components: {
    LandingOptions,
    Slider,
    CardOptions,    
    ColorPicker,
    // AddBtn
  },
  data() {
    return {
      initialColors: [
        '#a4baf5',
        '#c8e74d',
        '#f5a2a1',
      ],
      colors: [
        { hex: '#a4baf5', state: true },
        { hex: '#c8e74d', state: false },
        { hex: '#f5a2a1', state: false },
      ],
      angle: '90',
      dialog: false,
      time: '0',
      gradient: '',
    };
  },
  mounted() {
    this.handleSpeed(8);
  },
  methods: {   
    handleColor(userColor, index) {
      const colorInput = this.hexToHSL(userColor);  
      const darkColor = this.HSLToHex(+colorInput.h, colorInput.s - 5, +colorInput.l - 15 < 0 ? 0 : +colorInput.l - 15)
      const lightColor = this.HSLToHex(+colorInput.h + 10, colorInput.s, +colorInput.l + 10 > 100 ? 100 : +colorInput.l + 10)

      if (index ===  0 && !this.colors[1].state) {
        this.colors[0].hex = lightColor;        
        this.colors[1].hex = userColor;   
        this.colors[2].hex = darkColor;   
      } else if (!this.colors[2].state) {
        this.colors[+index].hex = userColor;               
        this.colors[2].hex = '';        
      } else if (this.colors[2].state) {        
        this.colors[+index].hex = userColor;               
      }

      this.createGradient();
    },
    createGradient() {
      this.gradient = `linear-gradient(${this.angle}deg, ${this.colors.map((n) => n.hex).filter(n => n).join(', ')})`;        
      const selector = document.documentElement.style
      selector.setProperty('--gradient', this.gradient); 
    },
    handleSpeed(event) {
      const selector = document.documentElement.style
      this.time = `${12 - event}s`
      selector.setProperty('--time', this.time);
    },
    // handleAngle(event) {
    //   this.angle = event;
    //   this.createGradient();
    // },
    handleCode() {
      const text = document.querySelector(".gradient-css-code").textContent
      console.log(text)
      // document.execCommand("copy");
      this.copyToClipboard(text)
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
    copyToClipboard (textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy)
      } else {
        // text area method
        let textArea = document.createElement("textarea")
        textArea.value = textToCopy
        // make the textarea out of viewport
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
        })
      }
    }
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
    background-size: 300% 300%;
    animation: gradient var(--time) alternate infinite;

    @keyframes gradient {
      0% {
        background-position: 0%;
      }  
      50% {
        background-position: 50%;
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

.custom-div {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 200px;
  height: 160px;
  background: var(--gradient);  
  border: 2px solid red;     
  background-size:  100% 100%;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .page-landing {
    padding: 48px 4px;
  }  
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.code-wrapper {
  background-color: #424242;
  color: white;
  border-radius: 12px;
  font-family: 'Courier New', Courier, monospace;
}
</style>