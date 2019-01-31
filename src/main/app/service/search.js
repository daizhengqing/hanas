export default class Search {
  constructor (options) {
    this.app = options
  }

  search (evt, arg) {
    evt.returnValue = {
      status: 'success',
      request: {
        params: arg
      },
      response: {
        data: [
          {
            name: '星野、闭上眼',
            author: '永椎晃平',
            thumb: '',
            last: '13卷'
          }
        ]
      }
    }
  }
}
