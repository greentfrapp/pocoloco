<template>
<div class="input">
  <!-- <v-text-field
    v-model="color"
    dense
    rounded
    class="my-0 py-0 input-color-field"
    type="string"
    :hide-details="false"
    :change="$emit('change-color', color)"
  >
  {{ color }}
  </v-text-field>   
  <div class="input-color-dot" :style="{ backgroundColor: color }" />
  <v-icon class="ml-2">{{ icon }}</v-icon>  -->
  <!-- <v-color-picker mode="hexa" canvas-height="60" flat width="100%" /> -->
    <v-text-field v-model="color" hide-details class="ma-0 pa-0" solo-inverted flat :change="$emit('change-color', color)">
      
      <template v-slot:append>
        <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <div :style="swatchStyle" v-on="on" />
          </template>
          <v-color-picker v-model="color" flat mode="hexa" />
        </v-menu>
      </template>
      
    </v-text-field>
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
