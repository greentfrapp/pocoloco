<template>
  <section>
    <v-container class="py-5">
      <nav class="d-flex align-center justify-space-between">
        <a class="text-lede" href="/">pocoloco</a>
      </nav>
    </v-container>
    <v-container class="landing-content mt-16">
      <v-row no-gutters>
        <v-col cols="8" class="mb-8">
          <h1>
            <span class="text-hero font-title">Generate dynamic backgrounds</span>
            <br>
            <span class="text-hero font-title">for your website</span>
          </h1>
        </v-col>
        <v-col cols="7">
          <h2 class="text-section mb-8 font-title" style="font-weight: 700; color: #313131;">
            Tired of static backgrounds? Click Export! for the code you need to get this dynamic backdrop for your own website.
          </h2>
          <div class="mb-8">
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Gradient')">Flow</v-btn>
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Canvas')">Mesh</v-btn>
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Lines')">Lines</v-btn>
            <v-btn class="nav-item" @click="$emit('export')" dark style="color: white;">Export!</v-btn>
          </div>
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
.nav-item:first-child {
  margin-left: 0;
}
</style>