<template>
  <div>
    <b-button-toolbar key-nav aria-label="Toolbar with button groups">
      <b-input-group size="lg" prepend="Name">
        <b-form-input></b-form-input>
      </b-input-group>
      <b-button-group class="mx-1">
        <b-button
          v-for="(btn, idx) in elements"
          :key="idx"
          :pressed.sync="btn.state"
          v-bind:variant="btn.variant"
          v-on:click="$emit('change-filters', {state:btn.state, type:'elements' , caption:btn.caption})"
        >{{ btn.caption }}</b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button
          v-for="(btn, idx) in roles"
          :key="idx"
          :pressed.sync="btn.state"
          variant="secondary"
          v-on:click="$emit('change-filters', {state:btn.state, type:'roles' , caption:btn.caption})"
        >{{ btn.caption }}</b-button>
      </b-button-group>
      <b-button>Reset</b-button>
    </b-button-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      elements: [
        { caption: "Ardor", state: false, variant: "danger" },
        { caption: "Whirlwind", state: false, variant: "success" },
        { caption: "Thunder", state: false, variant: "primary" },
        { caption: "Light", state: false, variant: "warning" },
        { caption: "Dark", state: false, variant: "dark" }
      ],
      roles:[
        { caption: "Striker", state: false },
        { caption: "Goalkeeper", state: false },
        { caption: "assistance", state: false },
        { caption: "Attacker", state: false },
        { caption: "Defender", state: false }
      ]
    };
  },
});
</script>