1、懒加载

```
const A = React.lazy(() => import('./A'))

return (
  <Suspense fallback={<p>loading</p>}>
    <Route component={A} path="/a">
  </Suspense>
)

```

2、使用useEvent返回一个稳定的方法
[useEvent vs useCallback](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)