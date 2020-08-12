<template>
  <div>
    <CharactersToolbar v-on:change-filters="onChangeFilter" />
    <CharacterTable v-bind:filters="filters" />
  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import CharactersToolbar from "../components/CharactersToolbar.vue";
import CharacterTable from "../components/CharacterTable.vue";

export default Vue.extend({
  name: "CharactersBook",
  components: {
    CharactersToolbar,
    CharacterTable,
  },
  data() {
    return {
      filters: {
        elements: [] as string[],
        roles: [] as string[],
        raritys: [] as string[]
      },
    };
  },
  methods: {
    onChangeFilter(filter: {
      state: boolean;
      type: "elements" | "roles" | "raritys";
      caption: string;
    }) {
      if (filter.state) this.filters[filter.type].push(filter.caption);
      else this.filters[filter.type].splice(this.filters[filter.type].indexOf(filter.caption),1);
      console.log(this.filters)
    },
  },
});
</script>