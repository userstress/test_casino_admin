import { ContentState, convertToRaw, EditorState } from "draft-js"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  ssr: false,
}) // client 사이드에서만 동작되기 때문에 ssr false로 설정

export default function CustomEditor({ wrapperStyle, editorStyle, toolbarStyle }) {
  // EditorState.createEmpty() 로 초기값 설정
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <Editor
      // 에디터와 툴바 모두에 적용되는 클래스
      wrapperClassName="wrapperClass"
      wrapperStyle={wrapperStyle}
      // 에디터 주변에 적용된 클래스
      editorClassName="editor"
      editorStyle={editorStyle}
      // 툴바 주위에 적용된 클래스
      toolbarClassName="toolbarClass"
      toolbarStyle={toolbarStyle}
      // 툴바 설정
      toolbar={{
        // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: false },
      }}
      placeholder="내용을 작성해주세요."
      // 한국어 설정
      localization={{
        locale: "ko",
      }}
      // 초기값 설정
      editorState={editorState}
      // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
      onEditorStateChange={onEditorStateChange}
    />
  )
}
