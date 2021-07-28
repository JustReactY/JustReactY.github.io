# svelte

## 听他们说svelte

> Svelte 在 构建/编译阶段 将你的应用程序转换为理想的 JavaScript 应用，而不是在 运行阶段 解释应用程序的代码。这意味着你不需要为框架所消耗的性能付出成本，并且在应用程序首次加载时没有额外损失。 你可以使用 Svelte 构建整个应用程序，也可以逐步将其融合到现有的代码中。你还可以将组件作为独立的包（package）交付到任何地方，并且不会有传统框架所带来的额外开销。

## 实践出真知

**svelte如何使用**

1. 丝滑的变量定义

``` js
<script>
	let src = 'tutorial/image.gif';
</script>

<img {src} alt="">
```

2. 完美的样式隔离
``` js
<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
```
> 这些 CSS 样式规则 的作用域被限定在当前组件中。

3. 丝滑的潜逃组件
``` js
// Nested.svelte
<p>This is another paragraph.</p>

// app
<script>
	import Nested from './Nested.svelte';
</script>
<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
<Nested/>
```

4. 渲染富文本代码块

``` js
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

> 在将表达式的输出插入到 DOM 之前，Svelte 不会对 {@html ...} 内的表达式的输出做任何清理的。换言之，如果使用此功能，则必须手动转义来自不信任源的 HTML 代码，否则会使用户面临 XSS 攻击的风险。

