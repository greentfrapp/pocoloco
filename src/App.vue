<template>
  <v-app>
    <router-view>
    <Main/>
    </router-view>
  </v-app>
</template>

<script>
import Main from '@/components/Main'

export default {
  name: 'App',
  components: {
    Main
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';

.theme--light.v-application {
  background: none !important;
}
</style>
