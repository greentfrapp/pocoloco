<template>
  <button @click="scrollTop" :class="this.$vuetify.breakpoint.smAndDown ? 'scroll-to-top mobile' : 'scroll-to-top'">
    <div>
      <v-icon color="#235592">mdi-chevron-up</v-icon>
      <p class="text-nav-anchor text-center mb-0 text--poco-blue">Back <br>to top</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ScrollTopButton',
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });      
    }    
  }
}
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  right: 32px;
  bottom: 32px;

  border-radius: 50%;
  background-color: rgba(250, 250, 250, 0.6);
  width: 85px;
  height: 85px;
  align-items: center;
  justify-content: center;
  display: none;

  &.mobile {
    right: 16px;
    bottom: 48px;
    width: 80px;
    height: 80px;    
  }
}


</style>
