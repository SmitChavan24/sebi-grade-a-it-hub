# HTML, CSS, JavaScript and the DOM

## HTML

Structure and semantics. Key elements: `html`, `head` (meta, title, link, script), `body`, semantic tags (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), `form` with `input`/`select`/`textarea`/`button`, `table` with `thead`/`tbody`/`th`/`td`, `img` with **alt text**.

**HTML5 additions:** semantic elements, `canvas`, `video`/`audio`, **localStorage / sessionStorage**, **WebSockets**, Web Workers, geolocation, form validation attributes (`required`, `pattern`, `type="email"`).

**Accessibility:** alt text, label-input association, ARIA roles, keyboard navigation, colour contrast. Accessibility is a legal and inclusion issue for any investor-facing government or regulated platform — worth mentioning.

## CSS

**Selectors:** element, `.class`, `#id`, attribute, descendant, child (`>`), pseudo-class (`:hover`, `:nth-child`), pseudo-element (`::before`).

**Specificity (highest first):** inline style → id → class/attribute/pseudo-class → element. `!important` overrides everything and should be avoided.

**Box model:** content → padding → border → margin. `box-sizing: border-box` makes width include padding and border — the sane default.

**Layout:** `display` (block, inline, inline-block, flex, grid, none), **Flexbox** (one-dimensional), **Grid** (two-dimensional), `position` (static, relative, absolute, fixed, sticky), float (legacy).

**Responsive design:** media queries, relative units (%, em, rem, vw, vh), mobile-first, `viewport` meta tag.

## JavaScript

**Types:** primitives (string, number, boolean, null, undefined, symbol, bigint) and objects. Dynamically and weakly typed, which is why `==` (coerces) differs from `===` (strict) — always use `===`.

**Scope and hoisting:** `var` is function-scoped and hoisted (initialised as undefined); `let` and `const` are block-scoped with a **temporal dead zone**.

**Closures** — a function retaining access to its defining scope. The basis of module patterns, private state and callbacks.

**`this`** — depends on the call site: method call (the object), plain call (undefined in strict mode / global otherwise), `new` (the new object), explicit `call/apply/bind`. **Arrow functions do not bind their own `this`** — they inherit it lexically. This is the single most-asked JavaScript question.

**Asynchrony:** the **event loop** with a call stack, task queue and microtask queue. **Callbacks → Promises → async/await.** Promises: pending, fulfilled, rejected; `.then`, `.catch`, `Promise.all` / `allSettled` / `race`.

```js
async function loadTrades() {
  try {
    const res  = await fetch('/api/trades');
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    render(data);
  } catch (e) {
    showError(e.message);
  }
}
```

**DOM:** `querySelector`, `createElement`, `append`, `addEventListener`, **event bubbling and capturing**, `event.preventDefault()`, **event delegation** (one listener on a parent instead of many on children).

**ES6+:** arrow functions, destructuring, spread/rest, template literals, modules (`import`/`export`), classes, optional chaining `?.`, nullish coalescing `??`.

## Frameworks (recognise, do not memorise)

**React** (component-based, virtual DOM, hooks), **Angular** (full framework, TypeScript, two-way binding), **Vue**. **SPA vs SSR vs static** rendering, and why SSR helps first-paint and SEO.

---

## Exam pointers

1. **CSS specificity: inline > id > class > element.**
2. **`===` does not coerce; `==` does.**
3. **Arrow functions inherit `this` lexically.**
4. `let`/`const` are **block-scoped**; `var` is function-scoped and hoisted.
5. **Event delegation** relies on **bubbling**.
