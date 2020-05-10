<template lang="pug">
  .checkbox
    .check-box-item(v-for="item in list")
      input(type="checkbox" value="markcheckbox1" id="markcheckbox1")
      label(class="mark" for="markcheckbox1") markcheckbox1
</template>

<script>
export default {
  prop: ['list']
}
</script>
