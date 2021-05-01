import React from 'react'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      regList: {
        username: '',
        password: '',
        sex: '0',
        job: '',
        textarea: '',
        isAgree: false,
        hobby: [],
      },
      jobList: [
        { id: 1, value: '测试' },
        { id: 2, value: '前端' },
        { id: 3, value: '后端' },
        { id: 4, value: 'UI' },
      ],
      hobbyList: [
        { id: 1, value: '1', checked: false },
        { id: 2, value: '2', checked: false },
        { id: 3, value: '3', checked: false },
        { id: 4, value: '4', checked: false },
      ],
    }
    this.username = React.createRef()
    this.password = React.createRef()
  }
  register() {
    console.log(this.state.regList)
  }

  changeValue(type, index, e) {
    let value = e.target.value
    if (type === 'isAgree') {
      value = e.target.checked
    }
    if (type === 'hobby') {
      const { hobbyList } = this.state
      hobbyList[index].checked = e.target.checked

      let arr = hobbyList.filter((item) => item.checked)
      value = arr.map((item) => item.id)
    }
    this.setState({
      regList: {
        ...this.state.regList,
        [type]: value,
      },
    })
  }

  render() {
    const { regList, jobList, hobbyList } = this.state

    return (
      <div>
        <h1>注册</h1>
        <div>
          账号:{' '}
          <input
            type="text"
            ref={this.username}
            onChange={this.changeValue.bind(this, 'username')}
          />
        </div>
        <div>
          密码:{' '}
          <input
            type="text"
            ref={this.password}
            onChange={this.changeValue.bind(this, 'password')}
          />
        </div>
        <hr />
        <div>
          男{' '}
          <input
            type="radio"
            checked={regList.sex === '0'}
            value="0"
            name="sex"
            onChange={this.changeValue.bind(this, 'sex')}
          />
          女{' '}
          <input
            type="radio"
            checked={regList.sex === '1'}
            value="1"
            name="sex"
            onChange={this.changeValue.bind(this, 'sex')}
          />
        </div>
        <hr />
        <div>
          种类：
          <select onChange={this.changeValue.bind(this, 'job')} name="" id="">
            {jobList.map((job) => {
              return (
                <option key={job.id} value={job.value}>
                  {job.value}
                </option>
              )
            })}
          </select>
        </div>
        <hr />
        <div>
          备忘录：
          <textarea
            onChange={this.changeValue.bind(this, 'textarea')}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <hr />
        <div>
          是否：
          <input
            type="checkbox"
            onChange={this.changeValue.bind(this, 'isAgree')}
          />
        </div>
        <hr />
        <div>
          测试：
          {hobbyList.map((hobby, index) => {
            return (
              <span key={hobby.id}>
                <input
                  type="checkbox"
                  checked={hobby.checked}
                  onChange={this.changeValue.bind(this, 'hobby', index)}
                />
                {hobby.value}
              </span>
            )
          })}
        </div>
        <div>
          <button onClick={this.register.bind(this)}>注册</button>
        </div>
      </div>
    )
  }
}

export default Register
