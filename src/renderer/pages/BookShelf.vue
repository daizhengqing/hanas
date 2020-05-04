<template lang="pug">
  .bookshelf
    .filter
      mu-text-field(
        type="text" v-model="keyword" 
        placeholder="戳戳这里输入关键词过滤"
      )
    .list
      Scrollbar
        .item-list
          .item(v-for="item in list" :key="item.url" @click="onItemClick(item)")
            .cover-container
              img(v-lazy="item.cover" :loading="require('@/assets/image/loading_cover.png')")
            div
              span {{ item.name }}
            div
              span {{ item.from }}
</template>

<script>
import Scrollbar from 'vue-multiple-scrollbar'

export default {
  components: { Scrollbar },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    list () {
      const res = this.$store.state.app.config.bookShelf || []

      return res.filter(item => item.name && item.name.toLowerCase().includes(this.keyword.toLowerCase()))
    }
  },
  methods: {
    onItemClick (item) {
      this.$router.push({ path: '/details', query: item })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bookshelf {
    height: 100%;
    padding-top: 50px;
  }

  .filter {
    text-align: center;
  }

  /deep/ .mu-input {
    color: rgba(255, 255, 255, .8) !important;
    margin: 0 !important;
    width: 430px !important;
  }

  /deep/ .mu-input-line,  /deep/ .mu-input-focus-line {
    display: none;
  }

  /deep/ .mu-text-field {
    color: rgba(255, 255, 255, .7);
  }

  /deep/ .mu-input__focus {
    color: rgba(255, 255, 255, .8) !important;
  }

  /deep/ .mu-text-field-input {
    color: rgba(255, 255, 255, .9) !important;
    text-align: center;
    font-size: 15px;
    letter-spacing: 1px;
  }

  /deep/ input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, .9);
    font-size: 13px;
    text-align: center;
  }

  .list {
      height: calc(100% - 48px);

      .item-list {
        padding: 0 20px 10px 20px;
        display: grid;
        grid-gap: 0;
        grid-template-columns: repeat(auto-fill, minmax(150px,1fr));

        .item {
          padding: 7px;
          text-align: center;
        }

        .cover-container {
          height: 192px;
          overflow: hidden;
          margin-bottom: 5px;
          border-radius: 3px;
          background: rgba(0,0,0,.5);
          display: flex;
        }

        img {
          width: 100%;
          user-select: none;
          transition: .5s ease;

          &:hover {
            cursor: pointer;
            transform: scale(1.2);
          }
        }

        span {
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
        }
      }

      /deep/ .vm-scrollbar {
        height: 100%;
      }

      /deep/ .vm-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
      }
    }
</style>
