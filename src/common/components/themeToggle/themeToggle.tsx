import s from './themeToggle.module.scss'
import {Sun} from "@/common/components/themeToggle/icons/sun";
import {Moon} from "@/common/components/themeToggle/icons/moon";

export const ThemeToggle = () => {
    return (
        <div className={s.toggleContainer}>
            <input className={s.input} type={'checkbox'} id={'toggle'}/>
                <label className={s.label} htmlFor={'toggle'}>
                    <div className={s.circle}>
                        <Moon/>
                        <Sun/>
                    </div>
                </label>
        </div>
    );
};

