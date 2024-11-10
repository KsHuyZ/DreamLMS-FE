import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

import { cn } from '@/lib/utils';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

interface CKEditorProps {
  label?: string;
  value?: string;
  error?: string;
  onChange: ((event: any, editor: ClassicEditor) => void) | undefined;
}

function CustomEditor({ label, value, onChange, error }: CKEditorProps) {
  return (
    <div>
      {label ? (
        <label className='block text-sm mb-2 font-medium text-gray-900 '>
          {label}
        </label>
      ) : null}
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={onChange}
        data={value}
      />
      <p className={cn('text-sm text-error', error && 'animate-fadetop')}>
        {error}
      </p>
    </div>
  );
}

export default CustomEditor;
