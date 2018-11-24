<template>
  <div class="collapsible-books">
    <q-collapsible class="text-capitalize" :label="lv.label +' '+ lv.lv " v-for="(lv, key) in levels" :key="key" :separator="true">
      <div v-for="(book, i) in books[key]" :key="i">
        <q-btn size="sm" icon="folder_open" flat class="btn full-width btn-facebook btn-book" :label="book.name" @click="openBook(book)"/>
      </div>
    </q-collapsible>
    <modal-book :url="bookSelected.url" ref="ModalBook"></modal-book>
  </div>
</template>

<script>
import ModalBook from 'components/ModalBook'
export default {
  data () {
    return {
      levels: this.$store.getters['levelLesson/byLanguage'](this.lng.id),
      books: [],
      bookSelected: {
        src: ''
      }
    }
  },
  components: { ModalBook },
  props: ['lng'],
  mounted () {
    this.levels.map((lv) => {
      this.books.push(this.$store.getters['book/byLevel'](lv.language_id, lv.lv))
    })
  },
  methods: {
    openBook (book) {
      this.bookSelected = book
      this.$refs.ModalBook.show()
    }
  }
}
</script>
