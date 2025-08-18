import React from 'react'
import { Table, Select, Input, Card, Space, Button } from 'antd'
import { SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons'
import { useDataQueryCode } from './DataQuery.code'
import DataEditModal from './modals/DataEditModal'

const { Option } = Select
const { Search } = Input

export default function DataQuery() {
  const {
    dataTypes,
    selectedDataType,
    dataList,
    loading,
    searchText,
    pagination,
    columns,
    editModalVisible,
    originalData,
    handleDataTypeChange,
    handleSearch,
    handleTableChange,
    handleRefresh,
    handleEdit,
    handleEditSuccess,
    handleEditCancel,
    getDataTypeDisplayName
  } = useDataQueryCode()

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 p-2 md:p-6 h-full overflow-y-auto">
        {/* 页面标题 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📊 数据查询</h1>
            <p className="text-slate-400">查询和浏览游戏中的各种数据列表</p>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              disabled={!selectedDataType}
              className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 hover:from-green-600 hover:to-emerald-600"
            >
              编辑数据
            </Button>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600"
            >
              刷新数据
            </Button>
          </Space>
        </div>

        {/* 查询控制区域 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 min-w-0">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                数据类型
              </label>
              <Select
                value={selectedDataType}
                onChange={handleDataTypeChange}
                placeholder="请选择数据类型"
                className="w-full"
                size="large"
              >
                {dataTypes.map(type => (
                  <Option key={type} value={type}>
                    {getDataTypeDisplayName(type)}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-slate-300 text-sm font-medium mb-2">
                搜索关键词
              </label>
              <Search
                placeholder="输入关键词搜索..."
                value={searchText}
                onChange={e => handleSearch(e.target.value)}
                onSearch={handleSearch}
                size="large"
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* 数据表格 */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-lg">
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <SearchOutlined className="text-purple-400" />
              {selectedDataType
                ? getDataTypeDisplayName(selectedDataType)
                : '数据列表'}
            </h3>
          </div>
          <Table
            columns={columns}
            dataSource={dataList}
            rowKey={(record, index) => index?.toString() || '0'}
            loading={loading}
            rowClassName={() =>
              'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all duration-300 bg-slate-700 hover:bg-slate-600'
            }
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              onChange: handleTableChange,
              className: 'p-6'
            }}
            scroll={{ x: 1200 }}
            className="bg-transparent xiuxian-table"
          />
        </Card>

        {/* 数据编辑模态框 */}
        <DataEditModal
          visible={editModalVisible}
          onCancel={handleEditCancel}
          onSuccess={handleEditSuccess}
          dataType={selectedDataType}
          dataTypeName={
            selectedDataType ? getDataTypeDisplayName(selectedDataType) : ''
          }
          originalData={originalData}
        />
      </div>
    </div>
  )
}
