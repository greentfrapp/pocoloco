<template>
  <v-card
      class="mx-auto pa-5"
      max-width="225"
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
