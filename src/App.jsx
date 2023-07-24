import { useEffect, useState } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tour, setTour] = useState([])

  const removeTour = (id) => {
    const newTour = tour.filter((tours) => tours.id !== id)
    setTour(newTour)
  }

  const fetchLocations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const tour = await response.json()
      setTour(tour)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tour.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left</h2>
          <button
            type="button"
            style={{ marginTop: '2rem' }}
            className="btn"
            onClick={() => fetchLocations()}
          >
            Refresh{' '}
          </button>
          {/* or in button just pass the onClick={fetchLocations} or  onClick={() => fetchLocations}*/}
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tour} removeTour={removeTour} />
    </main>
  )
}
export default App
