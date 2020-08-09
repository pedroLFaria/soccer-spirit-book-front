<template>
    <div>
        <b-button-toolbar key-nav aria-label="Toolbar with button groups">
      <b-input-group size="lg" prepend="StoneName">
        <b-form-input></b-form-input>
      </b-input-group>
      <b-button-group class="mx-1">
        <b-button
          v-for="(btn, idx) in elements"
          :key="idx"
          :pressed.sync="btn.state"
          v-bind:variant="btn.variant"
          v-on:click="$emit('change-filters', {state:btn.state, type:'elements' , caption:btn.caption})"
        >{{ btn.caption }}
        </b-button>
      </b-button-group>
      <b-button>Reset</b-button>
    </b-button-toolbar>
  <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
  <pre class="language-json"><code>{{ value  }}</code></pre>
   </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect';
import Vue from 'vue';

Vue.component('multiselect', Multiselect)


export default {
  name: 'StonesToolBar',
  components: {
    Multiselect
  },
  
   // OR register locally
    data () {
      return {
      value: [
      ],
      options: [
        { name: 'Pedra', code: 'd' },
        { name: 'Stone', code: 'f' },
        { name: 'Rock', code: 's' }
      ],
      elements: [
        { caption: "Ardor", state: false, variant: "danger" },
        { caption: "Whirlwind", state: false, variant: "success" },
        { caption: "Thunder", state: false, variant: "primary" },
        { caption: "Light", state: false, variant: "warning" },
        { caption: "Dark", state: false, variant: "dark" }
      ]
      }
    },
    methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}

    
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
