import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
}

export function useDialogFocus<T extends HTMLElement>(isOpen: boolean, fallbackFocusRef?: RefObject<HTMLElement | null>) {
  const dialogRef = useRef<T>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusInitialControl = () => {
      const initialFocus = dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]');
      if (initialFocus) {
        initialFocus.focus();
        return;
      }

      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length > 0) focusableElements[0].focus();
      else dialog.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === focusableElements[0]) {
        event.preventDefault();
        focusableElements.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === focusableElements.at(-1)) {
        event.preventDefault();
        focusableElements[0].focus();
      }
    };

    const frame = window.requestAnimationFrame(focusInitialControl);
    dialog.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      dialog.removeEventListener('keydown', handleKeyDown);
      const trigger = previouslyFocusedElement.current;
      if (trigger?.isConnected) {
        trigger.focus();
      } else if (fallbackFocusRef?.current?.isConnected) {
        fallbackFocusRef.current.focus();
      }
    };
  }, [fallbackFocusRef, isOpen]);

  return dialogRef;
}
