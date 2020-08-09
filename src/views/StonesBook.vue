<template>
    <div>
     <StonesToolbar v-on:change-filters="onChangeFilter" />
    <StoneTable v-bind:filters="filters" />

   </div>
</template>

<script lang="ts">
// @ is an alias to /src
import StonesToolbar from "../components/StonesToolbar.vue";
import StoneTable from "../components/StoneTable.vue";

import Vue from 'vue';
const elements: string[] = [];


export default Vue.extend({ 
  name: 'StonesBook',
  components: {
      StoneTable,
    StonesToolbar
  },
data() {
    return {
      filters: {
        elements: elements,
      },
    };
  },
  methods: {
    onChangeFilter(filter: {
      state: boolean;
      type: "elements";
      caption: string;
    }) {
      if (filter.state) this.filters[filter.type].push(filter.caption);
      else this.filters[filter.type].splice(this.filters[filter.type].indexOf(filter.caption),1);
    },
  },

})

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
