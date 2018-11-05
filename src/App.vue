<template>
  <div id="app">
    <navigation v-if="currentUser"></navigation>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navigation from '@/components/Navigation' 

export default {
 
  components: { 
    Navigation 
    },
  computed: {
    ...mapState([ 'currentUser'])
  }

}
</script>

<style>

</style>
