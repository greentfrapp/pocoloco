<template>
  <v-btn elevation="2" small fab @click="$emit('add-color', true)">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      color: "#CFCFCF",
      trackColor: "#2D2D2D",
      thumbColor: "#FFFFFF",
    };
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
button {
  display: block;
  margin: 0 auto;
}
</style>
