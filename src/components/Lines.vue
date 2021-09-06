<template>
  <div class="main">
    <svg class="background-blob" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path v-for="(p, i) in paths" :key="i" :id="`path${i}`" :fill="p.fill" :d="p.d"></path>
    </svg>
    <slot></slot>
    <v-container>
      <input type="text" :value="paths[0].fill" @change="update"/>
    </v-container>
  </div>
</template>

<script>
// import d3 from 'd3'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  data () {
    return {
      paths: [
        {
          id: 'path0',
          d: 'M-50 -50L150 -50L150 50L-50 50Z',
          duration: 10000,
          fill: 'rgba(255, 255, 0, 0.7)',
          start: '0deg',
          end: '10deg',
        }, {
          id: 'path1',
          d: 'M-50 -50L150 -50L150 50L-50 50Z',
          duration: 25000,
          fill: 'rgba(0, 255, 255, 0.7)',
          start: '-30deg',
          end: '5deg',
        }, {
          id: 'path2',
          d: 'M-50 -50L150 -50L150 20L-50 20Z',
          duration: 60000,
          fill: 'rgba(255, 0, 255, 0.2)',
          start: '50deg',
          end: '-40deg',
        },
      ]
    }
  },
  computed: {},
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
}

.background-blob {
  position: absolute;
  width: 100vw;
  height: 99vh;
  z-index: -1;
}
</style>
