<template>
  <section>

    <v-container class="py-5">
      <nav class="text-lede">pocoloco</nav>
    </v-container>

    <v-container class="landing-content mt-16">
      <v-row no-gutters>
        <v-col cols="8" class="mb-12">
          <h1>
            <span class="text-hero font-simple">Simplicity is the ultimate</span> 
            <br>
            <span class="text-hero font-soph">sophistication</span>
          </h1>
        </v-col>

        <v-col cols="7">
          <h2 class="text-section mb-8">
            Need a beautiful website to show the world that you mean business? Just hit that Export button and you’ve got your own gorgeously dynamic backdrop to showcase your next big idea.
          </h2>

          <v-btn>
            Export
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    };
  },
  methods: {
    handleColor(event) {
      const selector = document.documentElement.style
      const gradient = `linear-gradient(-45deg, rgba(255,0,0,0.5) 0%, #5a55ae 13%, #7b5fac 25%, ${event} 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #d6d2cc 100%)`;    
      
      selector.setProperty('--gradient', gradient);
    },
    handleSpeed(event) {
      const selector = document.documentElement.style
      const time = `${event}ms`

      selector.setProperty('--time', time);
    },    
  },
}
</script>

<style lang="scss" scoped>
</style>