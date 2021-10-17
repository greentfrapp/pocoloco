<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';

.theme--light.v-application {
  background: none !important;
}
</style>