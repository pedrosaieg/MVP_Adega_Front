import styles from './CategoryCard.module.css'

import { Link } from 'react-router-dom'

import { BsTrash3, BsEye } from 'react-icons/bs'

function CategoryCard({ id, nome, ramo_atuacao, link, tamanho, vinhos, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.category_card}>
            <h4>{nome}</h4>
            <p><span>Área de atuação: </span>{ramo_atuacao}</p>
            <p><span>Funcionários: </span>{tamanho}</p>
            <p><span>Vinhos: </span>{vinhos}</p>
            <p><a href={link}>Website</a></p>
            <div className={styles.project_card_actions}>
                <Link to={`/category/${id}`}>
                    <BsEye />
                </Link>
                <button onClick={remove} to="/categories">
                    <BsTrash3 />
                </button>
            </div>
        </div >
    )
}

export default CategoryCard