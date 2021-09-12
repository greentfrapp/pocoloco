<template>
  <v-card
      class="pa-4 ma-1"
      max-width="200"
      elevation="24"
      color="#444444"
      rounded="xl"
      dark
      raised
    >
      <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
</style>
