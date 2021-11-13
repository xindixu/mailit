import { WebrtcProvider } from "y-webrtc"
import * as Y from "yjs"

const ydoc = new Y.Doc()
// TODO: channel set up
// TODO: Currently, since everyone uses the same room, if you open up two editor, content will be synced automatically
// This won't be a problem after we figure out the correct way to set this up
export const getProvider = (id) => new WebrtcProvider(`mailit-template-editor-${id}`, ydoc)
