<template>
    <b-container style="padding-bottom: 10px;
padding-top: 10px;">
            <b-row align-v="center" align-h="center"> 
        <b-col cols="3">
  <multiselect size="lg" v-model="value" tag-placeholder="Add this as new tag" placeholder="Types of Spirit Stone" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
 <!--  <pre class="language-json"><code>{{ value  }}</code></pre> -->
     </b-col>
        <b-col cols="9">
        <b-button-toolbar  key-nav aria-label="Toolbar with button groups">
          <b-col cols="3" >
      <b-input-group align-v="center" align-h="center" >
        <b-form-input size="lg" placeholder="Stone Seach..."></b-form-input>
      </b-input-group>
          </b-col>
           <b-col cols="9" align-v="center" align-h="center">
      <b-button-group>
        <b-button
          v-for="(btn, idx) in elements"
          :key="idx"
          :pressed.sync="btn.state"
          v-bind:variant="btn.variant"
          v-on:click="$emit('change-filters', {state:btn.state, type:'elements' , caption:btn.caption})"
        >{{ btn.caption }}
       <img alt="elemento" v-bind:src="getImagUrl(elements[idx].caption)" />
        </b-button>
      </b-button-group>
                </b-col>
    </b-button-toolbar>
    </b-col>
  </b-row>
   </b-container>
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
        { caption: "Ardor", state: false, variant: "white" },
        { caption: "Whirlwind", state: false, variant: "white" },
        { caption: "Thunder", state: false, variant: "white" },
        { caption: "Light", state: false, variant: "white" },
        { caption: "Dark", state: false, variant: "white"  }
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
    },
    getImagUrl(picName) {
      console.log(picName,"madara")
     return require("../assets/elements/" + picName + ".jpg");
    }

  }

}

    
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
