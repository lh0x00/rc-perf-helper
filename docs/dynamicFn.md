## dynamicFn

cache your React event listeners to improve performance

### reference

read more at [here](https://hackernoon.com/cache-your-react-event-listeners-to-improve-performance-37bda57ac965)

### example

```js
import React, { Component } from 'react'
import { dynamicFn } from 'rc-perf-helper'

class List extends Component {
  // without dynamic fn
  onClick = key => () => {
    // do something
    console.log(key)
  }

  // with dynamic fn
  onClick = dynamicFn(key => () => {
    // do something
    console.log(key)
  })

  render() {
    const { list } = this.props

    return (
      <ul>
        {this.props.list.map(item => (
          <li key={item} onClick={this.onClick(item)}>{item}</li>
        ))}
      </ul>
    )
  }
}

export default List
```
