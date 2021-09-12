<template>
<div class="input">
  <v-menu v-model="menu" top :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        :change="$emit('change-color', color)"
      >
        {{ color }}
      </v-btn>
      
      <div :style="swatchStyle" v-on="on" />
    </template>
    <v-color-picker v-model="color" flat mode="hexa" />
  </v-menu>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    icon: {
      type: String
    },
    initialColor: {
      type: String
    }
  },
  data() {
    return {
      menu: false,  
      color: ''    
    };
  },
  computed: {
    swatchStyle() {
      return {
        backgroundColor: this.color,
        cursor: 'pointer',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
      }
    }
  },
  mounted() {
    this.color = this.initialColor;
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;

  .input-color-field {
    border-radius: 32px;
    border: 2px solid #818181;
    margin-right: 4px;
    width: 48px;
  }

  .input-color-dot {
    height: 20px;
    width: 20px;
    display: inline-block;
    border-radius: 50%;
    border: 2px solid #2D2D2D;
    background-color: white;
  }
}
</style>
