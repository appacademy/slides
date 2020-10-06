# Markdown Slides

---

## How to Use

Install the node packages. The `postinstall` script will run webpack for you
automatically after you do so.

```
npm install
```

To copy the lecture slides and assets into this folder, you need to have the
following structure in your lecture notes folder.

```
/lecture-notes/
├── assets
│   ├── example-image-1.png
│   └── example-image-2.png
└── slides.md
```

Here's an [example of a proper lecture notes folder setup](https://github.com/appacademy/SWE-Online-Instruction-Guide/blob/master/modules/module-1/week-03/vscode-debugger-walkthrough-lecture)

Then, copy the absolute path of the lecture notes folder.

This repo expects all assets to be in the `assets` folder in the lecture notes
folder and a file named `slides.md` for the markdown slides content.

Run the following command and replace `<lecture notes path>` with the copied
path:

```
LECTURE_PATH=<lecture notes path> npm start
```

Go to http://localhost:8080/ to see the lecture slides in the browser.

Note: To reference any links in the `assets` folder, you can use a relative
link in markdown like so: 

```
![Sample Image](./assets/sample-image-1.png)
```

The files in the `essential-assets` folder nested under the `assets` folder
**should not be touched**. All the other files in the assets folder can be
regularly deleted after a lecture.

---

## Code Snippets

- Supports in-line code `snippets` with backticks
- Or, use multi-line code blocks with automatic syntax highlighting:

```js
for (let i = 0; i < 10; i++) {
  console.log("hello world!");
}
```

---

## Tables

- Tables are supported as well

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

---

## Presenting

Click the screen icon in the navbar or press F5.

- Use arrow keys (or PgUp/PgDn) to navigate through slides.
- Home/End go to the beginning/end of the deck.
- Press Escape or F5 to switch back to edit mode.
- Most standard wireless remotes are supported.

---

## Slides Preview

- The markdown is automatically converted into slides that you can see and scroll through to the right.
- When the editor is not selected, the same keyboard shortcuts work to advance the slide as in presentation mode.
- You can also click on slides to select them.

Note:

- Anything after `Note:` is not rendered in the slide.
- But it does show up in the notes preview section below.

---

## State is Synced

* The slides are persisted even if you navigate away from site.
* All changes are immediately synced to all open tabs, including which slide is active.
* This means you can view and edit your slides in a separate window while your present.
* Clicking the trash icon will reset your edits so make sure to save them
  your edits somewhere if you want to see them again.

---

## Cursor Position Syncs

When the **Sync editor position** option is checked...

- The current slide adjusts to follow your cursor when editing.
- The text for the current slide is highlighted in the editor when it is not active.
- **Warning:** this can have some _weird_ consequences if you have two edit views syncing their position at the same time.

---

## Credits

* [Claire Rogers](https://github.com/clairekrogers) adapted the app from [the original](https://github.com/jacksingleton/hacker-slides).
* [Jon Wolverton](https://github.com/clairekrogers) refactored and updated it to support multiple screens.

---

## Contributing to this repo

---

### Starting up your dev environment

To start webpack:

```
npm run webpack
```

To start your development server:

```
npm run dev
```

This will start the Express server that will serve all the static files in your
`assets` folder under the `/assets` url path and the `index.html` file at the
root url.

---

### Editing the README

After editing the README.md, run the `populate-demo-lecture.js` file to update
the demo lecture slides:

```
node populate-demo-lecture.js
```

---

### How the populate-lecture.js script works

In the `server.js` file, `populateLecture` is called from the
`populate-lecture.js` file. This function gets the `LECTURE_PATH` environment
variable and reads the `assets` folder and `slides.md` file at that lecture
path. Then it will copy all the files in the `assets` folder there into the
`assets` folder here. It will also copy the `slides.md` file there into the
root of the directory here. Then it will create a `lecture-text.js` file in the
`assets` folder that will set the `window.lectureText` to the content of the
`slides.md` file.
