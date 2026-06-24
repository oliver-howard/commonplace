// Ownership rules shared between the post schema (read-only form) and the
// guarded document actions (delete/unpublish/discard/duplicate).
//
// NOTE: this is Studio UI enforcement only. On the free plan there is no
// API-level access control, so a determined user could still mutate another
// user's post via the Sanity API directly. This stops accidents and casual
// edits, not a determined actor.

const ADMIN_ROLE = 'administrator'

// Minimal structural type so this works with both the conditional-field
// `currentUser` and the `useCurrentUser()` hook return value.
type UserLike = { id?: string; roles?: Array<{ name: string }> } | null | undefined

export function isAdmin(user: UserLike): boolean {
  return !!user?.roles?.some((role) => role.name === ADMIN_ROLE)
}

// Whether `user` may edit/delete a post owned by `ownerId`.
// - Unowned (legacy) posts are editable by anyone so existing content isn't locked out.
// - Admins may always modify.
export function canModify(ownerId: string | undefined, user: UserLike): boolean {
  if (!ownerId) return true
  if (isAdmin(user)) return true
  return ownerId === user?.id
}
