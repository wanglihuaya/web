export default function SonFun(props) {
  // console.log('父 → 子', props)
  return (
    <div>
      <h1>函数子组件</h1>
      <h2>{props.name}</h2>
      <hr/>
    </div>
  )
}
