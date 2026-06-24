import type {
  DocumentActionComponent,
  DocumentActionsContext,
} from 'sanity'
import { useCurrentUser } from 'sanity'
import { canModify } from './ownership'

// Built-in actions that can modify or remove another user's post.
const GUARDED_ACTIONS = new Set([
  'delete',
  'unpublish',
  'discardChanges',
  'duplicate',
  'publish',
  'restore',
])

// Cache wrapped actions by their original component so the resolver (which runs
// often) returns stable component identities and doesn't remount the toolbar.
const wrapped = new WeakMap<DocumentActionComponent, DocumentActionComponent>()

function guard(action: DocumentActionComponent): DocumentActionComponent {
  const cached = wrapped.get(action)
  if (cached) return cached

  const Guarded: DocumentActionComponent = (props) => {
    const currentUser = useCurrentUser()
    const original = action(props)
    if (!original) return original

    // Still resolving auth — don't lock the owner out during the loading window.
    if (currentUser === null) return original

    const doc = props.draft ?? props.published
    const ownerId = (doc as { ownerId?: string } | null)?.ownerId

    if (canModify(ownerId, currentUser)) return original

    return {
      ...original,
      disabled: true,
      title: 'You can only modify posts you created',
    }
  }
  Guarded.action = action.action

  wrapped.set(action, Guarded)
  return Guarded
}

export function documentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext,
): DocumentActionComponent[] {
  if (context.schemaType !== 'post') return prev
  return prev.map((action) =>
    GUARDED_ACTIONS.has(action.action ?? '') ? guard(action) : action,
  )
}
