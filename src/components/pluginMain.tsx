import { Collapse } from 'antd';
import React from 'react';
import TableAutoFill from './tableAutoFill';

const { Panel } = Collapse;

/**
 * 插件的主入口
 */
function PluginMain() {

  return (
    <div style={{ margin: '5px' }}>
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="技术要求偏离表" key="1">
          <TableAutoFill />
        </Panel>
        <Panel header="检查错别字" key="2">
          <p>敬请期待</p>
        </Panel>
        <Panel header="其他功能..." key="3">
          <p>敬请期待</p>
        </Panel>
      </Collapse>

    </div>
  )
}

export default PluginMain;
