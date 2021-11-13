import { WebrtcProvider } from "y-webrtc"
import * as Y from "yjs"

const ydoc = new Y.Doc()
// TODO: channel set up
export const provider = new WebrtcProvider("mailit-markdown", ydoc)
