import { Button, } from 'antd';
import React, { useCallback, useState } from 'react';
import { getTypo, } from '../docOperations/llm';
import { removeWordUnicodeSuffix } from '../docOperations/utils';


/**
 * 错别字检测
 */
function TypoDetection() {
  const [isDetecting, setIsDetecting] = useState(false)

  const onButtonClicked = useCallback(async () => {
    const activeDocument = wps.Application.ActiveDocument
    if (!activeDocument) {
      alert("当前没有打开任何文档")
      return
    }
    const selection = wps.Application.Selection;
    if (selection.Paragraphs.Count < 1) {
      alert("没有选中文本")
      return
    }

    setIsDetecting(true)
    try {
      for (let i = 1; i <= selection.Paragraphs.Count; i++) {
        const paragraph = selection.Paragraphs.Item(i)
        const paraText = removeWordUnicodeSuffix(paragraph?.Range?.Text ?? '')
        console.log('paragraph', paragraph)
        console.log('before getTypo: ', JSON.stringify(paraText))
        if (paraText) {
          const typo = await getTypo(paraText)
          if (typo?.res)
            activeDocument.Comments.Add(paragraph.Range, typo.res)
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
        选中一段文本后点击按钮 【TODO: 检测规则待优化】
      </div>
      <Button onClick={onButtonClicked} loading={isDetecting}>{isDetecting ? '正在检测' : '开始检测'}</Button >
    </>
  )
}

export default TypoDetection;
