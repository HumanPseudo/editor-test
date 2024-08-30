import './App.css';
import { useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import BreakLine from 'editorjs-break-line';
import InlineImage from 'editorjs-inline-image';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';

function App() {
	const initialData = {
		blocks: [
			// Sample initial data can be added here if needed
		],
	};

	const [editor] = useState(
		() =>
			new EditorJS({
				autofocus: true,
				holder: 'editorjs',
				readOnly: false,
				tools: {
					header: Header,
					list: {
						class: List,
						inlineToolbar: true,
					},
					breakLine: {
						class: BreakLine,
						inlineToolbar: true,
						shortcut: 'CMD+SHIFT+ENTER',
					},
					image: {
						class: InlineImage,
						inlineToolbar: true,
						config: {
							embed: {
								display: true,
							},
						},
					},
					paragraph: {
						class: Paragraph,
						inlineToolbar: true,
						config: { preserveBlank: true },
					},
					delimiter: Delimiter,
					marker: {
						class: Marker,
						shortcut: 'CMD+SHIFT+M',
					},
					inlineCode: {
						class: InlineCode,
						shortcut: 'CMD+SHIFT+M',
					},
					underline: Underline,
				},
				onReady: () => {
					// Initialization tasks if needed
				},
				data: initialData,
			})
	);

	const save = () => {
		editor.save().then((savedData) => {
			const output = document.getElementById('output');
			output.innerHTML = JSON.stringify(savedData, null, 4);
		});
	};

	return (
		<div className='App'>
			<div id='editorjs' />
			<hr className='ce-block' />
			<button type='button' className='btn btn-primary btn-lg' onClick={save}>
				Save
			</button>
			<hr className='ce-block' />
			<pre id='output' />
		</div>
	);
}

export default App;
