<template>
  <v-app>
    <keep-alive include="Gradient,Lines,Canvas" exclude="Main">
    <component :is="currentBackground" ref="app">
    <Main @export="exportCode" @randomize="randomize" @changeBackground="changeBackground" :background="currentBackground"/>
    </component>
    </keep-alive>
  </v-app>
</template>

<script>
import Main from '@/components/Main'
import Gradient from '@/components/Gradient2'
import Lines from '@/components/Lines'
import Canvas from '@/components/Mesh'

export default {
  name: 'App',
  components: {
    Main,
    Gradient,
    Lines,
    Canvas,
  },
  mounted () {
  },
  data: () => {
    return {
      currentBackground: 'Canvas',
    }
  },
  computed: {},
  methods: {
    exportCode () {
      this.$refs.app.export()
    },
    randomize () {
      this.$refs.app.randomize()
    },
    changeBackground (background) {
      this.currentBackground = background
    }
  }
};
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';

.theme--light.v-application {
  background: none !important;
}
</style>
