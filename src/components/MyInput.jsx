import {Editor, EditorState} from 'draft-js';
import { useState } from 'react';

const MyInput = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default MyInput