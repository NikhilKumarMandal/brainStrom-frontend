import { useState } from 'react'
import Header from './components/Header'
import SubHeader from './components/SubHeader'
import QuestionList from './components/QuestionList'
import FilterOptions from './components/FilterOptions'


export default function HomePage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [selected, setSelected] = useState('both')
  const options = [
    { label: 'Both', value: 'both' },
    { label: 'Answered', value: 'answered' },
    { label: 'Unanswered', value: 'unanswered' },
  ]
  const handleChange = (_, newValue) => {
    if (newValue !== null) setSelected(newValue)
  }
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
      <SubHeader query={query} setQuery={setQuery} />
      <FilterOptions selected={selected} setSelected={setSelected} options={options} handleChange={handleChange} />
      <QuestionList />
    </div>
  )
}
