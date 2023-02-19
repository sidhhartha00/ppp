import styles from '../../styles/modules/FormInput.module.scss';
import classNames from 'classnames';

export default function FormInput({
    htmlFor,
    label,
    type="text",
    id,
    name,
    placeholder=" ",
    value,
    required,
    className,
    wrapperClassName,
    register,
    errors,
}) {
    return(
        <div className={wrapperClassName}>
            <div
                className={classNames(
                    styles['c-formElement'],
                    styles[className],
                    {
                        [styles['c-floatingLabel']]: label,
                        [styles['has-error']]: required && errors?.message
                    }
                )}
            >
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    {...register}
                />
                {label && htmlFor &&
                    <label htmlFor={htmlFor}>{label}{required && ' *'}</label>
                }
                <span className={styles['c-formElement--focusLine']} />
            </div>
            {errors?.message &&
                <label htmlFor={htmlFor}>{errors?.message}</label>
            }
        </div>
    );
}