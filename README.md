# Hotkey

The `@ramstack/hotkey` package is a very small and lightweight library for handling hotkeys.
The library weighs around 1.32KB and approximately 750 bytes when gzipped.

## Installation

### Via NPM
```cmd
npm install --save @ramstack/hotkey
```

## Quick start
You can specify either the element itself or its selector as the target for key events.
For global listening across the entire page, use `window` or `document`.

```js
const cleanup = registerHotkey("#app", "Ctrl + K", e => {
    console.log("Search...");
});

// Unregister the hotkeys when they are no longer needed
cleanup();
```
The function returns a cleanup function that allows you to unsubscribe from event listening.

## API

`registerHotkey(target, hotkey, handler, eventName = 'keydown', options?)`

**Parameters**

#### target (required)
The target element on which the hotkey will be registered. Use `window` for global hotkeys.
```js
registerHotkey(window, "Win + PgUp", e => {
    console.log("Do something");
});
```

#### hotkey (required)
The combination of keys for the hotkey, e.g., `Ctrl + Alt + Delete`
The hotkey description is a case-insensitive. Spaces are not important. Standard key names are used.
You can find them here [Key values for keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values)

In addition, there are also aliases for some key names:

```js
const aliases: Record<string, string> = {
    "esc"         : "escape",
    "ins"         : "insert",
    "del"         : "delete",
    "up"          : "arrowup",
    "down"        : "arrowdown",
    "right"       : "arrowright",
    "left"        : "arrowleft",
    "pgup"        : "pageup",
    "pgdn"        : "pagedown",
    "break"       : "pause",
    "scroll"      : "scrolllock",
    "scrlk"       : "scrolllock",
    "prtscr"      : "printscreen",
    "win"         : "meta",
    "windows"     : "meta",
    "cmd"         : "meta",
    "command"     : "meta",
    "comma"       : ",",
    "period"      : ".",
    "quote"       : "\"",
    "singlequote" : "'",
    "colon"       : ":",
    "semicolon"   : ";",
    "plus"        : "+",
    "minus"       : "-",
    "tilde"       : "~",
    "equal"       : "=",
    "slash"       : "/"
};
```

#### handler (required)
The function to be called when the hotkey is triggered.

The value of `this` inside the handler will be a reference to the element.
It will be the same as the value of the `currentTarget` property of the event argument that is passed to the handler.

```js
registerHotkey("#el", "Ctrl + K", function(e) {
    console.log(e.currentTarget === this); // logs true
});
```
As a reminder, arrow functions do not have their own this context.
```js
registerHotkey("#el", "Ctrl + K", e => {
    console.log(e.currentTarget === this); // logs false
});
```

#### eventName (optional, default: 'keydown')
The name of the event to listen for.
You can subscribe to events on `keydown` (used by default) or `keyup`.

```js
registerHotkey("#el", "Ctrl + K", e => {
    console.log(e.currentTarget === this); // logs false
}, "keyup");
```

#### options (optional)
Additional options for the event listener. See [Options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options).

#### Returns
A function that, when called, unregisters the hotkey.

```js
const cleanup = registerHotkey("#app", "Ctrl + K", e => {
    console.log("Search...");
});

// Unregister the hotkeys when they are no longer needed
cleanup();
```

## License
This package is released under the **MIT License**.
