import React, { useEffect } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PROPS {
  aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {
  const editorRef: any = React.useRef<any>(null);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput])

  const handleCopy = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown(); // Get the content from the editor
    navigator.clipboard.writeText(markdownContent)
      .then(() => {
        toast.success('Content copied to clipboard!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error('Failed to copy content!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Failed to copy content: ', err);
      });
  };

  return (
    <div className='shadow-lg border rounded-lg'>
      <ToastContainer />
      <div className='flex justify-between items-center p-5 bg-gray-100'>
        <h2 className='text-lg font-medium'>Your Result</h2>
        <Button
          className='text-md font-bold bg-purple-700 hover:bg-purple-500'
          onClick={handleCopy}
        >
          <Copy />Copy</Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will be shown here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection
