//  이미지 핸들러가 없으면 로컬에 저장해서 에디터에 보이고, 있으면 핸들러가 지정한 장소에서 불러오는대
// 아래 url을 받아오는 항목이없을 경우, img를 받아올 곳이 없으므로, 메모리에서 사라짐.

export function insertToEditor(url, editorRef) {
  const editor = editorRef.current.getEditor()
  const range = editor.getSelection()

  return editor.insertEmbed(range.index, "image", url)
}
/*
 *이미지 api발신 함수.
 */
export function saveToServer(file, editorRef) {
  const fd = new FormData()
  fd.append("upload", file)
  const xhr = new XMLHttpRequest()
  //
  xhr.open("POST", "/api/media", true)
  // next 서버 api전송문,
  xhr.onload = () => {
    if (xhr.status === 201) {
      // this is callback data: url
      const { url } = JSON.parse(xhr.responseText)
      insertToEditor(url)
    }
    if (xhr.status === 404) {
      insertToEditor("이미지 업로드에 실패하였습니다. 관리자에게 문의 해 주세요.")
    }
  }
  // 업로드 후 받아온걸 editor객체에 embeded로 삽입.
  xhr.send(fd)
  insertToEditor(file, editorRef)
  const editor = editorRef.current.getEditor()
  const range = editor.getSelection()

  return editor.insertEmbed(range.index, "image", file)
}
