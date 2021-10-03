<template>
  <v-card
      class="pa-4 ma-1 mx-2 justify-center align-center d-flex"
      max-width="200"
      width="180"
      elevation="24"
      color="#444444"
      rounded="xl"
      dark
      raised
      style="position: relative;"
    >
      <v-btn
        v-if="removable"
        fab
        dark
        style="position: absolute; top: -8px; right: -8px; height: 24px; width: 24px;"
        @click="$emit('remove')"
        >
        <v-icon small dark>
        mdi-minus
        </v-icon>
      </v-btn>
      <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    removable: {
      type: Boolean,
      default: false,
    }
  },
  emits: {
    remove: null
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
</style>
