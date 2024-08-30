
```markdown
# Editor.js con Chakra UI: Documentación

Este proyecto integra Editor.js, una herramienta de edición de texto en bloques, con Chakra UI para el diseño y estilo de la interfaz de usuario. Se utilizan varias herramientas de Editor.js y se gestionan con componentes de Chakra UI para ofrecer una experiencia interactiva y responsiva.

## Instalación

1. Instalar las dependencias necesarias:
   ```bash
   npm install @editorjs/editorjs @chakra-ui/react @emotion/react @emotion/styled framer-motion
   ```

2. Añadir las herramientas de Editor.js:
   ```bash
   npm install @editorjs/header @editorjs/list @editorjs/paragraph @editorjs/delimiter @editorjs/inline-code @editorjs/marker @editorjs/underline editorjs-break-line editorjs-inline-image
   ```

## Estructura del Código

El proyecto consta de un solo archivo `App.js` que contiene la lógica principal para la integración de Editor.js y Chakra UI.

### Función Principal: `App`

La función `App` inicializa el editor y configura las herramientas disponibles, así como los estilos visuales a través de Chakra UI.

#### 1. Inicialización del editor

La instancia de `EditorJS` se crea usando un hook de React `useState`. Las herramientas disponibles para el editor se definen en el objeto `tools`, permitiendo a los usuarios añadir encabezados, listas, imágenes, líneas divisorias, entre otros.

```javascript
const [editor] = useState(
  () =>
    new EditorJS({
      autofocus: true,
      holder: 'editorjs',
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
```

#### 2. Función de guardado

La función `save` extrae el contenido del editor en formato JSON y lo muestra en una caja de salida (`<Box>` de Chakra UI) utilizando el componente `Code` para resaltar el contenido guardado.

```javascript
const save = () => {
  editor.save().then((savedData) => {
    const output = document.getElementById('output');
    output.innerHTML = JSON.stringify(savedData, null, 4);
  });
};
```

#### 3. Estructura visual con Chakra UI

Se utilizan componentes como `Box`, `Button`, `Divider` y `VStack` para crear una interfaz limpia y organizada. El editor y la salida se encuentran dentro de cajas estilizadas y con sombras para destacar su contenido.

```javascript
return (
  <ChakraProvider>
    <VStack spacing={4} align="stretch" p={4} bg="gray.50" minH="100vh">
      <Box id='editorjs' borderWidth={1} borderRadius="md" p={4} bg="white" boxShadow="md" color="black" />
      <Divider />
      <Button colorScheme="blue" onClick={save}>Save</Button>
      <Divider />
      <Box id='output' p={4} borderWidth={1} borderRadius="md" bg="gray.100" color="black" overflowX="auto">
        <pre><Code>{JSON.stringify({ /* sample data */ }, null, 4)}</Code></pre>
      </Box>
    </VStack>
  </ChakraProvider>
);
```

### Colores y Estilo

Para evitar problemas de visibilidad (por ejemplo, texto blanco en fondo blanco), se han aplicado colores apropiados a los elementos del editor y la caja de salida. Se utilizan fondos grises claros para el editor (`bg="white"`) y la salida (`bg="gray.100"`), y el texto es siempre negro (`color="black"`).

---

## Cómo Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar la aplicación:
   ```bash
   npm start
   ```

---
