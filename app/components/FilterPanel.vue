<template>
  <div style="margin-left:40px; border: 1px solid black;">
    <label style="margin-left:30px;" for="dateFilter">Date:</label>
    <select id="dateFilter" v-model="selectedDate" @change="updateFilter()">
      <option v-for="dateOption in dates" :value="dateOption">{{ dateOption }}</option>
    </select>
    <strong style="margin-left:60px;">Report Type:</strong>
    <span style="margin-left:30px;" v-for="reportTypeOption in reportTypes">
      <input type="checkbox" :id="reportTypeOption" :value="reportTypeOption" v-model="selectedReportType" @change="updateFilter()">
      <label :for="reportTypeOption">{{ reportTypeOption }}</label>
    </span> +
  </div>
</template>

<script>
export default {
  props: [
    'report-types',
    'dates',
    'default-date'
  ],
  data: function() {
    return {
      selectedDate: this.defaultDate,
      selectedReportType: []
    };
  },
  watch: {
    defaultDate: function () {
      this.selectedDate = this.defaultDate;
    }
  },
  methods: {
    updateFilter: function() {
      var filterParams = {
        date: this.selectedDate,
        reportType: this.selectedReportType
      };
      console.log('filter params:', filterParams);
      this.$emit('filter', filterParams);
    }
  }
};
</script>

<style>
</style>
