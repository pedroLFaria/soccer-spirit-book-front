<template>
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>
    <b-modal v-model="show" id="my-Modal" name="my-modal" size="xl">
      <b-container fluid>
        <b-row>
          <b-col>
              <b-img fluid thumbnail blank-color="red" :src="require('../assets/art/Jiho.png')" />
              
          </b-col>
          <b-col>2 of 3</b-col>
          <b-col>3 of 3</b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Character from "../common/Character"
export default Vue.extend({
  data() {
    return {
      modalShow: true,
    };
  },
  props:{
      show: Boolean,
      character: ()=>({} as Character),
  }
});
</script>

<style>
    .modalCharacter{
        max-width: 80%;
    }
</style>