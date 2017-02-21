class Mvvm {
  constructor(el, data) {
    this.el = document.getElementById(el)
    this._data = data

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

  parseModel(node) {
    //解析data-model

  }

  parseClass(node) {
    //解析data-class
  }

  parseEvent(node) {
    //解析事件
  }

  parseList(node) {
    //解析data-list
  }
}