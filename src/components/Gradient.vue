<template>
  <section
    :class="['page-landing', 'background--custom']">
    <div class="custom-div" />
    <slot></slot>

    <LandingOptions>
      <v-col cols="4">
        <CardOptions>
          <Slider :value="4" icon="mdi-run" @input="handleSpeed" min=1 max=20 step=1 />
          <ColorPicker 
            icon="mdi-palette" 
            initialColor="#E90922"
            @change-color="handleMonochrome($event)"
          />
        </CardOptions>
      </v-col>
    </LandingOptions>
  </section>
</template>

<script>
import LandingOptions from '@/components/ui/LandingOptions'
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

      const gradient = `linear-gradient(-90deg, 
        ${this.colors[0].hex} 0%, 
        ${this.colors[1].hex} 100%
      )`;    

// const gradient = "linear-gradient(217deg, rgba(255,0,0,.8), rgba(2 55,0,0,0) 70.71%),  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)"



// const gradient = 'linear-gradient(45deg, rgba(0, 0, 0, 255), rgba(0, 0, 0, 0), rgba(0, 0, 0, 255)) no-repeat border-box, linear-gradient(20deg, #0ff 10%, #f00 50%, #0ff 100%) no-repeat border-box';



      const time = `10s`

      selector.setProperty('--time', time);
      selector.setProperty('--gradient', gradient);      
    },
    handleMonochrome(userColor) {
      const colorInput = this.hexToHSL(userColor);  

      // const darkColor = this.HSLToHex(colorInput.h ,  +colorInput.s - 10 < 0 ? 0 : +colorInput.s - 10,  +colorInput.l - 10 < 0 ? 0 : +colorInput.l - 10)
      // const lightColor = this.HSLToHex(colorInput.h ,  +colorInput.s + 10 < 100 ? 100 : +colorInput.s + 10,  +colorInput.l + 10 > 100 ? 100 : +colorInput.l + 10)

      const darkColor = this.HSLToHex(+colorInput.h, colorInput.s - 5, +colorInput.l - 15 < 0 ? 0 : +colorInput.l - 15)
      const lightColor = this.HSLToHex(+colorInput.h + 10, colorInput.s, +colorInput.l + 10 > 100 ? 100 : +colorInput.l + 10)

      const gradient = `linear-gradient(-90deg, 
        ${lightColor},        
        ${userColor},        
        ${darkColor}
      )`;    
      
      const time = `4s`

      console.log(gradient)

      const selector = document.documentElement.style
      selector.setProperty('--time', time);
      selector.setProperty('--gradient', gradient);            
    },
    handleSpeed(event) {
      console.log(event)
      const selector = document.documentElement.style
      const time = `${event}s`

      selector.setProperty('--time', time);
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
</style>