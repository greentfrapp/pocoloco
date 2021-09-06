<template>
  <!-- Socials -->
  <div class="poco-socials text-center text-md-left">
    <p class="text-body font-weight-bold text--poco-blue mb-4 mb-md-0 mr-md-6">Connect with us</p>  
    <span v-for="(icon, i) in socials" :key="i" :class="`mr-${iconSpacing}`">
      <a :href= icon.link target="_blank">
        <v-icon :color="inputColor" :style="`font-size: ${size}px`">{{ icon.item }}</v-icon>
      </a>
    </span>
  </div>  
</template>

<script>
export default {
  name: 'Socials',
  props: {
    inputColor: {
      type: String,
      default: '#235592'
    },
    iconSpacing: {
      type: Number,
      default: 12
    },
    size: {
      type: Number,
      default: 32
    }           
  },
  data() {
    return {
      socials: [
        {item: 'mdi-facebook', link: '' },
        {item: 'mdi-github', link: '' },
        {item: 'mdi-linkedin', link: '' },
        {item: 'mdi-twitter', link: '' },
        {item: 'mdi-youtube', link: '' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.poco-socials {
  p {
    display: inline-block;
  }
  display: block;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    p {
      display: block;
    }    
    margin: 0 auto;
  } 
   
  a {
    border: none !important;
    text-decoration: none;
  }

  span:last-child {
    margin-right: 0px !important;
  }
}

</style>
