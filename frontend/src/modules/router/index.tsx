import { createBrowserRouter } from 'react-router-dom'

import { Stream, Collection, StreamSetting } from '~/components/pages'

export const router = createBrowserRouter([
  { path: '/', element: <Stream /> },
  { path: 'collection', element: <Collection /> },
  { path: 'stream-setting', element: <StreamSetting /> },
  { path: '*', element: <p>404</p> }
])
