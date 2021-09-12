<template>
<div class="input" style="display: flex; justify-content: space-between;">
  <v-menu v-model="menu" top :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on"
        :change="$emit('change-color', color)"
        style="flex-grow: 1; text-align: left;"
      >
        {{ color }}
      </v-btn>
      
      <div :style="swatchStyle" v-on="on" />
    </template>
    <v-color-picker
      v-model="color"
      flat mode="hexa"
      width="200"
      dark
      />
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
        border: '2px solid white',
        boxShadow: '0px 0px 2px #111',
        marginLeft: '10px',
      }
    }
  },
  mounted() {
    this.color = this.initialColor;
  }
}
</script>

<style lang="scss">
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

div.v-menu__content {
  border-radius: 10px;
  border: 3px solid #2d2d2d;
}

div.v-color-picker__canvas-dot {
  border: 1px solid white;
  box-shadow: 0px 0px 1px #111;
}

span.v-btn__content {
  display: block;
}
</style>
