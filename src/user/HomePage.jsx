import { useState } from 'react'
import Header from './components/Header'
import QuestionList from './components/QuestionList'
import FilterOptions from './components/FilterOptions'


export default function HomePage() {
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '80%',
        paddingTop: '8px',
        gap: '1rem',
      }}
    >
      <Header />
      <FilterOptions />
      <QuestionList />
    </div>
  )
}
