import { Button, Collapse, InputNumber } from 'antd';
import React, { useCallback, useState } from 'react';
import { getTypo, get技术要求响应 } from '../docOperations/llm';

const { Panel } = Collapse;

/**
 * 错别字检测
 */
function TypoDetection() {
  const [isDetecting, setIsDetecting] = useState(false)

  const onButtonClicked = useCallback(async () => {
    const activeDocument = wps.WpsApplication().ActiveDocument
    if (!activeDocument) {
      alert("当前没有打开任何文档")
      return
    }
    const selection = wps.WpsApplication().Selection;
    if (selection.Paragraphs.Count < 1) {
      alert("没有选中文本")
      return
    }

    setIsDetecting(true)
    try {
      for (let i = 1; i <= selection.Paragraphs.Count; i++) {
        const paragraph = selection.Paragraphs.Item(i)
        alert(JSON.stringify(paragraph.Range.Text))
        if (paragraph.Range?.Text) {
          const typo = await getTypo(paragraph.Range.Text)
          alert(typo)
        }
      }
    } catch (error) {
      alert(error)
    } finally {
      setIsDetecting(false)
    }
  }, [])

  return (
    <>
      <div>
        选中一段文本后点击按钮，将自动检测错别字并进行修正
      </div>
      <Button onClick={onButtonClicked} loading={isDetecting}>{isDetecting ? '正在检测' : '开始检测'}</Button >
    </>
  )
}

export default TypoDetection;
