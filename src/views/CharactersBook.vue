<template>
  <div>
    <CharactersToolbar v-on:change-filters="onChangeFilter" />
    <Character-table v-bind:filters="filters" />
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import CharactersToolbar from "../components/CharactersToolbar.vue";
import CharacterTable from "../components/CharacterTable.vue";

const elements: string[] = [];
const roles: string[] = [];

export default Vue.extend({
  name: "CharactersBook",
  components: {
    CharactersToolbar,
    CharacterTable,
  },
  data() {
    return {
      filters: {
        elements: elements,
        roles: roles,
      },
    };
  },
  methods: {
    onChangeFilter(filter: {
      state: boolean;
      type: "elements" | "roles";
      caption: string;
    }) {
      if (filter.state) this.filters[filter.type].push(filter.caption);
      else this.filters[filter.type].splice(this.filters[filter.type].indexOf(filter.caption),1);
    },
  },
});
</script>