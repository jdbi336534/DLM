<template>
	<div class="dcp-table">
		<el-table border :data="data" :height="height" @select="select" @select-all="selectAll" @selection-change="selectionChange" @expand="expand">
			<slot name="table_body"></slot>
		</el-table>
		<div class="pages" v-if="isPage">
			<el-pagination layout="prev, pager, next" :page-size="pageSize" :total="pageTotal" @current-change="handleCurrentChange"></el-pagination>
		</div>
	</div>
</template>
<script>

export default {
 data() { return { } },
 props: {
  height: {
   type: Number,
   default: 0
  },
  data: {
   type: Array,
   default: []
  },
  isPage: {
   type: Boolean,
   default: false
  },
  pageSize: {
   type: Number,
   default: 1
  },
  pageTotal: {
   type: Number,
   default: 1
  }
 },
 methods: {
  select(selection, row) {
   this.$emit('select', selection, row);
  },
  selectAll(selection) {
   this.$emit('select-all', selection);
  },
  selectionChange(selection) {
   this.$emit('selection-change', selection);
  },
  expand(row, expanded) {
   this.$emit('expand', row, expanded);
  },
  handleCurrentChange() {
   this.$emit('page-change');
  }
 }
}
</script>
<style lang="scss">
	.dcp-table {
		.el-table {
	        height: 100%;
	        background: none;
	        border: 0;
	        color: #24CAF3; 
	        .el-checkbox__inner {
	                	background: transparent;
	                	border-radius: 0;
	                	border-color: #24CAF3;

	                }
	        th.is-leaf {
	            border: none;
	        }
	        tr {
	            background: none;
	            font-size: 16px;
	            th {
	                border: none;
	                height: 64px;

	            }
	            td {
	                border-bottom: 1px dashed #0E2B46;
	                height: 64px;
	            }
	        }
	        &:after {
	            width: 0;
	        }
	        &:before {
	            height: 0;
	        }
	        .el-table__header {
	            background-color: #0B2542;
	            color: #E600BBEC;
	            thead {
	                background: none;
	                div {
	                    background: none;
	                    color: #24CAF3;
	                    border-right: 1px solid rgb(7, 80, 115);
	                    height: 64px;
	                    line-height: 64px;
	                    text-align: center;
	                    font-weight: normal;
	                    font-size: 16px;
	                }
	            }
	            .is-leaf {
	                background: none;
	                &:nth-child(1) div {
	                    border: none;
	                }
	            }
	        }
	        .el-table__body-wrapper {
	            height: 100%;
	            background: none;
	            .el-icon-arrow-right {
	                color: #00BBEC;
	            }
	            .el-table__expanded-cell {
	                background: none;
	                border: none;
	                box-shadow: none;
	                border-bottom: 1px dashed #0E2B46;
	                &:hover {
	                    background: none;
	                    box-shadow: none;
	                }
	                .el-form-item__label {
	                    color: #00BBEC;
	                    width: 100px;
	                }
	                .innertable {
	                    .el-table {
	                        height: auto;
	                        .el-table__header {
	                            background-color: #171F3B;
	                            color: #E600BBEC;
	                            thead {
	                                background: none;
	                                tr:hover {
	                                    box-shadow: none;
	                                }
	                                th {
	                                    height: 40px;
	                                    .cell {
	                                        background: none;
	                                        border-right: 1px solid rgb(7, 80, 115);
	                                        height: 40px;
	                                        line-height: 40px;
	                                        text-align: center;
	                                        font-weight: normal;
	                                        font-size: 14px;
	                                    }
	                                    &:nth-last-child(2) {
	                                        .cell {
	                                            border-right: none;
	                                        }
	                                    }
	                                }
	                            }
	                            .is-leaf {
	                                background: none;
	                            }
	                        }
	                        .el-table__body-wrapper {
	                            height: auto;
	                            background: none;
	                            .el-icon-arrow-right {
	                                color: #00BBEC;
	                            }
	                            tr {
	                                td {
	                                    border-right: none;
	                                    text-align: center;
	                                    height: 0.4rem;
	                                    font-size: 0.12rem;
	                                }
	                                &:hover>td {
	                                    background: none;
	                                }
	                                &:nth-child(2n+1):hover {
	                                    border: none;
	                                    box-shadow: none;
	                                    border-radius: 0;
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            tr {
	                td {
	                    border-right: none;
	                    text-align: center;
	                    .store {
	                        display: inline-block;
	                        width: 0.2rem;
	                        height: 0.2rem;
	                    }
	                }
	                &:hover>td {
	                    background: none;
	                }
	                /* &:nth-child(2n+1):hover {
	                    border: 1px solid #1C91B6;
	                    box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
	                    border-radius: 1px;
	                } */
	            }
	        }
    	}
    	.pages {
            height: 0.55rem;
            margin-top: 0.2rem;
            .el-pagination {
                height: 1rem;
                text-align: center;
                color: #24CAF3;
                span,
                input {
                    margin: 0 0.1rem;
                }
                button {
                    background: none;
                    border-color: #176A8A;
                }
                .el-pager {
                    li {
                        background: none;
                        border-color: #176A8A;
                        &.active {
                            background: #13324E;
                            border-right: 1px solid #176A8A;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
	}
</style>
