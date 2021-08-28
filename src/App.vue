<template>
  <v-app>
    <Landing />
  </v-app>

</template>

<script>  
import Landing from '@/components/Landing'

export default {
  name: 'App',
  components: {
    Landing
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';
</style>