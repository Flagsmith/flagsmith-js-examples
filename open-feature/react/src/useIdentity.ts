import { flagsmithProvider } from "./flagsmithProvider";

/**
 * This hook returns the identity of the user from the
 * Flagsmith client provider.
 *
 * This is useful because it allows us to swap out the provider
 * in the future without having to change the identity hook.
 *
 * @returns The identity of the user.
 */
export const useIdentity = () => {
  return flagsmithProvider.flagsmithClient.identity;
};
