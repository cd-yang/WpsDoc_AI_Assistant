import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDocName } from '../actions/taskpane';
import { get技术要求响应 } from '../docOperations/llm';
import './dialog.css';


class TaskpaneTableAutoFill extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
    //   const { setDemoSpan } = this.props;
    //   setDemoSpan(res.data);
    // });
  }

  // onGetDocName = () => {
  //   const { getDocName } = this.props;
  //   getDocName();
  // }
  onFillTable = async () => {
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
    for (let i = 2; i <= selectedTable.Rows.Count; i++) { //第一行是表头，所以从第二行开始
      const 技术评审要求cell = selectedTable.Cell(i, 技术评审要求index);
      const 技术要求响应cell = selectedTable.Cell(i, 技术要求响应index);
      if (!技术评审要求cell?.Range || !技术要求响应cell?.Range) {
        console.log(`第${i}行单元格缺失，忽略`)
        continue
      }
      console.log(`技术评审要求Text: `, 技术要求响应cell.Range.Text)
      if (removeWordUnicodeSuffix(技术评审要求cell.Range.Text) && !removeWordUnicodeSuffix(技术要求响应cell.Range.Text))
        技术要求响应cell.Range.Text = await get技术要求响应(技术评审要求cell.Range.Text)

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

  }

  render() {
    // const { docName, demoSpan } = this.props;

    return (
      <div className="global">
        <div className="divItem">
          选中一个表格后，点击确认按钮，将会在表格中填充数据。
        </div>
        {/* <div className="divItem">
          这个示例展示了wps加载项的相关基础能力，与B/S业务系统的交互，请用浏览器打开：
            <span className="docs" onClick={this.onOpenWeb}>{demoSpan}</span>
        </div>
        <div className="divItem">开发文档: <span className="docs">https://open.wps.cn/docs/office</span></div> */}
        <hr />
        <div className="divItem">
          {/* <button onClick={this.onGetDocName} > 取文件名</button > */}
          <button onClick={this.onFillTable} > 开始修改</button >
        </div >
        <hr />
        {/* <div className="divItem">文档文件名为：<span>{docName}</span></div> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    docName: state.dialog.get('docName'),
    demoSpan: state.dialog.get('demoSpan'),
  }
}

export default connect(mapStateToProps, {
  getDocName,
})(TaskpaneTableAutoFill);

function removeWordUnicodeSuffix(text) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\r\u0007/g, '')
}