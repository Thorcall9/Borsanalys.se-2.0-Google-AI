export type SavingsGoalRefreshListener = (uid: string) => void | Promise<void>;

const listeners = new Set<SavingsGoalRefreshListener>();

/**
 * Lets goal creators request a refresh without importing a profile or route component.
 */
export function subscribeToSavingsGoalRefresh(listener: SavingsGoalRefreshListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export async function notifySavingsGoalRefresh(uid: string) {
  await Promise.all([...listeners].map((listener) => listener(uid)));
}
