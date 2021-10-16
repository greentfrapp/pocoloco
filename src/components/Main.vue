<template>
  <section>
    <v-container class="py-5">
      <nav class="d-flex align-center justify-space-between">
        <a class="text-lede" href="/">pocoloco</a>
      </nav>
    </v-container>
    <v-container class="landing-content mt-0 mt-md-16">
      <v-row no-gutters>
        <v-col cols="9" class="mb-2 mb-md-8">
          <h1>
            <span class="text-hero font-title">Generate dynamic backgrounds</span>
            <br>
            <span class="text-hero font-title">for your website</span>
          </h1>
        </v-col>
        <v-col cols="10" md="7">
          <h2 class="desktop-only text-section mb-8 font-title" style="font-weight: 500; color: #313131;">
            Tired of static backgrounds? Click Export! for the code you need to get this dynamic backdrop for your own website.
          </h2>
          <h2 class="mobile-only text-section mb-8 font-title" style="font-weight: 500; color: #313131;">
            Tired of static backgrounds? Head over to the desktop and export this dynamic backdrop!
          </h2>
          <div class="mb-16 flex">
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Canvas')">Mesh</v-btn>
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Gradient')">Flow</v-btn>
            <v-btn class="nav-item" @click="$emit('changeBackground', 'Lines')">Lines</v-btn>
            <v-btn class="nav-item" @click="$emit('export')" dark style="color: white;">Export!</v-btn>
            <v-btn class="nav-item" @click="$emit('randomize')" style="height: 36px; width: 36px; min-width: 36px;"><v-icon class="shake" dark>mdi-dice-6-outline</v-icon></v-btn>
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
    randomize: null,
    changeBackground: null,
  },
  data() {
    return {
      currentBackground: ''
    };
  },
  methods: {},
  activated () {
    this.currentBackground = this.background
  },
}
</script>

<style lang="scss" scoped>
.desktop-only {
  display: block;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    display: none;
  }
}

.mobile-only {
  display: none;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    display: block;
  }
}

.nav-item {
  cursor: pointer;
  margin: 10px 10px;
  color: #111;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
.nav-item:first-child {
  margin-left: 0;
}
.shake {
  animation: bounceY 2s infinite;
  @keyframes bounceY {
      0%, 20%, 35%, 50%, 65%, 80%, 100% {
        transform: translateY(0);
      }
      42% {
        transform: translateY(-4px);
      }
      58% {
        transform: translateY(-2px);
      }
    }          
}
</style>