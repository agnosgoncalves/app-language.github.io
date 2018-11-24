<template>
  <div class="table-points">
      <q-table
        class="full-width"
        title="Tabela de pontos"
        :data="tableData"
        :columns="columns"
        row-key="name"
        color="primary"
      >
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox color="primary" v-model="props.row.selected" @input="updateSelectPoints" />
          </q-td>
          <q-td key="points" :props="props">{{ props.row.points }}</q-td>
          <q-td key="value" :props="props">{{ props.row.value_label }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<style lang="stylus">
   @import '~variables'
  .table-points
    width 100%
    .q-table-control
      width 100%
    .q-table-title
      width 100%
      text-align center
      color $blue
      display block
    .q-table-bottom
      display none !important
</style>

<script>
export default {
  data () {
    return {
      selected: [],
      columns: [
        {
          name: 'selected',
          required: true,
          label: 'Selecione',
          align: 'left',
          style: 'width: 20%'
        },
        {
          name: 'points',
          required: true,
          label: 'Pontos',
          align: 'left',
          field: 'points',
          sortable: true,
          style: 'width: 40%'
        },
        {
          name: 'value',
          required: true,
          label: 'Preço',
          align: 'left',
          field: 'value_label',
          sortable: true,
          style: 'width: 40%'
        }
      ],
      tableData: [
        {
          points: 10,
          value: 20.00,
          value_label: 'R$ 20,00',
          selected: false
        },
        {
          points: 40,
          value: 30.00,
          value_label: 'R$ 30,00',
          selected: false
        },
        {
          points: 65,
          value: 40.00,
          value_label: 'R$ 40,00',
          selected: false
        }
      ]
    }
  },
  methods: {
    updateSelectPoints () {
      this.selected = []
      this.tableData.filter((row) => {
        if (row.selected === true) {
          this.selected.push(row)
        }
      })
      this.$emit('onSelect', this.selected)
    }
  }
}
</script>
