<template>
    <div class="menu-create">
      <created-or-edit :isEdit="true"></created-or-edit>
    </div>
  </template>
<script lang="ts">
import Vue from 'vue'
import CreatedOrEdit from './components/CreatedOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreatedOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style>

</style>
