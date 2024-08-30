import { useState } from 'react';
import { ChakraProvider, Box, Button, Divider, Code, VStack } from '@chakra-ui/react'; // Chakra UI components
import EditorJS from '@editorjs/editorjs'; // Core EditorJS
import Paragraph from '@editorjs/paragraph'; // EditorJS paragraph tool
import Header from '@editorjs/header'; // EditorJS header tool
import List from '@editorjs/list'; // EditorJS list tool
import BreakLine from 'editorjs-break-line'; // EditorJS break line tool
import InlineImage from 'editorjs-inline-image'; // Inline image tool for EditorJS
import Delimiter from '@editorjs/delimiter'; // Tool to add a delimiter in the editor
import Marker from '@editorjs/marker'; // Tool to highlight text
import InlineCode from '@editorjs/inline-code'; // Tool for inline code snippets
import Underline from '@editorjs/underline'; // Tool to underline text

function App() {
  const initialData = {
    blocks: [
      {
        type: "header",
        data: {
          text: "Welcome to EditorJS!",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text: "This is an example of a paragraph block in EditorJS."
        }
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "EditorJS supports various block types",
            "You can customize the editor",
            "Save the content and see it in the console"
          ]
        }
      },
      {
        type: "delimiter"
      },
      {
        type: "paragraph",
        data: {
          text: "Feel free to edit this content and try out the tools available in the toolbar."
        }
      }
    ]
  };

  // Initialize EditorJS instance with tools and configuration
  const [editor] = useState(
    () =>
      new EditorJS({
        autofocus: true, // Automatically focus the editor on page load
        holder: 'editorjs', // The HTML element ID where the editor is rendered
        tools: {
          header: Header,
          list: { class: List, inlineToolbar: true },
          breakLine: { class: BreakLine, inlineToolbar: true, shortcut: 'CMD+SHIFT+ENTER' },
          image: { class: InlineImage, inlineToolbar: true, config: { embed: { display: true } } },
          paragraph: { class: Paragraph, inlineToolbar: true, config: { preserveBlank: true } },
          delimiter: Delimiter,
          marker: { class: Marker, shortcut: 'CMD+SHIFT+M' },
          inlineCode: { class: InlineCode, shortcut: 'CMD+SHIFT+M' },
          underline: Underline,
        },
        data: initialData,
      })
  );

  // Save function to get the data from the editor and display it
  const save = () => {
    editor.save().then((savedData) => {
      // Print the saved data in the console
      console.log(savedData);

      // Also display the saved data in the output box
      const output = document.getElementById('output');
      output.innerHTML = JSON.stringify(savedData, null, 4);
    });
  };

  // Return JSX layout with Chakra UI components
  return (
    <ChakraProvider>
      <VStack spacing={4} align="stretch" p={4} bg="gray.50" minH="100vh">
        <Box
          id='editorjs'
          borderWidth={1}
          borderRadius="md"
          p={4}
          bg="white"
          boxShadow="md"
          color="black"
        />
        <Divider />
        <Button colorScheme="blue" onClick={save}>Save</Button>
        <Divider />
        <Box
          id='output'
          p={4}
          borderWidth={1}
          borderRadius="md"
          bg="gray.100"
          color="black"
          overflowX="auto"
        >
          <pre><Code>{JSON.stringify({ /* sample data */ }, null, 4)}</Code></pre>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
