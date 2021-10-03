<template>
  <section>
    <v-container class="py-5">
      <nav class="d-flex align-center justify-space-between">
        <span class="text-lede">pocoloco</span>
        <div>
          <v-btn class="nav-item" @click="$emit('changeBackground', 'Gradient')">Flow</v-btn>
          <v-btn class="nav-item" @click="$emit('changeBackground', 'Canvas')">Mesh</v-btn>
          <v-btn class="nav-item" @click="$emit('changeBackground', 'Lines')">Lines</v-btn>
        </div>
      </nav>
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
          <v-btn @click="$emit('export')" dark>
            Export!
          </v-btn>
          <!-- <v-select
            :items="['Gradient', 'Canvas', 'Lines']"
            label="Background Type"
            outlined
            class="mt-8"
            :key="currentBackground"
            :value="currentBackground"
            @change="$emit('changeBackground', $event)"
          ></v-select> -->
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    background: String,
  },
  emits: {
    export: null,
    changeBackground: null,
  },
  data() {
    return {
      currentBackground: ''
    };
  },
  methods: {},
  activated () {
    console.log('activated')
    console.log(this.background)
    console.log(this.currentBackground)
    this.currentBackground = this.background
    console.log(this.currentBackground)
  },
}
</script>

<style lang="scss" scoped>
.nav-item {
  cursor: pointer;
  margin: 0px 10px;
  color: #111;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
</style>