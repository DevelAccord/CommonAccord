import { DISMISS_NOTIFICATION, PUSH_NOTIFICATION } from '../actions/notifications'
import { OrderedSet } from 'immutable'

/*
 message: 'Notification message',
 key: 'some UID'
 */

let _currentKey = 0
export function notifications (state = OrderedSet(), action) {

  switch (action.type) {
    case DISMISS_NOTIFICATION:
      return OrderedSet(state).delete(action.notification)

    case PUSH_NOTIFICATION:
      return OrderedSet(state).add({
          message: action.message,
          key: _currentKey++
      })
  }

  return OrderedSet(state)

}
