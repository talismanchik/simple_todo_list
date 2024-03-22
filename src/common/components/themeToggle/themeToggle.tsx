import s from './themeToggle.module.scss'
import {Sun} from "@/common/components/themeToggle/icons/sun";
import {Moon} from "@/common/components/themeToggle/icons/moon";

type Props = {
    darkMode: boolean
    setDarkMode: (dark: boolean) => void
}
export const ThemeToggle = ({darkMode, setDarkMode}: Props) => {
    return (
        <div className={s.toggleContainer}>
            <input className={s.input} type={'checkbox'} checked={darkMode} onChange={(e) => setDarkMode(e.currentTarget.checked)}
                   id={'toggle'}/>
            <label className={s.label} htmlFor={'toggle'}>
                <div className={s.circle}>
                    <Moon/>
                    <Sun/>
                </div>
            </label>
            <span>{darkMode ? `Go to light` : `Go to dark` }</span>
        </div>
    );
};

