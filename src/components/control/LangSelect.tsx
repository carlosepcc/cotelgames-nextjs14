import { changeLanguage } from 'i18next';
import { availableLanguages } from '../../../i18n';
import { useTranslation } from 'react-i18next';


const LangSelect = () => {
    const {i18n} = useTranslation()
    return (
      <select className='rounded-xl p-1 px-2 hover:brightness-95 cursor-pointer ' value={i18n.language} onChange={(e)=>changeLanguage(e.target.value)}>
        {availableLanguages.map(l =><option value={l.code}>{l.name}</option>)}
      </select>
    )
  }


export default LangSelect;
