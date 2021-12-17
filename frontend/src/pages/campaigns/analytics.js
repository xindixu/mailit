import * as d3 from "d3"
import D3Funnel from 'd3-funnel'
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import apiFetch from "../../lib/api-fetch"

const Analytics = () => {
  const { id } = useParams()
  const dataRef = useRef(null)

  useEffect(() => { 
    apiFetch({ route: `campaigns/${id}/analytics` }).then(({status, data}) => {
      if (status === 200 ) {
        const graphData = [
          ['Emails Sent', data.emails_sent],
          ['Emails Opened', data.emails_sent],
          ['Emails Not Sent', data.emails_not_sent],
        ]

        const options = {
          width: 400,
          block: {
            dynamicHeight: true,
            minHeight: 15,
          },
        }
        var graph = new D3Funnel(dataRef.current)
        graph.draw(graphData, options)
      }
    })
  }, [])

  return (
    <>
      <h2>Email Analytics</h2>
      <svg ref={dataRef}></svg>
    </>
  )
}

export default Analytics
