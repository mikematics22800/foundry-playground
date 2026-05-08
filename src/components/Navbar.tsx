import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { NavLink } from 'react-router-dom'
import { languageOptions } from '../constants/languages'
import { useTextAnalysisLanguage } from '../context/TextAnalysisLanguageContext'

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `top-nav__link${isActive ? ' top-nav__link--active' : ''}`

const Navbar = () => {
  const { lan, setLan } = useTextAnalysisLanguage()

  return (
    <nav className="top-nav" aria-label="Main navigation">
      <NavLink to="/chat" className={getLinkClassName}>
        Chat
      </NavLink>
      <NavLink to="/text-analysis" className={getLinkClassName}>
        Text Analysis
      </NavLink>
      <div className="top-nav__spacer" />
      <FormControl
        size="small"
        className="top-nav__language"
        sx={{
          minWidth: 170,
          '& .MuiInputLabel-root': {
            color: 'var(--text-secondary)',
            fontSize: '0.8125rem',
            fontWeight: 600,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--bg-button)',
          },
          '& .MuiOutlinedInput-root': {
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-input)',
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: 'var(--border-input)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--text-tertiary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--bg-button)',
            },
          },
        }}
      >
        <InputLabel id="global-language-label">Language</InputLabel>
        <Select
          labelId="global-language-label"
          id="global-language"
          label="Language"
          value={lan}
          onChange={(event) => setLan(event.target.value)}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </nav>
  )
}

export default Navbar
