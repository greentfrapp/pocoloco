<template>
<div class="input">
  <v-text-field
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
  <v-icon class="ml-2">{{ icon }}</v-icon> 
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
      color: "grey",
    };
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
