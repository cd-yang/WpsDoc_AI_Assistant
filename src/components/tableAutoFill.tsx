import { Button, Collapse, InputNumber } from 'antd';
import React, { useCallback, useState } from 'react';
import { get技术要求响应 } from '../docOperations/llm';
import { removeWordUnicodeSuffix } from '../docOperations/utils';

const { Panel } = Collapse;

/**
 * 技术要求偏离表
 */
function TableAutoFill() {
  const [fillCount, setFillCount] = useState(5)
  const [isFilling, setIsFilling] = useState(false)

  const onFillTable = useCallback(async () => {
    const activeDocument = wps.WpsApplication().ActiveDocument
    if (!activeDocument) {
      alert("当前没有打开任何文档")
      return
    }
    const selection = wps.WpsApplication().Selection;
    const selectedTable = selection.Tables.Item(1)
    if (!selectedTable) {
      alert("当前没有选中表格")
      return
    }
    console.log('selectedTable size: ', selectedTable.Rows.Count, selectedTable.Columns.Count)
    if (selectedTable.Rows.Count < 1) {
      alert("偏离表没有表头")
      return
    }

    const 技术评审要求index = 3
    const 技术要求响应index = 4
    const 偏离度index = 5
    if (selectedTable.Columns.Count < 技术要求响应index) {
      alert("未找到技术要求响应列")
      return
    }
    setIsFilling(true)
    try {
      let count = 0;
      for (let i = 2; i <= selectedTable.Rows.Count; i++) { //第一行是表头，所以从第二行开始
        if (count >= fillCount) break;
        const 技术评审要求cell = selectedTable.Cell(i, 技术评审要求index);
        const 技术要求响应cell = selectedTable.Cell(i, 技术要求响应index);
        if (!技术评审要求cell?.Range || !技术要求响应cell?.Range) {
          console.log(`第${i}行单元格缺失，忽略`)
          continue
        }
        console.log(`技术评审要求Text: `, 技术要求响应cell.Range.Text)
        if (removeWordUnicodeSuffix(技术评审要求cell.Range.Text) && !removeWordUnicodeSuffix(技术要求响应cell.Range.Text)) {
          技术要求响应cell.Range.Text = await get技术要求响应(技术评审要求cell.Range.Text)
          count++;
        }

        if (selectedTable.Columns.Count >= 偏离度index) {
          const 偏离度cell = selectedTable.Cell(i, 偏离度index);
          if (偏离度cell?.Range && !removeWordUnicodeSuffix(偏离度cell.Range.Text)) {
            偏离度cell.Range.Text = '无偏离'
          }
        }
      }
      // let myRange = activeDocument.Range(0, 0)
      // activeDocument.Tables.Add(myRange, 3, 4)
      // console.log(tables.Item(0))

      // let docNew = wps.WpsApplication().Documents.Add()
      // let tblNew = docNew.Tables.Add(wps.WpsApplication().Selection.Range, 3, 5)
      // for(let i = 1; i <= 3; i++){
      //     for(let j=1; j <=5; j++){
      //         tblNew.Cell(i, j).Range.InsertAfter("Cell: R" + i + ", C" + j)
      //     }
      // }
      // console.log(activeDocument.Tables.Item(activeDocument.Tables.Count))
    } catch (error) {
      alert(error)
    } finally {
      setIsFilling(false)
    }
  }, [fillCount])

  return (
    <Collapse defaultActiveKey={['2']}>
      <Panel header="自动填充技术评审要求" key="1">
        <p>敬请期待</p>
      </Panel>
      <Panel header="自动填充要求响应" key="2">
        <div>
          选中技术要求偏离表，点击确认按钮，将会在表格中填充“技术要求响应”和“偏离度”数据。
        </div>
        <div>本次自动填充的行数：（尽量不超过20）</div>
        <div style={{ display: 'flex' }}>
          <InputNumber
            min={1}
            max={20}
            value={fillCount}
            onChange={(value: number) => { if (value) setFillCount(value) }}
          ></InputNumber>
          <div>
            <Button onClick={onFillTable} loading={isFilling}>{isFilling ? '正在修改' : '开始修改'}</Button >
          </div >
        </div>
      </Panel>
    </Collapse>
  )
}

export default TableAutoFill;
