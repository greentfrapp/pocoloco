<template>
  <section class="page-landing">
    <v-container class="py-5">
      <nav class="text-lede">pocoloco</nav>
    </v-container>

    <v-container class="landing-content">
      <v-row no-gutters>
        <v-col cols="10" class="mb-12">
          <h1>
            <span class="text-hero">Simplicity is the ultimate</span> 
            <br>
            <span class="text-hero font-weight-bold">sophistication</span>
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

    <LandingOptions />
  </section>
</template>

<script>
import LandingOptions from '@/components/ui/LandingOptions'

export default {
  components: {
    LandingOptions,
  },
  data() {
    return {
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.page-landing {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #E5F1F8 0%, #E8E5F1 100%);
  overflow: hidden;

  .landing-content {
    padding: 64px 0;
  }  
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .page-landing {
    padding: 48px 4px;
  }  
}
</style>