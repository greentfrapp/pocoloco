<template>
  <!-- <v-app> -->
    <keep-alive include="Gradient,Lines" exclude="Main">
    <component :is="currentBackground" ref="app">
    <Main @export="exportCode" @randomize="randomize" @changeBackground="changeBackground" :background="currentBackground"/>
    </component>
    </keep-alive>
  <!-- </v-app> -->
</template>

<script>
import Main from '@/components/Main'
import Gradient from '@/components/Gradient2'
import Lines from '@/components/Lines'

export default {
  name: 'App',
  components: {
    Main,
    Gradient,
    Lines,
  },
  mounted () {
  },
  data: () => {
    return {
      currentBackground: 'Gradient',
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


