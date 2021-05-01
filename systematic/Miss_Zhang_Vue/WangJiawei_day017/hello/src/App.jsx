import Home from './components/home'
import Info from './components/info'
import ClickDom from './components/clickDom'

/* let msg = 'OKKKKKK'
let num = 0
let isShow = true
let obj = {
  name: 'nooooo',
  age: 233,
}
let arr = ['1', '2', '3', '4', '5']
let img =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K' */
export default function App() {
  return (
    <div>
      {/* <h1>This is a main component</h1>
      <h1>{msg}</h1>
      <h1>{num}</h1>
      <div>{isShow ? <h1>I am true</h1> : <h1>I am fake</h1>}</div>
      <h1>{obj.name}</h1>
      <h1>{obj.age}</h1>
      <h1>
        <ul>
          {arr.map((item) => {
            return <li key={item}>{item}</li>
          })}
        </ul>
      </h1>
      <div>
        <img
          style={{
            border: '3px solid black',
            width: '100px',
            borderRadius: '50%',
          }}
          src={img}
          alt=""
        />
      </div>
      <div>
        <label htmlFor="username">UserName:</label>
        <input type="text" id="username" />
      </div>
      <hr /> */}
      {/* <Home></Home>
      <Info></Info> */}
      <ClickDom></ClickDom>
    </div>
  )
}
