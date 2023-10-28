import type { Ipc } from "../../../main/preload";

declare global {
  interface Window {
    ipc: Ipc;
  }
}
