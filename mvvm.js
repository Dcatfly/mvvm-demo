class Mvvm {
  constructor(el, data, eventsObj) {
    this.el = document.getElementById(el)
    this._data = data
    this._eventsObj = eventsObj

    this.scan(this.el)
  }

  scan(node) {
    if (node.getAttribute('data-list')) {
      this.parseList(node)
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const _thisNode = node.children[i]

        this.parseModel(node)
        this.parseClass(node)
        this.parseEvent(node)

        if (_thisNode.children.length) {
          scan(_thisNode)
        }
      }
    }
  }

  _parseData(model, data) {
    let _key = model.split(':').join('.')
    try {
      return new Function('data', 'return data.' + _key)(data)
    } catch (e) {
      console.error(e)
      console.error("can't find model in the data")
      return undefined
    }
  }
  parseModel(node) {
    //解析data-model
    let _modelData, modelName = node.getAttribute('data-model')
    if (modelName) {
      _modelData = this._parseData(modelName, this._data)
      if (node.tagName == 'INPUT') {
        node.value = _modelData
      } else {
        node.innerHTML = _modelData
      }
    }

  }

  parseClass(node) {
    //解析data-class
    let _modelData, modelName = node.getAttribute('data-class')
    if (modelName) {
      _modelData = this._parseData(modelName, this._data)
        (!node.classList.contains(_modelData)) && (node.classList.add(_modelData))
    }
  }

  parseEvent(node) {
    //解析事件
    let _event, _eventName = node.getAttribute('data-event')
    if (_eventName) {
      _event = this._parseData(_eventName, this._eventsObj)
      node.addEventListener(_event.type, _event.callbackFn.bind(node))
    }
  }

  _parseListItem(node) {
    //其实不太合理。。。
    let retNode
    (function getItem(node) {
      node.children.forEach((item) => {
        const _thisNode = item
        this.parseModel(_thisNode, this._data)
        this.parseClass(_thisNode, this._data)
        this.parseEvent(_thisNode, this._eventsObj)
        if (_thisNode.getAttribute('data-list-item')) {
          retNode = _thisNode
        } else {
          getItem(_thisNode)
        }
      })
    })(node)
    return retNode
  }

  parseList(node) {
    //解析data-list


  }
}