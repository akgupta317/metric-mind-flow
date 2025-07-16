
import React, { useState } from 'react';
import { Table, Dropdown, Button, Modal, Progress, Tag, Tooltip, message } from 'antd';
import { MoreOutlined, InfoCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Plus } from 'lucide-react';
import { Goal } from '@/types/goal';

interface ImprovedGoalTableProps {
  goals: Goal[];
  onCreateGoal?: () => void;
  onViewDetails?: (goal: Goal) => void;
  onEditGoal?: (goal: Goal) => void;
  onDuplicateGoal?: (goal: Goal) => void;
  onDeleteGoal?: (goal: Goal) => void;
}

export const ImprovedGoalTable: React.FC<ImprovedGoalTableProps> = ({ 
  goals, 
  onCreateGoal,
  onViewDetails,
  onEditGoal,
  onDuplicateGoal,
  onDeleteGoal
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleViewDetails = (goal: Goal) => {
    console.log('View details for:', goal.name);
    onViewDetails?.(goal);
    messageApi.info(`Viewing details for ${goal.name}`);
  };

  const handleEditGoal = (goal: Goal) => {
    console.log('Edit goal:', goal.name);
    onEditGoal?.(goal);
    messageApi.info(`Editing ${goal.name}`);
  };

  const handleDuplicateGoal = (goal: Goal) => {
    console.log('Duplicate goal:', goal.name);
    onDuplicateGoal?.(goal);
    messageApi.success(`Successfully duplicated ${goal.name}`);
  };

  const handleDeleteGoal = (goal: Goal) => {
    Modal.confirm({
      title: 'Delete Goal',
      content: `Are you sure you want to delete "${goal.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Delete goal:', goal.name);
        onDeleteGoal?.(goal);
        messageApi.success(`Successfully deleted ${goal.name}`);
      },
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'paused':
        return 'orange';
      case 'completed':
        return 'blue';
      default:
        return 'default';
    }
  };

  const getMenuItems = (goal: Goal) => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => handleViewDetails(goal),
    },
    {
      key: 'edit',
      label: 'Edit Goal',
      onClick: () => handleEditGoal(goal),
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      onClick: () => handleDuplicateGoal(goal),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => handleDeleteGoal(goal),
    },
  ];

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          Goal
          <Tooltip title="The name and description of your conversion goal">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Goal, b: Goal) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="font-medium text-gray-900">{text}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Uniques
          <Tooltip title="Number of unique visitors who could potentially convert">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'uniques',
      key: 'uniques',
      sorter: (a: Goal, b: Goal) => a.uniques - b.uniques,
      render: (value: number) => <span className="text-gray-600">{formatNumber(value)}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Total
          <Tooltip title="Total number of visits including returning visitors">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'total',
      key: 'total',
      sorter: (a: Goal, b: Goal) => (a.total || 0) - (b.total || 0),
      render: (value: number) => <span className="text-gray-600">{value ? formatNumber(value) : '-'}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          CR
          <Tooltip title="Conversion rate - percentage of visitors who completed the goal">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      sorter: (a: Goal, b: Goal) => a.conversionRate - b.conversionRate,
      render: (value: number) => <span className="text-gray-600">{value.toFixed(2)}%</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Status
          <Tooltip title="Current status of the goal tracking">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Owner
          <Tooltip title="Person responsible for this goal">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'owner',
      key: 'owner',
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          Progress
          <Tooltip title="Progress towards the target goal value">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'progress',
      key: 'progress',
      sorter: (a: Goal, b: Goal) => a.progress - b.progress,
      render: (progress: number) => (
        <div className="flex items-center gap-2">
          <Progress 
            percent={Math.min(progress, 100)} 
            size="small" 
            className="flex-1"
            strokeColor="#2563eb"
          />
          <span className="text-sm text-gray-600">{progress.toFixed(1)}%</span>
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_: any, goal: Goal) => (
        <Dropdown
          menu={{ items: getMenuItems(goal) }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="hover:bg-gray-100"
          />
        </Dropdown>
      ),
    },
  ];

  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No goals match your current filters</p>
        <Button
          type="primary"
          icon={<Plus />}
          onClick={onCreateGoal}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          Create Goal
        </Button>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table
          columns={columns}
          dataSource={goals}
          rowKey="id"
          pagination={false}
          className="goal-table"
          rowClassName="hover:bg-gray-50"
        />
      </div>
    </>
  );
};
