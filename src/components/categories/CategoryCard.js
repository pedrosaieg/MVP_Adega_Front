import styles from './CategoryCard.module.css'

import { Link } from 'react-router-dom'

import { BsTrash3, BsEye } from 'react-icons/bs'

function CategoryCard({ id, nome, pais, descricao, vinhos, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.category_card}>
            <h4>{nome}</h4>
            <div className={styles.card_direction}>
                <div>
                    <p><span>País: </span>{pais}</p>
                    <p><span>Sobre: </span>{descricao}</p>
                    <p><span>Vinhos: </span>{vinhos}</p>
                </div>
                <div className={styles.project_card_actions}>
                    <Link to={`/category/${id}`}>
                        <BsEye />
                    </Link>
                    <button onClick={remove} to="/categories">
                        <BsTrash3 />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default CategoryCard